import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, LEAD_FROM, LEAD_NOTIFY, LEAD_REPLY_TO } from '@/lib/resend';
import { adminLeadEmail, customerLeadEmail } from '@/lib/emails';

/**
 * Lead capture. Inserts into the Supabase `leads` table when configured;
 * otherwise logs to the server console (so the site works before Supabase is
 * wired up). On success, fires notification emails via Resend (internal alert +
 * customer confirmation) — best-effort, so a mail failure never fails the lead.
 * Includes a honeypot check for spam.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true }); // silently drop bots
  }

  const { website: _hp, ...lead } = body;
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);

  let leadId: string | undefined;

  if (supabase) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        type: str(lead.type) ?? 'unknown',
        name: str(lead.name),
        phone: str(lead.phone),
        email: str(lead.email),
        city: str(lead.city),
        payload: lead, // full form data as jsonb
      })
      .select('id')
      .single();
    if (error) {
      console.error('[lead] supabase insert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'store_failed' }, { status: 500 });
    }
    leadId = data?.id;
  } else {
    // eslint-disable-next-line no-console
    console.log('[lead]', JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }));
  }

  // Notifications — best-effort. Never block or fail the lead on email errors.
  await sendNotifications(lead, leadId);

  return NextResponse.json({ ok: true });
}

async function sendNotifications(lead: Record<string, unknown>, leadId?: string) {
  if (!resend) return; // RESEND_API_KEY not set → skip quietly

  const at = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  try {
    const admin = adminLeadEmail(lead, { id: leadId, at });
    const customer = customerLeadEmail(lead);

    const jobs: Promise<unknown>[] = [
      resend.emails.send({
        from: LEAD_FROM,
        to: LEAD_NOTIFY,
        replyTo: typeof lead.email === 'string' && lead.email.trim() ? lead.email.trim() : LEAD_REPLY_TO,
        subject: admin.subject,
        html: admin.html,
        text: admin.text,
      }),
    ];

    if (customer && typeof lead.email === 'string' && lead.email.trim()) {
      jobs.push(
        resend.emails.send({
          from: LEAD_FROM,
          to: lead.email.trim(),
          replyTo: LEAD_REPLY_TO,
          subject: customer.subject,
          html: customer.html,
          text: customer.text,
        }),
      );
    }

    const results = await Promise.allSettled(jobs);
    results.forEach((r) => {
      if (r.status === 'rejected') {
        console.error('[lead] email send failed:', r.reason);
      } else {
        const value = r.value as { error?: { message?: string } | null } | undefined;
        if (value?.error) console.error('[lead] email rejected by Resend:', value.error.message);
      }
    });
  } catch (err) {
    console.error('[lead] notification error:', err instanceof Error ? err.message : err);
  }
}

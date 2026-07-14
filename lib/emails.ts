// Branded HTML emails for lead capture — Rumoo theme (ink header + green accent,
// white body, brand tokens from tailwind.config.ts). Built with table layout and
// inline styles for broad email-client support. All user-supplied values are
// HTML-escaped. Two builders:
//   adminLeadEmail(lead)    → internal notification to the RumooEV team
//   customerLeadEmail(lead) → confirmation to the person who enquired (if email)
import { SITE } from '@/lib/site';

// ---- brand tokens (mirror of tailwind.config.ts) --------------------------
const C = {
  green: '#16A34A',
  greenDark: '#15803D',
  greenLight: '#DCFCE7',
  ink: '#0A0F0C',
  charcoal: '#1C2420',
  mist: '#F4F7F5',
  line: '#E5EAE7',
  slate: '#55605A',
  white: '#FFFFFF',
  whatsapp: '#25D366',
};
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

type Lead = Record<string, unknown>;

// ---- helpers --------------------------------------------------------------
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function str(v: unknown): string {
  return typeof v === 'string' && v.trim() ? v.trim() : '';
}

const LABELS: Record<string, string> = {
  interest: 'Interest',
  reason: 'Reason',
  name: 'Name',
  company: 'Company',
  phone: 'Phone',
  email: 'Email',
  city: 'City',
  fleetSize: 'Fleet size',
  model: 'Preferred model',
  startDate: 'Start date',
  message: 'Message',
  source: 'Source',
};
const FIELD_ORDER = [
  'interest', 'reason', 'name', 'company', 'phone', 'email', 'city',
  'fleetSize', 'model', 'startDate', 'source', 'message',
];
const HIDDEN = new Set(['type', 'website']);

const TYPE_META: Record<string, { label: string; kind: 'business' | 'rider' }> = {
  request: { label: 'Business enquiry', kind: 'business' },
  contact: { label: 'Contact enquiry', kind: 'business' },
  rider: { label: 'Rider booking', kind: 'rider' },
};
function typeMeta(lead: Lead) {
  return TYPE_META[str(lead.type)] ?? { label: 'New lead', kind: 'business' as const };
}

/** Ordered [label, value] pairs for whatever fields the lead actually has. */
function fieldRows(lead: Lead): [string, string][] {
  const keys = Object.keys(lead).filter((k) => !HIDDEN.has(k) && str(lead[k]));
  keys.sort((a, b) => {
    const ia = FIELD_ORDER.indexOf(a);
    const ib = FIELD_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  const human = (k: string) =>
    LABELS[k] ?? k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  return keys.map((k) => [human(k), str(lead[k])]);
}

// ---- shared shell ---------------------------------------------------------
function button(href: string, label: string, bg: string, color = C.white): string {
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:11px 20px;background:${bg};color:${color};font-family:${FONT};font-size:14px;font-weight:600;text-decoration:none;border-radius:12px;">${esc(label)}</a>`;
}

function shell(eyebrow: string, preheader: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:${C.mist};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mist};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${C.white};border:1px solid ${C.line};border-radius:16px;overflow:hidden;">
  <!-- header -->
  <tr><td style="background:${C.ink};padding:26px 32px;">
    <div style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.green};">${esc(eyebrow)}</div>
    <div style="font-family:${FONT};font-size:24px;font-weight:700;letter-spacing:-0.02em;color:${C.white};margin-top:6px;">Rumoo<span style="color:${C.green};">EV</span></div>
  </td></tr>
  <!-- body -->
  <tr><td style="padding:32px;font-family:${FONT};color:${C.slate};font-size:16px;line-height:1.6;">${body}</td></tr>
  <!-- footer -->
  <tr><td style="background:${C.mist};border-top:1px solid ${C.line};padding:24px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.slate};">
    <strong style="color:${C.ink};">RumooEV</strong> · ${esc(SITE.offices)} · ${esc(SITE.presence)}<br>
    <a href="tel:+${esc(SITE.phoneRaw)}" style="color:${C.green};text-decoration:none;">${esc(SITE.phoneDisplay)}</a> ·
    <a href="mailto:${esc(SITE.email)}" style="color:${C.green};text-decoration:none;">${esc(SITE.email)}</a> ·
    <a href="${esc(SITE.url)}" style="color:${C.green};text-decoration:none;">www.rumooev.com</a>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ---- admin notification ---------------------------------------------------
export function adminLeadEmail(lead: Lead, meta?: { id?: string; at?: string }) {
  const t = typeMeta(lead);
  const name = str(lead.name) || 'Someone';
  const rows = fieldRows(lead)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${C.slate};vertical-align:top;width:130px;">${esc(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:15px;color:${C.ink};white-space:pre-wrap;">${esc(value)}</td>
      </tr>`,
    )
    .join('');

  const phone = str(lead.phone);
  const email = str(lead.email);
  const waNumber = phone.replace(/[^\d]/g, '');
  const actions = [
    phone ? button(`tel:${phone}`, 'Call', C.green) : '',
    waNumber ? button(`https://wa.me/${waNumber}`, 'WhatsApp', C.whatsapp) : '',
    email ? button(`mailto:${email}`, 'Reply by email', C.ink) : '',
  ].join('');

  const body = `
    <span style="display:inline-block;padding:5px 12px;background:${C.greenLight};color:${C.greenDark};font-size:12px;font-weight:600;border-radius:999px;">${esc(t.label)}</span>
    <h1 style="margin:14px 0 4px;font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:-0.01em;color:${C.ink};">New lead from ${esc(name)}</h1>
    <p style="margin:0 0 20px;font-size:14px;color:${C.slate};">Captured ${esc(meta?.at ?? 'just now')}${meta?.id ? ` · Supabase id <span style="font-family:monospace;">${esc(meta.id)}</span>` : ''}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${actions ? `<div style="margin-top:24px;">${actions}</div>` : ''}
    <p style="margin:24px 0 0;font-size:13px;color:${C.slate};">This lead is saved in the Supabase <code>leads</code> table.</p>`;

  return {
    subject: `New ${t.label.toLowerCase()} — ${name}`,
    html: shell(`New lead · ${t.label}`, `${t.label} from ${name}`, body),
    text: adminText(lead, meta),
  };
}

function adminText(lead: Lead, meta?: { id?: string; at?: string }): string {
  const t = typeMeta(lead);
  const lines = fieldRows(lead).map(([l, v]) => `${l}: ${v}`);
  return [
    `New ${t.label} — RumooEV`,
    `Captured ${meta?.at ?? 'just now'}${meta?.id ? ` (id ${meta.id})` : ''}`,
    '',
    ...lines,
    '',
    'Saved in the Supabase leads table.',
  ].join('\n');
}

// ---- customer confirmation ------------------------------------------------
export function customerLeadEmail(lead: Lead): {
  subject: string;
  html: string;
  text: string;
} | null {
  const email = str(lead.email);
  if (!email) return null; // no address (e.g. rider bookings) → skip

  const t = typeMeta(lead);
  const firstName = (str(lead.name).split(/\s+/)[0] || 'there').replace(/[^\p{L}\p{N}'-]/gu, '');

  const intro =
    t.kind === 'rider'
      ? `We've got your booking request for the <strong style="color:${C.ink};">Rumoo Ultra</strong>. Our team will call you shortly to confirm your start date and get you on the road.`
      : `Thanks for reaching out to RumooEV. We've received your enquiry and our fleet team will get back to you shortly with lease-to-own plans tailored to your operation.`;

  // Light summary of the most relevant fields the customer submitted.
  const summaryKeys = ['interest', 'reason', 'fleetSize', 'model', 'startDate', 'city'];
  const summary = summaryKeys
    .filter((k) => str(lead[k]))
    .map(
      (k) => `
      <tr>
        <td style="padding:6px 0;font-family:${FONT};font-size:13px;color:${C.slate};width:120px;">${esc(LABELS[k] ?? k)}</td>
        <td style="padding:6px 0;font-family:${FONT};font-size:14px;color:${C.ink};">${esc(str(lead[k]))}</td>
      </tr>`,
    )
    .join('');

  const body = `
    <h1 style="margin:0 0 12px;font-family:${FONT};font-size:26px;font-weight:700;letter-spacing:-0.02em;color:${C.ink};">Thanks, ${esc(firstName)}.</h1>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:${C.slate};">${intro}</p>
    ${
      summary
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mist};border:1px solid ${C.line};border-radius:12px;padding:16px 18px;margin:0 0 24px;">
             <tr><td colspan="2" style="padding:0 0 8px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.slate};">What you sent us</td></tr>
             ${summary}
           </table>`
        : ''
    }
    <p style="margin:0 0 8px;font-size:15px;color:${C.slate};">Prefer to talk now? We're one message away.</p>
    <div style="margin:0 0 26px;">
      ${button(`tel:+${SITE.phoneRaw}`, `Call ${SITE.phoneDisplay}`, C.green)}
      ${button(SITE.whatsapp, 'WhatsApp us', C.whatsapp)}
    </div>
    <div style="border-top:1px solid ${C.line};padding-top:20px;">
      <div style="font-family:${FONT};font-size:15px;font-weight:600;color:${C.green};">${esc(SITE.signOff)}</div>
      <div style="font-family:${FONT};font-size:13px;color:${C.slate};margin-top:4px;">${esc(SITE.brandLine)}</div>
    </div>`;

  return {
    subject:
      t.kind === 'rider'
        ? "We've got your Rumoo Ultra booking request"
        : "Thanks for your enquiry — RumooEV will be in touch",
    html: shell(esc(SITE.brandLine), `Thanks ${firstName} — RumooEV received your enquiry.`, body),
    text: customerText(firstName, t.kind),
  };
}

function customerText(firstName: string, kind: 'business' | 'rider'): string {
  const intro =
    kind === 'rider'
      ? "We've got your booking request for the Rumoo Ultra. Our team will call you shortly to confirm your start date."
      : "We've received your enquiry. Our fleet team will get back to you shortly with lease-to-own plans tailored to your operation.";
  return [
    `Thanks, ${firstName}.`,
    '',
    intro,
    '',
    `Prefer to talk now? Call ${SITE.phoneDisplay} or WhatsApp ${SITE.whatsapp}`,
    '',
    SITE.signOff,
    SITE.brandLine,
    '',
    `RumooEV · ${SITE.offices} · ${SITE.presence} · www.rumooev.com`,
  ].join('\n');
}

import { Resend } from 'resend';

// Server-only Resend client for lead notification emails. Like lib/supabase.ts,
// this is null when the key isn't set, so the /api/lead route degrades quietly
// (leads are still stored; email is simply skipped).
//
// RESEND_API_KEY must never reach the browser — no NEXT_PUBLIC_ prefix.

const key = process.env.RESEND_API_KEY;

export const resend: Resend | null = key ? new Resend(key) : null;

// Sender + internal recipient. Defaults match SITE; override per-environment via
// env. NOTE: the FROM domain (rumooev.com) must be verified in Resend → Domains
// before real sends will deliver. Until then, sends fail gracefully and are
// logged — the lead is never lost.
export const LEAD_FROM = process.env.LEAD_FROM_EMAIL || 'RumooEV <business@rumooev.com>';
export const LEAD_NOTIFY = process.env.LEAD_NOTIFY_EMAIL || 'business@rumooev.com';
export const LEAD_REPLY_TO = process.env.LEAD_REPLY_TO || 'business@rumooev.com';

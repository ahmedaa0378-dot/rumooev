import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-only Supabase client. Uses the SERVICE ROLE key, which must never be
// exposed to the browser — this module is only imported by server code (the
// /api/lead route). No NEXT_PUBLIC_ prefix, so Next keeps it server-side.
//
// If the env vars aren't set yet, `supabase` is null and the lead route falls
// back to logging — so the site works before Supabase is wired up.

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase: SupabaseClient | null =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

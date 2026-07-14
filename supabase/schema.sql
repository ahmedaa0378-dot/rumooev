-- RumooEV leads table.
-- Run this once in the Supabase dashboard → SQL Editor → New query → Run.

create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type       text,          -- 'request' | 'rider' | 'contact'
  name       text,
  phone      text,
  email      text,
  city       text,
  payload    jsonb          -- full form data (interest, fleetSize, message, etc.)
);

-- Lock the table down. The /api/lead route uses the service-role key, which
-- bypasses Row Level Security — so no public policy is needed, and anon/public
-- clients cannot read or write leads.
alter table public.leads enable row level security;

-- Optional: quick lookups by newest first.
create index if not exists leads_created_at_idx on public.leads (created_at desc);

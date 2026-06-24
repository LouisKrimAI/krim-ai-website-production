-- Krim demo-booking lead capture.
-- Run once in the Supabase SQL editor (or via `supabase db push`).
-- The website server talks to this table with the SERVICE-ROLE key, which bypasses
-- RLS; RLS is enabled with NO public policies so the anon/public key can read nothing.

create extension if not exists "pgcrypto";

create table if not exists public.demo_leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- form fields
  name                text,
  email               text not null,
  organisation        text,
  role                text,
  market              text,
  automate            text,
  message             text,

  -- lifecycle
  status              text not null default 'new'
                        check (status in ('new', 'booked', 'unsubscribed')),
  booked_at           timestamptz,
  calendly_event_uri  text,

  -- drip sequence
  drip_stage          smallint not null default 0,   -- 0=none 1=confirm 2=nudge1 3=nudge2(done)
  last_emailed_at     timestamptz,

  source              text default 'contact-form',
  unsubscribe_token   uuid not null default gen_random_uuid()
);

-- Cron query path: active leads still in the sequence, oldest first.
create index if not exists demo_leads_drip_idx
  on public.demo_leads (status, drip_stage, last_emailed_at);

-- Webhook + unsubscribe lookups.
create index if not exists demo_leads_email_idx on public.demo_leads (lower(email));
create unique index if not exists demo_leads_unsub_idx on public.demo_leads (unsubscribe_token);

-- Lock it down: deny everything to anon/authenticated; only service-role (which
-- bypasses RLS) may read or write. No policies = no access for public keys.
alter table public.demo_leads enable row level security;

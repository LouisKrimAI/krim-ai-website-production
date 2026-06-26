-- Krim demo-booking lead capture + engagement tracking.
-- Run in the Supabase SQL editor (or `supabase db push`). Safe to re-run.
-- The website server uses the SERVICE-ROLE key (bypasses RLS). RLS is ON with NO
-- public policies, so the anon/public key can read nothing.

create extension if not exists "pgcrypto";

-- ── Leads ────────────────────────────────────────────────────────────────────
create table if not exists public.demo_leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- form fields
  name                text,
  email               text not null,
  organisation        text,
  role                text,
  sector              text,
  market              text,   -- region / market
  automate            text,   -- primary use case
  timeline            text,
  phone               text,
  ai_stage            text,
  heard_about         text,
  message             text,

  -- lifecycle
  status              text not null default 'new'
                        check (status in ('new', 'booked', 'unsubscribed', 'bounced')),
  booked_at           timestamptz,
  calendly_event_uri  text,

  -- drip sequence: 0=none 1=confirm 2=value(+2d) 3=resource(+6d) 4=breakup(+12d, done)
  drip_stage          smallint not null default 0,
  last_emailed_at     timestamptz,

  -- ops
  notes               text,
  source              text default 'contact-form',
  unsubscribe_token   uuid not null default gen_random_uuid()
);

-- Qualification columns — idempotent so this is safe to re-run on an existing table.
alter table public.demo_leads add column if not exists sector      text;
alter table public.demo_leads add column if not exists timeline    text;
alter table public.demo_leads add column if not exists phone       text;
alter table public.demo_leads add column if not exists ai_stage    text;
alter table public.demo_leads add column if not exists heard_about text;

-- Cron query path: active leads still in the sequence, oldest first.
create index if not exists demo_leads_drip_idx
  on public.demo_leads (status, drip_stage, last_emailed_at);
-- Webhook + dedupe + unsubscribe lookups.
create index if not exists demo_leads_email_idx on public.demo_leads (lower(email));
create unique index if not exists demo_leads_unsub_idx on public.demo_leads (unsubscribe_token);

-- ── Activity timeline (sends, clicks, downloads, bounces, bookings, notes) ─────
create table if not exists public.lead_activity (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references public.demo_leads(id) on delete cascade,
  kind            text not null,   -- email_sent | email_delivered | email_clicked
                                   -- | email_bounced | email_complained | download | booked | note
  detail          text,            -- email type, clicked URL, doc key, or note body
  resend_email_id text,            -- correlates Resend events back to a send
  created_at      timestamptz not null default now()
);
create index if not exists lead_activity_lead_idx
  on public.lead_activity (lead_id, created_at desc);
-- Idempotency for replayed Resend webhooks: one event row per (email, kind, url).
create unique index if not exists lead_activity_dedupe_idx
  on public.lead_activity (resend_email_id, kind, coalesce(detail, ''))
  where resend_email_id is not null;

-- ── Lock down: deny anon/authenticated; only service-role (bypasses RLS) reads. ─
alter table public.demo_leads   enable row level security;
alter table public.lead_activity enable row level security;

-- ── Grants ───────────────────────────────────────────────────────────────────
-- The website server connects as `service_role` (via the secret/service key) and
-- must read+write these tables. Grant it explicitly so this works even when the
-- project has "Automatically expose new tables" DISABLED (recommended for PII):
-- with that off, new tables get no role grants, so service_role is denied until
-- we grant it here. anon/authenticated are granted nothing — with RLS on and no
-- policies, the public/anon key still reads nothing.
grant all privileges on public.demo_leads   to service_role;
grant all privileges on public.lead_activity to service_role;

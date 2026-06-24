# Demo booking — setup & operations

The `/contact` "Book a demo" flow: a glass form that **captures the lead in
Supabase**, **emails the lead a confirmation + a 3-step nudge drip** (via Resend),
**notifies sales**, and offers a **Calendly** embed for self-serve scheduling.
A **Calendly webhook** marks a lead booked so the drip stops; a one-click
**unsubscribe** link opts them out.

Everything is env-driven and degrades gracefully — with no secrets set, the form
returns 503 and the UI shows the email/phone fallback (nothing is silently lost).

---

## Architecture

| File | Role |
| --- | --- |
| `app/contact/_client.tsx` | `DemoForm` → POST `/api/demo`; `CalendlyScheduler` → themed inline embed |
| `app/api/demo/route.ts` | Validate + honeypot → insert lead → confirmation + sales email → `drip_stage=1` |
| `app/api/cron/drip/route.ts` | Vercel Cron; sends nudges by `drip_stage` + `last_emailed_at`; only `status='new'` |
| `app/api/calendly/webhook/route.ts` | HMAC-verified `invitee.created` → mark lead `booked` (stops drip) |
| `app/api/unsubscribe/route.ts` | One-click opt-out via per-lead token → `/contact/unsubscribed` |
| `lib/supabase-admin.ts` · `lib/resend.ts` · `lib/emails.ts` | Server clients + email templates |
| `supabase/schema.sql` | The `demo_leads` table (RLS on, no public policies) |
| `vercel.json` | Cron: `/api/cron/drip` daily 14:00 UTC |

**Drip cadence:** confirmation at submit → nudge 1 at **+2 days** → nudge 2 at
**+5 days** → done. Booking or unsubscribe removes the lead from the sequence.
Cron granularity is daily, so nudge timing is ±1 day (intentional, plan-agnostic).

---

## One-time setup

### 1. Calendly
- Copy your event URL (e.g. `https://calendly.com/krim/30min`) → set
  `NEXT_PUBLIC_CALENDLY_URL`.
- **Webhook** (needs a Standard+ plan): Integrations → Webhooks → subscribe to
  `invitee.created` with the URL `https://krim.ai/api/calendly/webhook`. Copy the
  **signing key** → set `CALENDLY_WEBHOOK_SIGNING_KEY`.

### 2. Supabase
- Create (or pick) a project. Run `supabase/schema.sql` in the SQL editor.
- Project Settings → API: copy the **Project URL** → `SUPABASE_URL`, and the
  **`service_role`** key → `SUPABASE_SERVICE_ROLE_KEY` (secret, server-only —
  never `NEXT_PUBLIC`).

### 3. Resend
- Verify your sending domain (Resend → Domains; add the DNS records).
- Create an API key → `RESEND_API_KEY`. Set `EMAIL_FROM` to a verified sender,
  e.g. `Krim <hello@krim.ai>`, and `EMAIL_SALES` to the internal recipient.

### 4. Cron secret
- Generate a long random string → `CRON_SECRET`. Vercel Cron sends it as
  `Authorization: Bearer …` automatically; the route rejects anything else.

### 5. Wire the env
- Local: fill `.env.local` (gitignored). `.env.example` lists every variable.
- Production: add the same keys in the Vercel project (Settings → Environment
  Variables), then redeploy so the cron + routes pick them up.

---

## Test it

- **Form:** submit on `/contact` → a row appears in `demo_leads`, the lead gets a
  confirmation, sales gets a notification.
- **Drip:** trigger manually — `GET /api/cron/drip?secret=$CRON_SECRET`. Returns
  `{ scanned, sent }`. (Or backdate `last_emailed_at` to force a nudge.)
- **Webhook:** book a slot in the embed → the lead flips to `status='booked'`,
  `booked_at` set, and no further nudges go out.
- **Unsubscribe:** click the footer link in any drip email → `status='unsubscribed'`.

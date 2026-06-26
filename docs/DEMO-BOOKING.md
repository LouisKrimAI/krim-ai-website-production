# Demo booking — setup, operations & costs

The `/contact` "Book a demo" flow: a glass form that **captures the lead in
Supabase**, runs a **4-email nurture sequence** (via Resend), **notifies sales**,
tracks **clicks + downloads + bookings**, and offers a **Calendly** embed. A
**Calendly webhook** stops the sequence the moment someone books; a private
**`/admin` dashboard** shows every lead and where they are.

Everything is env-driven and degrades gracefully — with no secrets set, the form
returns 503 and the page shows the email/phone fallback (nothing is lost).

---

## What it costs (at Krim's volume)

| Service | Used for | Cost | Notes |
|---|---|---|---|
| Supabase | Lead DB + activity | **$0** | Free tier is plenty. The daily cron keeps the project from pausing. Pro ($25/mo) only if you want backups. |
| Resend | All email + click/bounce webhook | **$0** | Free = 3,000/mo, 100/day, incl. tracking + 1 webhook. |
| Vercel | Hosting + daily cron | **$0 extra** | A commercial site needs Pro (~$20/mo) regardless; cron is included. |
| Calendly | Scheduling + booking webhook | **~$10/mo** | Standard ($10/seat/mo billed yearly) — required for the webhook that auto-stops the drip. |

**≈ $10/month**, all from Calendly. No per-lead fees.

---

## Architecture

| File | Role |
| --- | --- |
| `app/contact/_client.tsx` | `DemoForm` → POST `/api/demo`; `CalendlyScheduler` → themed inline embed |
| `app/api/demo/route.ts` | Validate + honeypot + dedupe → insert lead → confirmation + sales email → `drip_stage=1` |
| `app/api/cron/drip/route.ts` | Vercel Cron; sends the next email per `lib/booking-config` cadence; `status='new'` only |
| `app/api/calendly/webhook/route.ts` | HMAC-verified `invitee.created` → mark lead `booked` (stops drip) |
| `app/api/resend/webhook/route.ts` | Svix-verified click/bounce/complaint events → `lead_activity` (no opens) |
| `app/api/download/route.ts` | Tracked resource link → logs a `download`, redirects to the asset |
| `app/api/unsubscribe/route.ts` + `app/unsubscribe/*` | RFC-8058 one-click + confirm-page opt-out |
| `app/admin/*` + `app/api/admin/lead/route.ts` + `middleware.ts` | Basic-auth dashboard + actions |
| `lib/booking-config.ts` | **The knobs:** sender identity, cadence/timings, resource registry |
| `lib/emails.ts` · `lib/booking-mailer.ts` | Templates + the single send path (tags, List-Unsubscribe, logging) |
| `lib/supabase-admin.ts` · `lib/resend.ts` · `lib/leads.ts` | Server clients + activity helper |
| `supabase/schema.sql` | `demo_leads` + `lead_activity` (RLS on, no public policies) |
| `vercel.json` | Cron: `/api/cron/drip` daily 14:00 UTC |

**Cadence (edit in `lib/booking-config.ts`):** confirmation at submit → value nudge
**+2d** → resource **+6d** → "should I close your file?" breakup **+12d**. Stops on
booking, unsubscribe, hard bounce, or complaint. Cron is daily, so timing is ±1 day.

**Tracking:** clicks (reliable), downloads (reliable), bookings, bounces. **Opens are
deliberately not tracked** — Apple Mail auto-loads the pixel, so opens lie.

---

## The form

Required: **Name, Work email, Organisation, Role** (dropdown), **Challenges/goals**
(textarea). Optional (under an "Optional — helps us tailor your demo" divider):
**Primary use case, Sector, Region/market, Timeline, Phone, Current AI maturity,
How did you hear**. Required is enforced client-side (inline errors, focus first
invalid) and server-side (422). Dropdown lists + field atoms live in
`app/contact/_client.tsx`; columns in `supabase/schema.sql`.

---

## One-time setup

### 1. Calendly (Standard plan)
- Event URL (e.g. `https://calendly.com/krim/30min`) → `NEXT_PUBLIC_CALENDLY_URL`.
- Integrations → Webhooks → subscribe `invitee.created` to
  `https://krim.ai/api/calendly/webhook`. Copy the signing key → `CALENDLY_WEBHOOK_SIGNING_KEY`.

### 2. Supabase
- Run `supabase/schema.sql` in the SQL editor.
- Settings → API: Project URL → `SUPABASE_URL`; `service_role` key →
  `SUPABASE_SERVICE_ROLE_KEY` (secret, server-only).

### 3. Resend
- Verify a sending domain (ideally a subdomain, e.g. `go.krim.ai`) — add the
  SPF/DKIM/DMARC DNS records. **Enable click tracking; leave open tracking off.**
- API key → `RESEND_API_KEY`; `EMAIL_FROM` (e.g. `Louis Parkinson <louis@krim.ai>`);
  `EMAIL_SALES`.
- Webhooks → add `https://krim.ai/api/resend/webhook` for `email.delivered`,
  `email.clicked`, `email.bounced`, `email.complained`. Signing secret → `RESEND_WEBHOOK_SECRET`.
- Sender identity in emails: `EMAIL_SIGNATURE_NAME`, `EMAIL_SIGNATURE_TITLE`.

### 4. Cron + admin
- `CRON_SECRET` — long random string (Vercel Cron sends it automatically).
- `ADMIN_USER` + `ADMIN_PASSWORD` — unlock `/admin` (Basic auth).
- `SITE_URL` = `https://krim.ai` (for email links).

### 5. Wire env
- Local: `.env.local` (gitignored). `.env.example` lists every variable.
- Production: add the same keys in Vercel → redeploy.

---

## Operating it

- **See leads:** `/admin` — pipeline stage, clicks, downloads, booked/unsub/bounced;
  search, expand for full answers, and mark booked / unsubscribe / add a note.
- **Manual booked:** if you ever drop the Calendly webhook, just hit "Booked" in `/admin`.
- **Swap the resource:** edit `RESOURCES` / `FEATURED_RESOURCE_KEY` in `lib/booking-config.ts`
  (drop a PDF in `public/resources/` and point a key at it).
- **Test the drip:** `GET /api/cron/drip?secret=$CRON_SECRET` → `{ scanned, sent }`.

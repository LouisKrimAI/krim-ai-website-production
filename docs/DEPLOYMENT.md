# Deployment & handover — Krim website

The single source of truth for who owns this site and how it ships. Keep current.
(Companion: `docs/DEMO-BOOKING.md` for the demo-booking stack.)

## Accounts & ownership

| Thing | Value |
| --- | --- |
| Code repo | `github.com/LouisKrimAI/krim-ai-website-production` |
| Repo visibility | **Public** (no secrets committed — see Security below) |
| GitHub owner | **LouisKrimAI** (personal account) — confirmed via `gh repo view` |
| Production / default branch | `main` |
| Framework | Next.js 14 (App Router), React 18 |
| Hosting | **Vercel** — project under the **LouisKrimAI** account |
| Production domain | `krim.ai` (+ `www.krim.ai`) — canonical origin used across the site |
| Git committer | LouisKrimAI <louis@krim.ai> |

## How a deploy happens

- Vercel is connected to the GitHub repo via the Git integration.
  - Push/merge to **`main`** → **Production** deploy.
  - Push to any other branch / open a PR → **Preview** deploy.
- Build settings (Vercel auto-detects Next.js — defaults are correct):
  - Install: `npm install` · Build: `next build` · Output: `.next` · Node: 20.x.
- **Cron:** `vercel.json` registers `GET /api/cron/drip` daily at 14:00 UTC. Needs
  `CRON_SECRET` set and a Vercel plan that allows Cron Jobs.

## Branching

- **Production = `main`.** The rebuild was developed on `recovery` and promoted to
  `main` to release. Day-to-day: branch from `main`, PR back into `main`.

## Environment variables

Set in **Vercel → Project → Settings → Environment Variables** (Production + Preview).
Values live only in Vercel and in a local `.env.local` (gitignored — never committed).
Names + descriptions are in `.env.example`. The site builds and renders **without**
these; the demo-booking form degrades to an email/phone fallback. They switch on lead
capture, emails, and the `/admin` dashboard.

| Variable | Purpose | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly event URL | **Build-time** — set before the build, or redeploy after |
| `SUPABASE_URL` | Lead database | |
| `SUPABASE_SERVICE_ROLE_KEY` | DB writes (server only) | **secret** — bypasses RLS |
| `RESEND_API_KEY` | Send email | **secret** |
| `RESEND_WEBHOOK_SECRET` | Verify click/bounce events | **secret** (`whsec_…`) |
| `EMAIL_FROM` | Verified sender, e.g. `Louis <louis@krim.ai>` | domain verified in Resend |
| `EMAIL_SALES` | Internal new-lead recipient | |
| `EMAIL_SIGNATURE_NAME` / `EMAIL_SIGNATURE_TITLE` | Email sign-off | |
| `CRON_SECRET` | Protects `/api/cron/drip` | **secret** |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | Verify booking webhook | **secret** |
| `ADMIN_USER` / `ADMIN_PASSWORD` | HTTP Basic auth for `/admin` | **secret** |
| `SITE_URL` | Canonical origin for email links | `https://krim.ai` |

## External services (demo booking only)

- **Supabase** — lead DB. Run `supabase/schema.sql` once.
- **Resend** — transactional + drip email. Verify a sending domain (SPF/DKIM/DMARC);
  register a webhook → `https://krim.ai/api/resend/webhook`.
- **Calendly** (Standard plan) — scheduling. Register a webhook →
  `https://krim.ai/api/calendly/webhook`.
- **Asset:** drop the sales deck at `public/resources/krim-deck.pdf` before go-live.
- Full step-by-step: **`docs/DEMO-BOOKING.md`**.

## Security

- `.env`, `.env.local`, `.env*.local` are gitignored. Only `.env.example` (placeholders)
  is in git. **Never commit real secrets.**
- All secrets live in Vercel env + the operator's local `.env.local`.

## History / to verify at handover

- A previous Vercel link existed to a **Team** project (`krim-website-clean`,
  org `team_PvrIBfbZxERMKfdIOD1ulIz7`). If that team isn't the account being kept,
  decommission it so only **one** Vercel project auto-deploys this repo and holds the
  `krim.ai` domain.
- Vercel CLI was not logged in on the build machine at handover.

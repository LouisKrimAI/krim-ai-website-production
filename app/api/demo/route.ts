/**
 * POST /api/demo — demo-request capture.
 *
 * 1. Validate + honeypot.  2. Dedupe (same email within 30 days → update, no new
 * drip).  3. Insert the lead.  4. Send the confirmation (shared mailer, logs
 * activity) + notify sales.  5. Set drip_stage=1 so the cron clock starts here.
 *
 * Degrades gracefully: if Supabase is configured the lead is saved and we return
 * ok even if email fails (the cron re-sends stage 0). If Supabase is NOT
 * configured we 503 so the client shows the email/phone fallback.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin, type DemoLead } from '@/lib/supabase-admin'
import { getResend, emailFrom } from '@/lib/resend'
import { salesNotificationEmail } from '@/lib/emails'
import { sendDripEmail } from '@/lib/booking-mailer'
import { salesInbox } from '@/lib/booking-config'

export const runtime = 'nodejs'

const DEDUPE_WINDOW_DAYS = 30

function clean(v: unknown, max = 2000): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // honeypot — pretend success so bots don't learn anything
  if (clean(body._gotcha)) return NextResponse.json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 254).toLowerCase()
  const organisation = clean(body.organisation, 160)
  const role = clean(body.role, 120)
  const message = clean(body.message, 4000)
  // optional qualification fields
  const sector = clean(body.sector, 80)
  const market = clean(body.market, 80) // region / market
  const automate = clean(body.automate, 200) // primary use case
  const timeline = clean(body.timeline, 80)
  const phone = clean(body.phone, 40)
  const aiStage = clean(body.ai_stage, 80)
  const heardAbout = clean(body.heard_about, 120)

  // Required fields (mirrors the client; server is the source of truth).
  if (!name) return NextResponse.json({ error: 'Your name is required.' }, { status: 422 })
  if (!email || !isEmail(email))
    return NextResponse.json({ error: 'A valid work email is required.' }, { status: 422 })
  if (!organisation) return NextResponse.json({ error: 'Your organisation is required.' }, { status: 422 })
  if (!role) return NextResponse.json({ error: 'Please select your role.' }, { status: 422 })
  if (!message) return NextResponse.json({ error: 'Please tell us what you’d like to solve.' }, { status: 422 })

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Booking is temporarily unavailable.' }, { status: 503 })
  }

  const fields = {
    name,
    email,
    organisation,
    role,
    sector: sector || null,
    market: market || null,
    automate: automate || null,
    timeline: timeline || null,
    phone: phone || null,
    ai_stage: aiStage || null,
    heard_about: heardAbout || null,
    message,
  }

  // Dedupe: if this person already submitted recently, freshen their row and
  // don't start a second drip (avoids double-emailing on a re-submit).
  const cutoff = new Date(Date.now() - DEDUPE_WINDOW_DAYS * 86400000).toISOString()
  const { data: existing } = await supabase
    .from('demo_leads')
    .select('id')
    .eq('email', email)
    .gte('created_at', cutoff)
    .neq('status', 'unsubscribed')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing) {
    await supabase.from('demo_leads').update(fields).eq('id', existing.id)
    return NextResponse.json({ ok: true, deduped: true })
  }

  const { data: lead, error } = await supabase
    .from('demo_leads')
    .insert({ ...fields, source: 'contact-form' })
    .select()
    .single<DemoLead>()

  if (error || !lead) {
    console.error('[demo] supabase insert failed:', error?.message)
    return NextResponse.json({ error: 'Could not save your request.' }, { status: 500 })
  }

  // Confirmation (logs activity); never block the user on a mail failure.
  const confirmId = await sendDripEmail(supabase, lead, 'confirmation')

  // Internal sales notification (separate from the lead-facing drip).
  const resend = getResend()
  if (resend) {
    const notify = salesNotificationEmail(lead)
    resend.emails
      .send({ from: emailFrom(), to: salesInbox(), replyTo: email, ...notify })
      .then((r) => r.error && console.error('[demo] sales notification failed:', r.error))
      .catch((e) => console.error('[demo] sales notification threw:', e))
  }

  // Start the drip clock here only if the confirmation actually went out.
  if (confirmId) {
    await supabase
      .from('demo_leads')
      .update({ drip_stage: 1, last_emailed_at: new Date().toISOString() })
      .eq('id', lead.id)
  }

  return NextResponse.json({ ok: true })
}

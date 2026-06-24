/**
 * POST /api/demo — demo-request capture.
 *
 * 1. Validate + honeypot.  2. Insert the lead into Supabase (drip_stage 0).
 * 3. Send the confirmation email to the lead + a notification to sales (Resend).
 *
 * Degrades gracefully: if Supabase is configured the lead is saved and we return
 * ok even if email fails (lead is the source of truth, the drip cron retries the
 * first touch). If Supabase is NOT configured we 503 so the client shows the
 * email/phone fallback rather than silently dropping the request.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getResend, emailFrom } from '@/lib/resend'
import { confirmationEmail, salesNotificationEmail } from '@/lib/emails'

export const runtime = 'nodejs'

const MARKETS = new Set(['US', 'UK', 'India'])

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
  const market = clean(body.market, 40)
  const automate = clean(body.automate, 200)
  const message = clean(body.message, 4000)

  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: 'A valid work email is required.' }, { status: 422 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    // Capture isn't wired in this environment — tell the client to show the fallback.
    return NextResponse.json({ error: 'Booking is temporarily unavailable.' }, { status: 503 })
  }

  const { data: lead, error } = await supabase
    .from('demo_leads')
    .insert({
      name: name || null,
      email,
      organisation: organisation || null,
      role: role || null,
      market: MARKETS.has(market) ? market : market || null,
      automate: automate || null,
      message: message || null,
      source: 'contact-form',
    })
    .select()
    .single()

  if (error || !lead) {
    console.error('[demo] supabase insert failed:', error?.message)
    return NextResponse.json({ error: 'Could not save your request.' }, { status: 500 })
  }

  // Fire emails; never block the user on a mail failure (the cron re-touches stage 0).
  const resend = getResend()
  if (resend) {
    const sales = process.env.EMAIL_SALES || 'sales@krim.ai'
    const confirm = confirmationEmail(lead)
    const notify = salesNotificationEmail(lead)
    const [confirmRes, notifyRes] = await Promise.allSettled([
      resend.emails.send({ from: emailFrom(), to: email, replyTo: sales, ...confirm }),
      resend.emails.send({ from: emailFrom(), to: sales, replyTo: email, ...notify }),
    ])
    if (confirmRes.status === 'rejected' || confirmRes.value?.error)
      console.error('[demo] confirmation email failed:', confirmRes.status === 'rejected' ? confirmRes.reason : confirmRes.value.error)
    if (notifyRes.status === 'rejected' || notifyRes.value?.error)
      console.error('[demo] sales notification failed:', notifyRes.status === 'rejected' ? notifyRes.reason : notifyRes.value.error)

    // Mark the first drip touch as sent so the cron starts the clock from here.
    // If confirmation failed, leave drip_stage 0 so the cron re-sends it.
    if (confirmRes.status === 'fulfilled' && !confirmRes.value?.error) {
      await supabase
        .from('demo_leads')
        .update({ drip_stage: 1, last_emailed_at: new Date().toISOString() })
        .eq('id', lead.id)
    }
  } else {
    console.warn('[demo] RESEND_API_KEY unset — lead saved, no email sent.')
  }

  return NextResponse.json({ ok: true })
}

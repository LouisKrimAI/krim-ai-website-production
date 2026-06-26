/**
 * GET /api/cron/drip — the follow-up sequence engine. Hit by Vercel Cron (see
 * vercel.json) and protected by CRON_SECRET. Idempotent: cadence is driven by
 * drip_stage + last_emailed_at (lib/booking-config.ts), not by run frequency.
 * Also keeps the Supabase free project awake (a daily query counts as activity).
 *
 * Only status='new' leads are touched — booking (Calendly webhook), unsubscribe,
 * or a hard bounce flips status and removes the lead from the sequence.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin, type DemoLead } from '@/lib/supabase-admin'
import { getResend } from '@/lib/resend'
import { sendDripEmail } from '@/lib/booking-mailer'
import { nextDripStep, DRIP_DONE_STAGE } from '@/lib/booking-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  if (req.headers.get('authorization') === `Bearer ${secret}`) return true // Vercel Cron
  return new URL(req.url).searchParams.get('secret') === secret // manual trigger
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = getSupabaseAdmin()
  const resend = getResend()
  if (!supabase || !resend) {
    return NextResponse.json({ error: 'Drip not configured (Supabase/Resend).' }, { status: 503 })
  }

  const now = Date.now()
  const { data, error } = await supabase
    .from('demo_leads')
    .select('*')
    .eq('status', 'new')
    .lt('drip_stage', DRIP_DONE_STAGE)
    .order('created_at', { ascending: true })
    .limit(500)

  if (error) {
    console.error('[cron/drip] query failed:', error.message)
    return NextResponse.json({ error: 'Query failed.' }, { status: 500 })
  }

  const leads = (data || []) as DemoLead[]
  let sent = 0

  for (const lead of leads) {
    const step = nextDripStep(lead.drip_stage)
    if (!step) continue
    const since = lead.last_emailed_at ? now - new Date(lead.last_emailed_at).getTime() : Infinity
    if (since < step.gapMs) continue

    const id = await sendDripEmail(supabase, lead, step.template)
    if (!id) continue // send failed → stage unchanged → retried next run

    const { error: upErr } = await supabase
      .from('demo_leads')
      .update({ drip_stage: step.stage, last_emailed_at: new Date().toISOString() })
      .eq('id', lead.id)
      .eq('drip_stage', lead.drip_stage) // optimistic guard against overlapping runs
    if (upErr) console.error(`[cron/drip] stage update failed for ${lead.id}:`, upErr.message)
    else sent++
  }

  return NextResponse.json({ ok: true, scanned: leads.length, sent })
}

/**
 * GET /api/cron/drip — the follow-up sequence engine. Hit by Vercel Cron (see
 * vercel.json) and protected by CRON_SECRET. Idempotent: safe to run hourly or
 * daily; cadence is driven by drip_stage + last_emailed_at, not by run frequency.
 *
 * Stages (drip_stage):
 *   0 → confirmation never sent (insert-time email failed): send confirmation now
 *   1 → confirmation sent; after +2 days send nudge 1
 *   2 → nudge 1 sent;       after +3 days (so +5 total) send nudge 2
 *   3 → done
 * Only status='new' leads are touched — a booking (Calendly webhook) or an
 * unsubscribe flips status and removes the lead from the sequence.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin, type DemoLead } from '@/lib/supabase-admin'
import { getResend, emailFrom } from '@/lib/resend'
import { confirmationEmail, nudgeEmail1, nudgeEmail2 } from '@/lib/emails'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAY = 24 * 60 * 60 * 1000
const GAP_TO_NUDGE_1 = 2 * DAY // confirmation → nudge 1
const GAP_TO_NUDGE_2 = 3 * DAY // nudge 1 → nudge 2 (5 days after confirmation)

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = req.headers.get('authorization')
  if (header === `Bearer ${secret}`) return true // Vercel Cron sends this automatically
  return new URL(req.url).searchParams.get('secret') === secret // manual trigger fallback
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  const resend = getResend()
  if (!supabase || !resend) {
    return NextResponse.json({ error: 'Drip not configured (Supabase/Resend).' }, { status: 503 })
  }

  const now = Date.now()

  // Pull active leads still in the sequence. Small volume; a single scan is fine.
  const { data, error } = await supabase
    .from('demo_leads')
    .select('*')
    .eq('status', 'new')
    .lt('drip_stage', 3)
    .order('created_at', { ascending: true })
    .limit(200)

  if (error) {
    console.error('[cron/drip] query failed:', error.message)
    return NextResponse.json({ error: 'Query failed.' }, { status: 500 })
  }

  const leads = (data || []) as DemoLead[]
  let sent = 0

  for (const lead of leads) {
    const since = lead.last_emailed_at ? now - new Date(lead.last_emailed_at).getTime() : Infinity
    let build: ((l: DemoLead) => { subject: string; html: string; text: string }) | null = null
    let nextStage = lead.drip_stage

    if (lead.drip_stage === 0) {
      build = confirmationEmail
      nextStage = 1
    } else if (lead.drip_stage === 1 && since >= GAP_TO_NUDGE_1) {
      build = nudgeEmail1
      nextStage = 2
    } else if (lead.drip_stage === 2 && since >= GAP_TO_NUDGE_2) {
      build = nudgeEmail2
      nextStage = 3
    }

    if (!build) continue

    const mail = build(lead)
    try {
      const res = await resend.emails.send({
        from: emailFrom(),
        to: lead.email,
        replyTo: process.env.EMAIL_SALES || 'sales@krim.ai',
        ...mail,
      })
      if (res.error) {
        console.error(`[cron/drip] send failed for ${lead.id}:`, res.error)
        continue // leave stage unchanged → retried next run
      }
    } catch (e) {
      console.error(`[cron/drip] send threw for ${lead.id}:`, e)
      continue
    }

    const { error: upErr } = await supabase
      .from('demo_leads')
      .update({ drip_stage: nextStage, last_emailed_at: new Date().toISOString() })
      .eq('id', lead.id)
      .eq('drip_stage', lead.drip_stage) // optimistic guard against double-send across overlapping runs
    if (upErr) console.error(`[cron/drip] stage update failed for ${lead.id}:`, upErr.message)
    else sent++
  }

  return NextResponse.json({ ok: true, scanned: leads.length, sent })
}

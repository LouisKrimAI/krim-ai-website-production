/**
 * POST /api/calendly/webhook — inbound booking events from Calendly.
 *
 * On invitee.created we mark the matching lead 'booked' (removing it from the
 * drip — the cron only touches status='new') and log a 'booked' activity.
 * Requests are HMAC-verified with CALENDLY_WEBHOOK_SIGNING_KEY, so a forged call
 * can't flip lead state.
 *
 * Register this URL once in Calendly (Integrations → Webhooks) for invitee.created.
 */

import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { recordActivity } from '@/lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Verify Calendly's `t=…,v1=…` signature against the raw request body. */
function verify(raw: string, header: string | null, key: string): boolean {
  if (!header) return false
  const parts: Record<string, string> = {}
  for (const kv of header.split(',')) {
    const i = kv.indexOf('=')
    if (i > 0) parts[kv.slice(0, i).trim()] = kv.slice(i + 1).trim()
  }
  if (!parts.t || !parts.v1) return false
  const expected = crypto.createHmac('sha256', key).update(`${parts.t}.${raw}`).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(parts.v1)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  const key = process.env.CALENDLY_WEBHOOK_SIGNING_KEY
  if (!key) return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })

  const raw = await req.text()
  if (!verify(raw, req.headers.get('calendly-webhook-signature'), key)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let body: { event?: string; payload?: Record<string, unknown> }
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  if (body.event !== 'invitee.created') {
    return NextResponse.json({ ok: true, ignored: body.event })
  }

  const payload = body.payload || {}
  const email = String(payload.email || '').trim().toLowerCase()
  const eventUri =
    (payload.scheduled_event as { uri?: string } | undefined)?.uri ||
    (typeof payload.uri === 'string' ? payload.uri : null)
  if (!email) return NextResponse.json({ ok: true, ignored: 'no-email' })

  const supabase = getSupabaseAdmin()
  if (!supabase) return NextResponse.json({ error: 'Capture not configured.' }, { status: 503 })

  // Mark active leads with this email as booked.
  const { data, error } = await supabase
    .from('demo_leads')
    .update({ status: 'booked', booked_at: new Date().toISOString(), calendly_event_uri: eventUri })
    .eq('email', email)
    .neq('status', 'unsubscribed')
    .select('id')

  if (error) {
    console.error('[calendly] update failed:', error.message)
    return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
  }

  for (const row of data || []) {
    await recordActivity(supabase, { lead_id: row.id, kind: 'booked', detail: eventUri })
  }

  return NextResponse.json({ ok: true, matched: data?.length ?? 0 })
}

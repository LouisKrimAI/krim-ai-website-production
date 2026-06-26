/**
 * POST /api/resend/webhook — email engagement events from Resend (Svix-signed).
 *
 * We record the reliable signals only — delivered, clicked, bounced, complained.
 * Opens are deliberately NOT tracked (Apple Mail auto-loads the pixel → false
 * opens). A complaint unsubscribes the lead; a hard bounce marks it 'bounced'.
 * Both remove it from the drip. Each send is tagged with lead_id, which is how an
 * event maps back to a lead.
 *
 * Register this URL in Resend (Webhooks) and put the signing secret (whsec_…) in
 * RESEND_WEBHOOK_SECRET. Enable click tracking; leave open tracking off.
 */

import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { recordActivity } from '@/lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ResendEvent = {
  type: string
  data?: {
    email_id?: string
    tags?: Array<{ name: string; value: string }> | Record<string, string>
    click?: { link?: string }
    bounce?: { type?: string; subType?: string }
  }
}

function leadIdFrom(data: ResendEvent['data']): string | null {
  const tags = data?.tags
  if (Array.isArray(tags)) return tags.find((t) => t.name === 'lead_id')?.value ?? null
  if (tags && typeof tags === 'object') return tags.lead_id ?? null
  return null
}

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })

  const raw = await req.text()
  let evt: ResendEvent
  try {
    evt = new Webhook(secret).verify(raw, {
      'svix-id': req.headers.get('svix-id') ?? '',
      'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
      'svix-signature': req.headers.get('svix-signature') ?? '',
    }) as ResendEvent
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  const leadId = leadIdFrom(evt.data)
  if (!leadId) return NextResponse.json({ ok: true, ignored: 'no-lead-tag' })

  const supabase = getSupabaseAdmin()
  if (!supabase) return NextResponse.json({ error: 'Capture not configured.' }, { status: 503 })

  const emailId = evt.data?.email_id ?? null

  switch (evt.type) {
    case 'email.delivered':
      await recordActivity(supabase, { lead_id: leadId, kind: 'email_delivered', resend_email_id: emailId })
      break
    case 'email.clicked':
      await recordActivity(supabase, {
        lead_id: leadId,
        kind: 'email_clicked',
        detail: evt.data?.click?.link ?? null,
        resend_email_id: emailId,
      })
      break
    case 'email.bounced': {
      const hard = /perman|hard/i.test(`${evt.data?.bounce?.type} ${evt.data?.bounce?.subType}`)
      await recordActivity(supabase, {
        lead_id: leadId,
        kind: 'email_bounced',
        detail: evt.data?.bounce?.type ?? null,
        resend_email_id: emailId,
      })
      if (hard) {
        await supabase.from('demo_leads').update({ status: 'bounced' }).eq('id', leadId).eq('status', 'new')
      }
      break
    }
    case 'email.complained':
      await recordActivity(supabase, { lead_id: leadId, kind: 'email_complained', resend_email_id: emailId })
      await supabase.from('demo_leads').update({ status: 'unsubscribed' }).eq('id', leadId).neq('status', 'booked')
      break
    default:
      return NextResponse.json({ ok: true, ignored: evt.type }) // opens etc.
  }

  return NextResponse.json({ ok: true })
}

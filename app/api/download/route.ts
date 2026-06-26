/**
 * GET /api/download?token=<lead token>&doc=<key> — tracked resource link.
 * Logs a 'download' activity for the lead, then redirects to the real asset
 * (lib/booking-config RESOURCES). The download always proceeds; logging is
 * best-effort so a tracking hiccup never blocks the file.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { recordActivity } from '@/lib/leads'
import { RESOURCES, siteUrl } from '@/lib/booking-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')?.trim()
  const docKey = url.searchParams.get('doc')?.trim() || ''
  const resource = RESOURCES[docKey]

  if (!resource) {
    return NextResponse.redirect(`${siteUrl()}/`, { status: 302 })
  }

  if (token) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const { data: lead } = await supabase
        .from('demo_leads')
        .select('id')
        .eq('unsubscribe_token', token)
        .maybeSingle()
      if (lead) await recordActivity(supabase, { lead_id: lead.id, kind: 'download', detail: docKey })
    }
  }

  const dest = resource.url.startsWith('http') ? resource.url : `${siteUrl()}${resource.url}`
  return NextResponse.redirect(dest, { status: 302 })
}

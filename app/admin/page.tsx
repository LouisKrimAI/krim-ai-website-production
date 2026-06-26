/**
 * /admin — private lead dashboard (Basic auth via middleware.ts).
 * Server-fetches leads + activity from Supabase (service role), aggregates the
 * engagement signals, and renders a pipeline view with inline actions. Dark glass
 * to match the site. noindex; never linked from the public nav.
 */

import type { Metadata } from 'next'
import { getSupabaseAdmin, type DemoLead, type LeadActivity } from '@/lib/supabase-admin'
import { AdminTable, type LeadRow } from './_client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Lead dashboard',
  robots: { index: false, follow: false },
}

const STAGE_LABEL = ['New', 'Confirmed', 'Nudged', 'Resource sent', 'Sequence complete']

function stageLabel(lead: DemoLead): string {
  if (lead.status === 'booked') return 'Booked'
  if (lead.status === 'unsubscribed') return 'Unsubscribed'
  if (lead.status === 'bounced') return 'Bounced'
  return STAGE_LABEL[lead.drip_stage] ?? `Stage ${lead.drip_stage}`
}

export default async function AdminPage() {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return (
      <main className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <h1 className="font-serif text-display-2 text-ink">Dashboard not configured</h1>
        <p className="mt-4 font-sans text-body text-ink-2">
          Set <code className="text-mint">SUPABASE_URL</code> and{' '}
          <code className="text-mint">SUPABASE_SERVICE_ROLE_KEY</code>, then reload.
        </p>
      </main>
    )
  }

  const { data: leadsData } = await supabase
    .from('demo_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)
  const leads = (leadsData || []) as DemoLead[]

  const ids = leads.map((l) => l.id)
  let activity: LeadActivity[] = []
  if (ids.length) {
    const { data } = await supabase
      .from('lead_activity')
      .select('*')
      .in('lead_id', ids)
      .order('created_at', { ascending: false })
      .limit(5000)
    activity = (data || []) as LeadActivity[]
  }

  // Aggregate engagement per lead.
  const agg = new Map<string, { clicks: number; downloads: number; delivered: number; lastAt: string | null }>()
  for (const a of activity) {
    const e = agg.get(a.lead_id) || { clicks: 0, downloads: 0, delivered: 0, lastAt: null }
    if (a.kind === 'email_clicked') e.clicks++
    else if (a.kind === 'download') e.downloads++
    else if (a.kind === 'email_delivered') e.delivered++
    if (!e.lastAt || a.created_at > e.lastAt) e.lastAt = a.created_at
    agg.set(a.lead_id, e)
  }

  const rows: LeadRow[] = leads.map((l) => {
    const e = agg.get(l.id)
    return {
      id: l.id,
      created_at: l.created_at,
      name: l.name,
      email: l.email,
      organisation: l.organisation,
      role: l.role,
      sector: l.sector,
      market: l.market,
      automate: l.automate,
      timeline: l.timeline,
      phone: l.phone,
      ai_stage: l.ai_stage,
      heard_about: l.heard_about,
      message: l.message,
      status: l.status,
      stage: stageLabel(l),
      clicks: e?.clicks ?? 0,
      downloads: e?.downloads ?? 0,
      lastActivity: e?.lastAt ?? l.last_emailed_at ?? null,
      notes: l.notes,
    }
  })

  const summary = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    booked: leads.filter((l) => l.status === 'booked').length,
    unsubscribed: leads.filter((l) => l.status === 'unsubscribed').length,
    bounced: leads.filter((l) => l.status === 'bounced').length,
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Krim · internal</p>
        <h1 className="mt-2 font-serif text-display-2 text-ink">Demo leads</h1>
      </header>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ['Total', summary.total, 'text-ink'],
          ['Active', summary.new, 'text-mint'],
          ['Booked', summary.booked, 'text-mint'],
          ['Unsubscribed', summary.unsubscribed, 'text-ink-3'],
          ['Bounced', summary.bounced, 'text-gold'],
        ].map(([label, value, color]) => (
          <div key={label as string} className="glass rounded-lg p-4">
            <div className={`font-serif text-[1.9rem] leading-none ${color as string}`}>{value as number}</div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{label as string}</div>
          </div>
        ))}
      </div>

      <AdminTable rows={rows} />
    </main>
  )
}

'use client'

/**
 * Admin lead table — filter, expandable detail, and inline actions
 * (mark booked / unsubscribe / reactivate / note) via /api/admin/lead.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export type LeadRow = {
  id: string
  created_at: string
  name: string | null
  email: string
  organisation: string | null
  role: string | null
  sector: string | null
  market: string | null
  automate: string | null
  timeline: string | null
  phone: string | null
  ai_stage: string | null
  heard_about: string | null
  message: string | null
  status: string
  stage: string
  clicks: number
  downloads: number
  lastActivity: string | null
  notes: string | null
}

const STATUS_STYLE: Record<string, string> = {
  new: 'bg-mint/10 text-mint border-mint/30',
  booked: 'bg-mint/20 text-mint border-mint/50',
  unsubscribed: 'bg-white/5 text-ink-3 border-soft',
  bounced: 'bg-gold/10 text-gold border-gold/30',
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export function AdminTable({ rows }: { rows: LeadRow[] }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const router = useRouter()

  const filtered = rows.filter((r) => {
    if (!q.trim()) return true
    const hay = `${r.name} ${r.email} ${r.organisation} ${r.role} ${r.automate}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  })

  async function act(id: string, action: string, value?: string) {
    setBusy(id)
    try {
      const res = await fetch('/api/admin/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, value }),
      })
      if (res.ok) startTransition(() => router.refresh())
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search name, email, company, role…"
        className="mb-4 h-11 w-full max-w-[380px] rounded border border-soft bg-white/[0.03] px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-3 focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40"
      />

      <div className="glass overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-soft font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 text-center font-medium">Clicks</th>
                <th className="px-4 py-3 text-center font-medium">Dls</th>
                <th className="px-4 py-3 font-medium">Last</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="font-sans text-[14px] text-ink-2">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-3">
                    No leads yet.
                  </td>
                </tr>
              )}
              {filtered.map((r) => (
                <FragmentRow
                  key={r.id}
                  r={r}
                  open={open === r.id}
                  busy={busy === r.id}
                  onToggle={() => setOpen(open === r.id ? null : r.id)}
                  onAct={act}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 font-sans text-[12px] text-ink-3">
        Showing {filtered.length} of {rows.length}. Opens aren&rsquo;t tracked (unreliable); clicks and
        downloads are.
      </p>
    </div>
  )
}

function FragmentRow({
  r,
  open,
  busy,
  onToggle,
  onAct,
}: {
  r: LeadRow
  open: boolean
  busy: boolean
  onToggle: () => void
  onAct: (id: string, action: string, value?: string) => void
}) {
  function note() {
    const v = window.prompt('Note for this lead:', r.notes ?? '')
    if (v !== null) onAct(r.id, 'note', v)
  }
  return (
    <>
      <tr className="border-b border-soft/60 align-top transition-colors hover:bg-white/[0.02]">
        <td className="px-4 py-3">
          <button onClick={onToggle} className="text-left">
            <div className="font-medium text-ink">{r.name || '—'}</div>
            <div className="text-[13px] text-ink-3">{r.email}</div>
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="text-ink">{r.organisation || '—'}</div>
          <div className="text-[13px] text-ink-3">{r.role || ''}</div>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
              STATUS_STYLE[r.status] || STATUS_STYLE.new
            }`}
          >
            {r.stage}
          </span>
        </td>
        <td className="px-4 py-3 text-center tabular-nums">{r.clicks || '—'}</td>
        <td className="px-4 py-3 text-center tabular-nums">{r.downloads || '—'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-[13px] text-ink-3">{fmtDate(r.lastActivity)}</td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {r.status !== 'booked' && (
              <ActionBtn label="Booked" onClick={() => onAct(r.id, 'book')} disabled={busy} />
            )}
            {r.status !== 'unsubscribed' && r.status !== 'bounced' && (
              <ActionBtn label="Unsub" onClick={() => onAct(r.id, 'unsubscribe')} disabled={busy} />
            )}
            {(r.status === 'unsubscribed' || r.status === 'bounced' || r.status === 'booked') && (
              <ActionBtn label="Reactivate" onClick={() => onAct(r.id, 'reactivate')} disabled={busy} />
            )}
            <ActionBtn label="Note" onClick={note} disabled={busy} />
          </div>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-soft/60 bg-white/[0.015]">
          <td colSpan={7} className="px-4 py-4">
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <Detail label="Role" value={r.role} />
              <Detail label="Sector" value={r.sector} />
              <Detail label="Primary use case" value={r.automate} />
              <Detail label="Region / market" value={r.market} />
              <Detail label="Timeline" value={r.timeline} />
              <Detail label="Current AI maturity" value={r.ai_stage} />
              <Detail label="Phone" value={r.phone} />
              <Detail label="How did you hear" value={r.heard_about} />
              <Detail label="Submitted" value={new Date(r.created_at).toLocaleString('en-GB')} />
              <Detail label="Notes" value={r.notes} />
              <div className="sm:col-span-2">
                <Detail label="Message" value={r.message} />
              </div>
            </dl>
          </td>
        </tr>
      )}
    </>
  )
}

function ActionBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded border border-soft px-2.5 py-1 font-sans text-[12px] text-ink-2 transition-colors hover:border-mint/50 hover:text-mint disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  )
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">{label}</dt>
      <dd className="mt-0.5 font-sans text-[14px] text-ink-2">{value || '—'}</dd>
    </div>
  )
}

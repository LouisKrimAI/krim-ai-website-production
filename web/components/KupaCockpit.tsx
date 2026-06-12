'use client'

/**
 * KupaCockpit — one real product surface, so the page reads as software.
 * The glass cockpit (krim-content.md): unified view, human-in-the-loop
 * queues, kill switches, audit workspace. The AMBER action held by the
 * ledger upstairs reappears here in the exception queue — one system.
 */

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const QUEUES = [
  ['Servicing', '1,284', 'mint'],
  ['Collections · DPD 1–30', '312', 'mint'],
  ['Hardship', '41', 'amber'],
  ['Exceptions', '3', 'amber'],
] as const

const VOLS = [62, 78, 54, 84, 70, 92, 66, 88, 75, 96, 81, 90]

export default function KupaCockpit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="glass overflow-hidden"
      role="img"
      aria-label="Kupa command center, illustrative view: queues, validation rate, exception queue, kill switches"
    >
      {/* title bar — honestly stamped: this is a specimen, not production telemetry */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-rline-soft bg-white/[0.02]">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-rtext-2">
          <span className="text-mint">Kupa</span> · command center · all lifecycles
        </p>
        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-rtext-3 border border-rline-soft rounded px-2 py-1">
          Illustrative · simulated data
        </span>
      </div>

      <div className="grid md:grid-cols-[200px_1fr_1fr] gap-px bg-rline-soft">
        {/* queues rail */}
        <div className="bg-runtime p-4 space-y-1.5">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-3">Queues</p>
          {QUEUES.map(([q, nx, tone]) => (
            <div key={q} className="flex items-center justify-between px-3 py-2.5 border border-rline-soft bg-white/[0.015]">
              <span className="font-sans text-[12px] text-rtext-2">{q}</span>
              <span className={`font-mono text-[11px] ${tone === 'mint' ? 'text-mint' : 'text-amber-dark'}`}>{nx}</span>
            </div>
          ))}
          <div className="pt-3">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-2">Kill switches</p>
            <div className="flex items-center justify-between px-3 py-2.5 border border-rline-soft">
              <span className="font-sans text-[12px] text-rtext-2">Vox-Out · IN</span>
              <span className="w-7 h-[14px] rounded-full bg-mint/25 relative" aria-hidden>
                <span className="absolute right-[2px] top-[2px] w-[10px] h-[10px] rounded-full bg-mint" />
              </span>
            </div>
          </div>
        </div>

        {/* live volumes + validation */}
        <div className="bg-runtime p-4">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-3">Validated actions · simulated day</p>
          {/* plausible mid-size-book scale; coheres with the rates below
              (0.7% amber ≈ 2.9k routed today; the queue shows what's open NOW) */}
          <p className="font-mono text-[22px] text-rtext mb-4">412,806</p>
          {/* validated = mint, per the colour grammar (cyan is proposed/thinking) */}
          <div className="flex items-end gap-1 h-[72px] mb-5" aria-hidden>
            {VOLS.map((v, i) => (
              <span key={i} className="flex-1 bg-mint/25" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="space-y-2">
            {([['pass', '99.2%', 'bg-mint', 'text-mint'], ['amber · held', '0.7%', 'bg-amber-dark', 'text-amber-dark'], ['fail · blocked', '0.1%', 'bg-fail', 'text-fail']] as const).map(([k, v, dot, tx]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[10.5px] text-rtext-3">
                  <span className={`w-[6px] h-[6px] rounded-full ${dot}`} aria-hidden /> {k}
                </span>
                <span className={`font-mono text-[11px] ${tx}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* exception queue — the held action from the ledger */}
        <div className="bg-runtime p-4">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-3">Exception queue · open now · human-in-the-loop</p>
          <div className="border border-amber-dark/50 bg-amber-dark/[0.06] p-3.5 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] text-amber-dark">SEND_EMAIL · LN 205116</span>
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-amber-dark">amber</span>
            </div>
            <p className="font-sans text-[12px] leading-relaxed text-rtext-2 mb-3">
              Settlement offer outside approved range. Blocking rule: <span className="font-mono text-[11px] text-rtext">POLICY/SETTLE-04</span> — reasoning attached.
            </p>
            <div className="flex gap-2">
              <span className="font-mono text-[10px] px-3 py-1.5 bg-mint text-mint-on">Review</span>
              <span className="font-mono text-[10px] px-3 py-1.5 border border-rline-soft text-rtext-3">Reassign</span>
            </div>
          </div>
          <div className="border border-rline-soft p-3.5 opacity-60">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-rtext-2">HARDSHIP_FLAG · LN 204998</span>
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-rtext-3">queued</span>
            </div>
          </div>
          <p className="font-mono text-[9.5px] tracking-[0.08em] text-rtext-3 mt-4">
            Every decision here lands on the same ledger the auditor reads.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

/**
 * The evidentiary artifacts on the ONE CANVAS (v3): Stamp · LiveLedger
 * (with the honest AMBER row) · ReceiptDoc — glass panels floating above
 * the system. Grammar: mint = validated/learned · gold = exception ·
 * cyan = proposed. All figures are specimens and say so (panel finding:
 * never imply production telemetry).
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export function Stamp({ delay = 0.3, className = '' }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.12, rotate: -7 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.28, delay, ease: [0.2, 0.9, 0.3, 1.2] }}
      className={`inline-block select-none ${className}`}
      aria-hidden
    >
      <div className="px-5 py-2.5 border-[2.5px] border-mint/80 text-mint rounded-sm">
        <p className="font-mono text-[12px] md:text-[13px] tracking-[0.22em] font-medium leading-tight">VALIDATED</p>
        <p className="font-mono text-[8.5px] tracking-[0.18em]">PRE-EXECUTION · 33 OF 33</p>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
const ROWS = [
  { t: '09:41:07', act: 'MAKE_CALL', detail: 'acct ··4421 · Vox-Out · TCPA, hours, Reg F, DNC', j: 'US', verdict: 'PASS' },
  { t: '09:41:09', act: 'GENERATE_NOTICE', detail: 'arrears wording v41 · Consumer Duty, CONC 7.3', j: 'UK', verdict: 'PASS' },
  { t: '09:41:12', act: 'PROCESS_PAYMENT', detail: 'plan 3 of 6 · mandate live · amount matched', j: 'IN', verdict: 'PASS' },
  { t: '09:41:15', act: 'SEND_EMAIL', detail: 'settlement offer · outside approved range', j: 'US', verdict: 'AMBER' },
  { t: '09:41:15', act: '· held', detail: 'routed to the exception queue with the blocking rule + its reasoning', j: '—', verdict: 'QUEUE' },
  { t: '09:41:18', act: 'BUREAU_LOOKUP', detail: 'consent verified · purpose logged', j: 'IN', verdict: 'PASS' },
] as const

const verdictColor = (v: string) => (v === 'PASS' ? 'text-mint' : v === 'AMBER' ? 'text-amber-dark' : 'text-rtext-3')

export function LiveLedger() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.3 })
  const [reduce, setReduce] = useState(false)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setReduce(true); setN(ROWS.length) }
  }, [])
  useEffect(() => {
    if (!seen || reduce || n >= ROWS.length) return
    const t = setTimeout(() => setN(n + 1), n === 0 ? 300 : 560)
    return () => clearTimeout(t)
  }, [seen, n, reduce])

  return (
    <div ref={ref} className="glass-quiet p-5 md:p-7" role="table" aria-label="Specimen extract of the Krim-Ledger record">
      <div className="grid grid-cols-[64px_1fr_40px_60px] md:grid-cols-[56px_84px_170px_1fr_44px_64px] gap-x-3 md:gap-x-5 px-1 py-2.5 border-b border-rline-soft">
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3 hidden md:block">LN</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3">TIME</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3 hidden md:block">ACTION</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3">VALIDATION</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3">JUR</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-rtext-3">VERDICT</p>
      </div>
      {ROWS.map((r, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0 }}
          animate={i < n || reduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-[64px_1fr_40px_60px] md:grid-cols-[56px_84px_170px_1fr_44px_64px] gap-x-3 md:gap-x-5 items-baseline px-1 py-3 border-b border-rline-soft/60"
        >
          <p className="font-mono text-[11px] text-rtext-3 hidden md:block">{String(205113 + i)}</p>
          <p className="font-mono text-[11px] text-rtext-2">{r.t}</p>
          <p className="font-mono text-[12px] text-rtext hidden md:block">{r.act}</p>
          <p className="font-mono text-[11px] leading-relaxed text-rtext-2">
            <span className="md:hidden text-rtext">{r.act} · </span>{r.detail}
          </p>
          <p className="font-mono text-[11px] text-rtext-3">{r.j}</p>
          <p className={`font-mono text-[11px] font-medium tracking-[0.06em] ${verdictColor(r.verdict)}`}>{r.verdict}</p>
        </motion.div>
      ))}
      <p className="font-mono text-[10px] tracking-[0.08em] pt-3 text-rtext-3">
        SPECIMEN EXTRACT · KRIM-LEDGER · IMMUTABLE, CRYPTOGRAPHICALLY SEALED, METERED IN KRIM WORK UNITS
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
export function ReceiptDoc({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE }}
      className={`w-full max-w-[440px] p-7 relative glass ${className}`}
    >
      <div className="flex items-baseline justify-between pb-3 mb-4 border-b border-rline">
        <p className="font-mono text-[11px] tracking-[0.2em] font-medium text-rtext">ACTION RECEIPT</p>
        <p className="font-mono text-[10px] text-rtext-3">SPECIMEN · № 205,113</p>
      </div>
      {([
        ['ACTION', 'MAKE_CALL · acct ··4421 · Karta Vox-Out', 'mono'],
        ['VALIDATED — BEFORE EXECUTION', 'TCPA consent ✓ · calling hours ✓ · Reg F limit ✓ · DNC ✓', 'mono'],
        ['REASONING, READABLE', 'Right-party contact confirmed; hardship signals absent; window open to 18:00 local.', 'serif'],
        ['METERED', '142 Krim Work Units', 'mono'],
      ] as const).map(([k, v, f]) => (
        <div key={k} className="py-2.5 border-b border-rline-soft">
          <p className="font-mono text-[9px] tracking-[0.18em] mb-1 text-rtext-3">{k}</p>
          <p className={f === 'serif' ? 'font-serif italic text-[14.5px] leading-relaxed text-rtext' : 'font-mono text-[12.5px] leading-relaxed text-rtext'}>{v}</p>
        </div>
      ))}
      <div className="flex items-center justify-between pt-4">
        <p className="font-mono text-[10px] tracking-[0.12em] text-rtext-3">SEALED · SHA-256</p>
        <Stamp delay={0.5} />
      </div>
    </motion.div>
  )
}

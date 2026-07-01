'use client'

/**
 * PolicyChecks — homepage "Intelligence by policy". Rather than explaining the
 * gate abstractly, it shows ONE proposed lending action meeting Krim-Nyāya's
 * three Navya-Nyāya checks — grounding (Pramāṇa), soundness (Doṣa), permission
 * (Yogyatā) — and being HELD when the permission check catches a calling-hours
 * problem, then rescheduled with the reason on the record. Concrete, so a reader
 * sees what the gate does and why it matters. The rows resolve in sequence on
 * scroll; reduced motion shows them settled. Facts/families per krim-content.md.
 */

import { motion, useReducedMotion } from 'framer-motion'

type Check = { name: string; gloss: string; line: string; state: 'pass' | 'hold' }

const CHECKS: Check[] = [
  {
    name: 'Pramāṇa',
    gloss: 'grounding',
    line: 'Balance and status confirmed against the system of record, no guessing.',
    state: 'pass',
  },
  {
    name: 'Doṣa',
    gloss: 'soundness',
    line: 'No conflict with the borrower’s active hardship plan.',
    state: 'pass',
  },
  {
    name: 'Yogyatā',
    gloss: 'permission',
    line: 'Consent is on file, but it’s before legal calling hours in their timezone.',
    state: 'hold',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function PolicyChecks() {
  const reduce = useReducedMotion()

  // y-only reveal (no opacity fade) — matches Reveal/PowerCards so glass never "solidifies" on scroll.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.1 } },
  }
  const item = {
    hidden: reduce ? { y: 0 } : { y: 8 },
    show: { y: 0, transition: { duration: reduce ? 0 : 0.5, ease: EASE } },
  }

  return (
    <motion.div
      className="glass mx-auto w-full max-w-[720px] overflow-hidden rounded-lg p-7 md:p-9"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* the proposed action — cyan = proposed / thinking */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--cyan)' }}>
          Proposed action
        </span>
        <span aria-hidden className="h-px flex-1 bg-white/10" />
      </div>
      <p className="mt-3 font-serif text-[1.4rem] leading-snug text-ink">
        Call this borrower, 14 days past due, about a payment plan.
      </p>

      {/* the gate: one check from each of the three Navya-Nyāya families */}
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
        Krim-Nyāya · 33 validators, three families
      </p>
      <ul className="mt-4 border-y border-white/10">
        {CHECKS.map((c) => {
          const color = c.state === 'pass' ? 'var(--mint)' : 'var(--gold)'
          return (
            <motion.li
              key={c.name}
              variants={item}
              className="flex items-center gap-4 border-white/10 py-4 [&:not(:last-child)]:border-b"
            >
              <StatusIcon state={c.state} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-[1.2rem] leading-none text-ink">{c.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{c.gloss}</span>
                </div>
                <p className="mt-2 font-sans text-[15px] leading-normal text-ink-2">{c.line}</p>
              </div>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color }}>
                {c.state === 'pass' ? 'Cleared' : 'Held'}
              </span>
            </motion.li>
          )
        })}
      </ul>

      {/* the verdict */}
      <motion.div variants={item} className="mt-6 flex items-start gap-3">
        <span aria-hidden className="mt-[0.45em] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: 'var(--gold)' }} />
        <p className="font-sans text-body text-ink-2">
          <span className="text-ink">Held, and rescheduled</span> to 9:00 am in the borrower’s timezone, with the reason on
          the record. Nothing fires until it clears.
        </p>
      </motion.div>
    </motion.div>
  )
}

function StatusIcon({ state }: { state: 'pass' | 'hold' }) {
  const color = state === 'pass' ? 'var(--mint)' : 'var(--gold)'
  return (
    <span
      aria-hidden
      className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
      style={{
        border: `1px solid ${color}`,
        background: state === 'pass' ? 'rgba(0,255,178,0.08)' : 'rgba(200,161,74,0.1)',
      }}
    >
      {state === 'pass' ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.6 6.3l2.1 2.2L9.4 3.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.3" stroke={color} strokeWidth="1.1" />
          <path d="M6 3.6V6l1.7 1.1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

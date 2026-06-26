'use client'

/**
 * LifecycleExplorer — the "one model, the whole of lending" stepper, made
 * interactive. Hover (or tap / focus) a stage and the explainer card below shows
 * what the World Lending Model changes for that part of the lifecycle. The active
 * stage is driven by state, so no stage is permanently highlighted — the earlier
 * always-on "AI underwriting" mint was a bug.
 *
 * Copy is forward-looking (the model is a research direction), matter-of-fact and
 * realist-aspirational — what becomes possible, never a shipped claim.
 */

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const STAGES = [
  {
    num: '01',
    label: 'Origination',
    detail:
      'Each application is read against everything the model has seen, so a thin file or a new segment can be judged on behaviour, not a bureau score alone, and approved where the risk genuinely supports it.',
  },
  {
    num: '02',
    label: 'AI underwriting',
    detail:
      'The credit decision is simulated against the model and proven before it stands. The institution keeps the call; the model shows its working, so an underwriter can trust an automated yes or no.',
  },
  {
    num: '03',
    label: 'Pricing',
    detail:
      'Price can track modelled risk rather than a coarse tier, sharpened for a borrower the model understands well and held back where it does not.',
  },
  {
    num: '04',
    label: 'Servicing',
    detail:
      'The model anticipates where an account is heading, so servicing can act before a borrower slips, with the next step drawn from what has actually worked.',
  },
  {
    num: '05',
    label: 'Collections',
    detail:
      'A borrower’s full history, their underwriting file included, shapes the recovery conversation, so the approach fits the person and stays within the rules.',
  },
  {
    num: '06',
    label: 'Portfolio',
    detail:
      'Every outcome feeds back into the model, so the whole book sharpens the longer it runs and the front of the book learns from the back.',
  },
]

export default function LifecycleExplorer() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto mt-12 max-w-[940px]">
      {/* the stepper (its own relative box so the track centres on the row) */}
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-[7%] right-[7%] top-1/2 hidden h-px -translate-y-1/2 sm:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(57,214,255,0) 0%, rgba(57,214,255,0.55) 18%, rgba(0,255,178,0.55) 82%, rgba(0,255,178,0) 100%)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-6 bottom-6 block w-px -translate-x-1/2 sm:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(57,214,255,0) 0%, rgba(57,214,255,0.5) 16%, rgba(0,255,178,0.5) 84%, rgba(0,255,178,0) 100%)',
          }}
        />
        <ol className="relative flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:justify-between sm:gap-2">
          {STAGES.map((s, i) => {
            const on = i === active
            return (
              <li key={s.label} className="flex flex-1 items-center justify-center sm:block">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={[
                    'group relative flex w-full items-center gap-3 rounded-[10px] border px-3.5 py-3 backdrop-blur-md transition-colors duration-200 sm:flex-col sm:gap-2 sm:px-2 sm:py-4 sm:text-center',
                    on
                      ? 'border-mint/55 bg-mint/[0.06]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25',
                  ].join(' ')}
                  style={
                    on
                      ? { boxShadow: '0 0 0 1px rgba(0,255,178,0.10), 0 0 28px -10px rgba(0,255,178,0.45)' }
                      : undefined
                  }
                >
                  <span
                    aria-hidden
                    className={[
                      'h-2 w-2 shrink-0 rounded-full transition-colors duration-200',
                      on ? 'bg-mint shadow-[0_0_10px_2px_rgba(0,255,178,0.6)]' : 'bg-ink-3',
                    ].join(' ')}
                  />
                  <div className="flex flex-col sm:items-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-ink-3">{s.num}</span>
                    <span
                      className={[
                        'mt-0.5 font-mono text-[11px] uppercase leading-tight tracking-[0.12em] transition-colors duration-200',
                        on ? 'text-mint' : 'text-ink-2',
                      ].join(' ')}
                    >
                      {s.label}
                    </span>
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* explainer — what the model changes at the active stage */}
      <div className="glass relative mt-6 overflow-hidden rounded-[14px] p-7 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
              {STAGES[active].label} · with the model
            </p>
            <p className="mt-3 max-w-[70ch] font-sans text-body-lg text-ink-2 sm:min-h-[3.75rem]">
              {STAGES[active].detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
        Hover a stage · one model, the whole lifecycle
      </p>
    </div>
  )
}

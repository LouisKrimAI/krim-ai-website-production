'use client'

/**
 * KartaLifecycleSpine — the page's one signature choreography.
 *
 * A single hairline spine draws downward through the five lending stages; as the
 * leading edge passes each node, the node resolves cyan → mint (the sanctioned
 * node-pass grammar: thinking → validated) and its oversized numeral brightens
 * from ink-3 → ink — the loan being staffed, stage by stage. Co-worker rosters
 * rise in behind each node. It draws, staffs, then rests — no loop.
 *
 * Reserves its full box before animating (zero CLS). Reduced motion jumps to the
 * fully-staffed end state instantly. Transform / opacity / colour only.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const CYAN = '#39D6FF'
const MINT = '#00FFB2'

export type Stage = { stage: string; role: string; workers: string[] }

export default function KartaLifecycleSpine({ stages }: { stages: Stage[] }) {
  const reduce = useReducedMotion()
  // total draw time roughly tracks the node sequence so the line and the staffing land together
  const drawDuration = 1.0
  const step = 0.18

  return (
    <div className="relative mt-12 md:mt-16">
      <ul className="relative">
        {/* the spine — a hairline running down the gutter; reserves its box, then draws */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-[1.375rem] top-2 bottom-10 w-px bg-white/10 md:left-7"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: drawDuration, ease: EASE }}
          style={{ transformOrigin: 'top' }}
        />

        {stages.map((s, i) => {
          const nodeDelay = i * step
          return (
            <li
              key={s.stage}
              className="grid grid-cols-[2.75rem_1fr] gap-4 py-6 md:grid-cols-[3.5rem_1fr] md:gap-5 md:py-7"
            >
              {/* gutter — numeral + node on the spine */}
              <div className="relative flex flex-col items-center">
                <motion.span
                  aria-hidden
                  className="absolute left-1/2 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-bg"
                  initial={
                    reduce
                      ? false
                      : { backgroundColor: 'rgba(255,255,255,0.18)' }
                  }
                  whileInView={
                    reduce
                      ? undefined
                      : { backgroundColor: [CYAN, MINT] }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, times: [0, 1], delay: nodeDelay, ease: 'easeOut' }}
                  style={reduce ? { backgroundColor: MINT } : undefined}
                />
                <motion.span
                  aria-hidden
                  className="mt-8 font-serif tabular-nums text-[clamp(1.6rem,3vw,2.4rem)] leading-none"
                  initial={reduce ? false : { color: '#828791' }}
                  whileInView={reduce ? undefined : { color: '#F6F6F4' }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: nodeDelay + 0.1, ease: 'easeOut' }}
                  style={reduce ? { color: '#F6F6F4' } : undefined}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>
              </div>

              {/* content — stage, role, roster (shared min-height so rows sit on a baseline) */}
              <motion.div
                className="min-h-[5.5rem] pt-1 md:min-h-[6rem]"
                initial={reduce ? false : { y: 14 }}
                whileInView={reduce ? undefined : { y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE, delay: nodeDelay + 0.1 }}
              >
                <h3 className="font-serif text-[1.35rem] leading-tight text-ink">{s.stage}</h3>
                <p className="mt-1.5 font-sans text-body text-ink-3">{s.role}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                  {s.workers.join(' · ')}
                </p>
              </motion.div>
            </li>
          )
        })}
      </ul>

      <p className="mt-2 pl-[2.75rem] font-mono text-caption text-ink-3 md:pl-[3.5rem]">
        A representative set, configured per institution.
      </p>
    </div>
  )
}

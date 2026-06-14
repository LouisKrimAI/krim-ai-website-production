'use client'

/**
 * /msme — the animated pieces. Two client components, both whileInView / once,
 * GPU-only (opacity · transform · colour) and reduced-motion-safe:
 * useReducedMotion settles each to its final, meaningful state instantly.
 *
 *   HeroFrame      — the hero visual: msme.png inside a warm glass frame whose
 *                    hairline draws in once. Lighter and more approachable than
 *                    the government perimeter — confidence, not compliance.
 *   ValidatedTasks — THE SIGNATURE DEVICE. "Rigor made approachable": three
 *                    ordinary business tasks — a refund reply, a renewal
 *                    reminder, a payment follow-up — each proposed (cyan) and
 *                    then receiving the mint "validated" check, in a gentle
 *                    cascade. The same gate banks and governments trust, applied
 *                    to the everyday work. Mistakes don't reach the customer.
 *
 * Grammar: cyan = proposed · mint = validated · gold = exception.
 */

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-12% 0px -12% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'

// =============================================================================
// HeroFrame — the domain image in a warm glass frame. A hairline traces the
// border once, settling to mint: the same rigor, drawn around everyday work.
// Lighter than government's perimeter — this is confidence framing.
// =============================================================================

export function HeroFrame() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  return (
    <div ref={ref} className="relative">
      <div className="glass overflow-hidden p-2.5 md:p-3">
        <div className="relative overflow-hidden rounded-[12px]">
          <Image
            src="/images/domains/msme.png"
            alt="A dark, abstract motif of modular cubes — everyday operations, each block validated before it moves."
            width={896}
            height={1200}
            priority
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="h-auto w-full select-none"
          />
          {/* a soft floor wash so the image settles into the canvas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(9,9,12,0) 54%, rgba(9,9,12,0.4) 100%)',
            }}
          />
          {/* the drawn frame — a hairline that traces the border once, in mint */}
          <svg
            aria-hidden
            viewBox="0 0 100 134"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <motion.rect
              x="2.2"
              y="2.2"
              width="95.6"
              height="129.6"
              rx="3"
              fill="none"
              stroke={MINT}
              strokeWidth="0.5"
              strokeOpacity="0.42"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.7, ease: EASE }}
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        The everyday, made dependable
      </p>
    </div>
  )
}

// =============================================================================
// ValidatedTasks — THE SIGNATURE DEVICE: rigor made approachable.
//
// Three ordinary tasks any growing business runs every day. Each is first
// proposed (cyan), then receives the mint "validated" check — the same gate
// that satisfies banking regulators, here applied to a refund reply and a
// renewal reminder. The point is warmth: the heavy machinery is invisible;
// what you see is small, familiar work being made safe before it ships.
// =============================================================================

const TASKS = [
  {
    label: 'Customer reply',
    task: 'Answer a refund question',
    note: 'Checked against your policy before it sends.',
  },
  {
    label: 'Follow-up',
    task: 'Send a renewal reminder',
    note: 'Right customer, right time — verified first.',
  },
  {
    label: 'Receivables',
    task: 'Chase an overdue invoice',
    note: 'Tone and amount confirmed before it goes out.',
  },
]

// per-row timing: each task settles to its validated check a beat after the last
const ROW_PROPOSE = 0.25 // a row appears (cyan) this long after the one before
const ROW_SEAL = 0.55 // and turns mint this long after appearing

export function ValidatedTasks() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  const settled: Transition = { duration: 0.45, ease: EASE }

  return (
    <div ref={ref} className="glass overflow-hidden p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Everyday work, validated before it acts
        </p>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1.5 text-cyan">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan" /> proposed
          </span>
          <span className="flex items-center gap-1.5 text-mint">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" /> validated
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {TASKS.map((t, i) => {
          const appear = play ? i * ROW_PROPOSE : 0
          const seal = play ? appear + ROW_SEAL : 0
          return (
            <motion.li
              key={t.task}
              className="glass-quiet flex items-center gap-4 p-4 sm:p-5"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={
                play ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : undefined
              }
              transition={{ ...settled, delay: appear }}
            >
              {/* the validated check — cyan ring resolves to a filled mint tick */}
              <span className="relative flex h-9 w-9 flex-none items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden>
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="1.6"
                    initial={reduce ? { stroke: MINT } : { stroke: CYAN }}
                    animate={
                      play ? { stroke: MINT } : reduce ? { stroke: MINT } : undefined
                    }
                    transition={{ ...settled, delay: seal }}
                  />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill={MINT}
                    initial={reduce ? { fillOpacity: 0.1 } : { fillOpacity: 0 }}
                    animate={
                      play
                        ? { fillOpacity: 0.1 }
                        : reduce
                        ? { fillOpacity: 0.1 }
                        : undefined
                    }
                    transition={{ ...settled, delay: seal }}
                  />
                  <motion.path
                    d="M 11.5 18.4 L 16 22.6 L 24.5 13.6"
                    fill="none"
                    stroke={MINT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    animate={
                      play
                        ? { pathLength: 1, opacity: 1 }
                        : reduce
                        ? { pathLength: 1, opacity: 1 }
                        : undefined
                    }
                    transition={{
                      pathLength: { duration: 0.4, ease: EASE, delay: seal + 0.05 },
                      opacity: { duration: 0.01, delay: seal + 0.05 },
                    }}
                  />
                </svg>
              </span>

              {/* the everyday task */}
              <div className="min-w-0 flex-1">
                <motion.span
                  className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                  initial={reduce ? { color: MINT } : { color: CYAN }}
                  animate={play ? { color: MINT } : reduce ? { color: MINT } : undefined}
                  transition={{ ...settled, delay: seal }}
                >
                  {t.label}
                </motion.span>
                <p className="mt-1 font-serif text-[1.15rem] leading-snug text-ink">{t.task}</p>
                <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-ink-2">{t.note}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>

      <motion.p
        className="mt-6 font-sans text-[13.5px] leading-relaxed text-ink-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
        transition={{ ...settled, delay: play ? TASKS.length * ROW_PROPOSE + ROW_SEAL + 0.3 : 0 }}
      >
        The same gate banks and governments trust — applied to the small,
        familiar work. Nothing reaches your customer until it&rsquo;s been
        checked.
      </motion.p>
    </div>
  )
}

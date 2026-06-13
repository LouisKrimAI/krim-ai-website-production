'use client'

/**
 * ProofPanel — homepage §7: a precision validation surface.
 *
 * One action (MAKE_CALL) is taken through its pre-flight clearances and
 * resolves to CLEARED; beside it, an honest refusal (SEND_EMAIL) rests in
 * amber, routed to a person with its reasoning attached. Facts are drawn
 * from krim-content's MAKE_CALL worked example and labelled a specimen —
 * illustrative, not live telemetry.
 *
 * Colour grammar: cyan = thinking/proposed · mint = validated/cleared ·
 * gold = amber/exception. As the panel enters view the clearances
 * illuminate from cyan → mint in a calm sequence (a "validation pulse"),
 * then settle. The amber refusal does not pulse. GPU-only (opacity /
 * transform / color); reduced-motion renders the resolved state at rest.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const CLEARANCES = [
  'TCPA consent',
  'Calling hours',
  'Reg F contact limits',
  'DNC registry',
] as const

/** Per-clearance pulse: cyan (proposed) settling to mint (cleared). */
const STEP = 0.13 // s between clearances
const HOLD = 0.34 // s held on cyan before resolving to mint

export default function ProofPanel() {
  const reduce = useReducedMotion()

  // Reduced motion: present the fully-resolved surface, no pulse.
  const dotVariants: Variants = reduce
    ? {
        rest: { backgroundColor: 'rgba(0,255,178,1)', boxShadow: '0 0 0 4px rgba(0,255,178,0.10)' },
        run: { backgroundColor: 'rgba(0,255,178,1)', boxShadow: '0 0 0 4px rgba(0,255,178,0.10)' },
      }
    : {
        rest: { backgroundColor: 'rgba(57,214,255,0.35)', boxShadow: '0 0 0 0 rgba(57,214,255,0)' },
        run: (i: number) => ({
          backgroundColor: [
            'rgba(57,214,255,0.35)',
            'rgba(57,214,255,1)',
            'rgba(0,255,178,1)',
          ],
          boxShadow: [
            '0 0 0 0 rgba(57,214,255,0)',
            '0 0 0 4px rgba(57,214,255,0.16)',
            '0 0 0 4px rgba(0,255,178,0.10)',
          ],
          transition: { duration: HOLD + 0.3, ease: EASE, delay: i * STEP, times: [0, 0.45, 1] },
        }),
      }

  const labelVariants: Variants = reduce
    ? { rest: { color: 'rgba(246,246,244,1)' }, run: { color: 'rgba(246,246,244,1)' } }
    : {
        rest: { color: 'rgba(169,173,182,1)' },
        run: (i: number) => ({
          color: 'rgba(246,246,244,1)',
          transition: { duration: 0.4, ease: EASE, delay: i * STEP + HOLD * 0.4 },
        }),
      }

  // The PASS tick fades in just after each clearance resolves to mint.
  const tickVariants: Variants = reduce
    ? { rest: { opacity: 1 }, run: { opacity: 1 } }
    : {
        rest: { opacity: 0 },
        run: (i: number) => ({
          opacity: 1,
          transition: { duration: 0.3, ease: EASE, delay: i * STEP + HOLD * 0.6 },
        }),
      }

  // The CLEARED seal settles after the last clearance lands (~1s total).
  const sealDelay = reduce ? 0 : CLEARANCES.length * STEP + HOLD + 0.15
  const sealVariants: Variants = reduce
    ? { rest: { opacity: 1, y: 0 }, run: { opacity: 1, y: 0 } }
    : {
        rest: { opacity: 0, y: 6 },
        run: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: sealDelay } },
      }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[1.55fr_1fr] md:gap-6">
      {/* ── Primary surface: the cleared action ───────────────────────── */}
      <motion.div
        className="glass overflow-hidden"
        initial="rest"
        whileInView="run"
        viewport={{ once: true, amount: 0.45 }}
      >
        {/* header — system + specimen stamp */}
        <div className="flex items-center justify-between gap-4 border-b border-soft px-6 py-4 md:px-8">
          <p className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
            KRIM-NYĀYA · 33 VALIDATORS
          </p>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-ink-3/60" aria-hidden />
            <span className="font-mono text-[9.5px] tracking-[0.18em] text-ink-3">
              SPECIMEN · SIMULATED DATA
            </span>
          </span>
        </div>

        <div className="px-6 py-8 md:px-9 md:py-10">
          {/* the action under validation */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-mono text-[17px] tracking-tight text-ink">MAKE_CALL</p>
            <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
              outbound · servicing call
            </p>
          </div>
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-ink-3">
            Pre-flight clearances — every one must pass before the line connects.
          </p>

          {/* the clearance sequence — a slim instrument readout */}
          <ul className="mt-7 space-y-px">
            {CLEARANCES.map((c, i) => (
              <li
                key={c}
                className="flex items-center gap-4 border-t border-white/[0.04] py-3.5 first:border-t-0"
              >
                <motion.span
                  className="h-2 w-2 shrink-0 rounded-full"
                  custom={i}
                  variants={dotVariants}
                  aria-hidden
                />
                <motion.span
                  className="flex-1 font-mono text-[13px] tracking-[0.01em]"
                  custom={i}
                  variants={labelVariants}
                >
                  {c}
                </motion.span>
                <span className="h-px w-10 bg-white/[0.06] md:w-16" aria-hidden />
                <motion.span
                  className="font-mono text-[10.5px] tracking-[0.2em] text-mint"
                  custom={i}
                  variants={tickVariants}
                >
                  PASS
                </motion.span>
              </li>
            ))}
          </ul>

          {/* resolution — the cleared seal */}
          <motion.div
            className="mt-8 flex items-center gap-3.5 border-t border-soft pt-7"
            variants={sealVariants}
          >
            <span className="relative flex h-7 w-7 items-center justify-center" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-mint/12" />
              <svg width="15" height="15" viewBox="0 0 15 15">
                <path
                  d="M3.4 7.8l2.7 2.7 5.5-6"
                  fill="none"
                  stroke="#00FFB2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-mono text-[12px] tracking-[0.22em] text-mint">CLEARED TO DIAL</p>
              <p className="mt-1 font-sans text-[12.5px] leading-snug text-ink-3">
                All four clearances passed. Validated and on the record.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Quiet companion: the honest refusal, resting gold ─────────── */}
      <div className="glass-quiet relative overflow-hidden px-6 py-7 md:px-7 md:py-8">
        {/* faint luminous gold hairline along the top edge */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 6%, rgba(200,161,74,0.45) 50%, transparent 94%)',
          }}
          aria-hidden
        />
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink-3">HELD FOR REVIEW</p>

        <div className="mt-5 flex items-baseline justify-between gap-3">
          <p className="font-mono text-[14px] tracking-tight text-ink">SEND_EMAIL</p>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(200,161,74,0.10)]" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold">AMBER</span>
          </span>
        </div>

        <p className="mt-4 font-sans text-[13px] leading-relaxed text-ink-2">
          Settlement terms fall outside the approved range. Not refused outright — held, with its
          reasoning attached, and routed to a person to decide.
        </p>

        <p className="mt-6 border-t border-soft pt-5 font-serif text-[13.5px] italic leading-relaxed text-ink-3">
          What can&rsquo;t clear the gate doesn&rsquo;t run. The held action is the proof.
        </p>
      </div>
    </div>
  )
}

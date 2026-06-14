'use client'

/**
 * /government — the animated pieces. Two client components, both
 * whileInView / once, GPU-only (opacity · transform · colour) and
 * reduced-motion-safe: useReducedMotion settles each to its final,
 * meaningful state instantly.
 *
 *   PerimeterFrame — the hero visual: the government.png inside a fine glass
 *                    frame whose border draws in once, reading as a
 *                    jurisdiction's perimeter. Everything runs within it.
 *   LawfulBasis    — THE SIGNATURE DEVICE. An action shown paired with the
 *                    rule that authorised it; cyan (proposed) resolves to mint
 *                    (lawful) only once the basis is established. The lawful
 *                    basis, made visible.
 *
 * Grammar: cyan = proposed · mint = validated/lawful · gold = exception.
 */

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-12% 0px -12% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'
const INK3 = '#828791'
const LINE = 'rgba(255,255,255,0.13)'

// =============================================================================
// PerimeterFrame — the hero visual. The domain image sits inside a fine frame
// whose hairline border draws itself in once: a jurisdiction's perimeter.
// Everything runs within it; nothing crosses. Still and civic, not flashy.
// =============================================================================

export function PerimeterFrame() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  return (
    <div ref={ref} className="relative">
      <div className="glass overflow-hidden p-2.5 md:p-3">
        {/* the image, held within the perimeter */}
        <div className="relative overflow-hidden rounded-[12px]">
          <Image
            src="/images/domains/government.png"
            alt="A dark, abstract line drawing of a civic portico and its columns — the perimeter within which everything runs."
            width={896}
            height={1200}
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="h-auto w-full select-none"
          />
          {/* a soft floor wash so the image settles into the canvas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(9,9,12,0) 52%, rgba(9,9,12,0.42) 100%)',
            }}
          />
          {/* the drawn perimeter — a hairline that traces the border once */}
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
              strokeOpacity="0.5"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        The perimeter — everything runs within it
      </p>
    </div>
  )
}

// =============================================================================
// LawfulBasis — THE SIGNATURE DEVICE. A proposed action is held against the
// rule that governs it; only once the authorising basis is matched does the
// pair resolve from cyan (proposed) to mint (lawful). Nothing acts without a
// basis — and here the basis is visible, paired to the action it authorised.
// =============================================================================

export function LawfulBasis() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45, margin: VIEW_MARGIN })
  const play = inView && !reduce

  // timeline: action appears (cyan) → rule appears → link draws → both settle mint
  const settled: Transition = { duration: 0.5, ease: EASE }
  const seal = play ? 1.9 : 0 // moment the pair becomes lawful (mint)

  return (
    <div ref={ref} className="glass overflow-hidden p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          The lawful basis, made visible
        </p>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1.5 text-cyan">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan" /> proposed
          </span>
          <span className="flex items-center gap-1.5 text-mint">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" /> lawful
          </span>
        </div>
      </div>

      <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* the proposed action */}
        <motion.div
          className="glass-quiet flex flex-col p-5"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...settled, delay: play ? 0.1 : 0 }}
        >
          <motion.span
            className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
            initial={reduce ? { color: MINT } : { color: CYAN }}
            animate={play ? { color: MINT } : reduce ? { color: MINT } : undefined}
            transition={{ ...settled, delay: seal }}
          >
            Action
          </motion.span>
          <p className="mt-2.5 font-serif text-[1.15rem] leading-snug text-ink">
            Issue a payment reminder to a citizen
          </p>
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-ink-2">
            Proposed by a co-worker — held until its basis is found.
          </p>
        </motion.div>

        {/* the pairing link — draws between action and rule, then seals mint */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 80 40"
            className="h-10 w-20 sm:h-full sm:w-[80px]"
            role="img"
            aria-label="The proposed action is paired with the rule that authorises it; once matched, the pairing is lawful."
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              x1="6"
              y1="20"
              x2="74"
              y2="20"
              stroke={LINE}
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <motion.line
              x1="6"
              y1="20"
              x2="74"
              y2="20"
              stroke={CYAN}
              strokeWidth="1.6"
              initial={reduce ? { pathLength: 1, stroke: MINT } : { pathLength: 0, stroke: CYAN }}
              animate={
                play
                  ? { pathLength: 1, stroke: MINT }
                  : reduce
                  ? { pathLength: 1, stroke: MINT }
                  : undefined
              }
              transition={{
                pathLength: { duration: 0.7, ease: EASE, delay: play ? 0.9 : 0 },
                stroke: { ...settled, delay: seal },
              }}
            />
            {/* the lock that closes the pairing — the basis, established */}
            <motion.g
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
              animate={
                play ? { opacity: 1, scale: 1 } : reduce ? { opacity: 1, scale: 1 } : undefined
              }
              transition={{ duration: 0.45, ease: EASE, delay: play ? seal - 0.1 : 0 }}
              style={{ transformOrigin: '40px 20px' }}
            >
              <circle cx="40" cy="20" r="9" fill="rgba(0,255,178,0.08)" stroke={MINT} strokeWidth="1.1" />
              <path
                d="M 36.6 19.4 v -2 a 3.4 3.4 0 0 1 6.8 0 v 2"
                fill="none"
                stroke={MINT}
                strokeWidth="1.1"
              />
              <rect x="36.2" y="19.2" width="7.6" height="5.6" rx="1.2" fill={MINT} fillOpacity="0.85" />
            </motion.g>
          </svg>
        </div>

        {/* the authorising rule */}
        <motion.div
          className="glass-quiet flex flex-col p-5"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...settled, delay: play ? 0.7 : 0 }}
        >
          <motion.span
            className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
            initial={reduce ? { color: MINT } : { color: INK3 }}
            animate={play ? { color: MINT } : reduce ? { color: MINT } : undefined}
            transition={{ ...settled, delay: seal }}
          >
            Authorising rule
          </motion.span>
          <p className="mt-2.5 font-serif text-[1.15rem] leading-snug text-ink">
            The statute that permits the dues to be pursued
          </p>
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-ink-2">
            The basis that makes the action lawful — and the record of why.
          </p>
        </motion.div>
      </div>

      <motion.p
        className="mt-6 font-sans text-[13.5px] leading-relaxed text-ink-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
        transition={{ ...settled, delay: play ? seal + 0.2 : 0 }}
      >
        No action proceeds unpaired. The rule that authorised it travels with it
        — checked before it happens, and kept on the record after.
      </motion.p>
    </div>
  )
}

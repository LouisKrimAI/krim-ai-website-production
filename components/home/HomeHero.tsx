'use client'

/**
 * HomeHero — the first-load choreography and the persistent orb backdrop.
 *
 * Sequence (once, ~3.9s, GPU-only): orb alone, centred, bright → shrinks
 * inward and dims → the animated Krim logo fades up large in its place →
 * the trim hero words fade up beneath → the orb expands to a large, soft,
 * faded backdrop and stays (then drifts). Reduced motion: jump to resolved.
 *
 * The orb layer is `fixed`, so once it settles it remains the calm backdrop
 * behind every section below — closing the page where it opened.
 */

import { motion, useReducedMotion } from 'framer-motion'
import WaveOrb from '../WaveOrb'
import KrimLogoAnimated from '../KrimLogoAnimated'
import { CTA } from '../ui'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const
const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export default function HomeHero() {
  const reduce = useReducedMotion()

  // resolved (final) orb state — also the reduced-motion state: grown beyond
  // the screen and settled as a clearly-visible living backdrop.
  const orbResolved = { scale: 1.6, opacity: 0.34 }

  return (
    <>
      {/* ---- the orb: fixed, behind the whole page ---- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(56% 50% at 50% 40%, #04060C 0%, rgba(4,6,12,0.55) 55%, rgba(9,9,12,0) 100%)',
          }}
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* Arrival: a small orb grows on one continuous, smooth curve —
              slow at first, then a little faster, easing to rest — out to
              full size beyond the screen. Centre-aligned throughout; only its
              size changes (no drift, no jumps). The logo + words follow. */}
          <motion.div
            initial={reduce ? orbResolved : { scale: 0.3, opacity: 0 }}
            animate={reduce ? orbResolved : { scale: 1.6, opacity: 0.34 }}
            transition={reduce ? { duration: 0 } : { duration: 4.6, ease: [0.6, 0, 0.3, 1] }}
            style={{ transformOrigin: 'center' }}
          >
            <WaveOrb size="min(88vmin, 880px)" speed={0.5} density={0.6} />
          </motion.div>
        </div>
        {/* gentle vignette so text edges never fight the orb (light — keep the orb visible) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9,9,12,0.38) 0%, rgba(9,9,12,0) 26%, rgba(9,9,12,0) 70%, rgba(9,9,12,0.5) 100%)',
          }}
        />
      </div>

      {/* ---- hero content ---- */}
      <section className="relative z-10 flex min-h-[92vh] items-center">
        <div className="mx-auto w-full max-w-site px-6 md:px-10">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.5, delay: 3.8, ease: OUT_SOFT }}
            >
              <KrimLogoAnimated className="h-[clamp(116px,17vw,232px)] w-auto" />
            </motion.div>

            <motion.h1
              className="mt-10 font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-ink"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 4.9, ease: OUT_SOFT }}
            >
              <span className="block">Sovereign Superintelligence</span>
              <span className="block">for Safe Automation</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 5.15, ease: OUT_SOFT }}
            >
              AI workers run your operations — Intelligence by Policy.
            </motion.p>

            <motion.div
              className="mt-11 flex flex-wrap items-center justify-center gap-6"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.2, delay: 5.4, ease: OUT_SOFT }}
            >
              <CTA href={DEMO_HREF}>Book a demo</CTA>
              <CTA href="#intelligence" variant="secondary">
                See how it works
              </CTA>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

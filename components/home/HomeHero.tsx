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
        <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* Arrival: a small orb grows — slowly at first, then a little
              faster — out to full size beyond the screen, settling as the
              living backdrop. The logo and words fade in afterwards. */}
          <motion.div
            initial={reduce ? orbResolved : { scale: 0.35, opacity: 0 }}
            animate={reduce ? orbResolved : { scale: [0.35, 0.7, 1.6], opacity: [0, 0.5, 0.34] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 4.2, times: [0, 0.45, 1], ease: ['easeIn', 'easeOut'] }
            }
          >
            <div className="orb-drift">
              <WaveOrb size="min(88vmin, 880px)" speed={0.5} density={0.6} />
            </div>
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
              transition={reduce ? { duration: 0 } : { duration: 1.6, delay: 3.4, ease: OUT_SOFT }}
            >
              <KrimLogoAnimated className="h-[clamp(116px,17vw,232px)] w-auto" />
            </motion.div>

            <motion.h1
              className="mt-10 font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-ink"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 4.5, ease: OUT_SOFT }}
            >
              <span className="block">Safe Superintelligence</span>
              <span className="block">for Regulated Automation</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 4.85, ease: OUT_SOFT }}
            >
              AI co-workers run your ops — Intelligence by Policy.
            </motion.p>

            <motion.div
              className="mt-11 flex flex-wrap items-center justify-center gap-6"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.2, delay: 5.1, ease: OUT_SOFT }}
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

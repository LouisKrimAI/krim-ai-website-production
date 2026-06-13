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

  // resolved (final) orb state — also the reduced-motion state: full size,
  // settled into a faint, living backdrop.
  const orbResolved = { scale: 1, opacity: 0.3 }

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
          {/* Arrival: blank → orb fades in at full size → slowly shrinks and
              recedes into the background → slowly grows back to full size as a
              faint, living backdrop. All size changes slow and smooth. */}
          <motion.div
            initial={reduce ? orbResolved : { scale: 1, opacity: 0 }}
            animate={reduce ? orbResolved : { scale: [1, 1, 0.62, 1], opacity: [0, 0.95, 0.34, 0.3] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 5.4, times: [0, 0.24, 0.62, 1], ease: ['easeOut', OUT_SOFT, OUT_SOFT] }
            }
          >
            <div className="orb-drift">
              <WaveOrb size="min(88vmin, 880px)" speed={0.5} density={0.6} />
            </div>
          </motion.div>
        </div>
        {/* gentle vignette so text edges never fight the orb */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9,9,12,0.5) 0%, rgba(9,9,12,0.05) 24%, rgba(9,9,12,0.05) 68%, rgba(9,9,12,0.7) 100%)',
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
              transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 2, ease: OUT_SOFT }}
            >
              <KrimLogoAnimated className="h-[clamp(116px,17vw,232px)] w-auto" />
            </motion.div>

            <motion.h1
              className="mt-10 max-w-[20ch] font-serif text-display-hero text-ink"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 3, ease: OUT_SOFT }}
            >
              Safe Superintelligence for Regulated Automation
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 3.3, ease: OUT_SOFT }}
            >
              An AI workforce to run your ops — validated before action.
            </motion.p>

            <motion.div
              className="mt-11 flex flex-wrap items-center justify-center gap-6"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1, delay: 3.6, ease: OUT_SOFT }}
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

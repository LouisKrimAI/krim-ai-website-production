'use client'

/**
 * HomeHero — the first-load choreography.
 *
 * Sequence (once, GPU-only): the Woven Ring forms behind the hero, then the
 * logo fades in (~2.5 s), then each text section fades in slowly, section by
 * section. No centered logo — the brand is held by the top-left mark, pinned
 * at the exact SiteHeader position (max-w-site / px-6 md:px-10), handing off
 * seamlessly as SiteHeader fades in on scroll.
 *
 * The living background is the global Woven Ring backdrop (WovenRingBackdrop);
 * the delays below are tuned to its morph. Reduced motion / in-site navigation:
 * all sections are immediately visible with no delay.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import KrimLogoAnimated from '../KrimLogoAnimated'
import { CTA } from '../ui'
import { isFreshArrival } from '@/lib/arrival'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const
const DEMO_HREF = '/contact'

export default function HomeHero() {
  const reduce = useReducedMotion()
  const [settled] = useState(() => typeof window !== 'undefined' && !isFreshArrival())
  const disabled = !!reduce || settled

  // Logo: delayed on fresh arrival so it appears after the ring starts forming.
  // Non-fresh arrivals and reduced-motion: appears immediately.
  const [logoReady, setLogoReady] = useState(
    () => typeof window !== 'undefined' && !isFreshArrival()
  )
  const [scrolledPast, setScrolledPast] = useState(
    () => typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.5
  )

  useEffect(() => {
    if (logoReady) return
    const t = setTimeout(() => setLogoReady(true), 5000)
    return () => clearTimeout(t)
  }, [logoReady])

  useEffect(() => {
    const handler = () => setScrolledPast(window.scrollY > window.innerHeight * 0.5)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const logoVisible = logoReady && !scrolledPast

  // fade-up helper: instant when disabled, slow graceful reveal when live
  const f = (delay: number, duration = 1.4) => ({
    initial: disabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: disabled
      ? { duration: 0 }
      : { duration, delay, ease: OUT_SOFT },
  })

  return (
    <>
      {/* top-left logo — outer div is the same fixed full-width shell as SiteHeader,
          max-w-site centering ensures pixel-perfect overlap on any screen width */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[45]">
        <motion.div
          className="mx-auto flex h-16 max-w-site items-center px-6 md:px-10"
          initial={{ opacity: disabled ? (scrolledPast ? 0 : 1) : 0 }}
          animate={{ opacity: logoVisible ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.0, ease: OUT_SOFT }}
          style={{ pointerEvents: logoVisible ? 'auto' : 'none' }}
        >
          <Link href="/" aria-label="Krim — home">
            <KrimLogoAnimated className="h-[26px] w-auto" />
          </Link>
        </motion.div>
      </div>

      {/* hero — Woven Ring is the backdrop */}
      <section className="relative z-10 flex min-h-[92vh] items-center">
        <div className="mx-auto w-full max-w-site px-6 md:px-10">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">

            {/* headline — two lines, first line gradient, second plain ink */}
            <h1 className="font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-ink">
              <motion.span className="block text-grad" {...f(8.2, 1.7)}>
                Safe Superintelligence
              </motion.span>
              <motion.span className="block" {...f(10, 1.7)}>
                for Autonomous Lending
              </motion.span>
            </h1>

            {/* CTAs — appear once the headline has settled */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
              {...f(12, 1.3)}
            >
              <CTA href={DEMO_HREF}>Book a demo</CTA>
              <CTA href="#platform" variant="secondary">
                See how it works
              </CTA>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

'use client'

/**
 * HomeHero — the first-load choreography, tuned to the v4 Woven Ring
 * (T_END = 7.5 s): cloud → grand spiral → temari orb → ring.
 *
 * Beats: the logo fades in at 3.6 s, on the orb's glow zenith (~3.6–3.8 s) —
 * the mark arriving as the "mind" is at its brightest. Headline line 1 starts
 * at 4.6 s as the unfurl establishes itself (bloom begins ~3.4 s); line 2 at
 * 7.0 s lands as the ring itself resolves (7.5 s) — the line and the ring
 * settle together. The subline follows at 9.4 s and the CTAs at 11.6 s, each
 * after a genuine ~0.8 s rest — never a stacked cascade. No centered logo —
 * the brand is held by the top-left mark, pinned at the exact SiteHeader
 * position (max-w-site / px-6 md:px-10), handing off as SiteHeader fades in
 * on scroll.
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

  // Logo: delayed on fresh arrival so it appears at the temari orb's glow
  // zenith (~3.6–3.8 s). Non-fresh arrivals and reduced-motion: immediately.
  const [logoReady, setLogoReady] = useState(
    () => typeof window !== 'undefined' && !isFreshArrival()
  )
  const [scrolledPast, setScrolledPast] = useState(
    () => typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.5
  )

  useEffect(() => {
    if (logoReady) return
    const t = setTimeout(() => setLogoReady(true), 3600)
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

            {/* headline — two lines, first line gradient, second plain ink.
                .hero-failsafe (globals.css) force-reveals these via CSS after the
                choreography window, so a failed JS chunk or JS-off never leaves
                the homepage without its headline and CTAs.
                Size cap is 3.95rem (was 4.25): "Sovereign Superintelligence" is
                five characters longer than the old first line, and this is the
                largest size at which it holds as one line inside the ring. */}
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.95rem)] leading-[1.06] tracking-[-0.02em] text-ink">
              <motion.span className="hero-failsafe block text-grad" {...f(4.6, 1.6)}>
                Sovereign Superintelligence
              </motion.span>
              <motion.span className="hero-failsafe block" {...f(7.0, 1.6)}>
                for Safe Automation
              </motion.span>
            </h1>

            {/* subline — the lending ground under the brand claim (user copy) */}
            <motion.p
              className="hero-failsafe mx-auto mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2"
              {...f(9.4, 1.4)}
            >
              <span className="block">Agentic lending operations,</span>
              <span className="block text-mint">under your control.</span>
            </motion.p>

            {/* CTAs — appear once the subline has settled */}
            <motion.div
              className="hero-failsafe mt-10 flex flex-wrap items-center justify-center gap-6"
              {...f(11.6, 1.3)}
            >
              <CTA href={DEMO_HREF}>Book a demo</CTA>
              <CTA href="/krimos" variant="secondary">
                Explore KrimOS
              </CTA>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

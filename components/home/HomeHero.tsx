'use client'

/**
 * HomeHero — the first-load choreography, tuned to the v5 Woven Ring
 * (T_END = 8.5 s): cloud → grand spiral → temari orb → ring.
 *
 * Design (MoE synthesis, 2026-07-15): a three-line serif monument —
 * "Sovereign" / "Superintelligence" / "for Safe Automation" — vertically
 * matched to the ring's round frame. The gradient lives ONLY on the middle
 * word, which sits over the ring's dark hollow (white lines take the thread
 * belts above/below — that's the contrast logic). A canvas-coloured halo
 * (not grey shadow) holds the serif against the moving threads. The subline
 * hangs from a glowing mint tick — mint appears once, as a woven thread,
 * never as link-coloured text; its payoff line resolves to white via
 * luminance + weight.
 *
 * Beats (fast one-by-one cascade, riding the DARKENING center after the orb
 * zenith so contrast climbs through every reveal): logo 4.1 s on the zenith
 * (top-left, off the hot core) → h1 lines 5.0 / 5.45 / 5.9 s → subline 6.5 s
 * → CTAs 7.1 s. Full stack home at 8.1 s, ~0.4 s before the ring resolves at
 * 8.5 s — the text arrives, then the ring closes the frame. No centered
 * logo — the brand is held by the top-left mark, pinned at the exact
 * SiteHeader position, handing off as SiteHeader fades in on scroll.
 *
 * Reduced motion / in-site navigation: everything is immediately visible.
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
  // zenith (~4.1–4.3 s). Non-fresh arrivals and reduced-motion: immediately.
  const [logoReady, setLogoReady] = useState(
    () => typeof window !== 'undefined' && !isFreshArrival()
  )
  const [scrolledPast, setScrolledPast] = useState(
    () => typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.5
  )

  useEffect(() => {
    if (logoReady) return
    const t = setTimeout(() => setLogoReady(true), 4100)
    return () => clearTimeout(t)
  }, [logoReady])

  useEffect(() => {
    const handler = () => setScrolledPast(window.scrollY > window.innerHeight * 0.5)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const logoVisible = logoReady && !scrolledPast

  // fade-up helper: instant when disabled; drift scales DOWN with element
  // size so the cascade never reads uniform (h1 12px, subline 10, CTAs 8)
  const f = (delay: number, duration = 0.9, y = 10) => ({
    initial: disabled ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: disabled
      ? { duration: 0 }
      : { duration, delay, ease: OUT_SOFT },
  })
  // headline lines add a micro-scale (0.99→1) for weight — GPU-only, and the
  // disabled branch carries scale:1 so settled/reduced-motion renders crisp
  const fH = (delay: number, duration = 0.8) => ({
    initial: disabled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
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
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: OUT_SOFT }}
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

            {/* headline — a three-line serif monument. Uniform size (the copy
                sculpts the silhouette: 9ch / 17ch / 19ch); the gradient lives
                ONLY on "Superintelligence", which sits over the ring's dark
                hollow — the white lines take the thread belts above and below.
                The two-layer halo is the CANVAS colour (#02060a), so it reads
                as the ring dimming behind the glyphs, never a grey drop-shadow.
                .hero-failsafe (globals.css) force-reveals everything via CSS
                after the choreography window (JS-off / failed chunk). */}
            {/* NOTE: the canvas-halo text-shadow lives on the WHITE spans only —
                on gradient-clipped text a text-shadow shows through the
                transparent fill and muddies the gradient, so the middle word
                uses filter:drop-shadow instead (follows the rendered glyphs). */}
            <h1 className="font-serif text-[clamp(2.15rem,6.2vw,5.25rem)] leading-[1.03] tracking-[-0.025em] text-ink">
              <motion.span
                className="hero-failsafe block [text-shadow:0_2px_40px_rgba(2,6,10,0.55),0_1px_3px_rgba(2,6,10,0.6)]"
                {...fH(5.0)}
              >
                Sovereign
              </motion.span>
              <motion.span
                className="hero-failsafe block text-grad [filter:drop-shadow(0_2px_20px_rgba(2,6,10,0.6))]"
                {...fH(5.45)}
              >
                Superintelligence
              </motion.span>
              <motion.span
                className="hero-failsafe block [text-shadow:0_2px_40px_rgba(2,6,10,0.55),0_1px_3px_rgba(2,6,10,0.6)]"
                {...fH(5.9)}
              >
                for Safe Automation
              </motion.span>
            </h1>

            {/* subline — hangs from a glowing mint tick (mint appears once, as
                a woven thread, not as link-coloured text); the payoff line
                resolves to white via luminance + weight. Dark halo lifts the
                sans off the moving threads. Copy is user-locked. */}
            <motion.div className="hero-failsafe mt-10 flex flex-col items-center" {...f(6.5, 0.9, 10)}>
              <span
                aria-hidden
                className="block h-px w-12 bg-gradient-to-r from-transparent via-mint to-transparent shadow-[0_0_12px_0_rgba(0,255,178,0.45)]"
              />
              <p className="mx-auto mt-6 max-w-[42ch] font-sans text-[clamp(1.125rem,2.1vw,1.375rem)] leading-[1.55] [text-shadow:0_1px_22px_rgba(4,6,12,0.9)]">
                <span className="block font-normal text-ink-2">Agentic lending operations,</span>
                <span className="block font-medium text-ink">under your control.</span>
              </p>
            </motion.div>

            {/* CTAs — one action unit (tight gap binds primary + ghost) */}
            <motion.div
              className="hero-failsafe mt-10 flex flex-wrap items-center justify-center gap-4"
              {...f(7.1, 1.0, 8)}
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

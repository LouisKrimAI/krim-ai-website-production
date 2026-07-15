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
 * (top-left, off the hot core) → h1 lines 5.6 / 6.05 / 6.5 s → subline 7.1 s
 * → CTAs 7.7 s. Full stack home at 8.7 s, settling just as the ring resolves
 * (8.5 s) — the text arrives and the ring closes the frame together. No
 * centered logo — the brand is held by the top-left mark, pinned at the
 * exact SiteHeader position, handing off as SiteHeader fades in on scroll.
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
// easeOutCubic — no front-loaded jump; paired with long durations + a blur-in,
// the text condenses softly out of the backdrop instead of switching on
const EASE_BLOOM = [0.33, 1, 0.68, 1] as const
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

  // Disarm the CSS failsafe as soon as we hydrate: it exists only for the
  // JS-never-ran case. If left armed it fires at 9.6s on every element —
  // forcing compositor layers up and (at ~10.5s, fill-forwards) back down,
  // which re-rasterizes all the hero text at once: a visible "refresh"
  // moment right after the choreography settles.
  const [jsLive, setJsLive] = useState(false)
  useEffect(() => { setJsLive(true) }, [])

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

  // soft-materialize helper: a long gentle fade + rise + blur-in, so each
  // element condenses out of the backdrop's mist instead of switching on.
  // Drift scales DOWN with element size (subline 10, CTAs 8); disabled
  // (settled / reduced-motion) renders instantly crisp.
  const f = (delay: number, duration = 1.4, y = 10) => ({
    initial: disabled
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: disabled
      ? { duration: 0 }
      : { duration, delay, ease: EASE_BLOOM },
  })
  // headline lines: slightly deeper blur + a micro-scale (0.995→1) so the big
  // serif blooms into focus with real weight — GPU/paint only, no layout
  const fH = (delay: number, duration = 1.5) => ({
    initial: disabled
      ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      : { opacity: 0, y: 10, scale: 0.995, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: disabled
      ? { duration: 0 }
      : { duration, delay, ease: EASE_BLOOM },
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

      {/* hero — Woven Ring is the backdrop. data-hero-js disarms the CSS
          failsafe (globals.css) once hydration is alive — framer owns the
          reveal from here, and the failsafe animation must never run on top
          of it (it causes a visible re-raster after settle). */}
      <section
        className="relative z-10 flex min-h-[92vh] items-center"
        data-hero-js={jsLive || undefined}
      >
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
            {/* The middle word is deliberately DIMENSIONAL: on gradient-clipped
                text a text-shadow shows through the transparent fill, carving
                the glyphs into a metallic, embossed relief (user-loved effect —
                keep it). The stacked 1-4px dark layers are the extrusion, the
                wide layers the ambient seat, and a faint mint drop-shadow aura
                keeps the carved word alive against the dark hollow. The white
                lines take the plain canvas-halo. */}
            <h1 className="font-serif text-[clamp(2.15rem,6.2vw,5.25rem)] leading-[1.03] tracking-[-0.025em] text-ink">
              <motion.span
                className="hero-failsafe block [text-shadow:0_2px_40px_rgba(2,6,10,0.55),0_1px_3px_rgba(2,6,10,0.6)]"
                {...fH(5.6)}
              >
                Sovereign
              </motion.span>
              <motion.span
                className="hero-failsafe block text-grad [text-shadow:0_2px_40px_rgba(2,6,10,0.55),0_1px_3px_rgba(2,6,10,0.6)] [filter:drop-shadow(0_6px_28px_rgba(0,255,178,0.16))]"
                {...fH(6.05)}
              >
                Superintelligence
              </motion.span>
              <motion.span
                className="hero-failsafe block [text-shadow:0_2px_40px_rgba(2,6,10,0.55),0_1px_3px_rgba(2,6,10,0.6)]"
                {...fH(6.5)}
              >
                for Safe Automation
              </motion.span>
            </h1>

            {/* subline — hangs from the glowing mint tick (user-liked, kept).
                Subtle and stylish: an editorial whisper in the headline's own
                serif, set in italic — a dedication engraved under the monument.
                No colour, no glow; the resolve is pure luminance (quiet warm
                grey → white) and the tick carries the only accent. Dark
                under-halo keeps it legible over the moving threads.
                Copy is user-locked. */}
            <motion.div className="hero-failsafe mt-10 flex flex-col items-center" {...f(7.1, 1.5, 10)}>
              <span
                aria-hidden
                className="block h-px w-12 bg-gradient-to-r from-transparent via-mint to-transparent shadow-[0_0_12px_0_rgba(0,255,178,0.45)]"
              />
              {/* line 1 bright white (grey reads muddy on screens — user), line 2
                  resolves to mint: the control line wears the control colour,
                  jewel-quiet in italic serif, no glow */}
              <p className="mx-auto mt-6 max-w-[42ch] font-serif italic text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.55] [text-shadow:0_1px_18px_rgba(2,6,10,0.9)]">
                <span className="block text-ink">Agentic lending operations,</span>
                <span className="block text-mint">under your control.</span>
              </p>
            </motion.div>

            {/* CTAs — one action unit (tight gap binds primary + ghost) */}
            <motion.div
              className="hero-failsafe mt-10 flex flex-wrap items-center justify-center gap-4"
              {...f(7.7, 1.4, 8)}
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

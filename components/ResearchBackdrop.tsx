'use client'

/**
 * ResearchBackdrop — the Research cluster's shared ground.
 *
 * The three research pages (/research, /research/world-lending-model,
 * /epistemic-ai) sit on one fixed render of the KrimOS lab, with our signature
 * orb projected on the podium at its centre. Mounted ONCE in the root layout and
 * gated on the path, so it stays put as you move between the research pages — it
 * never remounts and the image never reloads.
 *
 * Speed + load order are the point here. The lab plate is a tiny optimised WebP
 * (~94KB) served as a plain <img> (no image-optimiser round-trip), eager-loaded,
 * and warmed ahead of time by BackgroundPrefetch — so by the time you arrive it
 * is usually already cached and paints instantly. The orb is held hidden until
 * that image has ACTUALLY loaded (onLoad, plus an immediate check for the cached
 * case), then powers up — so the background is always there first; you never see
 * the orb on an empty room. Reduced-motion settles the orb to a single frame.
 */

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import WaveOrb from './WaveOrb'
import { markBackdropReady } from '@/lib/backdropReady'

const RESEARCH_ROUTES = new Set([
  '/research',
  '/research/world-lending-model',
  '/epistemic-ai',
])

const LAB_SRC = '/images/research/research-stage.webp'

export default function ResearchBackdrop() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [bgLoaded, setBgLoaded] = useState(false)
  const active = !!pathname && RESEARCH_ROUTES.has(pathname)

  // Safety net only: if onLoad never fires (very slow or failed fetch) reveal the
  // orb anyway after a generous wait, so it can't get permanently stranded. The
  // common paths (cached/prefetched, or a fast WebP) reveal it the instant the
  // background paints — well before this fires — so the orb never precedes the room.
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setBgLoaded(true), 4000)
    return () => clearTimeout(t)
  }, [active])

  // Tell the page text the room has rendered → orb grows, then the copy reveals.
  useEffect(() => {
    if (active && bgLoaded) markBackdropReady('research')
  }, [active, bgLoaded])

  if (!active) return null

  const orbShown = bgLoaded || reduce

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      {/* the lab render — full-bleed (cover), held well faded as quiet atmosphere.
          Optimised WebP served as a plain eager <img> so it paints fast; the orb
          waits on its onLoad (and the cached case below) so the room is always
          there first. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LAB_SRC}
        alt=""
        decoding="async"
        ref={(el) => {
          // cached/prefetched image: onLoad may not fire, so reveal immediately
          if (el && el.complete && el.naturalWidth > 0) setBgLoaded(true)
        }}
        onLoad={() => setBgLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% 74%', opacity: 0.42 }}
      />

      {/* the living core — our signature orb, projected on the podium. It follows
          the lab plate: hidden until the image has loaded, then grows from a
          bright nucleus to full size as it spins. Screen-blended so it reads as
          light inside the room, not a sticker on top. The outer div holds the
          position; the inner motion layer owns the grow so the two transforms
          (centring vs scale) never collide. */}
      <div className="absolute left-1/2 top-[calc(51%_-_1cm)] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ mixBlendMode: 'screen' }}
          initial={reduce ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.18 }}
          animate={orbShown ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.18 }}
          transition={{ duration: reduce ? 0 : 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <WaveOrb size="min(52vmin, 540px)" speed={0.6} density={0.6} />
        </motion.div>
      </div>

      {/* scrim — keeps the nav, hero copy and footer legible over the render
          while leaving the scene readable through the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.6) 0%, rgba(9,9,12,0.28) 24%, rgba(9,9,12,0.28) 60%, rgba(9,9,12,0.72) 100%)',
        }}
      />

      {/* gentle vignette to settle the edges into the canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 82% at 50% 44%, rgba(9,9,12,0) 48%, rgba(9,9,12,0.34) 100%)',
        }}
      />
    </div>
  )
}

'use client'

/**
 * ResearchBackdrop — the Research cluster's shared ground.
 *
 * Instead of the orb, the three research pages (/research,
 * /research/world-lending-model, /epistemic-ai) sit on one fixed, faded render
 * of the KrimOS lab. Mounted ONCE in the root layout and gated on the path, so
 * it stays put as you move between the research pages — it never remounts and
 * the image never reloads. priority-loaded so it paints before the copy.
 * Fixed + GPU-cheap (a static image under two scrims); reduced-motion-safe by
 * construction (no animation).
 */

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const RESEARCH_ROUTES = new Set([
  '/research',
  '/research/world-lending-model',
  '/epistemic-ai',
])

export default function ResearchBackdrop() {
  const pathname = usePathname()
  if (!pathname || !RESEARCH_ROUTES.has(pathname)) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      {/* the lab render — shown whole (contain) and centred so the full scene
          fits on one screen, held well faded so it reads as quiet atmosphere */}
      <Image
        src="/images/krimos/control-room.png"
        alt=""
        fill
        priority
        quality={62}
        sizes="100vw"
        className="object-contain"
        style={{ objectPosition: '50% 50%', opacity: 0.42 }}
      />

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

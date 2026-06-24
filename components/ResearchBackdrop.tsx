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
      {/* the lab render — large (cover), held a little faded, centred on the
          floating panel so the focal point survives the crop on any viewport */}
      <Image
        src="/images/krimos/control-room.png"
        alt=""
        fill
        priority
        quality={62}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '50% 40%', opacity: 0.55 }}
      />

      {/* vertical scrim — darkens the top and bottom so the nav, hero and
          footer stay fully legible, with a calmer band through the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.66) 0%, rgba(9,9,12,0.34) 24%, rgba(9,9,12,0.34) 62%, rgba(9,9,12,0.8) 100%)',
        }}
      />

      {/* gentle vignette to settle the edges and keep the centre quiet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 78% at 50% 38%, rgba(9,9,12,0) 42%, rgba(9,9,12,0.5) 100%)',
        }}
      />
    </div>
  )
}

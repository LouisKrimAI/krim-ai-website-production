'use client'

/**
 * OrbBackdrop — the persistent faint orb behind interior pages (the homepage
 * has its own animated orb in HomeHero). Fixed, centred, low-opacity, slow
 * drift; reduced-motion-safe. Gives every page the brand's living ground
 * without competing with content.
 */

import WaveOrb from './WaveOrb'

export default function OrbBackdrop({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 50% at 50% 42%, #04060C 0%, rgba(4,6,12,0.5) 55%, rgba(9,9,12,0) 100%)',
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity }}>
        <div className="orb-drift">
          {/* matched to the homepage orb's effective size + params (HomeHero renders
              min(88vmin,880px) at scale 1.5 → ~132vmin), so every page's orb reads
              the same size and fade */}
          <WaveOrb size="min(132vmin, 1320px)" speed={0.36} density={0.6} />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.55) 0%, rgba(9,9,12,0.08) 26%, rgba(9,9,12,0.08) 68%, rgba(9,9,12,0.6) 100%)',
        }}
      />
    </div>
  )
}

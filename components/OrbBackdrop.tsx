'use client'

/**
 * OrbBackdrop — the persistent world-model backdrop (KRIM-BRIEF §design).
 * The orb sits faint and calm behind every page: low opacity, very slow
 * drift, GPU-only. The spectacular breathing hero is a later work order;
 * this is the settled state it will hand off to.
 *
 * Reference asset: docs/krim-wave-orb.html (ported in WaveOrb.tsx).
 * Reduced motion: WaveOrb renders one settled frame; drift is disabled
 * in CSS. The rAF loop pauses automatically when the tab is hidden.
 */

import WaveOrb from './WaveOrb'

export default function OrbBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg">
      {/* deepest well behind the orb, fading to the page canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 52% at 50% 38%, #04060C 0%, rgba(4,6,12,0.6) 55%, rgba(9,9,12,0) 100%)',
        }}
      />
      {/* centering wrapper stays static; the drift animation owns the inner
          element's transform (CSS animations replace the transform property) */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]">
        <div className="orb-drift">
          <WaveOrb size="min(115vmin, 1040px)" speed={0.45} density={0.55} />
        </div>
      </div>
      {/* gentle vignette so text edges never fight the orb */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.55) 0%, rgba(9,9,12,0.1) 22%, rgba(9,9,12,0.1) 70%, rgba(9,9,12,0.6) 100%)',
        }}
      />
    </div>
  )
}

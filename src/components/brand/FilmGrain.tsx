/**
 * FilmGrain — page-level SVG noise overlay.
 *
 * V2 visual primitive. Eliminates OLED banding on the flat indigo base
 * without introducing a gradient (a gradient on the brand color is a tell).
 *
 * Sits fixed across the viewport, pointer-events: none, mix-blend overlay
 * at low opacity. Invisible on inspection, substance on contrast.
 */

export default function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] motion-reduce:hidden"
      style={{
        opacity: 0.4,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="krim-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            // amplify into a low-amplitude monochrome grain (~2% intensity)
            values="0 0 0 0 0.02
                    0 0 0 0 0.02
                    0 0 0 0 0.02
                    0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#krim-grain)" />
      </svg>
    </div>
  )
}

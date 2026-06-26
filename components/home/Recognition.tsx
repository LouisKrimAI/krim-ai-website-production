/**
 * Recognition — official programme marks: a NVIDIA Inception membership, a DPIIT
 * (Startup India) recognition, and STPI incubation. NOT customers, investors or
 * endorsements — the precise relationship lives in each mark's alt text.
 *
 * The card itself is the site's dark glass (a touch lighter than a standard card),
 * so it sits in the dark page. The marks are official true-colour lockups built for
 * light grounds, so each rests on its own soft-white chip — legible, never recoloured.
 * Assets: /public/images/badges/<slug>.png (transparent, normalised height).
 */
/* eslint-disable @next/next/no-img-element */

const MARKS = [
  { src: '/images/badges/dpiit-startup-india.png', alt: 'Recognised by DPIIT — Startup India' },
  { src: '/images/badges/nvidia-inception.png', alt: 'Member of NVIDIA Inception' },
  { src: '/images/badges/stpi.png', alt: 'Incubated at STPI' },
]

/** Dark glass card; each official mark on its own soft-white chip. */
export default function Recognition({ className = '' }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-[720px] ${className}`}>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        Recognition &amp; programmes
      </p>
      <div
        className="relative mt-6 overflow-hidden rounded-[24px] border border-white/[0.055] px-7 py-8 backdrop-blur-xl md:px-12 md:py-9"
        style={{
          background:
            'linear-gradient(157deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.025) 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 70px -40px rgba(0,0,0,0.65)',
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-7">
          {MARKS.map((m) => (
            <div
              key={m.src}
              className="flex items-center justify-center rounded-xl bg-[#f5f6f8] px-5 py-3.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto select-none object-contain md:h-9"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

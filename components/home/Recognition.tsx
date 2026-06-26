/**
 * Recognition — official programme marks: a NVIDIA Inception membership, a DPIIT
 * (Startup India) recognition, and STPI incubation. NOT customers, investors or
 * endorsements — the precise relationship lives in each mark's alt text.
 *
 * Design: a quiet credential strip on the site's dark glass. Each mark is
 * monochrome white at reduced opacity (a CSS filter inverts the source PNG to a
 * single tone), so the row reads as recognition, not advertising. Presence over
 * colour fidelity — the standard pattern for "recognized by" strips on dark sites.
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
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-12 md:gap-14">
          {MARKS.map((m) => (
            <img
              key={m.src}
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              className="h-7 w-auto select-none object-contain opacity-70 transition-opacity duration-300 hover:opacity-95 md:h-8"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

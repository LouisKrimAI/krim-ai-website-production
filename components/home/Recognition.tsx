/**
 * Recognition — official programme marks: a NVIDIA Inception membership, a DPIIT
 * (Startup India) recognition, and STPI incubation. NOT customers, investors or
 * endorsements — the precise relationship lives in each mark's alt text.
 *
 * The marks are made for light grounds, so they're shown true-colour with their
 * white backgrounds removed, dispersed across one light, frosted card (no chips).
 * Assets: /public/images/badges/<slug>.png (transparent, normalised height).
 */

const MARKS = [
  { src: '/images/badges/nvidia-inception.png', alt: 'Member of NVIDIA Inception' },
  { src: '/images/badges/dpiit-startup-india.png', alt: 'Recognised by DPIIT — Startup India' },
  { src: '/images/badges/stpi.png', alt: 'Incubated at STPI' },
]

/** The bare logo row — transparent marks, normalised height, no chips. */
export function RecognitionMarks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 ${className}`}>
      {MARKS.map((m) => (
        <li key={m.src} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.src}
            alt={m.alt}
            loading="lazy"
            decoding="async"
            className="h-9 w-auto select-none object-contain md:h-10"
          />
        </li>
      ))}
    </ul>
  )
}

/** Light, frosted card holding the marks. */
export default function Recognition({ className = '' }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-[720px] ${className}`}>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        Recognition &amp; programmes
      </p>
      <div className="mt-6 rounded-2xl border border-white/55 bg-white/[0.92] px-8 py-7 shadow-[0_28px_80px_-34px_rgba(0,0,0,0.65)] backdrop-blur-md md:px-12 md:py-8">
        <RecognitionMarks />
      </div>
    </div>
  )
}

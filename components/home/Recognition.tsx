/**
 * Recognition — homepage §8: a slim, understated glass strip of official
 * marks (honest credibility in place of customer logos). Copy verbatim from
 * docs/copy/homepage.md. Official badge images are pending: each mark has a
 * labelled placeholder slot at public/images/badges/<slug>.svg (40px tall);
 * until provided, the programme name carries it as text. "Fintech" is
 * flagged [CONFIRM] per the copy doc.
 */

const MARKS = [
  { label: 'NVIDIA Inception', slug: 'nvidia-inception' },
  { label: 'DPIIT · Startup India', slug: 'dpiit-startup-india' },
  { label: 'STPI-incubated', slug: 'stpi' },
]

export default function Recognition() {
  return (
    <div className="glass px-6 py-6 md:px-10 md:py-7">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
        Backed &amp; recognised
      </p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
        {MARKS.map((m) => (
          <li key={m.slug} className="font-sans text-[15px] tracking-[0.01em] text-ink-2">
            {/* PLACEHOLDER: official badge → /public/images/badges/{slug}.svg, ~40px tall */}
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

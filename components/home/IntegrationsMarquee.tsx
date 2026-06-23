/**
 * IntegrationsMarquee — homepage integrations strip: real partner /
 * integration logos drifting horizontally across three labelled rows
 * (Linear/Vercel-grade partner strip). Rows alternate direction
 * (left · right · left), loop slowly and seamlessly (logo set is
 * duplicated so the translate wraps with no jump), and pause on hover.
 *
 * Logos are recovered PNGs under /public/brand/integrations/. They are
 * unified to monochrome white via a CSS filter and normalised height so
 * the mismatched source art reads as one calm system.
 *
 * Self-contained: the @keyframes live in a local <style> with uniquely
 * named animations (krim-marquee-l / krim-marquee-r) so globals.css is
 * untouched. GPU-only transforms (translate3d); prefers-reduced-motion
 * pins every row static. No props.
 */

type Logo = { src: string; alt: string }

type Row = {
  /** uppercase mono label shown beside the row */
  label: string
  /** scroll direction — drives which keyframe + which fill order */
  dir: 'l' | 'r'
  /** loop duration in seconds (slow, premium drift) */
  duration: number
  logos: Logo[]
}

const BASE = '/brand/integrations'

// Three categorised flows, alternating direction (l · r · l) — a calm,
// premium partner strip that reads as one system across the lifecycle.
const ROWS: Row[] = [
  {
    label: 'Core & lending',
    dir: 'l',
    duration: 64,
    logos: [
      { src: `${BASE}/temenos.png`, alt: 'Temenos' },
      { src: `${BASE}/oracle.png`, alt: 'Oracle' },
      { src: `${BASE}/fis.png`, alt: 'FIS' },
      { src: `${BASE}/fiserv.png`, alt: 'Fiserv' },
      { src: `${BASE}/jackhenry.png`, alt: 'Jack Henry' },
    ],
  },
  {
    label: 'Cloud & data',
    dir: 'r',
    duration: 58,
    logos: [
      { src: `${BASE}/aws.png`, alt: 'AWS' },
      { src: `${BASE}/azure.png`, alt: 'Microsoft Azure' },
      { src: `${BASE}/snowflake.png`, alt: 'Snowflake' },
      { src: `${BASE}/databricks.png`, alt: 'Databricks' },
    ],
  },
  {
    label: 'Channels & CRM',
    dir: 'l',
    duration: 70,
    logos: [
      { src: `${BASE}/salesforce.png`, alt: 'Salesforce' },
      { src: `${BASE}/hubspot.png`, alt: 'HubSpot' },
      { src: `${BASE}/slack.png`, alt: 'Slack' },
      { src: `${BASE}/teams.png`, alt: 'Microsoft Teams' },
      { src: `${BASE}/zoom.png`, alt: 'Zoom' },
    ],
  },
]

/** Soft fade at both ends of every row so logos dissolve at the edges. */
const EDGE_MASK =
  'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)'

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      // h-7 normalises every source PNG to one height; the filter renders
      // each mark monochrome white so mismatched art reads as one system.
      className="h-7 w-auto select-none opacity-[0.52] transition-opacity duration-300 ease-out hover:opacity-100"
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  )
}

function MarqueeRow({ row }: { row: Row }) {
  const animationName = row.dir === 'l' ? 'krim-marquee-l' : 'krim-marquee-r'
  // Duplicate the set so the track is exactly 2× its content; translating
  // by -50% (or +/- equivalents) lands precisely on the seam → no jump.
  const track = [...row.logos, ...row.logos]

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      {/* label + hairline rule */}
      <div className="flex shrink-0 items-center gap-3 md:w-44">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
          {row.label}
        </span>
        <span className="h-px flex-1 bg-white/10 md:hidden" />
      </div>

      {/* drifting track — the group enables pause-on-hover */}
      <div
        className="krim-marquee group relative flex-1 overflow-hidden"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div
          className="krim-marquee-track flex w-max items-center gap-14 pr-14 group-hover:[animation-play-state:paused] md:gap-20 md:pr-20"
          style={{
            animationName,
            animationDuration: `${row.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            willChange: 'transform',
          }}
          aria-hidden={false}
        >
          {track.map((logo, i) => (
            <LogoItem key={`${logo.alt}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function IntegrationsMarquee() {
  return (
    <div className="mx-auto w-full max-w-site">
      {/* Self-contained keyframes — uniquely named so globals.css is untouched.
          translate3d keeps the animation on the GPU; -50% / from -50% lands on
          the duplicated seam. Reduced motion pins the track and restores opacity. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes krim-marquee-l {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
@keyframes krim-marquee-r {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .krim-marquee-track {
    animation: none !important;
    transform: none !important;
  }
}
`,
        }}
      />

      <div className="flex flex-col gap-7 md:gap-8">
        {ROWS.map((row) => (
          <MarqueeRow key={row.label} row={row} />
        ))}
      </div>
    </div>
  )
}

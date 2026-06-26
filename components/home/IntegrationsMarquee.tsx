/**
 * IntegrationsMarquee — homepage integrations strip: real integration logos
 * drifting horizontally across labelled rows (Linear/Vercel-grade partner strip).
 * Rows alternate direction, loop slowly and seamlessly (the logo set is duplicated
 * so the translate wraps with no jump), and pause on hover.
 *
 * Logos live as monochrome-friendly assets under /public/brand/integrations/
 * (svg or png, transparent). They are unified to white via a CSS filter and
 * normalised height so mismatched source art reads as one calm system.
 *
 * SELF-FILLING: each row declares the brands we intend to show; at render the
 * strip keeps only those whose asset is actually present on disk, and drops any
 * row left empty. So new categories (Credit & identity, Models & AI) appear the
 * moment their first logo is dropped in — no broken images, no code change. The
 * full target catalogue (the sourcing list) lives in CATALOGUE below.
 *
 * Server component (uses fs to resolve present assets). The @keyframes live in a
 * local <style> with uniquely named animations so globals.css is untouched.
 * GPU-only transforms; prefers-reduced-motion pins every row static. No props.
 */

import fs from 'node:fs'
import path from 'node:path'

type Brand = { slug: string; alt: string }
type RowDef = {
  /** uppercase mono label shown beside the row */
  label: string
  /** scroll direction — drives which keyframe + which fill order */
  dir: 'l' | 'r'
  /** loop duration in seconds (slow, premium drift) */
  duration: number
  brands: Brand[]
}

const BASE = '/brand/integrations'
const DIR = path.join(process.cwd(), 'public', 'brand', 'integrations')

// Target catalogue — lifecycle-ordered. Drop assets named <slug>.svg|png into
// /public/brand/integrations to light each one up. Brands without an asset are
// skipped; rows with no present assets are hidden entirely.
const CATALOGUE: RowDef[] = [
  {
    label: 'Core & lending',
    dir: 'l',
    duration: 64,
    brands: [
      { slug: 'temenos', alt: 'Temenos' },
      { slug: 'finastra', alt: 'Finastra' },
      { slug: 'oracle', alt: 'Oracle' },
      { slug: 'fis', alt: 'FIS' },
      { slug: 'fiserv', alt: 'Fiserv' },
      { slug: 'jackhenry', alt: 'Jack Henry' },
      { slug: 'ncino', alt: 'nCino' },
      { slug: 'mambu', alt: 'Mambu' },
      { slug: 'thoughtmachine', alt: 'Thought Machine' },
      { slug: 'backbase', alt: 'Backbase' },
      { slug: 'finacle', alt: 'Infosys Finacle' },
      { slug: 'blend', alt: 'Blend' },
      { slug: 'q2', alt: 'Q2' },
      { slug: 'icemortgage', alt: 'ICE Mortgage Technology' },
      { slug: 'meridianlink', alt: 'MeridianLink' },
      { slug: 'tcsbancs', alt: 'TCS BaNCS' },
      { slug: 'nucleus', alt: 'Nucleus Software' },
      { slug: 'newgen', alt: 'Newgen' },
    ],
  },
  {
    label: 'Credit & identity',
    dir: 'r',
    duration: 60,
    brands: [
      { slug: 'experian', alt: 'Experian' },
      { slug: 'equifax', alt: 'Equifax' },
      { slug: 'transunion', alt: 'TransUnion' },
      { slug: 'fico', alt: 'FICO' },
      { slug: 'plaid', alt: 'Plaid' },
      { slug: 'socure', alt: 'Socure' },
      { slug: 'lexisnexis', alt: 'LexisNexis' },
      { slug: 'onfido', alt: 'Onfido' },
      { slug: 'persona', alt: 'Persona' },
      { slug: 'jumio', alt: 'Jumio' },
      { slug: 'crif', alt: 'CRIF High Mark' },
      { slug: 'truelayer', alt: 'TrueLayer' },
      { slug: 'perfios', alt: 'Perfios' },
    ],
  },
  {
    label: 'Cloud & data',
    dir: 'l',
    duration: 58,
    brands: [
      { slug: 'aws', alt: 'AWS' },
      { slug: 'azure', alt: 'Microsoft Azure' },
      { slug: 'googlecloud', alt: 'Google Cloud' },
      { slug: 'snowflake', alt: 'Snowflake' },
      { slug: 'databricks', alt: 'Databricks' },
      { slug: 'confluent', alt: 'Confluent' },
      { slug: 'postgresql', alt: 'PostgreSQL' },
      { slug: 'mongodb', alt: 'MongoDB' },
      { slug: 'elastic', alt: 'Elastic' },
    ],
  },
  {
    // Model-agnostic: KrimOS orchestrates and validates any model.
    label: 'Models & AI',
    dir: 'r',
    duration: 54,
    brands: [
      { slug: 'openai', alt: 'OpenAI' },
      { slug: 'anthropic', alt: 'Anthropic' },
      { slug: 'gemini', alt: 'Google Gemini' },
      { slug: 'meta-llama', alt: 'Meta Llama' },
      { slug: 'mistral', alt: 'Mistral AI' },
      { slug: 'cohere', alt: 'Cohere' },
      { slug: 'nvidia', alt: 'NVIDIA' },
      { slug: 'huggingface', alt: 'Hugging Face' },
      { slug: 'langchain', alt: 'LangChain' },
      { slug: 'pinecone', alt: 'Pinecone' },
    ],
  },
  {
    label: 'Channels & CRM',
    dir: 'l',
    duration: 70,
    brands: [
      { slug: 'salesforce', alt: 'Salesforce' },
      { slug: 'hubspot', alt: 'HubSpot' },
      { slug: 'dynamics', alt: 'Microsoft Dynamics' },
      { slug: 'twilio', alt: 'Twilio' },
      { slug: 'whatsapp', alt: 'WhatsApp' },
      { slug: 'genesys', alt: 'Genesys' },
      { slug: 'slack', alt: 'Slack' },
      { slug: 'teams', alt: 'Microsoft Teams' },
      { slug: 'zoom', alt: 'Zoom' },
      { slug: 'zendesk', alt: 'Zendesk' },
      { slug: 'docusign', alt: 'DocuSign' },
      { slug: 'intercom', alt: 'Intercom' },
      { slug: 'five9', alt: 'Five9' },
      { slug: 'nice', alt: 'NICE' },
      { slug: 'sinch', alt: 'Sinch' },
      { slug: 'adobesign', alt: 'Adobe Acrobat Sign' },
      { slug: 'gupshup', alt: 'Gupshup' },
      { slug: 'freshworks', alt: 'Freshworks' },
    ],
  },
  {
    // The money layer — disbursement, repayment, cards and networks.
    label: 'Payments & rails',
    dir: 'r',
    duration: 62,
    brands: [
      { slug: 'visa', alt: 'Visa' },
      { slug: 'mastercard', alt: 'Mastercard' },
      { slug: 'stripe', alt: 'Stripe' },
      { slug: 'adyen', alt: 'Adyen' },
      { slug: 'paypal', alt: 'PayPal' },
      { slug: 'worldpay', alt: 'Worldpay' },
      { slug: 'checkout', alt: 'Checkout.com' },
      { slug: 'moderntreasury', alt: 'Modern Treasury' },
      { slug: 'marqeta', alt: 'Marqeta' },
      { slug: 'galileo', alt: 'Galileo' },
      { slug: 'swift', alt: 'Swift' },
      { slug: 'gocardless', alt: 'GoCardless' },
      { slug: 'razorpay', alt: 'Razorpay' },
    ],
  },
]

type Logo = { src: string; alt: string }
type Row = { label: string; dir: 'l' | 'r'; duration: number; logos: Logo[] }

/** First existing asset for a slug (svg → png → webp), or null if none present. */
function resolveSrc(slug: string): string | null {
  for (const ext of ['svg', 'png', 'webp']) {
    if (fs.existsSync(path.join(DIR, `${slug}.${ext}`))) return `${BASE}/${slug}.${ext}`
  }
  return null
}

// Resolve the catalogue down to only what exists, dropping empty rows.
const ROWS: Row[] = CATALOGUE.map((row) => ({
  label: row.label,
  dir: row.dir,
  duration: row.duration,
  logos: row.brands
    .map((b) => ({ src: resolveSrc(b.slug), alt: b.alt }))
    .filter((l): l is Logo => l.src !== null),
})).filter((row) => row.logos.length > 0)

/** Soft fade at both ends of every row so logos dissolve at the edges. */
const EDGE_MASK =
  'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)'

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      // eager + sync-ish: every logo must have its real width immediately, or a
      // late-loading mark resizes the w-max track mid-loop and the -50% wrap jumps.
      loading="eager"
      decoding="async"
      draggable={false}
      // h-7 normalises every source asset to one height; the filter renders each
      // mark monochrome white so mismatched art reads as one system.
      className="h-7 w-auto shrink-0 select-none opacity-[0.52] transition-opacity duration-300 ease-out hover:opacity-100"
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

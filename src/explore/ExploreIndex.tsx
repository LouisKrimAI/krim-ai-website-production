/**
 * PHASE 1 — exploration index. Three genuinely distinct homepage directions
 * for krim.ai. Pick one, or combine. See PROGRESS.md.
 */

const DIRECTIONS = [
  {
    href: '/explore/gate',
    label: 'A · The Gate',
    concept: 'Pre-execution validation as the page’s structural conceit. Everything above the gate line is proposed (mono, draft); everything below is cleared (inked serif). Live actions cross the gate in the hero.',
    system: 'Newsreader serif · IBM Plex Mono · the design-tokens palette executed faithfully — near-black, mint, gold.',
    bg: '#09090C', accent: '#00FFB2', font: "'Newsreader', Georgia, serif", fontColor: '#F6F6F4',
  },
  {
    href: '/explore/ledger',
    label: 'B · The Ledger',
    concept: '“The AI your regulator can read,” taken literally — the site IS the evidentiary record. Line numbers, timestamps, exhibits, a stamp. Court record × Swiss typography × Stripe Press.',
    system: 'Spectral serif · Archivo · IBM Plex Mono — a deliberate departure to PAPER-LIGHT, mint darkened to a seal green.',
    bg: '#F7F5F1', accent: '#0A6B4E', font: "'Spectral', Georgia, serif", fontColor: '#16181D',
  },
  {
    href: '/explore/field',
    label: 'C · The Field',
    concept: 'The runtime as a living particle field. The orb (thinking, cyan) emits proposed actions; they cross the validation membrane and ignite mint. The orb’s cyan→mint handoff becomes the site’s whole colour grammar.',
    system: 'Space Grotesk · JetBrains Mono — generative canvas, HUD panels, deep-space #04060C.',
    bg: '#04060C', accent: '#39D6FF', font: "'Space Grotesk', system-ui, sans-serif", fontColor: '#F6F6F4',
  },
]

export default function ExploreIndex() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-14" style={{ background: '#0C0D11', color: '#A9ADB6', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: '#00FFB2', fontFamily: "'IBM Plex Mono', monospace" }}>
          krim.ai rebuild · Phase 1
        </p>
        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-3" style={{ color: '#F6F6F4', fontFamily: "'Newsreader', Georgia, serif" }}>
          Three directions. One decision.
        </h1>
        <p className="text-[15px] leading-relaxed max-w-[64ch] mb-12">
          Each direction is a different concept, type system, colour expression and motion language —
          built as real, interactive code with facts from <code>docs/krim-content.md</code>.
          View each full-screen; judge on a desktop. Pick one, or combine.
        </p>

        <div className="space-y-6">
          {DIRECTIONS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="block group transition-transform duration-200 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="grid md:grid-cols-[260px_1fr] gap-0">
                <div className="flex items-center justify-center p-10 min-h-[150px]" style={{ background: d.bg }}>
                  <span className="text-[1.6rem]" style={{ color: d.fontColor, fontFamily: d.font }}>
                    Krim<span style={{ color: d.accent }}>.</span>
                  </span>
                </div>
                <div className="p-7 md:p-8" style={{ background: '#101116' }}>
                  <p className="text-[12px] tracking-[0.2em] uppercase mb-3" style={{ color: d.accent === '#0A6B4E' ? '#00C98C' : d.accent, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {d.label}
                  </p>
                  <p className="text-[15px] leading-relaxed mb-3" style={{ color: '#F6F6F4' }}>{d.concept}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#6B6F78' }}>{d.system}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[12px] mt-12" style={{ color: '#6B6F78' }}>
          Phase 2 systematises the winner (tokens · components · the faithful orb arrival) on the Next.js migration.
        </p>
      </div>
    </div>
  )
}

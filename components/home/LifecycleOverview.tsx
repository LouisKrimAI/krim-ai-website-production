'use client'

/**
 * LifecycleOverview — homepage §2: the glanceable lending lifecycle.
 *
 * One current, eight named stages, three outcomes — no console, no tabs, no
 * chips. This section makes the scope legible in five seconds; the full
 * instrument (LoanMeridian, §9 #who) carries the depth for readers who have
 * scrolled far enough to want it, and the pill below hands them there.
 * Stage data is imported from LoanMeridian — one source of truth.
 */

import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'
import { STAGES } from './LoanMeridian'


// What it adds up to — the three institutional outcomes (rendered here, above
// the fold, where the claim earns the scroll; the deep section proves it).
const OUTCOMES = [
  { impact: 'Scale without the headcount.', hi: 'Scale', tag: 'Acquisition to closure.' },
  { impact: 'Audit evidence in minutes.', hi: 'minutes', tag: 'Assembled on demand.' },
  // "The world model" not "Kovida": §2 renders before §4 introduces the name.
  { impact: 'Sharper with every loan.', hi: 'Sharper', tag: 'The world model learns.' },
] as const

export default function LifecycleOverview() {
  return (
    <Section hairline id="lifecycle">
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>The lending lifecycle</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            One runtime, from first enquiry to final payoff.
          </h2>
          <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
            AI co-workers carry every loan as{' '}
            <span className="text-mint">one connected current of work</span> — each action
            validated before it fires, risk and compliance under every step.
          </p>
        </div>
      </Reveal>

      {/* ---- THE RING (desktop) — the hero's woven ring, revealed as the
              lifecycle. Eight stages ride a luminous cyan→mint loop that
              closes on itself (a lending lifecycle literally cycles: closure →
              win-back → new loan). Same bed·bloom·core grammar as §9's rail —
              curled shut — so §2 is "the loop at a glance" and §9 is "the loop
              unrolled and opened". Labels stay horizontal (never rotated);
              geometry puts the longest name at 3 o'clock, where the gutter is
              widest. The brighter mint arc (Closure→Acquisition) names the
              compounding return. One clockwise glint runs the loop. ---- */}
      <Reveal delay={0.12}>
        <div
          className="relative mx-auto mt-10 hidden h-[580px] max-w-[900px] lg:block"
          aria-label="The eight lifecycle stages, one continuous loop"
        >
          <div aria-hidden className="absolute left-1/2 top-[290px] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2">
            {/* center well — the hero's dark hollow, restated */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(57,214,255,0.08), rgba(0,255,178,0.03) 45%, transparent 70%)' }}
            />
            {/* ring layers — bed · bloom · core */}
            {[
              { t: 1, o: 0.18, blur: 0 },
              { t: 2, o: 0.4, blur: 6 },
              { t: 1.5, o: 0.9, blur: 0 },
            ].map((l, li) => (
              <div
                key={li}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(#39D6FF 0deg, #00FFB2 315deg, #39D6FF 360deg)',
                  WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${l.t}px), #000 calc(100% - ${l.t}px))`,
                  mask: `radial-gradient(farthest-side, transparent calc(100% - ${l.t}px), #000 calc(100% - ${l.t}px))`,
                  opacity: l.o,
                  filter: l.blur ? `blur(${l.blur}px)` : undefined,
                }}
              />
            ))}
            {/* the compounding return — Closure back to Acquisition, brighter mint */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(transparent 0deg 315deg, rgba(0,255,178,0.6) 315deg 360deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
              }}
            />
            {/* one clockwise glint — the current running the loop (CSS, GPU-only) */}
            <div
              className="lifecycle-glint absolute inset-0 rounded-full"
              style={{
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))',
              }}
            />
          </div>

          {/* center medallion — a glass hub carrying the compounding cue,
              like the movement window of a fine watch */}
          <div
            className="absolute left-1/2 top-[290px] flex h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(120% 120% at 50% 40%, rgba(255,255,255,0.05), rgba(9,10,14,0.55) 70%)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(14px) saturate(120%)',
              WebkitBackdropFilter: 'blur(14px) saturate(120%)',
              boxShadow:
                'inset 0 1px 0 0 rgba(255,255,255,0.10), inset 0 0 24px -8px rgba(0,255,178,0.25), 0 20px 50px -24px rgba(2,4,10,0.7)',
            }}
          >
            <span aria-hidden className="text-[15px] leading-none text-mint/80">↺</span>
            <span className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.24em] text-mint/70">and again</span>
          </div>

          {/* the stages — glass chips strung just outside the loop, each
              docked to the jewel-node where the current meets its stage */}
          {STAGES.map((st, i) => {
            const a = ((-90 + i * 45) * Math.PI) / 180
            const x = Math.cos(a) * 190
            const y = 290 + Math.sin(a) * 190
            const cos = Math.cos(a)
            const side = cos > 0.3 ? 'right' : cos < -0.3 ? 'left' : i === 0 ? 'top' : 'bottom'
            const chipTransform =
              side === 'right' ? 'translate(20px, -50%)'
              : side === 'left' ? 'translate(calc(-100% - 20px), -50%)'
              : side === 'top' ? 'translate(-50%, calc(-100% - 18px))'
              : 'translate(-50%, 18px)'
            return (
              <div key={st.n} className="absolute" style={{ left: `calc(50% + ${x}px)`, top: `${y}px` }}>
                {/* jewel — the bead where the loop meets the stage */}
                <span className="absolute grid h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.35)` }} />
                  <span
                    aria-hidden
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.9)`,
                      boxShadow: `0 0 10px rgba(${st.rgb},0.55)`,
                    }}
                  />
                </span>
                {/* glass chip — the stage name, easily seen on frosted glass */}
                <div
                  className="lc-chip absolute flex flex-col items-center gap-0.5 whitespace-nowrap px-3.5 py-2 text-center"
                  style={{ transform: chipTransform, ['--rgb' as string]: st.rgb } as React.CSSProperties}
                >
                  <span aria-hidden className="font-mono text-[9px] leading-none tracking-[0.24em]" style={{ color: `rgba(${st.rgb},0.72)` }}>
                    {st.n}
                  </span>
                  <span className="font-serif text-[0.95rem] leading-tight text-ink">{st.area}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* ---- mobile — the display case: one glass panel holding the whole
              map (a single blur, not eight), the loop cue as its base ---- */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 max-w-[440px] lg:hidden">
          <div className="glass rounded-[16px] p-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {STAGES.map((st) => (
                <div key={st.n} className="flex items-center gap-3">
                  <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: `rgba(${st.rgb},0.9)`, boxShadow: `0 0 8px rgba(${st.rgb},0.5)` }} />
                  <div className="flex flex-col">
                    <span aria-hidden className="font-mono text-[8px] leading-none tracking-[0.24em]" style={{ color: `rgba(${st.rgb},0.7)` }}>
                      {st.n}
                    </span>
                    <span className="mt-0.5 font-serif text-[1rem] leading-tight text-ink">{st.area}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-4">
              <span aria-hidden className="text-mint/80">↺</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-mint/70">and again</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- what it adds up to — three outcomes, open air, no box ---- */}
      <Reveal delay={0.18}>
        <div className="mx-auto mt-14 grid max-w-[880px] gap-x-8 gap-y-8 text-center md:grid-cols-3">
          {OUTCOMES.map(({ impact, hi, tag }) => {
            const [pre, post] = impact.split(hi)
            return (
              <div key={impact}>
                <h3 className="font-serif text-display-2 text-ink">
                  {pre}
                  <span className="text-mint">{hi}</span>
                  {post}
                </h3>
                <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{tag}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* ---- hand-off to the full instrument, deeper in the page ---- */}
      <Reveal delay={0.22}>
        <div className="mt-12 flex justify-center">
          <a
            href="#who"
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.04] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90 transition-all duration-300 hover:border-mint/55 hover:bg-mint/[0.10] hover:text-mint hover:shadow-[0_0_26px_-8px_rgba(0,255,178,0.55)]"
          >
            Explore every stage
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

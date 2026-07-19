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

// The current: cyan (in-flow) warming to mint (validated) across the lifecycle.
const CURRENT = 'linear-gradient(90deg, rgba(57,214,255,0.9) 0%, rgba(0,255,178,0.95) 100%)'

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

      {/* ---- the current, at a glance (desktop) ---- */}
      <Reveal delay={0.12}>
        <div className="mt-14 hidden lg:block" aria-label="The eight lifecycle stages">
          <div className="relative">
            {/* the current — bed · bloom · core (same grammar as the deep instrument) */}
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-px -translate-y-px opacity-[0.18]" style={{ background: 'linear-gradient(90deg, rgba(57,214,255,0.5), rgba(0,255,178,0.5))' }} />
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-[2px] -translate-y-px opacity-40 blur-[6px]" style={{ background: CURRENT }} />
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-px -translate-y-px opacity-90" style={{ background: CURRENT }} />
            {/* no shimmer here — the overview is deliberately still; §9's instrument
                owns the "live current" tell, and the signature isn't spent twice */}
            <div className="relative grid grid-cols-8 gap-x-3 pt-[2px]">
              {STAGES.map((st) => (
                <div key={st.n} className="flex flex-col items-center text-center">
                  <span className="relative grid h-[14px] w-full place-items-center">
                    <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.3)` }} />
                    <span
                      aria-hidden
                      className="block h-[7px] w-[7px] rounded-full"
                      style={{
                        background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.9)`,
                        boxShadow: `0 0 10px rgba(${st.rgb},0.5)`,
                      }}
                    />
                  </span>
                  <span aria-hidden className="mt-4 font-mono text-[9px] leading-none tracking-[0.24em]" style={{ color: `rgba(${st.rgb},0.6)` }}>
                    {st.n}
                  </span>
                  <span className="mt-1.5 font-serif text-[1.02rem] leading-tight text-ink-2">
                    {st.area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- mobile — compact two-column map ---- */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-3.5 lg:hidden">
          {STAGES.map((st) => (
            <div key={st.n} className="flex items-center gap-3">
              <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: `rgba(${st.rgb},0.9)`, boxShadow: `0 0 8px rgba(${st.rgb},0.5)` }} />
              <span className="font-serif text-[1.02rem] leading-tight text-ink-2">{st.area}</span>
            </div>
          ))}
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

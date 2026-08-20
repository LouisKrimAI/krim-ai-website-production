'use client'

/**
 * LifecycleOverview — homepage §2: the glanceable lending lifecycle.
 *
 * One current, eight named stages, three outcomes — no console, no tabs, no
 * chips. This section makes the scope legible in five seconds; the full
 * instrument (LoanMeridian, §9 #who) carries the depth for readers who have
 * scrolled far enough to want it, and the pill below hands them there. The
 * horizon scene itself lives in LifecycleHorizon (shared with the KrimOS hub).
 */

import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import LifecycleHorizon from './LifecycleHorizon'

// What it adds up to — the three institutional outcomes (rendered here, above
// the fold, where the claim earns the scroll; the deep section proves it).
const OUTCOMES = [
  { impact: 'Scale without the headcount.', hi: 'Scale', tag: 'AI workers carry the volume.' },
  { impact: 'Audit evidence in minutes.', hi: 'minutes', tag: 'The record writes itself.' },
  // Finer grain than "every loan": the world model learns continuously, from
  // every decision it records — not once a loan closes. "The world model" not
  // "Kovida": §2 renders before §4 introduces the name.
  { impact: 'Smarter with every decision.', hi: 'Smarter', tag: 'The world model learns.' },
] as const

export default function LifecycleOverview() {
  return (
    <Section hairline id="lifecycle">
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>The agent operating system</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            <span className="text-grad-carved-green">KrimOS</span> runs the whole loan, from
            first enquiry to final payoff.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
            AI co-workers carry every loan as{' '}
            <span className="text-mint">one connected current of work</span>, every action
            validated before it fires.
          </p>
        </div>
      </Reveal>

      {/* the lending horizon — one current, eight stages, told as first light */}
      <LifecycleHorizon />

      {/* ---- what it adds up to — three outcomes, each on the house glass so
              the words hold against the ring ---- */}
      <Reveal delay={0.18}>
        <div className="mx-auto mt-8 grid max-w-[960px] gap-4 text-center md:grid-cols-3 lg:gap-5">
          {OUTCOMES.map(({ impact, hi, tag }) => {
            const [pre, post] = impact.split(hi)
            return (
              <GlassCard key={impact} hover className="flex h-full flex-col px-7 py-6">
                <h3 className="font-serif text-display-2 text-ink">
                  {pre}
                  <span className="text-mint">{hi}</span>
                  {post}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">{tag}</p>
              </GlassCard>
            )
          })}
        </div>
      </Reveal>

      {/* ---- hand-off to the full instrument, deeper in the page ---- */}
      <Reveal delay={0.22}>
        <div className="mt-6 flex justify-center">
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

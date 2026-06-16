/**
 * /research/world-lending-model — the World Lending Model.
 *
 * Krim's research direction: a learned model of how a lending OPERATION behaves,
 * built from the validated outcomes KrimOS records, deepening as it observes more,
 * governed inside the institution's walls.
 *
 * HONESTY + HARD RULES:
 *  - This is a research DIRECTION and intended outcome, not a finished artifact.
 *    We say so plainly. No claimed results, customers, metrics or deployments.
 *  - It is NOT underwriting / credit scoring. It models the conduct of the
 *    operation around lending, never who gets a loan or on what terms — that
 *    judgment stays with the institution. (Karta = operational decisioning.)
 *  - Standalone shell (SiteHeader + OrbBackdrop + main z-10 + SiteFooter), like
 *    app/research/page.tsx. Facts trace to docs/krim-content.md (Kendra · Krim-Learn
 *    · Krim-Ledger · the shared, anonymised pattern library).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'World Lending Model',
  description:
    'The World Lending Model is Krim’s research direction: a learned model of how a lending operation actually behaves — built from the validated outcomes KrimOS records, deepening as it observes more, governed inside the institution’s own walls. It models the operation, not the credit decision: it is not underwriting and not a credit score.',
  alternates: { canonical: 'https://krim.ai/research/world-lending-model' },
  openGraph: { title: 'World Lending Model — Krim Research', url: 'https://krim.ai/research/world-lending-model' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://krim.ai/research' },
    { '@type': 'ListItem', position: 3, name: 'World Lending Model', item: 'https://krim.ai/research/world-lending-model' },
  ],
}

const DEMO_HREF = '/contact'

export default function WorldLendingModelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero — answer-first, honest about what it is ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[880px] text-center">
            <Reveal>
              <Eyebrow tone="cyan">Research · World Lending Model</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                A model of how lending actually behaves.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
                Run a whole lending operation on one validated runtime and it leaves a connected
                record of how borrowers, products, channels, rules and outcomes move over time.
                Turning that record into a model the system can{' '}
                <span className="text-cyan">reason and plan against</span> — a world model for
                lending — is the direction our research is building toward. It{' '}
                <span className="text-ink">deepens as it observes more of the operation</span>, and
                it never leaves your walls.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform/kendra" variant="secondary">
                  See the runtime it learns from
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The idea — what a world model is ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The idea</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Borrowed from how machines learn to act.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  A world model is an internal picture of an environment — enough of how it behaves
                  that a system can anticipate what happens next and{' '}
                  <span className="text-ink">plan before it acts</span>, instead of reacting blindly.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  We apply the idea to a domain a system can finally observe in full: the operation
                  of lending — not the borrower’s creditworthiness, but the living conduct of the
                  work around the loan.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  A representation, not a rulebook
                </p>
                <p className="mt-5 font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-ink">
                  Most software encodes what an operation should do. A world model learns how it
                  really moves — so the next action can be chosen with the whole picture in view.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Why we can build it — the data substrate ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why we can build it</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              One runtime sees the whole operation.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Because Kendra runs the whole lifecycle and Krim-Ledger records every action with its
              reasoning on one immutable trail, KrimOS accumulates something rare: a connected,
              ground-truth account of <span className="text-ink">what was done, why, under which
              rule, and what followed</span>. Bureau data is a snapshot. This is the operation in
              motion.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ['Validated action', 'Every step clears Krim-Nyāya before it fires — so what enters the record is real, allowed and explained.', 'mint'],
              ['Recorded outcome', 'The action and its result land together on one ledger — the cause and the effect, never separated.', 'cyan'],
              ['Sharper next move', 'Krim-Learn reads the outcome and feeds back what worked — the model of the operation gets a little truer.', 'mint'],
            ].map(([title, body, tint], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="glass lume flex h-full flex-col p-7">
                  <span aria-hidden className={`block h-[3px] w-12 rounded-full ${tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'}`} />
                  <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.3rem] leading-tight text-ink">{title}</h3>
                  <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · What it is NOT — the load-bearing clarity ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">What it is not</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Not a credit score. A model of the operation.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  The World Lending Model does not decide who gets a loan, on what terms, or at what
                  price. That judgment stays with the institution. It models the{' '}
                  <span className="text-ink">conduct of the operation around lending</span> — how a
                  case progresses, which validated action fits a moment, where friction and risk
                  concentrate, what actually resolves.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  It makes the operation smarter and safer to run — it does not make the credit
                  decision automatic, and it is never a black box.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <div className="space-y-7">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                      What it does not do
                    </p>
                    <p className="mt-2 font-sans text-body text-ink-2">
                      Score a borrower · approve, deny or price a loan · replace the lender’s
                      underwriting judgment.
                    </p>
                  </div>
                  <div className="border-t border-soft pt-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                      What it’s built to do
                    </p>
                    <p className="mt-2 font-sans text-body text-ink-2">
                      Anticipate how an operation behaves · choose the action that fits the moment ·
                      make compliant operations cheaper and safer to run at scale.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · How it compounds ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>How it gets better</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                It compounds with every validated outcome.
              </h2>
              <p className="mx-auto mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
                Krim-Learn reads every recorded outcome through ten learning loops. It is
                disciplined, not magic: a pattern only joins the shared, anonymised library once it
                clears an effectiveness threshold of around{' '}
                <span className="text-mint">80%</span>, and what is shared is aggregated and
                opt-out. A baseline in the first quarter is materially beyond it by year two — and
                because it all happens <span className="text-ink">inside the perimeter</span>, the
                institution’s data never leaves to make that happen.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <GlassCard accent className="mx-auto mt-12 max-w-[820px] p-8 text-center md:p-10">
              <p className="font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] leading-snug text-ink">
                Validated before it acts. Smarter after it acts.
              </p>
              <p className="mx-auto mt-5 max-w-[58ch] font-sans text-body text-ink-2">
                The same validation that keeps every action accountable is the complete record the
                model learns from — so safety and intelligence come from one source of truth.
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- 6 · Why it matters — payoff, honest about where it is ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow tone="cyan">Why it matters</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The operation, learnable at last.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  The credit gap is as much an operations problem as a risk one: the cost and risk of
                  running compliant operations at scale keeps good lending from reaching more people.
                  A model that makes those operations sharper and safer lowers that cost.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  We are honest about where this is. It is a direction we are building toward — one
                  that deepens as the system observes more — not a finished artifact we claim. The
                  foundations are real; they are built to grow.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Where it stands today
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    ['A direction, not a claim', 'Presented as research and intent — never as a finished or proven model.'],
                    ['Grounded in real operations', 'It learns only from validated, recorded outcomes — not synthetic benchmarks.'],
                    ['Governed and sovereign', 'It deepens inside each institution’s walls; shared learning is anonymised and opt-out.'],
                  ].map(([name, body]) => (
                    <li key={name}>
                      <p className="font-serif text-[1.1rem] leading-none text-ink">{name}</p>
                      <p className="mt-1.5 font-sans text-caption leading-relaxed text-ink-2">{body}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See the runtime the model learns from.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                The World Lending Model is a research direction. Kendra — the runtime that validates
                every action and records every outcome — is the part you can watch run today.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/research" variant="secondary">
                  Back to research
                </CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

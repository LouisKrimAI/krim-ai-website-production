/**
 * /research/world-lending-model — Kovida, the world lending model.
 *
 * Kovida is Krim's flagship research direction: a complete, safe world model of
 * lending, with an agent harness, spanning the entire stack — origination, a
 * validated AI underwriter, servicing, collections. Presented confidently as the
 * company's
 * direction and an active area of research (see docs/krim-content.md → "Direction
 * — the full lending stack", which supersedes the old "never underwriting" line).
 *
 * VOICE: confident, not defensive. Internal caveats guide the content; they are
 * not voiced as anxious disclaimers (HOUSE-STYLE §10 "Don't over-disclaim"). The
 * one substantive candor — a model is only as good as its accuracy, which is why
 * validation + learning are built in — is framed as a design principle, not a
 * hedge. Do not fabricate live deployments, customers or metrics.
 *
 * Standalone shell (SiteHeader + main z-10 + SiteFooter); the shared research
 * backdrop (the KrimOS lab) is root-mounted via ResearchBackdrop.
 * Grounding: world-model architecture (encode → predict → plan), the lending
 * lifecycle, and the fair-lending / SR 11-7 / EU-AI-Act frame for a safe AI
 * underwriter.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import LifecycleExplorer from '@/components/research/LifecycleExplorer'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kovida — the world lending model',
  description:
    'Kovida is Krim’s world lending model: a learned, safe model of how lending actually behaves, across borrowers, products, markets, rules and the whole lifecycle. AI agents simulate an action against Kovida and clear it through the compliance gate before they act, from origination to a validated AI underwriter to collections. Every recorded outcome makes the model sharper, inside the institution’s own walls.',
  alternates: { canonical: 'https://www.krim.ai/research/world-lending-model' },
  openGraph: {
    title: 'Kovida — the world lending model · Krim Research',
    description:
      'Kovida is a learned, safe world model of lending, that AI agents simulate against and clear through the compliance gate before they act, from origination to a validated AI underwriter to collections. Every recorded outcome makes the model sharper, inside the institution’s own walls.',
    url: 'https://www.krim.ai/research/world-lending-model',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://www.krim.ai/research' },
    { '@type': 'ListItem', position: 3, name: 'Kovida — the world lending model', item: 'https://www.krim.ai/research/world-lending-model' },
  ],
}

const DEMO_HREF = '/contact'

// The component parts of the model — the "world" it represents.
const COMPONENTS = [
  {
    name: 'The borrower model',
    body: 'A living read on a borrower’s ability and willingness to repay, and how it shifts with income, behaviour and life events. It moves as their life does, so it never goes stale like a fixed credit score.',
    tint: 'mint',
  },
  {
    name: 'Products & cashflows',
    body: 'How a loan’s terms, balances and repayments behave over its life, under each path a borrower might take. It links the way a loan is built to the economics it produces.',
    tint: 'mint',
  },
  {
    name: 'Market & macro',
    body: 'The world outside the loan: interest rates, employment, sector and regional conditions. It captures how a shift out there moves both borrower behaviour and portfolio outcomes.',
    tint: 'cyan',
  },
  {
    name: 'Policy & rules',
    body: 'The rules in a form the machine can check: fair-lending law, each jurisdiction’s regulations, the institution’s own risk appetite. Every proposed action is tested against them before it goes ahead.',
    tint: 'mint',
  },
  {
    name: 'Lifecycle dynamics',
    body: 'How a case moves through origination, underwriting, servicing and collections, and how one action at any stage changes what is possible at the next.',
    tint: 'cyan',
  },
]

export default function WorldLendingModelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[900px] text-center">
            <Reveal>
              <Eyebrow tone="cyan">Research · Kovida</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                <span className="text-grad-carved">Kovida</span>, a world model for lending.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Kovida is a learned model of how lending actually behaves, so every agent from
                origination to collections plans against the same picture.{' '}
                <span className="text-mint">
                  No action fires until Kovida has simulated it and the compliance gate has
                  cleared it.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See the runtime it learns from
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · What a world model is + the structural-alignment hook ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The idea</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Borrowed from the frontier of AI.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  A world model is the AI’s picture of its environment, detailed enough to play an
                  action forward and see what happens. The aim is for an agent to{' '}
                  <span className="text-ink">simulate an action against the model in a sandbox</span>,
                  checking the likely borrower response and compliance risk, before taking it for real.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  Lending is where that matters most. Its decisions are consequential and hard to
                  reverse, so testing one before it happens is worth more here than anywhere.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  The architecture and the rulebook agree
                </p>
                <p className="mt-5 font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-ink">
                  “Check an action against its consequences before you take it” is Kovida’s safety
                  property. It is also, in essence, what a regulator asks of a credit decision.
                </p>
                <p className="mt-5 font-sans text-body text-ink-2">
                  It is the same control in both worlds, which is why a world model is the right way
                  to build lending that scales without scaling its risk.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · The component parts ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Inside the model</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Many models of the world, learned as one.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The world of lending is too large for one function to capture. Kovida builds it from
              parts, each learned from real outcomes, each sharpening the others.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {COMPONENTS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.07}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${c.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'}`}
                  />
                  <h3 className="mt-6 font-serif text-[1.35rem] leading-tight text-ink">{c.name}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
            {/* sixth tile — the harness, as the part that acts on the other five */}
            <Reveal delay={0.14}>
              <div className="glass flex h-full flex-col justify-center p-7 md:p-8" style={{ borderColor: 'rgba(0,255,178,0.45)' }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">+ the agent harness</p>
                <p className="mt-3 font-serif text-[1.2rem] leading-snug text-ink">
                  The layer that carries the model’s predictions into the real world, enforcing every
                  compliance boundary as it acts.
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · The agent harness — what makes it safe ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow>The agent harness</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  A powerful world model, made safe enough to act.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Agents work the whole stack: origination, a{' '}
                  <span className="text-ink">validated AI underwriter</span>, servicing and
                  collections. Every action, including each credit decision, is scored against the
                  model and then{' '}
                  <span className="text-mint">cleared by the compliance gate before it can fire</span>.
                  It carries the reasons it was approved, and its outcome feeds back so the model gets
                  truer.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  A model is only as good as its accuracy, so validation and learning are part of the
                  harness itself. Validated before it acts, explainable in its reasoning, corrected by
                  real outcomes: that is what makes an AI underwriter fit for regulated credit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <ul className="space-y-6">
                  {([
                    // key word per heading, coloured by the grammar:
                    // mint = validated/learned, cyan = thinking/reasoning, gold = the sovereign boundary
                    [<><span className="text-mint">Validated</span> before it acts</>, 'Every proposed action clears Krim-Nyāya, our pre-execution validator, against local law, policy and the institution’s risk limits before it can fire.'],
                    [<><span className="text-cyan">Explainable</span> by construction</>, 'Every decision carries a step-by-step reasoning trace, recorded immutably in Krim-Ledger: cryptographic proof on demand, ready for any audit.'],
                    [<><span className="text-mint">Corrected</span> by outcomes</>, 'Krim-Learn, our learning loop, routes payment outcomes back into the model, so its accuracy improves the more lending it sees.'],
                    [<><span className="text-gold">Sovereign</span></>, 'It reasons, acts and improves entirely inside the institution’s own walls.'],
                  ] as const).map(([name, body], i) => (
                    <li key={i}>
                      <p className="font-serif text-[1.15rem] leading-none text-ink">{name}</p>
                      <p className="mt-1.5 font-sans text-caption leading-relaxed text-ink-2">{body}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · The full stack it enables ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">End to end</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              One model, the whole of lending.
            </h2>
            <p className="mt-6 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Origination, the AI underwriter, servicing and collections all reason against the same
              model, every action proven before it acts. That breaks the wall between the front and
              back of the book: collections data retrains origination, and a borrower’s underwriting
              file guides the recovery conversation later.{' '}
              <span className="text-mint">
                One shared intelligence keeps every decision accountable to the regulator, and
                creates room to serve more borrowers safely where the risk genuinely supports it.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <LifecycleExplorer />
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The model that gets better the more lending it sees.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                Built on Kendra, the runtime that validates every action and learns from every
                outcome.
              </p>
              <div className="mt-9 flex justify-center">
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

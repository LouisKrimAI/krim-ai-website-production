/**
 * /research/world-lending-model — the World Lending Model.
 *
 * Krim's flagship research direction: a complete, safe world model of lending,
 * with an agent harness, spanning the entire stack — origination, a validated
 * AI underwriter, servicing, collections. Presented confidently as the company's
 * direction and an active area of research (see docs/krim-content.md → "Direction
 * — the full lending stack", which supersedes the old "never underwriting" line).
 *
 * VOICE: confident, not defensive. Internal caveats guide the content; they are
 * not voiced as anxious disclaimers (HOUSE-STYLE §10 "Don't over-disclaim"). The
 * one substantive candor — a model is only as good as its accuracy, which is why
 * validation + learning are built in — is framed as a design principle, not a
 * hedge. Do not fabricate live deployments, customers or metrics.
 *
 * Standalone shell (SiteHeader + OrbBackdrop + main z-10 + SiteFooter).
 * Grounding: world-model architecture (encode → predict → plan), the lending
 * lifecycle, and the fair-lending / SR 11-7 / EU-AI-Act frame for a safe AI
 * underwriter.
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
    'The World Lending Model is Krim’s research direction: a complete, safe world model of lending — borrowers, products, markets, rules and the whole lifecycle — that AI agents reason and plan against across the entire stack, from origination to a validated AI underwriter to collections. Every action is validated against the model before it fires, and the model sharpens from every outcome it records, inside the institution’s own walls.',
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

// The component parts of the model — the "world" it represents.
const COMPONENTS = [
  {
    name: 'The borrower model',
    body: 'A living representation of ability and willingness to repay — and how it moves with income, behaviour and life events. Not a static score; a model that changes as the borrower does.',
    tint: 'mint',
  },
  {
    name: 'Products & cashflows',
    body: 'How a loan’s terms, balances and repayments behave across its life, under each borrower trajectory — the link between a structure and the economics it actually produces.',
    tint: 'mint',
  },
  {
    name: 'Market & macro',
    body: 'The world outside the loan: rates, employment, sector and regional conditions — and how a shift in them moves both borrower behaviour and portfolio outcomes.',
    tint: 'cyan',
  },
  {
    name: 'Policy & rules',
    body: 'The encoded, machine-checkable constraints — fair lending, each jurisdiction’s rules, the institution’s own risk appetite — that every proposed action is tested against before it can fire.',
    tint: 'mint',
  },
  {
    name: 'Lifecycle dynamics',
    body: 'How a case actually moves through origination, underwriting, servicing and collections — and how one action at any stage changes what becomes possible at the next.',
    tint: 'cyan',
  },
]

export default function WorldLendingModelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[900px] text-center">
            <Reveal>
              <Eyebrow tone="cyan">Research · World Lending Model</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                A world model for lending.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
                A world model is what lets an intelligence weigh the consequences of an action{' '}
                <span className="text-ink">before it takes it</span>. The World Lending Model brings
                that to lending — a complete, learned model of how borrowers, products, markets and
                rules actually move — so every agent across the stack, from origination to
                collections, reasons and plans against the same picture. Safe by construction:{' '}
                <span className="text-mint">nothing acts until it has cleared the model</span>.
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
                  A world model is a learned model of an environment an agent can{' '}
                  <span className="text-ink">simulate and plan against</span> — so it can judge where
                  an action leads before committing to it, rather than reacting blindly.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  Lending is the domain where that matters most. Every action is consequential and
                  often irreversible — and one validated runtime can finally see the whole of it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  The architecture and the rulebook agree
                </p>
                <p className="mt-5 font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-ink">
                  “Check an action against its consequences before you take it” is the world model’s
                  safety property — and the exact thing a regulator demands of a credit decision.
                </p>
                <p className="mt-5 font-sans text-body text-ink-2">
                  Not an analogy. The same control. That is why a world model is the right way to
                  build lending that is both powerful and safe.
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
              Five models of the world, learned as one.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The world of lending is too large for a single function. The World Lending Model
              composes it from parts — each learned from real, recorded outcomes, each sharpening the
              others.
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
                  The part that acts on the other five — and the part that keeps it safe.
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
                  Agents work the stack — origination, a validated{' '}
                  <span className="text-ink">AI underwriter</span>, servicing, collections. Each
                  action a credit decision among them — is scored against the model, then{' '}
                  <span className="text-mint">validated against policy before it fires</span>, carries
                  the reasons that cleared it, and feeds its outcome back so the model gets truer.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  A model is only as good as its accuracy — which is why validation and learning are
                  the harness, not an afterthought. Validated, explainable, and corrected by real
                  outcomes: that is what makes an AI underwriter fit for regulated credit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <ul className="space-y-6">
                  {[
                    ['Validated before it acts', 'Every action clears Krim-Nyāya against law, policy and risk appetite before it can fire.'],
                    ['Explainable by construction', 'Each decision carries the specific reasons that cleared it — no black box, by design.'],
                    ['Corrected by outcomes', 'Krim-Learn feeds every recorded result back, so the model tracks how lending actually behaves.'],
                    ['Sovereign', 'It reasons, acts and improves inside the institution’s own walls.'],
                  ].map(([name, body]) => (
                    <li key={name}>
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
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow tone="cyan">End to end</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                One model, the whole of lending.
              </h2>
              <p className="mx-auto mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
                Origination, the AI underwriter, servicing, collections — every agent reasoning
                against the same world, every action proven before it acts. That is what reaches the
                borrowers the bureau file misses while keeping every decision accountable:{' '}
                <span className="text-mint">access and accountability from one system</span>.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 flex max-w-[860px] flex-wrap items-center justify-center gap-x-3 gap-y-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">
              {['Origination', 'AI underwriting', 'Pricing', 'Servicing', 'Collections', 'Portfolio'].map((s, i, a) => (
                <span key={s} className="flex items-center gap-3">
                  <span className="text-ink-2">{s}</span>
                  {i < a.length - 1 && <span aria-hidden className="text-mint/60">→</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The model that gets better the more lending it sees.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body text-ink-2">
                The World Lending Model is the frontier of our research, and it compounds with every
                validated outcome it records. Kendra — the runtime that validates and learns — is the
                part you can watch run today.
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

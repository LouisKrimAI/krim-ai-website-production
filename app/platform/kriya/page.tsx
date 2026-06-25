/**
 * /platform/kriya — Kriya, the vocabulary (a core KrimOS layer).
 * Content-first, homepage glass, no devices (HOUSE-STYLE §7).
 * Shape: what it is (hero) → what a primitive is → the breadth →
 *        how they compose → the boundary → impact.
 * Facts: docs/krim-content.md (Kriya · the credit-native primitives).
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kriya — the vocabulary',
  description:
    'Kriya is the vocabulary of KrimOS: 500+ validated, credit-native primitives — atomic operations that ship with their own checks, metered in KWUs and logged by construction. A finite vocabulary, endless combinations.',
  alternates: { canonical: 'https://krim.ai/platform/kriya' },
  openGraph: {
    title: 'Kriya — the vocabulary',
    description:
      'Kriya is the vocabulary of KrimOS: 500+ validated, credit-native primitives — atomic operations that ship with their own checks, metered in KWUs and logged by construction. A finite vocabulary, endless combinations.',
    url: 'https://krim.ai/platform/kriya',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kriya', item: 'https://krim.ai/platform/kriya' },
  ],
}

// what every primitive carries, by construction (docs/krim-content.md · Kriya)
const PROPERTIES = [
  {
    title: 'Validated before it runs',
    body: 'Each primitive ships with its own checks. The action clears its rules first — or it never fires, and the exception is logged with the reason.',
  },
  {
    title: 'Metered as it works',
    body: 'Every primitive self-meters in Krim Work Units. The cost of an action is explained line by line, not asserted — the same record that bills it.',
  },
  {
    title: 'Logged by construction',
    body: 'Explicit inputs and outputs, written to the audit trail and versioned the moment it completes. Nothing to reconcile, no loose ends to chase later.',
  },
]

// the ten categories, verbatim from docs/krim-content.md · Kriya (lines 145–156)
const CATEGORIES = [
  { name: 'Voice & telephony', count: '~45', body: 'Placing, transferring and capturing live conversations.' },
  { name: 'Document operations', count: '~30', body: 'Generating, reading and signing the paper of regulated work.' },
  { name: 'Compliance checks', count: '~50', body: 'The rule-tests an action must pass before it is allowed to run.' },
  { name: 'Data operations', count: '~35', body: 'Fetching, updating and enriching the records work runs on.' },
  { name: 'Payment processing', count: '~25', body: 'Calculating, verifying and moving money under the rules.' },
  { name: 'Decision logic', count: '~20', body: 'Evaluating policy, resolving conflicts and routing to people.' },
  { name: 'Analytics & reporting', count: '~15', body: 'Rolling up metrics and producing the reports auditors expect.' },
  { name: 'Integration', count: '~30', body: 'Reaching the systems you already run, in both directions.' },
  { name: 'Testing & QA', count: '~10', body: 'Exercising co-workers safely before they ever touch production.' },
  { name: 'Custom', count: '—', body: 'Tenant-specific primitives, built to the same construction.' },
]

export default function KriyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kriya">
        {/* ---- Hero: what it is ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>The vocabulary</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                A finite vocabulary, endless combinations.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Every action a co-worker takes is one of{' '}
                <span className="text-mint">500+ validated, credit-native primitives</span> — the
                atomic operations of regulated lending. The list is finite;{' '}
                <span className="text-ink">what you build from it isn&rsquo;t</span>.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- What a primitive is ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>What a primitive is</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The smallest action that already knows the rules.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              A primitive does one thing, like making a call, generating a notice or moving a
              payment, and carries its own safety inside it. Because the building blocks are
              validated, everything built from them inherits that safety.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROPERTIES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{p.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- The breadth ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The library</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The whole grammar of regulated lending, in one library.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              500+ primitives span the operations a lender actually performs, across voice,
              documents, compliance, data, payments and decisions, so there are no generic
              tool-calls for an integrator to assemble. It ships credit-native.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.07}>
                <div className="glass lume h-full p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[1.3rem] leading-tight text-ink">{c.name}</h3>
                    <span className="shrink-0 font-mono text-[15px] tabular-nums text-mint/85">{c.count}</span>
                  </div>
                  <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- How they compose ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>How they compose</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  A small set of words, an unbounded set of work.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Co-workers are composed from these primitives the way sentences are composed from
                  words. The same MAKE_CALL underlies a collections call, a retention call and an
                  onboarding call — the workflow differs by policy, script and segment, and the
                  compliance scaffolding comes along for free.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-serif text-display-3 leading-tight text-ink">
                  Finite vocabulary.
                </p>
                <p className="mt-2 font-serif text-display-3 leading-tight text-mint">
                  Infinite workflows.
                </p>
                <p className="mt-6 font-sans text-body text-ink-2">
                  Every co-worker in KrimOS speaks this one vocabulary — so a check written once
                  protects every workflow that ever uses it.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- The boundary ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard accent className="mx-auto max-w-[760px] p-8 md:p-10">
              <Eyebrow tone="dim">What a primitive is</Eyebrow>
              <h2 className="mt-4 font-serif text-display-2 leading-tight text-ink">
                A primitive moves a workflow — it isn&rsquo;t the credit decision.
              </h2>
              <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                In the library, APPROVE means approval of a step in a workflow, not, in itself, a
                credit decision. Primitives segment, route and execute under the institution&rsquo;s
                own rules. The credit decision is a higher-order act — and the{' '}
                <span className="text-cyan">safe AI underwriter</span> that will make it is{' '}
                <span className="text-ink">the direction we are building</span>, on this same
                validated foundation.
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- Impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">
                Safety written once, inherited everywhere.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Build on a vocabulary that is{' '}
                <span className="text-mint">validated, metered and logged at the root</span>, and
                every co-worker you compose is accountable from its first action. Next, the
                co-workers that put the vocabulary to work.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}

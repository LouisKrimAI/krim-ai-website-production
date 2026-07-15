/**
 * /architecture — the engineer-facing page (GEO-strong, standalone shell).
 * Answer-first: the whole lending stack, or a layer on yours — run it all on
 * KrimOS, or keep your systems and let it layer on top. Then the runtime (eight
 * Kendra modules), the substrate (memory, durable orchestration, the shared
 * domain model), the integration fabric, and one architecture, sovereign in every
 * market. Glass + type only, no devices.
 * Facts: docs/krim-content.md (Inside Kendra · technical depth · integration fabric).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import CinematicBand from '@/components/CinematicBand'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'How KrimOS is built: a complete operating system for lending you can run end to end, or layer onto the systems you keep. Eight Kendra runtime modules (Core, Karya, Fabric, Govern, Nyāya, Learn, Ledger, Sense), a shared substrate of memory tiers, durable orchestration and a 15-entity domain model, a 40+ connector integration fabric, and one architecture that runs sovereign in every market.',
  alternates: { canonical: 'https://www.krim.ai/architecture' },
  openGraph: {
    title: 'Architecture — KrimOS',
    description:
      'How KrimOS is built: a complete operating system for lending you can run end to end, or layer onto the systems you keep. Eight Kendra runtime modules (Core, Karya, Fabric, Govern, Nyāya, Learn, Ledger, Sense), a shared substrate of memory tiers, durable orchestration and a 15-entity domain model, a 40+ connector integration fabric, and one architecture that runs sovereign in every market.',
    url: 'https://www.krim.ai/architecture',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Architecture', item: 'https://www.krim.ai/architecture' },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does KrimOS replace our core banking, LOS or CRM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your choice. KrimOS is a complete lending stack of its own — origination, underwriting, servicing and collections — so you can run the operation on it end to end. Or keep the systems you have: KrimOS layers on top, reading from them and writing back on validated channels, so you can start with nothing to tear out and run as much on KrimOS as you choose.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does KrimOS connect to our existing stack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Through an integration fabric of 40+ connectors across core banking, loan origination and servicing, CRM, telephony, messaging, payments, credit bureaus and document management. It is event-driven (webhooks and streaming) where systems allow, with batch and polling fallback for legacy systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the same architecture run in every market?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. One architecture runs in every market; only Krim-Fabric’s per-jurisdiction rule set changes. Each region runs sovereign within its own perimeter, and a lender adopting KrimOS in any market inherits the same runtime, audit trail and governance with the jurisdiction’s law already encoded.',
      },
    },
  ],
}

// The eight Kendra runtime modules. `role`/`body` is the technical job; `impact` is
// why that part is useful to the institution. Facts: docs/krim-content.md · Inside Kendra.
// `impact` stays claim-safe — validation, the record and the learning curve framed as
// benefits, never a "guarantee" or an absolutist promise.
const MODULES = [
  {
    name: 'Krim-Core',
    role: 'Orchestration',
    body: 'Routes each request to the right co-worker and drives the workflow to completion, with retries, fallbacks and human-in-the-loop built in.',
    impact: 'Work lands with the right co-worker and runs to the end, even when a system drops mid-flow.',
  },
  {
    name: 'Krim-Karya',
    role: 'Scheduler',
    body: 'Owns when work runs: timed tasks, deadlines and contact-hour windows, so every action fires only when it’s allowed.',
    impact: 'Nothing fires outside contact hours or ahead of a deadline, with no one watching the clock.',
  },
  {
    name: 'Krim-Fabric',
    role: 'Knowledge base',
    body: 'Each market’s rules, your own policies and the shared pattern library, in one place every co-worker reads from.',
    impact: 'Every co-worker reads one current rulebook, so the floor never acts on a stale copy.',
  },
  {
    name: 'Krim-Govern',
    role: 'Policy engine',
    body: 'A seven-level policy hierarchy of law, regulator guidance, house rules and guardrails, enforced per tenant.',
    impact: 'When a rule changes, every co-worker inherits it at once, with no release cycle in between.',
  },
  {
    name: 'Krim-Nyāya',
    role: 'Validator',
    body: 'A pre-execution pipeline of 33 validators that gates every action before it fires.',
    impact: 'An action that can’t clear policy is stopped before it fires, and sent to a person with the rule that caught it.',
  },
  {
    name: 'Krim-Learn',
    role: 'Learning',
    body: 'Ten learning loops that turn recorded outcomes into sharper decisions across the workforce.',
    impact: 'The operation reads its own outcomes, so by its second year it runs materially sharper than the day it went live.',
  },
  {
    name: 'Krim-Ledger',
    role: 'Metered record',
    body: 'Logs every action immutably and meters it in Krim Work Units, serving audit and billing from one source.',
    impact: 'Every action is provable from one record, so an inspection answer is assembled in minutes.',
  },
  {
    name: 'Krim-Sense',
    role: 'Telemetry',
    body: 'Metrics, logs and alerts across the stack, feeding Kupa and monitoring.',
    impact: 'A stall, a spike or a drift surfaces while you can still act on it.',
  },
]

// The shared substrate beneath the modules (docs/krim-content.md · technical depth).
const SUBSTRATE = [
  {
    title: 'Shared memory',
    body: (
      <>
        Four tiers (<span className="text-ink">working, short-term, long-term, episodic</span>),
        shared across the workforce, so a pattern one co-worker learns is available to the rest
        without retraining.
      </>
    ),
  },
  {
    title: 'Durable orchestration',
    body: (
      <>
        Long-running workflows run on Temporal-class orchestration in Krim-Core,{' '}
        <span className="text-ink">durable across crashes and deploys</span>, with automatic
        retries, saga-pattern rollbacks, event sourcing and deterministic replay for incident
        investigation.
      </>
    ),
  },
  {
    title: 'Shared domain model',
    body: (
      <>
        One model of <span className="text-ink">15 core entities</span>: Tenant, Account,
        Borrower, Loan, Interaction, Decision, PaymentPlan, Policy, ComplianceEvent, AuditLog and
        more. It is the common language every co-worker reads from and writes to.
      </>
    ),
  },
]

export default function ArchitecturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: answer-first — the whole stack, or a layer on yours ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Architecture</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                One runtime, under every action.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Run the <span className="text-ink">whole lending stack on KrimOS</span>, or layer it
                onto the systems you keep — origination to collections, every action validated.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See how validation works
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- Cinematic band: the runtime under the whole operation ---- */}
        <CinematicBand
          src="/images/cinematic/architecture-lattice.webp"
          alt="An endless teal lattice of interconnected nodes, the runtime under a whole lending operation."
          objectPosition="50% 50%"
          tint="cyan"
          eyebrow="The runtime"
          caption="Run the whole stack, or layer onto yours."
        />

        {/* ---- 2 · The runtime — the eight Kendra modules ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Module by module</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The machinery, and why each one earns its place.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The runtime layer is named <span className="text-ink">Kendra</span>. It is realised as
              eight engineering modules. Each does one job, and together they are why validated AI
              can act in regulated work.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {m.role}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">{m.name}</h3>
                  <p className="mb-6 mt-3 font-sans text-body text-ink-2">{m.body}</p>
                  <div className="mt-auto border-t border-soft pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint/80">
                      Why it matters
                    </p>
                    <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink">{m.impact}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · The substrate — memory, orchestration, the domain model ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The substrate</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              What the co-workers stand on.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Beneath the modules sits a shared substrate: the memory the workforce thinks with, the
              orchestration that keeps long work durable, and the single domain model they all speak.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SUBSTRATE.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{s.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · The integration fabric — reads from your systems, writes back validated ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The integration fabric</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  It fits the stack you already run.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  <span className="text-ink">40+ connectors</span> span core banking, loan
                  origination and servicing, CRM, telephony, messaging, payments, credit bureaus and
                  document management. Event-driven where systems allow, with batch and polling
                  fallback for legacy. One common behaviour handles auth, field mapping, retries,
                  sync and observability.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  When you keep your existing systems, they stay the source of truth and{' '}
                  <span className="text-mint">KrimOS writes back only on validated channels</span>.
                  When KrimOS is the stack, the same gate holds and the source of truth is its own
                  immutable record.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Two paths in
                </p>
                <ul className="mt-6 space-y-5 font-sans text-body text-ink-2">
                  <li className="flex items-baseline gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-cyan" />
                    <span>
                      <span className="text-ink">Event + stream</span>: webhooks and streaming for
                      systems that emit changes in real time.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-cyan" />
                    <span>
                      <span className="text-ink">Batch + poll</span>: scheduled extracts and polling
                      for legacy systems that don&rsquo;t.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-mint" />
                    <span>
                      <span className="text-mint">Validated write-back</span>: nothing returns to
                      your systems until it has cleared the gate.
                    </span>
                  </li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · One architecture, every market ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>One architecture, every geography</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The same runtime, sovereign in every market.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              KrimOS runs the same architecture in every market it serves.{' '}
              <span className="text-ink">Only Krim-Fabric&rsquo;s rule set changes</span>. Each
              region runs self-contained behind its own walls, the local law already loaded, so one
              runtime, audit trail and governance carry from market to market unchanged.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <CTA href="/trust" variant="secondary">
                See the frameworks encoded per market
              </CTA>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · FAQ — real Q&As (mirrors FAQPage JSON-LD) ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
                What engineers ask first.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-5">
              {[
                {
                  q: 'Does KrimOS replace our core banking, LOS or CRM?',
                  a: (
                    <>
                      Your choice. KrimOS is a complete lending stack of its own — origination,
                      underwriting, servicing and collections — so you can run the operation on it
                      end to end. Or keep the systems you have: KrimOS layers on top, reading from
                      them and <span className="text-mint">writing back only on validated channels</span>,
                      so you can start with <span className="text-ink">nothing to tear out</span> and
                      run as much on KrimOS as you choose.
                    </>
                  ),
                },
                {
                  q: 'How does KrimOS connect to our existing stack?',
                  a: (
                    <>
                      Through an integration fabric of <span className="text-ink">40+ connectors</span>{' '}
                      across core banking, origination and servicing, CRM, telephony, messaging,
                      payments, credit bureaus and document management. It is event-driven where systems
                      allow, with batch and polling fallback for legacy.
                    </>
                  ),
                },
                {
                  q: 'Does the same architecture run in every market?',
                  a: (
                    <>
                      Yes. One architecture runs in every market; only{' '}
                      <span className="text-ink">Krim-Fabric&rsquo;s per-jurisdiction rule set</span>{' '}
                      changes. Each region runs sovereign within its own perimeter, with the
                      jurisdiction&rsquo;s law already encoded.
                    </>
                  ),
                },
              ].map((item, i) => (
                <Reveal key={item.q} delay={i * 0.06}>
                  <div className="glass p-7 md:p-8">
                    <h3 className="font-serif text-[1.25rem] leading-snug text-ink">{item.q}</h3>
                    <p className="mt-3 font-sans text-body text-ink-2">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it slot into your architecture.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                A two-week technical deep-dive covers architecture, security and integration, then a
                scoped pilot follows on ring-fenced data.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/krimos" variant="secondary">
                  Explore KrimOS
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

/**
 * /architecture — the engineer-facing page (GEO-strong, standalone shell).
 * Answer-first: KrimOS is the decision layer your systems report into — no rip,
 * no replace. Then the runtime (seven Kendra modules), the substrate (memory,
 * durable orchestration, the shared domain model), the integration fabric, and
 * one architecture across three geographies. Glass + type only — no devices.
 * Facts: docs/krim-content.md (Inside Kendra · technical depth · integration fabric).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'How KrimOS is built: the decision layer your existing systems report into. Seven Kendra runtime modules (Core, Fabric, Govern, Nyāya, Learn, Ledger, Sense), a shared substrate of memory tiers, durable orchestration and a 15-entity domain model, a 40+ connector integration fabric, and one architecture across three sovereign geographies.',
  alternates: { canonical: 'https://krim.ai/architecture' },
  openGraph: { title: 'Architecture — KrimOS', url: 'https://krim.ai/architecture' },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Architecture', item: 'https://krim.ai/architecture' },
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
        text: 'No. KrimOS is the decision layer your existing systems report into. Your systems stay canonical; KrimOS reads from them and writes back only on validated channels. Nothing to tear out, nothing to migrate.',
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
      name: 'Does the same architecture run in the US, UK and India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. One architecture runs in every market; only Krim-Fabric’s per-jurisdiction rule set changes. Each region runs sovereign within its own perimeter, and a lender adopting KrimOS in any market inherits the same runtime, audit trail and governance with the jurisdiction’s law already encoded.',
      },
    },
  ],
}

// The seven Kendra runtime modules — one crisp line each (docs/krim-content.md · Inside Kendra).
const MODULES = [
  {
    name: 'Krim-Core',
    role: 'Orchestration',
    body: 'Routes each request to the right co-worker; runs sequential, parallel and hierarchical workflows; manages context, retries, fallbacks and human-in-the-loop; emits events.',
  },
  {
    name: 'Krim-Fabric',
    role: 'Knowledge base',
    body: 'The per-jurisdiction regulatory calendar and rule set, the anonymised cross-tenant pattern library, and each tenant’s own policies and product rules.',
  },
  {
    name: 'Krim-Govern',
    role: 'Policy engine',
    body: 'A seven-level policy hierarchy encoding law, regulator guidance, internal rules and operational guardrails — enforced per tenant.',
  },
  {
    name: 'Krim-Nyāya',
    role: 'Validator',
    body: 'The staged pre-execution pipeline of 33 validators across three Navya-Nyāya families that gates every action before it fires.',
  },
  {
    name: 'Krim-Learn',
    role: 'Learning orchestrator',
    body: 'Coordinates ten learning loops — outcome feedback, error and pattern analysis, temporal and semantic learning — across the workforce.',
  },
  {
    name: 'Krim-Ledger',
    role: 'Metered record',
    body: 'Logs every action immutably and meters it in Krim Work Units — serving the audit trail and usage-based billing from one source.',
  },
  {
    name: 'Krim-Sense',
    role: 'Telemetry',
    body: 'Metrics, logs, alerts and dashboards across the stack, feeding Kupa and internal monitoring.',
  },
]

// The shared substrate beneath the modules (docs/krim-content.md · technical depth).
const SUBSTRATE = [
  {
    title: 'Shared memory',
    body: (
      <>
        Four tiers — <span className="text-ink">working, short-term, long-term, episodic</span> —
        shared across the workforce, so a pattern one co-worker learns is available to the rest
        without retraining.
      </>
    ),
  },
  {
    title: 'Durable orchestration',
    body: (
      <>
        Long-running workflows run on Temporal-class orchestration in Krim-Core —
        <span className="text-ink"> durable across crashes and deploys</span>, with automatic
        retries, saga-pattern rollbacks, event sourcing and deterministic replay for incident
        investigation.
      </>
    ),
  },
  {
    title: 'Shared domain model',
    body: (
      <>
        One model of <span className="text-ink">15 core entities</span> — Tenant, Account,
        Borrower, Loan, Interaction, Decision, PaymentPlan, Policy, ComplianceEvent, AuditLog and
        more — the common language every co-worker reads from and writes to.
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
        {/* ---- 1 · Hero: answer-first — the decision layer your systems report into ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Architecture</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The decision layer your stack reports into.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                KrimOS does not replace your core banking, origination or servicing systems — it sits
                above them. Your systems stay canonical;{' '}
                <span className="text-mint">KrimOS reads from them and writes back only on
                validated channels</span>. AI co-workers do the work inside your own perimeter, and{' '}
                <span className="text-cyan">every action they propose is validated before it
                fires</span>. Nothing to tear out, nothing to migrate.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform/kendra" variant="secondary">
                  See how validation works
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The runtime — the seven Kendra modules ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Inside the runtime</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Seven modules make the guarantees hold.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The runtime layer is named <span className="text-ink">Kendra</span>. It is realised as
              seven engineering modules — each does one job, and together they are why validated AI
              can act in regulated work.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {m.role}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">{m.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{m.body}</p>
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
              Beneath the modules sits a shared substrate — the memory the workforce thinks with, the
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
                  fallback for legacy — and one common behaviour for auth, field mapping, retries,
                  sync and observability.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  Your systems remain the source of truth.{' '}
                  <span className="text-mint">KrimOS writes back only on validated channels</span>.
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
                      <span className="text-ink">Event + stream</span> — webhooks and streaming for
                      systems that emit changes in real time.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-cyan" />
                    <span>
                      <span className="text-ink">Batch + poll</span> — scheduled extracts and polling
                      for legacy systems that don&rsquo;t.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-mint" />
                    <span>
                      <span className="text-mint">Validated write-back</span> — nothing returns to
                      your systems until it has cleared the gate.
                    </span>
                  </li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · One architecture, three geographies ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>One architecture, three geographies</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The same runtime, sovereign in every market.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              KrimOS runs the same architecture in the US, UK and India —{' '}
              <span className="text-ink">only Krim-Fabric&rsquo;s rule set changes</span>. Each
              region runs self-contained behind its own walls, the local law already loaded, so one
              runtime, audit trail and governance carry from market to market unchanged.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                region: 'United States',
                body: 'FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA and CFPB encoded in Krim-Fabric.',
              },
              {
                region: 'United Kingdom',
                body: 'FCA Consumer Duty, the CONC sourcebook and the Consumer Credit Act encoded in Krim-Fabric.',
              },
              {
                region: 'India',
                body: 'RBI circulars and the Fair Practices Code encoded in Krim-Fabric.',
              },
            ].map((g, i) => (
              <Reveal key={g.region} delay={i * 0.08}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{g.region}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                      No. KrimOS is the decision layer your existing systems report into. Your
                      systems stay canonical; KrimOS reads from them and{' '}
                      <span className="text-mint">writes back only on validated channels</span>.
                      Nothing to tear out, nothing to migrate.
                    </>
                  ),
                },
                {
                  q: 'How does KrimOS connect to our existing stack?',
                  a: (
                    <>
                      Through an integration fabric of <span className="text-ink">40+ connectors</span>{' '}
                      across core banking, origination and servicing, CRM, telephony, messaging,
                      payments, credit bureaus and document management — event-driven where systems
                      allow, with batch and polling fallback for legacy.
                    </>
                  ),
                },
                {
                  q: 'Does the same architecture run in the US, UK and India?',
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
                See it on the stack you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                A two-week technical deep-dive covers architecture, security and integration — then a
                scoped pilot on ring-fenced data.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
                  Explore the platform
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

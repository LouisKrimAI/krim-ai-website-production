/**
 * /lending — the flagship domain page. Facts: docs/krim-content.md.
 *
 * Standalone shell (NOT a LayerShell): SiteHeader · OrbBackdrop · main · SiteFooter,
 * to the HOUSE-STYLE bar (docs/HOUSE-STYLE.md). Server component — all substance in
 * the rendered HTML, no hand-built devices. Calm glass + type only: shared Reveal,
 * `glass lume` cards with the 3px accent bar, GlassCard callouts, tasteful inline
 * highlighting (mint = validated/proof · cyan = thinking/proposed · ink = emphasis).
 *
 * Rhythm: hero → the problem → the lifecycle → compliance by jurisdiction →
 * impact + the learning curve → deployment → close.
 *
 * DIRECTION (krim-content.md): Karta do operational decisioning TODAY; the credit
 * decision stays with the institution for now. The full lending stack — a safe AI
 * underwriter included — is the build direction, via the World Lending Model.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import JurisdictionTabs from '@/components/trust/JurisdictionTabs'
import { JURISDICTIONS } from '@/lib/jurisdictions'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const DEMO = '/contact'

export const metadata: Metadata = {
  title: 'Lending',
  description:
    'KrimOS runs the whole loan lifecycle: every customer conversation and every back-office task on one system that validates each action before it executes, and learns the operation as it runs. Built against RBI, FCA and US lending law by construction.',
  alternates: { canonical: 'https://krim.ai/lending' },
  openGraph: {
    title: 'Lending — Krim',
    description:
      'KrimOS runs the whole loan lifecycle: every customer conversation and every back-office task on one system that validates each action before it executes, and learns the operation as it runs. Built against RBI, FCA and US lending law by construction.',
    url: 'https://krim.ai/lending',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Lending', item: 'https://krim.ai/lending' },
  ],
}

// ---------------------------------------------------------------- content

// The whole loan, both sides of the wall — krim-content.md · lifecycle table.
const LIFECYCLE = [
  {
    stage: 'Sourcing & onboarding',
    customer: 'Engages, qualifies and guides the application.',
    back: 'Lead scoring, KYC and document processing.',
  },
  {
    stage: 'Underwriting & decision',
    customer: 'Collects what is missing, sets expectations.',
    back: 'Credit-analysis support, policy checks and sanction prep. The decision stays yours.',
  },
  {
    stage: 'Disbursal',
    customer: 'Walks the borrower through the agreement and confirmation.',
    back: 'Agreement generation, compliance checks and disbursal ops.',
  },
  {
    stage: 'Servicing',
    customer: 'Payments, queries and statements, one advisor, always on.',
    back: 'Account maintenance, reconciliation and monitoring.',
  },
  {
    stage: 'Collections & hardship',
    customer: 'Reminders and plans, hardship handled with care.',
    back: 'Risk segmentation, early warning and escalation.',
  },
  {
    stage: 'Closure & re-engagement',
    customer: 'Payoff, the NOC, the next product conversation.',
    back: 'Settlement, reporting and portfolio learning.',
  },
]

// Encoded jurisdictions live in lib/jurisdictions.ts (the five-market set), shared
// with the Trust page through components/trust/JurisdictionTabs.

// A plain claim first, then the figure that quantifies it, with a unit caption that
// names what the number measures (the previous version left the buyer to guess).
// Ranges, against the institution's own baseline (krim-content.md · proof) —
// illustrative, not promised.
const IMPACT = [
  { area: 'Origination', claim: 'More documents cleared per analyst', value: '5–10×', unit: 'throughput per FTE' },
  { area: 'Servicing', claim: 'Handled without a human', value: '40–70%', unit: 'of routine requests' },
  { area: 'Collections', claim: 'Lower early roll-rate', value: '1–3 pp', unit: 'reduction (1–30 DPD)' },
  { area: 'Compliance', claim: 'Faster to audit-ready reporting', value: 'Minutes', unit: 'down from days' },
]

// Three modes, one architecture — krim-content.md · sovereignty & deployment.
const DEPLOYMENTS = [
  {
    name: 'Sovereign on-prem',
    body: 'The full stack inside your own data centre. Model, data and every action stay behind walls you already trust.',
  },
  {
    name: 'Hybrid',
    body: 'Data and inference on-prem; orchestration and updates from Krim cloud. A line drawn where your regulator wants it.',
  },
  {
    name: 'Managed',
    body: 'Run for you in your preferred sovereign cloud region, kept in-jurisdiction.',
  },
]

export default function LendingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ════════════════════ 1 · Hero ════════════════════ */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Lending</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Run the <span className="text-grad">whole loan lifecycle</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Every customer conversation and every back-office task, application to payoff, on one
                system that <span className="text-mint">validates each action before it fires</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                <CTA href={DEMO}>Book a demo</CTA>
                <CTA href="/krimos" variant="secondary">
                  See how KrimOS works
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 2 · The problem ════════════════════ */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">Why lending stalls</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  The work is manual because the AI couldn&rsquo;t be proven.
                </h2>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Lending runs on two workforces, the people who speak to customers and the people
                  who keep the books, held apart by tickets, spreadsheets and hand-offs. Together
                  they are <span className="text-ink">40–60% of what every loan costs</span>. AI
                  could close the gap, but a regulated action you can&rsquo;t explain is a risk no
                  lender will take. So the work stays manual.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  KrimOS gates every action before it fires, so the work you couldn&rsquo;t trust
                  to software becomes work you can.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Validated, not audited after the fact
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 3 · The lifecycle ════════════════════ */}
        <Section id="lifecycle" hairline>
          <Reveal>
            <Eyebrow tone="cyan">End to end</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Both sides of the wall, on one system.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              <span className="text-cyan">Kira</span> meets the customer on every channel;{' '}
              <span className="text-mint">Karta</span> co-workers do the back-office work. They meet
              at every stage, and each action passes the validation gate before it executes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LIFECYCLE.map((s, i) => (
              <Reveal key={s.stage} delay={(i % 3) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{s.stage}</h3>
                  <dl className="mt-5 grid gap-4">
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cyan">
                        Kira · customer
                      </dt>
                      <dd className="mt-1.5 font-sans text-[14px] leading-relaxed text-ink-2">
                        {s.customer}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-mint">
                        Karta · back office
                      </dt>
                      <dd className="mt-1.5 font-sans text-[14px] leading-relaxed text-ink-2">
                        {s.back}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-9 max-w-[64ch] font-sans text-[14px] leading-relaxed text-ink-3">
              Today the line is clear: Karta segment risk, suggest the next best action and gate on
              your own flags. The <span className="text-ink-2">credit decision stays yours</span>.
              The safe AI underwriter we are building, the World Lending Model, is the direction,
              and it will clear the same validation gate as every action that runs today.
            </p>
          </Reveal>
        </Section>

        {/* ════════════════════ 4 · Compliance by jurisdiction ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Compliance, built in</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Your jurisdiction&rsquo;s law, applied before each action.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              The same architecture runs in every market. Only the rulebook changes. Each action
              is checked against the law where you lend{' '}
              <span className="text-mint">before it executes</span>, not after.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <JurisdictionTabs items={JURISDICTIONS} />
          </Reveal>
        </Section>

        {/* ════════════════════ 5 · Impact ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="mint">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Measured against your own baseline.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Illustrative ranges. Your real numbers come from{' '}
              <span className="text-ink">your own operation</span>.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((it, i) => (
              <Reveal key={it.area} delay={(i % 4) * 0.07}>
                <div className="glass flex h-full flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    {it.area}
                  </p>
                  <p className="mt-4 flex-1 font-serif text-[1.3rem] leading-snug text-ink">
                    {it.claim}
                  </p>
                  <div className="mt-5">
                    <p className="font-serif text-[clamp(1.9rem,3vw,2.4rem)] leading-none text-mint">
                      {it.value}
                    </p>
                    <p className="mt-1.5 font-sans text-[13px] leading-snug text-ink-3">
                      {it.unit}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <GlassCard className="mt-5 flex flex-col gap-3 p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-[54ch] font-sans text-[clamp(1.2rem,1.9vw,1.45rem)] leading-relaxed text-ink-2">
                It sharpens the longer it runs. The first quarter sets your baseline,{' '}
                <span className="text-mint">gains show by Q2</span>, and by year two it is materially
                ahead of go-live.
              </p>
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                The learning curve
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ════════════════════ 6 · Deployment ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>How it runs</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Sovereign by construction, wherever you run it.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Three deployments, one architecture. Your data and your regulator decide which.
              Whichever you pick, everything stays inside the perimeter you draw, with{' '}
              <span className="text-ink">no foreign model in the loop</span>.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DEPLOYMENTS.map((d, i) => (
              <Reveal key={d.name} delay={0.05 * i}>
                <GlassCard hover className="flex h-full flex-col p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    Deployment
                  </p>
                  <h3 className="mt-3 font-serif text-[1.45rem] leading-tight text-ink">{d.name}</h3>
                  <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2">{d.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 7 · Close ════════════════════ */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The loan book that pays for itself.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Every conversation handled, every action proven, every outcome compounding into the
                next. <span className="text-mint">More borrowers reached, more loans closed, and a
                cost line that finally stops growing with the book.</span>
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

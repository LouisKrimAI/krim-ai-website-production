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
 * HARD RULE (krim-content.md): Karta do operational decisioning and NEVER
 * underwrite — they never approve, deny or price loans, and never override the
 * institution's own credit/risk engines.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const DEMO = '/contact'

export const metadata: Metadata = {
  title: 'Lending',
  description:
    'KrimOS runs the whole loan lifecycle — every customer conversation and every back-office task on one system that validates each action before it executes, and learns the operation as it runs. Built against RBI, FCA and US lending law by construction.',
  alternates: { canonical: 'https://krim.ai/lending' },
  openGraph: { title: 'Lending — Krim', url: 'https://krim.ai/lending' },
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
    back: 'Credit-analysis support, policy checks and sanction prep — the decision stays yours.',
  },
  {
    stage: 'Disbursal',
    customer: 'Walks the borrower through the agreement and confirmation.',
    back: 'Agreement generation, compliance checks and disbursal ops.',
  },
  {
    stage: 'Servicing',
    customer: 'Payments, queries and statements — one advisor, always on.',
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

// Sectoral frameworks encoded in Krim-Fabric — krim-content.md · trust & deployment.
const JURISDICTIONS = [
  {
    place: 'India',
    frameworks: ['RBI circulars', 'Fair Practices Code', 'DPDP'],
  },
  {
    place: 'United Kingdom',
    frameworks: ['FCA Consumer Duty', 'CONC sourcebook', 'Consumer Credit Act', 'UK GDPR'],
  },
  {
    place: 'United States',
    frameworks: ['FDCPA', 'TCPA', 'Reg F', 'FCRA', 'SCRA', 'ECOA'],
  },
]

// Ranges, against the institution's own baseline — krim-content.md · proof.
const IMPACT = [
  { area: 'Origination', value: '5–10×', note: 'document throughput per analyst · days to hours on onboarding' },
  { area: 'Servicing', value: '40–70%', note: 'self-serve resolution · 30–50% lower assisted handling time' },
  { area: 'Collections', value: '1–3 pp', note: 'lower DPD 1–30 roll-rate · 25–40% more right-party contact' },
  { area: 'Compliance', value: 'Minutes', note: 'audit-ready reporting · 100% of regulated actions pre-validated' },
]

// Three modes, one architecture — krim-content.md · sovereignty & deployment.
const DEPLOYMENTS = [
  {
    name: 'Sovereign on-prem',
    body: 'The full stack inside your own data centre — model, data and every action stay behind walls you already trust. The default for Tier-1 banks.',
  },
  {
    name: 'Hybrid',
    body: 'Data and inference on-prem; orchestration and updates from Krim cloud. A line drawn where your regulator wants it.',
  },
  {
    name: 'Managed',
    body: 'Run for you in your preferred sovereign cloud region — no foreign API anywhere in the loop.',
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
                Run the whole loan lifecycle.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                Both sides of the wall — every customer conversation and every back-office task,
                application to payoff — on{' '}
                <span className="text-ink">one system</span> that{' '}
                <span className="text-mint">validates each action</span> before it fires and{' '}
                <span className="text-cyan">learns the operation</span> as it runs.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                <CTA href={DEMO}>Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
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
                  Lending runs on two workforces — the people who speak to customers and the people
                  who keep the books — held apart by tickets, spreadsheets and hand-offs. Together
                  they are <span className="text-ink">40–60% of what every loan costs</span>. AI
                  could close the gap, but a regulated action you can&rsquo;t explain is a risk no
                  lender will take. So the work stays manual.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  KrimOS gates every action before it fires — so the work you couldn&rsquo;t trust
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
              at every stage — and each action passes the validation gate before it executes.
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
              A hard line holds throughout: Karta segment risk, suggest the next best action and
              gate on your own flags — they <span className="text-ink-2">never approve, deny or
              price a loan</span>, and never override your credit and risk engines. Underwriting
              authority stays where the regulator expects it.
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
              The same architecture runs in every market — only the rulebook changes. Each action
              is checked against the law where you lend{' '}
              <span className="text-mint">before it executes</span>, not after.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {JURISDICTIONS.map((j, i) => (
              <Reveal key={j.place} delay={0.06 * i}>
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[1.5rem] leading-none text-ink">{j.place}</h3>
                    <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mint">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mint" />
                      Pre-validated
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {j.frameworks.map((f) => (
                      <li
                        key={f}
                        className="rounded-lg border border-[rgba(0,255,178,0.22)] bg-[rgba(0,255,178,0.05)] px-3 py-1.5 font-mono text-[12px] tracking-[0.02em] text-ink"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 5 · Impact ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="mint">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Measured against your own baseline.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Ranges, not commitments — calibrated to your deployment and{' '}
              <span className="text-ink">proven on your data in a 30-day pilot</span> before
              anything goes live.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((it, i) => (
              <Reveal key={it.area} delay={(i % 4) * 0.07}>
                <div className="glass flex h-full flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    {it.area}
                  </p>
                  <p className="mt-3 font-serif text-[clamp(2.1rem,3.4vw,2.7rem)] leading-none text-mint">
                    {it.value}
                  </p>
                  <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-ink-2">
                    {it.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <GlassCard className="mt-5 flex flex-col gap-3 p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-[52ch] font-sans text-body text-ink-2">
                And it improves with use: a first-quarter baseline,{' '}
                <span className="text-mint">measurable gains by Q2</span>, and materially better
                than go-live by year two — from the runtime, not from more engineering.
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
              Three deployments, one architecture — your data and your regulator decide which.
              Whichever you pick, everything stays inside the perimeter you draw, with{' '}
              <span className="text-ink">no foreign API in the loop</span>.
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
                See it run a loan, end to end.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                One conversation, one validated action, one clean trail — application to payoff, on
                the stack you already run.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO}>Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
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

/**
 * /enterprise — the Large Enterprise domain, rebuilt to the house standard
 * (docs/HOUSE-STYLE.md). Content-first and concise: calm glass + confident
 * type, no hero image, no hand-built devices (§7). Standalone shell —
 * SiteHeader · OrbBackdrop · main · SiteFooter — matching app/platform/page.tsx.
 *
 * Audience: large regulated enterprises running customer and back-office
 * operations at scale — insurers, telecoms, utilities, healthcare payers,
 * large financial groups. Sectors framed as a LOGICAL fit, never as claimed
 * customers; every claim traces to docs/krim-content.md.
 *
 * Rhythm: hero → who it's for → the challenge → why Krim fits → use cases →
 * impact → deployment → close.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const DEMO = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export const metadata: Metadata = {
  title: 'Large Enterprise',
  description:
    'One operating system over your whole estate: KrimOS automates regulated customer and back-office work at scale — every action validated before it executes, sovereign by construction, across every region and system at once.',
  alternates: { canonical: 'https://krim.ai/enterprise' },
  openGraph: {
    title: 'Large Enterprise — KrimOS',
    url: 'https://krim.ai/enterprise',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Large Enterprise',
      item: 'https://krim.ai/enterprise',
    },
  ],
}

// § 2 — sectors where compliance meets volume (logical fit, not claims)
const SECTORS = [
  { name: 'Insurers', body: 'Policy servicing, renewals and claims correspondence under conduct rules.' },
  { name: 'Telecoms', body: 'High-volume billing, collections and customer support across regions.' },
  { name: 'Utilities', body: 'Metered accounts, arrears and statutory notices at national scale.' },
  { name: 'Healthcare payers', body: 'Member servicing and claims comms under strict privacy law.' },
  { name: 'Financial groups', body: 'Customer and back-office operations across many regulated lines.' },
]

// § 4 — why Krim fits: one safe layer over everything they run
const FITS = [
  {
    name: 'Safe to automate',
    body: 'Every regulated action is validated against law, policy and context before it executes — so AI can finally act at scale, not just advise.',
  },
  {
    name: 'One stack, many systems',
    body: 'KrimOS sits over the estate you already run, reading from your systems and writing back on validated channels. No rip, no replace.',
  },
  {
    name: 'Sovereign where it matters',
    body: 'Data, model weights and orchestration stay inside your perimeter. No mode requires sensitive records to leave.',
  },
  {
    name: 'Smarter over time',
    body: 'Every outcome feeds the runtime, building a shared model of your operation. Performance lifts across the whole estate — from use, not more engineering.',
  },
]

// § 5 — use cases across customer and back office
const USE_CASES = [
  {
    name: 'Customer servicing',
    body: 'Queries, account changes and support across voice, chat and messaging — routine work self-serves, humans take the hard cases.',
  },
  {
    name: 'Compliant outbound',
    body: 'Collections, renewals and statutory notices — every contact inside consent, contact-window and frequency rules, per jurisdiction.',
  },
  {
    name: 'Back-office processing',
    body: 'Documents, data and reconciliation handled at volume, with explicit inputs and outputs logged by construction.',
  },
  {
    name: 'Disputes & complaints',
    body: 'Logged, tracked and resolved on one thread — each step linked to the policy that applied.',
  },
  {
    name: 'Compliance reporting',
    body: 'Audit packs and regulatory submissions assembled on demand — evidence is complete by construction, not reconstructed after the fact.',
  },
]

// § 7 — deployment: sovereign by construction (docs/krim-content.md · Trust)
const DEPLOYMENTS = [
  {
    name: 'Sovereign on-prem',
    body: 'The full stack inside your own data centre. Nothing leaves the perimeter.',
  },
  {
    name: 'Hybrid',
    body: 'Data and inference on-prem; orchestration and updates from Krim cloud.',
  },
]

export default function EnterprisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="max-w-[780px]">
            <Reveal>
              <Eyebrow tone="dim">Large Enterprise</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Regulated operations, at scale.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                For enterprises running millions of regulated interactions across systems that never
                quite talk to each other — one operating system that automates customer and
                back-office work,{' '}
                <span className="text-ink">safely, everywhere at once</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <CTA href={DEMO}>Book a demo</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Who it's for ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Where compliance meets volume.</h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Any enterprise where regulated customer and back-office work runs at huge volume,
              across regions and systems that don&rsquo;t connect. The fit is the same wherever the
              rules bite hardest:
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.07}>
                <div className="glass lume h-full p-7">
                  <h3 className="font-serif text-[1.3rem] leading-tight text-ink">{s.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · The challenge ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">The challenge</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Scale multiplies every problem.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Dozens of systems, several jurisdictions, thousands of agents — and an audit
                  obligation behind all of it. Generic AI{' '}
                  <span className="text-ink">can&rsquo;t be trusted</span> in regulated
                  communications, and bolting it onto each system one at a time never ends.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <ul className="space-y-5">
                  {[
                    'Fragmented systems that never quite connect',
                    'Multi-jurisdiction compliance, region by region',
                    'The cost of large operations teams',
                    'Audit exposure on every regulated action',
                  ].map((line) => (
                    <li key={line} className="flex items-baseline gap-3 font-sans text-body text-ink-2">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-gold" />
                      {line}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Why Krim fits ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why Krim</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              One safe layer over everything you run.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              KrimOS makes regulated work{' '}
              <span className="text-mint">safe to automate</span> — and ties the whole estate to one
              way of working, one audit trail, one source of truth.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FITS.map((f, i) => (
              <Reveal key={f.name} delay={(i % 4) * 0.07}>
                <GlassCard accent={i === 0} hover className="flex h-full flex-col p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.3rem] leading-tight text-ink">{f.name}</h3>
                  <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-2">{f.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Use cases ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Across customer and back office.</h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The work an enterprise actually carries, at volume — each action validated before it
              executes and logged after.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 3) * 0.07}>
                <div className="glass lume flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[1.3rem] leading-tight text-ink">{u.name}</h3>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-2">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · Impact ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">What changes</Eyebrow>
                <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                  Scale the operation, not the headcount.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  One way of working across regions and systems — lower cost to serve, compliance
                  consistent by construction, and an operation that grows without growing the team in
                  step.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug text-ink">
                  Every regulated action audit-ready, every region on one stack — proof complete by
                  construction, not reassembled three days later.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Lower cost to serve · consistent compliance · scale without headcount
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · Deployment ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Deployment</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Sovereign by construction.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Sovereignty is a commitment, not a deployment option. Run it entirely inside your own
              walls, or split inference from orchestration — the architecture is the same either way.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {DEPLOYMENTS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <GlassCard hover className="flex h-full flex-col p-8">
                  <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{d.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{d.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 8 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it run across your estate.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                Every enterprise has its own systems, regions and rules. Tell us yours.
              </p>
              <div className="mt-9">
                <CTA href={DEMO}>Book a demo</CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

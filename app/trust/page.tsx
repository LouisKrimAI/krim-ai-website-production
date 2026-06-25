/**
 * /trust — sovereignty, security & deployment. Standalone page (not LayerShell):
 * SiteHeader + OrbBackdrop + SiteFooter, homepage design DNA.
 * Shape: answer-first hero (sovereign by construction) → deployment (on-prem
 * hero / hybrid / managed) → security posture → encoded jurisdictions → the
 * audit experience (Krim-Ledger replay) → frameworks & certifications (HONEST,
 * held vs in-progress) → close.
 * Facts: docs/krim-content.md (Trust & security; Krim-Ledger; Krim-Nyāya
 * jurisdictions) + docs/KRIM-BRIEF.md (deployment frame; certs all in-progress).
 * Graphics policy (HOUSE-STYLE §7): clean glass + type only — no devices.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import JurisdictionTabs from '@/components/trust/JurisdictionTabs'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Trust',
  description:
    'KrimOS is sovereign by construction: the full stack runs inside your perimeter — on-prem by default — with end-to-end encryption, granular RBAC, customer-held keys and an immutable, cryptographically sealed audit trail. US, UK and India frameworks are encoded in the runtime and validated before every action.',
  alternates: { canonical: 'https://krim.ai/trust' },
  openGraph: {
    title: 'Trust — sovereignty, security & deployment',
    description:
      'KrimOS is sovereign by construction: the full stack runs inside your perimeter — on-prem by default — with end-to-end encryption, granular RBAC, customer-held keys and an immutable, cryptographically sealed audit trail. US, UK and India frameworks are encoded in the runtime and validated before every action.',
    url: 'https://krim.ai/trust',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Trust', item: 'https://krim.ai/trust' },
  ],
}

// ---- deployment models (krim-content.md · Trust & security; KRIM-BRIEF §30) ----
const DEPLOYMENTS = [
  {
    name: 'Sovereign on-prem',
    note: 'Default · regulated lenders & government',
    body: 'The full stack runs inside your data centre. Data, model weights, orchestration and telemetry stay behind your perimeter — nothing leaves.',
    primary: true,
  },
  {
    name: 'Hybrid',
    note: 'Mid-market',
    body: 'Data and inference stay on-prem; orchestration and updates come from the Krim cloud. The sensitive half never crosses your wall.',
    primary: false,
  },
  {
    name: 'Managed SaaS',
    note: 'Fintechs & pilots',
    body: 'Fully managed inside your preferred sovereign cloud region — the same runtime, the same guarantees, run for you in-jurisdiction.',
    primary: false,
  },
]

// ---- security posture (krim-content.md · Trust & security · Posture) ----
const POSTURE = [
  {
    title: 'Encrypted end to end',
    body: 'Encrypted at rest and in transit across the whole stack — no plaintext gaps.',
  },
  {
    title: 'Granular RBAC',
    body: 'Role-based access on every action, recorded in the trail it governs.',
  },
  {
    title: 'Customer-held keys',
    body: 'You hold the keys — Krim can’t read what you haven’t chosen to share.',
  },
  {
    title: 'PII isolated by tenancy',
    body: 'Records isolated per tenant — no shared pool, no cross-tenant leakage.',
  },
  {
    title: 'Sealed, immutable trail',
    body: 'Every action streams to a sealed, append-only, court-admissible record.',
    accent: true,
  },
]

// ---- encoded jurisdictions (krim-content.md · Krim-Nyāya; Trust footprint) ----
// Order: USA · India · UK — surfaced as tabs.
const JURISDICTIONS = [
  { region: 'United States', short: 'USA', frameworks: ['FDCPA', 'TCPA', 'Reg F', 'FCRA', 'SCRA', 'GLBA', 'ECOA', 'CFPB', 'ACA'] },
  { region: 'India', short: 'India', frameworks: ['RBI circulars', 'Fair Practices Code'] },
  { region: 'United Kingdom', short: 'UK', frameworks: ['FCA Consumer Duty', 'CONC sourcebook', 'Consumer Credit Act', 'UK GDPR'] },
]

// ---- security & compliance standards — architecture designed around these frameworks ----
// Mix of international standards and the Indian banking/data frameworks a security team checks for.
const STANDARDS = [
  { label: 'SOC 2 Type II', kind: 'Information security' },
  { label: 'ISO 27001', kind: 'Information security' },
  { label: 'PCI DSS', kind: 'Payments security' },
  { label: 'RBI Cyber Security Framework', kind: 'Banking security' },
  { label: 'CERT-In', kind: 'Cybersecurity' },
  { label: 'DPDP Act 2023', kind: 'Data protection' },
  { label: 'IT Act 2000', kind: 'Data protection' },
  { label: 'GDPR', kind: 'Data protection' },
  { label: 'EU AI Act', kind: 'AI governance' },
]

export default function TrustPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero — answer-first: sovereign by construction ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Sovereign · compliant · auditable</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Sovereign by construction. Auditable by default.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                KrimOS runs <span className="text-ink">inside your perimeter</span> — on-prem by
                preference, no foreign API in the loop. Customer data, model weights, orchestration
                and telemetry stay behind your wall. <span className="text-mint">Nothing leaves.</span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body text-ink-3">
                Sovereignty is a commitment, not a deployment option.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Deployment — three models, on-prem the hero ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Where it runs</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Your walls are the boundary — three ways to honour them.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              One architecture, three deployments. On-prem is how regulated institutions run it; the
              others exist for those who want them. The guarantees never change.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DEPLOYMENTS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.1}>
                <div className={`glass lume relative h-full p-7 md:p-8 ${d.primary ? 'glass-mint' : ''}`}>
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${d.primary ? 'bg-mint' : 'bg-mint/45'}`}
                  />
                  <h3 className="mt-6 font-serif text-[1.5rem] leading-tight text-ink">{d.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{d.body}</p>
                  {d.primary && (
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                      Default
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Security posture ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The posture</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Security, built into the runtime.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Encryption, access, isolation and a sealed audit trail — the controls a regulated buyer
              checks first, engineered in from the start.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-6">
            {POSTURE.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 0.08}
                className={`lg:col-span-2 ${i === 3 ? 'lg:col-start-2' : ''}`}
              >
                <div className={`glass lume flex h-full flex-col p-7 ${p.accent ? 'glass-mint' : ''}`}>
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${p.accent ? 'bg-mint' : 'bg-mint/45'}`}
                  />
                  <h3 className="mt-6 font-serif text-[1.35rem] leading-tight text-ink">{p.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Encoded jurisdictions — centred headline + USA/India/UK tabs ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>The law, encoded</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                The rules live in the runtime — and gate every action.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Each market&rsquo;s sectoral law is encoded in Krim-Fabric and enforced before an
                action can fire — so a lender in any jurisdiction inherits{' '}
                <span className="text-mint">the rules already in place</span>, updated as they change
                without restarting the runtime.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <JurisdictionTabs items={JURISDICTIONS} />
          </Reveal>
        </Section>

        {/* ---- 5 · The audit experience — Krim-Ledger replay ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow>The audit experience</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Every action, its rule and its verdict — on one record.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Krim-Ledger streams every action, decision, prompt, output and validation to one
                  immutable trail. An auditor can replay any decision deterministically — what
                  happened, the policy that applied, and the{' '}
                  <span className="text-mint">validation result behind it.</span> The record is built
                  as the work runs, so an inspection that once meant days of reconstruction is
                  answered the same afternoon.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  One record carries
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    ['The action', 'what the co-worker did'],
                    ['The rule', 'the policy that applied'],
                    ['The verdict', 'pass · amber · fail'],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-baseline gap-3 font-sans text-body text-ink-2">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-mint" />
                      <span>
                        <span className="text-ink">{k}</span> — {v}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-soft pt-6 font-serif text-[1.15rem] leading-snug text-ink">
                  Pre-execution, not post-audit. The proof is recorded as the work runs.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 6 · Security & compliance standards ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Security standards</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Designed around the standards your security team will recognise.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Our security architecture is designed around the controls and frameworks your security
              and compliance teams will recognise — across information security, data protection and
              AI governance.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STANDARDS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) * 0.07}>
                <div className="glass lume flex h-full items-center gap-4 rounded-lg p-5">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mint/25 bg-mint/[0.05]"
                  >
                    <span className="h-2 w-2 rounded-full bg-mint/70" />
                  </span>
                  <div>
                    <p className="font-serif text-[1.15rem] leading-tight text-ink">{s.label}</p>
                    <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">
                      {s.kind}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-9 max-w-[60ch] text-center font-sans text-body text-ink-3">
              The architecture is built to these frameworks today, with formal certifications in
              progress. Documented and ready for your security team to review.
            </p>
          </Reveal>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[760px] p-10 text-center md:p-14">
              <div className="rounded-lg border border-soft px-6 py-10 md:px-10">
                <h2 className="font-serif text-display-3 leading-tight text-ink">
                  Bring your security team. Bring your regulator.
                </h2>
                <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                  Start with an architecture, security and integration review — and see KrimOS run
                  inside the perimeter you already defend.
                </p>
                <div className="mt-9">
                  <CTA href={DEMO_HREF}>Book a demo</CTA>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

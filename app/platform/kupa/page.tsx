/**
 * /platform/kupa — Kupa, the command center (a core KrimOS layer).
 * The STANDARD layer-page template: content-first, homepage glass, no devices.
 * Shape: what it is (hero) → what it does → who it's for → impact → next.
 * Facts: docs/krim-content.md (Kupa · the command center).
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kupa — the command center',
  description:
    'Kupa is the command center of KrimOS: the glass cockpit where your teams supervise live work, set policy, monitor every co-worker and audit every action — in one place.',
  alternates: { canonical: 'https://krim.ai/platform/kupa' },
  openGraph: {
    title: 'Kupa — the command center',
    description:
      'Kupa is the command center of KrimOS: the glass cockpit where your teams supervise live work, set policy, monitor every co-worker and audit every action — in one place.',
    url: 'https://krim.ai/platform/kupa',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kupa', item: 'https://krim.ai/platform/kupa' },
  ],
}

// the five things Kupa provides (docs/krim-content.md · Kupa)
const CAPABILITIES = [
  {
    title: 'Operational view',
    body: 'Live dashboards and queues across every stage and segment — SLAs, bucket performance, what is moving and what is stuck.',
  },
  {
    title: 'Human-in-the-loop control',
    body: 'Review queues for low-confidence or high-risk decisions, and supervisor sign-off on any change to script or strategy.',
  },
  {
    title: 'Strategy & configuration',
    body: 'Set which co-workers run for which segments — contact windows, frequency caps, channels per jurisdiction, offer libraries and A/B tests.',
  },
  {
    title: 'Monitoring & kill switches',
    body: 'Live volumes, outcomes, error and complaint rates, anomaly alerts — and one-click pause or rollback of any co-worker, campaign or segment.',
  },
  {
    title: 'Audit & investigation',
    body: 'Every interaction linked to the policy that applied, the validation result and the decision — what happened, why, and under which rule.',
  },
]

const ROLES = [
  'Head of Collections',
  'Chief Risk Officer',
  'Head of Compliance',
  'Head of Servicing',
  'Head of Credit Ops',
  'Contact Centre Lead',
]

export default function KupaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kupa">
        {/* ---- Hero: what it is ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Command center</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                The glass cockpit for your operations.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Kupa is where your teams run KrimOS — one place to see every action, set the rules,
                supervise the work and prove what happened. The co-workers do the work; Kupa keeps
                you in control.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- What it does ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>What it does</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              One place to run the whole operation.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Full lifecycle visibility — sales and activation, servicing, collections and
              retention — with the controls to act on what you see.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Who it's for ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Who it&rsquo;s for</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Built for the people who answer for the operation.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Every role meets KrimOS through Kupa — one source of truth across the institution,
                  each view shaped to the job in front of it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {ROLES.map((r) => (
                    <li key={r} className="flex items-baseline gap-3 font-sans text-body text-ink-2">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-mint" />
                      {r}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- Impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">Nothing happens out of view.</h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Every action is supervised, controllable and audit-ready — so the people accountable
                for the operation can always see what ran, why, and under which rule.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}

/**
 * /platform/kupa — Kupa, the command center (a core KrimOS layer).
 * Reworked to earn its own spine: control as four verbs — See · Set · Step in ·
 * Prove — paying off in "nothing happens out of view." Tighter (3 sections), and
 * the roles list is dropped (it duplicated Kula's). Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kupa — the command center',
  description:
    'Kupa is the command center of KrimOS: one pane of glass where your teams see every action, set the rules, step in when it matters, and prove what happened — so nothing runs out of view.',
  alternates: { canonical: 'https://krim.ai/platform/kupa' },
  openGraph: {
    title: 'Kupa — the command center',
    description:
      'Kupa is the command center of KrimOS: one pane of glass where your teams see every action, set the rules, step in when it matters, and prove what happened — so nothing runs out of view.',
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

// Control as four verbs — the page's spine.
const CONTROLS = [
  { verb: 'See', title: 'Everything, live', body: 'Dashboards and queues across every stage and segment — what is moving, what is stuck, every SLA.' },
  { verb: 'Set', title: 'The rules', body: 'Which co-workers run for which segments — contact windows, frequency caps, channels per jurisdiction, offers and tests.' },
  { verb: 'Step in', title: 'Whenever it matters', body: 'Sign-off on low-confidence or high-risk decisions, and one-click pause or rollback of any co-worker, campaign or segment.' },
  { verb: 'Prove', title: 'What happened', body: 'Every interaction linked to the policy that applied, the validation result and the decision — what ran, why, and under which rule.' },
]

export default function KupaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kupa">
        {/* ---- Hero ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Command center</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                Where your teams stay in control.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Kupa is the command center of KrimOS — one pane of glass to see every action, set the
                rules, step in when it matters, and prove what happened. The co-workers act;{' '}
                <span className="text-ink">you hold the controls</span>.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The four controls (the spine) ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>How control works</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              See, set, step in, prove.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Full-lifecycle visibility, with the controls to act on what you see — across sales,
              servicing, collections and retention.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CONTROLS.map((c, i) => (
              <Reveal key={c.verb} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">{c.verb}</p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Close — the payoff ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard accent className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">Nothing happens out of view.</h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Every action supervised, reversible and audit-ready — so the people who answer for the
                operation can always see what ran, why, and under which rule.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}

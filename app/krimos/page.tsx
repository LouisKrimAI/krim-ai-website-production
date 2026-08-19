/**
 * /krimos — the hub. Answers a buyer's questions in order: what it is (hero),
 * what it does (the end-to-end horizon, shared with the homepage), what's
 * inside (the five layers + doorways), who on my team uses it (the roles),
 * why adopt it (impact), then the ask. Concise and punchy — the layer pages
 * carry the depth. Design DNA from docs/HOUSE-STYLE.md; facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PlatformBackdrop from '@/components/PlatformBackdrop'
import Reveal from '@/components/Reveal'
import PlatformLayers from '@/components/home/PlatformLayers'
import LifecycleHorizon from '@/components/home/LifecycleHorizon'
import { LAYERS } from '@/components/krimos/layers'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'KrimOS',
  description:
    'KrimOS is the agent operating system for safe lending operations: AI co-workers that run the whole loan, every action validated before it fires, inside your own perimeter. Built from a validating runtime (Kendra), 500+ credit-native actions (Kriya), the co-workers themselves (Karta), the command center your teams run them from (Kupa & Kula) and the advisor your customers meet (Kira).',
  alternates: { canonical: 'https://www.krim.ai/krimos' },
  openGraph: {
    title: 'KrimOS — the agent operating system for safe lending operations',
    description:
      'AI co-workers that run the whole loan, from first enquiry to final payoff — every action validated before it fires, inside your own perimeter.',
    url: 'https://www.krim.ai/krimos',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://www.krim.ai/krimos' },
  ],
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KrimOS',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Agent operating system for lending',
  operatingSystem: 'Sovereign on-prem, Hybrid, Managed SaaS',
  publisher: { '@type': 'Organization', name: 'Krim', url: 'https://www.krim.ai' },
  description:
    'KrimOS is the agent operating system for safe lending operations: AI co-workers whose every action is validated before it executes, and that learn from every outcome, inside the institution’s own perimeter.',
  featureList: [
    'Pre-execution validation: Krim-Nyāya, 33 validators',
    '500+ validated, credit-native action primitives (Kriya, 20+ domains)',
    'AI co-workers (Karta) that run the lending lifecycle across the contact centre and back office, composed from validated primitives',
    'One runtime that validates every action and learns from every outcome (Kendra)',
    'Natural-language command center for teams (Kupa & Kula) and a customer advisor (Kira)',
    'Immutable, metered audit trail (Krim-Ledger, Krim Work Units)',
    'Sovereign deployment: on-prem, hybrid or managed',
    '40+ connectors; nothing to tear out, nothing to migrate',
    'No-code studios: Agent Studio, Strategy Studio, Kriya Studio, Campaign Builder, Social Studio',
  ],
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://www.krim.ai/krimos' },
}

// Who on your team touches KrimOS, and where they meet it. Answers the buyer's
// "what will I use it for / who uses it" in one glance; the Studios live inside
// the builders' seat rather than in a section of their own (density).
type Role = { who: string; surface: string; body: string; href: string; link: string; tags?: string[] }
const ROLES: Role[] = [
  {
    who: 'Ops & service teams',
    surface: 'Kupa & Kula',
    body: 'Direct the work in plain language and run it from one command center — every co-worker, every queue, in view.',
    href: '/krimos/kupa',
    link: 'Meet the command center',
  },
  {
    who: 'Risk, compliance & audit',
    surface: 'Validated, and on the record',
    body: 'Every action clears the gate before it fires and lands on an immutable trail, so inspections are answered from evidence that is already there.',
    href: '/krimos/kendra',
    link: 'See how it validates',
  },
  {
    who: 'Your builders',
    surface: 'The Studios',
    body: 'Compose co-workers, write decision logic and ship compliant content from no-code studios, all wired to the same validated runtime.',
    href: '/krimos/karta',
    link: 'Build a co-worker',
    tags: ['Agent', 'Strategy', 'Kriya', 'Campaign', 'Social'],
  },
  {
    who: 'Your customers',
    surface: 'Kira, inside Krimkar',
    body: 'One advisor that remembers every conversation, across every channel, in the app your customers already hold.',
    href: '/krimkar',
    link: 'See the customer app',
  },
]

// What adopting KrimOS changes — lending-focused; government is the one extension.
const IMPACTS: [string, string][] = [
  [
    'Automate the work you couldn’t risk before',
    'The highest-consequence operations, kept manual because one mistake is a compliance event, can finally run on AI — because every action is proven before it fires.',
  ],
  [
    'Compliance is built into how the work runs',
    'Validation moves in front of the action and the evidence is complete by construction, so audits and inspections are answered from a record that is already there.',
  ],
  [
    'Cost-to-serve falls as it learns',
    'Every validated outcome makes the next one sharper. The same team handles more, and the operation gets more efficient the longer it runs.',
  ],
  [
    'Serve more people, to the same standard',
    'Lower the cost and risk of running operations at scale and good service reaches further: more customers, more cases, the same accountable bar.',
  ],
]

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <SiteHeader />
      <PlatformBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: what it is, in one breath ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[1000px] text-center">
            <Reveal>
              <Eyebrow>KrimOS</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Agent operating system for{' '}
                <span className="text-grad-carved">safe lending operations</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                AI co-workers run the whole loan. Every action is{' '}
                <span className="text-mint">checked before it fires</span>, and the system gets
                sharper from every outcome it records — all inside your own perimeter.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See how it validates
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · What it does: the whole loan, end to end (shared horizon) ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow>End to end</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                It runs the whole loan, from first enquiry to final payoff.
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
                No stitching point tools together. KrimOS carries every stage as{' '}
                <span className="text-mint">one connected current of work</span>.
              </p>
            </div>
          </Reveal>
          <LifecycleHorizon />
        </Section>

        {/* ---- 3 · What's inside: the five layers + the doorways ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>What&rsquo;s inside</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Five layers. One accountable system.
              </h2>
              <p className="mx-auto mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
                Most AI is a model with a chat box bolted on. KrimOS runs deeper: a runtime under
                every action a co-worker takes, up to the advisor your customers meet. That depth is
                what lets it <span className="text-mint">run regulated work</span>, where a wrong
                move is a compliance event.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 flex justify-center">
              <PlatformLayers />
            </div>
          </Reveal>

          {/* the doorways — one glass cell per layer, now with its one-line role */}
          <Reveal>
            <div className="mt-16 border-t border-soft pt-12">
              <Eyebrow tone="mint">Go deeper, layer by layer</Eyebrow>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {LAYERS.map((l) => (
                  <Link
                    key={l.slug}
                    href={l.href ?? `/krimos/${l.slug}`}
                    aria-label={`${l.name} — ${l.tag}`}
                    className="group lume relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-[rgba(10,12,18,0.72)] p-5 outline-none backdrop-blur-xl transition-colors focus-visible:border-mint focus-visible:shadow-[0_0_0_2px_rgba(0,255,178,0.55),0_14px_64px_-14px_rgba(0,255,178,0.32)] md:px-6 md:py-6"
                  >
                    {/* signature: a mint rail that grows from the left edge on hover/focus */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-mint transition-transform duration-[var(--dur)] ease-[cubic-bezier(0.16,1,0.30,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">{l.tag}</span>
                    <h3 className="mt-1.5 font-serif text-[1.5rem] leading-tight tracking-[-0.01em] text-ink transition-colors duration-fast group-hover:text-mint-bright">
                      {l.name}
                    </h3>
                    <p className="mt-2 font-sans text-caption text-ink-2">{l.oneLiner}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---- 4 · Who runs it: the seats your people work from ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow>Who runs it</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Built for everyone who touches a loan.
              </h2>
              <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Your teams keep the controls, your builders shape the work, and your customers get a
                straight answer — <span className="text-mint">each on the same validated runtime</span>.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {ROLES.map((r, i) => (
              <Reveal key={r.who} delay={(i % 2) * 0.08}>
                <Link
                  href={r.href}
                  className="glass lume group flex h-full flex-col p-7 outline-none focus-visible:border-mint md:p-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint/85">{r.who}</span>
                  <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-mint">
                    {r.surface}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{r.body}</p>
                  {r.tags && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-6 inline-flex items-baseline gap-2 font-sans text-[14.5px] text-mint">
                    <span className="underline-offset-4 group-hover:underline">{r.link}</span>
                    <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Why adopt it: what changes for the business ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow tone="mint">Why adopt KrimOS</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                What changes when machines can finally act.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                The work you kept manual out of caution starts running, costs fall as the system
                learns, and good service reaches more people.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {IMPACTS.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{title}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-[680px]">
              <div className="glass lume p-7 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">Beyond lending</p>
                <p className="mt-3 font-sans text-body text-ink-2">
                  The same engine runs public-sector work too: citizen services that clear faster and
                  stay fully accountable.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it run <span className="text-grad">your lending</span>.
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] font-sans text-body-lg text-ink-2">
                Cheaper to run, faster to serve, and a record a regulator can read on demand.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/lending" variant="secondary">
                  See it in lending
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

/**
 * /msme — the MSME / mid-market domain. Standalone page (its own header /
 * backdrop / footer; not LayerShell), built to docs/HOUSE-STYLE.md: calm,
 * content-first, concise. Glass + type only — no hand-built devices.
 *
 * Framing is CONFIDENCE, not compliance: medium-sized firms in any industry
 * aren't heavily regulated, but still can't afford AI that gets it wrong in
 * front of customers or with money. So they get the regulated giants' rigor —
 * managed and affordable.
 *
 * Facts: docs/krim-content.md (search MSME / mid-market / managed SaaS).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const DEMO_HREF = '/contact'

export const metadata: Metadata = {
  title: 'MSME',
  description:
    'Regulation-grade AI workers, now for everyday operations. Medium-sized enterprises automate customer service and back-office work with automation they can actually trust: fully managed, affordable and fast to deploy.',
  alternates: { canonical: 'https://www.krim.ai/msme' },
  openGraph: {
    title: 'MSME — Krim',
    description:
      'Regulation-grade AI workers, now for everyday operations. Medium-sized enterprises automate customer service and back-office work with automation they can actually trust: fully managed, affordable and fast to deploy.',
    url: 'https://www.krim.ai/msme',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'MSME', item: 'https://www.krim.ai/msme' },
  ],
}

// ---------------------------------------------------------------- content

// section 4 — why Krim fits. The first card is the heart: every action checked
// before it acts — the rigor the regulated giants rely on.
const REASONS = [
  {
    name: 'Automation you can trust',
    body: 'Every action is checked before it acts and kept on the record, the rigor banks and governments rely on, working for you.',
  },
  {
    name: 'Managed, affordable, fast',
    body: 'Fully managed deployment with no infrastructure to stand up. You don’t run it; we do. Enterprise-grade capability at mid-market reach.',
  },
  {
    name: 'Sharper as it works',
    body: 'It learns your operation and improves with use, so the lift to your operations compounds the longer it runs.',
  },
]

// section 5 — use cases. The everyday work that eats time and cost.
const USE_CASES = [
  {
    name: 'Customer support & servicing',
    body: 'Answers and account servicing across channels, day and night, without the queue or the headcount.',
  },
  {
    name: 'Outbound',
    body: 'Reminders, follow-ups and renewals, on time, the re-engagement that quietly slips when the team is stretched.',
  },
  {
    name: 'Receivables',
    body: 'Collections handled steadily and fairly, in a tone you’d stand behind. Money chased without the awkwardness.',
  },
  {
    name: 'Document processing & back-office',
    body: 'Documents, data and routine workflows, done. The paperwork that piles up between the work that pays.',
  },
]

// section 6 — impact.
const IMPACT = [
  {
    name: 'Scale without scaling the team',
    body: 'Automate customer and back-office work without hiring for every new channel, product or season.',
  },
  {
    name: 'Reliable by construction',
    body: 'Automation you can put in front of customers and against money, because nothing acts until it’s been checked.',
  },
  {
    name: 'Enterprise-grade, mid-market reach',
    body: 'The capability the regulated giants run, sized and priced for a growing business.',
  },
]

export default function MsmePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <main className="relative z-10">
        {/* ════════════════════ 1 · Hero ════════════════════ */}
        <Section className="!pt-24 !pb-24 min-h-[85vh] flex items-center [&>div]:w-full">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>MSME</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                <span className="text-grad-carved">Regulation-grade</span> AI, your scale.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                The same validated, auditable, reliable AI workers the regulated giants run,{' '}
                <span className="text-ink">sized for a growing business</span>, and ready for
                customer service and back-office work you can{' '}
                <span className="text-mint">actually trust</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="#why" variant="secondary">
                  See why it fits
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 2 · The challenge ════════════════════ */}
        <Section hairline>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">The challenge</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Growth outruns the team.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-[54ch] font-sans text-body-lg text-ink-2">
                For medium-sized enterprises in any industry, customer service and the back office
                eat time and cost faster than you can hire. You may not have a regulator looking over
                your shoulder, but you{' '}
                <span className="text-ink">still can&rsquo;t afford AI that gets it wrong</span> in
                front of customers, or with money. Off-the-shelf AI is quick to start and{' '}
                <span className="text-ink">unreliable</span>. So the work stays manual.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 3 · Why Krim fits ════════════════════ */}
        {/* (note: §2 merges the former "Who it's for" + "The challenge") */}
        <Section id="why" hairline>
          <Reveal>
            <Eyebrow tone="mint">Why Krim</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The rigor the giants rely on, made accessible.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Every action checked before it acts, and on the record after. Automation you can{' '}
              <span className="text-ink">actually trust</span>, deployed for you and getting sharper
              the longer it runs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <GlassCard hover accent={i === 0} className="flex h-full flex-col p-7 md:p-8">
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${i === 0 ? 'bg-mint/80' : 'bg-mint/45'}`}
                  />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{r.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{r.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 4 · Use cases ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              The work that eats your week.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The same co-workers that run regulated operations, pointed at the everyday jobs that
              never quite get done.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[1.35rem] leading-tight text-ink">{u.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 5 · Impact ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Do more, without doing it all yourself.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {IMPACT.map((it, i) => (
              <Reveal key={it.name} delay={i * 0.08}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.35rem] leading-tight text-ink">
                    {it.name}
                  </h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 6 · Deployment ════════════════════ */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Deployment</Eyebrow>
                <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                  Managed, so you can just use it.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  For a lean team, the simplest path is <span className="text-ink">fully managed</span>:
                  KrimOS hosted and run for you in a sovereign cloud region, with nothing to stand up
                  and nothing to maintain. As you grow, it can move closer to your own walls.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Managed SaaS
                </p>
                <p className="mt-5 font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug text-ink">
                  Enterprise-grade capability, deployed at mid-market reach: affordable, and fast
                  to start.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 7 · Close ════════════════════ */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See what it can take off your plate.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                Tell us the work that eats your week, and we&rsquo;ll show you the same automation the
                giants trust, sized for you.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

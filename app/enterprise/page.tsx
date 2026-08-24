/**
 * /enterprise — the Enterprise domain. Content-first, calm glass + type,
 * no hero image, no hand-built devices (HOUSE-STYLE §0/§7). Standalone shell.
 *
 * The spine only THIS page owns: one system over a sprawling, multi-vendor,
 * multi-region estate — reads/writes the systems you already run (no rip, no
 * replace), one audit standard everywhere. §6 "For smaller teams" carries the
 * former /msme page's one idea (bank-grade rigor, managed + affordable);
 * /msme permanently redirects here (next.config.mjs). Deployment detail lives
 * on /trust. Logical fits only, never claimed customers. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const DEMO = '/contact'

export const metadata: Metadata = {
  title: 'Enterprise',
  description:
    'One operating system over your whole estate: KrimOS automates regulated customer and back-office work at scale, with every action validated before it executes, inside your own perimeter, one standard across every region and system.',
  alternates: { canonical: 'https://www.krim.ai/enterprise' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Enterprise — KrimOS',
    description:
      'One operating system over your whole estate: KrimOS automates regulated customer and back-office work at scale, with every action validated before it executes, inside your own perimeter, one standard across every region and system.',
    url: 'https://www.krim.ai/enterprise',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Enterprise', item: 'https://www.krim.ai/enterprise' },
  ],
}

// Why it fits — the three things only an estate buyer needs to hear. The
// validation wedge lives in the hero; these carry integration, consistency
// and evidence instead of repeating it.
const FITS = [
  {
    name: 'No rip, no replace',
    body: 'KrimOS reads from and writes back to the systems you already run, core, CRM, dialler, document stores, over 40+ connectors. The estate stays; the work starts connecting.',
  },
  {
    name: 'One standard, every region',
    body: 'The same validated operation in every jurisdiction; only the rules it enforces change. Compliance stays consistent by construction, not by retraining teams.',
  },
  {
    name: 'One record over everything',
    body: 'Every action across every system and region lands on a single immutable trail, so the estate answers an audit as one operation, not forty exports.',
  },
]

// The work only an estate carries — scale + heterogeneity, not the generic
// service/outbound/back-office trio every vendor lists.
const USE_CASES = [
  { name: 'One servicing standard, every brand', body: 'Customers get the same answer at the same bar across brands, regions and channels, however many systems sit underneath.' },
  { name: 'Policy rollout, estate-wide', body: 'Change a contact rule or a script once and it lands everywhere at once, checked before any action fires under it.' },
  { name: 'Compliant outbound, per jurisdiction', body: 'Collections, renewals and statutory notices at volume, each contact inside the consent, contact-window and frequency rules of its own market.' },
  { name: 'Reconciliation across systems', body: 'Payments matched and breaks cleared across the fragmented estate, with explicit inputs and outputs logged by construction.' },
]

export default function EnterprisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">
        {/* ---- 1 · Hero (sectors folded into a quiet line) ---- */}
        <Section className="!pt-24 !pb-24 min-h-[85vh] flex items-center [&>div]:w-full">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Enterprise</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Millions of regulated interactions, every one <span className="text-grad-carved">provable</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                One operating system for customer and back-office work, with{' '}
                <span className="text-mint">every action validated before it executes</span>, across
                every system you run.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex justify-center">
                <CTA href={DEMO}>Book a demo</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The challenge ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">The challenge</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Scale multiplies every problem.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Dozens of systems, several jurisdictions, an audit obligation behind all of it.
                  And <span className="text-ink">generic AI can&rsquo;t be trusted</span> with a
                  regulated message. Bolting it onto each system, one at a time, never ends.
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

        {/* ---- 3 · Why it fits — enterprise-specific, clean 3-col ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why it fits</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              One safe layer over everything you run.
            </h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              KrimOS makes regulated work <span className="text-mint">safe to automate</span>, and
              ties the whole estate to one way of working, one audit trail.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FITS.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 0.08}>
                <GlassCard accent={i === 2} hover className="flex h-full flex-col p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.35rem] leading-tight text-ink">{f.name}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{f.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Use cases — clean 2-col ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">The volume work that can&rsquo;t afford a wrong move.</h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              The work an enterprise carries at volume: each action validated before it runs, and
              recorded after.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <h3 className="font-serif text-[1.35rem] leading-tight text-ink">{u.name}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Impact (+ a one-line deployment nod → /trust) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">What changes</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  The operation grows; the headcount holds.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  One way of working across regions and systems: lower cost to serve, compliance
                  kept consistent, and an operation that grows without the team growing in step.
                </p>
                <p className="mt-6 font-sans text-body text-ink-2">
                  Sovereign by default: on-prem, hybrid or managed.{' '}
                  <Link href="/trust" className="text-mint underline-offset-4 transition-colors hover:underline">
                    See how it deploys →
                  </Link>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug text-ink">
                  Every regulated action audit-ready, every region on one stack. The proof recorded
                  as the work runs, ready the moment a regulator asks.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 6 · For smaller teams — the former /msme page, distilled to its
               one real idea: the same rigor, managed and affordable. ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="mint">For smaller teams</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  The same rigor, sized for a growing business.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  You don&rsquo;t need an estate to need AI you can trust in front of customers and
                  money. The same validated co-workers run{' '}
                  <span className="text-ink">fully managed</span>: hosted and operated for you,
                  nothing to stand up, <span className="text-mint">priced for a growing business</span>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Managed SaaS
                </p>
                <p className="mt-5 font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug text-ink">
                  Start with the work that eats your week, and as you grow, it can move inside your
                  own walls.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                One estate, one standard, scaled.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                The disconnected systems pull together. The regulated work moves at digital speed.
                <span className="text-mint"> Every region, every channel, every action held to the
                same provable bar.</span>
              </p>
              <div className="mt-9 flex justify-center">
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

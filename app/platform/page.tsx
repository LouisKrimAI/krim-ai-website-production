/**
 * /platform — the hub / map. Rebuilt to docs/HOUSE-STYLE.md as the reference
 * exemplar. Its own structure (claim → the doorways in → why it holds →
 * close), the homepage's design DNA, marketing-grade copy. The Layershq render
 * (public/images/krimos/layers.png) is the hero visual; hand-built SVG "devices"
 * are gone — real image or clean glass+type only (HOUSE-STYLE §7).
 * Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PlatformBackdrop from '@/components/PlatformBackdrop'
import Reveal from '@/components/Reveal'
import PlatformLayers from '@/components/home/PlatformLayers'
import { LAYERS } from '@/components/platform/layers'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'KrimOS',
  description:
    'KrimOS is one operating system for regulated operations: the runtime that validates and learns (Kendra), a vocabulary of validated actions (Kriya), the co-workers built from it (Karta), the command center your teams run them from (Kupa), and two ways in — Kula for your teams, Kira for your customers.',
  alternates: { canonical: 'https://krim.ai/platform' },
  openGraph: { title: 'KrimOS — the platform', url: 'https://krim.ai/platform' },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
  ],
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KrimOS',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Operating system for regulated operations',
  operatingSystem: 'Sovereign on-prem, Hybrid, Managed SaaS',
  publisher: { '@type': 'Organization', name: 'Krim', url: 'https://krim.ai' },
  description:
    'KrimOS is the operating system for regulated operations: AI co-workers whose every action is validated before it executes, and that learn from everything they do — inside the institution’s own perimeter.',
  featureList: [
    'Pre-execution validation — Krim-Nyāya, 33 validators',
    '250+ validated, credit-native action primitives (Kriya, ten categories)',
    'Utility-based AI co-workers (Karta) — operational decisioning today, a safe AI underwriter as the build direction',
    'One runtime that validates every action and learns from every outcome (Kendra)',
    'Natural-language interface for teams (Kula) and a customer advisor (Kira)',
    'Immutable, metered audit trail (Krim-Ledger, Krim Work Units)',
    'Sovereign deployment — on-prem, hybrid or managed',
    '40+ connectors; nothing to tear out, nothing to migrate',
  ],
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://krim.ai/platform' },
}

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <SiteHeader />
      <PlatformBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: the claim + the architecture, seen whole ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[1000px] text-center">
            <Reveal>
              <p className="font-mono text-[clamp(15px,1.7vw,18px)] uppercase tracking-[0.34em] text-mint">
                KrimOS
              </p>
              <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.1rem)] leading-[1.05] tracking-[-0.018em] text-ink">
                <span className="block">One operating system</span>
                <span className="block">for regulated operations.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                AI co-workers do the work; every action is validated before it executes, and the
                system gets sharper from every outcome it records — all inside your own perimeter.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform/kendra" variant="secondary">
                  See how it validates
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Inside KrimOS — the stack, all layers shown, then the doorways ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Inside KrimOS</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              One stack, from the core to the people who use it.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Each layer does one job; together they are a single operating system. Here is the
              whole stack, top to bottom.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 flex justify-center">
              <PlatformLayers />
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-soft pt-9 font-sans text-[15px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Go deeper, layer by layer</span>
              {LAYERS.map((l) => (
                <Link
                  key={l.slug}
                  href={`/platform/${l.slug}`}
                  className="group inline-flex items-baseline gap-1.5 text-ink-2 transition-colors hover:text-mint"
                >
                  <span className="underline-offset-4 group-hover:underline">{l.slug === 'kira' ? 'Kira & Krimkar' : l.name}</span>
                  <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · Who it's for ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Who it&rsquo;s for</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">One core, across regulated operations.</h2>
              <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
                The same stack runs wherever the work is regulated — only the rules and use cases
                change. See it in your world:
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-sans text-[15px]">
                {[
                  ['Lending', '/lending'],
                  ['Government', '/government'],
                  ['Large Enterprise', '/enterprise'],
                  ['MSME', '/msme'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="text-ink-2 underline-offset-4 transition-colors hover:text-mint hover:underline">
                    {label}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Why it holds together (the two powers) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Why it holds together</Eyebrow>
                <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                  Validated before it acts. Smarter after.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Nothing runs until it has cleared the gate. Everything that runs makes the next
                  decision sharper. Safety and intelligence aren&rsquo;t traded off here — each is
                  what makes the other possible.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  That is why one operating system beats a drawer of point tools — and why it gets
                  better the longer it runs.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Krim-Nyāya validates · Krim-Learn compounds
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3.5 · Impacts to your business — general, cross-domain (no invented metrics) ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Impacts to your business</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              What changes when machines can finally act.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              The outcomes hold across every regulated operation — only the use cases change.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              [
                'Automate the work you couldn’t risk before',
                'The highest-consequence operations — the ones kept manual because one mistake is a compliance event — can finally run on AI, because every action is proven before it fires.',
              ],
              [
                'Compliance becomes built-in, not bolted-on',
                'Validation moves in front of the action and the evidence is complete by construction — so audits and inspections are answered from a record that is already there.',
              ],
              [
                'Cost-to-serve falls as the system learns',
                'Every validated outcome makes the next one sharper. The same team handles more, and the operation gets more efficient the longer it runs.',
              ],
              [
                'Serve more people, to the same standard',
                'Lower the cost and risk of running operations at scale and good service reaches further — more customers, more cases, the same accountable bar.',
              ],
            ].map(([title, body], i) => (
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
            <p className="mx-auto mt-10 max-w-[70ch] text-center font-sans text-body text-ink-2">
              In <span className="text-ink">lending</span>, that is collections and servicing that
              move faster without adding regulatory risk. In{' '}
              <span className="text-ink">government</span>, citizen services that clear faster while
              staying fully accountable.
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it on the stack you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                Nothing to tear out — KrimOS reads from your systems and writes back on validated channels.
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

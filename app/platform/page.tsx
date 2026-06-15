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
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import Image from 'next/image'
import { LAYERS } from '@/components/platform/layers'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'KrimOS',
  description:
    'KrimOS is one operating system for regulated operations: a vocabulary of validated actions (Kriya), the co-workers built from it (Karta), the runtime that validates and learns (Kendra), and two interfaces — Kula for your teams, Kira for your customers.',
  alternates: { canonical: 'https://krim.ai/platform' },
  openGraph: { title: 'KrimOS — the platform', url: 'https://krim.ai/platform' },
}

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

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
    'Utility-based AI co-workers (Karta) — operational decisioning, not underwriting',
    'One runtime that validates every action and learns from every outcome (Kendra)',
    'Natural-language interface for teams (Kula) and a customer advisor (Kira)',
    'Immutable, metered audit trail (Krim-Ledger, Krim Work Units)',
    'Sovereign deployment — on-prem, hybrid or managed',
    '40+ connectors; no rip, no replace',
  ],
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://krim.ai/platform' },
}

// benefit-led doorways — the hub's core job is routing the buyer to the layer they need
const DOORS: Record<string, string> = {
  kendra: 'The mind. It validates every action before it fires — and gets sharper from every outcome it records.',
  kriya: 'The vocabulary. 250+ validated, credit-native actions; the finite set everything is built from.',
  karta: 'The co-workers. Composed from the vocabulary to run the operation — never to approve, deny or price a loan.',
  kula: 'Your teams’ way in. Ask in plain language; the runtime does the thinking and waits for your sign-off.',
  kira: 'Your customers’ advisor — one relationship across every channel, in their own language, in the Krimkar app.',
}

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: the claim + the architecture, seen whole ---- */}
        <Section className="!pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>KrimOS</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  One operating system for regulated operations.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                  Every action is validated before it executes — and the system gets sharper from
                  every outcome it records. A vocabulary of validated actions, the co-workers built from it, and the
                  mind that runs them, as one stack inside your walls.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <CTA href={DEMO_HREF}>Book a demo</CTA>
                  <CTA href="/platform/kendra" variant="secondary">
                    See how it validates
                  </CTA>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="relative mx-auto w-full max-w-[440px]">
                {/* faint cyan ground so the render sits in the orb's light, not on a seam */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-60 blur-2xl"
                  style={{ background: 'radial-gradient(60% 50% at 50% 42%, rgba(57,214,255,0.12), transparent 70%)' }}
                />
                <Image
                  src="/images/krimos/layers.png"
                  alt="The KrimOS stack rendered as physical strata: the reasoning mind on top, the validated operating layers beneath, resting on a sovereign silicon foundation."
                  width={1115}
                  height={1500}
                  priority
                  sizes="(max-width: 1024px) 80vw, 440px"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Inside the system — the doorways ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Inside KrimOS</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              One system, wherever you start.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              A vocabulary becomes a workforce, run by one mind — with two ways in, one for the
              teams who run the operation and one for the customers it serves. Start where your
              problem is; underneath, it stays a single operating system.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 0.08}>
                <Link href={`/platform/${l.slug}`} className="group block h-full">
                  <GlassCard hover className="flex h-full flex-col p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{l.eyebrow}</p>
                    <h3 className="mt-3 font-serif text-display-2 text-ink">{l.name}</h3>
                    <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-ink-2">{DOORS[l.slug]}</p>
                    <p className="mt-6 font-mono text-[13px] text-mint" aria-hidden>
                      Explore {l.name}{' '}
                      <span className="inline-block transition-transform duration-fast group-hover:translate-x-1">→</span>
                    </p>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
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

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it on the stack you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                No rip, no replace — KrimOS reads from your systems and writes back on validated channels.
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

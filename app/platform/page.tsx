/**
 * /platform — the hub / map. From docs/copy/platform.md. The recurring
 * architecture glyph anchors the hero; the named parts each open a sub-page.
 * Don't force a tidy count — name the parts that are real. Facts: krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import ArchGlyph from '@/components/platform/ArchGlyph'
import { LAYERS } from '@/components/platform/layers'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Platform — one operating system, named for what each part does',
  description:
    'KrimOS is a runtime, a vocabulary, a workforce, and two interfaces: Kendra, Kriya, Karta, Kula and Kira. One operating system for regulated operations.',
  alternates: { canonical: 'https://krim.ai/platform' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
  ],
}

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>The platform</Eyebrow>
                <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] tracking-[-0.02em] text-ink">
                  One operating system. Named for what each part does.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  KrimOS isn&rsquo;t a product with features bolted on — it&rsquo;s a runtime, a
                  vocabulary, a workforce, and two faces. Here&rsquo;s how they fit.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <CTA href={DEMO_HREF}>Book a demo</CTA>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  The same map recurs on every page — lit for the part you&rsquo;re on.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · How it fits together ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The architecture</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              A vocabulary becomes a workforce, run by a mind.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Kriya is the vocabulary — validated actions. Karta are the co-workers built from them.
              Kendra is the mind that runs them: it validates everything before it acts, and learns
              from everything it does. Two interfaces let people in — Kula for your teams, Kira for
              your customers.
            </p>
          </Reveal>
        </Section>

        {/* ---- 3 · The parts ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Explore</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Named for what each one does.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 0.08}>
                <Link href={`/platform/${l.slug}`} className="block h-full">
                  <GlassCard hover className="flex h-full flex-col p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{l.eyebrow}</p>
                    <h3 className="mt-3 font-serif text-[1.6rem] leading-none text-ink">{l.name}</h3>
                    <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-ink-2">{l.oneLiner}</p>
                    <p className="mt-6 font-mono text-[13px] text-mint" aria-hidden>→</p>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight text-ink">
                One core. Every regulated domain.
              </h2>
              <p className="mt-5 font-sans text-body text-ink-2">
                The parts never change. Only the rules and use cases do.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href="/platform/kendra" variant="secondary">
                  Start with the brain — Kendra
                </CTA>
                <CTA href={DEMO_HREF}>Book a demo</CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

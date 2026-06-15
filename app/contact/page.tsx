/**
 * /contact — "Book a demo". The conversion page: a glass demo form routed to
 * sales@krim.ai (Formspree), a Cal.com inline embed for self-serve scheduling,
 * and the direct lines. Standalone shell (header + orb + footer); content-first,
 * homepage glass + type only — the form and Cal embed are the real interactive
 * content (HOUSE-STYLE §0/§7). Copy: docs/copy/contact.md.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { DemoForm, CalScheduler } from './_client'

export const metadata: Metadata = {
  title: 'Book a demo',
  description:
    'See KrimOS run on your operation. Book a demo or grab a call directly — tell us what you are trying to solve and we will come prepared. Routed to sales@krim.ai.',
  alternates: { canonical: 'https://krim.ai/contact' },
  openGraph: { title: 'Book a demo — Krim', url: 'https://krim.ai/contact' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Book a demo', item: 'https://krim.ai/contact' },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                See it run on your operation.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Book a demo, or tell us what you&rsquo;re trying to solve — we&rsquo;ll come prepared.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The form ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px]">
            <Reveal>
              <Eyebrow>Book a demo</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">Tell us where you are.</h2>
              <p className="mt-6 max-w-[52ch] font-sans text-body text-ink-2">
                Routed to <span className="text-mint">sales@krim.ai</span>. We reply within one
                business day.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="mt-10 p-7 md:p-10">
                <DemoForm />
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Or pick a time ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Straight to a call</Eyebrow>
                <h2 className="mt-4 font-serif text-display-1 text-ink">Prefer to just talk?</h2>
                <p className="mx-auto mt-6 max-w-[44ch] font-sans text-body-lg text-ink-2">
                  Grab a slot directly.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10">
                <CalScheduler />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Direct ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px]">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Or reach us</Eyebrow>
                <h2 className="mt-4 font-serif text-display-1 text-ink">Direct lines.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass-quiet mt-10 grid gap-6 p-8 sm:grid-cols-2 md:p-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Email</p>
                  <a
                    href="mailto:sales@krim.ai"
                    className="mt-2 inline-block font-sans text-body-lg text-ink transition-colors hover:text-mint"
                  >
                    sales@krim.ai
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Phone</p>
                  <a
                    href="tel:+15103455686"
                    className="mt-2 inline-block font-sans text-body-lg text-ink transition-colors hover:text-mint"
                  >
                    +1 510 345 5686
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

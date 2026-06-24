/**
 * /contact — "Book a demo". The conversion page: a glass demo form posting to
 * /api/demo (Supabase capture + confirmation/drip + sales notice via Resend), a
 * Calendly inline embed for self-serve scheduling, and the direct lines.
 * Standalone shell (header + orb + footer); content-first, homepage glass + type
 * only — the form and embed are the real interactive content (HOUSE-STYLE §0/§7).
 * Copy: docs/copy/contact.md.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { DemoForm, CalendlyScheduler } from './_client'

export const metadata: Metadata = {
  title: 'Book a demo',
  description:
    'See KrimOS run on your operation. Book a demo or grab a call directly — tell us what you are trying to solve and we will come prepared. Routed to sales@krim.ai.',
  alternates: { canonical: 'https://krim.ai/contact' },
  openGraph: {
    title: 'Book a demo — Krim',
    description:
      'See KrimOS run on your operation. Book a demo or grab a call directly — tell us what you are trying to solve and we will come prepared. Routed to sales@krim.ai.',
    url: 'https://krim.ai/contact',
  },
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
                Book a demo, or tell us the problem — we&rsquo;ll come prepared.
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
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="mt-10 p-7 md:p-10">
                <DemoForm />
              </GlassCard>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-center font-sans text-[15px] text-ink-3">Prefer email or phone?</p>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center font-sans text-[clamp(17px,2vw,20px)] text-ink">
                <a href="mailto:sales@krim.ai" className="underline-offset-4 transition-colors hover:text-mint hover:underline">
                  sales@krim.ai
                </a>
                <span aria-hidden className="hidden text-ink-3 sm:inline">·</span>
                <a href="tel:+15103455686" className="underline-offset-4 transition-colors hover:text-mint hover:underline">
                  +1 510 345 5686
                </a>
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Or pick a time ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Or pick a time</Eyebrow>
                <h2 className="mt-4 font-serif text-display-2 text-ink">Prefer to just talk?</h2>
                <p className="mx-auto mt-5 max-w-[44ch] font-sans text-body text-ink-2">
                  Grab a slot directly — no form needed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10">
                <CalendlyScheduler />
              </div>
            </Reveal>
          </div>
        </Section>

      </main>
      <SiteFooter />
    </>
  )
}

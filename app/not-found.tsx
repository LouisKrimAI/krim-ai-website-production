/**
 * not-found — the App Router 404. Renders inside the root layout, so fonts,
 * globals and the orb apply. Standalone shell (SiteHeader + OrbBackdrop + main
 * + SiteFooter), one centred Section: a calm, on-brand dead-end that points the
 * visitor back to the ways in. Clean glass + type only — no devices (HOUSE-STYLE §7).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, CTA } from '@/components/ui'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        <Section className="flex min-h-[60vh] items-center">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal>
              <Eyebrow tone="dim">404</Eyebrow>
              <h1 className="mt-5 font-serif text-display-1 text-ink">
                Nothing here cleared the gate.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
                This page moved, retired, or never existed. Everything that does run on KrimOS
                leaves a trail. This just isn&rsquo;t one of them.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href="/">Back to home</CTA>
                <CTA href="/krimos" variant="secondary">
                  Explore KrimOS
                </CTA>
                <CTA href="/contact" variant="secondary">
                  Book a demo
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

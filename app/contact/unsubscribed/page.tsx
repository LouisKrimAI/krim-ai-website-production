/**
 * /contact/unsubscribed — confirmation after a one-click drip opt-out.
 * Minimal standalone shell; reuses the site's glass + orb so it never feels
 * like a dead-end system page. Linked from /api/unsubscribe.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import { Section, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Unsubscribed',
  description: 'You will no longer receive demo reminder emails from Krim.',
  robots: { index: false, follow: false },
}

export default function UnsubscribedPage() {
  return (
    <>
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        <Section className="!pt-28">
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow>You&rsquo;re all set</Eyebrow>
            <h1 className="mt-5 font-serif text-display-1 text-ink">No more reminders.</h1>
            <p className="mx-auto mt-7 max-w-[48ch] font-sans text-body-lg text-ink-2">
              You won&rsquo;t hear from us about booking a demo again. If you change your mind, the
              door&rsquo;s always open.
            </p>
            <div className="mt-9">
              <Link
                href="/contact"
                className="inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim motion-reduce:hover:translate-y-0"
              >
                Book a demo
              </Link>
            </div>
            <p className="mt-6 font-sans text-[14px] text-ink-3">
              Questions?{' '}
              <a
                href="mailto:sales@krim.ai"
                className="text-ink-2 underline-offset-4 transition-colors hover:text-mint hover:underline"
              >
                sales@krim.ai
              </a>
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

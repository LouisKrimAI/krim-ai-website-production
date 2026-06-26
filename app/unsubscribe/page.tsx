/**
 * /unsubscribe — human confirmation step for drip opt-out. The email link lands
 * here (GET); a button then POSTs to /api/unsubscribe. Reuses the site shell so
 * it never feels like a dead-end system page. noindex.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import { Section, Eyebrow } from '@/components/ui'
import { UnsubscribeConfirm } from './_client'

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Stop receiving demo reminder emails from Krim.',
  robots: { index: false, follow: false },
}

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = typeof searchParams.token === 'string' ? searchParams.token : ''
  return (
    <>
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        <Section className="!pt-28">
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Email preferences</Eyebrow>
            <h1 className="mt-5 font-serif text-display-1 text-ink">Unsubscribe</h1>
            <UnsubscribeConfirm token={token} />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

'use client'

/**
 * error — the App Router error boundary (client, per Next's contract). Without
 * it a runtime exception showed Next's unstyled "Application error" screen.
 * Mirrors not-found.tsx's calm standalone shell (HOUSE-STYLE §7): glass + type,
 * a way to retry, and the ways back in.
 */

import { useEffect } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import { Section, Eyebrow, CTA } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[error-boundary]', error)
  }, [error])

  return (
    <>
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        <Section className="flex min-h-[60vh] items-center">
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow tone="dim">Something went wrong</Eyebrow>
            <h1 className="mt-5 font-serif text-display-1 text-ink">
              This page hit an error it couldn&rsquo;t clear.
            </h1>
            <p className="mx-auto mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
              It&rsquo;s on our side, not yours. Try again — and if it persists, the rest of the
              site is a click away.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <button
                onClick={reset}
                className="inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim motion-reduce:hover:translate-y-0"
              >
                Try again
              </button>
              <CTA href="/" variant="secondary">
                Back to home
              </CTA>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

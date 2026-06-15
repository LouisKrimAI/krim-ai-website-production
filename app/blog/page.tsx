/**
 * /blog — the writing. STANDALONE pattern (SiteHeader + OrbBackdrop + main +
 * SiteFooter), like app/platform/page.tsx and app/page.tsx — NOT LayerShell.
 *
 * The Substack/Medium feed URLs are not provided yet, so this ships an honest
 * EMPTY STATE: no fabricated posts, dates or titles. A clearly-commented slot
 * is left for the server-side aggregated feed once the URLs land — see the
 * "FEED SLOT" block in the render below.
 *
 * Real socials only: X (https://x.com/TheKrimAI), LinkedIn
 * (https://www.linkedin.com/company/krim). Newsletter is a note, not a form —
 * no provider is wired.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Writing from Krim — the thinking behind validated, sovereign AI for regulated work: how proof becomes the runtime, why the system learns, and what it takes to let machines act inside the perimeter.',
  alternates: { canonical: 'https://krim.ai/blog' },
  openGraph: { title: 'Writing — Krim', url: 'https://krim.ai/blog' },
}

const DEMO_HREF = '/contact'

// Real, existing socials only — do not add unverified handles.
const X_HREF = 'https://x.com/TheKrimAI'
const LINKEDIN_HREF = 'https://www.linkedin.com/company/krim'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://krim.ai/blog' },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: the writing ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Writing</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The thinking behind the machine.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Krim is building <span className="text-mint">validated</span>,{' '}
                <span className="text-ink">sovereign</span> AI for regulated work — and writing about
                what it takes to get there. Notes from the people making proof the runtime: why the
                system learns from every action, and what changes once machines can finally act inside
                the perimeter.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Coming soon — the honest empty state ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard accent className="mx-auto max-w-[760px] p-10 text-center md:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">Coming soon</p>
              <h2 className="mt-5 font-serif text-display-2 leading-tight text-ink">
                The first pieces are on their way.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                We are writing in the open about validation, sovereignty and the science of letting AI
                act in regulated work. Follow along while the words land — you will hear it here first.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={X_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded border border-soft px-5 py-3 font-sans text-[15px] text-ink-2 transition-colors hover:border-strong hover:text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded border border-soft px-5 py-3 font-sans text-[15px] text-ink-2 transition-colors hover:border-strong hover:text-ink"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </GlassCard>
          </Reveal>

          {/*
            ──────────────────────────────────────────────────────────────────
            FEED SLOT — aggregated Substack + Medium articles, newest-first.

            Wire this once the feed URLs are provided ([PROVIDE]). Intended shape:

              1. Make this file (or an async child Server Component) `async` and
                 fetch both RSS/Atom feeds server-side, e.g.:

                   const SUBSTACK_FEED = '[PROVIDE]'   // e.g. https://<pub>.substack.com/feed
                   const MEDIUM_FEED   = '[PROVIDE]'   // e.g. https://medium.com/feed/@<handle>

                   const posts = await getAggregatedPosts([SUBSTACK_FEED, MEDIUM_FEED])
                   // each: { title, url, source: 'Substack' | 'Medium', publishedAt: Date, excerpt? }

              2. Sort newest-first by publishedAt, then render a list of glass
                 cards that link out (target="_blank" rel="noopener noreferrer"),
                 each with a mono source/date label, a serif title, and the
                 excerpt — matching the card craft used elsewhere on the site.

              3. Replace the "Coming soon" panel above with this list when
                 posts.length > 0; keep the empty state as the fallback so the
                 page stays honest if a feed is unavailable.

            DO NOT fabricate posts, dates or titles. Ship the empty state until
            real feed URLs exist.
            ──────────────────────────────────────────────────────────────────
          */}
        </Section>

        {/* ---- 3 · Newsletter — a quiet note, no form (no provider wired) ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px]">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
              <Reveal>
                <div>
                  <Eyebrow tone="dim">The newsletter</Eyebrow>
                  <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                    A letter, when there is something worth saying.
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-sans text-body-lg text-ink-2">
                  A low-volume newsletter is coming — the longer thinking, sent direct, never more
                  than it needs to be. Sign-up opens with the first issue. Until then,{' '}
                  <a
                    href={X_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                  >
                    follow on X
                  </a>{' '}
                  or{' '}
                  <a
                    href={LINKEDIN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                  >
                    LinkedIn
                  </a>{' '}
                  and you will not miss it.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                Rather see it run than read about it?
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] font-sans text-body text-ink-2">
                Book a demo and watch validated, sovereign AI act on the work you already do.
              </p>
              <div className="mt-9">
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

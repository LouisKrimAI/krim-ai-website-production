/**
 * /insights — the writing index. STANDALONE pattern (SiteHeader + OrbBackdrop +
 * main + SiteFooter), like app/research/page.tsx — NOT LayerShell.
 *
 * Renders POSTS (app/insights/_posts.ts, newest-first) as a responsive grid of
 * glass cards linking to each article, plus a newsletter pointer (Krim's
 * Substack) and the close CTA.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, CTA } from '@/components/ui'
import { POSTS } from './_posts'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Insights from Krim: the thinking behind validated, sovereign AI for regulated work. Why pilots stall at the compliance ceiling, what a non-compliant action really costs, and why proof has to come before the action, not after.',
  alternates: { canonical: 'https://krim.ai/insights' },
  openGraph: {
    title: 'Insights — Krim',
    description:
      'Insights from Krim: the thinking behind validated, sovereign AI for regulated work. Why pilots stall at the compliance ceiling, what a non-compliant action really costs, and why proof has to come before the action, not after.',
    url: 'https://krim.ai/insights',
  },
}

const DEMO_HREF = '/contact'

// Krim's newsletter lives on Substack.
const SUBSTACK_HREF = 'https://substack.com/@thekrimai'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://krim.ai/insights' },
  ],
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

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
              <Eyebrow>Insights</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Before the action, the argument.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Why the most consequential work still runs by hand, what a single wrong action
                really costs, and why proof has to come <span className="text-ink">first</span>, not
                after. Notes on building <span className="text-mint">validated</span>,{' '}
                <span className="text-ink">sovereign</span> AI for banking, lending first.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Latest insights — the grid ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Latest insights</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-2 text-ink">
              Recent articles.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {POSTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/insights/${p.slug}`}
                  className="glass lume group flex h-full flex-col p-7 md:p-8"
                >
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    {p.category} · {dateFmt.format(new Date(p.date))} · {p.readingMinutes} min
                  </p>
                  <h3 className="mt-3 font-serif text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-mint">
                    {p.title}
                  </h3>
                  <p className="mt-4 font-sans text-body text-ink-2">{p.dek}</p>
                  <span className="mt-6 inline-flex items-baseline gap-2 font-sans text-[15px] text-ink-2 transition-colors group-hover:text-mint">
                    <span className="underline-offset-4 group-hover:underline">Read</span>
                    <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
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
                  A low-volume letter: the longer thinking, sent direct, never more than it needs to
                  be.{' '}
                  <a
                    href={SUBSTACK_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                  >
                    Read and subscribe on Substack
                  </a>
                  .
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
                Book a demo and see validated, sovereign AI run a lending operation, end to end.
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

/**
 * /insights — the writing index. STANDALONE pattern (SiteHeader + OrbBackdrop +
 * main + SiteFooter), like app/research/page.tsx — NOT LayerShell.
 *
 * Renders POSTS (app/insights/_posts.ts, newest-first) as a responsive grid of
 * glass cards linking to each article, then the close CTA.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, CTA } from '@/components/ui'
import { POSTS } from './_posts'
import { CINEMATIC } from '@/lib/cinematic-images'

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
                Perspectives on AI in banking and lending.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[48ch] font-sans text-body-lg text-ink-2">
                Notes on building it <span className="text-mint">validated</span>,{' '}
                <span className="text-ink">sovereign</span>, and provable.
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
                  className="glass lume group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1200px) calc(50vw - 40px), 600px"
                      quality={70}
                      priority={i === 0}
                      placeholder={CINEMATIC[p.image]?.blur ? 'blur' : 'empty'}
                      blurDataURL={CINEMATIC[p.image]?.blur}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ objectPosition: '50% 50%' }}
                    />
                    <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(57,214,255,0.06)' }} />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-20"
                      style={{ background: 'linear-gradient(180deg, rgba(9,9,12,0) 0%, rgba(9,9,12,0.55) 100%)' }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                      {p.category} · {dateFmt.format(new Date(p.date))} · {p.readingMinutes} min
                    </p>
                    <h3 className="mt-3 font-serif text-[1.4rem] leading-tight text-ink transition-colors group-hover:text-mint">
                      {p.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 font-sans text-body text-ink-2">{p.dek}</p>
                    <span className="mt-5 inline-flex items-baseline gap-2 font-sans text-[15px] text-ink-2 transition-colors group-hover:text-mint">
                      <span className="underline-offset-4 group-hover:underline">Read</span>
                      <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                Rather see it run than read about it?
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] font-sans text-body text-ink-2">
                See validated, sovereign AI run a lending operation, end to end.
              </p>
              <div className="mt-9 flex justify-center">
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

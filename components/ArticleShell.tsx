/**
 * ArticleShell — the shared scaffold for every /insights article.
 *
 * Driven by app/insights/_posts.ts (the single source of truth for slug, title,
 * dek, category, date, reading time and hero image), so article metadata can
 * never drift between the index grid, the page <head>, the JSON-LD and the
 * hero again. Each page keeps only its unique prose body (passed as children,
 * rendered inside the ArticlePanel), its headline, image art direction,
 * related links, sources and close CTA.
 *
 * Author is always the organization "Krim" — no individual bylines.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, CTA } from '@/components/ui'
import ArticleImage from '@/components/ArticleImage'
import ArticlePanel from '@/components/ArticlePanel'
import BackToInsights from '@/components/BackToInsights'
import { POSTS, type Post } from '@/app/insights/_posts'

const SITE = 'https://www.krim.ai'

const dateLong = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function postBySlug(slug: string): Post {
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) throw new Error(`No post in _posts.ts for slug "${slug}"`)
  return post
}

/** Page metadata derived from the post record. `title` override changes the
 *  <head> title only (for SEO-tuned tab titles); og:title stays the real one. */
export function articleMetadata(post: Post, overrides?: { title?: string }): Metadata {
  return {
    title: overrides?.title ?? post.title,
    description: post.dek,
    alternates: { canonical: `${SITE}/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.dek,
      url: `${SITE}/insights/${post.slug}`,
      type: 'article',
    },
  }
}

type Source = { label: string; href: string }

export default function ArticleShell({
  post,
  headline,
  eyebrowTone,
  image,
  related,
  sources,
  cta,
  ldExtras,
  children,
}: {
  post: Post
  /** The rendered h1 — often the title with a period, sometimes its own line. */
  headline: React.ReactNode
  /** Category chip tone (e.g. 'gold' for Risk pieces). */
  eyebrowTone?: React.ComponentProps<typeof Eyebrow>['tone']
  /** Header-image art direction; src defaults to the post's index image.
   *  Pass a ReactNode instead for a fully bespoke header visual. */
  image:
    | { src?: string; alt: string; heightClass?: string; objectPosition?: string; tint?: 'cyan' | 'mint' }
    | React.ReactNode
  /** Slugs for the "Keep reading" block (usually two). */
  related: string[]
  sources?: Source[]
  cta: { heading: string; body: string; href: string; label: string }
  /** Extra JSON-LD properties merged into the BlogPosting block (e.g. about, keywords). */
  ldExtras?: Record<string, unknown>
  children: React.ReactNode
}) {
  const url = `${SITE}/insights/${post.slug}`

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE}/insights` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.dek,
    image: `${SITE}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Krim' },
    publisher: {
      '@type': 'Organization',
      name: 'Krim',
      logo: { '@type': 'ImageObject', url: `${SITE}/brand-logo` },
    },
    mainEntityOfPage: url,
    ...ldExtras,
  }

  const relatedPosts = related.map(postBySlug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow tone={eyebrowTone}>{post.category}</Eyebrow>
              <h1 className="mt-5 font-serif text-display-2 leading-tight text-ink md:text-display-3">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">{post.dek}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-3">
                By Krim · {dateLong.format(new Date(post.date))} · {post.readingMinutes} min read
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- Header image ---- */}
        {image && typeof image === 'object' && 'alt' in image ? (
          <ArticleImage
            src={image.src ?? post.image}
            alt={image.alt}
            heightClass={image.heightClass ?? 'h-[clamp(200px,30vw,360px)]'}
            objectPosition={image.objectPosition}
            tint={image.tint}
            priority
          />
        ) : (
          image
        )}

        {/* ---- Body ---- */}
        <Section className="!pt-0">
          <ArticlePanel>
            {children}

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/insights/${r.slug}`}
                      className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint"
                    >
                      {r.title}{' '}
                      <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-8">
                  <BackToInsights />
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            {sources && sources.length > 0 && (
              <div className="mt-12 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
                <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                  {sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ArticlePanel>
        </Section>

        {/* ---- Close CTA ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">{cta.heading}</h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">{cta.body}</p>
              <div className="mt-9 flex justify-center">
                <CTA href={cta.href} variant="secondary">
                  {cta.label}
                </CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

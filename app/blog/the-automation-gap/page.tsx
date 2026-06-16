/**
 * /blog/the-automation-gap — article. STANDALONE shell.
 * Category: Problem. Every statistic traces to a VERIFIED FACT (see Sources).
 * Author is the organization "Krim" — no individual byline.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const SLUG = 'the-automation-gap'
const TITLE = 'The automation gap'
const DEK =
  'AI is everywhere except where an action carries legal or financial consequence. Pilots stall at the compliance ceiling — you can’t ship what you can’t prove. The way through is to validate before acting.'
const CATEGORY = 'Problem'
const DATE_ISO = '2026-01-28'
const DATE_LONG = '28 January 2026'
const READING = 6

export const metadata: Metadata = {
  title: TITLE,
  description: DEK,
  alternates: { canonical: `https://krim.ai/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DEK, url: `https://krim.ai/blog/${SLUG}`, type: 'article' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://krim.ai/blog' },
    { '@type': 'ListItem', position: 3, name: TITLE, item: `https://krim.ai/blog/${SLUG}` },
  ],
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DEK,
  datePublished: DATE_ISO,
  author: { '@type': 'Organization', name: 'Krim' },
  publisher: { '@type': 'Organization', name: 'Krim' },
  mainEntityOfPage: `https://krim.ai/blog/${SLUG}`,
}

export default function Page() {
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
              <Eyebrow>{CATEGORY}</Eyebrow>
              <h1 className="mt-5 font-serif text-display-2 leading-tight text-ink md:text-display-3">
                Why the most consequential work still runs by hand.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">{DEK}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-3">
                By Krim · {DATE_LONG} · {READING} min read
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- Body ---- */}
        <Section className="!pt-0">
          <div className="mx-auto max-w-[680px]">
            <Reveal>
              <p className="font-sans text-body-lg text-ink-2">
                Adoption is no longer the story. By the 2024 count, most large organisations had put
                generative AI to work somewhere — drafting, summarising, answering. The story now is
                where it <span className="text-ink">isn’t</span>: the desk where an action carries
                legal or financial weight. The right-party check on a collections call. The hardship
                response on a delinquent account. The wording of a default notice. That work still
                moves at the speed of a person, because the cost of getting it wrong is not a typo —
                it is a regulator.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Use is high. Value is not.
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                McKinsey’s 2024 state-of-AI survey found{' '}
                <span className="text-ink">65% of organisations regularly using generative AI</span>{' '}
                — yet only about <span className="text-ink">5%</span> attributed more than a tenth of
                their EBIT to it, and <span className="text-gold">44%</span> reported at least one
                negative consequence from using it. The tools spread fast and the returns did not
                follow. The pattern is consistent: AI lands easily where a mistake is cheap, and
                stalls where it is not.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The same survey by some estimates has a darker companion. MIT’s NANDA initiative
                reported in 2025 that <span className="text-gold">around 95%</span> of enterprise
                generative-AI pilots delivered no measurable return — a figure worth treating as
                directional rather than precise, but one that rhymes with what every operations
                leader already feels. The demos work. The deployments don’t.
              </p>

              <Reveal>
                <GlassCard accent className="my-10 p-8 md:p-10">
                  <p className="font-serif text-[1.5rem] leading-snug text-ink">
                    The blocker isn’t capability. It’s consequence. You cannot ship an action you can
                    only explain after it has fired.
                  </p>
                </GlassCard>
              </Reveal>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The compliance ceiling
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Watch where the pilots die. Gartner expects{' '}
                <span className="text-ink">at least 30% of generative-AI projects to be abandoned
                after proof-of-concept</span> by the end of 2025, and forecasts that{' '}
                <span className="text-ink">more than 40% of agentic-AI projects</span> will be
                cancelled by the end of 2027 — citing costs, unclear value and inadequate risk
                controls. In regulated operations, that last clause is the whole story. A
                proof-of-concept can show a model drafting a perfect hardship letter. It cannot, by
                itself, show that the letter was permitted to be sent — to this borrower, on this
                account, under today’s rule, with consent on file.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                So the project hits a wall the slide deck never mentioned. The model can act; nobody
                can prove the action was allowed before it happened. And in work governed by law,
                <span className="text-ink"> an explanation produced afterward is not the same thing
                as permission produced beforehand</span>. The compliance team is right to say no.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Prove the action, then take it
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The way through the ceiling is not a better model. It is a different order of
                operations. Move the check in front of the action: test every proposed step against
                law, policy, consent and context <span className="text-ink">before</span> it can
                fire, and let nothing through that doesn’t clear. What passes carries its reasoning
                with it; what fails never happens.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                That is the discipline KrimOS is built on —{' '}
                <span className="text-mint">validated before it acts</span>. It is also why
                automation finally reaches the consequential desk: not because the work got less
                risky, but because the risk is now resolved up front, on the record, where a
                regulator can read it. The gap between where AI is and where it matters closes the
                moment proof comes first.
              </p>
            </Reveal>

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  <Link href="/blog/the-cost-of-being-wrong" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The cost of being wrong <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link href="/blog/audit-after-the-fact-is-a-confession" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    Audit after the fact is a confession <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            <div className="mt-12 border-t border-soft pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                <li>
                  <a href="https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    Gartner — agentic-AI project cancellations forecast (2025)
                  </a>
                </li>
                <li>
                  <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    McKinsey — The state of AI 2024
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ---- Close CTA ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See automation reach the desk that matters.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                KrimOS validates every action before it fires — so the consequential work can finally
                run without leaving compliance behind.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href="/contact">Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
                  Explore the platform
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

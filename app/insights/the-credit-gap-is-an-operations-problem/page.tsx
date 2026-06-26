/**
 * /insights/the-credit-gap-is-an-operations-problem — article. STANDALONE shell.
 * Category: Markets. Every statistic traces to a VERIFIED FACT (see Sources).
 * Author is the organization "Krim" — no individual byline.
 * NOTE: thesis = the operations-cost lever on inclusion. It now also points to Krim's
 * direction — the full stack incl. a safe AI underwriter (the World Lending Model).
 * Confident, no line-drawing disclaimers; never fabricate live deployments/metrics.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import ArticleImage from '@/components/ArticleImage'

const SLUG = 'the-credit-gap-is-an-operations-problem'
const TITLE = 'The credit gap is an operations problem'
const DEK =
  'Billions stay underserved not only because risk is hard to price, but because the cost and risk of operating lending at scale (compliant communications, servicing, collections) is prohibitive. Make safe operations cheap and the reachable market grows.'
const CATEGORY = 'Markets'
const DATE_ISO = '2026-04-21'
const DATE_LONG = '21 April 2026'
const READING = 7

export const metadata: Metadata = {
  title: TITLE,
  description: DEK,
  alternates: { canonical: `https://krim.ai/insights/${SLUG}` },
  openGraph: { title: TITLE, description: DEK, url: `https://krim.ai/insights/${SLUG}`, type: 'article' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://krim.ai/insights' },
    { '@type': 'ListItem', position: 3, name: TITLE, item: `https://krim.ai/insights/${SLUG}` },
  ],
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DEK,
  datePublished: DATE_ISO,
  dateModified: DATE_ISO,
  author: { '@type': 'Organization', name: 'Krim' },
  publisher: { '@type': 'Organization', name: 'Krim' },
  mainEntityOfPage: `https://krim.ai/insights/${SLUG}`,
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
                The credit gap is an operations problem.
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

        {/* ---- Header image ---- */}
        <ArticleImage
          src="/images/cinematic/credit-gap.webp"
          alt="A darkened operations floor, lit by the work it runs."
          heightClass="h-[clamp(200px,30vw,360px)]"
          objectPosition="50% 60%"
          tint="cyan"
        />

        {/* ---- Body ---- */}
        <Section className="!pt-0">
          <div className="mx-auto max-w-[680px]">
            <Reveal>
              <p className="font-sans text-body-lg text-ink-2">
                The size of the unmet demand is not in dispute. The IFC puts the MSME finance gap in
                emerging markets at roughly <span className="text-ink">$5.7 trillion</span>, about
                19% of those economies’ combined GDP, up from $4.4 trillion in 2015. Women-owned MSMEs
                account for some <span className="text-ink">$1.9 trillion</span> of it. In India
                alone, an RBI-commissioned committee estimated the MSME credit gap at{' '}
                <span className="text-ink">₹20–25 trillion</span>. Zoom out to individuals and the
                Global Findex counted <span className="text-ink">1.4 billion</span> adults still
                unbanked in 2021. Even in the United States, the CFPB found{' '}
                <span className="text-ink">26 million</span> adults are credit-invisible and another
                19 million unscorable, roughly one in five.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The reflex is to read all of this as a pricing problem: if only we could score thin-
                or no-file borrowers, the gap would close. Better risk models help. But they do not
                explain why so much demand goes unserved even where the risk <span className="text-ink">is</span>{' '}
                knowable. Something else is in the way.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The cost that never makes the headline
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                A loan is not a moment of approval. It is a relationship that has to be{' '}
                <span className="text-ink">operated</span>: onboarding, disclosures, statements,
                reminders, hardship handling, collections, complaints. Every step is bound by rules
                that differ by product, channel and jurisdiction. For small-ticket and thin-file
                lending, that operational load barely shrinks while the revenue per account does. The
                economics break not because the borrower is too risky to price, but because the
                borrower is too <span className="text-ink">expensive to serve safely</span>.
              </p>

              <Reveal>
                <GlassCard accent className="my-10 p-8 md:p-10">
                  <p className="font-serif text-[1.5rem] leading-snug text-ink">
                    A borrower can be creditworthy and still go unserved, because the cost of running
                    the loan compliantly is larger than the loan.
                  </p>
                </GlassCard>
              </Reveal>

              <p className="mt-5 font-sans text-body text-ink-2">
                And the cost is not only labour. It is risk. As covered elsewhere in this series, a
                single mishandled communication carries real statutory exposure. Every cheap way
                to operate at scale tends to be the unsafe way, and every safe way tends to be the
                expensive, manual one. That trade-off is the quiet reason the frontier of who gets
                served sits where it does.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Lower the cost of safe, and the frontier moves
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                This reframes the problem in a useful way. If the binding constraint on inclusion is
                the cost and risk of <span className="text-ink">operating</span> a loan, not pricing
                it, then the highest-leverage move is to make safe operations cheap. Drive down the
                marginal cost of a compliant communication, a serviced account, a hardship
                conversation, and the math on the underserved shifts.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                That is the leverage: when compliant operation stops being the expensive option,
                accounts that never penciled out start to, not by taking on risk the institution
                wouldn’t, but by <span className="text-mint">making the safe way the affordable
                way</span>. It is the same reason we are building toward the whole stack, origination
                and a safe AI underwriter included, so the system that makes operations cheap can also
                widen who is reachable in the first place. The credit gap was never only about who
                deserves a loan. It was about who could be <span className="text-ink">reached</span>{' '}
                without breaking the rules or the budget.
              </p>
            </Reveal>

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  <Link href="/insights/the-cost-of-being-wrong" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The cost of being wrong <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link href="/insights/sovereignty-is-not-optional" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    Sovereignty is not optional <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            <div className="mt-12 border-t border-soft pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                <li>
                  <a href="https://www.smefinanceforum.org/data-sites/msme-finance-gap" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    IFC / SME Finance Forum: MSME finance gap
                  </a>
                </li>
                <li>
                  <a href="https://dcmsme.gov.in/Report%20of%20Expert%20Committee%20on%20MSMEs%20-%20The%20U%20K%20Sinha%20Committee%20constitutes%20by%20RBI.pdf" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    RBI: U.K. Sinha Committee report on MSMEs (2019)
                  </a>
                </li>
                <li>
                  <a href="https://www.worldbank.org/en/publication/globalfindex" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    World Bank: Global Findex 2021
                  </a>
                </li>
                <li>
                  <a href="https://www.consumerfinance.gov/data-research/research-reports/who-are-credit-invisibles/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    CFPB: Who are the credit invisibles? (2015)
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
                Make safe operations the affordable ones.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                KrimOS runs the operations around lending (communications, servicing, collections),
                validated before they act, so more borrowers can be reached without bending the rules
                or the budget.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/lending" variant="secondary">
                  See it in lending
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

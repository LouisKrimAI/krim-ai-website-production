/**
 * /blog/the-cost-of-being-wrong — article. STANDALONE shell.
 * Category: Risk. Every statistic traces to a VERIFIED FACT (see Sources).
 * Author is the organization "Krim" — no individual byline.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

const SLUG = 'the-cost-of-being-wrong'
const TITLE = 'The cost of being wrong'
const DEK =
  'One non-compliant action can’t be unmade — and per-violation statutory exposure scales terrifyingly across millions of automated touches. Post-hoc audit explains the harm after it is done. Pre-execution validation prevents it.'
const CATEGORY = 'Risk'
const DATE_ISO = '2026-03-03'
const DATE_LONG = '3 March 2026'
const READING = 7

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
  dateModified: DATE_ISO,
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
              <Eyebrow tone="gold">{CATEGORY}</Eyebrow>
              <h1 className="mt-5 font-serif text-display-2 leading-tight text-ink md:text-display-3">
                The cost of being wrong.
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
                Most software bugs are recoverable. You roll back, you patch, you apologise. A
                non-compliant action in regulated lending is not like that. A call placed without
                consent has been placed. A collections message sent to the wrong number has been
                read. The harm is complete the instant the action fires — and the only thing an audit
                trail can do afterward is describe, precisely, how it happened.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Per-violation, multiplied by everything
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The terror is in the arithmetic. Statutory damages in this space are priced{' '}
                <span className="text-ink">per action</span>, not per incident. Under the TCPA, an
                illegal call or text carries <span className="text-ink">$500</span> in statutory
                damages — rising to <span className="text-gold">$1,500</span> where the conduct is
                willful or knowing (47 U.S.C. §227). The FDCPA caps statutory damages at{' '}
                <span className="text-ink">$1,000</span> per action (15 U.S.C. §1692k). Read those as
                unit costs and then remember that automation’s entire promise is volume. A single
                misconfigured rule does not produce one violation. It produces one per touch, across
                every account it ran against.
              </p>

              <Reveal>
                <GlassCard accent className="my-10 p-8 md:p-10">
                  <p className="font-serif text-[1.5rem] leading-snug text-ink">
                    Automate a defensible process and you scale safety. Automate a flawed one and you
                    scale the violation — at $500 a touch, across millions of them.
                  </p>
                </GlassCard>
              </Reveal>

              <p className="mt-5 font-sans text-body text-ink-2">
                It is not hypothetical. In 2014, Capital One settled TCPA claims for{' '}
                <span className="text-ink">$75.5 million</span> over autodialed collection calls that
                reached more than <span className="text-ink">21 million</span> phone numbers — at the
                time a record. The mechanism was mundane: an automated dialer doing exactly what it
                was told, at scale, without a gate in front of it.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The penalties scale with you
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The supervisory numbers are larger still. In December 2022 the CFPB ordered{' '}
                <span className="text-ink">Wells Fargo</span> to pay roughly{' '}
                <span className="text-ink">$3.7 billion</span> — more than $2 billion in redress plus
                a $1.7 billion penalty — over mismanagement affecting{' '}
                <span className="text-ink">16 million</span> accounts. In September 2024 it banned{' '}
                <span className="text-ink">Navient</span> from federal student-loan servicing
                permanently and ordered <span className="text-ink">$120 million</span> in penalties
                and redress. These are not pricing errors. They are operations failures — the work
                around the loan, done wrong, at scale.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The pattern crosses borders. In 2024 the UK’s FCA fined{' '}
                <span className="text-ink">HSBC £6,280,100</span>,{' '}
                <span className="text-ink">TSB £10,910,500</span> and{' '}
                <span className="text-ink">Volkswagen Financial Services (UK) £5,397,600</span> — all
                for unfair treatment of customers in financial difficulty. And the largest figure of
                all is a redress total: UK payment-protection-insurance mis-selling cost firms{' '}
                <span className="text-ink">around £38.3 billion</span> between 2011 and 2019, the
                largest consumer-redress exercise in the country’s history. A whole industry’s
                process, wrong, paid for after the fact.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Audit explains. Validation prevents.
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Every dollar above was assessed <span className="text-ink">after</span> the harm. That
                is what post-hoc governance buys you: a faithful account of a loss you have already
                taken. It is necessary and it is not enough. The only control that changes the
                arithmetic is one that sits <span className="text-ink">in front of</span> the action.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                That is the whole design intent of KrimOS. Every proposed action is checked against
                law, policy, consent and context before it can execute — and what fails to clear
                never fires. <span className="text-mint">Validated before it acts</span>. When the
                unit cost of a wrong action is $500 and the unit volume is millions, prevention isn’t
                a compliance nicety. It is the only number that scales in your favour.
              </p>
            </Reveal>

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  <Link href="/blog/audit-after-the-fact-is-a-confession" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    Audit after the fact is a confession <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link href="/blog/the-automation-gap" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The automation gap <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            <div className="mt-12 border-t border-soft pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                <li>
                  <a href="https://www.law.cornell.edu/uscode/text/47/227" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    TCPA — 47 U.S.C. §227 (statutory damages)
                  </a>
                </li>
                <li>
                  <a href="https://www.law.cornell.edu/uscode/text/15/1692k" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    FDCPA — 15 U.S.C. §1692k (civil liability)
                  </a>
                </li>
                <li>
                  <a href="https://www.manatt.com/insights/newsletters/tcpa-connect/capital-one-sets-record-with-$75m-tcpa-deal" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    Manatt — Capital One $75.5M TCPA settlement
                  </a>
                </li>
                <li>
                  <a href="https://www.consumerfinance.gov/about-us/newsroom/cfpb-orders-wells-fargo-to-pay-37-billion-for-widespread-mismanagement-of-auto-loans-mortgages-and-deposit-accounts/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    CFPB — Wells Fargo $3.7B order (Dec 2022)
                  </a>
                </li>
                <li>
                  <a href="https://www.consumerfinance.gov/about-us/newsroom/cfpb-bans-navient-from-federal-student-loan-servicing-and-orders-the-company-to-pay-120-million-for-wide-ranging-student-lending-failures/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    CFPB — Navient $120M order and servicing ban (Sep 2024)
                  </a>
                </li>
                <li>
                  <a href="https://www.fca.org.uk/news/news-stories/2024-fines" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    FCA — 2024 fines
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
                Make the worst actions structurally impossible.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                KrimOS validates every action before it fires — so the violation that would have
                scaled never happens once.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href="/contact">Book a demo</CTA>
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

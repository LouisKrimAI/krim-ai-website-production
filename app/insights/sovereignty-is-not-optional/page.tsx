/**
 * /insights/sovereignty-is-not-optional — article. STANDALONE shell.
 * Category: Architecture. Every statistic/regulatory claim traces to a VERIFIED FACT (see Sources).
 * Author is the organization "Krim" — no individual byline.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import CinematicBand from '@/components/CinematicBand'

const SLUG = 'sovereignty-is-not-optional'
const TITLE = 'Sovereignty is not optional'
const DEK =
  'Regulated AI has to run inside the institution’s own perimeter. Shipping customer data to a third-party model is a non-starter on the rules and on the risk, and it is the same reason the system can ever learn the whole operation.'
const CATEGORY = 'Architecture'
const DATE_ISO = '2026-06-09'
const DATE_LONG = '9 June 2026'
const READING = 6

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
                Sovereignty is not optional.
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
        <CinematicBand
          src="/images/cinematic/architecture-lattice.jpg"
          alt="A sovereign lattice of interconnected nodes, inside one perimeter."
          heightClass="h-[clamp(200px,30vw,360px)]"
          objectPosition="50% 50%"
          tint="cyan"
        />

        {/* ---- Body ---- */}
        <Section className="!pt-0">
          <div className="mx-auto max-w-[680px]">
            <Reveal>
              <p className="font-sans text-body-lg text-ink-2">
                There is a common architecture for enterprise AI: send the data to the model. Call an
                API, stream the customer record out to a vendor’s endpoint, get an answer back. For a
                regulated institution handling borrower data, that pattern is not a deployment detail
                to be negotiated. It is the first thing that fails the review.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The rules draw a perimeter
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The law is explicit about where regulated data may go. India’s RBI directed in 2018
                that <span className="text-ink">the entire payment data of a system be stored only in
                India</span>; where processing happens abroad, the data must be brought back within{' '}
                <span className="text-ink">24 hours</span>. The GDPR’s Article 44 restricts transfers
                of personal data outside the EU and EEA, permitting them only under specific
                safeguards. These are not abstractions. They define a perimeter, and any AI that
                operates on regulated data has to operate <span className="text-ink">inside it</span>.
                A design that routes customer records to a third-party model has already left the
                jurisdiction the data was supposed to stay in.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The risk math agrees
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Even where a transfer is technically permitted, the exposure is severe. IBM’s 2025
                Cost of a Data Breach report puts the global average breach at{' '}
                <span className="text-ink">$4.44 million</span>, with the US at an all-time high of{' '}
                <span className="text-ink">$10.22 million</span>; the financial sector averaged{' '}
                <span className="text-ink">$6.08 million</span> in 2024. The AI-specific findings are
                sharper still: IBM reports that <span className="text-ink">97%</span> of organisations
                that suffered an AI-related breach lacked proper AI access controls, and that{' '}
                <span className="text-gold">“shadow AI”</span>, tools used outside governance, added
                around <span className="text-ink">$670,000</span> to the average breach cost. Every
                external hop is a new boundary to breach, a new processor to trust, a new place the
                data can leak.
              </p>

              <Reveal>
                <GlassCard accent className="my-10 p-8 md:p-10">
                  <p className="font-serif text-[1.5rem] leading-snug text-ink">
                    Don’t send the data to the model. Bring the model to the data, and keep both
                    inside the institution’s walls.
                  </p>
                </GlassCard>
              </Reveal>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Why the constraint is also the capability
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Sovereignty reads like a restriction. It is also the precondition for the most
                valuable thing the system can do. A model that runs inside the perimeter doesn’t just
                satisfy the data-residency rule. It gets to <span className="text-ink">live where
                the operation lives</span>. It sees the whole lifecycle: the communications, the
                servicing events, the hardship cases, the outcomes, on one ledger, over time. That is
                what lets it learn the operation as a connected whole rather than as a stream of
                anonymised fragments passed to an outside endpoint.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                So the two commitments collapse into one. The architecture that keeps regulated data
                safe is the same architecture that lets the system understand the business deeply
                enough to be useful in it. KrimOS is built to run inside the institution’s walls{' '}
                (<span className="text-mint">validated before it acts, smarter after it acts</span>),
                and it is no accident that those are the same design. Sovereignty isn’t the price of
                the intelligence. It is the ground the intelligence grows from.
              </p>
            </Reveal>

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  <Link href="/insights/audit-after-the-fact-is-a-confession" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    Audit after the fact is a confession <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link href="/insights/the-credit-gap-is-an-operations-problem" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The credit gap is an operations problem <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            <div className="mt-12 border-t border-soft pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                <li>
                  <a href="https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=2995" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    RBI: Storage of Payment System Data (FAQ)
                  </a>
                </li>
                <li>
                  <a href="https://gdpr-info.eu/art-44-gdpr/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    GDPR: Article 44 (transfers of personal data)
                  </a>
                </li>
                <li>
                  <a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    IBM: Cost of a Data Breach 2025
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
                AI that runs inside your walls.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                KrimOS lives where your data lives, so it satisfies the residency rule and learns the
                whole operation in the same move.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href="/contact">Book a demo</CTA>
                <CTA href="/krimos" variant="secondary">
                  Explore KrimOS
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

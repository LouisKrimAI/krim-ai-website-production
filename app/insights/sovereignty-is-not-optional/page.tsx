/**
 * /insights/sovereignty-is-not-optional — article body only; the scaffold
 * (hero, JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell, driven
 * by app/insights/_posts.ts.
 * Category: Architecture. Every statistic/regulatory claim traces to a VERIFIED FACT (see Sources).
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('sovereignty-is-not-optional')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Sovereignty is not optional."
      image={{ alt: 'A sovereign lattice of interconnected nodes, inside one perimeter.', objectPosition: '50% 50%', tint: 'cyan' }}
      related={['audit-after-the-fact-is-a-confession', 'the-credit-gap-is-an-operations-problem']}
      sources={[
        { label: 'RBI: Storage of Payment System Data (FAQ)', href: 'https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=2995' },
        { label: 'GDPR: Article 44 (transfers of personal data)', href: 'https://gdpr-info.eu/art-44-gdpr/' },
        { label: 'IBM: Cost of a Data Breach 2025', href: 'https://www.ibm.com/reports/data-breach' },
      ]}
      cta={{
        heading: 'AI that runs inside your walls.',
        body: 'KrimOS lives where your data lives, so it satisfies the residency rule and learns the whole operation in the same move.',
        href: '/krimos',
        label: 'Explore KrimOS',
      }}
    >
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
    </ArticleShell>
  )
}

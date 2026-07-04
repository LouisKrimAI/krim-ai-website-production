/**
 * /insights/the-credit-gap-is-an-operations-problem — article body only; the
 * scaffold (hero, JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell,
 * driven by app/insights/_posts.ts.
 * Category: Markets. Every statistic traces to a VERIFIED FACT (see Sources).
 * NOTE: thesis = the operations-cost lever on inclusion. It now also points to Krim's
 * direction — the full stack incl. a safe AI underwriter (Kovida, the world lending
 * model). Confident, no line-drawing disclaimers; never fabricate live deployments/metrics.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-credit-gap-is-an-operations-problem')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="The credit gap is an operations problem."
      image={{ alt: 'A darkened operations floor, lit by the work it runs.', objectPosition: '50% 60%', tint: 'cyan' }}
      related={['the-cost-of-being-wrong', 'sovereignty-is-not-optional']}
      sources={[
        { label: 'IFC / SME Finance Forum: MSME finance gap', href: 'https://www.smefinanceforum.org/data-sites/msme-finance-gap' },
        { label: 'RBI: U.K. Sinha Committee report on MSMEs (2019)', href: 'https://dcmsme.gov.in/Report%20of%20Expert%20Committee%20on%20MSMEs%20-%20The%20U%20K%20Sinha%20Committee%20constitutes%20by%20RBI.pdf' },
        { label: 'World Bank: Global Findex 2021', href: 'https://www.worldbank.org/en/publication/globalfindex' },
        { label: 'CFPB: Who are the credit invisibles? (2015)', href: 'https://www.consumerfinance.gov/data-research/research-reports/who-are-credit-invisibles/' },
      ]}
      cta={{
        heading: 'Make safe operations the affordable ones.',
        body: 'KrimOS runs the operations around lending (communications, servicing, collections), validated before they act, so more borrowers can be reached without bending the rules or the budget.',
        href: '/lending',
        label: 'See it in lending',
      }}
    >
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
    </ArticleShell>
  )
}

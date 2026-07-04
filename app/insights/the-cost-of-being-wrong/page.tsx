/**
 * /insights/the-cost-of-being-wrong — article body only; the scaffold (hero,
 * JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell, driven by
 * app/insights/_posts.ts.
 * Category: Risk. Every statistic traces to a VERIFIED FACT (see Sources).
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-cost-of-being-wrong')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="The cost of being wrong."
      eyebrowTone="gold"
      image={{ alt: 'A vast wave rising over a digital grid, the weight of one wrong action.', objectPosition: '50% 55%', tint: 'cyan' }}
      related={['audit-after-the-fact-is-a-confession', 'the-automation-gap']}
      sources={[
        { label: 'TCPA: 47 U.S.C. §227 (statutory damages)', href: 'https://www.law.cornell.edu/uscode/text/47/227' },
        { label: 'FDCPA: 15 U.S.C. §1692k (civil liability)', href: 'https://www.law.cornell.edu/uscode/text/15/1692k' },
        { label: 'Manatt: Capital One $75.5M TCPA settlement', href: 'https://www.manatt.com/insights/newsletters/tcpa-connect/capital-one-sets-record-with-$75m-tcpa-deal' },
        { label: 'CFPB: Wells Fargo $3.7B order (Dec 2022)', href: 'https://www.consumerfinance.gov/about-us/newsroom/cfpb-orders-wells-fargo-to-pay-37-billion-for-widespread-mismanagement-of-auto-loans-mortgages-and-deposit-accounts/' },
        { label: 'CFPB: Navient $120M order and servicing ban (Sep 2024)', href: 'https://www.consumerfinance.gov/about-us/newsroom/cfpb-bans-navient-from-federal-student-loan-servicing-and-orders-the-company-to-pay-120-million-for-wide-ranging-student-lending-failures/' },
        { label: 'FCA: 2024 fines', href: 'https://www.fca.org.uk/news/news-stories/2024-fines' },
      ]}
      cta={{
        heading: 'Make the worst actions structurally impossible.',
        body: 'KrimOS validates every action before it fires, so the violation that would have scaled never happens once.',
        href: '/lending',
        label: 'See it in lending',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Most software bugs are recoverable. You roll back, you patch, you apologise. A
          non-compliant action in regulated lending is not like that. A call placed without
          consent has been placed. A collections message sent to the wrong number has been
          read. The harm is complete the instant the action fires. The only thing an audit
          trail can do afterward is describe, precisely, how it happened.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Per-violation, multiplied by everything
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The terror is in the arithmetic. Statutory damages in this space are priced{' '}
          <span className="text-ink">per action</span>, not per incident. Under the TCPA, an
          illegal call or text carries <span className="text-ink">$500</span> in statutory
          damages, rising to <span className="text-gold">$1,500</span> where the conduct is
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
              scale the violation: at $500 a touch, across millions of them.
            </p>
          </GlassCard>
        </Reveal>

        <p className="mt-5 font-sans text-body text-ink-2">
          It is not hypothetical. In 2014, Capital One settled TCPA claims for{' '}
          <span className="text-ink">$75.5 million</span> over autodialed collection calls that
          reached more than <span className="text-ink">21 million</span> phone numbers, at the
          time a record. The mechanism was mundane: an automated dialer doing exactly what it
          was told, at scale, without a gate in front of it.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The penalties scale with you
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The supervisory numbers are larger still. In December 2022 the CFPB ordered{' '}
          <span className="text-ink">Wells Fargo</span> to pay roughly{' '}
          <span className="text-ink">$3.7 billion</span> (more than $2 billion in redress plus
          a $1.7 billion penalty) over mismanagement affecting{' '}
          <span className="text-ink">16 million</span> accounts. In September 2024 it banned{' '}
          <span className="text-ink">Navient</span> from federal student-loan servicing
          permanently and ordered <span className="text-ink">$120 million</span> in penalties
          and redress. These are not pricing errors. They are operations failures: the work
          around the loan, done wrong, at scale.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The pattern crosses borders. In 2024 the UK’s FCA fined{' '}
          <span className="text-ink">HSBC £6,280,100</span>,{' '}
          <span className="text-ink">TSB £10,910,500</span> and{' '}
          <span className="text-ink">Volkswagen Financial Services (UK) £5,397,600</span>, all
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
          law, policy, consent and context before it can execute. What fails to clear
          never fires. <span className="text-mint">Validated before it acts</span>. When the
          unit cost of a wrong action is $500 and the unit volume is millions, prevention isn’t
          a compliance nicety. It is the only number that scales in your favour.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

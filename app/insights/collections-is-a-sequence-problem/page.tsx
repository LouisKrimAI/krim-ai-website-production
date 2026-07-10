/**
 * /insights/collections-is-a-sequence-problem — Wednesday domain piece (the beachhead).
 * Category: Method. Statutory facts reused from the already-gated
 * /insights/the-cost-of-being-wrong: TCPA 47 U.S.C. §227 ($500 per illegal call/text,
 * $1,500 willful); FDCPA 15 U.S.C. §1692k (up to $1,000 statutory damages per action);
 * Capital One $75.5M TCPA settlement over autodialed calls reaching 21M numbers.
 * DELIBERATELY OMITTED: the McKinsey "~12 touches / $15–$40 per touch" figure — it is
 * cited-as and unverified for external use (POSITIONING §4 / thesis §4).
 * Claim floor: no deployments, no customers, no measured outcomes, no cure-rate claims.
 * "Outcomes label in weeks" is our own reasoning (thesis §4), presented as such.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('collections-is-a-sequence-problem')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Collections is a sequence problem."
      image={{
        alt: 'Branching paths of light, one continuous route threading through nodes to a resolved point.',
        objectPosition: '50% 50%',
        tint: 'mint',
      }}
      related={['the-cost-of-being-wrong', 'what-epistemic-ai-means']}
      sources={[
        { label: 'TCPA: 47 U.S.C. §227 (statutory damages)', href: 'https://www.law.cornell.edu/uscode/text/47/227' },
        { label: 'FDCPA: 15 U.S.C. §1692k (civil liability)', href: 'https://www.law.cornell.edu/uscode/text/15/1692k' },
        { label: 'Manatt: Capital One $75.5M TCPA settlement', href: 'https://www.manatt.com/insights/newsletters/tcpa-connect/capital-one-sets-record-with-$75m-tcpa-deal' },
      ]}
      cta={{
        heading: 'The safe way to run the sequence.',
        body: 'KrimOS composes collections work from validated primitives, checks every contact against law, policy and consent before it goes out, and records what happened next.',
        href: '/lending',
        label: 'See it in lending',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Nobody has ever cured a delinquent account with a single perfect message. Cure comes from
          a <span className="text-ink">sequence</span>: a first contact that lands at a moment the
          borrower can absorb it, on a channel they actually read; a follow-up that arrives before
          the situation hardens; a hardship conversation instead of a demand, if the signals warrant
          it; sometimes a restructure that quietly saves the account. Which step, when, on which
          channel, or whether to change the instrument altogether. Cure is a path through a space of
          choices.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          This is why the AI conversation in collections keeps missing. Ask most vendors what they
          automate and the answer is a <span className="text-cyan">step</span>: draft the message,
          transcribe the call, score the account. But the value was never in the step. It was in the
          path.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Every step in the path is bounded by law
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          A collections sequence is not a marketing funnel, and this is the part that makes it hard.
          Every arrow in the path is constrained. Contact only within permitted hours. Only through
          channels this borrower consented to. Not after they have asked you to stop. Not to a
          number that no longer belongs to them. Say the things the law requires you to say, and
          nothing you are forbidden to say, in a manner that cannot be construed as harassment.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          And the penalties are priced per action, not per incident. Under the TCPA, an illegal call
          or text carries <span className="text-ink">$500</span> in statutory damages, rising to{' '}
          <span className="text-gold">$1,500</span> where the conduct is willful. The FDCPA caps
          statutory damages at <span className="text-ink">$1,000</span> per action. Those are unit
          costs. Multiply them by the volume automation exists to deliver, and the arithmetic turns
          on you. In 2014 Capital One settled TCPA claims for{' '}
          <span className="text-ink">$75.5 million</span> over autodialed collection calls that
          reached more than <span className="text-ink">21 million</span> phone numbers. The dialer
          did exactly what it was told, at scale, with no gate in front of it.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              In collections, the unit of automation is the sequence. The unit of liability is the
              individual touch.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Why this is where safe automation pays first
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Collections has a property that most of the lending lifecycle lacks, and it is enormously
          valuable to anyone trying to build a system that learns. The outcomes arrive{' '}
          <span className="text-ink">quickly</span>. A default label on a fresh origination can take
          two or three years to mature. But whether this contact, on this day, on this channel,
          moved this account toward cure is knowable in <span className="text-mint">weeks</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Short feedback loops are what let a system&rsquo;s claims be checked against reality
          before anyone bets the book on them. You can learn a sequence policy here and find out,
          soon, whether you were right. That is not true of a credit model whose verdict lands in
          2029.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          What the system has to be able to do
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Put the two facts together and the requirements write themselves. A system that runs
          collections has to reason about a <span className="text-ink">sequence</span>, because that
          is where the cure lives. And it has to be stopped at every{' '}
          <span className="text-ink">individual touch</span>, because that is where the liability
          lives.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Which means the contact is checked before it goes out, every time: the hour, the channel,
          the consent on file, the state of the account, the wording. What fails to clear never
          fires. What clears leaves the reasoning that cleared it on the record, so the supervisor
          reviewing the queue and the examiner reviewing the year are reading the same thing. And
          because that record accumulates, the system can tell, later, which sequences actually
          reached cure.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          None of this makes collections gentle by itself; that is a matter of policy, and policy is
          the institution&rsquo;s to set. What it does is make the institution&rsquo;s policy{' '}
          <span className="text-mint">actually govern what happens</span>, at machine volume,
          touch by touch. The dialer that cost $75.5 million was not malicious. It was unsupervised
          at the only moment supervision would have mattered.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

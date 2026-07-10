/**
 * /insights/the-eu-ai-act-high-risk-clock — Friday reactive piece.
 * Category: Risk. Facts reused from the already-gated
 * /insights/audit-after-the-fact-is-a-confession: EU AI Act classifies AI used to
 * evaluate creditworthiness / produce credit scores as high-risk (Annex III 5(b);
 * Art. 6(2)); Art. 10 data governance; Art. 12 record-keeping/logging; Art. 14
 * meaningful human oversight; obligations SET to apply from 2 August 2026 — with the
 * MANDATORY caveat, already gated on that article, that a pending proposal could
 * defer it. Treat the date as the current plan, not a certainty.
 * Claim floor: no deployments/customers/metrics; pre-execution validation is the
 * architecture best-aligned with the regime, NOT legally mandated.
 * Also: a censored/reject-biased ledger is an Art. 10 finding, NOT a strength
 * (WLM thesis §5) — do not market the substrate as clean data.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-eu-ai-act-high-risk-clock')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={
        <>
          The EU AI Act&rsquo;s high-risk clock.
        </>
      }
      eyebrowTone="gold"
      image={{
        alt: 'An arc of luminous markers brightening toward a single approaching line.',
        objectPosition: '50% 50%',
        tint: 'mint',
      }}
      related={['audit-after-the-fact-is-a-confession', 'rbi-model-risk-management-2026-ai-lending']}
      sources={[
        { label: 'EU AI Act: Annex III (high-risk: creditworthiness)', href: 'https://artificialintelligenceact.eu/annex/3/' },
        { label: 'EU AI Act: Article 10 (data and data governance)', href: 'https://artificialintelligenceact.eu/article/10/' },
        { label: 'EU AI Act: Article 12 (record-keeping)', href: 'https://artificialintelligenceact.eu/article/12/' },
        { label: 'EU AI Act: Article 14 (human oversight)', href: 'https://artificialintelligenceact.eu/article/14/' },
        { label: 'CFPB Circular 2022-03 (adverse-action notices; complex algorithms)', href: 'https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/' },
        { label: 'Federal Reserve: SR 11-7 (model risk management)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
      ]}
      cta={{
        heading: 'Built for the regime, not retrofitted to it.',
        body: 'KrimOS validates every action before it executes and keeps the reasoning that cleared it. Oversight in time, records by construction, inside your own perimeter.',
        href: '/trust',
        label: 'See the trust posture',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Somewhere in your institution there is a model deciding who gets credit. The European
          Union has an opinion about it. Under the AI Act, AI systems used to{' '}
          <span className="text-ink">evaluate creditworthiness or establish credit scores</span> are
          classified as high-risk (Annex III, and Article 6(2)), which is the legal way of saying
          that this is one of the places where the machinery of the Act comes fully to bear.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Those obligations are set to apply from <span className="text-gold">2 August 2026</span>.
          One honest caveat before anyone builds a programme around that date: a pending proposal
          could defer it. Treat the date as the current plan rather than a certainty. But treat the{' '}
          <span className="text-ink">obligations</span> as certain, because the argument about them
          is over. Only the calendar is in play.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The articles that reach into the architecture
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Most coverage of the Act lists its obligations. It is more useful to read them as
          engineering requirements, because that is what they are.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-ink">Article 10</span> governs the data. Training, validation and
          testing sets must be relevant, sufficiently representative, and examined for bias. Note
          what this does to a comfortable industry habit: a credit dataset built only from
          applicants your policy happened to approve is anything but neutral raw material: it is a{' '}
          <span className="text-ink">selection-biased</span> record of your own past behaviour, and
          under Article 10 that is a finding to document and mitigate, never a strength to advertise.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-ink">Article 12</span> governs the record. High-risk systems must
          technically permit the automatic recording of events across their lifetime: logs adequate
          to trace how the system functioned. Adequate for whom, doing what, is the question worth
          asking. Logs assembled to satisfy an auditor after an incident are usually the logs that
          exist. Logs that let someone reconstruct why a particular decision came out the way it did
          are rarer, and much more expensive to produce retroactively.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-ink">Article 14</span> governs the human. High-risk systems must be
          designed so that natural persons can effectively oversee them, including the ability to
          intervene, and to interrupt. Read it carefully and it is a statement about{' '}
          <span className="text-mint">timing</span>. Oversight after the decision has landed on the
          customer is not oversight. It is commentary.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              The Act is not asking whether your model is good. It is asking whether a person could
              have stopped it in time.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Why the calendar matters less than the lead time
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Here is why the deferral debate is a distraction. Suppose the date moves a year. Nothing
          in that year changes the nature of what has to be built.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Documenting your data governance is a quarter of work. Standing up a genuine oversight
          surface is another matter entirely: a place where a named human can see a proposed
          decision, understand its basis, and hold it before it reaches a customer. That reaches into the
          action path of systems that were built on the assumption that decisions execute and are
          reviewed later. Retrofitting a control point into that path, everywhere, is the kind of
          programme that consumes years and gets quietly descoped into a dashboard.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Meanwhile the same demand is arriving from every direction at once. India&rsquo;s Reserve
          Bank wants explainability thresholds and human command over AI models. The US CFPB holds
          that a complex model is no defence for failing to give a denied applicant specific
          reasons. The Federal Reserve&rsquo;s SR 11-7 expects validation before reliance. Four
          regimes, four vocabularies, one sentence underneath:{' '}
          <span className="text-mint">show that the action was permitted, before it acted, on a
          record someone else can read</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is not the letter of any single one of these laws. It is the architecture that
          answers all of them at once — and it is the reason the institutions treating 2 August as a
          filing deadline will spend the next two years catching up with the ones who read it as a
          specification.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

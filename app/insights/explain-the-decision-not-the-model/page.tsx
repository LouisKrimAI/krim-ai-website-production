/**
 * /insights/explain-the-decision-not-the-model — Tuesday explainer.
 * Category: Method. Facts reused from already-gated site articles:
 * CFPB Circular 2022-03 (complexity is no defence for failing to give specific
 * adverse-action reasons); SR 11-7 (validate before reliance); EU AI Act Annex III
 * credit scoring high-risk + Art 14 human oversight; RBI 2026 MRM draft para 54(1)
 * (explainability thresholds; where full explainability is not achievable →
 * compensating controls incl. verifying outputs prior to use).
 * Claim floor: explainability IS legally required (CFPB); pre-execution validation
 * is NOT legally mandated — it is the architecture best-aligned with the regime.
 * No customers/metrics/deployments. "33 validators" not cited as coverage proof.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('explain-the-decision-not-the-model')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Explain the decision, not the model."
      image={{
        alt: 'A sealed black sphere whose single beam of light lands on one legible, luminous line.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['what-epistemic-ai-means', 'rbi-model-risk-management-2026-ai-lending']}
      sources={[
        { label: 'CFPB Circular 2022-03 (adverse-action notices; complex algorithms)', href: 'https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/' },
        { label: 'Federal Reserve: SR 11-7 (model risk management)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
        { label: 'EU AI Act: Annex III (high-risk: creditworthiness)', href: 'https://artificialintelligenceact.eu/annex/3/' },
        { label: 'EU AI Act: Article 14 (human oversight)', href: 'https://artificialintelligenceact.eu/article/14/' },
        { label: 'RBI: Draft Guidance on Regulatory Principles for Model Risk Management (2026)', href: 'https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=63006' },
      ]}
      cta={{
        heading: 'Proof before the action.',
        body: 'KrimOS checks every proposed action against law, policy, consent and context before it executes, and keeps the reasoning that cleared it. The decision is legible whether or not the model is.',
        href: '/krimos',
        label: 'Explore KrimOS',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          There is a research programme, decades old and honourable, devoted to opening the black
          box. Interpretability asks what a model has learned, which features it leans on, what
          happens inside the billions of parameters no human reads. It is fascinating work, and
          for the frontier systems now entering credit it remains, by the admission of the people
          who build them, unfinished.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Meanwhile, in every bank, a compliance officer has a deadline. And here is the thing
          worth noticing: the regulator never asked her to open the box.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Read what the rules actually say
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Start with the sharpest text. The US Consumer Financial Protection Bureau holds that a
          creditor cannot escape its obligations because the algorithm it used was too complex to
          understand. A denied applicant is owed <span className="text-ink">specific reasons</span>{' '}
          for the denial. Note what that demands and what it does not. It does not require you to
          explain the model. It requires you to explain{' '}
          <span className="text-ink">this decision, about this person</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The pattern repeats wherever you look. The Federal Reserve&rsquo;s SR 11-7 expects a
          model validated before you rely on it. The EU AI Act places credit scoring in its
          high-risk tier and requires meaningful human oversight while there is still a decision to
          govern. India&rsquo;s Reserve Bank, in its 2026 model-risk draft, asks for explainability
          thresholds on AI models — and then does something unusually candid: it concedes that
          where full explainability is not achievable, an institution must instead wrap the model
          in compensating controls, among them mechanisms to verify and corroborate model outputs{' '}
          <span className="text-ink">before they are used</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Sit with that concession. A major central bank looked at the frontier, accepted that the
          model&rsquo;s interior may stay dark, and moved the requirement to the only place it can
          actually be met: the moment before the output becomes an action.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              The model stays a black box. The decision doesn&rsquo;t.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Two different objects
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Conflating the model and the decision is the error underneath a hundred stalled AI
          projects. They are different objects with different obligations.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A <span className="text-cyan">model</span> is a statistical artefact. It has weights, a
          training distribution, and behaviour that may never be fully characterised. Explaining it
          means saying something true about its interior, which is hard and may be impossible.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A <span className="text-mint">decision</span> is an event. It happened at a moment, to a
          named person, on a specific account, under a rule that was in force that day. Explaining
          it means answering a small set of concrete questions: what facts was it based on? What
          rules did it have to satisfy? Which of those were checked, and what did each one return?
          Who could have stopped it, and did anyone try?
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The first is a research problem. The second is a <span className="text-ink">record-keeping
          problem</span> — and record-keeping problems are the kind engineers solve.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Where the record has to be made
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          One catch, and it is the whole design. A decision record assembled afterwards, by joining
          application logs and inferring what probably happened, is a{' '}
          <span className="text-ink">reconstruction</span>. Reconstructions are plausible. They are
          also exactly what degrades under dispute, when a regulator, a court or a customer asks
          why — and the honest answer is that nobody wrote it down at the time.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The record has to be a by-product of the decision being made. That means running the
          check <span className="text-mint">in front of the action</span>: before the notice is
          sent, before the call is placed, before the limit changes, test the proposed action
          against the law, the policy, the consent on file and the context of the account. What
          fails to clear never fires. What clears carries with it, by construction, the account of
          why it cleared. The explanation is not written later. It is the thing that let the action
          happen.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              An explanation you assemble afterwards is a reconstruction. An explanation produced
              by the check that permitted the action is a receipt.
            </p>
          </GlassCard>
        </Reveal>

        <p className="mt-5 font-sans text-body text-ink-2">
          This is why the interpretability question, urgent as it is for science, is the wrong
          question for a bank on a deadline. You may never be able to say what the model was
          thinking. You can always be able to say what the institution did, to whom, on what basis,
          and under whose authority. That is what the rulebooks ask for. It is what an examiner
          reads. And it is buildable today, on models you would never dare to open.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

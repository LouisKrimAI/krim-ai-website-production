/**
 * /insights/your-compliance-team-is-right — Thursday sharp opinion (~800 words).
 * Category: Problem. Sole cited fact, reused from the already-gated
 * /insights/the-automation-gap: Gartner (>40% of agentic-AI projects cancelled by
 * end of 2027, citing costs, unclear value and inadequate risk controls).
 * The meeting scene is archetypal/hypothetical — never a real institution.
 * Claim floor: pre-execution validation is NOT legally mandated; no deployments,
 * customers or metrics; do not say "safe".
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('your-compliance-team-is-right')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Your compliance team is right to say no."
      image={{
        alt: 'A luminous action held suspended at a threshold, rimmed in gold, moments before it proceeds.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['the-automation-gap', 'what-epistemic-ai-means']}
      sources={[
        { label: 'Gartner: agentic-AI project cancellations forecast (2025)', href: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027' },
      ]}
      cta={{
        heading: 'Give them something they can approve.',
        body: 'KrimOS answers the question the risk committee actually asks: every action checked against law, policy, consent and context before it fires, with the reasoning on the record.',
        href: '/krimos',
        label: 'Explore KrimOS',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          It is always the same meeting. The engineers have built something genuinely impressive,
          and everyone in the room can feel it. The model drafts the hardship letter better than the
          team does. It reads the file in seconds. It never has a bad Monday.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Then someone from the second line, who has been quiet, asks a question that sounds almost
          rude in its simplicity. <span className="text-ink">Before this letter goes out — how do we
          know it was allowed to?</span>
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          And the room does a thing rooms do. Someone says the model is 99% accurate. Someone else
          offers to add a human reviewer, then does the arithmetic on volume and stops talking.
          Someone promises a dashboard. Eventually a senior person says let&rsquo;s revisit this next
          quarter, and everybody exhales, and the project quietly becomes a line in a statistic.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The statistic
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Gartner expects <span className="text-ink">more than 40% of agentic-AI projects</span> to
          be cancelled by the end of 2027, citing costs, unclear value and inadequate risk controls.
          Ask a room of banking technologists why their pilot died and you will hear the last of
          those three, dressed in different clothes: <span className="text-ink">it couldn&rsquo;t get
          through risk</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The usual telling of this story casts compliance as the drag coefficient. The innovators
          push; the blockers block; the future is delayed by people who do not understand it. It is
          a comfortable story if you are the one being blocked. It is also, on inspection, exactly
          backwards.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              They are not the last obstacle in front of the future. They are the only people in the
              room asking the question the future has to answer.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Take the question seriously
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          &ldquo;How do we know it was allowed to?&rdquo; is not obstruction. It is the whole of
          regulated practice in seven words. And look at what none of the room&rsquo;s answers
          actually addressed.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-ink">Accuracy is not permission.</span> A model can be right about
          the borrower&rsquo;s situation and still send a communication it had no consent to send.
          <br />
          <span className="text-ink">A dashboard is not a control.</span> It reports what already
          left the building. A collections call cannot be recalled; a wrongly-worded default notice
          has been read.
          <br />
          <span className="text-ink">A human reviewer is not a plan.</span> It is a plan for the
          first hundred actions. It is a confession that you cannot do the hundred thousandth.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The compliance officer is not asking for accuracy, or oversight in the abstract, or a
          promise. She is asking for something narrower and much harder:{' '}
          <span className="text-mint">evidence, produced before the action, that the action was
          permitted</span>. Nothing in a conventional AI stack produces that. Which is why she says
          no. Which is why she is right.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The way the meeting ends differently
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Notice that her question has a shape. It is not &ldquo;is the AI good.&rdquo; It is
          &ldquo;was this specific action, against this specific customer, cleared against the rules
          in force, before it happened, on a record I can show someone.&rdquo; That is a question a
          system can be built to answer — by putting the check in front of the action rather than a
          report behind it.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Build that, and the meeting ends the other way. Not because compliance lowered the bar,
          and not because someone finally persuaded them. Because for the first time, somebody
          brought them a system that answers the question they have been asking, correctly, for
          years.
        </p>
        <p className="mt-8 font-sans text-body-lg text-ink-2 italic">
          The people who kept saying no were never the problem. They were the specification.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

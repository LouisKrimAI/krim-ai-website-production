/**
 * /insights/what-epistemic-ai-means — the flagship category essay. Body only;
 * scaffold is ArticleShell, driven by app/insights/_posts.ts.
 * Category: Architecture (the category-defining play — geo-kit §3 rule).
 * Claim boundary: "Epistemic AI is the category Krim defines" is APPROVED
 * (POSITIONING §3, geo-kit). "33 validators" is brand/IP, NEVER a coverage
 * proof. Pre-execution validation is the architecture best-aligned with the
 * combined regime, NOT legally mandated (explainability is). Say "provable /
 * validated", never "safe". No customers/metrics/deployments; no shipped-WLM.
 * Navya-Nyāya families verbatim from the /epistemic-ai page + geo-kit glossary.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('what-epistemic-ai-means')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="What Epistemic AI means."
      image={{
        alt: 'A lattice of reasoning resolving into structure: knowledge made checkable.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['audit-after-the-fact-is-a-confession', 'the-automation-gap']}
      sources={[
        { label: 'Epistemic AI — the category, in depth', href: 'https://www.krim.ai/epistemic-ai' },
        { label: 'CFPB Circular 2022-03 (model complexity is no defence under ECOA)', href: 'https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/' },
        { label: 'Federal Reserve: SR 11-7 (model risk management)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
      ]}
      cta={{
        heading: 'See the category, in full.',
        body: 'Epistemic AI is the ground KrimOS is built on: every action validated before it fires, its reasoning legible end to end. The deep version lives on one page.',
        href: '/epistemic-ai',
        label: 'Explore Epistemic AI',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          We chose a gentle word for it. When an AI system asserts something false
          with total confidence, we call it a <span className="text-ink">hallucination</span> —
          a trick of perception, almost endearing. In a chat window it is a wrong answer you
          catch and correct. Move the same behaviour to the desk where an action carries legal
          weight, and the gentle word falls away. A hallucinated right-party contact is a call
          placed to the wrong person. A hallucinated adverse-action reason is a notice that
          breaks the law. The model didn&rsquo;t know it wasn&rsquo;t allowed to do that. It was
          never built to know.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is the gap this essay is about, and it is not a gap in capability. The models are
          extraordinary. It is a gap in <span className="text-ink">kind</span>. To see it, look
          at the two kinds of AI the industry has actually built.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The two AIs we have
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          <span className="text-cyan">Generative AI</span> is trained to be plausible. Given
          everything it has read, it produces the most likely next word, the most convincing
          image, the answer that best fits the pattern. Plausibility is its whole objective, and
          it is spectacularly good at it. But plausible and correct are not the same thing, and
          plausible and <span className="text-ink">permitted</span> are not even close.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-cyan">Agentic AI</span> is trained to act. Give it tools and a
          goal and it will take steps in the world: call an API, move a record, send a message.
          It is generative AI with hands. And that is exactly the problem, because the thing we
          bolted hands onto was optimised to be convincing, not to be allowed. An agent that is
          plausible and can act, with nothing between the intent and the execution, is precisely
          the system a regulated institution cannot ship. Not because it is not clever enough.
          Because no one can prove, before it acts, that the action was permitted.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              Generative AI is trained to be plausible. Agentic AI is trained to act. Neither is
              trained to know whether the action is allowed.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The missing third
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Epistemology is the branch of philosophy that asks what we are justified in believing:
          what we have grounds to hold, and why. <span className="text-ink">Epistemic
          AI</span> is the category built around that question. It is the category Krim defines:
          AI whose every action is validated before it fires, and whose reasoning an auditor can
          read end to end. Where a generative model asks &ldquo;what is the likely next
          token,&rdquo; an epistemic system asks a different question of every action it is about
          to take: <span className="text-ink">is this justified</span> — are its premises
          verifiable, is its reasoning free of known error, is it fit to do here, now, to this
          person?
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          This is a different place to put the intelligence: in the{' '}
          <span className="text-cyan">judging of what may be done</span> with what a model
          generates, not in the generating alone. A gate between the output and the act. The model
          can still be a black box. The decision to act on its output does not have to be — and
          what the system learns from each recorded outcome sharpens the judgement it brings to
          the next.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Where the method comes from
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          A category needs a method, and Krim&rsquo;s is older than computing. The Nyāya tradition
          of Mithila is two millennia of precise reasoning about what follows from what, and what
          a claim must satisfy before it can be relied upon; around the fourteenth century it was
          sharpened into <span className="text-ink">Navya-Nyāya</span>, its technical,
          predicate-precise form. KrimOS turns that inheritance into a working gate. Its validation
          runtime,{' '}
          <span className="text-ink">Krim-Nyāya</span>, runs every proposed action through 33
          validators, grouped into the tradition&rsquo;s three families of test:
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          <span className="text-ink">Pramāṇa</span> asks whether the premises hold — is every fact
          the action rests on actually verifiable? <span className="text-ink">Doṣa</span> asks
          whether the reasoning matches a known failure mode — the errors we have seen before and
          named. <span className="text-ink">Yogyatā</span> asks whether the action is fit to take
          at all: the right time, place, party, instrument, manner and purpose. Each validator
          returns <span className="text-mint">pass</span>, <span className="text-gold">amber</span>,
          or fail. Nothing executes on an amber or a fail. What passes carries the record of why
          it passed.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A word of honesty, because the category deserves it. These validators are a{' '}
          <span className="text-ink">grammar</span>, not a guarantee — a disciplined way to ask,
          of every action, whether it is justified. They cover the harms they are written to
          cover, and the work of a validation runtime is never finished. The claim is not that
          the gate makes an action safe. The claim is narrower and more useful: that the action,
          and the reasoning that cleared it, are on the record before anything happens — where a
          supervisor, a board, or an examiner can read them.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Why banking asked for this first
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Every industry will eventually need epistemic AI, but banking needs it now, because
          banking already lives by an epistemic standard. A regulator does not ask whether your
          model is accurate. It asks whether you can show the decision was allowed — this
          customer, this rule, this basis — <span className="text-ink">before</span> it was made,
          and on a record someone else can check. That is not a question about capability. It is a
          question about justification. It is epistemology with a statutory deadline.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Read the rulebooks in that light and they stop looking like separate regimes. The US
          CFPB holds that a model being too complex is no defence for failing to give a borrower
          specific reasons for a denial. The Federal Reserve&rsquo;s SR 11-7 expects a model
          validated before you rely on it. The EU AI Act puts credit scoring in its high-risk tier
          and demands human oversight while there is still a decision to govern. The UK&rsquo;s
          Consumer Duty asks for evidence of good outcomes, measured and shown.
          Different words, one demand: <span className="text-mint">show that the action was
          justified, before it acted, in a form a third party can read</span>. Pre-execution
          validation is not the letter of any one of these laws; it is the architecture that most
          cleanly answers all of them at once.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              A regulator never asks whether your model is accurate. It asks whether you can prove
              the action was allowed, before it happened. That is an epistemic question.
            </p>
          </GlassCard>
        </Reveal>

        <p className="mt-5 font-sans text-body text-ink-2">
          Generative AI made machines articulate. Agentic AI is making them act. The work that
          runs the world — lending first, and everything shaped like it — needs the third thing:
          machines that can prove they are allowed to act, and show their reasoning for it. That
          is the category KrimOS is built on, and it is the one an examiner, a court, and a board
          were always going to require. Not the AI that sounds right. The AI your regulator can
          read.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

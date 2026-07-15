/**
 * /insights/the-agent-isnt-the-hard-part — the agent-harness perspective essay.
 * Body only; scaffold is ArticleShell, driven by app/insights/_posts.ts.
 * Category: Method (what actually makes an agent deployable — the discipline).
 *
 * Claim boundary (docs/POSITIONING §10, research/safe-agent-harness):
 *  - The harness CONTROLS what an agent can do; the model supplies intelligence.
 *  - Kriya = the approved action vocabulary; Krim-Nyāya = the pre-execution gate;
 *    Kupa = human command. Do NOT cite "500+ primitives" / "33 validators" as a
 *    coverage proof — they are brand/IP, not guarantees.
 *  - Say "provable / validated", never "safe". No customers/metrics/deployments.
 *  - Voice: confident, human. No em-dash overuse, no "X, not Y" antithesis frame.
 *  - Leads with the automation desire (the AI workforce); the harness is the
 *    enabler that lets it ship — trust closes the argument, it does not open it.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-agent-isnt-the-hard-part')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={<>The agent isn&rsquo;t the hard part.</>}
      image={{
        alt: 'A command room where every in-flight AI action is watched and can be paused: the human still holds the controls.',
        objectPosition: '50% 45%',
        tint: 'mint',
      }}
      related={['the-automation-gap', 'what-epistemic-ai-means']}
      sources={[
        { label: 'Safe Agent Harness — the control layer, in depth', href: 'https://www.krim.ai/research/safe-agent-harness' },
        { label: 'Federal Reserve: SR 11-7 (model risk management)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
        { label: 'CFPB Circular 2022-03 (model complexity is no defence under ECOA)', href: 'https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/' },
      ]}
      cta={{
        heading: 'See the harness that ships the agent.',
        body: 'A constrained action vocabulary, a gate that clears every action before it fires, and a human who can pause any agent in one click. That is what turns a demo into a co-worker.',
        href: '/research/safe-agent-harness',
        label: 'Explore the Safe Agent Harness',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          You have probably sat through the demo. An AI agent reads a loan file, drafts the
          adverse-action notice, checks the borrower&rsquo;s history, and places the follow-up
          call, all in the time it takes to explain what it just did. The room leans in. Someone
          says the word <span className="text-ink">workforce</span> out loud. And then the demo
          goes to the risk committee, and it dies.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          It does not die because it was fake. It dies because someone asks the only question
          that matters, and no one in the room can answer it:{' '}
          <span className="text-ink">what happens when it is wrong, and can you show, before it
          acts, that it will not be?</span>
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The industry is answering the wrong question
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The reflex, when an agent is not trustworthy enough to deploy, is to make the model
          better. More training, tighter alignment, RLHF, a constitution, a larger context
          window. All of it real work, and all of it aimed at the same target: making the model{' '}
          <span className="text-cyan">less likely</span> to propose a bad action.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          But <span className="text-ink">less likely</span> is not a control. A regulated lender
          cannot put &ldquo;less likely to break the law&rdquo; in front of an examiner. The gap
          between an impressive agent and a deployable one was never a gap in the model&rsquo;s
          intelligence. It is a gap in what sits <span className="text-ink">underneath</span> it.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              A better model is less likely to propose a bad action. A harness stops a bad action
              from executing at all. Only one of those gets you deployed.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          What a harness actually is
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          A harness is the control layer that wraps the agent. The model still supplies the
          intelligence. The harness decides what that intelligence is allowed to do, and it does
          three plain things.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          It <span className="text-mint">constrains</span> what the agent can do at all. The agent
          acts through a vocabulary of actions you approved in advance, and anything outside that
          set is not a mistake it can make, because there is no path to it. It{' '}
          <span className="text-mint">checks</span> every action before the action happens, against
          your policy and the law, and a violation is blocked outright, with no retry and no
          warn-through. And it <span className="text-cyan">keeps a person in command</span>: your
          risk and compliance teams watch every in-flight action and can pause or overrule any
          agent in a single click.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          None of that makes the agent smarter. That is the point. The harness is indifferent to
          how the model reached its proposal. It governs whether the proposal is allowed to become
          an act.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Why this is a different layer, and why it matters
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Constitutional AI, RLHF, and instruction-following all work on the model&rsquo;s
          judgment. A harness works below it. It does not depend on the model choosing well, which
          is exactly why it can carry the weight a regulated deployment puts on it. And because the
          record is written <span className="text-ink">before</span> the action rather than
          reconstructed after it, it is a record a regulator can actually trust. The combined
          rulebook already leans this way. SR 11-7 wants a model validated before you rely on it.
          The CFPB holds that a model being too complex is no excuse for failing to give a borrower
          a specific reason. Both are asking for a control that lives outside the model.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          This is why the harness reads as a compliance story, and why that framing sells it short.
          The harness is not a brake on automation. It is the precondition for it.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The workforce was always within reach
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          What a lender actually wants is a set of co-workers that run origination, servicing and
          collections at a speed and scale the team on the floor cannot match, and keep running
          through the night. That workforce is closer than it looks. The
          models are ready. What has been missing is the thing that lets you put an autonomous
          worker on the floor of a regulated operation without holding your breath.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          You cannot do more until you can prove what the &ldquo;more&rdquo; is doing. The agent,
          the part everyone demos, was always the easy part. The harness is the unglamorous control
          layer that constrains it, clears every action it takes, and stays in your hands. Build
          that, and the intelligence you already have is finally allowed to work.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

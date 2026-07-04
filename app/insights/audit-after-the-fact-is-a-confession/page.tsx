/**
 * /insights/audit-after-the-fact-is-a-confession — article body only; the
 * scaffold (hero, JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell,
 * driven by app/insights/_posts.ts.
 * Category: Method. Every statistic/regulatory claim traces to a VERIFIED FACT (see Sources).
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('audit-after-the-fact-is-a-confession')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Audit after the fact is a confession."
      image={{ alt: 'A sealed record of light on a dark server floor.', objectPosition: '50% 45%', tint: 'cyan' }}
      related={['the-cost-of-being-wrong', 'the-automation-gap']}
      sources={[
        { label: 'Federal Reserve: SR 11-7 (model risk management)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
        { label: 'EU AI Act: Annex III (high-risk: creditworthiness)', href: 'https://artificialintelligenceact.eu/annex/3/' },
        { label: 'EU AI Act: Article 14 (human oversight)', href: 'https://artificialintelligenceact.eu/article/14/' },
      ]}
      cta={{
        heading: 'The AI your regulator can read.',
        body: 'KrimOS proves every action against law, policy, consent and context before it fires, so the record a regulator asks for already exists.',
        href: '/epistemic-ai',
        label: 'What is Epistemic AI?',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          An audit log is a record of things that already happened. In most software that is
          exactly what you want. In regulated work it quietly concedes the point: by the time
          the log exists, the action does too. If that action was not permitted, the trail
          doesn’t protect you. It documents you. The most honest name for an
          after-the-fact explanation of a non-compliant action is a confession.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The rulebooks already say “before”
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Read the supervisory texts closely and they keep pointing the same direction: governance
          belongs in front of the decision, not behind it. US model-risk guidance{' '}
          (<span className="text-ink">SR 11-7</span>, with OCC 2011-12) puts independent
          validation and <span className="text-ink">“effective challenge”</span> at the centre
          of model governance: you are expected to have tested the model’s soundness before you
          rely on it. The EU AI Act goes further for this exact domain, classifying AI used to{' '}
          <span className="text-ink">evaluate creditworthiness or produce credit scores</span>{' '}
          as high-risk (Annex III, 5(b); Art. 6(2)) and requiring meaningful{' '}
          <span className="text-ink">human oversight</span> (Art. 14). Those obligations are set
          to apply from <span className="text-ink">2 August 2026</span>, though a pending
          proposal could defer that, so treat the date as the current plan, not a certainty.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The UK takes a different route to the same place. The FCA and PRA have{' '}
          <span className="text-ink">no AI-specific rulebook</span>; AI sits under the Consumer
          Duty and the Senior Managers &amp; Certification Regime, which means a named senior
          manager remains personally accountable for what the system does. And in August 2025
          the RBI’s FREE-AI committee report rejected <span className="text-ink">“black box”</span>{' '}
          decisioning outright, calling for explainability, human review and a customer’s
          ability to challenge an AI decision.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              The AI your regulator can read. Not a model that explains itself afterward, but a
              system that proves the action is allowed before it takes it.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Explainability has a deadline, and it’s “before”
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          None of these regimes is satisfied by a model that can, in principle, be interrogated
          later. They ask for oversight, challenge and the ability to intervene{' '}
          <span className="text-ink">while there is still a decision to govern</span>. A
          post-hoc explanation arrives after the only moment that mattered has passed. The
          requirement is not “be explainable.” It is “be governable in time.”
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is a structural demand, and it has a structural answer. Pre-execution validation
          puts the test in the path of the action: before a step fires, it is checked against
          law, policy, consent and context, and only what clears proceeds, carrying the
          reasoning that cleared it. This is the discipline KrimOS is built on, formalised in
          its validation runtime, Krim-Nyāya. Every action is{' '}
          <span className="text-mint">validated before it acts</span>, and the proof exists
          because it had to exist for the action to happen at all.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The difference is the difference between a smoke detector and a sprinkler that only
          reports the fire. An audit trail tells you what burned. Pre-execution validation keeps
          the match from being struck. It hands you, by construction, exactly the record a
          regulator asks to see.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

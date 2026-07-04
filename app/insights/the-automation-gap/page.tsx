/**
 * /insights/the-automation-gap — article body only; the scaffold (hero,
 * JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell, driven by
 * app/insights/_posts.ts.
 * Category: Problem. Every statistic traces to a VERIFIED FACT (see Sources).
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-automation-gap')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline="Why the most consequential work still runs by hand."
      image={{ alt: 'A luminous mind held in a lattice of moving data.', objectPosition: '50% 38%', tint: 'cyan' }}
      related={['the-cost-of-being-wrong', 'audit-after-the-fact-is-a-confession']}
      sources={[
        { label: 'Gartner: agentic-AI project cancellations forecast (2025)', href: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027' },
        { label: 'McKinsey: The state of AI 2024', href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024' },
      ]}
      cta={{
        heading: 'See automation reach the desk that matters.',
        body: 'KrimOS validates every action before it fires, so the consequential work can finally run without leaving compliance behind.',
        href: '/krimos',
        label: 'Explore KrimOS',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Adoption is no longer the story. By the 2024 count, most large organisations had put
          generative AI to work somewhere: drafting, summarising, answering. The story now is
          where it <span className="text-ink">isn’t</span>: the desk where an action carries
          legal or financial weight. The right-party check on a collections call. The hardship
          response on a delinquent account. The wording of a default notice. That work still
          moves at the speed of a person, because the cost of getting it wrong is not a typo.
          It is a regulator.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Use is high. Value is not.
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          McKinsey’s 2024 state-of-AI survey found{' '}
          <span className="text-ink">65% of organisations regularly using generative AI</span>,{' '}
          yet only about <span className="text-ink">5%</span> attributed more than a tenth of
          their EBIT to it, and inaccuracy was the harm respondents most often said they had
          already hit. The tools spread fast and the returns did not follow. The pattern is
          consistent: AI lands easily where a mistake is cheap, and stalls where it is not.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That picture has a darker companion. MIT’s NANDA initiative
          reported in 2025 that <span className="text-gold">around 95%</span> of enterprise
          generative-AI pilots delivered no measurable return, a figure worth treating as
          directional rather than precise but one that rhymes with what every operations
          leader already feels. The demos work. The deployments don’t.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              The blocker isn’t capability. It’s consequence. You cannot ship an action you can
              only explain after it has fired.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The compliance ceiling
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Watch where the pilots die. Gartner expects{' '}
          <span className="text-ink">at least 30% of generative-AI projects to be abandoned
          after proof-of-concept</span> by the end of 2025, and forecasts that{' '}
          <span className="text-ink">more than 40% of agentic-AI projects</span> will be
          cancelled by the end of 2027, citing costs, unclear value and inadequate risk
          controls. In regulated operations, that last clause is the whole story. A
          proof-of-concept can show a model drafting a perfect hardship letter. It cannot, by
          itself, show that the letter was permitted to be sent: to this borrower, on this
          account, under today’s rule, with consent on file.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          So the project hits a wall the slide deck never mentioned. The model can act; nobody
          can prove the action was allowed before it happened. And in work governed by law,
          <span className="text-ink"> an explanation produced afterward is not the same thing
          as permission produced beforehand</span>. The compliance team is right to say no.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Prove the action, then take it
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The way through the ceiling is not a better model. It is a different order of
          operations. Move the check in front of the action: test every proposed step against
          law, policy, consent and context <span className="text-ink">before</span> it can
          fire, and let nothing through that doesn’t clear. What passes carries its reasoning
          with it; what fails never happens.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is the discipline KrimOS is built on:{' '}
          <span className="text-mint">validated before it acts</span>. It is also why
          automation finally reaches the consequential desk: not because the work got less
          risky, but because the risk is now resolved up front, on the record, where a
          regulator can read it. The gap between where AI is and where it matters closes the
          moment proof comes first.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

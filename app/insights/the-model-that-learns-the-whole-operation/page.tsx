/**
 * /insights/the-model-that-learns-the-whole-operation — the world-model-for-lending
 * perspective essay (the intelligence / "do better" case). Body only; scaffold is
 * ArticleShell, driven by app/insights/_posts.ts.
 * Category: Architecture (the structural claim: one model, learned from the whole).
 *
 * Distinct from /insights/the-world-model-moment (the frontier / Orca framing that
 * poses the question) and from /research/world-lending-model (the Kovida product
 * explainer with the five components). This piece argues the affirmative
 * intelligence thesis: fragmented stacks cannot learn; a world model is where the
 * operation compounds.
 *
 * Claim boundary (docs/WORLD-LENDING-MODEL-THESIS §7–§8, POSITIONING §10):
 *  - Kovida is Krim's research DIRECTION, not a shipped/finished product. Introduce
 *    as "Kovida — the world lending model" on first mention.
 *  - No customers, metrics, or live deployments. "A validated AI underwriter" and
 *    the full stack are DIRECTION. Say "provable / validated", never "safe".
 *  - Voice: confident, vision-forward, human. No em-dash overuse, no "X, not Y".
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-model-that-learns-the-whole-operation')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={<>The model that learns the whole operation.</>}
      image={{
        alt: 'Fragmented lines of a lending operation resolving into a single connected lattice: one model of the whole.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['the-world-model-moment', 'sovereignty-is-not-optional']}
      sources={[
        { label: 'Kovida — the world lending model, in depth', href: 'https://www.krim.ai/research/world-lending-model' },
        { label: 'Kendra — the runtime that validates and learns', href: 'https://www.krim.ai/krimos/kendra' },
      ]}
      cta={{
        heading: 'See the world lending model.',
        body: 'Kovida is a learned, provable model of how lending behaves, that every agent reasons against and clears through the gate before it acts. It is Krim’s research direction, and it is built to get truer the more lending it sees.',
        href: '/research/world-lending-model',
        label: 'Explore Kovida',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Here is a thing most lenders have stopped noticing, because they have lived with it so
          long. Your stack is a pile of models, and each one sees a single slice. The origination
          model scores an application and forgets it the moment the loan funds. Servicing runs its
          own playbook. Collections starts cold, months later, with no memory of how the loan was
          underwritten or what the borrower was told along the way. Every part is{' '}
          <span className="text-ink">locally smart and globally blind.</span>
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The cost of that is quiet, and it is enormous. The one thing your operation should be
          building over time, a real understanding of how your lending actually behaves, never
          forms. Nothing holds the whole picture, so there is nothing for the intelligence to
          accumulate in. You get a bank that runs, and never a bank that learns.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          A world model is where the picture lives
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The frontier of AI has been moving from predicting the next word to modelling the next
          state of a world: a picture of an environment detailed enough to play an action forward
          and see what happens before committing to it. A lending operation is a world too, with
          its own physics, and it has been waiting for the same treatment.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A <span className="text-ink">world model for lending</span> is a single learned model of
          how the whole thing behaves: the borrower, the product and its cashflows, the market
          around them, the rules that bound every move, and the way a case travels through
          origination, servicing and collections. One model that the entire operation reasons
          against, instead of a dozen tools each guessing at their own corner of it.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          What changes when one model sees everything
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Decisions get sharper because they see more. An underwriting call can weigh the
          downstream cost of servicing a loan and how curable it would be if it slipped, not just a
          score in isolation. A collections conversation can open with the borrower&rsquo;s whole
          history instead of a stranger&rsquo;s cold call. The wall between the front and the back
          of the book comes down: what collections learns retrains origination, and the file that
          underwrote a loan guides the recovery conversation a year later.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          And it compounds. Every recorded outcome, every payment made or missed, feeds back into
          the model, so it gets truer the more lending it sees. Fragmented flows that could only
          ever be tuned become one intelligence that <span className="text-mint">grows</span>.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              A stack of point tools can be tuned forever and still never learn. No part of it sees
              the whole, so nothing ever adds up.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Why the smart architecture is also the provable one
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          There is a temptation to read all of this as a trade: more intelligence, more risk. A
          world model quietly dissolves it. Its core design property is simple.{' '}
          <span className="text-ink">Check an action against its consequences before you take
          it.</span> That sits close to what the rulebook already asks of a credit decision: a
          model validated before it is relied on, and a reason you can show. The same control that
          makes the operation smarter is the one that makes it provable, so intelligence and trust
          stop pulling in opposite directions.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          This is the direction Krim is building, and we call it{' '}
          <span className="text-ink">Kovida &mdash; the world lending model</span>. Not a finished
          product you buy this quarter; an active line of research, built in the open. A model is
          only ever as good as its accuracy, which is why validation and learning are part of the
          model rather than bolted on beside it. Every action it proposes is cleared before it acts,
          and corrected by what actually happens next. That is what it takes for a model to be
          trusted with regulated credit.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The bank that gets smarter every quarter
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Lending is where a world model earns its keep first. Its decisions are consequential and
          hard to undo, so the ability to test one before it happens is worth more here than almost
          anywhere. And the prize is not a faster version of the stack you already have. It is a
          different kind of operation: one where every decision teaches the next, and the
          institution gets smarter every quarter instead of only busier.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A pile of point tools was never going to get you there, because none of them was ever
          looking at the whole. One model, learned from the entire operation and kept inside your
          own walls, is. That is the shape of a lender that compounds.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

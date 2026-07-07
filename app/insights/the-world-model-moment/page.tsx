/**
 * /insights/the-world-model-moment — article body only; the scaffold (hero,
 * JSON-LD, panel, keep-reading, sources, CTA) is ArticleShell, driven by
 * app/insights/_posts.ts.
 * Category: Architecture. News hook: Orca (BAAI, arXiv:2606.30534, 29 June 2026).
 * All Orca claims trace to the paper (docs/Orca_The_World_is_in_Your_Mind.pdf).
 * Kovida claims obey docs/WORLD-LENDING-MODEL-THESIS.md §7–§8: the record/gate
 * are present-tense; the world model is the dividend, built going forward, one
 * light "active research" touch; no shipped-WLM, no counterfactual-knowledge,
 * no $5.7T-unlock claims.
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-world-model-moment')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={
        <>
          The world-model moment.
        </>
      }
      image={{
        alt: 'A latent world taking shape: a luminous lattice condensing into structure.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['rbi-model-risk-management-2026-ai-lending', 'audit-after-the-fact-is-a-confession']}
      sources={[
        { label: 'Orca: The World is in Your Mind — BAAI (arXiv:2606.30534, June 2026)', href: 'https://arxiv.org/abs/2606.30534' },
        { label: 'Orca project site', href: 'https://orca-wm.github.io' },
        { label: 'Ha & Schmidhuber: World Models (arXiv:1803.10122, 2018)', href: 'https://arxiv.org/abs/1803.10122' },
        { label: 'Schrittwieser et al.: MuZero (Nature 588, 2020)', href: 'https://www.nature.com/articles/s41586-020-03051-4' },
      ]}
      cta={{
        heading: 'Meet Kovida.',
        body: 'Kovida — the world lending model — is the research programme this architecture makes possible: a model of the whole lending operation, built on the record KrimOS keeps.',
        href: '/research/world-lending-model',
        label: 'Explore the research',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          On 29 June, the Beijing Academy of Artificial Intelligence released{' '}
          <span className="text-ink">Orca</span>, a research system with an unusually
          philosophical title: <span className="text-ink">The World is in Your Mind</span>. Behind
          the title sits a serious engineering claim. Orca is a{' '}
          <span className="text-cyan">world foundation model</span>: instead of learning to predict
          the next word in a sentence or the next frame in a video, it learns a single latent
          representation of a world&rsquo;s state, and learns how that state changes. The authors
          are direct about the ambition. Intelligence, they argue, is not
          next-token, next-frame or next-action prediction alone; it is the ability to model world
          states — to <span className="text-ink">understand, predict, and act upon the
          world</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The idea has a lineage. Sutton&rsquo;s Dyna sketched it in 1990; Ha and
          Schmidhuber&rsquo;s <span className="text-ink">World Models</span> revived it in 2018;
          MuZero showed in 2020 that a system could learn to plan by modelling only what mattered
          for the decision, without ever being given the rules. A world model, in the technical
          sense, is a learned model of an environment&rsquo;s dynamics: given a state and a
          candidate action, it predicts the next state and the outcome. And once a system has one,
          something genuinely new becomes possible. It can evaluate an action{' '}
          <span className="text-cyan">in imagination</span>, before taking it in reality.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          How a world gets learned
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Orca learns its world in two ways, and the paper borrows the vocabulary of the mind to
          name them.{' '}
          <span className="text-ink">Unconscious learning</span> absorbs dense, natural state
          transitions from 125,000 hours of video: the world simply unfolding, frame after frame.{' '}
          <span className="text-ink">Conscious learning</span> absorbs sparse, meaningful
          transitions described in language: 160 million annotated events, each one a moment
          somebody thought worth naming. Watching everything, and being told what mattered.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Notice what made this possible. The physical world is lucky: it has footage. Billions
          of hours of it, recorded as a by-product of human life, dense enough for a model to
          learn how the world behaves just by watching. Whatever any one paper turns out to be
          worth, the direction is unmistakable: the field&rsquo;s centre of gravity is moving
          toward modelling the state of the world beneath its surfaces.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The worlds without footage
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Here is the question that matters for banking. Some of the most consequential worlds AI
          will ever act in are not physical at all. A lending operation is a world in exactly the
          technical sense: it has <span className="text-ink">states</span> (a borrower, a
          portfolio, a macro backdrop), <span className="text-ink">actions</span> (approve at this
          price, restructure, schedule this contact within permitted hours), and{' '}
          <span className="text-ink">consequences</span> (cure, default, prepayment, complaint,
          recovery). Everything a world model needs — except the footage.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          A lending operation&rsquo;s footage would be the record of its behaviour: every action
          taken, the alternatives that were considered and rejected, the reasoning, and what
          happened next. That record does not exist. Core systems record the{' '}
          <span className="text-ink">transaction</span> and discard the reasoning behind it. The
          decisioning stack is a chain of single-purpose models, each seeing one slice of the
          lifecycle, stitched together by workflow software. And nothing in that stack logs the{' '}
          <span className="text-ink">rejected choice set</span>: the prices, limits and contact
          strategies that were evaluated and not chosen. The raw material a world model would
          learn from is thrown away at the moment of decision, every day, at every lender.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              A lending operation is a world: it has states, actions and consequences. What it
              doesn&rsquo;t have is footage.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The record comes first
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          The order is everything, and it is why you cannot get to an institutional world model
          by pointing a bigger network at a bank&rsquo;s data warehouse.
          The footage has to be <span className="text-ink">produced</span>, and producing it takes
          one runtime running the whole lifecycle — origination through servicing, collections,
          disputes — writing every action to <span className="text-ink">one ledger</span> with the
          choice set it was selected from, the reasoning, and the outcome. And because the world in
          question is a regulated lender, that record has to be produced under discipline: every
          action <span className="text-mint">validated before it executes</span>, so the runtime
          that generates the footage is also the gate that holds each action to the
          operation&rsquo;s obligations before it runs.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              The model of how your lending operation behaves can only be built on a record of how
              it behaved. We&rsquo;re building the record.
            </p>
          </GlassCard>
        </Reveal>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          Kovida: a world model with a jurisdiction
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          This is the thinking behind <span className="text-ink">Kovida — the world lending
          model</span>: the learned, action-conditioned model of a lending operation that becomes
          possible once, and only once, every action, its reasoning and its alternatives live on
          one validated ledger. Where Orca&rsquo;s world is physical and its supervision is video,
          Kovida&rsquo;s world is an operation and its supervision is the ledger KrimOS writes as
          it works. It is built going forward, and it is an active area of Krim research.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The near-term shape is deliberately disciplined: decision support grounded in the
          operation&rsquo;s own recorded behaviour; short-horizon sequence decisions in servicing
          and collections, where outcomes arrive in weeks and a model&rsquo;s claims can be checked
          against reality quickly; scenario exploration whose uncertainty{' '}
          <span className="text-ink">widens honestly with the horizon</span>. The discipline is the
          point. A world model of a regulated operation earns trust the way the operation itself
          does: one validated action, one reconciled outcome at a time.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              We don&rsquo;t claim to know what the applicant you declined would have done. We
              claim the only architecture that could ever responsibly find out.
            </p>
          </GlassCard>
        </Reveal>

        <p className="mt-5 font-sans text-body text-ink-2">
          Orca&rsquo;s title is better than a slogan; it is a definition. A model&rsquo;s grasp of
          a world lives in what it has absorbed of that world. For the physical world, that is a
          hundred and twenty-five thousand hours of video. For a lending operation, it is a ledger
          that remembers everything — including the roads not taken. The world-model moment has
          arrived in AI research. In lending, it begins with the record.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

/**
 * /insights/the-model-nobody-can-validate — the RBI MRM consultation piece.
 * Body only; scaffold is ArticleShell, driven by app/insights/_posts.ts.
 * Category: Risk.
 *
 * Claim boundary: every paragraph reference is verified against the primary text
 * (DRAFTGUIDANCE24062026...pdf, paras 1–64) — see docs/rbi-mrmf-verification.md.
 * The argument deliberately leads with the recommendation Krim has NO commercial
 * interest in (validation capacity / bureau scores). Our interest in pre-execution
 * control is declared, once, near the end. Do not lead with it.
 * No customers, metrics or deployments. Say "provable / validated", never "safe".
 */

import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'

const POST = postBySlug('the-model-nobody-can-validate')

export const metadata = articleMetadata(POST)

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={<>The model nobody can validate.</>}
      image={{
        alt: 'A sealed luminous core: a model whose workings cannot be opened by those who rely on it.',
        objectPosition: '50% 50%',
        tint: 'cyan',
      }}
      related={['rbi-model-risk-management-2026-ai-lending', 'the-agent-isnt-the-hard-part']}
      sources={[
        { label: 'RBI — Draft Guidance on Regulatory Principles for Model Risk Management, 2026 (Press Release 2026-2027/528)', href: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx' },
        { label: 'RBI — FREE-AI Committee report (August 2025)', href: 'https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx' },
      ]}
      cta={{
        heading: 'Read our full response.',
        body: 'We filed five recommendations on the draft Guidance, with every paragraph reference checked against the primary text. The submission is public.',
        href: '/contact',
        label: 'Get in touch',
      }}
    >
      <Reveal>
        <p className="font-sans text-body-lg text-ink-2">
          Pull a credit bureau score in India and you have just relied on a model you cannot
          validate. Not one you have not got round to validating. One that{' '}
          <span className="text-ink">cannot be validated</span>, by you or by anyone else who uses
          it.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is worth sitting with, because RBI&rsquo;s draft Guidance on Regulatory Principles for
          Model Risk Management, out for comment until 24 July, asks every regulated entity to do
          precisely that. Paragraph 29 requires all models, including third-party models, to be
          subject to independent validation. Paragraph 46(i) applies it to third-party models{' '}
          <span className="text-ink">notwithstanding any validation, certification or assurance
          provided by the provider</span>. A vendor&rsquo;s word is explicitly not enough. You have
          to check for yourself.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          This is the right instinct, and it is the load-bearing idea in the whole draft. It closes
          the door on transferring risk through procurement. But applied to the model Indian lending
          uses most, it runs into something no contract can fix.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The scorecard you are not allowed to see
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Bureau scores sit inside the great majority of credit decisions in this market. They are
          also, by design, closed. A credit information company&rsquo;s scorecard is not disclosable
          to the lenders that rely on it. That is not commercial obstinacy on the bureau&rsquo;s part
          and it is not something a better-negotiated contract would unlock. It is structural.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          So read paragraph 29 strictly and something uncomfortable follows: on day one, on the
          single most widely used model in Indian lending, near enough every lender in the country
          is in technical breach. Not because anyone did anything wrong. Because the obligation, as
          drafted, cannot be discharged.
        </p>

        <Reveal>
          <GlassCard accent className="my-10 p-8 md:p-10">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              A rule that cannot be complied with does not raise the standard. It teaches everyone
              that the standard is decorative.
            </p>
          </GlassCard>
        </Reveal>

        <p className="mt-5 font-sans text-body text-ink-2">
          The draft is not blind to the problem. Paragraph 51 anticipates a third-party provider that
          will not disclose enough, and tells the entity to identify the resulting risks and apply
          mitigants, <span className="text-ink">such as limiting the usage</span>. For most AI
          procurement that is a sensible answer. If a vendor will not open its model, use it for less.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          It is not an answer here. You cannot meaningfully limit your use of the score the entire
          market runs on. The same difficulty arrives, from a different direction, with closed
          foundation models, whose providers will not grant audit rights to a mid-sized Indian
          lender and may change the model behind a stable interface.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          What validation can actually mean here
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          There is a version of validation that works on a model you cannot open, and mature model
          risk functions elsewhere already do it. You test the output rather than the mechanism.
          Back-test the third-party score on your own portfolio. Benchmark it against an internal
          challenger. Measure stability, rank-ordering and outcomes across segments, on your own
          book, over time.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          That is substantive work. It catches the things that actually hurt: a score that has
          drifted on your population, that discriminates poorly at the margin you lend to, that
          performs differently for a segment you are growing into. It is arguably more useful than
          reading someone else&rsquo;s methodology document. It simply needs the Guidance to say
          that it counts.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Without that, lenders face a choice between technical non-compliance and dropping a better
          third-party model for a worse internal one they can fully document. Expect a good deal of
          the latter, and understand what it means: a rule written to improve model quality would
          have quietly degraded it.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          RBI can close this one from the inside
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Here is the part that makes this tractable rather than merely awkward. Credit information
          companies are not outside this Guidance looking in. They are named in paragraph 4(xi) as{' '}
          <span className="text-mint">regulated entities subject to it</span>.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          Which means RBI can resolve the whole thing within the same instrument. It could require
          the bureaus to let a lender score its own historical portfolio through the model under
          test conditions. No weights, no source code, no training data, nothing a bureau would
          reasonably consider proprietary. Just enough access for the lender to answer the question
          the regulator is about to ask it. No bilateral contract between a lender and a bureau
          could ever have achieved that. A regulator that supervises both sides can.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          The quieter constraint
        </h2>
        <p className="mt-5 font-sans text-body text-ink-2">
          Underneath all of this sits a problem nobody enjoys naming. The number of people in India
          who can independently validate a machine-learning model is small relative to the number of
          entities that will shortly need one. Paragraph 29&rsquo;s phrasing, &ldquo;independent
          validation by the RE,&rdquo; reads as though that capability must sit in-house.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          If it does, the predictable outcome is not better validation. It is a template validation
          report with a different logo on each firm&rsquo;s copy, which satisfies the obligation and
          tests nothing. Confirming that an entity may discharge the duty through external, pooled or
          group-level validators, including a shared utility, while remaining accountable for the
          outcome under paragraph 8, would produce more real scrutiny than insisting each firm build
          a function it cannot staff.
        </p>

        <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
          We have said this to RBI
        </h2>
        <p className="mt-5 font-sans text-body-lg text-ink-2">
          Krim has filed a response to the consultation. Validation capacity and the models that
          cannot be opened at source is the first of five recommendations in it, and it is the one we
          would most want adopted. It is also, for what it is worth, the one with nothing in it for
          us commercially.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          One of the other five does touch our commercial interest, and we said so in the submission
          rather than leaving a reader to notice: we build controls that check an action before it
          executes, so a recommendation about pre-execution controls is one we benefit from. Our
          view is that a consultation response should declare that at the point it arises, and should
          ask for properties any entity could meet by any means, not for architectures that resemble
          the ones we happen to sell.
        </p>
        <p className="mt-5 font-sans text-body text-ink-2">
          The draft is good. Its central provisions deserve to survive consultation intact. The most
          useful thing anyone can do in the window that remains is point at the places where a right
          principle will not survive contact with how Indian lending actually works, and say so
          precisely enough to be fixed.
        </p>
      </Reveal>
    </ArticleShell>
  )
}

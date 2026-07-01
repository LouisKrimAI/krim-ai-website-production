/**
 * /insights/audit-after-the-fact-is-a-confession — article. STANDALONE shell.
 * Category: Method. Every statistic/regulatory claim traces to a VERIFIED FACT (see Sources).
 * Author is the organization "Krim" — no individual byline.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import ArticleImage from '@/components/ArticleImage'
import ArticlePanel from '@/components/ArticlePanel'
import BackToInsights from '@/components/BackToInsights'

const SLUG = 'audit-after-the-fact-is-a-confession'
const TITLE = 'Audit after the fact is a confession'
const DEK =
  'Regulators increasingly want AI decisions governed, explainable and overseen before they run. In regulated work, “explain it later” is structurally too late. The discipline that answers it is pre-execution validation.'
const CATEGORY = 'Method'
const DATE_ISO = '2026-05-12'
const DATE_LONG = '12 May 2026'
const READING = 7

export const metadata: Metadata = {
  title: TITLE,
  description: DEK,
  alternates: { canonical: `https://krim.ai/insights/${SLUG}` },
  openGraph: { title: TITLE, description: DEK, url: `https://krim.ai/insights/${SLUG}`, type: 'article' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://krim.ai/insights' },
    { '@type': 'ListItem', position: 3, name: TITLE, item: `https://krim.ai/insights/${SLUG}` },
  ],
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DEK,
  datePublished: DATE_ISO,
  dateModified: DATE_ISO,
  author: { '@type': 'Organization', name: 'Krim' },
  publisher: { '@type': 'Organization', name: 'Krim' },
  mainEntityOfPage: `https://krim.ai/insights/${SLUG}`,
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>{CATEGORY}</Eyebrow>
              <h1 className="mt-5 font-serif text-display-2 leading-tight text-ink md:text-display-3">
                Audit after the fact is a confession.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">{DEK}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-3">
                By Krim · {DATE_LONG} · {READING} min read
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- Header image ---- */}
        <ArticleImage
          src="/images/cinematic/audit.webp"
          alt="A sealed record of light on a dark server floor."
          heightClass="h-[clamp(200px,30vw,360px)]"
          objectPosition="50% 45%"
          tint="cyan"
        />

        {/* ---- Body ---- */}
        <Section className="!pt-0">
          <ArticlePanel>
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

            {/* Keep reading */}
            <Reveal>
              <div className="mt-14 border-t border-soft pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Keep reading</p>
                <div className="mt-4 grid gap-3">
                  <Link href="/insights/the-cost-of-being-wrong" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The cost of being wrong <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link href="/insights/the-automation-gap" className="group font-serif text-[1.2rem] text-ink transition-colors hover:text-mint">
                    The automation gap <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
                <div className="mt-8">
                  <BackToInsights />
                </div>
              </div>
            </Reveal>

            {/* Sources */}
            <div className="mt-12 border-t border-soft pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Sources</p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed text-ink-3">
                <li>
                  <a href="https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    Federal Reserve: SR 11-7 (model risk management)
                  </a>
                </li>
                <li>
                  <a href="https://artificialintelligenceact.eu/annex/3/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    EU AI Act: Annex III (high-risk: creditworthiness)
                  </a>
                </li>
                <li>
                  <a href="https://artificialintelligenceact.eu/article/14/" target="_blank" rel="noopener noreferrer" className="underline decoration-soft underline-offset-4 transition-colors hover:text-mint">
                    EU AI Act: Article 14 (human oversight)
                  </a>
                </li>
              </ul>
            </div>
          </ArticlePanel>
        </Section>

        {/* ---- Close CTA ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The AI your regulator can read.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                KrimOS proves every action against law, policy, consent and context before it fires,
                so the record a regulator asks for already exists.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/epistemic-ai" variant="secondary">
                  What is Epistemic AI?
                </CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

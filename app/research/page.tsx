/**
 * /research — the foundations & frontier page. The intellect behind the product:
 * how human judgment is made machine-checkable (Navya-Nyāya → the 33 validators),
 * where the system is heading (the lending world model, framed as a research
 * DIRECTION, not a claimed finished artifact), and why pre-execution validation
 * is treated as a discipline. STANDALONE shell (not LayerShell), like app/page.tsx
 * and app/platform/page.tsx.
 *
 * HONESTY: this is a POSITIONING statement of research foundations and directions.
 * It invents no publications, papers, citations, named researchers, partnerships
 * or results — every claim traces to docs/krim-content.md / docs/KRIM-BRIEF.md.
 * Distinct from /epistemic-ai (the buyer category) and /company (the org).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at Krim is the work under the product: making human judgment machine-checkable through a formal-logic tradition (the 33 validators of Krim-Nyāya), building toward a connected model of how a lending operation behaves, and treating pre-execution validation as a discipline — proving an action before it acts, not auditing it after.',
  alternates: { canonical: 'https://krim.ai/research' },
  openGraph: { title: 'Research — the foundations under the product', url: 'https://krim.ai/research' },
}

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://krim.ai/research' },
  ],
}

// The three families of Krim-Nyāya — docs/krim-content.md · Krim-Nyāya.
// Told plainly: what each family asks of a proposed action, no mysticism.
const FAMILIES = [
  {
    name: 'Pramāṇa',
    gloss: 'Sources of knowledge',
    body: 'Every premise an action rests on must be verifiable before it proceeds — the right-party check, the consent record, the balance, the rule in force today.',
  },
  {
    name: 'Doṣa',
    gloss: 'Classes of error',
    body: 'The proposed action is tested against a catalogue of formal failure modes — the named ways reasoning goes wrong — so a flawed inference is caught, not committed.',
  },
  {
    name: 'Yogyatā',
    gloss: 'Fitness for action',
    body: 'Time, place, agent, recipient, instrument, manner and purpose must all be satisfied — the action has to fit its moment, not merely be permissible in the abstract.',
  },
]

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero — answer-first: what research at Krim is ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Research at Krim</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The work under the product.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                Krim is a technology research company before it is a product company. The hard
                questions are foundational: how do you make a human judgment{' '}
                <span className="text-mint">machine-checkable</span>, how does a system learn a
                whole operation, and how do you <span className="text-ink">prove an action before
                it acts</span> — not explain it after. The product is what those answers look like
                in production.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform/kendra" variant="secondary">
                  See it in the runtime
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Formalising judgment — Navya-Nyāya → the 33 validators ---- */}
        <Section hairline>
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <Eyebrow>Formalising judgment</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Judgment, written down so a machine can check it.
                </h2>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Long before modern logic, scholars in <span className="text-ink">Mithila</span>{' '}
                  built <span className="text-ink">Navya-Nyāya</span> — a tradition of predicate
                  reasoning that spent two thousand years on a single problem: stating exactly when
                  a conclusion is warranted, and when it is not.
                </p>
                <p className="mt-5 max-w-[54ch] font-sans text-body text-ink-2">
                  That is the same problem a regulator poses. So we read it as engineering, not
                  heritage — no mysticism, no ornament. From it we derive{' '}
                  <span className="text-mint">33 validators</span> in three families. Each runs
                  before an action fires and returns one of three verdicts:{' '}
                  <span className="text-mint">pass</span>,{' '}
                  <span className="text-gold">amber</span> or{' '}
                  <span className="text-fail">fail</span>.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {FAMILIES.map((f, i) => (
                <Reveal key={f.name} delay={0.1 + i * 0.08}>
                  <div className="glass lume p-7 md:p-8">
                    <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                    <div className="mt-6 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{f.name}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                        {f.gloss}
                      </span>
                    </div>
                    <p className="mt-3 font-sans text-body text-ink-2">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---- 3 · The lending world model — the research DIRECTION (honest) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow tone="cyan">The direction we are building toward</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Learning to see a lending operation whole.
                </h2>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Because one runtime runs the whole lifecycle and records every action with its
                  reasoning on one ledger, it accumulates something rare: a connected account of how
                  borrowers, products, channels, rules and outcomes actually move over time.
                </p>
                <p className="mt-5 max-w-[54ch] font-sans text-body text-ink-2">
                  Turning that record into a <span className="text-cyan">world model</span> — a
                  representation the system can reason and plan against — is the research direction
                  we are working toward, not a finished artifact we claim. It is honest about where
                  it is: a model that <span className="text-ink">deepens as the system observes more
                  of the operation</span>, governed inside the institution&rsquo;s own perimeter.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  Why sovereignty is load-bearing
                </p>
                <p className="mt-5 font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-ink">
                  Only a system an institution trusts inside its walls ever gets to watch the whole
                  operation — so the intelligence and the sovereignty are the same commitment.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Validation science — pre-execution as a discipline ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Validation science</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Proving before acting is the harder path. We chose it.
              </h2>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                Most AI safety is read after the fact — a log to inspect once something has already
                happened. In regulated work that is too late: a wrongful disclosure cannot be
                unmade, a misquoted figure cannot be unspoken. So we treat{' '}
                <span className="text-mint">pre-execution validation</span> as its own discipline —
                checking a proposed action against law, policy, consent and context{' '}
                <span className="text-ink">before</span> it can fire.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <GlassCard className="mx-auto mt-12 max-w-[820px] p-8 text-center md:p-10">
              <p className="font-serif text-[clamp(1.3rem,2.3vw,1.75rem)] leading-snug text-ink">
                The aim isn&rsquo;t fewer violations. It is to make the worst ones structurally
                impossible — and that is a research problem before it is a product one.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                Pre-execution, not post-audit
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- 5 · The frontier — an honest note on what is open ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">The frontier</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  The open questions are the interesting ones.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-sans text-body-lg text-ink-2">
                  How a learned model of an operation and a formal validator should be composed; how a
                  system improves from its own outcomes without drifting from the rules; how proof
                  stays fast enough to sit in front of every action. These are unsolved, and we say so.
                  The foundations here are real and credible{' '}
                  <span className="text-ink">— and they are built to grow.</span>
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See where the research already runs in production.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                The foundations aren&rsquo;t a roadmap slide — they are the runtime your teams can
                watch validate every action, live.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
                  Explore the platform
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

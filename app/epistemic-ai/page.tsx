/**
 * /epistemic-ai — the category page. Krim's deliberate GEO/entity anchor: it
 * defines, and owns, the term "Epistemic AI". Answer-first throughout so an
 * answer-engine can quote the definition cleanly.
 *
 * Standalone shell (SiteHeader + OrbBackdrop + main z-10 + SiteFooter), not
 * LayerShell — matches app/platform/page.tsx and app/page.tsx.
 *
 * Flow: answer-first hero → the two neighbours (autonomous / safe) → the
 * ceiling post-hoc AI hits → the two tests / one epistemology (justify + revise)
 * → the lineage (Krim-Nyāya, Navya-Nyāya, Mithila) → in practice → FAQ → close.
 *
 * Facts: docs/geo-kit.md, docs/krim-content.md. Every claim traces there.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Epistemic AI',
  description:
    'Epistemic AI is the category Krim defines: AI whose every action is validated before it fires, and whose reasoning an auditor can read end to end. Distinct from autonomous AI (which implies no human) and safe AI (which is defensive and does not run the operation).',
  alternates: { canonical: 'https://krim.ai/epistemic-ai' },
  openGraph: { title: 'Epistemic AI', url: 'https://krim.ai/epistemic-ai' },
}

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20Epistemic%20AI'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Epistemic AI', item: 'https://krim.ai/epistemic-ai' },
  ],
}

// Real Q&As, drawn verbatim-in-substance from docs/geo-kit.md FAQPage.
const FAQ = [
  {
    q: 'What is Epistemic AI?',
    a: 'Epistemic AI is the category Krim defines: AI whose every action is validated before it fires and whose reasoning an auditor can read end to end. It is distinct from autonomous AI (which implies no human) and safe AI (which is defensive and does not run the operation).',
  },
  {
    q: 'How is it different from autonomous AI and safe AI?',
    a: 'Autonomous AI implies no human in the loop, which regulators reject. Safe AI is defensive — it constrains a model but does not run the operation. Epistemic AI does the work and stays accountable for every action it takes.',
  },
  {
    q: 'How does Epistemic AI stay compliant in regulated work?',
    a: 'Validation is pre-execution, not post-audit. Every proposed action passes the Krim-Nyāya gate of 33 validators (pass, amber or fail) before it executes, so non-compliant actions never fire. Violations are made structurally impossible rather than caught afterward.',
  },
  {
    q: 'What is Krim-Nyāya?',
    a: 'Krim-Nyāya is the KrimOS validation runtime: 33 validators derived from Mithila’s Navya-Nyāya formal logic, in three families — Pramāṇa (is the premise verifiable?), Doṣa (does it match a known failure mode?), and Yogyatā (is it fit for action — time, place, agent, recipient, instrument, manner, purpose?).',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// The two neighbouring categories Epistemic AI is defined against.
const NEIGHBOURS = [
  {
    name: 'Autonomous AI',
    claim: 'Acts without a human.',
    body: 'Autonomy implies no one is accountable in the loop — the posture regulators reject outright. The question they ask is never “can it act alone?” but “can you answer for what it did?”',
  },
  {
    name: 'Safe AI',
    claim: 'Defends, but doesn’t run the work.',
    body: 'Safety work guards a model from the outside — filters, guardrails, refusals. Necessary, but defensive: it constrains a system, it does not operate one. The regulated work still waits for a human.',
  },
]

// The two tests one epistemology must pass: justify a belief, and revise it.
const TESTS = [
  {
    eyebrow: 'Test one · justify',
    title: 'It can justify every action before it takes it.',
    body: 'Before a co-worker acts, the proposed action passes Krim-Nyāya — 33 validators against law, policy, consent and context. Nothing fires until it has cleared the gate, and the reasoning that cleared it is written down.',
    tint: 'mint' as const,
  },
  {
    eyebrow: 'Test two · revise',
    title: 'It revises what it believes from what it sees.',
    body: 'Every outcome is recorded and fed back through Krim-Learn’s ten learning loops. The model of your operation is corrected by evidence, so what the system holds true tracks how your world actually behaves.',
    tint: 'cyan' as const,
  },
]

// The three Navya-Nyāya validator families — substance, not mysticism.
const FAMILIES = [
  {
    name: 'Pramāṇa',
    gloss: 'Sources of knowledge',
    body: 'Every premise an action rests on must be verifiable before it proceeds. No claim without a source.',
  },
  {
    name: 'Doṣa',
    gloss: 'Classes of error',
    body: 'The action is checked against a catalogue of formal failure modes — the known ways a regulated step goes wrong.',
  },
  {
    name: 'Yogyatā',
    gloss: 'Fitness for action',
    body: 'Time, place, agent, recipient, instrument, manner and purpose must all be satisfied for the action to be fit to take.',
  },
]

export default function EpistemicAIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero — the answer, quotable and self-contained ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px]">
            <Reveal>
              <Eyebrow>Epistemic AI</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The AI your regulator can read.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
                <span className="text-ink">Epistemic AI is AI that can justify every action before it
                takes it — and read its own reasoning back to you.</span> It is the category Krim
                defines: AI whose every action is{' '}
                <span className="text-mint">validated before it fires</span>, and whose reasoning an
                auditor can follow end to end. Not a model that talks. A system that can answer for
                what it did.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform/kendra" variant="secondary">
                  See how it validates
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The two neighbours it is defined against ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why a new name</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              The two AIs everyone already named miss the regulated case.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The market sells two postures, and regulated work can use neither as it stands.
              Epistemic AI is the third — defined against both.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {NEIGHBOURS.map((n, i) => (
              <Reveal key={n.name} delay={i * 0.1}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{n.name}</h3>
                  <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-3">
                    {n.claim}
                  </p>
                  <p className="mt-4 font-sans text-body text-ink-2">{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-10 max-w-[56ch] text-center font-serif text-[1.2rem] italic leading-snug text-ink-2">
              The AI that wins regulated work isn’t the one that acts alone, or the one that only
              defends — it’s the one that can <span className="not-italic text-ink">show its work</span>.
            </p>
          </Reveal>
        </Section>

        {/* ---- 3 · The ceiling post-hoc AI hits ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="gold">The ceiling</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  You can’t deploy an action you can only explain afterward.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  In regulated work, one wrong action is a compliance event — and it cannot be
                  unmade. A non-compliant call can’t be unspoken; a wrongful disclosure can’t be
                  undone. <span className="text-ink">Post-hoc audit cannot recover what
                  pre-execution validation prevents.</span> This is the ceiling every banking AI
                  pilot has hit — and stopped.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  An explanation after the fact is a confession. Epistemic AI is built to clear the
                  action <span className="text-mint">before</span> it fires.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Pre-execution, not post-audit
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · The two tests / one epistemology ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>What makes it epistemic</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              To know, a system must justify what it believes — and change it when it’s wrong.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Epistemology has always asked two things of knowledge. Epistemic AI is the AI that
              meets both: it must <span className="text-mint">justify</span> a belief before it acts
              on it, and <span className="text-cyan">revise</span> that belief from what it sees.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTS.map((t, i) => (
              <Reveal key={t.eyebrow} delay={i * 0.1}>
                <div className="glass lume h-full p-8 md:p-9">
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${t.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'}`}
                  />
                  <p
                    className={`mt-6 font-mono text-[11px] uppercase tracking-[0.18em] ${t.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}
                  >
                    {t.eyebrow}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.45rem] leading-tight text-ink">{t.title}</h3>
                  <p className="mt-4 font-sans text-body text-ink-2">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.18}>
            <p className="mt-10 text-center font-serif text-[1.15rem] italic text-ink-2">
              Validation is how it justifies. Learning is how it revises. Together, they are one
              epistemology.
            </p>
          </Reveal>
        </Section>

        {/* ---- 5 · The lineage — Krim-Nyāya, Navya-Nyāya, Mithila ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The lineage</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The logic of valid knowledge, written down two thousand years ago.
            </h2>
            <p className="mt-6 max-w-[64ch] font-sans text-body-lg text-ink-2">
              The justification half runs on <span className="text-ink">Krim-Nyāya</span> — a gate
              of <span className="text-mint">33 validators</span> derived from{' '}
              <span className="text-ink">Navya-Nyāya</span>, the formal logic tradition of Mithila.
              It is a real predicate calculus for testing whether a claim is justified, not a
              metaphor. It asks three questions of every action, each returning pass, amber or fail.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FAMILIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.5rem] leading-none text-ink">{f.name}</h3>
                  <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-3">
                    {f.gloss}
                  </p>
                  <p className="mt-4 font-sans text-body text-ink-2">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · In practice ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>In practice</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Where the difference actually lands.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Most AI checks its work after it runs — a log to read once something has already
                  happened. Epistemic AI moves the check in front of the action, so the
                  non-compliant step never executes and the reasoning is on the record by design.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <div className="space-y-7">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                      Post-hoc AI
                    </p>
                    <p className="mt-2 font-sans text-body text-ink-2">
                      Act, then audit. The wrong action has already fired; the log explains what
                      went wrong after it cannot be undone.
                    </p>
                  </div>
                  <div className="border-t border-soft pt-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                      Epistemic AI
                    </p>
                    <p className="mt-2 font-sans text-body text-ink-2">
                      Validate, then act. The action clears Krim-Nyāya before it executes; what
                      doesn’t pass never runs, and what does carries its reasoning with it.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · FAQ ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Straight answers</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              The questions a careful buyer asks first.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 0.08}>
                <div className="glass h-full p-7 md:p-8">
                  <h3 className="font-serif text-[1.3rem] leading-snug text-ink">{f.q}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 8 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See AI that can answer for itself.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                Epistemic AI runs as KrimOS — the operating system for regulated operations, where
                every action is validated before it fires.
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

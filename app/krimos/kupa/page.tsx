/**
 * /krimos/kupa — Kupa & Kula, the enterprise surface of KrimOS (merged page).
 * Kupa is the command center; Kula is the plain-language way in. One page
 * because they are one seat: your teams direct the work (Kula) and hold the
 * controls over everything that runs (Kupa). URL stays /krimos/kupa;
 * /krimos/kula permanently redirects here (next.config.mjs).
 * Shape: hero → the pair, named → Kula: Ask → Suggest → Act → Learn → a twin
 * for every seat → Kupa: See · Set · Step in · Prove → the cockpit
 * (DashboardExplorer) → two seats, one operation → close.
 * Kula is the INTERFACE — never the mind; it never bypasses human sign-off.
 * Facts: docs/krim-content.md. Invent nothing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import LayerShell from '@/components/krimos/LayerShell'
import DashboardExplorer from '@/components/krimos/DashboardExplorer'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kupa & Kula — for your teams',
  description:
    'Ask in plain language and Kula builds the governed plan. Kupa is the command center: see every action, set the rules, step in, and prove what happened.',
  alternates: { canonical: 'https://www.krim.ai/krimos/kupa' },
  openGraph: {
    title: 'Kupa & Kula — for your teams',
    description:
      'Ask in plain language and Kula builds the governed plan. Kupa is the command center: see every action, set the rules, step in, and prove what happened.',
    url: 'https://www.krim.ai/krimos/kupa',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://www.krim.ai/krimos' },
    { '@type': 'ListItem', position: 3, name: 'Kupa & Kula', item: 'https://www.krim.ai/krimos/kupa' },
  ],
}

// The pair, named — the legend that makes one page out of two surfaces.
const PAIR = [
  {
    name: 'Kula',
    tag: 'The way in',
    body: 'You describe the outcome you want, in plain language. Kula turns it into a plan for your team to approve.',
  },
  {
    name: 'Kupa',
    tag: 'The command center',
    body: 'The glass cockpit over everything that runs: see every action, set the rules, step in, and prove what happened.',
  },
]

// Ask → Suggest → Act → Learn — the four beats of how a request becomes governed
// work (docs/krim-content.md · Kula · Kupa). The human is never skipped.
const FLOW = [
  {
    step: 'Ask',
    title: 'You write what you want.',
    body: 'In plain language: “bring down missed payments in the first month next quarter.” No query language, no ticket to a build team.',
  },
  {
    step: 'Suggest',
    title: 'Kula drafts the plan.',
    body: 'The segments, the flows, the co-workers to run them, and the rules that apply.',
  },
  {
    step: 'Act',
    title: 'It runs on your approval.',
    body: 'The plan clears validation, then comes to Kupa for review. Approve it and it runs, each action checked against policy before it fires.',
  },
  {
    step: 'Learn',
    title: 'Every outcome sharpens the next.',
    body: 'Outcomes feed back through the runtime, so the next plan starts from what the last one learned.',
  },
]

// One twin per role, one source of truth across the institution
// (docs/krim-content.md · Solutions — by role).
const ROLES = [
  'Chief Lending Officer',
  'Chief Risk Officer',
  'Head of Collections',
  'Head of Servicing',
  'Head of Compliance',
  'Head of Credit Ops',
  'Head of Analytics',
  'Contact Centre Lead',
]

// Control as four verbs — Kupa's spine.
const CONTROLS = [
  { verb: 'See', title: 'Everything, live', body: 'Dashboards and queues across every stage and segment: what is moving, what is stuck, every SLA.' },
  { verb: 'Set', title: 'The rules', body: 'Which co-workers run for which segments, with contact windows, frequency caps, channels per jurisdiction, offers and tests.' },
  { verb: 'Step in', title: 'Whenever it matters', body: 'Sign-off on low-confidence or high-risk decisions, and one-click pause or stop of any co-worker, campaign or segment.' },
  { verb: 'Prove', title: 'What happened', body: 'Every interaction linked to the policy that applied, the validation result and the decision: what ran, why, and under which rule.' },
]

// Two seats, two questions — the same runtime, and how the work changes. Concrete
// and realist-aspirational; capability framing, never a claimed result.
const SCENARIOS = [
  {
    role: 'Head of Collections',
    ask: 'Bring down first-payment defaults next quarter, and keep every contact inside the rules.',
    shift: (
      <>
        Kula drafts the plan: the at-risk segments, the outreach, the co-workers to run it, every
        contact{' '}
        <span className="text-mint">pre-checked against contact-window and fairness rules</span>. It
        runs on her sign-off, and she watches it in Kupa. The campaign that used to wait on a build
        team starts the same afternoon.
      </>
    ),
  },
  {
    role: 'Chief Risk Officer',
    ask: 'Show me where policy exceptions are clustering this month, and what is driving them.',
    shift: (
      <>
        He reads the answer off the same source of truth, the reasoning attached, then asks Kula to
        tighten the rule, and the change{' '}
        <span className="text-mint">clears validation before it takes effect</span>. He watches the
        risk form in real time instead of finding it in a month-end report, and tightens the rule
        while it is still small.
      </>
    ),
  },
]

export default function KupaKulaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kupa">
        {/* ---- 1 · Hero: one seat, two surfaces ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>For your teams</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                Talk to your operation. <span className="text-grad-carved">Hold the controls.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Ask in <span className="text-mint">plain language</span> and Kula builds the plan.
                Watch it run, set the rules and step in from{' '}
                <span className="text-ink">Kupa, the command center</span>.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The pair, named — the legend for the page ---- */}
        <Section hairline className="!pt-2">
          <div className="mx-auto grid max-w-[900px] gap-5 sm:grid-cols-2">
            {PAIR.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 0.08}>
                <GlassCard className="flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-[1.6rem] leading-tight text-ink">{p.name}</h2>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/85">
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{p.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Kula: Ask → Suggest → Act → Learn ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">Kula</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Ask in plain language.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              You describe the outcome. Kula drafts the plan, checks it against your rules, and{' '}
              <span className="text-mint">your team approves it</span>. Then it runs.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <Reveal key={f.step} delay={(i % 4) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                    {i + 1} · {f.step}
                  </span>
                  <h3 className="mt-4 font-serif text-[1.35rem] leading-tight text-ink">{f.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.14}>
            <p className="mt-9 max-w-[62ch] font-sans text-body text-ink-3">
              Kula is the way in. The thinking and the rules live behind it, in{' '}
              <Link href="/krimos/kendra" className="text-ink-2 underline-offset-4 transition-colors hover:text-mint hover:underline">
                Kendra
              </Link>
              .
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · The role-twin — one twin per seat, one source of truth ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>A twin for every role</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Every role gets its own view.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Each user works with a digital twin tuned to their role: the questions they ask,
                  the work they own, the rules they answer to. Underneath sits{' '}
                  <span className="text-ink">one source of truth</span> across the institution, the
                  same numbers shaped to each seat.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  From the Chief Risk Officer to the contact-centre floor, every team reads the same
                  operation through its own twin, and supervises it in Kupa, where the decisions that
                  matter come back for sign-off.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  One twin per role · one source of truth
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {ROLES.map((r) => (
                    <li key={r} className="flex items-baseline gap-3 font-sans text-body text-ink-2">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-mint" />
                      {r}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Kupa: the four controls ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Kupa</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              You see everything, and can step in anywhere.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The co-workers run the operation; <span className="text-ink">you keep the controls</span>.
              Full-lifecycle visibility, and the levers to act on what you see, across sales,
              servicing, collections and retention.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CONTROLS.map((c, i) => (
              <Reveal key={c.verb} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">{c.verb}</p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · The cockpit — one per operational section + the cross-cutting views ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">Kupa · Dashboards</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The whole operation, on one screen.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Kupa draws from <span className="text-mint">one source of truth</span> and refreshes
              live. A view for each stage of the lifecycle, a view for what cuts across it, and
              teams compose the ones they need.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <DashboardExplorer />
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard
              accent
              className="mt-5 flex flex-col gap-3 p-7 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <p className="max-w-[60ch] font-sans text-body text-ink-2">
                Ask in plain language and the answer comes back in moments. A board pack or an
                inspection-ready report is generated on demand.
              </p>
              <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                Live · on demand
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- 7 · Two seats — concrete scenarios, how the work actually changes ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="mint">Two seats, one operation</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The work looks different in every seat.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              A collections lead and a risk officer come to the same Kula for completely different
              things, and both get an answer they can act on.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SCENARIOS.map((s, i) => (
              <Reveal key={s.role} delay={(i % 2) * 0.08}>
                <GlassCard className="flex h-full flex-col p-8 md:p-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                    {s.role}
                  </p>
                  <p className="mt-5 font-serif text-[clamp(1.3rem,2.2vw,1.6rem)] leading-snug text-ink">
                    &ldquo;{s.ask}&rdquo;
                  </p>
                  <p className="mt-5 flex-1 font-sans text-body text-ink-2">{s.shift}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 8 · Close — the payoff ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard accent className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">Nothing happens out of view.</h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Your teams ask in their own words and stay in control of every decision. Every action is{' '}
                <span className="text-mint">validated before it fires</span>, supervised where it
                matters, and on the record after, so the people who answer for the operation can
                always see what ran, why, and under which rule.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}

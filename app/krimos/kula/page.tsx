/**
 * /krimos/kula — Kula, the enterprise interface (a core KrimOS layer).
 * Built to the house standard (docs/HOUSE-STYLE.md): content-first, homepage
 * glass, a real image — no hand-built devices (§7).
 * Shape: what it is (hero, real image) → the role-twin → how it works
 *   (Ask → Suggest → Act → Learn) → every role, one source of truth → close.
 * Kula is the INTERFACE — never the mind. The thinking happens in Kendra, the
 * runtime behind it; Kula never bypasses human sign-off or policy checks.
 * Facts: docs/krim-content.md (Kula · Kupa · Solutions — by role). Invent nothing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import LayerShell from '@/components/krimos/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kula — for your teams',
  description:
    'Kula is how your teams reach KrimOS in plain language: each user meets a digital twin tuned to their role. Kula is the way in; the thinking happens in the runtime behind it, and it never bypasses human sign-off.',
  alternates: { canonical: 'https://www.krim.ai/krimos/kula' },
  openGraph: {
    title: 'Kula — for your teams',
    description:
      'Kula is how your teams reach KrimOS in plain language: each user meets a digital twin tuned to their role. Kula is the way in; the thinking happens in the runtime behind it, and it never bypasses human sign-off.',
    url: 'https://www.krim.ai/krimos/kula',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://www.krim.ai/krimos' },
    { '@type': 'ListItem', position: 3, name: 'Kula', item: 'https://www.krim.ai/krimos/kula' },
  ],
}

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
    title: 'Kula proposes a governed plan.',
    body: 'Segments, flows, co-worker combinations and the policy constraints that bind them, drafted from Kriya primitives. Nothing has run yet.',
  },
  {
    step: 'Act',
    title: 'It runs only once you sign off.',
    body: 'The plan is routed through validation and surfaced in Kupa for review. On your approval it executes, every action checked against policy before it fires.',
  },
  {
    step: 'Learn',
    title: 'Every outcome sharpens the next.',
    body: 'What the work teaches feeds back through the runtime, so the next plan starts from what the last one learned.',
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
        <span className="text-mint">clears validation before it takes effect</span>. Risk that once
        surfaced only in a month-end report, he can watch form in real time and tighten while it is
        still small.
      </>
    ),
  },
]

export default function KulaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kula">
        {/* ---- 1 · Hero: what it is ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>For your teams</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                Talk to <span className="text-grad">your operation</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Ask for an outcome in <span className="text-mint">plain language, by text or
                voice</span>. Kula reasons in the runtime, builds the plan, and{' '}
                <span className="text-ink">runs it on your sign-off</span>, tuned to your role.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The role-twin — one twin per seat, one source of truth.
               (Merged: the former "Across the institution" section folded its
               roles list + Kupa pointer in here, so the twin idea is told once.) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>A twin for every seat</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Everyone meets the operation in their own language.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Each user works with a digital twin tuned to their role: the questions they ask,
                  the work they own, the rules they answer to. Underneath sits{' '}
                  <span className="text-ink">one source of truth</span> across the institution, the
                  same numbers shaped to each seat.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                  From the Chief Risk Officer to the contact-centre floor, every team reads the same
                  operation through its own twin, and supervises it in{' '}
                  <Link
                    href="/krimos/kupa"
                    className="text-ink underline-offset-4 transition-colors hover:text-mint hover:underline"
                  >
                    Kupa
                  </Link>
                  , where the calls that matter come back for sign-off.
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

        {/* ---- 3 · How it works: Ask → Suggest → Act → Learn ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">How it works</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              From a sentence to governed work, without skipping the human.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              You describe the outcome. Kula proposes the plan, validation checks it, and your people
              approve it before anything runs. Ask, suggest, act, learn, and round again.
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
              It never acts on its own. Act stays locked until a person approves, and the runtime
              validates every action against policy before it fires. Kula is the way in; the
              governance lives behind it, in{' '}
              <Link href="/krimos/kendra" className="text-ink-2 underline-offset-4 transition-colors hover:text-mint hover:underline">
                Kendra
              </Link>
              .
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · Two seats — concrete scenarios, how the work actually changes ---- */}
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

        {/* ---- 5 · Close: impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">Plain language in. Governed work out.</h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Your teams ask in their own words and stay in control of every call. The runtime
                does the thinking, and nothing runs until a person says so.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}

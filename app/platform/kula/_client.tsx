'use client'

/**
 * Kula — the animated pieces. Three client components, all GPU-only
 * (opacity · transform · colour) and reduced-motion-safe: useReducedMotion
 * settles each to its final, meaningful state instantly. No CLS — every
 * device reserves its space and only fades/colours content in.
 *
 *   PlanAssembly  — section 2 signature device. An operator intent becomes a
 *                   governed plan in four labelled beats: Ask → Suggest → Act →
 *                   Learn, with an explicit "awaiting your approval" gate before
 *                   Act. The proposed plan reads cyan (thinking); once approved
 *                   it settles mint (validated). It never skips the human, and
 *                   the play can be triggered/replayed by a real button — no
 *                   un-skippable typewriter.
 *   RoleTwin      — section 3 signature device. The same interface lightly
 *                   re-skinning per role: a small role switcher re-labels the
 *                   view over one shared source of truth.
 *   KupaCockpit   — section 4 signature device. One calm, instrument-like
 *                   cockpit surface in glass, stamped "illustrative · simulated
 *                   data": a unified operational view, a human-in-the-loop
 *                   review queue, live monitoring with one-click kill switches,
 *                   and an audit workspace.
 *
 * Grammar: cyan = proposed/thinking · mint = validated/approved · gold = exception.
 */

import { useId, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-12% 0px -12% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'
const GOLD = '#C8A14A'

/* ═══════════════════════════ 2 · Plan assembly ═════════════════════════════ */
/* The signature device: an intent becomes a governed, validated plan in four
   labelled beats. The plan is proposed in cyan; an explicit approval gate sits
   before Act; on approval the plan settles mint. Driven by a real control so
   reading is never blocked and the human is never skipped. */

type Beat = {
  key: 'ask' | 'suggest' | 'act' | 'learn'
  label: string
  note: string
}

const BEATS: Beat[] = [
  { key: 'ask', label: 'Ask', note: 'You state the outcome you want, in plain language.' },
  { key: 'suggest', label: 'Suggest', note: 'Kula proposes a plan — segments, steps, co-workers, guardrails.' },
  { key: 'act', label: 'Act', note: 'On your approval it runs — every action validated before it fires.' },
  { key: 'learn', label: 'Learn', note: 'What the outcome teaches sharpens the next plan.' },
]

const INTENT = 'Increase on-time payments in 1–30 DPD by 5% next quarter.'

const PLAN_STEPS = [
  { k: 'segment', label: 'Segment', detail: '1–30 DPD · 4 risk-banded cohorts' },
  { k: 'coworkers', label: 'Co-workers', detail: 'Karta-Cure · Vox-Out · Doc' },
  { k: 'steps', label: 'Sequence', detail: 'Reminder → offer → follow-up, paced per cohort' },
  { k: 'guardrails', label: 'Guardrails', detail: 'Contact limits · hardship signposting · policy gates' },
]

export function PlanAssembly() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // inView drives the proposal reveal (cyan plan draws in on scroll); the human
  // still has to approve to reach mint. No setState-in-render, no CLS.
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const [approval, setApproval] = useState<'pending' | 'awaiting' | 'approved'>('pending')
  const groupId = useId()

  // the plan is "proposed" once the section is on screen (or immediately under
  // reduced motion); approval is a separate, human gate on top of that.
  const proposed = reduce || inView
  const approved = approval === 'approved'
  const awaiting = approval === 'awaiting'

  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }

  // beat lighting: cyan while proposed; the whole chain goes mint once approved.
  const beatTone = (b: Beat['key']): 'mint' | 'cyan' | 'dim' => {
    if (approved) return 'mint'
    if (b === 'ask' || b === 'suggest') return proposed ? 'cyan' : 'dim'
    return 'dim'
  }

  return (
    <div ref={ref} className="glass overflow-hidden p-6 md:p-9">
      {/* ── the four beats ── */}
      <ol className="grid gap-px sm:grid-cols-4" aria-label="How a plan is built">
        {BEATS.map((b, i) => {
          const tone = beatTone(b.key)
          const color = tone === 'mint' ? MINT : tone === 'cyan' ? CYAN : undefined
          return (
            <li key={b.key} className="relative px-1.5 py-1 first:pl-0">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors duration-500"
                  style={{
                    borderColor: color ? `${color}66` : 'rgba(255,255,255,0.14)',
                    color: color ?? 'var(--text-3)',
                    background: color ? `${color}14` : 'transparent',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-500"
                  style={{ color: color ?? 'var(--text-3)' }}
                >
                  {b.label}
                </span>
              </div>
              <p className="mt-2 max-w-[24ch] font-sans text-[12.5px] leading-relaxed text-ink-3">
                {b.note}
              </p>
            </li>
          )
        })}
      </ol>

      <div className="mt-7 grid gap-7 border-t border-soft pt-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        {/* ── Ask: the intent ── */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            <span className="text-cyan">1 · Ask</span> — your intent
          </p>
          <div className="mt-4 rounded-xl border border-[rgba(57,214,255,0.28)] bg-[rgba(57,214,255,0.04)] p-5">
            <p className="font-serif text-[1.18rem] leading-snug text-ink">
              &ldquo;{INTENT}&rdquo;
            </p>
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
              Plain language · a real operator goal
            </p>
          </div>

          <p className="mt-6 font-sans text-[13.5px] leading-relaxed text-ink-2">
            Kula reads the intent and assembles a plan from what the runtime knows
            about your operation. Nothing has happened yet — it&rsquo;s a proposal,
            waiting on you.
          </p>
        </div>

        {/* ── Suggest → approve → Act: the plan ── */}
        <div
          className="rounded-xl border p-5 transition-colors duration-500 md:p-6"
          style={{
            borderColor: approved ? 'rgba(0,255,178,0.4)' : 'rgba(57,214,255,0.26)',
            background: approved ? 'rgba(0,255,178,0.045)' : 'rgba(57,214,255,0.03)',
          }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              <span style={{ color: approved ? MINT : CYAN }}>2 · Suggest</span> — proposed plan
            </p>
            <motion.span
              key={approved ? 'on' : 'off'}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={settle}
              className="font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: approved ? MINT : CYAN }}
            >
              {approved ? 'Validated · running' : 'Proposed · not yet run'}
            </motion.span>
          </div>

          <ul className="mt-4 grid gap-2.5">
            {PLAN_STEPS.map((s, i) => (
              <motion.li
                key={s.k}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={proposed ? { opacity: 1, x: 0 } : undefined}
                transition={{ ...settle, delay: reduce || !proposed ? 0 : 0.08 * i }}
                className="flex items-start gap-3 rounded-lg border border-soft bg-white/[0.015] px-3.5 py-2.5"
              >
                <span
                  aria-hidden
                  className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
                  style={{ background: approved ? MINT : CYAN }}
                />
                <span className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block font-sans text-[13px] leading-snug text-ink-3">
                    {s.detail}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>

          {/* ── the approval gate — the human is never skipped ── */}
          <div className="mt-5 border-t border-soft pt-5">
            <AnimatePresence mode="wait" initial={false}>
              {!approved ? (
                <motion.div
                  key="gate"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={settle}
                >
                  <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}88` }}
                    />
                    Awaiting your approval — Act is locked
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setApproval('awaiting')
                        // a tick of "reviewing", then the operator approves
                        window.setTimeout(() => setApproval('approved'), reduce ? 0 : 260)
                      }}
                      aria-describedby={`${groupId}-gatehint`}
                      className="rounded bg-mint px-5 py-2.5 font-sans text-[14px] font-medium text-on-mint transition-all duration-DEFAULT ease-standard hover:bg-mint-bright hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 disabled:opacity-60"
                      disabled={awaiting}
                    >
                      {awaiting ? 'Reviewing…' : 'Approve plan'}
                    </button>
                    <span
                      id={`${groupId}-gatehint`}
                      className="font-sans text-[12.5px] text-ink-3"
                    >
                      3 · Act runs only on your sign-off
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="running"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={settle}
                >
                  <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: MINT }}>
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: MINT, boxShadow: `0 0 8px ${MINT}88` }} />
                    Approved · 3 · Act — every action validated as it fires
                  </p>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink-2">
                    The plan is live. <span className="text-ink">4 · Learn</span> — each
                    outcome feeds back, so the next plan starts sharper than this one.
                  </p>
                  <button
                    type="button"
                    onClick={() => setApproval('pending')}
                    className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                  >
                    Reset · review again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-7 border-t border-soft pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        Cyan = proposed · mint = approved &amp; validated · illustrative
      </p>
    </div>
  )
}

/* ═══════════════════════════ 3 · Role twin ═════════════════════════════════ */
/* The same interface, lightly re-skinning per role. A small role switcher
   re-labels the view; the underlying source of truth is one and the same. */

type Role = {
  key: string
  title: string
  greeting: string
  /** the headline metric this seat watches */
  watch: { label: string; value: string }
  /** the panels Kula foregrounds for this seat */
  panels: string[]
  ask: string
}

const ROLES: Role[] = [
  {
    key: 'risk',
    title: 'Risk lead',
    greeting: 'Portfolio health, by risk band',
    watch: { label: 'Flow into 30+ DPD', value: '1.8%' },
    panels: ['Roll-rate by cohort', 'Early-warning signals', 'Policy-gate exceptions'],
    ask: '“Show me what’s drifting toward 30+ this week.”',
  },
  {
    key: 'collections',
    title: 'Collections head',
    greeting: 'Cure performance, across queues',
    watch: { label: 'On-time, 1–30 DPD', value: '+4.6%' },
    panels: ['Cure rate by strategy', 'Contactability & promises', 'Co-worker workload'],
    ask: '“Which cure journeys are converting best this quarter?”',
  },
  {
    key: 'service',
    title: 'Service manager',
    greeting: 'Queues and SLAs, in real time',
    watch: { label: 'SLA met today', value: '97.2%' },
    panels: ['Queue depth & wait', 'Complaint & escalation rate', 'Hand-offs to humans'],
    ask: '“Where are we breaching SLA, and why?”',
  },
]

export function RoleTwin() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const groupId = useId()
  const role = ROLES[i]
  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }

  return (
    <div className="glass overflow-hidden p-6 md:p-9">
      {/* ── the role switcher ── */}
      <div
        role="tablist"
        aria-label="View Kula from a role"
        className="inline-flex flex-wrap gap-1.5 rounded-xl border border-soft bg-white/[0.02] p-1.5"
      >
        {ROLES.map((r, idx) => {
          const on = idx === i
          return (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              id={`${groupId}-tab-${r.key}`}
              aria-controls={`${groupId}-panel`}
              onClick={() => setI(idx)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault()
                  setI((p) => (p + 1) % ROLES.length)
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault()
                  setI((p) => (p - 1 + ROLES.length) % ROLES.length)
                }
              }}
              className="relative rounded-lg px-4 py-2 font-sans text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              {on && (
                <motion.span
                  layoutId={reduce ? undefined : `${groupId}-pill`}
                  className="absolute inset-0 rounded-lg border border-[rgba(0,255,178,0.4)] bg-[rgba(0,255,178,0.06)]"
                  transition={settle}
                />
              )}
              <span className={`relative ${on ? 'text-mint' : 'text-ink-3 hover:text-ink-2'}`}>
                {r.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── the re-skinned view (one source of truth, relabelled) ── */}
      <div
        id={`${groupId}-panel`}
        role="tabpanel"
        aria-labelledby={`${groupId}-tab-${role.key}`}
        className="mt-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={role.key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={settle}
            className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-8"
          >
            {/* the seat header + headline metric */}
            <div className="rounded-xl border border-soft bg-white/[0.015] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                Kula · {role.title}
              </p>
              <p className="mt-4 font-serif text-[1.45rem] leading-snug text-ink">
                {role.greeting}
              </p>
              <div className="mt-6 border-t border-soft pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  {role.watch.label}
                </p>
                <p className="mt-1.5 font-serif text-[2.4rem] leading-none text-ink">
                  {role.watch.value}
                </p>
              </div>
            </div>

            {/* the panels Kula foregrounds for this seat */}
            <div className="rounded-xl border border-soft bg-white/[0.015] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                Foregrounded for this seat
              </p>
              <ul className="mt-4 grid gap-2.5">
                {role.panels.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-lg border border-soft bg-white/[0.015] px-3.5 py-2.5"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint/70" />
                    <span className="font-sans text-[13.5px] text-ink-2">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-soft pt-4 font-serif text-[1.05rem] leading-snug text-ink-2">
                {role.ask}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-7 border-t border-soft pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        Same source of truth · shaped to the seat · illustrative
      </p>
    </div>
  )
}

/* ═══════════════════════════ 4 · Kupa cockpit ══════════════════════════════ */
/* One calm, instrument-like cockpit surface in glass — built from Kupa's real
   functions: a unified operational view, a human-in-the-loop review queue,
   live monitoring with one-click kill switches, and an audit workspace. All
   numbers are plausible illustrative placeholders — no invented real telemetry.
   Validated bars read mint; exceptions/amber read gold. */

type Queue = { stage: string; segment: string; volume: string; sla: number; bucket: number }

const QUEUES: Queue[] = [
  { stage: 'Pre-due reminders', segment: 'Current', volume: '12,480', sla: 0.98, bucket: 0.96 },
  { stage: 'Early collections', segment: '1–30 DPD', volume: '3,920', sla: 0.94, bucket: 0.88 },
  { stage: 'Cure journeys', segment: '31–60 DPD', volume: '1,140', sla: 0.91, bucket: 0.79 },
  { stage: 'Hardship review', segment: '60+ DPD', volume: '286', sla: 0.86, bucket: 0.71 },
]

type ReviewItem = { id: string; reason: string; kind: 'low-confidence' | 'high-risk' }

const REVIEW: ReviewItem[] = [
  { id: 'RV-4471', reason: 'Hardship offer above auto-threshold', kind: 'high-risk' },
  { id: 'RV-4469', reason: 'Low-confidence intent on inbound call', kind: 'low-confidence' },
  { id: 'RV-4458', reason: 'Promise-to-pay outside policy window', kind: 'high-risk' },
]

type Switch = { scope: string; label: string }

const SWITCHES: Switch[] = [
  { scope: 'Karta', label: 'Karta-Cure' },
  { scope: 'Campaign', label: 'Q3 on-time push' },
  { scope: 'Segment', label: '60+ DPD' },
  { scope: 'Jurisdiction', label: 'Region · West' },
]

function Bar({ value, tone }: { value: number; tone: 'mint' | 'gold' }) {
  const reduce = useReducedMotion()
  const color = tone === 'mint' ? MINT : GOLD
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: `${Math.round(value * 100)}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE }}
      />
    </div>
  )
}

export function KupaCockpit() {
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState<string | null>(null)
  const [cleared, setCleared] = useState<string[]>([])
  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }

  const openReview = REVIEW.filter((r) => !cleared.includes(r.id))

  return (
    <div className="glass overflow-hidden p-5 md:p-7">
      {/* cockpit chrome bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-soft pb-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md border border-[rgba(0,255,178,0.35)] bg-[rgba(0,255,178,0.06)] font-mono text-[12px] text-mint">
            ◉
          </span>
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">Kupa</p>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
              The command centre
            </p>
          </div>
        </div>
        <span className="rounded-full border border-[rgba(200,161,74,0.32)] bg-[rgba(200,161,74,0.05)] px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-gold">
          Illustrative · simulated data
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* ── unified operational view ── */}
        <div className="rounded-xl border border-soft bg-white/[0.015] p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
              Operational view
            </p>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
              Queues · SLA · bucket
            </p>
          </div>
          <ul className="mt-4 grid gap-3.5">
            {QUEUES.map((q) => (
              <li key={q.stage}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-sans text-[13.5px] text-ink-2">{q.stage}</span>
                  <span className="font-mono text-[11px] tracking-[0.02em] text-ink-3">
                    {q.segment} · {q.volume}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <Bar value={q.sla} tone={q.sla >= 0.9 ? 'mint' : 'gold'} />
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">
                      SLA {Math.round(q.sla * 100)}%
                    </p>
                  </div>
                  <div>
                    <Bar value={q.bucket} tone={q.bucket >= 0.85 ? 'mint' : 'gold'} />
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">
                      Bucket {Math.round(q.bucket * 100)}%
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── human-in-the-loop review queue ── */}
        <div className="rounded-xl border border-soft bg-white/[0.015] p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
              Review queue · human sign-off
            </p>
            <span className="font-mono text-[11px] text-gold">{openReview.length} open</span>
          </div>
          <ul className="mt-4 grid gap-2.5">
            <AnimatePresence initial={false}>
              {openReview.map((r) => (
                <motion.li
                  key={r.id}
                  layout={!reduce}
                  initial={false}
                  exit={reduce ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
                  transition={settle}
                  className="rounded-lg border border-[rgba(200,161,74,0.3)] bg-[rgba(200,161,74,0.04)] p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.04em] text-ink-2">{r.id}</span>
                    <span className="rounded-full border border-[rgba(200,161,74,0.32)] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-gold">
                      {r.kind === 'high-risk' ? 'High-risk' : 'Low-confidence'}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-[13px] leading-snug text-ink-2">{r.reason}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCleared((c) => [...c, r.id])}
                      className="rounded border border-[rgba(0,255,178,0.4)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mint transition-colors hover:bg-[rgba(0,255,178,0.08)]"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setCleared((c) => [...c, r.id])}
                      className="rounded border border-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 transition-colors hover:text-ink-2 hover:border-strong"
                    >
                      Send back
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
            {openReview.length === 0 && (
              <li className="rounded-lg border border-[rgba(0,255,178,0.3)] bg-[rgba(0,255,178,0.04)] p-3.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mint">
                  Queue clear · all decisions signed off
                </p>
                <button
                  type="button"
                  onClick={() => setCleared([])}
                  className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                >
                  Reset queue
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* ── live monitoring + kill switches ── */}
        <div className="rounded-xl border border-soft bg-white/[0.015] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
            Live monitoring · one-click pause &amp; rollback
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Live volume', value: '17.8k', tone: 'mint' as const },
              { label: 'Error rate', value: '0.21%', tone: 'mint' as const },
              { label: 'Complaints', value: '0.04%', tone: 'gold' as const },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border border-soft bg-white/[0.01] p-3">
                <p className="font-serif text-[1.3rem] leading-none" style={{ color: m.tone === 'gold' ? GOLD : 'var(--text-1)' }}>
                  {m.value}
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
            Anomaly flagged · 60+ DPD contact rate
          </p>

          <p className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
            Kill switches
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {SWITCHES.map((s) => {
              const off = paused === s.label
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => setPaused((p) => (p === s.label ? null : s.label))}
                    aria-pressed={off}
                    className="flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors duration-fast"
                    style={{
                      borderColor: off ? 'rgba(229,72,77,0.5)' : 'rgba(255,255,255,0.1)',
                      background: off ? 'rgba(229,72,77,0.06)' : 'rgba(255,255,255,0.012)',
                    }}
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-3">
                        {s.scope}
                      </span>
                      <span className="block truncate font-sans text-[12.5px] text-ink-2">
                        {s.label}
                      </span>
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={settle}
                      className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em]"
                      style={{ color: off ? '#E5484D' : 'var(--text-3)' }}
                    >
                      {off ? 'Paused' : 'Pause'}
                    </motion.span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── audit / investigation workspace ── */}
        <div className="rounded-xl border border-soft bg-white/[0.015] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
            Audit &amp; investigation
          </p>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink-3">
            Every action, with its validation and the human who signed it — replayable.
          </p>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-soft">
            {[
              { t: '09:41', a: 'Plan approved', who: 'A. Okafor · Collections', tone: 'mint' as const },
              { t: '09:41', a: 'Validated · contact limit', who: 'Kendra runtime', tone: 'mint' as const },
              { t: '10:03', a: 'Routed to review', who: 'Above auto-threshold', tone: 'gold' as const },
              { t: '10:07', a: 'Hardship offer signed off', who: 'A. Okafor · Collections', tone: 'mint' as const },
            ].map((row, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 bg-white/[0.012] px-3.5 py-2.5"
              >
                <span className="font-mono text-[10.5px] tabular-nums text-ink-3">{row.t}</span>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: row.tone === 'gold' ? GOLD : MINT }}
                />
                <span className="min-w-0 flex-1 truncate font-sans text-[13px] text-ink-2">
                  {row.a}
                </span>
                <span className="hidden shrink-0 font-mono text-[10px] tracking-[0.02em] text-ink-3 sm:block">
                  {row.who}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
            Full chain of custody · exportable for examiners
          </p>
        </div>
      </div>

      <p className="mt-5 border-t border-soft pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
        Mint = validated · gold = exception · red = paused · numbers illustrative, not live telemetry
      </p>
    </div>
  )
}

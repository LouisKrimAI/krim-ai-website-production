'use client'

/**
 * Kira — the animated pieces. Two client components, both GPU-only
 * (opacity · transform · colour) and reduced-motion-safe: useReducedMotion
 * settles each to its final, meaningful state instantly. No CLS — every
 * device reserves its space and only fades/colours content in.
 *
 *   OneThread   — section 2 signature device. ONE conversation thread that
 *                 persists while the channel badge swaps around it: WhatsApp →
 *                 voice/IVR → web chat → SMS → email. The customer moves
 *                 channels; Kira keeps the same thread, and a quiet "context
 *                 carried forward" marker sits at each switch. Driven by a real
 *                 channel rail (click any channel) with a gentle auto-advance
 *                 the reader can pause — never an un-skippable animation.
 *                 Reduced motion: the whole thread with every channel marker,
 *                 shown static.
 *   ActsWithin  — section 3 signature device. Inside a conversation an action
 *                 (PROCESS_PAYMENT) clears validation mid-thread — cyan
 *                 (proposed) → mint (validated) — only within consent + the
 *                 contact window. Then a dignified hand-off: a sensitive moment
 *                 is routed to a person (gold), "context attached". The hand-off
 *                 is a feature, not a failure.
 *
 * Grammar: cyan = proposed/thinking · mint = validated · gold = exception/hand-off.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
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

/* ═══════════════════════════ 2 · One thread, every channel ══════════════════ */
/* The signature device: a single conversation thread, persisting as the channel
   around it changes. The channel rail is a real control; an unobtrusive
   auto-advance walks through the channels and can be paused. Each step adds the
   next exchange to the SAME thread, with a "context carried forward" marker at
   every channel switch — the continuity is the whole point. */

type Channel = {
  key: string
  label: string
  /** short channel name shown in the live badge */
  badge: string
  glyph: React.ReactNode
}

// Compact, dignified channel glyphs — line-only, currentColor, no brand logos.
const wa = (
  <path
    d="M3.5 12a8.5 8.5 0 1 1 3.2 6.6L3 19l1.4-3.6A8.4 8.4 0 0 1 3.5 12Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinejoin="round"
  />
)
const voice = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
  </g>
)
const web = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4.5" width="18" height="13" rx="2" />
    <path d="M3 8.5h18M8 21h8M12 17.5V21" />
  </g>
)
const sms = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16v11H8l-4 3.5V5Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </g>
)
const email = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </g>
)

const CHANNELS: Channel[] = [
  { key: 'whatsapp', label: 'WhatsApp', badge: 'WhatsApp', glyph: wa },
  { key: 'voice', label: 'Voice / IVR', badge: 'Voice · IVR', glyph: voice },
  { key: 'web', label: 'Web chat', badge: 'Web chat', glyph: web },
  { key: 'sms', label: 'SMS', badge: 'SMS', glyph: sms },
  { key: 'email', label: 'Email', badge: 'Email', glyph: email },
]

type Turn = {
  /** which channel this exchange happened on (drives the switch marker) */
  ch: number
  who: 'customer' | 'kira'
  text: string
}

// One continuous conversation, threaded across five channels. The content makes
// the continuity legible — each turn references what came before.
const THREAD: Turn[] = [
  { ch: 0, who: 'customer', text: 'मेरी अगली EMI कब है?' },
  { ch: 0, who: 'kira', text: 'Hi Anaya — your next EMI of ₹4,200 is due on the 14th. Want a reminder a day before?' },
  { ch: 0, who: 'customer', text: 'Haan, please.' },
  { ch: 1, who: 'customer', text: '[calls in] I can pay, but only after the 20th this month.' },
  { ch: 1, who: 'kira', text: 'No problem, Anaya — I have your account. I can move this month’s due date to the 21st. Shall I?' },
  { ch: 2, who: 'customer', text: '[on your website] Did the date change go through?' },
  { ch: 2, who: 'kira', text: 'Yes — your due date is now the 21st, same ₹4,200. Nothing else changed.' },
  { ch: 3, who: 'kira', text: 'SMS · Reminder: ₹4,200 EMI due tomorrow, 21st. Reply PAY to settle now.' },
  { ch: 4, who: 'kira', text: 'Email · Receipt — ₹4,200 received, 21st. You’re all caught up. Statement attached.' },
]

export function OneThread() {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.3, margin: VIEW_MARGIN })
  const scrollRef = useRef<HTMLDivElement>(null)
  const groupId = useId()

  // step = how many channels of the thread are revealed (1..CHANNELS.length).
  // Under reduced motion the whole thread is shown at once.
  const [step, setStep] = useState(reduce ? CHANNELS.length : 1)
  const [paused, setPaused] = useState(false)

  const maxStep = CHANNELS.length
  const active = Math.min(step, maxStep) - 1

  // gentle auto-advance — walks the channels, then holds; pausable, and only
  // while the device is on screen. Never blocks reading.
  useEffect(() => {
    if (reduce || paused || !inView) return
    if (step >= maxStep) return
    const id = window.setTimeout(() => setStep((s) => Math.min(s + 1, maxStep)), 2200)
    return () => window.clearTimeout(id)
  }, [step, paused, inView, reduce, maxStep])

  // keep the latest revealed turn in view as the thread grows
  useEffect(() => {
    if (reduce) return
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [step, reduce])

  const select = useCallback(
    (idx: number) => {
      setPaused(true)
      setStep(idx + 1)
    },
    [],
  )

  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }
  const visibleTurns = THREAD.filter((t) => t.ch <= active)
  const channel = CHANNELS[active]

  return (
    <div ref={containerRef} className="glass overflow-hidden p-5 md:p-7">
      {/* ── channel rail (real control) ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soft pb-4">
        <div
          role="tablist"
          aria-label="Channel the conversation is on"
          className="flex flex-wrap items-center gap-1.5"
        >
          {CHANNELS.map((c, idx) => {
            const reached = idx <= active
            const on = idx === active
            return (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={c.label}
                onClick={() => select(idx)}
                className="group relative flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                style={{
                  borderColor: on
                    ? 'rgba(0,255,178,0.45)'
                    : reached
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(255,255,255,0.07)',
                  background: on ? 'rgba(0,255,178,0.06)' : 'transparent',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 transition-colors duration-300"
                  style={{ color: on ? MINT : reached ? 'var(--text-2)' : 'var(--text-3)' }}
                  aria-hidden
                >
                  {c.glyph}
                </svg>
                <span
                  className="hidden font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-300 sm:inline"
                  style={{ color: on ? MINT : reached ? 'var(--text-2)' : 'var(--text-3)' }}
                >
                  {c.label}
                </span>
                {/* connective tick between channels, to read as one rail */}
                {idx < CHANNELS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-[7px] top-1/2 h-px w-[6px] -translate-y-1/2"
                    style={{ background: 'rgba(255,255,255,0.14)' }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* live channel badge — the SAME thread, this channel right now */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            One thread · now on
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={channel.key}
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 4 }}
              transition={settle}
              className="flex items-center gap-1.5 rounded-full border border-[rgba(0,255,178,0.4)] bg-[rgba(0,255,178,0.06)] px-2.5 py-1"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-mint" aria-hidden>
                {channel.glyph}
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">
                {channel.badge}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ── the one persisting thread ── */}
      <div
        ref={scrollRef}
        className="mt-5 max-h-[360px] overflow-y-auto pr-1"
        aria-live="polite"
        aria-label="Conversation thread"
      >
        <ol className="grid gap-3">
          {visibleTurns.map((t, i) => {
            // a switch marker appears the first time a new channel's turns begin
            const isFirstOfChannel = t.ch > 0 && (i === 0 || visibleTurns[i - 1].ch !== t.ch)
            const ch = CHANNELS[t.ch]
            return (
              <li key={i}>
                {isFirstOfChannel && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={settle}
                    className="my-1 flex items-center gap-2.5"
                  >
                    <span className="h-px flex-1 bg-[rgba(0,255,178,0.18)]" />
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
                        {ch.glyph}
                      </svg>
                      moved to {ch.label} · context carried forward
                    </span>
                    <span className="h-px flex-1 bg-[rgba(0,255,178,0.18)]" />
                  </motion.div>
                )}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={settle}
                  className={t.who === 'customer' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className="max-w-[78%] rounded-2xl px-4 py-2.5"
                    style={
                      t.who === 'customer'
                        ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                        : { background: 'rgba(0,255,178,0.05)', border: '1px solid rgba(0,255,178,0.16)' }
                    }
                  >
                    <p className="font-mono text-mono-data uppercase text-ink-3">
                      {t.who === 'customer' ? 'Customer' : 'Kira'}
                    </p>
                    <p
                      className="mt-1 font-sans text-[13.5px] leading-relaxed"
                      style={{ color: t.who === 'kira' ? 'var(--text-1)' : 'var(--text-2)' }}
                    >
                      {t.text}
                    </p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ── footer: playback + the standing fact ── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-soft pt-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
          One thread · 50+ Indian languages · context preserved across channels
        </p>
        {!reduce && (
          <div className="flex items-center gap-3">
            {step < maxStep && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                aria-pressed={paused}
              >
                {paused ? 'Resume' : 'Pause'}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStep(1)
                setPaused(false)
              }}
              aria-describedby={`${groupId}-replay`}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
            >
              Replay
            </button>
            <span id={`${groupId}-replay`} className="sr-only">
              Restart the conversation from WhatsApp
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════ 3 · Acts, within the rules ═════════════════════ */
/* Two beats inside one conversation. First: an action (PROCESS_PAYMENT) clears
   validation mid-thread — proposed cyan → validated mint — only within consent
   and the contact window. Second: a sensitive moment is handed to a person —
   gold, "routed to a person · context attached". Both are driven by real
   controls; the hand-off is presented as dignified and deliberate. */

type Check = { label: string }

const ACTION_CHECKS: Check[] = [
  { label: 'Consent on file · payments' },
  { label: 'Inside contact window' },
  { label: 'Amount matches due · ₹4,200' },
  { label: 'Idempotent · no double-charge' },
]

type Phase = 'idle' | 'validating' | 'validated'

export function ActsWithin() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const [phase, setPhase] = useState<Phase>('idle')
  // how many checks have passed so far (drives the cyan→mint sweep)
  const [passed, setPassed] = useState(0)
  const [handed, setHanded] = useState(false)
  const groupId = useId()
  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }

  const validated = phase === 'validated'
  const validating = phase === 'validating'

  // when validation is requested, the checks pass one by one, then settle mint.
  useEffect(() => {
    if (phase !== 'validating') return
    if (reduce) {
      setPassed(ACTION_CHECKS.length)
      setPhase('validated')
      return
    }
    if (passed >= ACTION_CHECKS.length) {
      const id = window.setTimeout(() => setPhase('validated'), 260)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => setPassed((p) => p + 1), 360)
    return () => window.clearTimeout(id)
  }, [phase, passed, reduce])

  // under reduced motion the validated state is the meaningful resting state
  useEffect(() => {
    if (reduce) {
      setPassed(ACTION_CHECKS.length)
      setPhase('validated')
      setHanded(true)
    }
  }, [reduce])

  const runValidation = () => {
    if (validating || validated) return
    setPassed(0)
    setPhase('validating')
  }

  const reset = () => {
    setPhase('idle')
    setPassed(0)
    setHanded(false)
  }

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-2">
      {/* ── beat 1 · an action clears validation, mid-thread ── */}
      <div className="glass overflow-hidden p-5 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          In conversation · an action
        </p>

        {/* the customer asks Kira to act */}
        <div className="mt-4 flex justify-end">
          <div className="max-w-[80%] rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-2.5">
            <p className="font-mono text-mono-data uppercase text-ink-3">Customer</p>
            <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-ink-2">
              Go ahead and pay the ₹4,200 now.
            </p>
          </div>
        </div>

        {/* the action chip — proposed (cyan) until validated (mint) */}
        <div
          className="mt-4 rounded-xl border p-4 transition-colors duration-500"
          style={{
            borderColor: validated ? 'rgba(0,255,178,0.4)' : 'rgba(57,214,255,0.3)',
            background: validated ? 'rgba(0,255,178,0.05)' : 'rgba(57,214,255,0.04)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="font-mono text-[12px] tracking-[0.06em] transition-colors duration-500"
              style={{ color: validated ? MINT : CYAN }}
            >
              PROCESS_PAYMENT
            </span>
            <motion.span
              key={validated ? 'mint' : validating ? 'run' : 'cyan'}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={settle}
              className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
              style={{ color: validated ? MINT : CYAN }}
            >
              {validated ? 'Validated · executed' : validating ? 'Validating…' : 'Proposed · not yet run'}
            </motion.span>
          </div>

          {/* the validation checks, sweeping cyan → mint as each clears */}
          <ul className="mt-4 grid gap-2">
            {ACTION_CHECKS.map((c, i) => {
              const isPassed = (inView || reduce) && (validated || i < passed)
              const isOn = isPassed
              return (
                <li key={c.label} className="flex items-center gap-2.5">
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scale: isOn ? 1 : 0.9 }}
                    transition={settle}
                    className="grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300"
                    style={{
                      borderColor: isOn ? `${MINT}88` : `${CYAN}55`,
                      background: isOn ? `${MINT}1f` : 'transparent',
                    }}
                  >
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                      <path
                        d="M2.5 6.2 5 8.5 9.5 3.5"
                        fill="none"
                        stroke={isOn ? MINT : 'rgba(57,214,255,0.5)'}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                  <span
                    className="font-sans text-[12.5px] leading-snug transition-colors duration-300"
                    style={{ color: isOn ? 'var(--text-2)' : 'var(--text-3)' }}
                  >
                    {c.label}
                  </span>
                </li>
              )
            })}
          </ul>

          {/* the gate control + Kira's confirmation once validated */}
          <div className="mt-4 border-t border-soft pt-4">
            <AnimatePresence mode="wait" initial={false}>
              {!validated ? (
                <motion.div
                  key="gate"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={settle}
                  className="flex flex-wrap items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={runValidation}
                    disabled={validating}
                    aria-describedby={`${groupId}-act`}
                    className="rounded bg-mint px-4 py-2 font-sans text-[13.5px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 disabled:opacity-60"
                  >
                    {validating ? 'Validating…' : 'Validate & run'}
                  </button>
                  <span id={`${groupId}-act`} className="font-sans text-[12px] text-ink-3">
                    Checked before it happens — never after
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={settle}
                >
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl border border-[rgba(0,255,178,0.16)] bg-[rgba(0,255,178,0.05)] px-4 py-2.5">
                      <p className="font-mono text-mono-data uppercase text-ink-3">
                        Kira
                      </p>
                      <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-ink">
                        Done — ₹4,200 paid. You&rsquo;re all caught up; a receipt is on its way.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                  >
                    Reset · run again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          Cyan = proposed · mint = validated · within consent &amp; contact window
        </p>
      </div>

      {/* ── beat 2 · a dignified hand-off to a person ── */}
      <div className="glass overflow-hidden p-5 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          When a moment needs a person
        </p>

        {/* a sensitive moment */}
        <div className="mt-4 flex justify-end">
          <div className="max-w-[82%] rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-2.5">
            <p className="font-mono text-mono-data uppercase text-ink-3">Customer</p>
            <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-ink-2">
              I&rsquo;ve lost my job and I&rsquo;m really struggling this month.
            </p>
          </div>
        </div>

        {/* Kira recognises it and hands over — gold, dignified */}
        <div className="mt-4 flex justify-start">
          <div className="max-w-[88%] rounded-2xl border border-[rgba(0,255,178,0.16)] bg-[rgba(0,255,178,0.05)] px-4 py-2.5">
            <p className="font-mono text-mono-data uppercase text-ink-3">Kira</p>
            <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-ink">
              I&rsquo;m sorry to hear that, Anaya. This deserves a person — let me bring in someone
              from the hardship team who can help properly.
            </p>
          </div>
        </div>

        {/* the hand-off card */}
        <div
          className="mt-5 rounded-xl border p-4 transition-colors duration-500"
          style={{
            borderColor: 'rgba(200,161,74,0.4)',
            background: 'rgba(200,161,74,0.05)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}88` }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-gold">
              Routed to a person · context attached
            </span>
          </div>

          {/* what travels with the hand-off — the full story */}
          <AnimatePresence initial={false} mode="wait">
            {handed ? (
              <motion.div
                key="attached"
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={settle}
                className="overflow-hidden"
              >
                <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-soft">
                  {[
                    { t: 'Reason', v: 'Hardship · job loss · sensitive' },
                    { t: 'History', v: 'Full thread · WhatsApp → voice → web' },
                    { t: 'Account', v: 'Anaya · ₹4,200 due · 21st' },
                    { t: 'Routed to', v: 'Hardship team · within SLA' },
                  ].map((row) => (
                    <li
                      key={row.t}
                      className="flex items-baseline gap-3 bg-white/[0.012] px-3.5 py-2"
                    >
                      <span className="w-[72px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                        {row.t}
                      </span>
                      <span className="font-sans text-[12.5px] leading-snug text-ink-2">
                        {row.v}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-ink-3">
                  The person picks up exactly where the customer left off — nothing to repeat, no
                  story to retell.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="handoff-cta"
                initial={false}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={settle}
              >
                <button
                  type="button"
                  onClick={() => setHanded(true)}
                  className="mt-4 rounded border border-[rgba(200,161,74,0.45)] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-gold transition-colors hover:bg-[rgba(200,161,74,0.08)]"
                >
                  See what travels with it
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          Gold = hand-off — a feature, not a failure
        </p>
      </div>
    </div>
  )
}

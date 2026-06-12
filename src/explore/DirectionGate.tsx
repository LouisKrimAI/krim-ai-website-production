/**
 * PHASE 1 EXPLORATION — DIRECTION A · "THE GATE"
 *
 * Concept: pre-execution validation as the page's structural conceit.
 * Everything above the gate line is PROPOSED — drafted in mono, annotated,
 * tentative. Everything below it is CLEARED — inked in serif, permanent,
 * receipted. The harvested "A plan, proposed / A plan, cleared" typography
 * becomes a live artifact: real actions cross the gate in the hero.
 *
 * Type:   Newsreader (display) · Inter (body) · IBM Plex Mono (draft/data)
 * Colour: design-tokens palette executed faithfully — #09090C canvas,
 *         mint #00FFB2 as the single "cleared" colour, gold for amber.
 * Motion: the gate loop (5.5s cycle) · scroll reveals · nothing bounces.
 *
 * Facts: docs/krim-content.md (33 validators · Pramāṇa/Doṣa/Yogyatā ·
 * MAKE_CALL worked example · KWU metering).
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const inView = { once: true, amount: 0.25 } as const

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// The actions that cross the gate (from krim-content.md's primitive library)
// ---------------------------------------------------------------------------
const ACTIONS = [
  {
    proposed: 'MAKE_CALL · acct ··4421 · DPD 12',
    checks: ['TCPA CONSENT', 'CALLING HOURS', 'REG F LIMIT', 'DNC REGISTRY'],
    cleared: 'Call placed — within consent, within hours, within contact limits.',
    receipt: 'KWU 142 · ledger #84,205,113',
  },
  {
    proposed: 'GENERATE_NOTICE · arrears · UK',
    checks: ['CONSUMER DUTY', 'CONC 7.3', 'TEMPLATE v41', 'LANGUAGE'],
    cleared: 'Notice issued — Consumer Duty wording, correct version, on record.',
    receipt: 'KWU 36 · ledger #84,205,114',
  },
  {
    proposed: 'PROCESS_PAYMENT · plan 3/6 · IN',
    checks: ['RBI FPC', 'MANDATE LIVE', 'AMOUNT MATCH', 'RECEIPT DUE'],
    cleared: 'Payment processed — mandate verified, amount matched, receipted.',
    receipt: 'KWU 18 · ledger #84,205,115',
  },
] as const

// ---------------------------------------------------------------------------
// The Gate artifact — proposed crosses the rule, emerges cleared
// ---------------------------------------------------------------------------
function GateArtifact() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % ACTIONS.length), 5600)
    return () => clearInterval(t)
  }, [])
  const a = ACTIONS[i]

  return (
    <div className="w-full max-w-[440px]" aria-label="A proposed action passing pre-execution validation">
      {/* PROPOSED — draft state, mono */}
      <p className="x-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--x-text-3)' }}>
        A plan, proposed
      </p>
      <div className="min-h-[84px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`p-${i}`}
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="x-mono text-[15px] leading-relaxed" style={{ color: 'var(--x-text)' }}>{a.proposed}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {a.checks.map((c, ci) => (
                <motion.span
                  key={c}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + ci * 0.22 }}
                  className="x-mono text-[11px] tracking-[0.06em]"
                  style={{ color: 'var(--x-mint)' }}
                >
                  {c} <span aria-hidden>✓</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THE GATE — the rule is the validator */}
      <div className="relative my-7 h-px" style={{ background: 'var(--x-mint)' }}>
        <span
          className="x-mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-[10px] tracking-[0.22em] uppercase"
          style={{ background: 'var(--x-bg-deep)', color: 'var(--x-mint)' }}
        >
          Validate · 33
        </span>
        {/* the crossing pulse */}
        {!reduced && (
          <motion.span
            key={`pulse-${i}`}
            className="absolute left-1/2 w-[5px] h-[5px] rounded-full -translate-x-1/2"
            style={{ background: 'var(--x-mint)' }}
            initial={{ top: -34, opacity: 0 }}
            animate={{ top: 30, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 1.5, ease: 'easeInOut' }}
            aria-hidden
          />
        )}
      </div>

      {/* CLEARED — inked serif */}
      <p className="x-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--x-text-3)' }}>
        A plan, cleared
      </p>
      <div className="min-h-[96px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${i}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: reduced ? 0 : 2.6 }}
          >
            <p className="x-serif text-[1.35rem] leading-snug" style={{ color: 'var(--x-text)' }}>
              {a.cleared}
            </p>
            <p className="x-mono text-[11px] tracking-[0.08em] mt-3" style={{ color: 'var(--x-text-3)' }}>
              {a.receipt} · <span style={{ color: 'var(--x-mint)' }}>sealed</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Validation pipeline — Perceive → Reason → Plan → VALIDATE → Act
// ---------------------------------------------------------------------------
const FAMILIES = [
  {
    key: 'Pramāṇa',
    sub: 'sources of knowledge',
    body: 'Every premise an action rests on must be verifiable before it proceeds.',
  },
  {
    key: 'Doṣa',
    sub: 'classes of error',
    body: 'The action is checked against the catalogue of formal failure modes Navya-Nyāya defines.',
  },
  {
    key: 'Yogyatā',
    sub: 'fitness for action',
    body: 'Time, place, agent, recipient, instrument, manner and purpose must all be satisfied.',
  },
] as const

function Pipeline() {
  const [fam, setFam] = useState<(typeof FAMILIES)[number]['key']>('Pramāṇa')
  const steps = ['Perceive', 'Reason', 'Plan', 'Validate', 'Act']
  const active = FAMILIES.find((f) => f.key === fam)!

  return (
    <div>
      {/* the five steps; Validate is the gate */}
      <div className="flex flex-wrap items-center gap-y-4 mb-12">
        {steps.map((s, si) => (
          <div key={s} className="flex items-center">
            {si > 0 && <span className="hidden md:block w-8 lg:w-14 h-px mx-2" style={{ background: 'var(--x-border-strong)' }} aria-hidden />}
            {s === 'Validate' ? (
              <span
                className="x-mono text-[13px] tracking-[0.14em] uppercase px-4 py-2.5 mr-2 md:mr-0"
                style={{ border: '1px solid var(--x-mint)', color: 'var(--x-mint)', background: 'rgba(0,255,178,0.04)' }}
              >
                Validate · Krim-Nyāya
              </span>
            ) : (
              <span className="x-mono text-[13px] tracking-[0.14em] uppercase mr-2 md:mr-0" style={{ color: 'var(--x-text-2)' }}>
                {s}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* three families */}
      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        <div className="flex md:flex-col gap-2">
          {FAMILIES.map((f) => {
            const on = f.key === fam
            return (
              <button
                key={f.key}
                onClick={() => setFam(f.key)}
                className="text-left px-5 py-4 transition-colors duration-200"
                style={{
                  border: `1px solid ${on ? 'var(--x-mint)' : 'var(--x-border)'}`,
                  background: on ? 'rgba(0,255,178,0.04)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <span className="x-serif text-[1.15rem] block" style={{ color: on ? 'var(--x-text)' : 'var(--x-text-2)' }}>{f.key}</span>
                <span className="x-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--x-text-3)' }}>{f.sub}</span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-col justify-between py-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={fam}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="x-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.4] max-w-[30ch]"
              style={{ color: 'var(--x-text)' }}
            >
              {active.body}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-6 mt-10">
            {[
              ['pass', 'var(--x-mint)'],
              ['amber', 'var(--x-gold)'],
              ['fail', 'var(--x-fail)'],
            ].map(([label, color]) => (
              <span key={label} className="flex items-center gap-2 x-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--x-text-3)' }}>
                <span className="w-[7px] h-[7px] rounded-full" style={{ background: color as string }} aria-hidden /> {label}
              </span>
            ))}
            <span className="x-mono text-[11px] tracking-[0.06em] hidden sm:block" style={{ color: 'var(--x-text-3)' }}>
              33 validators · three families · every action
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The Action Receipt — harvested artifact, elevated with metering + seal
// ---------------------------------------------------------------------------
function Receipt() {
  return (
    <div className="w-full max-w-[460px]" style={{ border: '1px solid var(--x-border-strong)', background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-baseline justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--x-border)' }}>
        <p className="x-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--x-mint)' }}>Action receipt</p>
        <p className="x-mono text-[10px]" style={{ color: 'var(--x-text-3)' }}>#84,205,113</p>
      </div>
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="x-mono text-[10px] tracking-[0.16em] uppercase mb-1" style={{ color: 'var(--x-text-3)' }}>Action</p>
          <p className="x-mono text-[14px]" style={{ color: 'var(--x-text)' }}>MAKE_CALL · acct ··4421 · Vox-Out</p>
        </div>
        <div>
          <p className="x-mono text-[10px] tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--x-text-3)' }}>Validated before execution</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {['TCPA consent', 'Calling hours', 'Reg F contact limit', 'DNC registry'].map((c) => (
              <p key={c} className="x-mono text-[12px]" style={{ color: 'var(--x-text-2)' }}>
                <span style={{ color: 'var(--x-mint)' }} aria-hidden>✓ </span>{c}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="x-mono text-[10px] tracking-[0.16em] uppercase mb-1" style={{ color: 'var(--x-text-3)' }}>Reasoning, readable</p>
          <p className="x-serif italic text-[15px] leading-relaxed" style={{ color: 'var(--x-text-2)' }}>
            Right-party contact confirmed. Hardship signals absent. Contact window open until 18:00 local.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: '1px solid var(--x-border)' }}>
        <p className="x-mono text-[11px]" style={{ color: 'var(--x-text-2)' }}>Metered · <span style={{ color: 'var(--x-text)' }}>142 KWU</span></p>
        <p className="x-mono text-[11px]" style={{ color: 'var(--x-mint)' }}>sealed · immutable</p>
      </div>
    </div>
  )
}

// ===========================================================================
export default function DirectionGate() {
  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          background: 'var(--x-bg)',
          color: 'var(--x-text-2)',
          '--x-bg': '#09090C',
          '--x-bg-deep': '#04060C',
          '--x-border': 'rgba(255,255,255,0.08)',
          '--x-border-strong': 'rgba(255,255,255,0.14)',
          '--x-text': '#F6F6F4',
          '--x-text-2': '#A9ADB6',
          '--x-text-3': '#6B6F78',
          '--x-mint': '#00FFB2',
          '--x-gold': '#C8A14A',
          '--x-fail': '#E5484D',
        } as React.CSSProperties
      }
    >
      <style>{`
        .x-serif { font-family: 'Newsreader', Georgia, serif; }
        .x-mono  { font-family: 'IBM Plex Mono', ui-monospace, Consolas, monospace; }
        .x-sans  { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* exploration chrome */}
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <a href="/explore" className="x-mono text-[13px] tracking-[0.3em] uppercase" style={{ color: 'var(--x-mint)' }}>Krim</a>
        <p className="x-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--x-text-3)' }}>Direction A · The Gate</p>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative px-6 md:px-10" style={{ background: 'var(--x-bg-deep)' }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 items-center py-20 md:py-28 min-h-[88vh]">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7">
            <motion.p variants={rise} className="x-mono text-[11px] tracking-[0.24em] uppercase mb-8" style={{ color: 'var(--x-mint)' }}>
              The agent-native operating system for lending
            </motion.p>
            <motion.h1
              variants={rise}
              className="x-serif text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.015em] mb-8"
              style={{ color: 'var(--x-text)', fontWeight: 400 }}
            >
              The AI your regulator can&nbsp;read.
            </motion.h1>
            <motion.p variants={rise} className="x-sans text-[1.125rem] leading-[1.6] max-w-[46ch] mb-10">
              End-to-end lending operations on one runtime — where every action is
              validated <em className="x-serif" style={{ color: 'var(--x-text)' }}>before</em> it executes, not audited after.
            </motion.p>
            <motion.div variants={rise} className="flex flex-wrap items-center gap-5">
              <a
                href="#pipeline"
                className="x-sans text-[15px] font-medium px-7 py-3.5 transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--x-mint)', color: '#04130D' }}
              >
                Request a pilot
              </a>
              <a href="#pipeline" className="x-mono text-[12px] tracking-[0.14em] uppercase underline-offset-4 hover:underline" style={{ color: 'var(--x-text-2)' }}>
                See how validation works ↓
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 flex lg:justify-end"
          >
            <GateArtifact />
          </motion.div>
        </div>
      </section>

      {/* ============ THE SHIFT ============ */}
      <section className="px-6 md:px-10 py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger}>
            <motion.p variants={rise} className="x-mono text-[11px] tracking-[0.24em] uppercase mb-6" style={{ color: 'var(--x-mint)' }}>
              The shift
            </motion.p>
            <motion.h2 variants={rise} className="x-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.01em] mb-6 max-w-[22ch]" style={{ color: 'var(--x-text)' }}>
              Lending is being rebuilt on agent infrastructure.
            </motion.h2>
            <motion.p variants={rise} className="x-sans text-[1.06rem] leading-[1.65] max-w-[62ch] mb-16">
              The operating model is moving off tickets, spreadsheets and call scripts onto
              AI co-workers that act. Only one architecture survives regulated procurement —
              one built from layer zero for governance, sovereignty and the whole lifecycle.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--x-border)' }}>
            <motion.div variants={rise} className="p-8 md:p-10" style={{ background: 'var(--x-bg)' }}>
              <p className="x-mono text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--x-gold)' }}>Today — workflow, not autonomy</p>
              <ul className="space-y-4 x-sans text-[15px] leading-relaxed">
                <li>BPOs add headcount, not intelligence.</li>
                <li>Lending SaaS moves tickets through a workflow — humans still decide and act.</li>
                <li>Chatbots talk, but cannot execute a regulated action.</li>
              </ul>
            </motion.div>
            <motion.div variants={rise} className="p-8 md:p-10" style={{ background: 'var(--x-bg)' }}>
              <p className="x-mono text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--x-mint)' }}>KrimOS — agent-native operations</p>
              <ul className="space-y-4 x-sans text-[15px] leading-relaxed" style={{ color: 'var(--x-text)' }}>
                <li>Co-workers that act across customer and back-office channels.</li>
                <li>Validated before execution — every action gated, not audited after the fact.</li>
                <li>Sovereign by construction — self-hosted, in-jurisdiction, no foreign API in the loop.</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="pipeline" className="px-6 md:px-10 py-24 md:py-36" style={{ borderTop: '1px solid var(--x-border)' }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="mb-16">
            <motion.p variants={rise} className="x-mono text-[11px] tracking-[0.24em] uppercase mb-6" style={{ color: 'var(--x-mint)' }}>
              How it works
            </motion.p>
            <motion.h2 variants={rise} className="x-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.01em] mb-6 max-w-[24ch]" style={{ color: 'var(--x-text)' }}>
              Pre-execution, not post-audit.
            </motion.h2>
            <motion.p variants={rise} className="x-sans text-[1.06rem] leading-[1.65] max-w-[62ch]">
              No action a Karta co-worker proposes fires until it has passed Krim-Nyāya —
              33 validators derived from Mithila's Navya-Nyāya formal logic, in three families.
              Validation is the runtime, not a wrapper bolted on.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={rise}>
            <Pipeline />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center mt-24 pt-16"
            style={{ borderTop: '1px solid var(--x-border)' }}
          >
            <motion.div variants={rise}>
              <h3 className="x-serif text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.15] mb-5 max-w-[20ch]" style={{ color: 'var(--x-text)' }}>
                Every action leaves a record like this one.
              </h3>
              <p className="x-sans text-[1.02rem] leading-[1.65] max-w-[48ch]">
                Operators see validated actions execute; rejected actions land in an exception
                queue with the blocking rule and its reasoning. Auditors see every validation
                decision — including passes — sealed in Krim-Ledger and metered in the same pass.
              </p>
            </motion.div>
            <motion.div variants={rise} className="flex lg:justify-end">
              <Receipt />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ CLOSE ============ */}
      <section className="px-6 md:px-10 py-28 md:py-40 text-center" style={{ background: 'var(--x-bg-deep)', borderTop: '1px solid var(--x-border)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="max-w-[860px] mx-auto">
          <motion.h2 variants={rise} className="x-serif text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.1] tracking-[-0.01em] mb-7" style={{ color: 'var(--x-text)' }}>
            The operating system for the operations that cannot afford to be wrong.
          </motion.h2>
          <motion.p variants={rise} className="x-sans text-[1.06rem] leading-[1.65] mb-12 max-w-[58ch] mx-auto">
            The runtime is the product. Validation is the architecture, not an add-on.
            Sovereignty is a commitment, not a deployment option.
          </motion.p>
          <motion.div variants={rise}>
            <a
              href="#"
              className="x-sans inline-block text-[15px] font-medium px-8 py-4 transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--x-mint)', color: '#04130D' }}
            >
              Let's run a pilot — free 30-minute consult
            </a>
            <p className="x-mono text-[11px] tracking-[0.08em] mt-5" style={{ color: 'var(--x-text-3)' }}>
              Automation potential + a 90-day plan · sales@krim.ai
            </p>
          </motion.div>
        </motion.div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 py-8">
        <p className="x-serif italic text-[14px]" style={{ color: 'var(--x-text-3)' }}>Intelligence by policy. The AI your regulator can read.</p>
        <p className="x-mono text-[11px] tracking-[0.1em]" style={{ color: 'var(--x-text-3)' }}>© Krim · US · UK · India</p>
      </footer>
    </div>
  )
}

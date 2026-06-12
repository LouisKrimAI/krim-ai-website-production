/**
 * PHASE 1 EXPLORATION — DIRECTION B · "THE LEDGER"
 *
 * Concept: "The AI your regulator can read" taken literally — the site IS
 * the evidentiary record. Every section is an entry in a beautifully typeset
 * ledger: line numbers, timestamps, seals, marginalia. Court record ×
 * Swiss typography × Stripe Press.
 *
 * Deliberate departure from design-tokens.md (with rationale): the canvas
 * goes PAPER-LIGHT. Regulatory documents live on paper; light mode IS the
 * legibility promise — and it separates Krim from every dark-mode AI site.
 * Mint survives as the seal: darkened to #0A6B4E for type (contrast), pure
 * #00FFB2 only inside the stamp fill.
 *
 * Type:   Spectral (display + text) · Archivo (UI) · IBM Plex Mono (entries)
 * Motion: stamp-settle (scale 1.12→1) · row commits · marginalia fades.
 *
 * Facts: docs/krim-content.md.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const inView = { once: true, amount: 0.25 } as const

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// Ledger rows — actions committing to the record (facts: primitive library)
// ---------------------------------------------------------------------------
const ROWS = [
  { t: '09:41:07', act: 'MAKE_CALL', detail: 'acct ··4421 · Vox-Out · TCPA, hours, Reg F, DNC', j: 'US', verdict: 'PASS' },
  { t: '09:41:09', act: 'GENERATE_NOTICE', detail: 'arrears wording v41 · Consumer Duty, CONC 7.3', j: 'UK', verdict: 'PASS' },
  { t: '09:41:12', act: 'PROCESS_PAYMENT', detail: 'plan 3 of 6 · mandate live · amount matched', j: 'IN', verdict: 'PASS' },
  { t: '09:41:15', act: 'SEND_EMAIL', detail: 'settlement offer · outside approved range', j: 'US', verdict: 'AMBER' },
  { t: '09:41:15', act: '· held', detail: 'routed to exception queue with blocking rule + reasoning', j: '—', verdict: 'QUEUE' },
  { t: '09:41:18', act: 'BUREAU_LOOKUP', detail: 'consent verified · purpose logged', j: 'IN', verdict: 'PASS' },
] as const

function verdictColor(v: string) {
  if (v === 'PASS') return 'var(--l-seal)'
  if (v === 'AMBER') return 'var(--l-amber)'
  return 'var(--l-ink-3)'
}

function LiveLedger() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.3 })
  const [n, setN] = useState(reduced ? ROWS.length : 0)
  useEffect(() => {
    if (!seen || reduced) return
    if (n >= ROWS.length) return
    const t = setTimeout(() => setN(n + 1), n === 0 ? 350 : 620)
    return () => clearTimeout(t)
  }, [seen, n])

  return (
    <div ref={ref} className="l-rule-y" role="table" aria-label="Live extract of the Krim-Ledger record">
      <div className="grid grid-cols-[44px_70px_1fr_34px_58px] md:grid-cols-[56px_84px_150px_1fr_44px_64px] gap-x-3 md:gap-x-5 px-1 py-2.5" style={{ borderBottom: '1px solid var(--l-rule)' }}>
        {['LN', 'TIME', 'ACTION', 'VALIDATION', 'JUR', 'VERDICT'].map((h, i) => (
          <p key={h} className={`l-mono text-[9.5px] tracking-[0.18em] ${i === 2 ? 'hidden md:block' : ''} ${i === 3 ? 'col-span-1' : ''}`} style={{ color: 'var(--l-ink-3)' }}>
            {h}
          </p>
        ))}
      </div>
      {ROWS.map((r, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0 }}
          animate={i < n || reduced ? { opacity: 1 } : {}}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-[44px_70px_1fr_34px_58px] md:grid-cols-[56px_84px_150px_1fr_44px_64px] gap-x-3 md:gap-x-5 items-baseline px-1 py-3"
          style={{ borderBottom: '1px solid var(--l-rule)' }}
        >
          <p className="l-mono text-[11px]" style={{ color: 'var(--l-ink-3)' }}>{String(84205113 + i).slice(-6)}</p>
          <p className="l-mono text-[11px]" style={{ color: 'var(--l-ink-2)' }}>{r.t}</p>
          <p className="l-mono text-[12px] hidden md:block" style={{ color: 'var(--l-ink)' }}>{r.act}</p>
          <p className="l-mono text-[11px] leading-relaxed" style={{ color: 'var(--l-ink-2)' }}>
            <span className="md:hidden" style={{ color: 'var(--l-ink)' }}>{r.act} · </span>{r.detail}
          </p>
          <p className="l-mono text-[11px]" style={{ color: 'var(--l-ink-3)' }}>{r.j}</p>
          <p className="l-mono text-[11px] font-medium tracking-[0.06em]" style={{ color: verdictColor(r.verdict) }}>{r.verdict}</p>
        </motion.div>
      ))}
      <p className="l-mono text-[10px] tracking-[0.08em] pt-3" style={{ color: 'var(--l-ink-3)' }}>
        EXTRACT · KRIM-LEDGER · IMMUTABLE, CRYPTOGRAPHICALLY SEALED, METERED IN KRIM WORK UNITS
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The stamp — the page's signature mark
// ---------------------------------------------------------------------------
function Stamp({ delay = 0.9 }: { delay?: number }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 1.12, rotate: -7 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ duration: 0.28, delay, ease: [0.2, 0.9, 0.3, 1.4] }}
      className="inline-block select-none"
      aria-hidden
    >
      <div className="px-5 py-2.5" style={{ border: '2.5px solid var(--l-seal)', color: 'var(--l-seal)' }}>
        <p className="l-mono text-[12px] md:text-[13px] tracking-[0.22em] font-medium leading-tight">VALIDATED</p>
        <p className="l-mono text-[8.5px] tracking-[0.18em]">PRE-EXECUTION · 33 OF 33</p>
      </div>
    </motion.div>
  )
}

// ===========================================================================
export default function DirectionLedger() {
  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          background: 'var(--l-paper)',
          color: 'var(--l-ink-2)',
          '--l-paper': '#F7F5F1',
          '--l-paper-2': '#EFECE5',
          '--l-rule': '#DAD6CC',
          '--l-rule-strong': '#B9B4A6',
          '--l-ink': '#16181D',
          '--l-ink-2': '#4A4E57',
          '--l-ink-3': '#8B8E96',
          '--l-seal': '#0A6B4E',
          '--l-seal-bright': '#00C98C',
          '--l-amber': '#8A6A2A',
        } as React.CSSProperties
      }
    >
      <style>{`
        .l-serif { font-family: 'Spectral', Georgia, serif; }
        .l-sans  { font-family: 'Archivo', 'Inter', system-ui, sans-serif; }
        .l-mono  { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .l-rule-y { border-top: 1px solid var(--l-rule-strong); }
      `}</style>

      {/* document chrome */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5" style={{ borderBottom: '1px solid var(--l-rule)' }}>
        <a href="/explore" className="l-mono text-[13px] tracking-[0.3em] font-medium" style={{ color: 'var(--l-ink)' }}>KRIM</a>
        <p className="l-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--l-ink-3)' }}>DIRECTION B · THE LEDGER</p>
      </header>

      {/* ============ HERO — the title block ============ */}
      {/* NOTE: explicit per-element animation (no variant propagation) — the
          headline grid needs a plain wrapper, which breaks variant flow. */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16">
        <div className="max-w-[1080px] mx-auto">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap gap-x-8 gap-y-1 pb-4 mb-10"
            style={{ borderBottom: '2px solid var(--l-ink)' }}
          >
            {[
              'IN THE MATTER OF: AI IN REGULATED LENDING',
              'JURISDICTIONS: US · UK · IN',
              'VALIDATORS: 33',
              'RECORD: IMMUTABLE',
            ].map((m) => (
              <p key={m} className="l-mono text-[10px] tracking-[0.16em]" style={{ color: 'var(--l-ink-2)' }}>{m}</p>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
              className="lg:col-span-9 l-serif text-[clamp(2.9rem,7vw,5.5rem)] leading-[1.0] tracking-[-0.018em]"
              style={{ color: 'var(--l-ink)', fontWeight: 300 }}
            >
              The AI your regulator <em style={{ fontWeight: 400 }}>can read.</em>
            </motion.h1>
            <div className="lg:col-span-3 lg:pb-3"><Stamp /></div>
          </div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
            className="l-serif text-[1.2rem] leading-[1.6] max-w-[52ch] mt-9"
            style={{ color: 'var(--l-ink-2)' }}
          >
            KrimOS is the agent-native operating system for end-to-end lending operations.
            Every action is validated before it executes — and every action, every decision,
            every validation lands on one immutable record. This page is set the way the
            evidence is kept: in order, in full, on the record.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
            className="flex flex-wrap items-center gap-6 mt-10"
          >
            <a href="#close" className="l-sans text-[15px] font-medium px-7 py-3.5" style={{ background: 'var(--l-ink)', color: 'var(--l-paper)' }}>
              Request a pilot
            </a>
            <p className="l-mono text-[11px] tracking-[0.1em]" style={{ color: 'var(--l-ink-3)' }}>EXHIBIT A FOLLOWS ↓</p>
          </motion.div>
        </div>
      </section>

      {/* ============ EXHIBIT A — the live ledger ============ */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: 'var(--l-paper-2)' }}>
        <div className="max-w-[1080px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="grid lg:grid-cols-12 gap-10 mb-10">
            <motion.div variants={rise} className="lg:col-span-4">
              <p className="l-mono text-[10px] tracking-[0.2em] mb-4" style={{ color: 'var(--l-seal)' }}>EXHIBIT A</p>
              <h2 className="l-serif text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.1]" style={{ color: 'var(--l-ink)', fontWeight: 400 }}>
                One record. Two uses — governance and billing.
              </h2>
            </motion.div>
            <motion.p variants={rise} className="lg:col-span-8 l-sans text-[15.5px] leading-[1.7] max-w-[62ch] lg:pt-9">
              Every action, decision, prompt, output and validation is streamed to an immutable,
              cryptographically sealed trail and metered in the same pass — in Krim Work Units.
              The chain of custody is court-admissible. Because evidence is complete by construction,
              audit packs and inspection responses are generated in minutes, not days.
            </motion.p>
          </motion.div>
          <LiveLedger />
        </div>
      </section>

      {/* ============ DEFINITION — Epistemic AI ============ */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1080px] mx-auto grid lg:grid-cols-12 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="lg:col-span-7">
            <motion.p variants={rise} className="l-mono text-[10px] tracking-[0.2em] mb-8" style={{ color: 'var(--l-seal)' }}>
              DEFINITION · THE CATEGORY
            </motion.p>
            <motion.h2 variants={rise} className="l-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.01em]" style={{ color: 'var(--l-ink)', fontWeight: 300 }}>
              Epistemic AI <span className="l-mono text-[1rem] tracking-normal align-middle" style={{ color: 'var(--l-ink-3)' }}>/ n. /</span>
            </motion.h2>
            <motion.p variants={rise} className="l-serif text-[1.35rem] leading-[1.55] mt-7 max-w-[44ch]" style={{ color: 'var(--l-ink)' }}>
              AI whose every action is validated before it fires, and whose reasoning an auditor
              can read end to end.
            </motion.p>
            <motion.p variants={rise} className="l-sans text-[15.5px] leading-[1.7] mt-7 max-w-[58ch]">
              Pre-execution, not post-audit. Validation is the runtime, not a wrapper bolted on.
              A non-compliant call cannot be unmade; a misquoted EMI cannot be unspoken — so the
              category that wins regulated lending is the one that never lets them happen.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="lg:col-span-5 lg:pt-20">
            {[
              ['cf. autonomous AI', 'Implies no human. Regulators reject it.'],
              ['cf. safe AI', "Defensive. It doesn't run the operation."],
              ['epistemic ai', 'Validates every action before it fires. Runs the operation — readably.'],
            ].map(([term, note], i) => (
              <motion.div key={term} variants={rise} className="py-5" style={{ borderTop: i === 0 ? '1px solid var(--l-rule-strong)' : '1px solid var(--l-rule)' }}>
                <p className="l-mono text-[11px] tracking-[0.14em] mb-1.5" style={{ color: i === 2 ? 'var(--l-seal)' : 'var(--l-ink-3)' }}>
                  {String(i + 1).padStart(2, '0')} · {term.toUpperCase()}
                </p>
                <p className="l-serif text-[1.05rem] leading-[1.5]" style={{ color: i === 2 ? 'var(--l-ink)' : 'var(--l-ink-2)' }}>{note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ EXHIBIT B — the receipt, on paper ============ */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ borderTop: '1px solid var(--l-rule)' }}>
        <div className="max-w-[1080px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger}>
            <motion.p variants={rise} className="l-mono text-[10px] tracking-[0.2em] mb-4" style={{ color: 'var(--l-seal)' }}>EXHIBIT B</motion.p>
            <motion.h2 variants={rise} className="l-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] mb-6 max-w-[18ch]" style={{ color: 'var(--l-ink)', fontWeight: 400 }}>
              Safety is the architecture, not an add-on.
            </motion.h2>
            <motion.p variants={rise} className="l-sans text-[15.5px] leading-[1.7] max-w-[54ch]">
              The runtime cannot escape its own validation. Krim-Nyāya runs every proposed action
              through 33 validators in three families — Pramāṇa, sources of knowledge; Doṣa,
              classes of error; Yogyatā, fitness for action — derived from Mithila's Navya-Nyāya
              formal logic. Compliance violations are not reduced; they are made structurally
              impossible.
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease: EASE }}
            className="justify-self-center lg:justify-self-end w-full max-w-[440px] p-7 relative"
            style={{ background: '#FFFFFF', border: '1px solid var(--l-rule-strong)', boxShadow: '0 1px 2px rgba(22,24,29,0.06), 0 12px 32px rgba(22,24,29,0.07)' }}
          >
            <div className="flex items-baseline justify-between pb-3 mb-4" style={{ borderBottom: '2px solid var(--l-ink)' }}>
              <p className="l-mono text-[11px] tracking-[0.2em] font-medium" style={{ color: 'var(--l-ink)' }}>ACTION RECEIPT</p>
              <p className="l-mono text-[10px]" style={{ color: 'var(--l-ink-3)' }}>№ 84,205,113</p>
            </div>
            {[
              ['ACTION', 'MAKE_CALL · acct ··4421 · Vox-Out'],
              ['VALIDATED', 'TCPA consent ✓ · calling hours ✓ · Reg F limit ✓ · DNC ✓'],
              ['REASONING', 'Right-party contact confirmed; hardship signals absent; window open to 18:00.'],
              ['METERED', '142 Krim Work Units'],
            ].map(([k, v]) => (
              <div key={k} className="py-2.5" style={{ borderBottom: '1px solid var(--l-rule)' }}>
                <p className="l-mono text-[9px] tracking-[0.18em] mb-1" style={{ color: 'var(--l-ink-3)' }}>{k}</p>
                <p className={k === 'REASONING' ? 'l-serif italic text-[14.5px] leading-relaxed' : 'l-mono text-[12.5px] leading-relaxed'} style={{ color: 'var(--l-ink)' }}>
                  {v}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4">
              <p className="l-mono text-[10px] tracking-[0.12em]" style={{ color: 'var(--l-ink-3)' }}>SEALED · SHA-256</p>
              <Stamp delay={0.4} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CLOSE — the signature block ============ */}
      <section id="close" className="px-6 md:px-12 py-24 md:py-36" style={{ background: 'var(--l-ink)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="max-w-[1080px] mx-auto">
          <motion.h2 variants={rise} className="l-serif text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.08] max-w-[20ch]" style={{ color: 'var(--l-paper)', fontWeight: 300 }}>
            The operating system for the operations that cannot afford to be wrong.
          </motion.h2>
          <motion.div variants={rise} className="flex flex-wrap items-center gap-7 mt-12">
            <a href="#" className="l-sans text-[15px] font-medium px-8 py-4" style={{ background: 'var(--l-seal-bright)', color: 'var(--l-ink)' }}>
              Let's run a pilot
            </a>
            <p className="l-mono text-[11px] tracking-[0.1em]" style={{ color: '#8B8E96' }}>
              FREE 30-MINUTE CONSULT · AUTOMATION POTENTIAL + A 90-DAY PLAN
            </p>
          </motion.div>
          <motion.div variants={rise} className="flex flex-wrap items-baseline justify-between gap-4 mt-20 pt-6" style={{ borderTop: '1px solid rgba(247,245,241,0.18)' }}>
            <p className="l-serif italic text-[15px]" style={{ color: '#A9ADB6' }}>Intelligence by policy.</p>
            <p className="l-mono text-[10px] tracking-[0.14em]" style={{ color: '#6B6F78' }}>© KRIM · US · UK · INDIA · SALES@KRIM.AI</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

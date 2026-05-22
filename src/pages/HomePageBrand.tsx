/**
 * HomePageBrand.tsx — the canonical Krim homepage.
 *
 * Grounding: Krim Product Memo (authoritative). KrimOS is the intelligence
 * operating system for end-to-end lending operations. Voice governed by the
 * brand bible (confident, specific, technical-without-jargon); content is the
 * product, not the brand mythology — no Mithila timeline, no "26 validators",
 * no four pillars. Pre-execution validation is powered by Govern™ + the runtime.
 *
 * Visual system: indigo base (#1A1E47), Mithila ochre accent (#C8973B), slate
 * support (#6B7894), off-white text (#FAFAFA). Mint (#00FF88) is reserved for
 * the logo and a few functional "pass / live" signals only. Georgia display.
 *
 * The legacy mint chassis lives at /homepage-alt for side-by-side comparison.
 */

import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// motion tokens
// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const viewportOnce = { once: true, amount: 0.2 } as const

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="brand-eyebrow text-krim-ochre mb-5">{children}</p>
}

// ===========================================================================
// 1 · HERO — asymmetric editorial split + layered architecture slab
// ===========================================================================
const HERO_LAYERS = [
  { name: 'Kūpa', note: '17 Command Centers' },
  { name: 'Kula', note: 'Digital Twins' },
  { name: 'Karta', note: 'AI Co-Workers' },
  { name: 'Kendra', note: 'Core™ Runtime', core: true },
  { name: 'Kriya', note: '20+ Primitives' },
]

function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute top-28 left-6 md:left-10 hidden md:block w-px h-20 bg-krim-ochre/40" aria-hidden />

      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[58%_42%] gap-12 lg:gap-8 items-center">
        {/* Left — narrative */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="brand-eyebrow text-krim-ochre mb-7">
            KrimOS · Intelligence Operating System
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="brand-serif text-krim-off-white text-[clamp(2.25rem,6vw,5rem)] leading-[1.02] tracking-tight mb-7 [hyphens:none]"
          >
            The AI your regulator <span className="italic text-krim-ochre">can read.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="brand-sans text-krim-slate text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            KrimOS is a runtime where AI Co-Workers operate your origination, servicing, and
            collections — and cannot execute a single action until it has been validated
            against policy.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-krim-ochre text-krim-indigo font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a technical deep-dive
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" size={18} />
            </Link>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-krim-ochre/50 text-krim-off-white font-medium hover:bg-krim-ochre/10 transition-colors"
            >
              See the architecture
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="brand-sans text-krim-slate/80 text-sm max-w-md">
            Built by the team behind Saarthi.ai — 50 banks, 250M+ customer calls,
            zero compliance violations.
          </motion.p>
        </motion.div>

        {/* Right — layered slab */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative hidden lg:block"
          aria-hidden
        >
          <div style={{ transform: 'skewY(-7deg)' }} className="space-y-3 pr-4">
            {HERO_LAYERS.map((l, i) => (
              <motion.div
                key={l.name}
                variants={fadeUp}
                className={`relative flex items-center justify-between rounded-lg border px-5 py-4 ${
                  l.core
                    ? 'border-krim-ochre/60 bg-krim-ochre/[0.06]'
                    : 'border-krim-slate/25 bg-white/[0.02]'
                }`}
                style={{ marginLeft: `${i * 14}px`, transform: 'skewY(7deg)' }}
              >
                {l.core && <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-lg bg-krim-ochre" />}
                <span className="brand-serif text-krim-off-white text-xl">{l.name}</span>
                <span className="brand-sans text-krim-slate text-xs uppercase tracking-wider flex items-center gap-2">
                  {l.note}
                  {l.core && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-krim-mint opacity-60 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-krim-mint" />
                    </span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ===========================================================================
// 2 · THE PROBLEM — full-bleed split, static vs governed
// ===========================================================================
function Problem() {
  return (
    <section className="relative bg-[#15183A] py-24 md:py-28 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-3xl mb-14">
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight mb-6">
            Conventional software was never built to be accountable.
          </h2>
          <p className="brand-sans text-krim-slate text-lg leading-relaxed">
            It executes commands, learns nothing, and waits for a human to operate it. Compliance
            is bolted on as an after-the-fact check — which means a wrong action has already fired
            by the time anyone catches it. In lending, a wrong action is not a bug. It is a
            regulatory event, a write-off, a customer harmed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-krim-slate/15 rounded-xl overflow-hidden">
          <div className="bg-[#15183A] p-8 md:p-10 opacity-60">
            <p className="brand-eyebrow text-krim-slate mb-4">Static software</p>
            <ul className="space-y-4 brand-sans text-krim-slate text-[15px] leading-relaxed">
              <li>Can only follow rules it was hard-coded with. Regulation changes faster than that.</li>
              <li>Every after-the-fact compliance check is a violation that already happened.</li>
              <li>Learns nothing from the work it does. Yesterday's mistake repeats tomorrow.</li>
            </ul>
          </div>
          <div className="bg-[#15183A] p-8 md:p-10">
            <p className="brand-eyebrow text-krim-ochre mb-4">A governed runtime</p>
            <ul className="space-y-4 brand-sans text-krim-off-white text-[15px] leading-relaxed">
              <li>Reasons over each action and refuses to act outside policy — by design, not by review.</li>
              <li>Validates before execution, so the violation never reaches production.</li>
              <li>Learns from every interaction; the workforce compounds with use.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===========================================================================
// 3 · WHAT KRIMOS IS — five-layer architecture (the product reveal)
// ===========================================================================
const LAYERS = [
  { name: 'Kūpa', eng: '17 Command Centers', desc: 'The surface operators work from — an AI workforce, a human oversight dashboard, and a natural-language copilot, per domain.', nodes: 17, cap: 8 },
  { name: 'Kula', eng: 'Digital Twins & Copilot', desc: 'Every role gets a plain-language twin: Ask → Suggest → Act → Learn. The operator’s working interface to the institution’s intelligence.', nodes: 6, cap: 6 },
  { name: 'Karta', eng: '10 AI Co-Workers', desc: 'Intelligent entities that compose primitives, learn from every interaction, and run across functions by configuration rather than re-coding.', nodes: 10, cap: 10 },
  { name: 'Kendra', eng: 'KrimOS Core™ Runtime', desc: 'The substrate the Co-Workers live in: pre-execution validation, Temporal-class orchestration, four-tier memory, a continuous learning loop.', nodes: 5, cap: 5, core: true },
  { name: 'Kriya', eng: '20+ Atomic Primitives', desc: 'The periodic table of AI operations, in five families — Sensing, Processing, Intelligence, Action, Control. Workflows are composed, not coded.', nodes: 20, cap: 10 },
]

function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-28 md:py-36 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-3xl mb-14">
          <Eyebrow>The architecture</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight mb-5">
            Five layers, one runtime — and the runtime is what you buy.
          </h2>
          <p className="brand-sans text-krim-slate text-lg leading-relaxed">
            KrimOS is a runtime substrate in which AI Co-Workers are instantiated, operate
            autonomously, learn continuously — and are validated before they act.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="space-y-2">
          {LAYERS.map((l) => (
            <motion.div
              key={l.name}
              variants={fadeUp}
              className={`group grid md:grid-cols-[260px_1fr_auto] gap-5 md:gap-8 items-center rounded-xl border px-6 py-6 md:px-8 transition-transform hover:-translate-y-0.5 ${
                l.core ? 'border-krim-ochre/50 bg-krim-ochre/[0.05]' : 'border-krim-slate/20 bg-white/[0.015]'
              }`}
            >
              <div className="flex items-baseline gap-3">
                {l.core && <span className="h-6 w-[3px] rounded bg-krim-ochre" aria-hidden />}
                <div>
                  <h3 className="brand-serif text-krim-off-white text-2xl">{l.name}</h3>
                  <p className="brand-sans text-krim-ochre text-sm mt-0.5">{l.eng}</p>
                </div>
              </div>
              <p className="brand-sans text-krim-slate text-[15px] leading-relaxed">{l.desc}</p>
              <div className="hidden md:flex items-center gap-1.5">
                {Array.from({ length: l.cap }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      l.core ? 'bg-krim-ochre/70' : 'bg-krim-slate/40 group-hover:bg-krim-slate/70'
                    }`}
                  />
                ))}
                {l.nodes > l.cap && (
                  <span className="brand-sans text-krim-slate text-xs ml-1">+{l.nodes - l.cap}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="brand-sans text-krim-slate/80 text-sm italic mt-8 max-w-3xl"
        >
          The Sanskrit names describe how the system thinks; the engineering names — Core™, Govern™,
          Studio™ — describe how it runs.
        </motion.p>
      </div>
    </section>
  )
}

// ===========================================================================
// 4 · PRE-EXECUTION VALIDATION — horizontal intercept pipeline
// ===========================================================================
const GATES = [
  { label: 'Propose', sub: 'Co-Worker' },
  { label: 'Intercept', sub: 'Kendra', govern: true },
  { label: 'Govern™', sub: 'Policy rules' },
  { label: 'Geographic', sub: 'Jurisdiction' },
  { label: 'Temporal', sub: 'Contact windows' },
  { label: 'Consent', sub: 'Customer record' },
  { label: 'Risk & Auth', sub: 'Authorisation' },
  { label: 'Execute', sub: 'Permitted', pass: true },
  { label: 'Audit', sub: 'Immutable trail' },
]

function Validation() {
  return (
    <section className="relative py-28 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-2xl mb-16">
          <Eyebrow>Pre-execution validation</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight mb-5">
            No action fires until policy says it can.
          </h2>
          <p className="brand-sans text-krim-slate text-lg leading-relaxed">
            It is not a wrapper or a downstream check. It is an intercept built into the runtime.
            A Co-Worker proposes an action; the runtime stops it, evaluates it against every
            applicable rule, and only then permits it to execute.
          </p>
        </motion.div>

        {/* horizontal pipeline (desktop) / vertical (mobile) */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger}>
          {/* connecting track */}
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-[26px] h-px bg-krim-slate/25" aria-hidden />
            <motion.div
              className="hidden md:block absolute left-0 top-[26px] h-px bg-krim-mint"
              initial={{ width: '0%' }}
              whileInView={{ width: '78%' }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              aria-hidden
            />
            <ol className="grid md:grid-cols-9 gap-6 md:gap-2">
              {GATES.map((g, i) => (
                <motion.li key={g.label} variants={fadeUp} className="relative flex md:flex-col items-center md:items-center gap-4 md:gap-3 md:text-center">
                  <span
                    className={`relative z-10 flex items-center justify-center h-[52px] w-[52px] shrink-0 rounded-full border text-sm font-semibold brand-sans ${
                      g.pass
                        ? 'border-krim-mint bg-krim-mint/10 text-krim-mint'
                        : g.govern
                        ? 'border-krim-ochre bg-krim-ochre/10 text-krim-ochre'
                        : 'border-krim-slate/40 bg-krim-indigo text-krim-off-white'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="md:mt-1">
                    <p className="brand-sans text-krim-off-white text-sm font-medium leading-tight">{g.label}</p>
                    <p className="brand-sans text-krim-slate text-xs mt-0.5">{g.sub}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="brand-serif text-krim-off-white text-xl md:text-2xl leading-snug mt-16 max-w-3xl"
        >
          Compliance violations are not reduced. They are made <span className="text-krim-ochre">structurally
          impossible</span> — because the runtime does not permit the action to fire.
        </motion.p>
      </div>
    </section>
  )
}

// ===========================================================================
// 5 · KARTA — the digital workforce (numbered roster + mode bar)
// ===========================================================================
const COWORKERS = [
  { n: '01', name: 'Contact Center', role: 'Omnichannel communication with context and perfect recall.' },
  { n: '02', name: 'Intelligence & Signal', role: 'Pattern recognition, anomaly detection, predictive analytics.' },
  { n: '03', name: 'Content Generation', role: 'Letters, agreements, reports — policy-compliant, audit-trailed.' },
  { n: '04', name: 'Workflow Designer', role: 'Designs, optimises, and executes complex workflows.' },
  { n: '05', name: 'Decision Engine', role: 'Complex decisions with full explainability.' },
  { n: '06', name: 'Knowledge & Research', role: 'Surfaces precedent, policy, and case history in the moment.' },
  { n: '07', name: 'Compliance & Governance', role: 'Live policy enforcement across every action.' },
  { n: '08', name: 'Risk & Analytics', role: 'Portfolio risk, exposure, segment health, scenario testing.' },
  { n: '09', name: 'Document & Legal', role: 'Ingestion, template generation, evidence-chain assembly.' },
  { n: '10', name: 'Orchestration & Ops', role: 'End-to-end orchestration with human handoff and recovery.' },
]
const MODES = [
  { name: 'Autonomous', desc: 'Acts within policy, end to end.' },
  { name: 'Copilot', desc: 'Proposes; a human approves and acts.' },
  { name: 'Oversight', desc: 'Acts, with humans monitoring and able to intervene.' },
  { name: 'Learning', desc: 'Observes and trains without acting.' },
]

function Workforce() {
  const [mode, setMode] = useState(0)
  return (
    <section className="relative bg-[#15183A] py-28 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-2xl mb-14">
          <Eyebrow>Karta · the digital workforce</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight mb-5">
            AI Co-Workers, not bots.
          </h2>
          <p className="brand-sans text-krim-slate text-lg leading-relaxed">
            Ten utility-based Co-Workers, each composed from primitives, multi-modal, fluent in
            50+ languages, and carrying what they learn in one domain across to the next.
          </p>
        </motion.div>

        {/* roster */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-x-12 gap-y-1 mb-16 border-t border-krim-slate/15"
        >
          {COWORKERS.map((c) => (
            <motion.li
              key={c.n}
              variants={fadeUp}
              className="group flex items-baseline gap-4 py-4 border-b border-krim-slate/15"
            >
              <span className="brand-serif text-krim-slate/60 text-lg tabular-nums w-8 group-hover:text-krim-ochre transition-colors">{c.n}</span>
              <div>
                <h3 className="brand-serif text-krim-off-white text-xl group-hover:text-krim-ochre transition-colors">{c.name}</h3>
                <p className="brand-sans text-krim-slate text-sm mt-0.5">{c.role}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* operating modes */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <p className="brand-sans text-krim-slate text-sm mb-4">
            Four operating modes — a runtime parameter you control, per workflow:
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {MODES.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setMode(i)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium brand-sans transition-colors ${
                  mode === i
                    ? 'bg-krim-ochre text-krim-indigo'
                    : 'border border-krim-slate/30 text-krim-slate hover:text-krim-off-white'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          <p className="brand-sans text-krim-off-white text-lg max-w-xl min-h-[1.75rem]">{MODES[mode].desc}</p>
        </motion.div>
      </div>
    </section>
  )
}

// ===========================================================================
// 6 · INTEGRATION — name wall
// ===========================================================================
const STACK = [
  { cat: 'Core banking / LMS', items: ['Finacle', 'Flexcube', 'BaNCS', 'Profile', 'BBS'] },
  { cat: 'Loan origination (LOS)', items: ['Lentra', 'Tavant', 'Newgen', 'Nucleus'] },
  { cat: 'Telephony', items: ['Genesys', 'NICE CXone', 'Avaya', 'Cisco', 'Exotel', 'Knowlarity'] },
  { cat: 'Channels', items: ['WhatsApp Business', 'Mobile', 'Web', 'IVR', 'SMS'] },
  { cat: 'Data & analytics', items: ['Snowflake', 'BigQuery', 'On-prem DWH', 'Hadoop'] },
]

function Integration() {
  return (
    <section className="relative py-28 md:py-32 px-6">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="lg:sticky lg:top-32 self-start">
          <Eyebrow>Integration</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-5">
            No rip.<br />No replace.
          </h2>
          <p className="brand-sans text-krim-slate text-lg leading-relaxed">
            KrimOS runs on top of what you already run. Your systems of record stay the canonical
            source of truth — the runtime reads from them and writes back on validated channels.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="divide-y divide-krim-slate/15 border-t border-krim-slate/15">
          {STACK.map((row) => (
            <motion.div key={row.cat} variants={fadeUp} className="grid sm:grid-cols-[200px_1fr] gap-3 sm:gap-6 py-6">
              <p className="brand-sans text-krim-slate text-sm uppercase tracking-wider pt-1">{row.cat}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {row.items.map((item) => (
                  <span key={item} className="brand-serif text-krim-off-white/70 text-lg hover:text-krim-off-white transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ===========================================================================
// 7 · IMPACT — oversized metric band
// ===========================================================================
const STATS = [
  { figure: 'days → hours', label: 'Onboarding TAT', note: 'Real-time KYC, bureau pulls, and document processing.' },
  { figure: '40–70%', label: 'Self-serve resolution', note: 'Routine servicing across WhatsApp, voice, IVR, chat.' },
  { figure: '−1–3pp', label: 'DPD 1–30 roll rates', note: '≈ ₹50–100 Cr avoided write-offs on a ₹10,000 Cr book.' },
  { figure: '100%', label: 'Regulated actions pre-validated', note: 'An architectural property, not a programme target.', pass: true },
]

function Impact() {
  return (
    <section className="relative bg-[#15183A] py-28 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-2xl mb-16">
          <Eyebrow>Impact</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            Measured against your own baseline, in 30 days.
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <div className="flex items-start gap-2">
                <span className="brand-serif text-krim-off-white text-[clamp(2.25rem,4vw,3.25rem)] leading-none">{s.figure}</span>
                {s.pass && <span className="mt-2 h-2.5 w-2.5 rounded-full bg-krim-mint shrink-0" aria-hidden />}
              </div>
              <div className="h-px w-12 bg-krim-ochre my-4" />
              <p className="brand-sans text-krim-off-white font-medium mb-1">{s.label}</p>
              <p className="brand-sans text-krim-slate text-sm leading-relaxed">{s.note}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="brand-sans text-krim-slate/80 text-sm italic mt-14">
          Ranges typical of retail-lending deployments, scoped jointly in a 30-day Proof of Value.
          Also observed: 5–10× document throughput per analyst · 30–50% AHT reduction · audit-ready
          reports from days to minutes · workflow build from weeks to hours.
        </motion.p>
      </div>
    </section>
  )
}

// ===========================================================================
// 8 + 9 · TRUSTWORTHY AT SCALE — deployment + certs + lineage
// ===========================================================================
const DEPLOY = [
  { name: 'Sovereign on-prem', who: 'Tier-1 banks & regulated lenders', detail: 'No data, weights, or telemetry leave your premises.', certs: 'RBI · CERT-In · SOC 2 II · ISO 27001' },
  { name: 'Hybrid', who: 'Mid-market lenders', detail: 'Data and inference on-prem; orchestration from Krim cloud.', certs: 'RBI · SOC 2 II · ISO 27001' },
  { name: 'Managed', who: 'Fintechs & pilots', detail: 'Fully managed in your preferred sovereign cloud region.', certs: 'SOC 2 II · ISO 27001 · EU AI Act-ready' },
]
const CERTS = ['RBI Fair Practices', 'CERT-In', 'SOC 2 Type II', 'ISO 27001', 'EU AI Act-ready', 'DPDP · GDPR']
const LINEAGE = [
  { fig: '50', label: 'banks' },
  { fig: '250M+', label: 'customer calls' },
  { fig: '48M', label: 'end users' },
  { fig: '0', label: 'compliance violations', zero: true },
]

function TrustAtScale() {
  return (
    <section className="relative bg-[#13163A] py-28 md:py-32 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-2xl mb-14">
          <Eyebrow>Deployment, security & compliance</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            Sovereign by default. You decide where the intelligence lives.
          </h2>
        </motion.div>

        {/* deployment columns */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid md:grid-cols-3 gap-px bg-krim-slate/15 rounded-xl overflow-hidden mb-10">
          {DEPLOY.map((d) => (
            <motion.div key={d.name} variants={fadeUp} className="bg-[#13163A] p-7 md:p-8">
              <h3 className="brand-serif text-krim-off-white text-xl mb-1">{d.name}</h3>
              <p className="brand-sans text-krim-ochre text-sm mb-4">{d.who}</p>
              <p className="brand-sans text-krim-slate text-[15px] leading-relaxed mb-5">{d.detail}</p>
              <p className="brand-sans text-krim-slate/70 text-xs tracking-wide">{d.certs}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* cert row */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="flex flex-wrap gap-x-8 gap-y-3 mb-20">
          {CERTS.map((c) => (
            <span key={c} className="brand-sans text-krim-slate text-sm">{c}</span>
          ))}
        </motion.div>

        {/* lineage */}
        <div className="border-t border-krim-slate/15 pt-14">
          <motion.h3 initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="brand-serif text-krim-off-white text-2xl md:text-3xl leading-tight mb-3 max-w-3xl">
            This is not our first production deployment in a bank.
          </motion.h3>
          <motion.p initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="brand-sans text-krim-slate text-lg leading-relaxed mb-12 max-w-3xl">
            KrimOS is built by the team that ran Saarthi.ai (2017–2025), India's largest voice-AI
            platform for banking. KrimOS is the architectural evolution of everything that
            experience taught us.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LINEAGE.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div className="flex items-start gap-2">
                  <span className={`brand-serif leading-none text-[clamp(2.5rem,5vw,4rem)] ${s.zero ? 'text-krim-ochre' : 'text-krim-off-white'}`}>{s.fig}</span>
                  {s.zero && <span className="mt-2 h-3 w-3 rounded-full bg-krim-mint shrink-0" aria-hidden />}
                </div>
                <p className="brand-sans text-krim-slate text-sm mt-3">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ===========================================================================
// 10 · ENGAGEMENT + FINAL CTA
// ===========================================================================
const STAGES = [
  { dur: '2 weeks', name: 'Technical deep-dive', out: 'Your architects and ours, against your real stack and constraints.' },
  { dur: '30 days', name: 'Proof of Value', out: 'One workflow, benchmarked against your own baseline.' },
  { dur: '60–90 days', name: 'Pilot deployment', out: 'Production go-live, with a contracted path to the full vertical.', live: true },
]

function Engagement() {
  return (
    <section className="relative py-28 md:py-36 px-6">
      <div className="max-w-[1240px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="max-w-2xl mb-16">
          <Eyebrow>From pilot to scale</Eyebrow>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            A path to production, not a pilot that never ends.
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="relative grid md:grid-cols-3 gap-10 md:gap-6 mb-24">
          <div className="hidden md:block absolute left-0 right-0 top-[10px] h-px bg-krim-slate/25" aria-hidden />
          {STAGES.map((s) => (
            <motion.div key={s.name} variants={fadeUp} className="relative md:pt-10">
              <span className={`hidden md:block absolute left-0 top-[4px] h-4 w-4 rounded-full border-2 ${s.live ? 'border-krim-ochre bg-krim-ochre' : 'border-krim-slate bg-krim-indigo'}`}>
                {s.live && <span className="absolute -right-5 top-0.5 h-2.5 w-2.5 rounded-full bg-krim-mint" aria-hidden />}
              </span>
              <p className="brand-sans text-krim-ochre text-sm font-semibold mb-1">{s.dur}</p>
              <h3 className="brand-serif text-krim-off-white text-xl mb-2">{s.name}</h3>
              <p className="brand-sans text-krim-slate text-[15px] leading-relaxed">{s.out}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* close */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <p className="brand-serif text-krim-off-white text-[clamp(1.5rem,3vw,2.25rem)] leading-snug mb-3">
            KrimOS is the operating system for the operations that cannot afford to be wrong.
          </p>
          <p className="brand-serif text-krim-ochre italic text-xl mb-10">The architecture is the product.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-md bg-krim-ochre text-krim-indigo font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a technical deep-dive
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" size={18} />
            </Link>
            <Link
              to="/kendra"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-krim-ochre/50 text-krim-off-white font-medium hover:bg-krim-ochre/10 transition-colors"
            >
              Explore KrimOS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ===========================================================================
export default function HomePageBrand() {
  return (
    <div className="bg-krim-indigo text-krim-off-white overflow-hidden">
      <Hero />
      <Problem />
      <ArchitectureSection />
      <Validation />
      <Workforce />
      <Integration />
      <Impact />
      <TrustAtScale />
      <Engagement />
    </div>
  )
}

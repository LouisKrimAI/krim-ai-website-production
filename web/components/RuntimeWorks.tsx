'use client'

/**
 * RuntimeWorks — the dark punctuation: how the runtime thinks.
 * Perceive → Reason → Plan → VALIDATE → Act, with the 33-validator membrane
 * (C's grid: three families × eleven cells, lighting on entry) and A's
 * family selector. Ends at the world seam — the receipt waits on paper below.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const FAMILIES = [
  { key: 'Pramāṇa', sub: 'sources of knowledge', body: 'Every premise an action rests on must be verifiable before it proceeds.' },
  { key: 'Doṣa', sub: 'classes of error', body: 'The action is checked against the catalogue of formal failure modes Navya-Nyāya defines.' },
  { key: 'Yogyatā', sub: 'fitness for action', body: 'Time, place, agent, recipient, instrument, manner and purpose must all be satisfied.' },
] as const

function ValidatorMembrane() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const [reduce, setReduce] = useState(false)
  const [lit, setLit] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setReduce(true); setLit(33) }
  }, [])
  useEffect(() => {
    if (!seen || reduce || lit >= 33) return
    const t = setTimeout(() => setLit(lit + 1), 36)
    return () => clearTimeout(t)
  }, [seen, lit, reduce])

  return (
    <div ref={ref} className="grid sm:grid-cols-3 gap-6">
      {FAMILIES.map((f, fi) => (
        <div key={f.key} className="p-6 border border-rline-dim bg-runtime-panel/40">
          <div className="flex gap-1.5 mb-5" aria-hidden>
            {Array.from({ length: 11 }).map((_, ci) => {
              const on = fi * 11 + ci < lit
              return <span key={ci} className="h-[16px] flex-1 transition-colors duration-300" style={{ background: on ? 'rgba(0,255,178,0.85)' : 'rgba(57,214,255,0.10)' }} />
            })}
          </div>
          <p className="font-serif text-[1.15rem] text-rtext mb-0.5">{f.key}</p>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3">{f.sub} · 11</p>
        </div>
      ))}
    </div>
  )
}

export default function RuntimeWorks() {
  const [fam, setFam] = useState<(typeof FAMILIES)[number]['key']>('Pramāṇa')
  const active = FAMILIES.find((f) => f.key === fam)!
  const steps = ['Perceive', 'Reason', 'Plan', 'Validate', 'Act']

  return (
    <section id="runtime" className="bg-runtime-deep relative">
      <div className="world-seam" aria-hidden />
      <div className="mx-auto max-w-site px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease: EASE }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-cyan mb-6">Inside the runtime · Krim-Nyāya</p>
          <h2 className="font-serif font-normal text-rtext text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.01em] mb-6 max-w-[24ch]">
            Pre-execution, not post-audit.
          </h2>
          <p className="font-sans text-[1.05rem] leading-[1.65] text-rtext-2 max-w-[62ch]">
            No action a Karta co-worker proposes fires until it has passed Krim-Nyāya —
            33 validators derived from Mithila&rsquo;s Navya-Nyāya formal logic, a two-thousand-year
            tradition of predicate reasoning. Validation is the runtime, not a wrapper bolted on.
          </p>
        </motion.div>

        {/* pipeline rail — Validate is the gate */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: EASE }}
          className="hidden md:flex items-center mb-14"
        >
          {steps.map((s, i) => (
            <div key={s} className="flex items-center" style={{ flex: s === 'Validate' ? '0 0 auto' : '1 1 0' }}>
              <span
                className={`font-mono text-[12px] tracking-[0.18em] uppercase whitespace-nowrap ${
                  s === 'Validate' ? 'px-5 py-3 border border-mint text-mint bg-mint/5' : 'text-rtext-2'
                }`}
              >
                {s}{s === 'Validate' && ' · 33'}
              </span>
              {i < 4 && <span className={`flex-1 h-px mx-4 ${i === 2 ? 'bg-cyan/40' : 'bg-rline'}`} aria-hidden />}
            </div>
          ))}
        </motion.div>
        <div className="md:hidden mb-12 font-mono text-[12px] tracking-[0.14em] uppercase text-rtext-2">
          Perceive → Reason → Plan → <span className="text-mint">Validate · 33</span> → Act
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease: EASE }}
          className="mb-12"
        >
          <ValidatorMembrane />
        </motion.div>

        {/* family selector (A) */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="flex md:flex-col gap-2">
            {FAMILIES.map((f) => {
              const on = f.key === fam
              return (
                <button
                  key={f.key}
                  onClick={() => setFam(f.key)}
                  className={`text-left px-5 py-3.5 border transition-colors duration-200 ${
                    on ? 'border-mint bg-mint/5' : 'border-rline-soft bg-white/[0.02] hover:border-rline'
                  }`}
                >
                  <span className={`font-serif text-[1.05rem] block ${on ? 'text-rtext' : 'text-rtext-2'}`}>{f.key}</span>
                  <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-rtext-3">{f.sub}</span>
                </button>
              )
            })}
          </div>
          <div className="md:pt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={fam}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="font-serif text-rtext text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.45] max-w-[32ch]"
              >
                {active.body}
              </motion.p>
            </AnimatePresence>
            <p className="font-mono text-[11px] tracking-[0.1em] text-rtext-3 mt-8">
              <span className="text-mint">pass</span> executes · <span className="text-amber-dark">amber</span> holds
              for a human · <span className="text-fail">fail</span> never fires — and the record below holds all three
            </p>
          </div>
        </div>
      </div>
      <div className="world-seam" aria-hidden />
    </section>
  )
}

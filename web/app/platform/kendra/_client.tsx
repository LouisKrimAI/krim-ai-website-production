'use client'

/**
 * Kendra · the validation pipeline — the first power, on the one canvas.
 * Perceive → Reason → Plan → VALIDATE·33 → Act, with Krim-Nyāya's three
 * Navya-Nyāya families lighting the 33-cell membrane on entry. The site's
 * colour grammar holds: cyan = an action still only PROPOSED; mint = the
 * same action once it has cleared the gate and become VALIDATED; gold marks
 * the amber hold. Reduced-motion renders the membrane fully lit, rail static.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const FAMILIES = [
  {
    key: 'Pramāṇa',
    sub: 'sources of knowledge',
    body: 'Every premise the action rests on must be verifiable before it proceeds.',
    // illustrative phrasing, drawn from documented checks — not a new claim
    check: 'the premise — consent on file — is verifiable',
  },
  {
    key: 'Doṣa',
    sub: 'classes of error',
    body: 'The action is tested against the catalogue of formal failure modes Navya-Nyāya defines.',
    check: 'the plan matches no catalogued failure mode',
  },
  {
    key: 'Yogyatā',
    sub: 'fitness for action',
    body: 'Time, place, agent, recipient, instrument, manner and purpose must all be satisfied.',
    check: '21:40 is outside the calling window — time fails',
  },
] as const

/**
 * The 33-validator membrane — one undivided field of 33 cells lighting on
 * entry. Source says "33 across three families"; it does not split them, so
 * neither do we. The three family names label the field; no per-family count.
 */
function ValidatorMembrane() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const [reduce, setReduce] = useState(false)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduce(true)
      setLit(33)
    }
  }, [])

  useEffect(() => {
    if (!seen || reduce || lit >= 33) return
    const t = setTimeout(() => setLit(lit + 1), 38)
    return () => clearTimeout(t)
  }, [seen, lit, reduce])

  return (
    <div ref={ref} className="glass-quiet p-6 md:p-8" aria-hidden>
      <div className="grid grid-cols-12 gap-1.5 md:gap-2">
        {Array.from({ length: 33 }).map((_, i) => {
          const on = i < lit
          return (
            <span
              key={i}
              className="h-[20px] md:h-[24px] rounded-[2px] transition-colors duration-300"
              style={{ background: on ? 'rgba(0,255,178,0.85)' : 'rgba(57,214,255,0.10)' }}
            />
          )
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <p className="font-mono text-[11px] tracking-[0.1em] text-rtext-3">
          33 validators · three families
        </p>
        {FAMILIES.map((f) => (
          <span key={f.key} className="font-serif text-[1.05rem] text-rtext-2">
            {f.key}
          </span>
        ))}
      </div>
    </div>
  )
}

const STEPS = ['Perceive', 'Reason', 'Plan', 'Validate', 'Act'] as const

export default function ValidationPipeline() {
  const [fam, setFam] = useState<(typeof FAMILIES)[number]['key']>('Pramāṇa')
  const active = FAMILIES.find((f) => f.key === fam)!

  return (
    <div>
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-14 md:mb-16"
      >
        <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-cyan mb-6">
          The first power · the gate
        </p>
        <h2 className="font-serif font-light text-rtext text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.01em] mb-7 max-w-[20ch]">
          One step in the loop is a wall.
        </h2>
        <p className="font-sans text-[15.5px] leading-[1.7] text-rtext-2 max-w-[60ch]">
          A Karta perceives, reasons and plans. Then it proposes — and the proposal stops.
          Nothing fires until it has cleared 33 validators drawn from Mithila&rsquo;s Navya-Nyāya,
          a two-thousand-year logic of proof. Validation is the runtime, not a wrapper bolted on.
        </p>
      </motion.div>

      {/* pipeline rail — Validate is the only gate; cyan PROPOSED → mint VALIDATED */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="hidden md:flex items-center mb-14"
      >
        {STEPS.map((s, i) => {
          const gate = s === 'Validate'
          const proposed = s === 'Plan' // the action is still only PROPOSED up to here
          return (
            <div
              key={s}
              className="flex items-center"
              style={{ flex: gate ? '0 0 auto' : '1 1 0' }}
            >
              <span
                className={`font-mono text-[12px] tracking-[0.18em] uppercase whitespace-nowrap ${
                  gate
                    ? 'px-5 py-3 border border-mint text-mint bg-mint/5 rounded-[8px]'
                    : proposed
                      ? 'text-cyan'
                      : 'text-rtext-2'
                }`}
              >
                {s}
                {gate && ' · 33'}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className={`flex-1 h-px mx-4 ${i === 2 ? 'bg-cyan/40' : 'bg-rline'}`}
                  aria-hidden
                />
              )}
            </div>
          )
        })}
      </motion.div>
      <div className="md:hidden mb-12 font-mono text-[12px] tracking-[0.14em] uppercase text-rtext-2 leading-relaxed">
        Perceive → Reason → <span className="text-cyan">Plan</span> →{' '}
        <span className="text-mint">Validate · 33</span> → Act
      </div>

      {/* the membrane */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-14"
      >
        <ValidatorMembrane />
      </motion.div>

      {/* the three families, read one at a time — each with one illustrative check */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <div className="flex md:flex-col gap-2" role="tablist" aria-label="Validator families">
          {FAMILIES.map((f) => {
            const on = f.key === fam
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={on}
                onClick={() => setFam(f.key)}
                className={`text-left px-5 py-3.5 rounded-[8px] border transition-colors duration-200 flex-1 md:flex-none ${
                  on ? 'border-mint bg-mint/5' : 'border-rline-soft bg-white/[0.02] hover:border-rline'
                }`}
              >
                <span className={`font-serif text-[1.05rem] block ${on ? 'text-rtext' : 'text-rtext-2'}`}>
                  {f.key}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-rtext-3">
                  {f.sub}
                </span>
              </button>
            )
          })}
        </div>
        <div className="md:pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={fam}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-serif text-rtext text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.45] max-w-[32ch]">
                {active.body}
              </p>
              {/* one concrete check, illustrative phrasing — not a new claim */}
              <p className="mt-5 font-mono text-[12px] leading-[1.7] text-rtext-2 max-w-[40ch]">
                <span className="text-cyan">e.g.</span> {active.check}
                <span className="block mt-1 text-[10px] tracking-[0.12em] uppercase text-rtext-3">
                  illustrative phrasing
                </span>
              </p>
            </motion.div>
          </AnimatePresence>
          <p className="font-mono text-[11px] tracking-[0.1em] text-rtext-3 mt-8 max-w-[46ch] leading-relaxed">
            <span className="text-mint">pass</span> executes · <span className="text-amber-dark">amber</span> holds
            for a human · <span className="text-fail">fail</span> never fires — and the record below holds all three.
          </p>
        </div>
      </div>
    </div>
  )
}

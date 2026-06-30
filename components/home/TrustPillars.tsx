'use client'

/**
 * TrustPillars — the safety properties every KrimOS action carries.
 * Explainable · Auditable · Trustworthy · Controllable. Section: "You stay in command".
 * Interactive: clicking a tab swaps the deep-dive card below with an
 * AnimatePresence cross-fade. Each pillar has its own colour identity.
 * Facts grounded in docs/krim-content.md (Krim-Nyāya, Krim-Ledger,
 * Kupa, deployment). No invented metrics.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'

const OUT = [0.16, 1, 0.3, 1] as const

// Four properties — substantive, precise content per property.
const PILLARS = [
  {
    id: 'explainable',
    label: 'Explainable',
    hint: 'Ask why, get a reason',
    // mint
    rgb: '0,255,178',
    gradOrb: 'radial-gradient(ellipse at 20% 40%, rgba(0,255,178,0.18) 0%, transparent 60%)',
    headline: 'Every decision, in plain words.',
    body: 'The reasoning is recorded as the action happens, readable without a data scientist in the room.',
    points: [
      { title: 'The reasoning, not just the result.', detail: 'The policy it ran, the validator that cleared it, the logic behind it.' },
      { title: 'Readable by compliance.', detail: 'Plain language your examiner follows directly.' },
      { title: 'Inspections answered same-day.', detail: 'The evidence exists because the validation did.' },
    ],
  },
  {
    id: 'auditable',
    label: 'Auditable',
    hint: 'Proof by construction',
    // cyan
    rgb: '57,214,255',
    gradOrb: 'radial-gradient(ellipse at 80% 25%, rgba(57,214,255,0.18) 0%, transparent 60%)',
    headline: 'The proof builds as the work runs.',
    body: 'Every action streams to a sealed, append-only trail the moment it happens.',
    points: [
      { title: 'Sealed before the next action.', detail: 'Append-only, verifiable, complete by construction.' },
      { title: 'Replayable, any moment.', detail: 'Action, rule, verdict, exactly as it ran.' },
      { title: 'Days to minutes.', detail: 'A three-day audit response, answered in minutes.' },
    ],
  },
  {
    id: 'trustworthy',
    label: 'Trustworthy',
    hint: 'Cleared before it fires',
    // gold / amber
    rgb: '246,186,57',
    gradOrb: 'radial-gradient(ellipse at 15% 75%, rgba(246,186,57,0.18) 0%, transparent 60%)',
    headline: 'Validated before it acts.',
    body: 'Every action clears 33 validators before it can fire.',
    points: [
      { title: '33 validators, pre-execution.', detail: 'Grounding, soundness and permission, on every action.' },
      { title: 'No route around the gate.', detail: 'The validation path is the execution path.' },
      { title: 'Edge cases reach a human.', detail: 'What doesn\'t clear comes to a person, with the rule that stopped it.' },
    ],
  },
  {
    id: 'controllable',
    label: 'Controllable',
    hint: 'Stop it in one click',
    // violet / indigo
    rgb: '147,112,255',
    gradOrb: 'radial-gradient(ellipse at 75% 70%, rgba(147,112,255,0.18) 0%, transparent 60%)',
    headline: 'You remain in control.',
    body: 'Every co-worker runs inside authority limits you set.',
    points: [
      { title: 'Authority per co-worker.', detail: 'What it decides, escalates, or never touches, set by you.' },
      { title: 'Live oversight in Kupa.', detail: 'Halt, modify or escalate any action in real time.' },
      { title: 'Rule changes, no downtime.', detail: 'Tighten policy without restarting the runtime.' },
    ],
  },
] as const

type Idx = 0 | 1 | 2 | 3

export default function TrustPillars() {
  const [active, setActive] = useState<Idx>(0)
  const p = PILLARS[active]

  return (
    <Section hairline>
      {/* ---- section header ---- */}
      <Reveal>
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow>You stay in command</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            AI you can put your name to.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
            No black boxes. Pause, override or roll back from one screen.
          </p>
        </div>
      </Reveal>

      {/* ---- tab cards ---- */}
      <Reveal delay={0.1}>
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {PILLARS.map((pillar, i) => {
            const isActive = i === active
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActive(i as Idx)}
                className="group relative h-full w-full overflow-hidden rounded-[20px] p-px text-left outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                style={{
                  background: isActive
                    ? `linear-gradient(145deg, rgba(${pillar.rgb},0.65) 0%, rgba(${pillar.rgb},0.18) 55%, rgba(255,255,255,0.07) 100%)`
                    : `linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)`,
                }}
              >
                {/* hover sheen overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.03]" />

                <div
                  className="relative h-full overflow-hidden rounded-[19px] p-6 md:p-7"
                  style={{
                    background: isActive
                      ? `${pillar.gradOrb}, rgba(10,11,15,0.93)`
                      : `rgba(10,11,15,0.70)`,
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                  }}
                >
                  {/* top accent bar */}
                  <span
                    className="block rounded-full"
                    style={{
                      height: '3px',
                      width: isActive ? '38px' : '18px',
                      background: isActive
                        ? `rgb(${pillar.rgb})`
                        : `rgba(${pillar.rgb},0.38)`,
                      transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
                    }}
                  />

                  {/* word */}
                  <p
                    className="mt-5 font-serif leading-none tracking-[-0.01em]"
                    style={{
                      fontSize: 'clamp(1.5rem,2.4vw,1.95rem)',
                      color: isActive ? `rgb(${pillar.rgb})` : 'rgba(255,255,255,0.68)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {pillar.label}
                  </p>

                  {/* one-liner */}
                  <p className="mt-3 font-sans text-[12px] leading-relaxed text-ink-3">
                    {pillar.hint}
                  </p>

                  {/* active pip — shared layout animation */}
                  {isActive && (
                    <motion.span
                      layoutId="trust-pip"
                      className="absolute bottom-[18px] right-[18px] block rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        background: `rgb(${pillar.rgb})`,
                        boxShadow: `0 0 8px rgba(${pillar.rgb},0.8)`,
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* ---- deep-dive card ---- */}
      <Reveal delay={0.16}>
        {/* gradient border wrapper — updates colour with active pillar */}
        <div
          className="relative mt-3 overflow-hidden rounded-[22px] p-px"
          style={{
            background: `linear-gradient(145deg, rgba(${p.rgb},0.60) 0%, rgba(${p.rgb},0.14) 45%, rgba(255,255,255,0.06) 100%)`,
            transition: 'background 0.6s ease',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[21px]"
            style={{
              background: `${p.gradOrb}, rgba(10,11,15,0.92)`,
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              transition: 'background 0.6s ease',
            }}
          >
            {/* ambient corner glow */}
            <AnimatePresence>
              <motion.div
                key={`glow-${p.id}`}
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full blur-[90px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ background: `rgba(${p.rgb},0.14)` }}
              />
            </AnimatePresence>

            {/* content — cross-fades on tab switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: OUT }}
                className="relative grid gap-8 p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-12"
              >
                {/* left — headline + body */}
                <div className="flex flex-col justify-center">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.24em]"
                    style={{ color: `rgba(${p.rgb},0.65)` }}
                  >
                    {p.label}
                  </p>
                  <h3 className="mt-4 font-serif text-[clamp(1.7rem,2.9vw,2.5rem)] leading-[1.1] tracking-[-0.015em] text-ink">
                    {p.headline}
                  </h3>
                  <p className="mt-5 font-sans text-body leading-[1.72] text-ink-2">
                    {p.body}
                  </p>
                </div>

                {/* right — punchy proof points, borderless */}
                <div className="flex flex-col justify-center gap-6">
                  {p.points.map((pt) => (
                    <div key={pt.title} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className="mt-[7px] block h-3 w-[2px] shrink-0 rounded-full"
                        style={{ background: `rgb(${p.rgb})` }}
                      />
                      <div>
                        <p className="font-serif text-[1.1rem] leading-snug text-ink">{pt.title}</p>
                        <p className="mt-1 font-sans text-[13px] leading-relaxed text-ink-3">{pt.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

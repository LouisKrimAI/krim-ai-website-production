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
    hint: 'Every decision, in plain words',
    // mint
    rgb: '0,255,178',
    gradOrb: 'radial-gradient(ellipse at 20% 40%, rgba(0,255,178,0.18) 0%, transparent 60%)',
    headline: 'Every decision, in plain words.',
    body: 'KrimOS doesn\'t record what happened and leave you to reconstruct why. Every action a co-worker takes is tied to the policy it ran against, the validator that cleared it, and the reasoning that produced it — written in language your operations team and your examiner can follow, without a data scientist in the room. When a regulator asks why a borrower was contacted or a credit decision was made, the answer was recorded as it happened.',
    points: [
      {
        title: 'The reasoning chain, not just the output',
        detail: 'Every action records the policy it ran against, the validator that cleared it, and the logic that produced the result.',
      },
      {
        title: 'Readable by compliance — not just engineers',
        detail: 'Written in plain language, so your examiner can follow the decision trail directly without specialist interpretation.',
      },
      {
        title: 'Inspections answered the same day',
        detail: 'No reconstruction needed. The evidence exists because the validation exists — built as the work ran.',
      },
    ],
  },
  {
    id: 'auditable',
    label: 'Auditable',
    hint: 'The proof is built as the work runs',
    // cyan
    rgb: '57,214,255',
    gradOrb: 'radial-gradient(ellipse at 80% 25%, rgba(57,214,255,0.18) 0%, transparent 60%)',
    headline: 'The proof is built as the work runs.',
    body: 'Krim-Ledger streams every action, decision, prompt, output and validation to a sealed, append-only, cryptographically verifiable trail the moment it happens — not reconstructed after the fact, not exported from logs. Every entry is timestamped, signed and replayable: what happened, under which rule, and what the verdict was. An audit response that once took three days is answered in minutes.',
    points: [
      {
        title: 'Sealed before the next action fires',
        detail: 'Append-only and cryptographically verifiable. Nothing is assembled after the fact — the record is complete by construction.',
      },
      {
        title: 'Replayable: any decision, any moment',
        detail: 'Action · rule · verdict. Replay any moment in your operation\'s history deterministically, exactly as it ran.',
      },
      {
        title: 'Court-admissible, generated automatically',
        detail: 'The record is created by the runtime, not assembled for compliance — which means it cannot be missing or incomplete.',
      },
    ],
  },
  {
    id: 'trustworthy',
    label: 'Trustworthy',
    hint: 'Validated before it acts',
    // gold / amber
    rgb: '246,186,57',
    gradOrb: 'radial-gradient(ellipse at 15% 75%, rgba(246,186,57,0.18) 0%, transparent 60%)',
    headline: 'Validated before it acts — not audited after.',
    body: 'Before any co-worker takes an action, it clears Krim-Nyāya: 33 validators across grounding, soundness and permission. The few that don\'t pass are surfaced to a person, with the rule that stopped them in plain words. The system never executes an instruction it hasn\'t cleared — not because of guardrails bolted on later, but because the validation gate is the execution path itself.',
    points: [
      {
        title: '33 validators, pre-execution',
        detail: 'Grounding, soundness and permission — every action clears all three validator families before it can fire.',
      },
      {
        title: 'No action without clearance',
        detail: 'The validation gate is the execution path. There is no route around it — not a shortcut, not a fallback mode.',
      },
      {
        title: 'Edge cases surface to a human',
        detail: 'The few actions that don\'t clear automatically reach a person, with the rule that stopped them explained in plain words.',
      },
    ],
  },
  {
    id: 'controllable',
    label: 'Controllable',
    hint: 'Authority stays with you throughout',
    // violet / indigo
    rgb: '147,112,255',
    gradOrb: 'radial-gradient(ellipse at 75% 70%, rgba(147,112,255,0.18) 0%, transparent 60%)',
    headline: 'You remain in control of every call.',
    body: 'Every co-worker operates within defined authority limits — the decisions it makes alone, the ones it surfaces for sign-off, and the ones it never touches. Kupa gives your teams a live view of every active workflow, and any action can be halted, modified or escalated in real time. Rules can be tightened without restarting the runtime. The controls stay with you as the system grows more capable.',
    points: [
      {
        title: 'Defined authority per co-worker',
        detail: 'Clear limits on what each agent decides alone, what it escalates, and what it never touches — set and adjustable by you.',
      },
      {
        title: 'Live oversight in Kupa',
        detail: 'Watch every active workflow in real time. Halt, modify or escalate any action from one command centre.',
      },
      {
        title: 'Rule changes without downtime',
        detail: 'Tighten or adjust policies without restarting the runtime. Every change validates before it takes effect.',
      },
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
            Every action, auditable and traceable.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
            Validation before action. A runtime you can trust.
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
                className="group relative overflow-hidden rounded-[20px] p-px text-left outline-none focus-visible:ring-2 focus-visible:ring-white/20"
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
                      fontSize: 'clamp(1.35rem,2.2vw,1.7rem)',
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

                {/* right — proof points */}
                <div className="flex flex-col justify-center gap-3">
                  {p.points.map((pt) => (
                    <div
                      key={pt.title}
                      className="rounded-[14px] p-4 md:p-5"
                      style={{
                        background: `rgba(${p.rgb},0.07)`,
                        border: `1px solid rgba(${p.rgb},0.18)`,
                      }}
                    >
                      {/* left accent bar */}
                      <div className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[5px] block h-[calc(100%-5px)] w-[2px] shrink-0 rounded-full opacity-60"
                          style={{ background: `rgb(${p.rgb})` }}
                        />
                        <div>
                          <p className="font-serif text-[1.0rem] leading-[1.3] text-ink">
                            {pt.title}
                          </p>
                          <p className="mt-1.5 font-sans text-[12.5px] leading-relaxed text-ink-3">
                            {pt.detail}
                          </p>
                        </div>
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

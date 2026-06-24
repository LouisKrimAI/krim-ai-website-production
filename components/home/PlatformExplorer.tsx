'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Layer = {
  key: string
  name: string
  tag: string
  summary: string
  points: string[]
  href: string
}

const LAYERS: Layer[] = [
  {
    key: 'kendra',
    name: 'Kendra',
    tag: 'The runtime',
    summary: 'The governed perimeter that lets a risk committee say yes to AI.',
    points: [
      'Every action gated before it fires — against regulatory frameworks and policy.',
      'One immutable record: what ran, why, and under which rule.',
      'Every outcome feeds the World Lending Model — the operation sharpens as it runs.',
    ],
    href: '/platform/kendra',
  },
  {
    key: 'kriya',
    name: 'Kriya',
    tag: 'The actions',
    summary: 'Change a rule once — not across a hundred scripts.',
    points: [
      '250+ validated, credit-native actions: bureau pulls, payments, notices, calls.',
      'Rules travel with the action — a policy change lands everywhere at once.',
      'The layer that gets you past Compliance and Legal.',
    ],
    href: '/platform/kriya',
  },
  {
    key: 'karta',
    name: 'Karta',
    tag: 'The co-workers',
    summary: 'The book can grow without the cost line growing with it.',
    points: [
      'AI co-workers across the full lifecycle — onboarding, servicing, collections.',
      'Every channel, every language: voice, SMS, email, WhatsApp, in-app.',
      'They act, not just advise — credit decisions stay with you.',
    ],
    href: '/platform/karta',
  },
  {
    key: 'kupa',
    name: 'Kupa',
    tag: 'The command center',
    summary: 'Catch the loss earlier; scale oversight without scaling headcount.',
    points: [
      'A live ops floor: every queue, call and SLA — with one-click step-in.',
      'A portfolio window: roll-rates, cost-to-collect, segments still within reach.',
      'Every action supervised, reversible and on the record — always.',
    ],
    href: '/platform/kupa',
  },
  {
    key: 'kula',
    name: 'Kula',
    tag: 'The copilot',
    summary: 'The question that used to be a ticket, answered in the conversation.',
    points: [
      'Ask anything in plain language — and get the report, or the action.',
      'Every role sees the operation through its own lens — same truth, different shape.',
      'It proposes; a person signs off; nothing fires without the runtime\'s check.',
    ],
    href: '/platform/kula',
  },
  {
    key: 'krimkar',
    name: 'Krimkar',
    tag: 'The consumer app',
    summary: 'The customer-facing application — one relationship, every channel.',
    points: [
      'Kira, the AI advisor — one thread from application to payoff, every channel.',
      'Voice, SMS, WhatsApp, email, in-app — 50+ languages, one voice.',
      'Validated before every action — safe in front of customers.',
    ],
    href: '/platform/kira',
  },
  {
    key: 'kira',
    name: 'Kira',
    tag: 'The advisor',
    summary: 'The AI that customers talk to — one relationship, the whole lifecycle.',
    points: [
      'Meets borrowers on WhatsApp, voice, IVR, email and SMS — one thread.',
      'Speaks their language, clarifies ambiguity, acts only within consent.',
      'Hands off to a person — with full context — when a moment needs one.',
    ],
    href: '/platform/kira',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function PlatformExplorer() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState('kendra')
  const layer = LAYERS.find((l) => l.key === active) ?? LAYERS[0]

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      {/* ---- left: selectable layer stack — responsive layout ---- */}
      <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:gap-7">
        <div className="flex flex-col gap-1.5 lg:h-[460px]" role="tablist" aria-label="The KrimOS platform layers">
        {LAYERS.map((l) => {
          const isActive = l.key === active
          return (
            <button
              key={l.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="krim-layer-detail"
              onMouseEnter={() => setActive(l.key)}
              onFocus={() => setActive(l.key)}
              onClick={() => setActive(l.key)}
              className="group relative flex-1 overflow-hidden rounded-lg border px-4 py-2 text-left transition-[border-color,background-color,box-shadow] duration-300 flex items-center"
              style={{
                borderColor: isActive ? 'rgba(0,255,178,0.34)' : 'rgba(255,255,255,0.07)',
                backgroundColor: isActive ? 'rgba(0,255,178,0.04)' : 'rgba(255,255,255,0.01)',
                boxShadow: isActive
                  ? '0 0 0 1px rgba(0,255,178,0.10), 0 10px 36px -20px rgba(0,255,178,0.4)'
                  : 'none',
              }}
            >
              {/* active mint rail */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-2 left-0 w-[2px] rounded-full bg-mint transition-opacity duration-300"
                style={{ opacity: isActive ? 0.9 : 0 }}
              />
              <div className="flex items-center justify-between gap-3 pl-1">
                <span
                  className="font-serif text-[1.2rem] leading-none transition-colors duration-300"
                  style={{ color: isActive ? 'var(--text)' : 'var(--text-2)' }}
                >
                  {l.name}
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{ color: isActive ? 'var(--mint)' : 'var(--text-3)' }}
                >
                  {l.tag}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* ---- right: fixed-height detail card ---- */}
      <div
        id="krim-layer-detail"
        role="tabpanel"
        className="lume glass relative overflow-hidden rounded-lg p-8 md:p-10 lg:h-[460px]"
      >
        {/* faint cyan core glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(57,214,255,0.10), rgba(57,214,255,0))' }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={layer.key}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            className="relative grid h-full grid-rows-[auto_auto_1fr_auto]"
          >
            {/* tag + name */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
                {layer.tag}
              </p>
              <h3 className="mt-2.5 font-serif text-[clamp(1.9rem,3vw,2.3rem)] leading-tight text-ink">
                {layer.name}
              </h3>
            </div>

            {/* summary */}
            <p className="mt-4 font-sans text-body-lg text-ink-2">
              {layer.summary}
            </p>

            {/* bullets */}
            <ul className="mt-6 space-y-2.5">
              {layer.points.map((p) => (
                <li key={p} className="flex gap-3 font-sans text-body text-ink-2">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-mint opacity-70"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* explore link — anchored to bottom, stylish ghost-mint pill */}
            <div className="mt-auto border-t border-white/[0.06] pt-6">
              <Link
                href={layer.href}
                className="group inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.04] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90 transition-all duration-300 hover:border-mint/55 hover:bg-mint/[0.10] hover:text-mint hover:shadow-[0_0_26px_-8px_rgba(0,255,178,0.55)]"
              >
                Explore {layer.name}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

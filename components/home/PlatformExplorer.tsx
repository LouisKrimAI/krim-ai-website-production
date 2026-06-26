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
    summary: 'The governed runtime a risk committee can say yes to.',
    points: [
      'Every action gated before it fires, against your rules.',
      'One immutable record: what ran, why, under which rule.',
      'Every outcome captured, feeding the work of the World Lending Model.',
    ],
    href: '/krimos/kendra',
  },
  {
    key: 'kriya',
    name: 'Kriya',
    tag: 'The actions',
    summary: 'Change a rule once, not across a hundred scripts.',
    points: [
      '500+ validated, credit-native actions, ready to use.',
      'Rules travel with the action: change once, live everywhere.',
      'The layer that gets you past Compliance and Legal.',
    ],
    href: '/krimos/kriya',
  },
  {
    key: 'karta',
    name: 'Karta',
    tag: 'The co-workers',
    summary: 'The book can grow without the cost line growing with it.',
    points: [
      'AI co-workers across the full lending lifecycle.',
      'Voice, SMS, email and WhatsApp: in the customer’s own language.',
      'They act, not just advise. Credit decisions stay yours.',
    ],
    href: '/krimos/karta',
  },
  {
    key: 'kupa',
    name: 'Kupa',
    tag: 'The command center',
    summary: 'See the whole operation live, and step in when it matters.',
    points: [
      'Live dashboards and analytics: every queue, call and SLA.',
      'Real-time escalation; one-click pause, reroute or rollback.',
      'Every action supervised, reversible and on the record.',
    ],
    href: '/krimos/kupa',
  },
  {
    key: 'kula',
    name: 'Kula',
    tag: 'The digital twin',
    summary: 'Your operation in plain language: ask, and it does the work.',
    points: [
      'Ask in plain language, by text or voice.',
      'It builds the workflow and runs it, on your sign-off.',
      'Tuned to your role: each seat meets a different Kula.',
    ],
    href: '/krimos/kula',
  },
  {
    key: 'kira',
    name: 'Kira & Krimkar',
    tag: 'The customer advisor',
    summary: 'The advisor your customers meet, and the app it lives in.',
    points: [
      'One thread from application to payoff, every channel.',
      'Speaks their language; acts only within consent.',
      'Hands to a person, with full context, when it matters.',
    ],
    href: '/krimos/kira',
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
        <div className="flex flex-col gap-1.5 lg:h-[420px]" role="tablist" aria-label="The KrimOS platform layers">
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
        className="lume glass relative overflow-hidden rounded-lg p-8 md:p-10 lg:h-[420px]"
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

            {/* summary — fixed 2-line reserve so the bullets below always start at
                the same Y, whatever the summary length */}
            <p className="mt-4 min-h-[3.4rem] font-sans text-body-lg text-ink-2">
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

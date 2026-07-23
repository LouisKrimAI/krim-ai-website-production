'use client'

import { Fragment, useState } from 'react'
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
    summary: 'The engine every co-worker runs on.',
    points: [
      'Deny by default: nothing runs that your rules haven’t cleared.',
      'One immutable record: what ran, why, under which rule.',
      'Every outcome captured, feeding Kovida, the world model.',
    ],
    href: '/krimos/kendra',
  },
  {
    key: 'kriya',
    name: 'Kriya',
    tag: 'The actions',
    summary: 'The building blocks every workflow is made of.',
    points: [
      '500+ validated, credit-native actions, ready to use.',
      'Rules travel with the action: change once, live everywhere.',
      'The layer Compliance and Legal sign off on.',
    ],
    href: '/krimos/kriya',
  },
  {
    key: 'karta',
    name: 'Karta',
    tag: 'The co-workers',
    summary: 'Handle more volume without adding headcount.',
    points: [
      'AI co-workers across the full lending lifecycle.',
      'Voice, SMS, email and WhatsApp: in the customer’s own language.',
      'They finish the work themselves. Credit decisions stay yours.',
    ],
    href: '/krimos/karta',
  },
  {
    key: 'kupa',
    name: 'Kupa & Kula',
    tag: 'For your teams',
    summary: 'Direct the operation in plain language, and hold every control.',
    points: [
      'Ask in plain language: Kula builds the plan, you sign off.',
      'Live dashboards and analytics: every queue, call and SLA.',
      'One-click pause or rollback; everything on the record.',
    ],
    href: '/krimos/kupa',
  },
  {
    key: 'kira',
    name: 'Krimkar & Kira',
    tag: 'For your customers',
    summary: 'The AI your customers talk to.',
    points: [
      'One thread from application to payoff, every channel.',
      'Speaks their language; acts only within consent.',
      'Hands to a person, with full context, when it matters.',
    ],
    href: '/krimkar',
  },
]

// The stack reads the way the system is used: the engine, then the ways in.
const GROUPS = [
  { label: 'The core', keys: ['kendra', 'kriya', 'karta'] },
  { label: 'The ways in', keys: ['kupa', 'kira'] },
] as const

const EASE = [0.16, 1, 0.3, 1] as const

export default function PlatformExplorer() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState('kendra')
  const layer = LAYERS.find((l) => l.key === active) ?? LAYERS[0]

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      {/* SSR discovery floor: the detail panel mounts only the active layer, so
          every layer's substance is server-rendered here for crawlers/readers. */}
      <ul className="sr-only">
        {LAYERS.map((l) => (
          <li key={l.key}>
            {l.name} ({l.tag}): {l.summary} {l.points.join(' ')}
          </li>
        ))}
      </ul>
      {/* ---- left: selectable layer stack — responsive layout ---- */}
      <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:gap-7">
        <div className="flex flex-col gap-1.5 lg:h-[420px]" role="tablist" aria-label="The KrimOS platform layers">
        {GROUPS.map((g, gi) => (
          <Fragment key={g.label}>
            {/* group label — the stack reads: the engine, then the ways in.
                aria-hidden: the per-tab tag already orients screen readers, so
                the tablist owns only tabs. */}
            <p
              aria-hidden="true"
              className={`px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 ${gi > 0 ? 'pt-2.5' : ''}`}
            >
              {g.label}
            </p>
            {g.keys.map((key) => {
              const l = LAYERS.find((x) => x.key === key)!
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
                  className="group relative flex flex-1 items-center overflow-hidden rounded-lg border px-4 py-2 text-left transition-[border-color,box-shadow] duration-300"
                  style={{
                    borderColor: isActive ? 'rgba(0,255,178,0.34)' : 'rgba(255,255,255,0.11)',
                    // same dark legible base as .glass — the ring stays a hint
                    background: isActive
                      ? 'linear-gradient(152deg, rgba(0,255,178,0.08) 0%, rgba(0,255,178,0.02) 60%, rgba(255,255,255,0.02) 100%), rgba(9,11,16,0.8)'
                      : 'linear-gradient(152deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.014) 46%, rgba(255,255,255,0.024) 100%), rgba(9,11,16,0.8)',
                    backdropFilter: 'blur(22px) saturate(135%)',
                    WebkitBackdropFilter: 'blur(22px) saturate(135%)',
                    boxShadow: isActive
                      ? '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 1px 1px 0 rgba(0,255,178,0.16) inset, 0 10px 36px -20px rgba(0,255,178,0.4), 0 10px 30px -18px rgba(2,4,10,0.6)'
                      : '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 1px 1px 0 rgba(255,255,255,0.12) inset, 0 10px 30px -18px rgba(2,4,10,0.55)',
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
          </Fragment>
        ))}
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
              <h3 className="mt-2.5 font-serif text-display-3 text-ink">
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
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.04] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90 transition-all duration-300 hover:border-mint/55 hover:bg-mint/[0.10] hover:text-mint hover:shadow-[0_0_26px_-8px_rgba(0,255,178,0.55)]"
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

'use client'

/**
 * PlatformLayers — the KrimOS stack, as one elegant vertical column.
 *
 * DECK ORDER (KrimOS Introduction · "What's inside KrimOS"), top → bottom —
 * from the apps people use to the model everything rests on:
 *
 *   Kupa & Kula     — the command center for your teams
 *   Krimkar & Kira  — the app and advisor for your customers
 *   Karta           — the AI co-workers
 *   Kendra          — the engine, and the validation gate (Krim-Nyāya)
 *   Kriya           — the library of compliance-encoded actions
 *   Kovida          — the world lending model, the foundation (gold)
 *
 * Every part gets its OWN row (owner rule — no merged double-boxes), and the
 * stack is never described by count. Names/tags mirror components/krimos/
 * layers.ts — keep the two in step. Micro-motion (GPU-only): a signal rises
 * from the Kovida foundation up through the strata; the foundation breathes
 * gold; hover lifts a layer with a mint edge (.lume). Reduced motion settles
 * instantly.
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

type Tone = 'surface' | 'operating' | 'core' | 'foundation'

type Layer = {
  key: string
  name: string
  role: string
  tag: string
  tone: Tone
  /** the layer's own page — every row is a doorway, so the hub needs no
   *  separate grid of links underneath */
  href: string
}

const LAYERS: Layer[] = [
  {
    key: 'kupa',
    href: '/krimos/kupa',
    name: 'Kupa & Kula',
    role: 'The command center for your teams: run the operation in plain language, and supervise, configure and audit it from one pane.',
    tag: 'FOR YOUR TEAMS',
    tone: 'surface',
  },
  {
    key: 'kira',
    href: '/krimkar',
    name: 'Krimkar & Kira',
    role: 'The app and advisor for your customers: every channel, one relationship, an AI advisor that remembers.',
    tag: 'FOR YOUR CUSTOMERS',
    tone: 'surface',
  },
  {
    key: 'karta',
    href: '/krimos/karta',
    name: 'Karta',
    role: 'The AI co-workers that run the lending lifecycle, each composed from validated primitives and held to measured outcomes.',
    tag: 'CO-WORKERS',
    tone: 'operating',
  },
  {
    key: 'kendra',
    href: '/krimos/kendra',
    name: 'Kendra',
    role: 'The engine that runs every co-worker, and the gate every decision must clear first: Krim-Nyāya validates before anything acts.',
    tag: 'THE ENGINE & THE GATE',
    tone: 'core',
  },
  {
    key: 'kriya',
    href: '/krimos/kriya',
    name: 'Kriya',
    role: 'The library of compliance-encoded actions built for credit: 500+ in all, and every workflow is composed from them.',
    tag: 'ACTION LIBRARY',
    tone: 'operating',
  },
  {
    key: 'kovida',
    href: '/research/world-lending-model',
    name: 'Kovida',
    role: 'The world lending model at the foundation, tuned on your institution’s own recorded outcomes. Every cycle makes the next decision sharper.',
    tag: 'WORLD LENDING MODEL',
    tone: 'foundation',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function PlatformLayers() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes krim-pl-rise {
  0%   { transform: translate3d(-50%, 0, 0) scaleY(0.6); opacity: 0; }
  8%   { opacity: 0.9; }
  46%  { transform: translate3d(-50%, calc(-1 * var(--krim-pl-travel)), 0) scaleY(1); opacity: 0.9; }
  54%  { opacity: 0; }
  100% { transform: translate3d(-50%, calc(-1 * var(--krim-pl-travel)), 0) scaleY(0.6); opacity: 0; }
}
@keyframes krim-pl-breathe {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.06); }
}
@keyframes krim-pl-coreline {
  0%, 100% { opacity: 0.22; }
  50%      { opacity: 0.5; }
}
@media (prefers-reduced-motion: reduce) {
  .krim-pl-signal, .krim-pl-glow, .krim-pl-coreline { animation: none !important; }
  .krim-pl-signal { opacity: 0 !important; }
  .krim-pl-glow { opacity: 0.7 !important; transform: none !important; }
}
`,
        }}
      />

      {/* rendered unconditionally — RM is handled by the CSS media block
          above (hydration: SSR must match a reduced-motion client's tree) */}
      {(
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[70px] top-2 z-0"
          style={{ ['--krim-pl-travel' as string]: '540px' }}
        >
          <div
            className="krim-pl-signal absolute bottom-0 left-1/2 h-[120px] w-px"
            style={{
              background:
                'linear-gradient(to top, rgba(200,161,74,0) 0%, rgba(57,214,255,0.85) 55%, rgba(57,214,255,0) 100%)',
              filter: 'blur(0.4px)',
              animation: 'krim-pl-rise 7.5s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="krim-pl-coreline absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to top, rgba(200,161,74,0.4) 0%, rgba(57,214,255,0.12) 40%, rgba(57,214,255,0) 100%)',
              animation: 'krim-pl-coreline 7.5s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
            }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-2.5">
        {LAYERS.map((layer, i) => (
          <LayerRow
            key={layer.key}
            layer={layer}
            index={i}
            reduce={!!reduce}
            isHover={hover === layer.key}
            onHover={setHover}
          />
        ))}
      </div>
    </div>
  )
}

function LayerRow({
  layer,
  index,
  reduce,
  isHover,
  onHover,
}: {
  layer: Layer
  index: number
  reduce: boolean
  isHover: boolean
  onHover: (k: string | null) => void
}) {
  const isCore = layer.tone === 'core'
  const isSurface = layer.tone === 'surface'
  const isFoundation = layer.tone === 'foundation'
  const glassClass = isCore ? 'glass glass-cyan' : isSurface ? 'glass glass-mint' : 'glass'
  const accentBorder = isFoundation
    ? 'rgba(200,161,74,0.55)'
    : isCore
      ? 'rgba(57,214,255,0.5)'
      : 'rgba(0,255,178,0.5)'
  const accentGlow = isFoundation
    ? 'rgba(200,161,74,0.6)'
    : isCore
      ? 'rgba(57,214,255,0.55)'
      : 'rgba(0,255,178,0.55)'
  const tagColor = isFoundation
    ? { color: 'rgba(200,161,74,0.9)' }
    : isCore
      ? { color: 'rgba(57,214,255,0.75)' }
      : undefined

  return (
    <motion.div
      initial={{ y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: index * 0.07 }}
    >
      <Link
        href={layer.href}
        aria-label={`${layer.name} — ${layer.role}`}
        className={`lume group relative block overflow-hidden rounded-lg py-5 pl-6 pr-16 outline-none focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-mint/70 sm:px-16 ${glassClass}`}
        style={isFoundation ? { borderColor: 'rgba(200,161,74,0.38)' } : undefined}
        onMouseEnter={() => onHover(layer.key)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(layer.key)}
        onBlur={() => onHover(null)}
      >
        {/* mint accent edge on hover — left rail */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-2 left-0 w-px rounded-full transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--mint), transparent)', opacity: isHover ? 0.9 : 0 }}
        />

        {isFoundation && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 140% at 50% 120%, rgba(200,161,74,0.16) 0%, rgba(200,161,74,0.04) 45%, rgba(200,161,74,0) 75%)',
              }}
            />
            <span
              aria-hidden
              className="krim-pl-glow pointer-events-none absolute -bottom-6 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(200,161,74,0.35), rgba(200,161,74,0))',
                animation: 'krim-pl-breathe 7s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
                willChange: 'transform, opacity',
              }}
            />
          </>
        )}

        <div className="relative text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-serif text-[1.5rem] leading-none text-ink">{layer.name}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3" style={tagColor}>
              {layer.tag}
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-[52ch] font-sans text-[16.5px] leading-relaxed text-ink-2">
            {layer.role}
          </p>
        </div>

        {/* the doorway: a small arrow seated on the right edge, lighting up
            with its layer's own colour on hover/focus */}
        <span
          aria-hidden
          className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-white/[0.03] font-serif text-[1.05rem] leading-none text-ink-3 transition-all duration-fast group-hover:translate-x-0.5 group-hover:text-ink group-focus-visible:translate-x-0.5 sm:right-5"
          style={{
            borderColor: isHover ? accentBorder : undefined,
            boxShadow: isHover ? `0 0 18px -6px ${accentGlow}` : undefined,
          }}
        >
          →
        </span>
      </Link>
    </motion.div>
  )
}

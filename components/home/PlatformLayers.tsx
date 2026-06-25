'use client'

/**
 * PlatformLayers — homepage "one operating system" visual.
 *
 * KrimOS as an elegant vertical stack of centred glass strata. Top → bottom:
 *
 *   Kula · Kira   — the two interface faces people talk to (NOT minds)
 *   Kupa          — the command center your teams run operations from
 *   Karta         — the co-workers (operating layer)
 *   Kriya         — the validated vocabulary (operating layer)
 *   Kendra        — the brain: a luminous cyan foundation the stack rests on
 *
 * Each row is centre-aligned: the name and its label sit together, the
 * explanation reads beneath. Micro-motion (GPU-only): a cyan signal rises
 * from the Kendra core through the strata; the core breathes; hover lifts a
 * layer with a mint edge (.lume). Reduced motion settles instantly.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Tone = 'surface' | 'operating' | 'core'

type Layer = {
  key: string
  name: string
  role: string
  tag: string
  tone: Tone
  name2?: string
  role2?: string
  tag2?: string
}

/** Top → bottom: the two human-facing surfaces (enterprise + customer), then the
 *  co-workers, the vocabulary, and the brain the whole stack rests on. */
const LAYERS: Layer[] = [
  {
    key: 'faces',
    name: 'Kula & Kupa',
    role: 'Run your operation in plain language. Supervise, configure and audit it from one command center.',
    tag: 'YOUR TEAMS',
    name2: 'Kira & Krimkar',
    role2: 'The AI advisor your customers meet on every channel, in the Krimkar app.',
    tag2: 'YOUR CUSTOMERS',
    tone: 'surface',
  },
  {
    key: 'karta',
    name: 'Karta',
    role: 'The AI co-workers that run the lending lifecycle, each composed from validated primitives and held to measured outcomes.',
    tag: 'CO-WORKERS',
    tone: 'operating',
  },
  {
    key: 'kriya',
    name: 'Kriya',
    role: 'The validated, credit-native actions every co-worker is built from: 500+ in all.',
    tag: 'PRIMITIVES',
    tone: 'operating',
  },
  {
    key: 'kendra',
    name: 'Kendra',
    role: 'The brain: the governed runtime where Krim-Nyāya validates every action and Krim-Learn builds the World Lending Model from every outcome.',
    tag: 'RUNTIME · NYĀYA · LEARN',
    tone: 'core',
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

      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[70px] top-2 z-0"
          style={{ ['--krim-pl-travel' as string]: '360px' }}
        >
          <div
            className="krim-pl-signal absolute bottom-0 left-1/2 h-[120px] w-px"
            style={{
              background:
                'linear-gradient(to top, rgba(57,214,255,0) 0%, rgba(57,214,255,0.85) 50%, rgba(57,214,255,0) 100%)',
              filter: 'blur(0.4px)',
              animation: 'krim-pl-rise 6.5s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="krim-pl-coreline absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to top, rgba(57,214,255,0.45) 0%, rgba(57,214,255,0.08) 70%, rgba(57,214,255,0) 100%)',
              animation: 'krim-pl-coreline 6.5s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
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
  const glassClass = isCore ? 'glass glass-cyan' : isSurface ? 'glass glass-mint' : 'glass'

  return (
    <motion.div
      initial={reduce ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : index * 0.08 }}
    >
      <div
        className={`lume relative overflow-hidden rounded-lg px-6 py-5 ${glassClass}`}
        onMouseEnter={() => onHover(layer.key)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(layer.key)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="group"
        aria-label={layer.name2 ? `${layer.name} and ${layer.name2}` : `${layer.name} — ${layer.role}`}
        style={{ outline: 'none' }}
      >
        {/* mint accent edge on hover — left rail */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-2 left-0 w-px rounded-full transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--mint), transparent)', opacity: isHover ? 0.9 : 0 }}
        />

        {isCore && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 140% at 50% 120%, rgba(57,214,255,0.16) 0%, rgba(57,214,255,0.04) 45%, rgba(57,214,255,0) 75%)',
              }}
            />
            <span
              aria-hidden
              className="krim-pl-glow pointer-events-none absolute -bottom-6 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(57,214,255,0.35), rgba(57,214,255,0))',
                animation: reduce ? 'none' : 'krim-pl-breathe 7s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
                willChange: 'transform, opacity',
              }}
            />
          </>
        )}

        {layer.name2 ? (
          <div className="relative grid grid-cols-1 items-start gap-5 sm:grid-cols-2 sm:gap-4">
            <Face name={layer.name} role={layer.role} tag={layer.tag} />
            <span aria-hidden className="absolute inset-y-1 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 sm:block" />
            <Face name={layer.name2} role={layer.role2!} tag={layer.tag2!} />
          </div>
        ) : (
          <div className="relative text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span className="font-serif text-[1.5rem] leading-none text-ink">{layer.name}</span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3"
                style={isCore ? { color: 'rgba(57,214,255,0.75)' } : undefined}
              >
                {layer.tag}
              </span>
            </div>
            <p className="mx-auto mt-2.5 max-w-[54ch] font-sans text-[13.5px] leading-relaxed text-ink-2">
              {layer.role}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Face({ name, role, tag }: { name: string; role: string; tag: string }) {
  // Stacked + centred so both faces share one structure — the tag always sits
  // on its own line beneath the name, regardless of name length (no wrap drift).
  return (
    <div className="min-w-0 px-2 text-center">
      <p className="font-serif text-[1.25rem] leading-none text-ink">{name}</p>
      <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">{tag}</p>
      <p className="mx-auto mt-2.5 max-w-[32ch] font-sans text-[12.5px] leading-snug text-ink-2">{role}</p>
    </div>
  )
}

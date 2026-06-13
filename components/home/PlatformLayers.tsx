'use client'

/**
 * PlatformLayers — homepage "one operating system" visual.
 *
 * KrimOS rendered as an elegant vertical stack of glass strata. Read top
 * to bottom as a real architecture:
 *
 *   Kupa          — the command center your teams work from (surface)
 *   Kula · Kira   — the two interface faces people talk to (NOT minds)
 *   Karta         — the co-workers (operating layer)
 *   Kriya         — the validated vocabulary (operating layer)
 *   Kendra        — the brain: a luminous cyan foundation the stack rests on
 *
 * Micro-motion (purposeful, restrained, GPU-only):
 *   · a faint cyan signal rises from the Kendra core up through the strata
 *     and back — flow between brain and surface;
 *   · the Kendra core breathes with a slow living glow;
 *   · on hover a layer lifts and illuminates with a mint edge (.lume).
 *
 * Reduced motion: the signal and breathing are suppressed and the stack
 * settles instantly. Hover lift is already neutralised by .lume under
 * prefers-reduced-motion. GPU-only transforms / opacity; no layout shift.
 *
 * Self-contained: a local <style> defines uniquely-named keyframes
 * (krim-pl-*) so globals.css is untouched. The page wraps this with the
 * heading + the /platform link; this file is the visual only.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Tone = 'surface' | 'operating' | 'core'

type Layer = {
  key: string
  /** display name (serif) */
  name: string
  /** short role (sans) */
  role: string
  /** faint mono tag */
  tag: string
  tone: Tone
  /** optional second name for the paired surface faces */
  name2?: string
  role2?: string
  tag2?: string
}

/** Top → bottom. The command center, the interface faces, operating layers, brain last. */
const LAYERS: Layer[] = [
  {
    key: 'kupa',
    name: 'Kupa',
    role: 'the command center — supervise, configure, audit',
    tag: 'COMMAND CENTER',
    tone: 'surface',
  },
  {
    key: 'faces',
    name: 'Kula',
    role: "your teams' interface",
    tag: 'INTERFACE',
    name2: 'Kira',
    role2: "your customers' interface",
    tag2: 'INTERFACE',
    tone: 'surface',
  },
  {
    key: 'karta',
    name: 'Karta',
    role: 'the co-workers — they do the work',
    tag: 'CO-WORKERS',
    tone: 'operating',
  },
  {
    key: 'kriya',
    name: 'Kriya',
    role: 'the validated, credit-native vocabulary',
    tag: 'PRIMITIVES',
    tone: 'operating',
  },
  {
    key: 'kendra',
    name: 'Kendra',
    role: 'the brain — the governed runtime core',
    tag: 'RUNTIME · NYĀYA · LEARN',
    tone: 'core',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function PlatformLayers() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="relative mx-auto w-full max-w-[460px]" aria-hidden="false">
      {/* uniquely-named keyframes — globals.css stays untouched */}
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
  .krim-pl-signal, .krim-pl-glow, .krim-pl-coreline {
    animation: none !important;
  }
  .krim-pl-signal { opacity: 0 !important; }
  .krim-pl-glow { opacity: 0.7 !important; transform: none !important; }
}
`,
        }}
      />

      {/* travelling signal — a thread of cyan light rising from the core up
          through the strata and dissolving. Behind the glass, masked to the
          stack. Suppressed under reduced motion. */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[58px] top-2 z-0"
          style={{ ['--krim-pl-travel' as string]: '300px' }}
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
          {/* faint persistent spine connecting brain ↔ surface */}
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

      {/* the stack */}
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

  // glass flavour per tone: surface faces lean mint (brand/touch), the brain
  // leans cyan (thinking), operating layers stay near-monochrome glass.
  const glassClass = isCore ? 'glass glass-cyan' : isSurface ? 'glass glass-mint' : 'glass'

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : index * 0.08 }}
    >
      <div
        className={`lume relative overflow-hidden rounded-lg ${glassClass} ${
          isCore ? 'px-5 py-5' : 'px-5 py-4'
        }`}
        onMouseEnter={() => onHover(layer.key)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(layer.key)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="group"
        aria-label={
          layer.name2
            ? `${layer.name} and ${layer.name2} — ${layer.role}`
            : `${layer.name} — ${layer.role}`
        }
        style={{ outline: 'none' }}
      >
        {/* mint accent edge appears on hover/focus — left rail */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-2 left-0 w-px rounded-full transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--mint), transparent)',
            opacity: isHover ? 0.9 : 0,
          }}
        />

        {/* the Kendra core: a living luminous well so the stack reads as
            resting on a glowing brain */}
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
                background:
                  'radial-gradient(closest-side, rgba(57,214,255,0.35), rgba(57,214,255,0))',
                animation: reduce
                  ? 'none'
                  : 'krim-pl-breathe 7s var(--ease-in-out, cubic-bezier(0.65,0,0.35,1)) infinite',
                willChange: 'transform, opacity',
              }}
            />
          </>
        )}

        {layer.name2 ? (
          // surface faces: two interfaces side by side, divided hairline
          <div className="relative flex items-stretch gap-4">
            <Face name={layer.name} role={layer.role} tag={layer.tag} />
            <span aria-hidden className="w-px self-stretch bg-white/10" />
            <Face name={layer.name2} role={layer.role2!} tag={layer.tag2!} align="right" />
          </div>
        ) : (
          <div className="relative flex items-baseline justify-between gap-4">
            <div className="min-w-0">
              <span className="font-serif text-[1.35rem] leading-none text-ink">
                {layer.name}
              </span>
              <span className="mt-1.5 block font-sans text-caption text-ink-2">
                {layer.role}
              </span>
            </div>
            <span
              className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-ink-3"
              style={isCore ? { color: 'rgba(57,214,255,0.7)' } : undefined}
            >
              {layer.tag}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Face({
  name,
  role,
  tag,
  align = 'left',
}: {
  name: string
  role: string
  tag: string
  align?: 'left' | 'right'
}) {
  return (
    <div className={`min-w-0 flex-1 ${align === 'right' ? 'text-right' : ''}`}>
      <span className="font-serif text-[1.2rem] leading-none text-ink">{name}</span>
      <span className="mt-1.5 block font-sans text-[12.5px] leading-snug text-ink-2">
        {role}
      </span>
      <span className="mt-1.5 block font-mono text-[9.5px] tracking-[0.16em] text-ink-3">
        {tag}
      </span>
    </div>
  )
}

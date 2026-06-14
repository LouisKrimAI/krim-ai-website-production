'use client'

/**
 * ArchGlyph — the recurring architecture map: the same diagram on every
 * platform page, with the current part lit. Kriya → Karta feed the Kendra
 * core (the brain); Kula & Kira are the two faces. The active layer glows
 * mint with a soft pulsing halo; the rest sit quiet. Caption names it.
 * Pure SVG + a single framer halo; reduced-motion settles it.
 */

import { motion, useReducedMotion } from 'framer-motion'
import type { LayerSlug } from './layers'
import { layerBySlug } from './layers'

type Node = { slug: LayerSlug; x: number; y: number; label: string }

const NODES: Node[] = [
  { slug: 'kriya', x: 78, y: 100, label: 'KRIYA' },
  { slug: 'karta', x: 188, y: 100, label: 'KARTA' },
  { slug: 'kendra', x: 322, y: 100, label: 'KENDRA' },
  { slug: 'kula', x: 512, y: 58, label: 'KULA' },
  { slug: 'kira', x: 512, y: 142, label: 'KIRA' },
]

export default function ArchGlyph({ active }: { active?: LayerSlug }) {
  const reduce = useReducedMotion()
  const layer = active ? layerBySlug(active) : null

  const isOn = (s: LayerSlug) => s === active
  const stroke = (s: LayerSlug) => (isOn(s) ? 'var(--mint)' : 'rgba(255,255,255,0.26)')
  const labelFill = (s: LayerSlug) => (isOn(s) ? 'var(--mint)' : 'var(--text-3)')

  return (
    <div>
      <svg viewBox="0 0 600 200" className="w-full max-w-[560px]" role="img" aria-label={`KrimOS architecture${layer ? `, ${layer.name} highlighted` : ''}`}>
        {/* flow lines */}
        <g stroke="rgba(255,255,255,0.13)" strokeWidth="1">
          <line x1="98" y1="100" x2="166" y2="100" />
          <line x1="210" y1="100" x2="278" y2="100" />
          <line x1="366" y1="86" x2="490" y2="62" />
          <line x1="366" y1="114" x2="490" y2="138" />
        </g>

        {NODES.map((n) => {
          const core = n.slug === 'kendra'
          const r = core ? 44 : 20
          return (
            <g key={n.slug}>
              {/* active halo */}
              {isOn(n.slug) && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={r + 6}
                  fill="none"
                  stroke="var(--mint)"
                  strokeWidth="1"
                  initial={reduce ? { opacity: 0.4, scale: 1 } : { opacity: 0.5, scale: 1 }}
                  animate={reduce ? { opacity: 0.4 } : { opacity: [0.5, 0.12, 0.5], scale: [1, 1.12, 1] }}
                  transition={reduce ? { duration: 0 } : { duration: 3.4, ease: 'easeInOut', repeat: Infinity }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              {core ? (
                <>
                  <circle cx={n.x} cy={n.y} r="44" fill="none" stroke={stroke('kendra')} strokeWidth="1.1" />
                  <circle cx={n.x} cy={n.y} r="27" fill="none" stroke={isOn('kendra') ? 'rgba(0,255,178,0.5)' : 'rgba(57,214,255,0.4)'} strokeWidth="1" />
                  <circle cx={n.x} cy={n.y} r="12" fill={isOn('kendra') ? 'rgba(0,255,178,0.14)' : 'rgba(57,214,255,0.12)'} stroke={isOn('kendra') ? 'var(--mint)' : 'rgba(57,214,255,0.6)'} strokeWidth="1" />
                  <circle cx={n.x} cy={n.y} r="3" fill={isOn('kendra') ? 'var(--mint)' : 'var(--orb-stroke)'} />
                </>
              ) : (
                <circle cx={n.x} cy={n.y} r={r} fill={isOn(n.slug) ? 'rgba(0,255,178,0.08)' : 'transparent'} stroke={stroke(n.slug)} strokeWidth="1.1" />
              )}
              <text
                x={n.x}
                y={core ? n.y + 66 : n.y + (n.slug === 'kira' ? 38 : n.slug === 'kula' ? -30 : 38)}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fill={labelFill(n.slug)}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>

      {layer && (
        <p className="mt-3 max-w-[44ch] font-sans text-[13.5px] leading-relaxed text-ink-2">{layer.oneLiner}</p>
      )}
    </div>
  )
}

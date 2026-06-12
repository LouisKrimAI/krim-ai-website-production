'use client'

/**
 * ArchGlyph — the recurring architecture mark: Kendra at the core,
 * Kriya composing into Karta feeding it, Kula & Kira as the two faces.
 * Hover (or focus) names each part; labels sit quiet beneath the nodes
 * so the glyph still reads in one glance. Pure SVG, hairline strokes.
 */

import { useState } from 'react'

type Part = {
  key: string
  name: string
  role: string
  x: number
  y: number
}

const PARTS: Part[] = [
  { key: 'kriya', name: 'Kriya', role: 'the vocabulary', x: 70, y: 160 },
  { key: 'karta', name: 'Karta', role: 'the co-workers', x: 180, y: 160 },
  { key: 'kendra', name: 'Kendra', role: 'the brain', x: 320, y: 160 },
  { key: 'kula', name: 'Kula', role: "your teams' interface", x: 478, y: 96 },
  { key: 'kira', name: 'Kira', role: "your customers'", x: 478, y: 224 },
]

const DEFAULT_CAPTION = 'One core, one vocabulary, two faces — hover to name each part.'

export default function ArchGlyph() {
  const [active, setActive] = useState<Part | null>(null)

  const nodeStroke = (key: string) =>
    active?.key === key ? 'var(--mint)' : 'rgba(255,255,255,0.32)'
  const labelFill = (key: string) =>
    active?.key === key ? 'var(--text)' : 'var(--text-3)'

  const bind = (p: Part) => ({
    onMouseEnter: () => setActive(p),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(p),
    onBlur: () => setActive(null),
    tabIndex: 0,
    role: 'img' as const,
    'aria-label': `${p.name} — ${p.role}`,
    style: { cursor: 'default', outline: 'none' },
  })

  return (
    <div>
      <svg viewBox="0 0 560 320" className="w-full" aria-hidden={false}>
        {/* flow lines: Kriya → Karta → Kendra → Kula / Kira */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
          <line x1="92" y1="160" x2="158" y2="160" />
          <line x1="202" y1="160" x2="272" y2="160" />
          <line x1="362" y1="142" x2="452" y2="102" />
          <line x1="362" y1="178" x2="452" y2="218" />
        </g>
        {/* direction ticks */}
        <g fill="rgba(255,255,255,0.3)">
          <circle cx="125" cy="160" r="1.6" />
          <circle cx="237" cy="160" r="1.6" />
          <circle cx="407" cy="122" r="1.6" />
          <circle cx="407" cy="198" r="1.6" />
        </g>

        {/* Kriya — the vocabulary: a dotted ring of primitives */}
        <g {...bind(PARTS[0])}>
          <circle cx="70" cy="160" r="20" fill="transparent" />
          <circle cx="70" cy="160" r="15" fill="none" stroke={nodeStroke('kriya')} strokeWidth="1.1" strokeDasharray="2.4 4.2" />
          <text x="70" y="200" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={labelFill('kriya')}>KRIYA</text>
        </g>

        {/* Karta — the co-workers: a ring holding a small roster */}
        <g {...bind(PARTS[1])}>
          <circle cx="180" cy="160" r="24" fill="transparent" />
          <circle cx="180" cy="160" r="18" fill="none" stroke={nodeStroke('karta')} strokeWidth="1.1" />
          <g fill={active?.key === 'karta' ? 'var(--mint)' : 'rgba(255,255,255,0.42)'}>
            <circle cx="174" cy="156" r="1.8" />
            <circle cx="186" cy="156" r="1.8" />
            <circle cx="180" cy="167" r="1.8" />
          </g>
          <text x="180" y="200" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={labelFill('karta')}>KARTA</text>
        </g>

        {/* Kendra — the brain: concentric, a thinking core */}
        <g {...bind(PARTS[2])}>
          <circle cx="320" cy="160" r="48" fill="transparent" />
          <circle cx="320" cy="160" r="42" fill="none" stroke={nodeStroke('kendra')} strokeWidth="1.1" />
          <circle cx="320" cy="160" r="27" fill="none" stroke="rgba(57,214,255,0.35)" strokeWidth="1" />
          <circle cx="320" cy="160" r="13" fill="rgba(57,214,255,0.1)" stroke="rgba(57,214,255,0.5)" strokeWidth="1" />
          <circle cx="320" cy="160" r="3" fill="var(--orb-stroke)" />
          <text x="320" y="226" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={labelFill('kendra')}>KENDRA</text>
        </g>

        {/* Kula — the enterprise face */}
        <g {...bind(PARTS[3])}>
          <rect x="456" y="78" width="44" height="36" rx="7" fill="transparent" />
          <rect x="460" y="82" width="36" height="28" rx="6" fill="none" stroke={nodeStroke('kula')} strokeWidth="1.1" />
          <line x1="468" y1="92" x2="488" y2="92" stroke={active?.key === 'kula' ? 'var(--mint)' : 'rgba(255,255,255,0.3)'} strokeWidth="1" />
          <line x1="468" y1="99" x2="482" y2="99" stroke={active?.key === 'kula' ? 'var(--mint)' : 'rgba(255,255,255,0.3)'} strokeWidth="1" />
          <text x="478" y="134" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={labelFill('kula')}>KULA</text>
        </g>

        {/* Kira — the customer face */}
        <g {...bind(PARTS[4])}>
          <rect x="456" y="200" width="44" height="40" rx="7" fill="transparent" />
          <rect x="462" y="202" width="32" height="30" rx="8" fill="none" stroke={nodeStroke('kira')} strokeWidth="1.1" />
          <path d="M471 232 l-4 7 9 -5" fill="none" stroke={nodeStroke('kira')} strokeWidth="1.1" strokeLinejoin="round" />
          <line x1="470" y1="213" x2="486" y2="213" stroke={active?.key === 'kira' ? 'var(--mint)' : 'rgba(255,255,255,0.3)'} strokeWidth="1" />
          <line x1="470" y1="220" x2="480" y2="220" stroke={active?.key === 'kira' ? 'var(--mint)' : 'rgba(255,255,255,0.3)'} strokeWidth="1" />
          <text x="478" y="262" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={labelFill('kira')}>KIRA</text>
        </g>
      </svg>

      <p className="mt-4 min-h-[1.5em] text-center font-sans text-[14px] text-ink-2" aria-live="polite">
        {active ? (
          <>
            <span className="font-serif text-ink">{active.name}</span>
            <span className="text-ink-3"> — {active.role}</span>
          </>
        ) : (
          <span className="text-ink-3">{DEFAULT_CAPTION}</span>
        )}
      </p>
    </div>
  )
}

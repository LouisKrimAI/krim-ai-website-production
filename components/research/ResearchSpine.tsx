'use client'

/**
 * ResearchSpine — the four research strands rendered as an animated
 * scroll timeline. Cards alternate left / right along a central spine.
 * Each card slides in from its side, the spine node glows on entry,
 * and a connector line bridges node to card.
 */

import { motion } from 'framer-motion'
import Link from 'next/link'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'

const STRANDS = [
  {
    n: '01',
    title: 'Judgment, made checkable',
    body: 'Turning a regulation into a check a machine can run: the formal-logic foundation behind the 33 validators that clear every proposed action before it fires.',
    href: '/epistemic-ai',
    label: 'The lineage',
    sub: 'Epistemic AI',
    tint: 'mint' as const,
  },
  {
    n: '02',
    title: 'A model of the operation',
    body: 'Learning how a whole lending operation behaves, from the validated outcomes the system records: a world model that agents can reason and plan against before they act.',
    href: '/research/world-lending-model',
    label: 'The direction',
    sub: 'World Lending Model',
    tint: 'cyan' as const,
  },
  {
    n: '03',
    title: 'Proof before action',
    body: 'Treating pre-execution validation as its own discipline: proving an action against law, policy, consent and context before it can fire — not explaining it after.',
    href: '/krimos/kendra',
    label: 'In the runtime',
    sub: 'Kendra',
    tint: 'mint' as const,
  },
  {
    n: '04',
    title: 'The safe agent harness',
    body: 'The operational control layer that wraps every AI co-worker: constrained action space, pre-execution gate, human command surface. The architecture that makes autonomous agents safe to deploy in a regulated bank.',
    href: '/research/safe-agent-harness',
    label: 'The harness',
    sub: 'Safe Agent Harness',
    tint: 'cyan' as const,
  },
]

const CARD_VARIANTS = {
  left: {
    hidden: { opacity: 0, x: -72, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 72, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
}

const EASE = [0.16, 1, 0.3, 1] as const

function StrandCard({ strand, side }: { strand: typeof STRANDS[0]; side: 'left' | 'right' }) {
  const color = strand.tint === 'mint' ? MINT : CYAN
  return (
    <motion.div
      variants={CARD_VARIANTS[side]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <Link href={strand.href} className="group block h-full">
        <div
          className="glass lume relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 group-hover:-translate-y-0.5 md:p-10"
          style={{
            boxShadow: 'none',
          }}
        >
          {/* Oversized ghost number — depth texture */}
          <span
            aria-hidden
            className="pointer-events-none absolute select-none font-serif leading-none"
            style={{
              fontSize: 'clamp(7rem, 14vw, 10rem)',
              color: 'rgba(255,255,255,0.025)',
              right: '1.25rem',
              top: '-0.75rem',
              lineHeight: 1,
            }}
          >
            {strand.n}
          </span>

          {/* Accent gradient bar */}
          <div
            aria-hidden
            className="h-[3px] w-14 rounded-full"
            style={{ background: `linear-gradient(to right, ${color}, ${color}50)` }}
          />

          {/* Title */}
          <h3
            className="mt-7 font-serif leading-tight text-ink"
            style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2.1rem)' }}
          >
            {strand.title}
          </h3>

          {/* Body */}
          <p className="mt-4 font-sans text-body leading-relaxed text-ink-2 md:max-w-[40ch]">
            {strand.body}
          </p>

          {/* CTA row */}
          <div className="mt-8 flex items-center gap-2">
            <div>
              <span
                className="block font-mono text-[10px] uppercase tracking-[0.18em] opacity-60"
                style={{ color }}
              >
                {strand.label}
              </span>
              <span
                className="mt-0.5 block font-sans text-[14.5px] underline-offset-4 group-hover:underline"
                style={{ color }}
              >
                {strand.sub}
              </span>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className="ml-1 mt-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
              style={{ color }}
            >
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SpineNode({ tint, n, cardOnLeft }: { tint: 'mint' | 'cyan'; n: string; cardOnLeft: boolean }) {
  const color = tint === 'mint' ? MINT : CYAN
  return (
    <div className="relative flex flex-col items-center justify-center self-stretch">
      {/* Connector line — grows from node toward the card */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          height: '1px',
          width: '100%',
          background: cardOnLeft
            ? `linear-gradient(to left, transparent, ${color}60)`
            : `linear-gradient(to right, transparent, ${color}60)`,
          originX: cardOnLeft ? 1 : 0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
      />

      {/* Node group */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Outer pulse ring */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: '32px', height: '32px' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${color}`, opacity: 0.22 }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '20px', height: '20px',
              border: `1px solid ${color}`,
              opacity: 0.12,
            }}
          />
          {/* Core dot */}
          <div
            className="relative h-2.5 w-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}, 0 0 18px ${color}80`,
            }}
          />
        </div>

        {/* Number below */}
        <span
          className="font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ color: `${color}70` }}
        >
          {n}
        </span>
      </motion.div>
    </div>
  )
}

export default function ResearchSpine() {
  return (
    <div className="relative">
      {/* Full-height spine line (desktop only) */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(0,255,178,0.18) 20%, rgba(57,214,255,0.18) 80%, transparent 100%)',
        }}
      />

      {/* Mobile: simple stacked cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {STRANDS.map((s) => (
          <StrandCard key={s.n} strand={s} side="right" />
        ))}
      </div>

      {/* Desktop: alternating spine layout */}
      <div className="hidden flex-col gap-16 md:flex">
        {STRANDS.map((s, i) => {
          const cardOnLeft = i % 2 === 0
          return (
            <div
              key={s.n}
              className="grid items-center"
              style={{ gridTemplateColumns: '1fr 6rem 1fr', gap: '0' }}
            >
              {cardOnLeft ? (
                <>
                  <StrandCard strand={s} side="left" />
                  <SpineNode tint={s.tint} n={s.n} cardOnLeft={true} />
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <SpineNode tint={s.tint} n={s.n} cardOnLeft={false} />
                  <StrandCard strand={s} side="right" />
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

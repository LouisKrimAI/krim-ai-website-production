'use client'

/**
 * PowerCards — homepage §3. Three large glass cards, one per power. The
 * homepage's signature idea is preserved without any icon: a thin accent
 * rule on each card draws in and resolves cyan → mint as the card enters —
 * the "blocked → validated" grammar, abstracted to a line. Luminous hover.
 */

import { motion, useReducedMotion } from 'framer-motion'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

type Power = { name: string; tagline: string; body: string }

export default function PowerCards({ powers }: { powers: readonly Power[] }) {
  const reduce = useReducedMotion()
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {powers.map((p, i) => (
        <motion.div
          key={p.name}
          className="glass lume h-full p-8 md:p-9"
          initial={reduce ? { y: 0 } : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: OUT_SOFT, delay: i * 0.12 }}
        >
          {/* the accent rule: blocked-cyan → validated-mint */}
          <motion.span
            aria-hidden
            className="block h-[3px] w-14 origin-left rounded-full"
            initial={reduce ? { scaleX: 1, backgroundColor: '#00FFB2' } : { scaleX: 0, backgroundColor: '#39D6FF' }}
            whileInView={{ scaleX: 1, backgroundColor: '#00FFB2' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: OUT_SOFT, delay: 0.2 + i * 0.12 }}
          />
          {/* min-heights reserve two lines for the title and the outcome so the body aligns across all three cards */}
          <h3 className="mt-7 flex min-h-[2.4em] items-start font-serif text-[1.85rem] leading-tight text-ink">{p.name}</h3>
          {/* the plain big-outcome line — what the reader gets, in mint */}
          <p className="mt-3 flex min-h-[2.2em] items-start font-serif text-[1.2rem] leading-snug text-mint">{p.tagline}</p>
          <p className="mt-4 font-sans text-body text-ink-2">{p.body}</p>
        </motion.div>
      ))}
    </div>
  )
}

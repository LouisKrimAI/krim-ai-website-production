'use client'

/**
 * JurisdictionTabs — the regulation set per market, behind a tab.
 * USA · UK · EU · India · Nigeria · Brazil. Each tab reveals that jurisdiction's
 * encoded frameworks as mint-dotted chips. Calm pill tabs (mint = active), one
 * panel that cross-fades; the tab row wraps on narrow screens. Reduced motion
 * settles instantly.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export type Jurisdiction = { region: string; short: string; frameworks: string[] }

export default function JurisdictionTabs({ items }: { items: Jurisdiction[] }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const cur = items[active]

  return (
    <div className="mx-auto mt-10 w-full max-w-[760px]">
      {/* pill tabs */}
      <div
        role="tablist"
        aria-label="Jurisdiction"
        className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
      >
        {items.map((j, i) => {
          const on = i === active
          return (
            <button
              key={j.short}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300"
              style={{
                backgroundColor: on ? 'rgba(0,255,178,0.10)' : 'transparent',
                color: on ? 'var(--mint)' : 'var(--text-3)',
                boxShadow: on ? 'inset 0 0 0 1px rgba(0,255,178,0.30)' : 'none',
              }}
            >
              {j.short}
            </button>
          )
        })}
      </div>

      {/* panel — keyed by active so it always reflects the selected tab; a plain
          fade-in on each change (no exit/wait, which can stick) */}
      <div className="lume glass mt-7 min-h-[180px] rounded-lg p-8 md:p-10">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.28 }}
        >
          <p className="font-serif text-[1.5rem] leading-none text-ink">{cur.region}</p>
          <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
            Encoded &amp; enforced before any action
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {cur.frameworks.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.04] px-4 py-2 font-mono text-[12px] tracking-[0.04em] text-ink-2"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-mint" />
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

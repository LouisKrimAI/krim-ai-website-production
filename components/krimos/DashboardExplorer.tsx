'use client'

/**
 * DashboardExplorer — the Kupa cockpit's dashboards, shown as an interactive
 * explorer rather than a grid of pill-tagged cards. A quiet text nav on the left
 * (grouped: by lifecycle stage / across the operation); a generous detail panel on
 * the right reveals the selected dashboard's purpose and the instruments it
 * surfaces, as an editorial list. Hover, focus or tap to switch.
 *
 * Every metric is a view/instrument NAME — no fabricated figures. Global; the
 * market-specific reporting lives on /trust.
 */

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Dash = { name: string; purpose: string; metrics: string[] }
type Group = { group: string; items: Dash[] }

const GROUPS: Group[] = [
  {
    group: 'By lifecycle stage',
    items: [
      { name: 'Origination', purpose: 'The application funnel, end to end.', metrics: ['Application volume', 'Pull-through rate', 'Time to decision', 'Funnel drop-off', 'Channel mix', 'Early-payment default'] },
      { name: 'Underwriting', purpose: 'Where the credit engine is supervised.', metrics: ['Approve / decline rate', 'Automated-decision rate', 'Override rate', 'Score-band mix', 'Exception queue', 'Decision explainability'] },
      { name: 'Pricing', purpose: 'Risk-based pricing and margin.', metrics: ['APR distribution', 'Price vs. risk grade', 'Net margin', 'Risk-adjusted yield', 'Win rate by offer'] },
      { name: 'Servicing', purpose: 'Keeping the performing book current.', metrics: ['Active accounts & balance', 'On-time payment rate', 'Early delinquency', 'Prepayment rate', 'Service SLA', 'Unit cost to serve'] },
      { name: 'Collections & recovery', purpose: 'From the first missed payment to cash.', metrics: ['Delinquency by DPD bucket', 'Roll rate', 'Cure rate', 'Right-party contact', 'Promise-to-pay kept', 'Cost to collect'] },
    ],
  },
  {
    group: 'Across the operation',
    items: [
      { name: 'Portfolio & risk', purpose: 'Forward-looking book health.', metrics: ['Portfolio health', 'Vintage / cohort curves', 'Delinquency migration', 'Expected loss', 'Concentration', 'Behavioural scoring'] },
      { name: 'Co-worker performance', purpose: 'How the agents and the human queue are doing.', metrics: ['Volume handled', 'Containment rate', 'Hand-offs', 'HITL queue & SLA', 'CSAT', 'Sentiment'] },
      { name: 'Compliance & audit', purpose: 'Proof the operation stays inside policy.', metrics: ['Validation blocks', 'Exceptions & remediation', 'Decision-trace replay', 'Complaint statistics', 'Control coverage'] },
      { name: 'Cost & usage', purpose: 'What the operation costs to run.', metrics: ['Cost to serve by channel', 'Cost per loan / decision', 'Krim Work Units', 'Automation share', 'Efficiency ratio'] },
      { name: 'Executive cockpit', purpose: 'The board-level roll-up, with drill-down.', metrics: ['Portfolio health', 'Origination & funnel', 'Productivity', 'Channel performance', 'A/B outcomes', 'Board pack on demand'] },
    ],
  },
]

const FLAT = GROUPS.flatMap((g) => g.items.map((d) => ({ ...d, group: g.group })))
const OFFSET = GROUPS[0].items.length

export default function DashboardExplorer() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const d = FLAT[active]

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] md:gap-12">
      {/* nav — quiet text list, grouped (no cards, no pills) */}
      <nav className="flex flex-col gap-7">
        {GROUPS.map((g, gi) => (
          <div key={g.group}>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">{g.group}</p>
            <ul className="mt-3.5 flex flex-col">
              {g.items.map((item, j) => {
                const idx = (gi === 0 ? 0 : OFFSET) + j
                const on = idx === active
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      onClick={() => setActive(idx)}
                      aria-pressed={on}
                      className={[
                        'group flex w-full items-center gap-3 py-2 text-left outline-none transition-colors',
                        on ? 'text-mint' : 'text-ink-2 hover:text-ink',
                      ].join(' ')}
                    >
                      <span
                        aria-hidden
                        className={[
                          'h-px shrink-0 transition-all duration-[var(--dur)] ease-[cubic-bezier(0.16,1,0.30,1)]',
                          on ? 'w-7 bg-mint' : 'w-3 bg-ink-3 group-hover:w-5 group-hover:bg-ink-2',
                        ].join(' ')}
                      />
                      <span className="font-serif text-[1.1rem] leading-tight">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* detail — the selected dashboard, generous, editorial */}
      <div className="glass relative overflow-hidden rounded-2xl p-8 md:min-h-[23rem] md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">{d.group}</p>
            <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-tight text-ink">
              {d.name}
            </h3>
            <p className="mt-3 max-w-[46ch] font-sans text-body-lg text-ink-2">{d.purpose}</p>
            <div className="mt-8 border-t border-soft pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">What it surfaces</p>
              <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
                {d.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-3 font-sans text-[15px] leading-snug text-ink-2">
                    <span aria-hidden className="h-px w-3.5 shrink-0 bg-mint/65" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

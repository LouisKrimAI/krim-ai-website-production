'use client'

/**
 * Kriya — client islands for the two signature graphics, on the ONE CANVAS (v3).
 *
 *  1. <PrimitiveIndex>  — the ten categories as a glass artifact. At rest:
 *     category · count, set like the spine of a reference manual. Open one and
 *     its representative primitives unfurl beneath. Keyboard-accessible
 *     (real <button> rows, aria-expanded), reduced-motion-safe (no height
 *     animation when the user asks for stillness). Mint marks the open category.
 *
 *  2. <MakeCallReceipt> — the MAKE_CALL worked example as the page's single
 *     glass-mint accent: inputs → pre-flight clearances → outputs → metering
 *     math (with the line-item breakdown, so 142 KWU is explained, not asserted).
 *     Mono carries the machine fields; serif carries the meaning.
 *
 * Colour grammar: mint = validated/learned, cyan = proposed. No gold here.
 */

import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return reduce
}

// ---------------------------------------------------------------------------
// 1 · THE INDEX  ·  ten categories, progressive disclosure
// ---------------------------------------------------------------------------

type Category = {
  name: string
  count: string
  mode: string // which of the five action modes this category mostly serves
  primitives: string[]
  note: string // one human line, why this category exists
  // optional per-primitive gloss, for boundaries that must not be screenshotted out of context
  gloss?: Record<string, string>
}

const CATEGORIES: Category[] = [
  {
    name: 'Voice & telephony',
    count: '~45',
    mode: 'action',
    primitives: ['MAKE_CALL', 'TRANSFER_CALL', 'CONFERENCE', 'TRANSCRIBE'],
    note: 'Placing, routing and recording calls — the conversation itself, governed.',
  },
  {
    name: 'Document operations',
    count: '~30',
    mode: 'processing',
    primitives: ['GENERATE_NOTICE', 'PARSE_PDF', 'E_SIGN', 'SEND_EMAIL'],
    note: 'The paperwork of lending — drafted, read, signed and sent.',
  },
  {
    name: 'Compliance checks',
    count: '~50',
    mode: 'control',
    primitives: ['CHECK_TCPA', 'CHECK_BANKRUPTCY', 'VERIFY_SCRA', 'REG_F_LIMIT'],
    note: 'The largest category — the clearances every action inherits before it fires.',
  },
  {
    name: 'Data operations',
    count: '~35',
    mode: 'sensing',
    primitives: ['FETCH_ACCOUNT', 'UPDATE_STATUS', 'ENRICH_ADDRESS', 'BUREAU_LOOKUP'],
    note: 'Reading and writing the account of record, with consent logged.',
  },
  {
    name: 'Payment processing',
    count: '~25',
    mode: 'action',
    primitives: ['CALCULATE_SETTLEMENT', 'VERIFY_BANK', 'PROCESS_PAYMENT', 'SCHEDULE_AUTOPAY'],
    note: 'Money moves only inside the mandate and the approved range.',
  },
  {
    name: 'Decision logic',
    count: '~20',
    mode: 'intelligence',
    primitives: ['EVALUATE_POLICY', 'RESOLVE_CONFLICT', 'ESCALATE', 'APPROVE'],
    note: 'Operational judgment — which path, who to involve, when to stop.',
    gloss: {
      APPROVE: 'workflow-step approval — never credit',
    },
  },
  {
    name: 'Analytics & reporting',
    count: '~15',
    mode: 'processing',
    primitives: ['AGGREGATE_METRICS', 'GENERATE_REPORT', 'EXPORT_CSV'],
    note: 'Turning the metered record into something a team can read.',
  },
  {
    name: 'Integration',
    count: '~30',
    mode: 'action',
    primitives: ['SYNC_LOS', 'PUSH_TO_CRM', 'CALL_WEBHOOK', 'QUERY_API'],
    note: 'The reach into the systems a lender already runs.',
  },
  {
    name: 'Testing & QA',
    count: '~10',
    mode: 'control',
    primitives: ['MOCK_CALL', 'SIMULATE_ERROR', 'INJECT_DELAY'],
    note: 'Rehearsal under failure — proving a workflow before it touches a borrower.',
  },
  {
    name: 'Custom',
    count: '—',
    mode: 'tenant',
    primitives: ['Tenant-specific primitives'],
    note: 'The room left for what only your book of business requires.',
  },
]

function IndexRow({
  cat,
  index,
  open,
  onToggle,
  reduce,
}: {
  cat: Category
  index: number
  open: boolean
  onToggle: () => void
  reduce: boolean
}) {
  const panelId = useId()
  const isCustom = cat.count === '—'
  return (
    <div className="border-b border-rline-soft">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={isCustom}
        className={`group w-full grid grid-cols-[2.4rem_1fr_auto] md:grid-cols-[3rem_1fr_5.5rem_auto] items-baseline gap-x-4 md:gap-x-6 py-4 md:py-[18px] text-left transition-colors ${
          isCustom ? 'cursor-default' : 'hover:bg-white/[0.025]'
        }`}
      >
        {/* leaf number, like an index entry */}
        <span className="font-mono text-[11px] text-rtext-3 tabular-nums pt-1">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* the name + leader dots, set like a printed contents page */}
        <span className="flex items-baseline gap-3 min-w-0">
          <span
            className={`font-serif text-[1.18rem] md:text-[1.4rem] leading-tight transition-colors ${
              open ? 'text-mint' : 'text-rtext group-hover:text-mint'
            }`}
          >
            {cat.name}
          </span>
          <span className="hidden md:block flex-1 translate-y-[-3px] border-b border-dotted border-rline" aria-hidden />
        </span>

        {/* the count, the whole reason this is an index */}
        <span className="font-mono text-[13px] md:text-[15px] text-rtext-2 tabular-nums text-right md:text-left">
          {cat.count}
          <span className="hidden md:inline text-rtext-3 text-[11px]"> primitives</span>
        </span>

        {/* the disclosure caret, quiet */}
        <span
          aria-hidden
          className={`hidden md:inline-block font-mono text-[13px] justify-self-end transition-transform duration-300 ease-out ${
            isCustom ? 'text-rtext-3/50' : open ? 'text-mint rotate-90' : 'text-rtext-3 group-hover:text-rtext'
          }`}
        >
          {isCustom ? '·' : '›'}
        </span>
      </button>

      {/* Always rendered (height-collapsed when closed) so every category's
          primitives — and the APPROVE gloss — are in the prerendered HTML
          for crawlers/GEO. No focusables inside, so aria-hidden is safe. */}
      <motion.div
        id={panelId}
        role="region"
        aria-label={`${cat.name} representative primitives`}
        aria-hidden={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.42, ease: EASE }}
        className="overflow-hidden"
      >
            <div className="pl-[2.4rem] md:pl-[3rem] pr-2 pb-6 pt-1">
              <p className="font-serif italic text-[15px] leading-relaxed text-rtext-2 max-w-[56ch] mb-4">
                {cat.note}
              </p>
              <div className="flex flex-wrap items-stretch gap-2.5">
                {cat.primitives.map((p) => {
                  const g = cat.gloss?.[p]
                  return (
                    <span
                      key={p}
                      className="inline-flex items-baseline gap-2 font-mono text-[11.5px] tracking-[0.04em] text-rtext px-3 py-1.5 bg-white/[0.03] border border-rline-soft rounded"
                    >
                      {p}
                      {g && (
                        <span className="font-sans not-italic text-[10px] tracking-normal text-rtext-3">· {g}</span>
                      )}
                    </span>
                  )
                })}
                {!isCustom && (
                  <span className="font-mono text-[11.5px] tracking-[0.04em] text-rtext-3 px-3 py-1.5 border border-dashed border-rline rounded-[12px]">
                    of {cat.count} in the category
                  </span>
                )}
              </div>
              <p className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-rtext-3 mt-4">
                Mode · {cat.mode}
              </p>
            </div>
      </motion.div>
    </div>
  )
}

export function PrimitiveIndex() {
  const reduce = useReducedMotion()
  // first category open by default, so the disclosure pattern reads at a glance
  const [openKey, setOpenKey] = useState<string | null>('Voice & telephony')

  return (
    <div className="glass p-5 md:p-7">
      <div className="flex items-baseline justify-between mb-2 pb-3 border-b border-rline">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-rtext-3">Category</p>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-rtext-3 hidden md:block">Count · open to read</p>
      </div>
      {CATEGORIES.map((cat, i) => (
        <IndexRow
          key={cat.name}
          cat={cat}
          index={i}
          reduce={reduce}
          open={openKey === cat.name}
          onToggle={() => setOpenKey((cur) => (cur === cat.name ? null : cat.name))}
        />
      ))}
      <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-rtext-3 pt-4">
        Ten categories · 250+ primitives · counts are approximate by design — the library grows, the contract does not
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2 · THE WORKED EXAMPLE  ·  MAKE_CALL, the page's one glass-mint accent
// ---------------------------------------------------------------------------

const PRECHECKS = [
  ['CHECK_TCPA', 'consent on file'],
  ['CALLING_HOURS', 'window open · 18:00 local'],
  ['REG_F_LIMIT', 'within 7-in-7 contact cap'],
  ['DNC_REGISTRY', 'number not listed'],
] as const

const INPUTS = [
  ['account_id', 'acct ··4421'],
  ['phone_number', '+1 ··· ··· ·· 09'],
  ['caller_id', 'compliant DID'],
  ['max_duration', '600s'],
  ['script / context', 'optional · segment-bound'],
] as const

const OUTPUTS = [
  ['call_id', 'CL-77F3A1'],
  ['status', 'completed'],
  ['duration', '8m 04s'],
  ['transcript', 'attached · searchable'],
  ['recording', 'sealed URL'],
  ['sentiment', 'cooperative'],
  ['right_party_contact', 'true'],
] as const

// the metering, item by item — so the specimen total survives arithmetic
const METER: ReadonlyArray<readonly [string, string]> = [
  ['Call time · 8m 04s × ~10 KWU/min', '≈ 81 KWU'],
  ['Validation · 4 clearances + sealing', '≈ 61 KWU'],
]

function FieldList({
  label,
  rows,
}: {
  label: string
  rows: ReadonlyArray<readonly [string, string]>
}) {
  return (
    <div>
      <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-2.5">{label}</p>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono text-[11.5px] text-rtext-2">{k}</dt>
            <dd className="font-mono text-[11.5px] text-rtext text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function MakeCallReceipt({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: EASE }}
      className={`w-full max-w-[480px] glass glass-mint ${className}`}
    >
      {/* header */}
      <div className="px-7 pt-7 pb-4 border-b border-rline flex items-baseline justify-between">
        <div>
          <p className="font-mono text-[12px] tracking-[0.2em] font-medium text-mint">MAKE_CALL</p>
          <p className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-rtext-3 mt-1">
            Voice &amp; telephony · v3.2 · one operation
          </p>
        </div>
        <p className="font-mono text-[10px] text-rtext-3">SPECIMEN · № 205,113</p>
      </div>

      {/* meaning, in serif — what this primitive is for */}
      <div className="px-7 py-5 border-b border-rline-soft">
        <p className="font-serif italic text-[15px] leading-relaxed text-rtext">
          One outbound call, placed only after the rules clear. The same primitive serves
          collections, retention and onboarding — only the policy and script change.
        </p>
      </div>

      {/* the two machine columns */}
      <div className="px-7 py-5 grid sm:grid-cols-2 gap-x-7 gap-y-6 border-b border-rline-soft">
        <FieldList label="Takes — inputs" rows={INPUTS} />
        <FieldList label="Returns — outputs" rows={OUTPUTS} />
      </div>

      {/* pre-flight clearances — the inherited scaffolding */}
      <div className="px-7 py-5 border-b border-rline-soft">
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3 mb-3">
          Before it dials — clearances
        </p>
        <ul className="space-y-1.5">
          {PRECHECKS.map(([code, detail]) => (
            <li key={code} className="flex items-baseline gap-2.5">
              <span className="font-mono text-[12px] text-mint leading-none">✓</span>
              <span className="font-mono text-[11.5px] text-rtext">{code}</span>
              <span className="font-mono text-[11px] text-rtext-3">· {detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* the metering math — line items, so the total is explained not asserted */}
      <div className="px-7 py-5">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-rtext-3">Self-metered</p>
          <p className="font-mono text-[10px] text-rtext-3">~10 KWU / minute</p>
        </div>
        <dl className="space-y-1.5 mb-3">
          {METER.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3">
              <dt className="font-mono text-[11px] text-rtext-2 max-w-[30ch]">{k}</dt>
              <dd className="font-mono text-[11.5px] text-rtext text-right whitespace-nowrap">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-baseline justify-between gap-3 pt-2.5 border-t border-rline-soft">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-rtext-3">Total</p>
          <p className="font-serif text-[1.6rem] leading-none text-mint">
            ≈ 142 <span className="font-mono text-[13px] text-rtext-2 align-baseline">KWU</span>
          </p>
        </div>
        <p className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-rtext-3 mt-4">
          Logged to Krim-Ledger · versioned · sealed · a lesson for the world model
        </p>
      </div>
    </motion.div>
  )
}

'use client'

/**
 * Kriya — interactive pieces.
 *
 *  · PrimitiveUnit   — section 2: one primitive as a clean unit
 *                      (input → built-in check → output). Restrained, static.
 *  · CategoryIndex   — section 3 signature device: the ten-category
 *                      progressive index. Accessible <button> disclosures,
 *                      aria-expanded, height-animated. Primitives are ALWAYS
 *                      in the DOM (height-collapsed + aria-hidden when closed)
 *                      so crawlers index the whole vocabulary.
 *  · MakeCallReceipt — section 4 signature device: the MAKE_CALL "receipt"
 *                      as a glass artifact. Pre-checks clear cyan→mint on
 *                      scroll-in (grammar: proposed → validated); the KWU
 *                      meter shows line-item math so the number is explained.
 *
 * Grammar: cyan = thinking/proposed · mint = validated · gold = exception.
 * Motion: GPU-only, reduced-motion-safe, no CLS.
 */

import { useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ───────────────────────────── 2 · one primitive as a unit ──────────────── */

export function PrimitiveUnit() {
  return (
    <div className="glass-quiet max-w-[860px] p-6 md:p-8">
      <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <UnitCell label="Input" tone="dim" body="account_id, terms" />
        <Arrow />
        <UnitCell label="Built-in check" tone="cyan" body="validated before it runs" mono />
        <Arrow />
        <UnitCell label="Output" tone="mint" body="result + metered + logged" />
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        One thing, done once — with its checks carried inside it, not bolted on after.
      </p>
    </div>
  )
}

function UnitCell({
  label,
  body,
  tone,
  mono = false,
}: {
  label: string
  body: string
  tone: 'dim' | 'cyan' | 'mint'
  mono?: boolean
}) {
  const ring =
    tone === 'mint'
      ? 'border-[rgba(0,255,178,0.3)]'
      : tone === 'cyan'
      ? 'border-[rgba(57,214,255,0.28)]'
      : 'border-soft'
  const dot = tone === 'mint' ? 'bg-mint' : tone === 'cyan' ? 'bg-cyan' : 'bg-ink-3'
  const labelColor = tone === 'mint' ? 'text-mint' : tone === 'cyan' ? 'text-cyan' : 'text-ink-3'
  return (
    <div className={`flex flex-col justify-center rounded-lg border bg-white/[0.02] px-4 py-4 ${ring}`}>
      <span className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] ${labelColor}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
        {label}
      </span>
      <span className={`mt-2 ${mono ? 'font-mono' : 'font-sans'} text-[13.5px] leading-snug text-ink-2`}>
        {body}
      </span>
    </div>
  )
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="hidden items-center justify-center font-mono text-ink-3 sm:flex"
    >
      →
    </span>
  )
}

/* ───────────────────────────── 3 · the ten-category index ───────────────── */

type Category = {
  key: string
  name: string
  count: string
  blurb: string
  primitives: { name: string; gloss?: string }[]
}

const CATEGORIES: Category[] = [
  {
    key: 'voice',
    name: 'Voice & telephony',
    count: '~45',
    blurb: 'Placing, moving and capturing live conversations.',
    primitives: [
      { name: 'MAKE_CALL' },
      { name: 'TRANSFER_CALL' },
      { name: 'CONFERENCE' },
      { name: 'TRANSCRIBE' },
    ],
  },
  {
    key: 'documents',
    name: 'Document operations',
    count: '~30',
    blurb: 'Generating, reading and routing the paper of regulated work.',
    primitives: [
      { name: 'GENERATE_NOTICE' },
      { name: 'PARSE_PDF' },
      { name: 'E_SIGN' },
      { name: 'SEND_EMAIL' },
    ],
  },
  {
    key: 'compliance',
    name: 'Compliance checks',
    count: '~50',
    blurb: 'The rule-tests an action must pass before it is allowed to run.',
    primitives: [
      { name: 'CHECK_TCPA' },
      { name: 'CHECK_BANKRUPTCY' },
      { name: 'VERIFY_SCRA' },
      { name: 'REG_F_LIMIT' },
    ],
  },
  {
    key: 'data',
    name: 'Data operations',
    count: '~35',
    blurb: 'Fetching, updating and enriching the records work runs on.',
    primitives: [
      { name: 'FETCH_ACCOUNT' },
      { name: 'UPDATE_STATUS' },
      { name: 'ENRICH_ADDRESS' },
      { name: 'BUREAU_LOOKUP' },
    ],
  },
  {
    key: 'payments',
    name: 'Payment processing',
    count: '~25',
    blurb: 'Calculating, verifying and moving money under the rules.',
    primitives: [
      { name: 'CALCULATE_SETTLEMENT' },
      { name: 'VERIFY_BANK' },
      { name: 'PROCESS_PAYMENT' },
      { name: 'SCHEDULE_AUTOPAY' },
    ],
  },
  {
    key: 'decision',
    name: 'Decision logic',
    count: '~20',
    blurb: 'Evaluating policy, resolving conflicts and routing to people.',
    primitives: [
      { name: 'EVALUATE_POLICY' },
      { name: 'RESOLVE_CONFLICT' },
      { name: 'ESCALATE' },
      { name: 'APPROVE', gloss: 'workflow-step approval — never credit' },
    ],
  },
  {
    key: 'analytics',
    name: 'Analytics & reporting',
    count: '~15',
    blurb: 'Rolling up metrics and producing the reports auditors expect.',
    primitives: [
      { name: 'AGGREGATE_METRICS' },
      { name: 'GENERATE_REPORT' },
      { name: 'EXPORT_CSV' },
    ],
  },
  {
    key: 'integration',
    name: 'Integration',
    count: '~30',
    blurb: 'Reaching the systems you already run, both ways.',
    primitives: [
      { name: 'SYNC_LOS' },
      { name: 'PUSH_TO_CRM' },
      { name: 'CALL_WEBHOOK' },
      { name: 'QUERY_API' },
    ],
  },
  {
    key: 'testing',
    name: 'Testing & QA',
    count: '~10',
    blurb: 'Exercising co-workers safely before they ever touch production.',
    primitives: [{ name: 'MOCK_CALL' }, { name: 'SIMULATE_ERROR' }, { name: 'INJECT_DELAY' }],
  },
  {
    key: 'custom',
    name: 'Custom',
    count: '—',
    blurb: 'Tenant-specific primitives — built to the same construction.',
    primitives: [{ name: 'Tenant-specific primitives' }],
  },
]

export function CategoryIndex() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {CATEGORIES.map((c) => (
        <li key={c.key}>
          <CategoryTile category={c} open={open === c.key} onToggle={() => setOpen(open === c.key ? null : c.key)} />
        </li>
      ))}
    </ul>
  )
}

function CategoryTile({
  category,
  open,
  onToggle,
}: {
  category: Category
  open: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  const panelId = useId()
  const innerRef = useRef<HTMLDivElement>(null)
  const height = open ? innerRef.current?.scrollHeight ?? undefined : 0

  return (
    <div className={`glass-quiet h-full overflow-hidden ${open ? 'border-[rgba(0,255,178,0.26)]' : ''} transition-colors duration-DEFAULT`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start gap-4 px-5 py-5 text-left md:px-6"
      >
        <div className="flex-1">
          <span className="font-serif text-[1.18rem] leading-tight text-ink transition-colors group-hover:text-mint">
            {category.name}
          </span>
          <span className="mt-2 block max-w-[34ch] font-sans text-[13px] leading-relaxed text-ink-3">
            {category.blurb}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-[12px] tabular-nums text-ink-2">{category.count}</span>
          <span
            aria-hidden
            className={`font-mono text-[13px] text-ink-3 transition-transform duration-DEFAULT ease-standard motion-reduce:transition-none ${
              open ? 'rotate-45 text-mint' : 'group-hover:text-ink-2'
            }`}
          >
            +
          </span>
        </span>
      </button>

      {/* Primitives ALWAYS rendered (SEO): height-collapsed + aria-hidden when shut. */}
      <motion.div
        id={panelId}
        initial={false}
        animate={{ height }}
        transition={reduce ? { duration: 0 } : { duration: 0.34, ease: EASE }}
        style={{ height }}
        aria-hidden={!open}
        className="overflow-hidden"
      >
        <div ref={innerRef} className="border-t border-soft px-5 pb-5 pt-4 md:px-6">
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5">
            {category.primitives.map((p) => (
              <li key={p.name}>
                <span className="inline-flex items-center rounded border border-soft bg-white/[0.02] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-ink-2">
                  {p.name}
                </span>
                {p.gloss && (
                  <span className="ml-2 font-sans text-[11.5px] italic text-ink-3">{p.gloss}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
            {category.count} primitives · a representative few
          </p>
        </div>
      </motion.div>
    </div>
  )
}

/* ───────────────────────────── 4 · the MAKE_CALL receipt ────────────────── */

const PRECHECKS = [
  { code: 'CHECK_TCPA', label: 'TCPA consent' },
  { code: 'CALLING_HOURS', label: 'Calling hours' },
  { code: 'REG_F_LIMIT', label: 'Reg F contact limits' },
  { code: 'CHECK_DNC', label: 'DNC registry' },
] as const

const INPUTS = [
  { k: 'account_id', v: 'acct_8842190' },
  { k: 'phone_number', v: '+1 ••• ••• 4417' },
  { k: 'caller_id', v: 'compliant DID' },
  { k: 'max_duration', v: '600s' },
  { k: 'script / context', v: 'optional' },
] as const

const OUTPUTS = [
  { k: 'call_id', v: 'call_3f9c…' },
  { k: 'status', v: 'completed' },
  { k: 'duration', v: '8m 04s' },
  { k: 'transcript', v: 'attached' },
  { k: 'recording_url', v: 'signed link' },
  { k: 'sentiment', v: 'neutral → cooperative' },
  { k: 'right_party_contact', v: 'true' },
] as const

const KWU_LINES = [
  { label: 'Pre-flight validation (4 checks)', value: 8 },
  { label: 'Connected call · ~10 KWU / minute × 8m', value: 80 },
  { label: 'Transcription + sentiment', value: 28 },
  { label: 'Recording + metering + log', value: 16 },
] as const

const KWU_TOTAL = KWU_LINES.reduce((s, l) => s + l.value, 0) // 132

export function MakeCallReceipt() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const cleared = reduce ? true : inView

  return (
    <div ref={ref} className="glass mx-auto max-w-[680px] overflow-hidden">
      {/* receipt header */}
      <div className="flex items-center justify-between gap-4 border-b border-soft px-6 py-4 md:px-8">
        <span className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-mint" aria-hidden />
          <span className="font-mono text-[13px] tracking-[0.04em] text-ink">MAKE_CALL</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          Voice &amp; telephony · 1 primitive
        </span>
      </div>

      <div className="px-6 py-7 md:px-8">
        {/* inputs */}
        <ReceiptBlock label="Inputs" tone="dim">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {INPUTS.map((row) => (
              <KV key={row.k} k={row.k} v={row.v} />
            ))}
          </dl>
        </ReceiptBlock>

        {/* pre-checks — clear cyan → mint on scroll-in */}
        <ReceiptBlock label="Pre-flight checks" tone="cyan" note="proposed → validated">
          <ul className="space-y-2">
            {PRECHECKS.map((c, i) => (
              <PreCheckRow key={c.code} code={c.code} label={c.label} cleared={cleared} index={i} reduce={!!reduce} />
            ))}
          </ul>
          <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-ink-3">
            All four clear before a single digit is dialed. If any fails, the call never fires — and
            the exception is logged.
          </p>
        </ReceiptBlock>

        {/* outputs */}
        <ReceiptBlock label="Returns" tone="mint">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {OUTPUTS.map((row) => (
              <KV key={row.k} k={row.k} v={row.v} />
            ))}
          </dl>
        </ReceiptBlock>

        {/* KWU meter — line-item math */}
        <div className="mt-7 rounded-lg border border-[rgba(0,255,178,0.22)] bg-[rgba(0,255,178,0.03)] px-5 py-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
            Metered — KWU
          </span>
          <ul className="mt-4 space-y-2">
            {KWU_LINES.map((line) => (
              <li key={line.label} className="flex items-baseline justify-between gap-4">
                <span className="font-sans text-[13.5px] leading-snug text-ink-2">{line.label}</span>
                <span className="shrink-0 font-mono text-[13px] tabular-nums text-ink-2">
                  +{line.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-soft pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
              Typical 8-minute outbound call
            </span>
            <span className="font-mono text-[15px] tabular-nums text-mint">≈ {KWU_TOTAL} KWU</span>
          </div>
          <p className="mt-3 font-sans text-[12px] leading-relaxed text-ink-3">
            Lands in the ~120–150 KWU range, validation included — explained line by line, never
            asserted.
          </p>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          Illustrative · a lending example
        </p>
      </div>
    </div>
  )
}

function ReceiptBlock({
  label,
  tone,
  note,
  children,
}: {
  label: string
  tone: 'dim' | 'cyan' | 'mint'
  note?: string
  children: React.ReactNode
}) {
  const labelColor = tone === 'mint' ? 'text-mint' : tone === 'cyan' ? 'text-cyan' : 'text-ink-3'
  return (
    <div className="mb-7 last:mb-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${labelColor}`}>{label}</span>
        {note && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{note}</span>}
      </div>
      {children}
    </div>
  )
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.04] pb-2 last:border-0 sm:last:border-b">
      <dt className="font-mono text-[12px] text-ink-3">{k}</dt>
      <dd className="text-right font-mono text-[12px] tabular-nums text-ink-2">{v}</dd>
    </div>
  )
}

function PreCheckRow({
  code,
  label,
  cleared,
  index,
  reduce,
}: {
  code: string
  label: string
  cleared: boolean
  index: number
  reduce: boolean
}) {
  // grammar: starts cyan (proposed/checking), settles mint (validated)
  const color = cleared ? 'var(--mint)' : 'var(--cyan)'
  return (
    <li className="flex items-center gap-3">
      <motion.span
        aria-hidden
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border"
        initial={false}
        animate={{ borderColor: color, color }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: cleared ? 0.12 + index * 0.18 : 0 }}
      >
        <motion.span
          className="font-mono text-[10px] leading-none"
          initial={false}
          animate={{ opacity: cleared ? 1 : 0.35 }}
          transition={reduce ? { duration: 0 } : { duration: 0.3, delay: cleared ? 0.12 + index * 0.18 : 0 }}
        >
          {cleared ? '✓' : '•'}
        </motion.span>
      </motion.span>
      <span className="font-mono text-[12.5px] text-ink-2">{code}</span>
      <span className="font-sans text-[12.5px] text-ink-3">{label}</span>
      <motion.span
        className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em]"
        initial={false}
        animate={{ color, opacity: cleared ? 1 : 0.6 }}
        transition={reduce ? { duration: 0 } : { duration: 0.4, delay: cleared ? 0.12 + index * 0.18 : 0 }}
      >
        {cleared ? 'clear' : 'checking'}
      </motion.span>
    </li>
  )
}

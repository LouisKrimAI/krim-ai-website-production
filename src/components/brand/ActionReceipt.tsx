/**
 * ActionReceipt — V2 signature artifact.
 *
 * A format demonstration, not a fabricated instance. Every KrimOS action
 * issues a receipt of this kind: action description + policy clearances
 * (Consent, Jurisdiction, Hours, Authority) + reasoning + execute trail.
 *
 * Design discipline:
 *   - Lifted indigo surface (#22264E), no glass, no shadow, no paper texture
 *   - Internal hairline rules between header / body / footer
 *   - Mono for technical fields, Source Serif Text Italic for reasoning,
 *     bilingual eyebrow (कर्ता · KARTA) — the page's one Devanagari moment
 *     besides the close watermark.
 *   - One ochre focal: the eyebrow brand mark.
 *   - Outline ticks (notary stamp), not filled checkmarks.
 *   - Mint timestamp — the only mint on the page besides the logo.
 *
 * Reveal motion (1400ms, plays once on first viewport entry):
 *   0–280   Receipt settles  (opacity, y-12, blur 6→0)
 *   240–520 Action + reasoning mask-reveal from left (stagger 80ms)
 *   620–1100 Four ticks light in sequence (90ms apart, controlled overshoot)
 *   1180–1400 Mint timestamp resolves
 */

import { motion, type Variants } from 'framer-motion'

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const EASE_OVERSHOOT = [0.34, 1.56, 0.64, 1] as const

const CLEARANCES = ['Consent', 'Jurisdiction', 'Hours', 'Authority'] as const

const receiptShell: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.28, ease: EASE_OUT } },
}
const lineReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.28, ease: EASE_OUT } },
}
const tickReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: EASE_OVERSHOOT } },
}
const timestampReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: EASE_OUT } },
}

export default function ActionReceipt() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <motion.div
        variants={receiptShell}
        className="relative rounded-[4px] bg-krim-surface border border-white/[0.06]"
      >
        {/* Header strip — KARTA · ACTION RECEIPT · trail id */}
        <div className="px-7 md:px-9 py-5 flex items-baseline justify-between gap-4 border-b border-white/[0.05]">
          <p className="brand-mono-eyebrow text-krim-slate flex items-baseline gap-2">
            <span className="text-krim-ochre/85">KARTA</span>
            <span className="text-krim-slate/60">·</span>
            <span>ACTION RECEIPT</span>
          </p>
          <p className="brand-mono text-[10px] tracking-[0.08em] uppercase text-krim-slate/70">
            kr-act-9f4e2c1
          </p>
        </div>

        {/* Body */}
        <div className="px-7 md:px-9 py-8 space-y-6">
          {/* Action */}
          <div className="space-y-1.5">
            <p className="brand-mono-eyebrow text-krim-slate/70">Action</p>
            <motion.p
              variants={lineReveal}
              transition={{ delay: 0.24 }}
              className="text-krim-off-white/95 text-[16px] leading-snug"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sanction collections call to <span className="brand-mono text-krim-off-white/80">+91 ●●●●●</span>
            </motion.p>
          </div>

          {/* Clearance row — 4 ochre outline ticks, category labels only */}
          <div className="space-y-1.5">
            <p className="brand-mono-eyebrow text-krim-slate/70">Cleared</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              {CLEARANCES.map((label, i) => (
                <motion.div
                  key={label}
                  variants={tickReveal}
                  transition={{ delay: 0.62 + i * 0.09 }}
                  className="flex items-center gap-2.5"
                >
                  {/* Ochre OUTLINE tick — notary stamp, not checkbox UI */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="7" r="6.25" stroke="#C8973B" strokeWidth="1.25" />
                    <path d="M4 7.2 L6.1 9.2 L10 5.2" stroke="#C8973B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="brand-mono text-[12.5px] text-krim-off-white/85 tracking-[0.01em]">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reasoning — Source Serif italic */}
          <div className="space-y-1.5">
            <p className="brand-mono-eyebrow text-krim-slate/70">Reasoning</p>
            <motion.p
              variants={lineReveal}
              transition={{ delay: 0.32 }}
              className="brand-serif italic text-krim-off-white/90 text-[15.5px] leading-[1.5] tracking-[-0.005em] max-w-[52ch]"
              style={{ fontWeight: 400 }}
            >
              47 days past due. Prior contact 12 days ago. Polite-hour window 09:00–18:00 IST open.
            </motion.p>
          </div>
        </div>

        {/* Footer — execute timestamp in mint, the page's only earned mint moment */}
        <div className="px-7 md:px-9 py-4 border-t border-white/[0.05] flex items-center justify-between">
          <p className="brand-mono-eyebrow text-krim-slate/70">Executed</p>
          <motion.p
            variants={timestampReveal}
            transition={{ delay: 1.18 }}
            className="brand-mono text-[12.5px] tracking-[0.02em] text-krim-mint"
          >
            14:32:08 IST
          </motion.p>
        </div>
      </motion.div>

      {/* Caption beneath the receipt — closes the credibility gap */}
      <p className="brand-mono text-[10.5px] tracking-[0.06em] uppercase text-krim-slate/65 text-center mt-6">
        Sample format · Every KrimOS action issues a receipt of this kind
      </p>
    </motion.div>
  )
}

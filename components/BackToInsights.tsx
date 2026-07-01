/**
 * BackToInsights — a subtle glassmorphic pill that returns the reader to the
 * /insights index. Sits with the "Keep reading" links at the foot of every
 * article so all article navigation lives in one place. Neutral frosted glass at
 * rest; a mint sheen sweeps in from the left on hover and the arrow slides back.
 *
 * Server component — no client JS.
 */

import Link from 'next/link'

export default function BackToInsights({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/insights"
      aria-label="Back to all insights"
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 hover:border-mint/40 hover:text-ink ${className}`}
      style={{
        background:
          'linear-gradient(152deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 55%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(22px) saturate(135%)',
        WebkitBackdropFilter: 'blur(22px) saturate(135%)',
        boxShadow:
          '0 1px 0 0 rgba(255,255,255,0.08) inset, 0 10px 30px -18px rgba(2,4,10,0.6)',
      }}
    >
      {/* mint sheen — sweeps in from the left edge on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(120% 120% at 0% 50%, rgba(0,255,178,0.12) 0%, transparent 62%)' }}
      />
      <span
        aria-hidden
        className="relative inline-block text-mint transition-transform duration-300 group-hover:-translate-x-1"
      >
        ←
      </span>
      <span className="relative">All insights</span>
    </Link>
  )
}

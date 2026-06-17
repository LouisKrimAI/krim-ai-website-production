/**
 * Core library — Section · Eyebrow · GlassCard · Stat · CTA.
 * Server-safe (no client hooks); motion lives in Reveal.tsx.
 * Grammar: mint = validated/learned · cyan = proposed/thinking · gold = exception.
 */

import Link from 'next/link'

// ---------------------------------------------------------------- Section

export function Section({
  id,
  children,
  className = '',
  hairline = false,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  hairline?: boolean
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 ${hairline ? 'border-t border-soft' : ''} ${className}`}
      style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}
    >
      <div className="mx-auto max-w-site px-6 md:px-10">{children}</div>
    </section>
  )
}

// ---------------------------------------------------------------- Eyebrow

export function Eyebrow({
  children,
  tone = 'dim',
  className = '',
}: {
  children: React.ReactNode
  tone?: 'mint' | 'gold' | 'cyan' | 'dim'
  className?: string
}) {
  const tones = {
    mint: 'text-mint',
    gold: 'text-gold',
    cyan: 'text-cyan',
    dim: 'text-ink-3',
  } as const
  return (
    <p className={`font-mono text-eyebrow uppercase ${tones[tone]} ${className}`}>{children}</p>
  )
}

// ---------------------------------------------------------------- GlassCard

export function GlassCard({
  children,
  className = '',
  accent = false,
  hover = false,
}: {
  children: React.ReactNode
  className?: string
  /** the one mint-edged accent card per view — use once */
  accent?: boolean
  /** luminous hover lift, for cards that are links/doors */
  hover?: boolean
}) {
  return (
    <div
      className={`glass ${hover ? 'lume' : ''} ${className}`}
      style={accent ? { borderColor: 'rgba(0,255,178,0.45)' } : undefined}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------- Stat

export function Stat({
  value,
  label,
  className = '',
}: {
  value: string
  label: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="font-serif text-[clamp(2rem,3.5vw,2.9rem)] leading-none text-ink">{value}</p>
      <p className="mt-2 font-mono text-caption uppercase tracking-[0.14em] text-ink-3">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------- CTA

export function CTA({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  if (variant === 'primary') {
    return (
      <Link
        href={href}
        className={`inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim motion-reduce:hover:translate-y-0 ${className}`}
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 font-sans text-[15px] text-ink-2 transition-colors hover:text-mint ${className}`}
    >
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
    </Link>
  )
}

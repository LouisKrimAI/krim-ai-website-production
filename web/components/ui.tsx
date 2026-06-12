/**
 * ui.tsx — shared primitives for the ONE CANVAS (BUILD-BRIEF v3 §3).
 * One ground; glass panels; cyan = proposed/thinking · mint = validated/
 * learned · gold = exceptions only. Server-safe; pair with <Reveal>.
 *
 * Tone compat: 'seal' (retired light-world token) maps to 'mint';
 * 'amber' maps to 'gold' — so pages mid-restyle still compile. Agents
 * normalise to the new names.
 */

import Link from 'next/link'

type Tone = 'mint' | 'gold' | 'dim' | 'cyan' | 'seal' | 'amber' | 'ink'
const toneClass = (t: Tone) =>
  t === 'gold' || t === 'amber' ? 'text-amber-dark'
  : t === 'dim' || t === 'ink' ? 'text-rtext-3'
  : t === 'cyan' ? 'text-cyan'
  : 'text-mint'

export function Eyebrow({ children, tone = 'mint', className = '' }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <p className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-5 ${toneClass(tone)} ${className}`}>{children}</p>
}

export function PageH1({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`font-serif font-light text-rtext text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.015em] ${className}`}>
      {children}
    </h1>
  )
}

export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif font-light text-rtext text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.06] tracking-[-0.012em] ${className}`}>
      {children}
    </h2>
  )
}

export function Lede({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-serif text-[1.25rem] leading-[1.6] text-rtext-2 max-w-[52ch] ${className}`}>{children}</p>
}

export function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-sans text-[15.5px] leading-[1.7] text-rtext-2 max-w-measure ${className}`}>{children}</p>
}

/** One canvas: sections are rhythm, not colour changes. `hairline` marks a boundary when needed. */
export function Section({ children, className = '', id, hairline = false, tone }: { children: React.ReactNode; className?: string; id?: string; hairline?: boolean; tone?: string }) {
  void tone // retired light-world prop, accepted for compile-compat
  return (
    <section id={id}>
      {hairline && <div className="hairline" aria-hidden />}
      <div className={`mx-auto max-w-site px-6 md:px-10 py-16 md:py-24 ${className}`}>{children}</div>
    </section>
  )
}

/** Compat alias: the dark interlude concept is retired — one canvas now. */
export function DarkInterlude({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <Section id={id} className={className} hairline>{children}</Section>
}

/** Glass panel — content floating above the system. accent: the one mint-edged panel per view. */
export function Glass({ children, className = '', accent = false, quiet = false }: { children: React.ReactNode; className?: string; accent?: boolean; quiet?: boolean }) {
  return <div className={`${quiet ? 'glass-quiet' : 'glass'} ${accent ? 'glass-mint' : ''} ${className}`}>{children}</div>
}

export function CTAGroup({ secondaryHref = '/platform', secondaryLabel = 'See how it works', className = '' }: { secondaryHref?: string; secondaryLabel?: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-5 ${className}`}>
      {/* TODO(step 3): point at /contact once the conversion page ships */}
      <a
        href="mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS"
        className="font-sans text-[15px] font-medium px-7 py-3.5 rounded-[10px] bg-mint text-mint-on hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,255,178,0.25)] transition-all"
      >
        Book a demo
      </a>
      <Link href={secondaryHref} className="font-mono text-[12px] tracking-[0.16em] uppercase text-rtext-2 hover:text-rtext underline-offset-4 hover:underline">
        {secondaryLabel}
      </Link>
    </div>
  )
}

export function MonoNote({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-[10.5px] tracking-[0.08em] text-rtext-3 ${className}`}>{children}</p>
}

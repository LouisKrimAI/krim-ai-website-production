'use client'

/**
 * SiteHeader — sticky glass nav over the orb. The static Krim mark (real
 * committed file) + wordmark at left. Two grouped menus — "KrimOS" (the
 * product, with its layers) and "Domains" — plus flat links. Accessible:
 * each menu is a real button with aria-expanded, the open menu closes on
 * Escape / outside-click, links are focusable. Only one menu open at a time.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import KrimLogoAnimated from './KrimLogoAnimated'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

// KrimOS — overview + the layer pages (Kira now also covers the Krimkar app)
const KRIMOS = [
  ['Overview', 'The operating system, end to end', '/platform'],
  ['Kendra', 'The runtime — validates & learns', '/platform/kendra'],
  ['Kriya', 'The vocabulary of actions', '/platform/kriya'],
  ['Karta', 'The AI co-workers', '/platform/karta'],
  ['Kupa', 'The command center', '/platform/kupa'],
  ['Kula', 'For your teams', '/platform/kula'],
  ['Kira', 'The customer advisor', '/platform/kira'],
] as const

const DOMAINS = [
  ['Lending', '/lending'],
  ['Government', '/government'],
  ['Large Enterprise', '/enterprise'],
  ['MSME', '/msme'],
] as const

// Research — the work under the product, with its two anchors
const RESEARCH = [
  ['Overview', 'The work under the product', '/research'],
  ['Epistemic AI', 'The category we define', '/epistemic-ai'],
  ['World Lending Model', 'The model we build toward', '/research/world-lending-model'],
] as const

const FLAT_RIGHT = [
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const

const DEMO_HREF = '/contact'

const linkCls = 'font-sans text-[14px] text-ink-2 transition-colors duration-fast hover:text-ink'

type MenuKey = 'krimos' | 'domains' | 'research' | null

function Caret({ open }: { open: boolean }) {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-fast ${open ? 'rotate-180' : ''}`}>
      <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SiteHeader({ scrollReveal = false }: { scrollReveal?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false) // mobile sheet
  const [open, setOpen] = useState<MenuKey>(null) // desktop dropdown (one at a time)
  const navRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // On the homepage the banner stays hidden over the hero and is revealed once
  // the visitor scrolls past it. Elsewhere (scrollReveal=false) it's always shown.
  const [shown, setShown] = useState(!scrollReveal)

  useEffect(() => {
    if (!scrollReveal) return
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollReveal])

  // close the open desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-soft bg-bg/70 backdrop-blur-md"
      aria-hidden={!shown}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown || reduce ? 0 : -14 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: OUT_SOFT }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center" aria-label="Krim — home">
          <KrimLogoAnimated className="h-[26px] w-auto" />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {/* KrimOS group — the product + its layers */}
          <div
            className="relative"
            onMouseEnter={() => setOpen('krimos')}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 ${linkCls}`}
              aria-expanded={open === 'krimos'}
              aria-haspopup="true"
              onClick={() => setOpen((v) => (v === 'krimos' ? null : 'krimos'))}
            >
              KrimOS
              <Caret open={open === 'krimos'} />
            </button>
            {open === 'krimos' && (
              <div className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-[14px] border border-strong bg-[rgba(14,15,19,0.97)] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {KRIMOS.map(([label, role, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-[10px] px-3.5 py-2.5 transition-colors hover:bg-white/[0.05]"
                      onClick={() => setOpen(null)}
                    >
                      <span className="block font-sans text-[14px] text-ink">{label}</span>
                      <span className="mt-0.5 block font-sans text-[12.5px] text-ink-3">{role}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Domains group */}
          <div
            className="relative"
            onMouseEnter={() => setOpen('domains')}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 ${linkCls}`}
              aria-expanded={open === 'domains'}
              aria-haspopup="true"
              onClick={() => setOpen((v) => (v === 'domains' ? null : 'domains'))}
            >
              Domains
              <Caret open={open === 'domains'} />
            </button>
            {open === 'domains' && (
              <div className="absolute left-1/2 top-full z-50 w-[230px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-[14px] border border-strong bg-[rgba(14,15,19,0.97)] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {DOMAINS.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-[10px] px-3.5 py-2.5 font-sans text-[14px] text-ink-2 transition-colors hover:bg-white/[0.05] hover:text-ink"
                      onClick={() => setOpen(null)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Research group — Epistemic AI + the World Lending Model */}
          <div
            className="relative"
            onMouseEnter={() => setOpen('research')}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 ${linkCls}`}
              aria-expanded={open === 'research'}
              aria-haspopup="true"
              onClick={() => setOpen((v) => (v === 'research' ? null : 'research'))}
            >
              Research
              <Caret open={open === 'research'} />
            </button>
            {open === 'research' && (
              <div className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-[14px] border border-strong bg-[rgba(14,15,19,0.97)] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {RESEARCH.map(([label, role, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-[10px] px-3.5 py-2.5 transition-colors hover:bg-white/[0.05]"
                      onClick={() => setOpen(null)}
                    >
                      <span className="block font-sans text-[14px] text-ink">{label}</span>
                      <span className="mt-0.5 block font-sans text-[12.5px] text-ink-3">{role}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {FLAT_RIGHT.map(([label, href]) => (
            <Link key={href} href={href} className={linkCls}>
              {label}
            </Link>
          ))}

          <a
            href={DEMO_HREF}
            className="rounded bg-mint px-5 py-2 font-sans text-[13.5px] font-medium text-on-mint transition-colors duration-fast hover:bg-mint-bright"
          >
            Book a demo
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-ink-2 lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 5.5h16M2 10h16M2 14.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-soft bg-bg/95 backdrop-blur-md lg:hidden" aria-label="Primary mobile">
          <div className="mx-auto max-w-site px-6 py-5">
            <p className="pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">KrimOS</p>
            {KRIMOS.map(([label, , href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {label}
              </Link>
            ))}
            <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Domains</p>
            {DOMAINS.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {label}
              </Link>
            ))}
            <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Research</p>
            {RESEARCH.map(([label, , href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {label}
              </Link>
            ))}
            <div className="mt-1">
              {FLAT_RIGHT.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2.5 font-sans text-[15px] text-ink-2 hover:text-ink">
                  {label}
                </Link>
              ))}
            </div>
            <a href={DEMO_HREF} className="mt-4 inline-block rounded bg-mint px-5 py-2.5 font-sans text-[14px] font-medium text-on-mint">
              Book a demo
            </a>
          </div>
        </nav>
      )}
    </motion.header>
  )
}

'use client'

/**
 * SiteHeader — sticky glass nav over the orb. The static Krim mark (real
 * committed file) + wordmark at left. Domains are grouped under a labelled
 * "Domains" menu (BUILD-PLAN); the rest are flat. Accessible: the menu is a
 * real button with aria-expanded, closes on Escape/outside-click, links are
 * focusable. Routes beyond / ship in later phases.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const DOMAINS = [
  ['Lending', '/lending'],
  ['Government', '/government'],
  ['Large Enterprise', '/enterprise'],
  ['MSME', '/msme'],
] as const

const FLAT_LEFT = [['Platform', '/platform']] as const
const FLAT_RIGHT = [
  ['Epistemic AI', '/epistemic-ai'],
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

const linkCls = 'font-sans text-[14px] text-ink-2 transition-colors duration-fast hover:text-ink'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false) // mobile sheet
  const [domainsOpen, setDomainsOpen] = useState(false) // desktop dropdown
  const domainsRef = useRef<HTMLDivElement>(null)

  // close the desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!domainsOpen) return
    const onDown = (e: MouseEvent) => {
      if (domainsRef.current && !domainsRef.current.contains(e.target as Node)) setDomainsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDomainsOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [domainsOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-soft bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Krim — home">
          {/* the real static mark */}
          <img src="/brand/krim-mark.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
          <span className="font-mono text-[15px] font-medium tracking-[0.22em] text-ink">KRIM</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {FLAT_LEFT.map(([label, href]) => (
            <Link key={href} href={href} className={linkCls}>
              {label}
            </Link>
          ))}

          {/* Domains group */}
          <div
            ref={domainsRef}
            className="relative"
            onMouseEnter={() => setDomainsOpen(true)}
            onMouseLeave={() => setDomainsOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 ${linkCls}`}
              aria-expanded={domainsOpen}
              aria-haspopup="true"
              onClick={() => setDomainsOpen((v) => !v)}
            >
              Domains
              <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-fast ${domainsOpen ? 'rotate-180' : ''}`}>
                <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {domainsOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[230px] -translate-x-1/2 pt-3">
                <div className="glass overflow-hidden p-2">
                  {DOMAINS.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-[10px] px-3.5 py-2.5 font-sans text-[14px] text-ink-2 transition-colors hover:bg-white/[0.05] hover:text-ink"
                      onClick={() => setDomainsOpen(false)}
                    >
                      {label}
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
            <Link href="/platform" onClick={() => setMenuOpen(false)} className="block py-2.5 font-sans text-[15px] text-ink-2 hover:text-ink">
              Platform
            </Link>
            <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Domains</p>
            {DOMAINS.map(([label, href]) => (
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
    </header>
  )
}

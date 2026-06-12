'use client'

/**
 * SiteHeader — sticky, quiet glass over the orb backdrop.
 * Nav per SITEMAP-IA: Platform · Lending · Government · Epistemic AI ·
 * Trust · Company + "Book a demo". Routes beyond / ship in later phases.
 */

import { useState } from 'react'
import Link from 'next/link'
import TriangleMark from './TriangleMark'

const NAV = [
  ['Platform', '/platform'],
  ['Lending', '/lending'],
  ['Government', '/government'],
  ['Epistemic AI', '/epistemic-ai'],
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const

// TODO(/contact work order): point at /contact once the form ships.
const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-soft bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Krim — home">
          <TriangleMark size={20} />
          <span className="font-mono text-[15px] font-medium tracking-[0.22em] text-ink">KRIM</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-[14px] text-ink-2 transition-colors duration-fast hover:text-ink"
            >
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
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 5.5h16M2 10h16M2 14.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-soft bg-bg/95 backdrop-blur-md lg:hidden" aria-label="Primary mobile">
          <div className="mx-auto max-w-site space-y-1 px-6 py-4">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-sans text-[15px] text-ink-2 hover:text-ink"
              >
                {label}
              </Link>
            ))}
            <a href={DEMO_HREF} className="mt-3 inline-block rounded bg-mint px-5 py-2.5 font-sans text-[14px] font-medium text-on-mint">
              Book a demo
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

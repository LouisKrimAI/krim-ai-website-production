'use client'

/**
 * SiteHeader — one banner, one sheet.
 *
 * Hovering ANY nav item opens the SAME full-width glass sheet: every site
 * destination in four columns (KrimOS · Domains · Research · Company),
 * single-line rows, no filler copy. The sheet never changes size. A mint
 * thread slides under the hovered item; the current section carries a quiet
 * mark. The sheet is a FIXED SIBLING of the header — the banner's own
 * backdrop-filter is a backdrop root, so a child's blur could never sample
 * the page behind it. Accessible: triggers open on keyboard focus and carry
 * aria-expanded; Escape / outside-click / leave (with grace) close.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import KrimLogoAnimated from './KrimLogoAnimated'
import { NAV_COLUMNS as COLUMNS, NAV_TOP as NAV } from './nav'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

const DEMO_HREF = '/contact'

export default function SiteHeader({ scrollReveal = false }: { scrollReveal?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false) // mobile sheet
  const [open, setOpen] = useState(false) // the one desktop sheet
  const [hovered, setHovered] = useState<string | null>(null) // thread position
  const headerRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduce = useReducedMotion()
  const pathname = usePathname()
  // On the homepage the banner stays hidden over the hero and is revealed once
  // the visitor scrolls past it. Elsewhere (scrollReveal=false) it's always shown.
  const [shown, setShown] = useState(!scrollReveal)

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const openSheet = (label: string) => { cancelClose(); setHovered(label); setOpen(true) }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => { setOpen(false); setHovered(null) }, 140)
  }
  const closeNow = () => { cancelClose(); setOpen(false); setHovered(null) }

  useEffect(() => {
    if (!scrollReveal) return
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollReveal])

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!headerRef.current?.contains(t) && !panelRef.current?.contains(t)) closeNow()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeNow()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const isCurrent = (m: string[]) => m.some((p) => pathname === p || pathname?.startsWith(p + '/'))

  return (
    <>
    <motion.header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-soft bg-bg/70 backdrop-blur-md"
      aria-hidden={!shown}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown || reduce ? 0 : -14 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: OUT_SOFT }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center" aria-label="Krim — home" onMouseEnter={scheduleClose}>
          <KrimLogoAnimated className="h-[26px] w-auto" />
        </Link>

        <nav className="hidden h-full items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map(({ label, href, match }) => {
            const lit = open && hovered === label
            const current = isCurrent(match)
            return (
              <div key={label} className="relative flex h-full items-center" onMouseEnter={() => openSheet(label)}>
                <Link
                  href={href}
                  className={`font-sans text-[14px] transition-colors duration-fast ${
                    lit || current ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={open}
                  aria-controls="mega-panel"
                  onFocus={() => openSheet(label)}
                  onClick={closeNow}
                >
                  {label}
                </Link>
                {/* the mint thread, sliding under the hovered item */}
                {lit && (
                  <motion.span
                    layoutId="nav-thread"
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0,255,178,0.9), transparent)',
                      boxShadow: '0 0 14px rgba(0,255,178,0.45)',
                    }}
                    transition={reduce ? { duration: 0 } : { duration: 0.3, ease: OUT_SOFT }}
                  />
                )}
                {/* quiet mark under the section the visitor is already in */}
                {!lit && current && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-mint/45 to-transparent"
                  />
                )}
              </div>
            )
          })}

          <span aria-hidden className="mx-1 h-4 w-px bg-white/10" />

          <a
            href={DEMO_HREF}
            onMouseEnter={scheduleClose}
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
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 first:pt-0">{col.title}</p>
                <Link href={col.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                  Overview
                </Link>
                {col.rows.map((r) => (
                  <Link key={r.href + r.label} href={r.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                    {r.label}
                  </Link>
                ))}
              </div>
            ))}
            <a href={DEMO_HREF} className="mt-4 inline-block rounded bg-mint px-5 py-2.5 font-sans text-[14px] font-medium text-on-mint">
              Book a demo
            </a>
          </div>
        </nav>
      )}
    </motion.header>

    {/* ---- the sheet: every destination, one glass pane, one constant size.
            Fixed sibling of the header (its backdrop-filter would otherwise
            block the blur). ---- */}
    <div id="mega-panel" ref={panelRef} className="pointer-events-none fixed inset-x-0 top-16 z-30 hidden lg:block">
      <AnimatePresence>
        {open && (
          <motion.div
            className="mega-glass pointer-events-auto relative overflow-hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0.15 : 0.28, ease: OUT_SOFT }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {/* ambient tints — two pools of the house light, drifting */}
            <div aria-hidden className="mega-ambient absolute -inset-[12%]" />
            {/* luminous lower edge */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 4%, rgba(140,255,225,0.28) 50%, transparent 96%)' }}
            />

            <div className="relative mx-auto grid max-w-site grid-cols-4 gap-10 px-6 py-9 md:px-10">
              {COLUMNS.map((col) => {
                // one spotlight, following the pointer: the trigger lights its
                // column on open, and hovering (or tabbing into) any column
                // moves the light there — the top-bar thread slides to match,
                // since column titles and trigger labels are the same strings.
                // Dim stays legible: these are live links, never "disabled".
                const lit = hovered === col.title
                const dim = hovered != null && !lit
                return (
                <div
                  key={col.title}
                  className={`transition-opacity duration-300 ${dim ? 'opacity-60' : 'opacity-100'}`}
                  onMouseEnter={() => setHovered(col.title)}
                  onFocus={() => setHovered(col.title)}
                >
                  <Link
                    href={col.href}
                    onClick={closeNow}
                    className={`font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-fast ${lit ? 'text-mint' : 'text-ink-3 hover:text-mint'}`}
                  >
                    {col.title}
                  </Link>
                  <div className="mt-4 flex flex-col">
                    {col.rows.map((r) => (
                      <Link
                        key={r.href + r.label}
                        href={r.href}
                        onClick={closeNow}
                        className="group -mx-3 rounded-[8px] px-3 py-[7px] transition-colors duration-fast hover:bg-white/[0.045]"
                      >
                        <span className="font-sans text-[14px] text-ink transition-colors duration-fast group-hover:text-mint">
                          {r.label}
                        </span>
                        {r.role && <span className="ml-2 font-sans text-[12.5px] text-ink-3">{r.role}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

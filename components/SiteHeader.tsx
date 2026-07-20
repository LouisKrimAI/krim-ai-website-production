'use client'

/**
 * SiteHeader — sticky glass nav with a full-width mega-panel.
 *
 * Three grouped menus (KrimOS · Domains · Research) share ONE viewport-wide
 * glass panel that drops beneath the banner on hover: deep blur, layered
 * mint/cyan ambient tints drifting almost imperceptibly, a luminous bottom
 * hairline. Each group renders as a rail (eyebrow + serif line + overview
 * links) beside a grid of destination links. Insights / Trust / Company are
 * flat links. Accessible: carets are real buttons with aria-expanded, the
 * panel closes on Escape / outside-click / mouse-leave (short grace), and
 * every link is focusable. Only one group is active at a time.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import KrimLogoAnimated from './KrimLogoAnimated'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

type MenuKey = 'krimos' | 'domains' | 'research'

type PanelLink = { label: string; role: string; href: string }
type PanelDef = {
  eyebrow: string
  line: string
  overview: { label: string; href: string }
  secondary?: { label: string; href: string }
  items: ReadonlyArray<PanelLink>
  cols: 2 | 3
}

// The three panels — every role line traces to its page's own hero copy.
const PANELS: Record<MenuKey, PanelDef> = {
  krimos: {
    eyebrow: 'The product',
    line: 'The operating system for lending.',
    overview: { label: 'Explore KrimOS', href: '/krimos' },
    secondary: { label: 'The architecture', href: '/architecture' },
    items: [
      { label: 'Kendra', role: 'The runtime — validates & learns', href: '/krimos/kendra' },
      { label: 'Kriya', role: 'The vocabulary of actions', href: '/krimos/kriya' },
      { label: 'Karta', role: 'The AI co-workers', href: '/krimos/karta' },
      { label: 'Kupa', role: 'The command center', href: '/krimos/kupa' },
      { label: 'Kula', role: 'For your teams', href: '/krimos/kula' },
      { label: 'Kira & Krimkar', role: 'The customer advisor', href: '/krimos/kira' },
    ],
    cols: 3,
  },
  domains: {
    eyebrow: 'Where it runs',
    line: 'For every institution that lends.',
    overview: { label: 'Start with lending', href: '/lending' },
    items: [
      { label: 'Lending', role: 'The whole loan lifecycle, end to end', href: '/lending' },
      { label: 'Large Enterprise', role: 'Millions of interactions, every one provable', href: '/enterprise' },
      { label: 'Government', role: 'Public service that answers for every action', href: '/government' },
      { label: 'MSME', role: 'Regulation-grade AI, at your scale', href: '/msme' },
    ],
    cols: 2,
  },
  research: {
    eyebrow: 'The work beneath',
    line: 'The thinking under the product.',
    overview: { label: 'Explore the research', href: '/research' },
    items: [
      { label: 'Epistemic AI', role: 'The category we define — AI a regulator can read', href: '/epistemic-ai' },
      { label: 'Kovida', role: 'The world lending model', href: '/research/world-lending-model' },
      { label: 'Safe Agent Harness', role: 'What makes agents deployable', href: '/research/safe-agent-harness' },
    ],
    cols: 3,
  },
}

const GROUPS: ReadonlyArray<{ key: MenuKey; label: string; href: string }> = [
  { key: 'krimos', label: 'KrimOS', href: '/krimos' },
  { key: 'domains', label: 'Domains', href: '/lending' },
  { key: 'research', label: 'Research', href: '/research' },
]

const FLAT = [
  ['Insights', '/insights'],
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const

const DEMO_HREF = '/contact'

const linkCls = 'font-sans text-[14px] text-ink-2 transition-colors duration-fast hover:text-ink'

function Caret({ open }: { open: boolean }) {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-fast ${open ? 'rotate-180' : ''}`}>
      <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SiteHeader({ scrollReveal = false }: { scrollReveal?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false) // mobile sheet
  const [open, setOpen] = useState<MenuKey | null>(null) // desktop mega-panel
  const headerRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduce = useReducedMotion()
  // On the homepage the banner stays hidden over the hero and is revealed once
  // the visitor scrolls past it. Elsewhere (scrollReveal=false) it's always shown.
  const [shown, setShown] = useState(!scrollReveal)

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const openMenu = (key: MenuKey) => { cancelClose(); setOpen(key) }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }
  const closeNow = () => { cancelClose(); setOpen(null) }

  useEffect(() => {
    if (!scrollReveal) return
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollReveal])

  // close the open panel on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      const inHeader = headerRef.current?.contains(t)
      const inPanel = panelRef.current?.contains(t)
      if (!inHeader && !inPanel) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const panel = open ? PANELS[open] : null

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

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {GROUPS.map(({ key, label, href }) => {
            const isOpen = open === key
            return (
              <div key={key} className="flex items-center" onMouseEnter={() => openMenu(key)}>
                <Link href={href} className={`${linkCls} ${isOpen ? 'text-ink' : ''}`} onClick={closeNow}>
                  {label}
                </Link>
                <button
                  type="button"
                  className={`ml-1 flex h-6 w-5 items-center justify-center ${linkCls} ${isOpen ? 'text-ink' : ''}`}
                  aria-label={`${label} menu`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-controls="mega-panel"
                  onClick={() => (isOpen ? closeNow() : openMenu(key))}
                >
                  <Caret open={isOpen} />
                </button>
              </div>
            )
          })}

          {FLAT.map(([label, href]) => (
            <Link key={href} href={href} className={linkCls} onMouseEnter={scheduleClose}>
              {label}
            </Link>
          ))}

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
            <p className="pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">KrimOS</p>
            <Link href="/krimos" onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
              Overview
            </Link>
            {PANELS.krimos.items.map((it) => (
              <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {it.label}
              </Link>
            ))}
            <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Domains</p>
            {PANELS.domains.items.map((it) => (
              <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {it.label}
              </Link>
            ))}
            <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Research</p>
            <Link href="/research" onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
              Overview
            </Link>
            {PANELS.research.items.map((it) => (
              <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                {it.label}
              </Link>
            ))}
            <div className="mt-1">
              <Link href="/architecture" onClick={() => setMenuOpen(false)} className="block py-2.5 font-sans text-[15px] text-ink-2 hover:text-ink">
                Architecture
              </Link>
              {FLAT.map(([label, href]) => (
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

    {/* ---- the mega-panel: one viewport-wide glass sheet under the banner.
            A FIXED SIBLING of the header, not a child — the banner's own
            backdrop-filter makes it a backdrop root, so a child's blur could
            never sample the page behind it. Out here the 28px blur is real.
            AnimatePresence handles open/close; the inner content is keyed by
            group so sliding between triggers crossfades in place instead of
            re-dropping the sheet. ---- */}
    <div id="mega-panel" ref={panelRef} className="pointer-events-none fixed inset-x-0 top-16 z-30 hidden lg:block">
        <AnimatePresence>
          {panel && open && (
            <motion.div
              className="mega-glass pointer-events-auto relative overflow-hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0.15 : 0.32, ease: OUT_SOFT }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {/* ambient tints — two soft pools of the house light, drifting */}
              <div aria-hidden className="mega-ambient absolute -inset-[12%]" />
              {/* luminous bottom hairline — the sheet's lower edge */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 4%, rgba(140,255,225,0.28) 50%, transparent 96%)' }}
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  className="relative mx-auto grid max-w-site grid-cols-[280px_1fr] gap-12 px-6 py-10 md:px-10"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, ease: OUT_SOFT }}
                >
                  {/* rail — what this group IS, plus its overview doors */}
                  <div className="pt-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">{panel.eyebrow}</p>
                    <p className="mt-3.5 font-serif text-[1.3rem] leading-snug text-ink">{panel.line}</p>
                    <div className="mt-6 flex flex-col items-start gap-2.5">
                      <Link
                        href={panel.overview.href}
                        onClick={closeNow}
                        className="group inline-flex items-center gap-2 font-sans text-[13.5px] text-mint/90 transition-colors hover:text-mint"
                      >
                        {panel.overview.label}
                        <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                      </Link>
                      {panel.secondary && (
                        <Link
                          href={panel.secondary.href}
                          onClick={closeNow}
                          className="group inline-flex items-center gap-2 font-sans text-[13.5px] text-ink-3 transition-colors hover:text-ink"
                        >
                          {panel.secondary.label}
                          <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* destinations — name + role, on a hairline-divided field */}
                  <div
                    className={`grid content-start gap-1 border-l border-white/[0.07] pl-10 ${
                      panel.cols === 3 ? 'grid-cols-3' : 'grid-cols-2'
                    }`}
                  >
                    {panel.items.map((it) => (
                      <Link
                        key={it.href + it.label}
                        href={it.href}
                        onClick={closeNow}
                        className="group rounded-[10px] px-4 py-3.5 transition-colors duration-fast hover:bg-white/[0.045]"
                      >
                        <span className="block font-serif text-[1.05rem] leading-tight text-ink transition-colors duration-fast group-hover:text-mint">
                          {it.label}
                        </span>
                        <span className="mt-1.5 block font-sans text-[13px] leading-snug text-ink-3">{it.role}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
    </>
  )
}

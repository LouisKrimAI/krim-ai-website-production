'use client'

/**
 * SiteHeader — the banner as one glass instrument.
 *
 * Every item in the banner speaks through the SAME full-width glass sheet:
 * KrimOS / Domains / Research open link grids beside a rail; Insights opens
 * the three latest pieces from the journal; Trust and Company open compact
 * statement panels. The sheet MORPHS — its height animates between contents
 * as the cursor travels the nav, and a woven mint thread slides along the
 * banner's lower edge tracking the open item. The current section is marked
 * in the bar. Facts in panel copy trace to each page's own hero.
 *
 * Engineering notes: the sheet is a FIXED SIBLING of the header, not a
 * child — the banner's own backdrop-filter makes it a backdrop root, so a
 * child's blur could never sample the page behind it. Accessible: triggers
 * carry aria-haspopup/expanded and open on keyboard focus; Escape and
 * outside-click close; every link is a real focusable Link.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import KrimLogoAnimated from './KrimLogoAnimated'
import { POSTS } from '@/app/insights/_posts'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

type MenuKey = 'krimos' | 'domains' | 'research' | 'insights' | 'trust' | 'company'

type PanelDef = {
  eyebrow: string
  line: string
  doors: ReadonlyArray<{ label: string; href: string }>
  /** destination grid (KrimOS / Domains / Research / Insights) */
  items?: ReadonlyArray<{ label: string; role: string; href: string }>
  cols?: 2 | 3
  /** compact statement panels (Trust / Company) */
  quote?: string
}

const LATEST = POSTS.slice(0, 3)

// One entry per banner item — label, destination, which routes light it up,
// and its sheet. Role lines trace to each page's own hero copy.
const NAV: ReadonlyArray<{ key: MenuKey; label: string; href: string; match: string[]; panel: PanelDef }> = [
  {
    key: 'krimos',
    label: 'KrimOS',
    href: '/krimos',
    match: ['/krimos'],
    panel: {
      eyebrow: 'The product',
      line: 'The operating system for lending.',
      doors: [
        { label: 'Explore KrimOS', href: '/krimos' },
        { label: 'The architecture', href: '/architecture' },
      ],
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
  },
  {
    key: 'domains',
    label: 'Domains',
    href: '/lending',
    match: ['/lending', '/government', '/enterprise', '/msme'],
    panel: {
      eyebrow: 'Where it runs',
      line: 'For every institution that lends.',
      doors: [{ label: 'Start with lending', href: '/lending' }],
      items: [
        { label: 'Lending', role: 'The whole loan lifecycle, end to end', href: '/lending' },
        { label: 'Large Enterprise', role: 'Millions of interactions, every one provable', href: '/enterprise' },
        { label: 'Government', role: 'Public service that answers for every action', href: '/government' },
        { label: 'MSME', role: 'Regulation-grade AI, at your scale', href: '/msme' },
      ],
      cols: 2,
    },
  },
  {
    key: 'research',
    label: 'Research',
    href: '/research',
    match: ['/research', '/epistemic-ai'],
    panel: {
      eyebrow: 'The work beneath',
      line: 'The thinking under the product.',
      doors: [{ label: 'Explore the research', href: '/research' }],
      items: [
        { label: 'Epistemic AI', role: 'The category we define — AI a regulator can read', href: '/epistemic-ai' },
        { label: 'Kovida', role: 'The world lending model', href: '/research/world-lending-model' },
        { label: 'Safe Agent Harness', role: 'What makes agents deployable', href: '/research/safe-agent-harness' },
      ],
      cols: 3,
    },
  },
  {
    key: 'insights',
    label: 'Insights',
    href: '/insights',
    match: ['/insights'],
    panel: {
      eyebrow: 'The journal',
      line: 'Perspectives on AI in banking.',
      doors: [{ label: 'All insights', href: '/insights' }],
      items: LATEST.map((p) => ({
        label: p.title,
        role: `${p.category} · ${p.readingMinutes} min read`,
        href: `/insights/${p.slug}`,
      })),
      cols: 3,
    },
  },
  {
    key: 'trust',
    label: 'Trust',
    href: '/trust',
    match: ['/trust'],
    panel: {
      eyebrow: 'The posture',
      line: 'Security, sovereignty, auditability.',
      doors: [
        { label: 'Explore trust', href: '/trust' },
        { label: 'The architecture', href: '/architecture' },
      ],
      quote: 'Sovereign by construction. Auditable by default.',
    },
  },
  {
    key: 'company',
    label: 'Company',
    href: '/company',
    match: ['/company', '/contact'],
    panel: {
      eyebrow: 'The company',
      line: 'Sovereign superintelligence for safe autonomy.',
      doors: [
        { label: 'About Krim', href: '/company' },
        { label: 'Contact', href: '/contact' },
      ],
      quote: 'We make AI provable enough to run a bank.',
    },
  },
]

const DEMO_HREF = '/contact'

export default function SiteHeader({ scrollReveal = false }: { scrollReveal?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false) // mobile sheet
  const [open, setOpen] = useState<MenuKey | null>(null) // desktop sheet
  const [sheetH, setSheetH] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduce = useReducedMotion()
  const pathname = usePathname()
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

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!headerRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // the sheet morph: measure the active content and animate the sheet to it
  useLayoutEffect(() => {
    if (!open) return
    const el = contentRef.current
    if (!el) return
    const measure = () => setSheetH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  const active = open ? NAV.find((n) => n.key === open) : null
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
          {NAV.map(({ key, label, href, match }) => {
            const isOpen = open === key
            const current = isCurrent(match)
            return (
              <div key={key} className="relative flex h-full items-center" onMouseEnter={() => openMenu(key)}>
                <Link
                  href={href}
                  className={`font-sans text-[14px] transition-colors duration-fast ${
                    isOpen || current ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-controls="mega-panel"
                  onFocus={() => openMenu(key)}
                  onClick={closeNow}
                >
                  {label}
                </Link>
                {/* the woven thread — one mint filament sliding along the
                    banner's lower edge, tracking the open sheet */}
                {isOpen && (
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
                {!isOpen && current && (
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
            {NAV.filter((n) => n.panel.items && n.key !== 'insights').map((n) => (
              <div key={n.key}>
                <p className="pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 first:pt-0">{n.label}</p>
                <Link href={n.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                  Overview
                </Link>
                {n.panel.items!.map((it) => (
                  <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-3 font-sans text-[15px] text-ink-2 hover:text-ink">
                    {it.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-2 border-t border-soft pt-2">
              {[
                ['Insights', '/insights'],
                ['Trust', '/trust'],
                ['Company', '/company'],
                ['Architecture', '/architecture'],
              ].map(([label, href]) => (
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

    {/* ---- the sheet: one viewport-wide pane of glass under the banner,
            shared by every item. A FIXED SIBLING of the header (the banner's
            backdrop-filter is a backdrop root — a child's blur could never
            sample the page). Its height MORPHS between contents; the inner
            content crossfades. ---- */}
    <div id="mega-panel" ref={panelRef} className="pointer-events-none fixed inset-x-0 top-16 z-30 hidden lg:block">
      <AnimatePresence>
        {active && open && (
          <motion.div
            className="mega-glass pointer-events-auto relative overflow-hidden"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: sheetH || 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.38, ease: OUT_SOFT }}
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

            <div ref={contentRef}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  className="relative mx-auto grid max-w-site grid-cols-[280px_1fr] gap-12 px-6 py-9 md:px-10"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18, ease: OUT_SOFT }}
                >
                  {/* rail — what this group IS, and its doors */}
                  <div className="pt-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">{active.panel.eyebrow}</p>
                    <p className="mt-3.5 font-serif text-[1.3rem] leading-snug text-ink">{active.panel.line}</p>
                    <div className="mt-6 flex flex-col items-start gap-2.5">
                      {active.panel.doors.map((d, i) => (
                        <Link
                          key={d.href + d.label}
                          href={d.href}
                          onClick={closeNow}
                          className={`group inline-flex items-center gap-2 font-sans text-[13.5px] transition-colors ${
                            i === 0 ? 'text-mint/90 hover:text-mint' : 'text-ink-3 hover:text-ink'
                          }`}
                        >
                          {d.label}
                          <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* right field — a destination grid, or the compact statement */}
                  {active.panel.items ? (
                    <div
                      className={`grid content-start gap-1 border-l border-white/[0.07] pl-10 ${
                        active.panel.cols === 3 ? 'grid-cols-3' : 'grid-cols-2'
                      }`}
                    >
                      {active.panel.items.map((it) => (
                        <Link
                          key={it.href}
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
                  ) : (
                    <div className="flex items-center border-l border-white/[0.07] pl-10">
                      <div>
                        <span aria-hidden className="block h-[3px] w-12 rounded-full bg-gradient-to-r from-cyan to-mint" />
                        <p className="mt-4 max-w-[30ch] font-serif text-[1.5rem] leading-snug text-ink">{active.panel.quote}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

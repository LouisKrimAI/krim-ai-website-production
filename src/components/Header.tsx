import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { KrimAnimatedLogo } from './KrimLogo'
import { List, X, CaretDown } from '@phosphor-icons/react'

export default function Header(){
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [domainsDropdownOpen, setDomainsDropdownOpen] = useState(false)
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false)
  const domainsDropdownRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Route-aware accent system
  // /homepage-alt preserves the legacy mint visual identity for side-by-side comparison.
  // The rest of the site uses the canonical brand (Mithila ochre on indigo).
  const isAlt = pathname === '/homepage-alt'

  // Class helpers — kept as full strings so Tailwind's content-scan picks them up
  const accentText = isAlt ? 'text-krim-mint' : 'text-krim-ochre'
  const accentBg10 = isAlt ? 'bg-krim-mint/10' : 'bg-krim-ochre/10'
  const accentBorder = isAlt ? 'border-krim-mint/30' : 'border-krim-ochre/30'
  const accentBorder20 = isAlt ? 'border-krim-mint/20' : 'border-krim-ochre/20'
  const accentHoverText = isAlt ? 'hover:text-krim-mint' : 'hover:text-krim-ochre'
  const skipBg = isAlt ? 'focus:bg-krim-mint focus:text-black' : 'focus:bg-krim-ochre focus:text-krim-indigo'

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 100)
    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      const isCurrentlyDesktop = window.innerWidth >= 768
      setIsDesktop(isCurrentlyDesktop)
      if (isCurrentlyDesktop && mobileMenuOpen) setMobileMenuOpen(false)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (domainsDropdownRef.current && !domainsDropdownRef.current.contains(event.target as Node)) {
        setDomainsDropdownOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false)
      }
    }
    if (domainsDropdownOpen || solutionsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [domainsDropdownOpen, solutionsDropdownOpen])

  const link = (to:string,label:string, closeDropdown = false)=>(
    <NavLink
      to={to}
      onClick={() => {
        setMobileMenuOpen(false)
        if (closeDropdown) setSolutionsDropdownOpen(false)
      }}
      className={({isActive})=>clsx(
        'nav-link rounded-md transition-all duration-200 min-h-[48px] flex items-center text-krim-off-white/80',
        accentHoverText,
        isActive ? `nav-link-active ${accentText} ${accentBg10}` : ''
      )}
    >
      {label}
    </NavLink>
  )

  const DomainsDropdown = () => (
    <div className="relative" ref={domainsDropdownRef}>
      <button
        onClick={() => setDomainsDropdownOpen(!domainsDropdownOpen)}
        className={clsx(
          'nav-link rounded-md transition-all duration-200 min-h-[48px] flex items-center gap-1 text-krim-off-white/80',
          accentHoverText,
          domainsDropdownOpen || ['/banking', '/government'].includes(pathname)
            ? `nav-link-active ${accentText} ${accentBg10}` : ''
        )}
        aria-expanded={domainsDropdownOpen}
        aria-haspopup="true"
      >
        Domains
        <CaretDown className={clsx(
          'w-4 h-4 transition-transform duration-200',
          domainsDropdownOpen ? 'rotate-180' : ''
        )} />
      </button>
      {domainsDropdownOpen && (
        <div className={clsx(
          'absolute top-full left-0 mt-1 w-48 bg-krim-indigo/95 backdrop-blur-xl rounded-lg shadow-xl z-50 border',
          accentBorder
        )}>
          <nav className="py-2 flex flex-col">
            {link('/banking','Banking', true)}
            {link('/government','Government', true)}
          </nav>
        </div>
      )}
    </div>
  )

  const SolutionsDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
        className={clsx(
          'nav-link rounded-md transition-all duration-200 min-h-[48px] flex items-center gap-1 text-krim-off-white/80',
          accentHoverText,
          solutionsDropdownOpen || ['/kendra', '/kula', '/karta', '/kriya', '/kupa'].includes(pathname)
            ? `nav-link-active ${accentText} ${accentBg10}` : ''
        )}
        aria-expanded={solutionsDropdownOpen}
        aria-haspopup="true"
      >
        KrimOS
        <CaretDown className={clsx(
          'w-4 h-4 transition-transform duration-200',
          solutionsDropdownOpen ? 'rotate-180' : ''
        )} />
      </button>
      {solutionsDropdownOpen && (
        <div className={clsx(
          'absolute top-full left-0 mt-1 w-48 bg-krim-indigo/95 backdrop-blur-xl rounded-lg shadow-xl z-50 border',
          accentBorder
        )}>
          <nav className="py-2 flex flex-col">
            {link('/kendra','Kendra', true)}
            {link('/kula','Kula', true)}
            {link('/karta','Karta', true)}
            {link('/kupa','Kupa', true)}
            {link('/kriya','Kriya', true)}
          </nav>
        </div>
      )}
    </div>
  )

  // Only hide navbar on homepage hero section
  const isHomePage = pathname === '/'
  const shouldHide = isHomePage && !scrolled

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 backdrop-blur-xl border-b transition-all duration-300 ease-in-out depth-navigation",
        // Header chrome: indigo on the main site, lighter glass on the alt page
        isAlt
          ? "bg-black/40 border-krim-mint/20"
          : "bg-krim-indigo/85 border-krim-ochre/15",
        shouldHide ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      )}
      style={{zIndex: 50}}
    >
      <a
        href="#main-content"
        className={clsx(
          "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold",
          skipBg
        )}
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105 min-h-[48px]">
          <KrimAnimatedLogo size="md" treatment="mint" animated={isAlt} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-end gap-2">
          {link('/safe-superintelligence','Epistemic AI')}
          <DomainsDropdown />
          <SolutionsDropdown />
          {/* Temporary alternative-homepage compare tab */}
          {link('/homepage-alt', isAlt ? 'Main Homepage ↗' : 'Alternative ↗')}
          <Link to="/contact" className="ml-4">
            <button className="btn-primary btn-sm">
              Book Demo
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={clsx(
              "block p-2 text-krim-off-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center",
              accentHoverText
            )}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          id="mobile-menu"
          className={clsx(
            "absolute top-full left-0 right-0 backdrop-blur-xl border-b",
            isAlt ? "bg-black/60 border-krim-mint/20" : "bg-krim-indigo/95 border-krim-ochre/15"
          )}
          style={{zIndex: 'var(--z7-mobile-menu)'}}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {link('/safe-superintelligence','Epistemic AI')}

            <div className="mt-2">
              <div className="text-krim-off-white/60 text-sm font-medium mb-2 px-3">Domains</div>
              {link('/banking','Banking')}
              {link('/government','Government')}
            </div>

            <div className="mt-2">
              <div className="text-krim-off-white/60 text-sm font-medium mb-2 px-3">KrimOS</div>
              {link('/kendra','Kendra')}
              {link('/kula','Kula')}
              {link('/karta','Karta')}
              {link('/kupa','Kupa')}
              {link('/kriya','Kriya')}
            </div>

            <div className="mt-2">
              <div className="text-krim-off-white/60 text-sm font-medium mb-2 px-3">Compare</div>
              {link('/homepage-alt', isAlt ? 'Main Homepage' : 'Alternative Homepage')}
            </div>

            <Link to="/contact" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn-primary btn-sm w-full">Book Demo</button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

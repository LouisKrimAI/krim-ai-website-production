import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { KrimAnimatedLogo } from './KrimLogo'
import { HeroButton } from './Button'
import { CaretRight, List, X, CaretDown } from '@phosphor-icons/react'

export default function Header(){
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Track scroll position to hide/show navbar
  useEffect(() => {
    // Check initial scroll position on mount
    const checkScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    // Set initial state
    checkScroll()

    // Add scroll listener
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  // Track screen size for mobile menu visibility
  useEffect(() => {
    const checkScreenSize = () => {
      const isCurrentlyDesktop = window.innerWidth >= 768
      setIsDesktop(isCurrentlyDesktop)
      
      // Close mobile menu if screen becomes desktop size
      if (isCurrentlyDesktop && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    // Set initial state
    checkScreenSize()

    // Add resize listener
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [mobileMenuOpen])

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false)
      }
    }

    if (solutionsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [solutionsDropdownOpen])

  const link = (to:string,label:string, closeDropdown = false)=>(
    <NavLink
      to={to}
      onClick={() => {
        setMobileMenuOpen(false)
        if (closeDropdown) setSolutionsDropdownOpen(false)
      }}
      className={({isActive})=>clsx(
        'nav-link rounded-md transition-all duration-200 min-h-[48px] flex items-center',
        isActive ? 'nav-link-active text-krim-mint bg-krim-mint/10' : ''
      )}
    >
      {label}
    </NavLink>
  )

  // Solutions dropdown for desktop
  const SolutionsDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
        className={clsx(
          'nav-link rounded-md transition-all duration-200 min-h-[48px] flex items-center gap-1',
          solutionsDropdownOpen || ['/kendra', '/kula', '/karta', '/kriya', '/kupa'].includes(pathname) 
            ? 'nav-link-active text-krim-mint bg-krim-mint/10' : ''
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
        <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-krim-mint/30 rounded-lg shadow-xl z-50">
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
        "fixed top-0 left-0 right-0 glass-medium header-readable backdrop-blur-xl border-b border-krim-mint/20 transition-all duration-300 ease-in-out depth-navigation",
        shouldHide ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      )}
      style={{zIndex: 50}}
    >
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-krim-mint focus:text-black focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105 min-h-[48px]">
          <KrimAnimatedLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-end gap-2">
          {link('/safe-superintelligence','Safe Superintelligence')}
          <SolutionsDropdown />
          <Link to="/contact" className="ml-4">
            <button
              className="btn-primary btn-sm"
            >
              Book Demo
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block p-2 text-white hover:text-krim-mint transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
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
          className="absolute top-full left-0 right-0 glass-medium backdrop-blur-xl border-b border-krim-mint/20"
          style={{zIndex: 'var(--z7-mobile-menu)'}}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {link('/safe-superintelligence','Safe Superintelligence')}
            
            {/* Solutions section in mobile */}
            <div className="mt-2">
              <div className="text-white/60 text-sm font-medium mb-2 px-3">KrimOS</div>
              {link('/kendra','Kendra')}
              {link('/kula','Kula')}
              {link('/karta','Karta')}
              {link('/kupa','Kupa')}
              {link('/kriya','Kriya')}
            </div>
            <Link
              to="/contact"
              className="mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button
                className="btn-primary btn-sm w-full"
              >
                Book Demo
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
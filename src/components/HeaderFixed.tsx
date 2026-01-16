import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { KrimAnimatedLogo } from './KrimLogo'
import { List, X } from '@phosphor-icons/react'

export default function HeaderFixed() {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Determine initial visibility based on page and scroll position
    const isHomePage = pathname === '/'
    const initialScrollY = window.scrollY
    
    if (isHomePage) {
      // On homepage: hide if at top, show if scrolled
      setIsVisible(initialScrollY > 80)
    } else {
      // On other pages: always show
      setIsVisible(true)
    }

    const updateNavbar = () => {
      const currentScrollY = window.scrollY
      const isHomePage = pathname === '/'
      
      if (isHomePage) {
        // Homepage logic: show when scrolled past threshold
        const shouldShow = currentScrollY > 80
        setIsVisible(shouldShow)
      } else {
        // Other pages: always visible
        setIsVisible(true)
      }
      
      // Update scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(currentScrollY / docHeight, 1) : 0
      setScrollProgress(progress)
      
      lastScrollY.current = currentScrollY
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLink = (to: string, label: string) => (
    <NavLink
      to={to}
      onClick={() => setMobileMenuOpen(false)}
      className={({ isActive }) =>
        clsx(
          'nav-link rounded-md transition-all duration-200 min-h-[44px] flex items-center',
          isActive ? 'nav-link-active text-krim-mint bg-krim-mint/10' : ''
        )
      }
    >
      {label}
    </NavLink>
  )

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 glass-medium header-readable backdrop-blur-xl border-b border-krim-mint/20 hover:border-krim-mint/40 transition-all duration-500 ease-out',
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        )}
        style={{ zIndex: 9999 }}
      >
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-krim-mint focus:text-black focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105 min-h-[44px]"
          >
            <KrimAnimatedLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-end gap-2">
            {navLink('/safe-superintelligence', 'Safe Superintelligence')}
            {navLink('/kendra', 'Kendra')}
            {navLink('/kula', 'Kula')}
            {navLink('/karta', 'Karta')}
            {navLink('/kriya', 'Kriya')}
            {navLink('/kupa', 'Kupa')}
            <Link to="/contact" className="ml-4">
              <button className="btn-primary btn-sm">
                Book Demo
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-krim-mint transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 glass-medium backdrop-blur-xl border-b border-krim-mint/20"
            style={{ zIndex: 10000 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navLink('/safe-superintelligence', 'Safe Superintelligence')}
              {navLink('/kendra', 'Kendra')}
              {navLink('/kula', 'Kula')}
              {navLink('/karta', 'Karta')}
              {navLink('/kriya', 'Kriya')}
              {navLink('/kupa', 'Kupa')}
              <Link
                to="/contact"
                className="mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="btn-primary btn-sm w-full">
                  Book Demo
                </button>
              </Link>
            </nav>
          </div>
        )}

        {/* Scroll progress indicator */}
        {isVisible && (
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-krim-mint to-krim-cyan transition-all duration-300"
            style={{
              width: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0.01 ? 1 : 0,
              boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
            }}
          />
        )}
      </header>
      
      {/* Spacer to prevent content jump when header is position:fixed */}
      {/* Only add spacer when header is visible to prevent layout shift */}
      <div style={{ height: isVisible ? '64px' : '0', transition: 'height 0.5s ease-out' }} />
    </>
  )
}
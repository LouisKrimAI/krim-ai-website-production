import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { KrimAnimatedLogo } from './KrimLogo'
import { List, X } from '@phosphor-icons/react'

export default function HeaderWorking() {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 80
      
      // Update scroll state
      setScrolled(scrollY > threshold)
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1))
      }
    }

    // Set initial state
    handleScroll()

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
          'nav-link rounded-md transition-all duration-200 min-h-[44px] flex items-center px-3 py-2',
          isActive ? 'nav-link-active text-krim-mint bg-krim-mint/10' : 'text-white hover:text-krim-mint'
        )
      }
    >
      {label}
    </NavLink>
  )

  // Determine visibility
  const isHomePage = pathname === '/'
  const shouldShow = !isHomePage || scrolled

  return (
    <header
      className={clsx(
        'sticky top-0 w-full glass-medium header-readable backdrop-blur-xl border-b transition-all duration-500',
        'border-krim-mint/20 hover:border-krim-mint/40',
        shouldShow 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none'
      )}
      style={{ 
        zIndex: 9999,
        position: 'sticky',
        top: 0
      }}
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
        >
          {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 glass-medium backdrop-blur-xl border-b border-krim-mint/20"
          style={{ zIndex: 10000 }}
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
      {shouldShow && scrollProgress > 0.01 && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-krim-mint to-krim-cyan transition-all duration-300"
          style={{
            width: `${scrollProgress * 100}%`,
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
          }}
        />
      )}
    </header>
  )
}
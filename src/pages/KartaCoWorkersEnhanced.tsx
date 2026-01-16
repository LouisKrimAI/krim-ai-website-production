import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Shield, 
  Users, 
  Robot, 
  Phone, 
  FileText, 
  CheckCircle, 
  Eye,
  ChartBar,
  Bank,
  CreditCard,
  Gauge,
  Brain,
  Command,
  Stack,
  Database,
  Cube,
  GitBranch,
  Warning,
  Info,
  UserCircle,
  Headset,
  PersonArmsSpread,
  X
} from '@phosphor-icons/react'

// Performance monitoring utility
const measurePerformance = (label: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${label}-start`)
    return () => {
      performance.mark(`${label}-end`)
      performance.measure(label, `${label}-start`, `${label}-end`)
      const measure = performance.getEntriesByName(label)[0]
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${label}: ${measure.duration.toFixed(2)}ms`)
      }
    }
  }
  return () => {}
}

// Enhanced throttle with RAF for smooth 60fps
const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const lastRun = useRef(Date.now())
  const rafId = useRef<number>()

  return useCallback((...args: any[]) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    })
  }, [callback, delay])
}

// Analytics tracking hook
const useAnalytics = () => {
  const track = useCallback((event: string, properties?: Record<string, any>) => {
    // Integration point for analytics (Google Analytics, Segment, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties)
    }
    
    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, properties)
    }
  }, [])

  return { track }
}

interface CoWorkerTile {
  id: string
  label: string
  type: 'contact-center' | 'back-office'
  status: 'active' | 'idle' | 'working'
  description?: string
  metrics?: {
    handled: number
    efficiency: number
  }
}

interface StickyNavItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<any>
}

interface Scenario {
  id: string
  title: string
  icon: React.ComponentType<any>
  contactCenter: string
  backOffice: string
  metrics?: {
    timeReduction: string
    accuracy: string
    volume: string
  }
}

const coWorkerTiles: CoWorkerTile[] = [
  { 
    id: 'sales', 
    label: 'Sales', 
    type: 'contact-center', 
    status: 'active',
    description: 'Handles inbound sales inquiries and lead qualification',
    metrics: { handled: 1250, efficiency: 94 }
  },
  { 
    id: 'retention', 
    label: 'Retention', 
    type: 'contact-center', 
    status: 'working',
    description: 'Manages customer save attempts and win-back campaigns',
    metrics: { handled: 890, efficiency: 87 }
  },
  { 
    id: 'collections', 
    label: 'Collections', 
    type: 'contact-center', 
    status: 'active',
    description: 'Early-stage collections and payment arrangements',
    metrics: { handled: 2100, efficiency: 91 }
  },
  { 
    id: 'service', 
    label: 'Service', 
    type: 'contact-center', 
    status: 'idle',
    description: 'General customer service and FAQ resolution'
  },
  { 
    id: 'ops', 
    label: 'Operations', 
    type: 'back-office', 
    status: 'working',
    description: 'Process automation and workflow management',
    metrics: { handled: 3400, efficiency: 96 }
  },
  { 
    id: 'risk', 
    label: 'Risk', 
    type: 'back-office', 
    status: 'active',
    description: 'Risk assessment and decision automation',
    metrics: { handled: 1800, efficiency: 99 }
  },
  { 
    id: 'compliance', 
    label: 'Compliance', 
    type: 'back-office', 
    status: 'active',
    description: 'Regulatory compliance and audit preparation',
    metrics: { handled: 450, efficiency: 100 }
  },
  { 
    id: 'finance', 
    label: 'Finance', 
    type: 'back-office', 
    status: 'idle',
    description: 'Financial reconciliation and reporting'
  },
  { 
    id: 'legal', 
    label: 'Legal', 
    type: 'back-office', 
    status: 'working',
    description: 'Contract review and legal document processing',
    metrics: { handled: 220, efficiency: 95 }
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    type: 'back-office', 
    status: 'active',
    description: 'Performance reporting and data analysis',
    metrics: { handled: 5600, efficiency: 98 }
  }
]

const navItems: StickyNavItem[] = [
  { id: 'overview', label: 'Overview', href: '#overview', icon: Eye },
  { id: 'contact-center', label: 'Contact Center', href: '#contact-center', icon: Headset },
  { id: 'back-office', label: 'Back Office', href: '#back-office', icon: FileText },
  { id: 'stack', label: 'Stack', href: '#stack', icon: Stack },
  { id: 'safety', label: 'Safety', href: '#safety', icon: Shield },
  { id: 'examples', label: 'Example Teams', href: '#examples', icon: Users },
  { id: 'rollout', label: 'Rollout', href: '#rollout', icon: Gauge }
]

const scenarios: Record<string, Scenario> = {
  'large-auto': {
    id: 'large-auto',
    title: 'Large Auto Lender',
    icon: CreditCard,
    contactCenter: 'Collections and service/complaints co-workers on early-stage arrears and inbound servicing',
    backOffice: 'Dispute and compliance co-workers preparing structured queues and audit-ready cases',
    metrics: {
      timeReduction: '65%',
      accuracy: '99.2%',
      volume: '10K+ daily'
    }
  },
  'regional-bank': {
    id: 'regional-bank',
    title: 'Regional Bank',
    icon: Bank,
    contactCenter: 'Service and retention co-workers handling FAQs, simple changes and save attempts',
    backOffice: 'Operations and analytics co-workers managing callbacks, follow-ups and performance reporting',
    metrics: {
      timeReduction: '55%',
      accuracy: '98.5%',
      volume: '5K+ daily'
    }
  },
  'specialty-finance': {
    id: 'specialty-finance',
    title: 'Specialty Finance / Fintech',
    icon: ChartBar,
    contactCenter: 'Sales and collections co-workers focused on high-velocity origination and early intervention',
    backOffice: 'Risk and operations co-workers handling automated decisioning and portfolio monitoring',
    metrics: {
      timeReduction: '70%',
      accuracy: '99.7%',
      volume: '15K+ daily'
    }
  }
}

const KartaCoWorkersEnhanced: React.FC = () => {
  const navigate = useNavigate()
  const { track } = useAnalytics()
  
  // State management
  const [activeNav, setActiveNav] = useState('overview')
  const [activeScenario, setActiveScenario] = useState<keyof typeof scenarios>('large-auto')
  const [isNavSticky, setIsNavSticky] = useState(false)
  const [selectedTile, setSelectedTile] = useState<CoWorkerTile | null>(null)
  const [showDemoModal, setShowDemoModal] = useState(false)
  
  // Refs for DOM elements
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  
  // Performance-optimized scroll handler
  const handleScroll = useCallback(() => {
    const endMeasure = measurePerformance('scroll-handler')
    
    // Check sticky nav
    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
      const scrollPosition = window.scrollY
      setIsNavSticky(scrollPosition > heroBottom - 100)
    }

    // Update active nav with intersection observer fallback
    const scrollPos = window.scrollY + 200
    let currentSection = 'overview'
    
    sectionRefs.current.forEach((element, id) => {
      if (element && scrollPos >= element.offsetTop) {
        currentSection = id
      }
    })
    
    if (currentSection !== activeNav) {
      setActiveNav(currentSection)
    }
    
    endMeasure()
  }, [activeNav])

  // Throttled scroll handler for 60fps
  const throttledScroll = useThrottle(handleScroll, 16)

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true })
    window.addEventListener('resize', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', throttledScroll)
    }
  }, [throttledScroll])

  // Smooth scroll to section with fallback
  const scrollToSection = useCallback((href: string) => {
    const elementId = href.replace('#', '')
    const element = document.getElementById(elementId)
    
    if (element) {
      const offset = 80 // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      
      // Fallback for browsers without smooth scrolling
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo(0, offsetPosition)
      }
      
      // Update active nav immediately for better UX
      setActiveNav(elementId)
      
      // Track navigation
      track('section_navigation', { section: elementId })
    }
  }, [track])

  // Handle CTA clicks
  const handlePrimaryCTA = useCallback(() => {
    track('cta_click', { button: 'meet_demo', location: 'hero' })
    setShowDemoModal(true)
  }, [track])

  const handleSecondaryCTA = useCallback(() => {
    track('cta_click', { button: 'see_kendra', location: 'hero' })
    navigate('/platform')
  }, [track, navigate])

  // Handle scenario switching
  const handleScenarioChange = useCallback((scenarioId: keyof typeof scenarios) => {
    setActiveScenario(scenarioId)
    track('scenario_selected', { scenario: scenarioId })
  }, [track])

  // Handle tile selection
  const handleTileClick = useCallback((tile: CoWorkerTile) => {
    setSelectedTile(tile)
    track('coworker_tile_click', { 
      tile: tile.id, 
      type: tile.type,
      status: tile.status 
    })
  }, [track])

  // Keyboard navigation handlers
  const handleKeyNavigation = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }, [])

  // Memoized active scenario for performance
  const currentScenario = useMemo(() => scenarios[activeScenario], [activeScenario])

  // Set section refs
  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el)
    }
  }, [])

  return (
    <div className="min-h-screen bg-krim-deep-space text-white overflow-x-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative pt-24 pb-16 px-6"
        aria-label="Hero section"
      >
        {/* Enhanced background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-depth-midnight/80 via-depth-void/60 to-krim-deep-space opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2260%22%20height%3D%2260%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2060%200%20L%200%200%200%2060%22%20fill%3D%22none%22%20stroke%3D%22rgba(6,182,212,0.05)%22%20stroke-width%3D%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-8"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <Cube className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300 uppercase tracking-wider">Product · Karta</span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Karta – AI Co-Workers
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  for Contact Center & Back Office
                </span>
              </h1>

              {/* Subhead */}
              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Karta is a fleet of specialist AI co-workers running on Kendra. They handle high-volume conversations and case work across credit operations, using defined primitives and policies so behaviour stays controlled and auditable.
              </p>

              {/* Bullets */}
              <div className="space-y-4">
                {[
                  'Take on contact-center work across sales, retention, collections, service and complaints',
                  'Prepare and process back-office work for operations, risk, compliance, finance and legal',
                  'Shift repetitive load away from human agents while keeping clear oversight and logs'
                ].map((bullet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="text-text-secondary leading-relaxed">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTAs with proper functionality */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrimaryCTA}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-krim-deep-space"
                  aria-label="Schedule a demo for Karta"
                >
                  <span className="flex items-center gap-2">
                    Meet Karta in a demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSecondaryCTA}
                  className="group px-8 py-4 border border-text-muted hover:border-krim-cyan/50 rounded-xl font-semibold text-text-secondary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-krim-deep-space"
                  aria-label="Learn about Kendra platform"
                >
                  <span className="flex items-center gap-2">
                    See how Karta runs on Kendra
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Enhanced Interactive Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: 0.1, ease: "easeOut" }}
              className="relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Active Co-Worker Fleet</h3>
                    <p className="text-sm text-text-muted">Specialist AI teams across your operations</p>
                  </div>

                  {/* Contact Center Grid - Interactive */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-sm font-medium text-cyan-300">Contact Center</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {coWorkerTiles.filter(tile => tile.type === 'contact-center').map((tile, index) => (
                        <motion.button
                          key={tile.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTileClick(tile)}
                          onKeyDown={(e) => handleKeyNavigation(e, () => handleTileClick(tile))}
                          className="relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-lg p-4 border border-cyan-500/20 group hover:border-cyan-500/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-krim-deep-space text-left"
                          aria-label={`${tile.label} co-worker - ${tile.status}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Robot className="w-5 h-5 text-cyan-400" />
                            <div className={`w-2 h-2 rounded-full ${
                              tile.status === 'active' ? 'bg-success animate-pulse' 
                              : tile.status === 'working' ? 'bg-warning animate-pulse'
                              : 'bg-text-muted'
                            }`} />
                          </div>
                          <div className="text-xs font-medium text-white">{tile.label}</div>
                          {tile.metrics && (
                            <div className="text-xs text-cyan-400/70 mt-1">
                              {tile.metrics.efficiency}% efficient
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Back Office Grid - Interactive */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Back Office</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {coWorkerTiles.filter(tile => tile.type === 'back-office').map((tile, index) => (
                        <motion.button
                          key={tile.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTileClick(tile)}
                          onKeyDown={(e) => handleKeyNavigation(e, () => handleTileClick(tile))}
                          className="relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-3 border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-krim-deep-space text-left"
                          aria-label={`${tile.label} co-worker - ${tile.status}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="w-4 h-4 text-purple-400" />
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              tile.status === 'active' ? 'bg-success animate-pulse' 
                              : tile.status === 'working' ? 'bg-warning animate-pulse'
                              : 'bg-text-muted'
                            }`} />
                          </div>
                          <div className="text-xs font-medium text-white">{tile.label}</div>
                          {tile.metrics && (
                            <div className="text-xs text-purple-400/70 mt-1">
                              {tile.metrics.handled}/day
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Animation - Optimized */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
                      animate={{
                        x: [Math.random() * 300, Math.random() * 300],
                        y: [Math.random() * 200, Math.random() * 200],
                      }}
                      transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        willChange: 'transform'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Sticky Navigation */}
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Page sections navigation"
        className={`${
          isNavSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'
        } bg-depth-midnight/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-xl`}
        initial={false}
        animate={{
          y: isNavSticky ? 0 : 0,
          opacity: 1
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyNavigation(e, () => scrollToSection(item.href))}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeNav === item.id ? 'page' : undefined}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-krim-cyan focus:ring-offset-2 focus:ring-offset-krim-deep-space inline-flex items-center gap-2 ${
                    activeNav === item.id
                      ? 'bg-gradient-to-r from-krim-cyan to-cyan-600 text-white shadow-lg shadow-krim-cyan/25'
                      : 'text-text-muted hover:text-white border border-text-muted hover:border-surface-elevated'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Overview Section - Enhanced */}
      <section
        id="overview"
        ref={setSectionRef('overview')}
        className="py-20 px-6"
        aria-labelledby="overview-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="overview-heading" className="text-3xl font-bold mb-6">
            Specialist Co-Workers, Designed for Credit Ops
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed mb-12">
            Karta is not one big "agent". It's a fleet of co-workers, each with a specific role, scope and set of actions. You can create many co-workers within each domain – for different products, risk bands, regions or workflows – and all of them run inside Kendra using Kriya primitives.
          </p>

          {/* Interactive Scenario Switcher */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6 text-cyan-300">Example Deployments</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.entries(scenarios).map(([id, scenario]) => {
                const Icon = scenario.icon
                return (
                  <button
                    key={id}
                    onClick={() => handleScenarioChange(id as keyof typeof scenarios)}
                    onKeyDown={(e) => handleKeyNavigation(e, () => handleScenarioChange(id as keyof typeof scenarios))}
                    className={`px-6 py-3 rounded-xl border transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-krim-deep-space ${
                      activeScenario === id 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-white' 
                        : 'border-white/10 text-text-muted hover:text-white hover:border-white/30'
                    }`}
                    aria-pressed={activeScenario === id}
                    aria-label={`View ${scenario.title} scenario`}
                  >
                    <Icon className="w-5 h-5" />
                    {scenario.title}
                  </button>
                )
              })}
            </div>

            {/* Scenario Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-3xl mx-auto"
              >
                <h4 className="text-xl font-semibold mb-4">{currentScenario.title}</h4>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Headset className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-300">Contact Center</span>
                    </div>
                    <p className="text-sm text-text-secondary">{currentScenario.contactCenter}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Back Office</span>
                    </div>
                    <p className="text-sm text-text-secondary">{currentScenario.backOffice}</p>
                  </div>
                </div>
                
                {currentScenario.metrics && (
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{currentScenario.metrics.timeReduction}</div>
                      <div className="text-xs text-text-muted mt-1">Time Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{currentScenario.metrics.accuracy}</div>
                      <div className="text-xs text-text-muted mt-1">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{currentScenario.metrics.volume}</div>
                      <div className="text-xs text-text-muted mt-1">Volume</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Placeholder for additional sections */}
      <section id="contact-center" ref={setSectionRef('contact-center')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Center Co-Workers</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      <section id="back-office" ref={setSectionRef('back-office')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Back Office Co-Workers</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      <section id="stack" ref={setSectionRef('stack')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Technology Stack</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      <section id="safety" ref={setSectionRef('safety')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Safety & Compliance</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      <section id="examples" ref={setSectionRef('examples')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Example Teams</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      <section id="rollout" ref={setSectionRef('rollout')} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Rollout Strategy</h2>
          {/* Content to be implemented */}
        </div>
      </section>

      {/* Tile Details Modal */}
      <AnimatePresence>
        {selectedTile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedTile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-depth-midnight to-depth-void rounded-2xl border border-white/10 p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedTile.label} Co-Worker</h3>
                  <p className="text-sm text-text-muted mt-1">
                    {selectedTile.type === 'contact-center' ? 'Contact Center' : 'Back Office'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTile(null)}
                  className="text-text-muted hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-text-secondary mb-4">
                {selectedTile.description || 'Specialized AI co-worker for automated task processing.'}
              </p>
              
              {selectedTile.metrics && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">{selectedTile.metrics.handled}</div>
                    <div className="text-xs text-text-muted">Tasks/Day</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{selectedTile.metrics.efficiency}%</div>
                    <div className="text-xs text-text-muted">Efficiency</div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    track('learn_more_click', { coworker: selectedTile.id })
                    setSelectedTile(null)
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Learn More
                </button>
                <button
                  onClick={() => setSelectedTile(null)}
                  className="flex-1 px-4 py-2 border border-white/20 text-text-secondary hover:text-white rounded-lg font-medium transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-depth-midnight to-depth-void rounded-2xl border border-white/10 p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Schedule a Karta Demo</h3>
              <p className="text-text-secondary mb-6">
                See how Karta's AI co-workers can transform your contact center and back office operations.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    track('demo_modal_cta', { action: 'schedule' })
                    navigate('/contact')
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Schedule Demo
                </button>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 text-text-secondary hover:text-white rounded-lg font-medium transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KartaCoWorkersEnhanced
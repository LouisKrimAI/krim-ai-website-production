import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  Play,
  Download,
  Sparkle,
  Lightning,
  Circle,
  X
} from '@phosphor-icons/react'

interface CoWorkerTile {
  id: string
  label: string
  type: 'contact-center' | 'back-office'
  status: 'active' | 'idle' | 'working'
  description: string
  capabilities: string[]
}

interface StickyNavItem {
  id: string
  label: string
  href: string
}

const coWorkerTiles: CoWorkerTile[] = [
  { 
    id: 'collections', 
    label: 'Collections Team', 
    type: 'contact-center', 
    status: 'active',
    description: '4 specialists: Early Intervention (0-30), Strategic Negotiation (31-90), Settlement Authority (90+), Relationship Recovery',
    capabilities: ['Early Intervention Specialist', 'Strategic Deal Architect', 'Settlement Authority', 'Relationship Recovery Expert']
  },
  { 
    id: 'service', 
    label: 'Service Team', 
    type: 'contact-center', 
    status: 'active',
    description: '3 specialists: Inbound query handling, payment processing, document management',
    capabilities: ['Inbound Query Specialist', 'Payment Processing Expert', 'Document Management', 'Status Update Automation']
  },
  { 
    id: 'sales', 
    label: 'Sales Team', 
    type: 'contact-center', 
    status: 'active',
    description: '3 specialists: Cross-sell/up-sell, onboarding & activation, campaign execution (existing customers only)',
    capabilities: ['Cross-sell/Up-sell Specialist', 'Onboarding & Activation Expert', 'Campaign Execution', 'Eligibility Verification']
  },
  { 
    id: 'retention', 
    label: 'Retention Team', 
    type: 'contact-center', 
    status: 'working',
    description: '3 specialists: At-risk identification, win-back campaigns, save strategy execution',
    capabilities: ['At-Risk Identification', 'Win-back Campaign Expert', 'Save Strategy Execution', 'Customer Recovery Specialist']
  },
  { 
    id: 'risk', 
    label: 'Risk Intelligence', 
    type: 'back-office', 
    status: 'active',
    description: 'Pattern monitoring specialist, risk signal detection expert, case flagging intelligence',
    capabilities: ['Pattern Monitoring Specialist', 'Risk Signal Detection', 'Case Flagging Intelligence', 'Predictive Risk Engine']
  },
  { 
    id: 'operations', 
    label: 'Operations Control', 
    type: 'back-office', 
    status: 'working',
    description: 'Master data flow conductor, case routing intelligence, SLA monitoring specialist',
    capabilities: ['Master Data Flow Conductor', 'Case Routing Intelligence', 'SLA Monitoring Specialist', 'Workflow Orchestration']
  },
  { 
    id: 'document', 
    label: 'Document Processing', 
    type: 'back-office', 
    status: 'active',
    description: 'Notice generation specialist, document parsing expert, regulatory letter management',
    capabilities: ['Notice Generation Specialist', 'Document Parsing Expert', 'Regulatory Letter Management', 'E-signature Processing']
  },
  { 
    id: 'compliance', 
    label: 'Compliance Monitoring', 
    type: 'back-office', 
    status: 'active',
    description: 'Real-time compliance monitor, quality excellence auditor, evidence compilation specialist',
    capabilities: ['Real-time Compliance Monitor', 'Quality Excellence Auditor', 'Evidence Compilation', 'Violation Detection Engine']
  },
  { 
    id: 'cure', 
    label: 'Journey Orchestration', 
    type: 'back-office', 
    status: 'working',
    description: 'Multi-step workflow specialist, delinquency journey coordinator, treatment optimization',
    capabilities: ['Journey Orchestration Specialist', 'Multi-step Workflow Coordinator', 'Treatment Optimization', 'Recovery Path Planning']
  },
  { 
    id: 'analytics', 
    label: 'Intelligence Engine', 
    type: 'back-office', 
    status: 'active',
    description: 'Automated regulatory reporter, predictive intelligence engine, performance analytics specialist',
    capabilities: ['Automated Regulatory Reporter', 'Predictive Intelligence Engine', 'Performance Analytics Specialist', 'Operational Metrics']
  }
]

const navItems: StickyNavItem[] = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'contact-center', label: 'Contact Center', href: '#contact-center' },
  { id: 'back-office', label: 'Back Office', href: '#back-office' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'agent-studio', label: 'Agent Studio', href: '#agent-studio' },
  { id: 'safety', label: 'Safety', href: '#safety' },
  { id: 'examples', label: 'Example Teams', href: '#examples' },
  { id: 'rollout', label: 'Rollout', href: '#rollout' }
]

const scenarios = {
  'large-auto': {
    title: 'Large auto lender',
    contactCenter: 'Collections and service/complaints specialists on early-stage arrears and inbound servicing',
    backOffice: 'Dispute and compliance specialists preparing structured queues and audit-ready cases'
  },
  'regional-bank': {
    title: 'Regional bank',
    contactCenter: 'Service and retention specialists handling FAQs, simple changes and save attempts',
    backOffice: 'Operations and analytics specialists managing callbacks, follow-ups and performance reporting'
  },
  'specialty-finance': {
    title: 'Specialty finance / fintech',
    contactCenter: 'Sales and collections specialists focused on high-velocity origination and early intervention',
    backOffice: 'Risk and operations specialists handling decisioning and portfolio monitoring'
  }
}

const KartaCoWorkers: React.FC = () => {
  const [activeNav, setActiveNav] = useState('overview')
  const [activeScenario, setActiveScenario] = useState('large-auto')
  const [isNavSticky, setIsNavSticky] = useState(false)
  const [selectedCoWorker, setSelectedCoWorker] = useState<CoWorkerTile | null>(null)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Throttled scroll handler for better performance
  const throttle = useCallback((func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout
    let lastExecTime = 0
    return function (this: any, ...args: any[]) {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func.apply(this, args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
      const scrollPosition = window.scrollY
      setIsNavSticky(scrollPosition > heroBottom - 100)
    }

    // Update active nav based on scroll position
    const sections = navItems.map(item => document.getElementById(item.id.replace('#', '')))
    const scrollPos = window.scrollY + 200

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section && scrollPos >= section.offsetTop) {
        setActiveNav(navItems[i].id)
        break
      }
    }
  }, [])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16) // 60fps

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [throttle, handleScroll])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Enhanced button handlers
  const handlePrimaryDemo = () => {
    setShowDemoModal(true)
    // Analytics tracking would go here
    // trackEvent('karta_demo_requested', { source: 'hero_cta' })
  }

  const handleSecondaryKendra = () => {
    navigate('/platform')
    // Analytics tracking would go here
    // trackEvent('krimos_navigation', { source: 'karta_secondary_cta' })
  }

  const handleCoWorkerClick = (coWorker: CoWorkerTile) => {
    setSelectedCoWorker(coWorker)
    // Analytics tracking would go here
    // trackEvent('coworker_detail_viewed', { coworker_type: coWorker.id })
  }

  // Animation presets for consistent timing
  const animationPresets = {
    gentle: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    snappy: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    elastic: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }
  }

  return (
    <div className="min-h-screen bg-krim-deep-space text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] lg:min-h-[90vh] xl:min-h-[95vh] flex items-center pt-32 pb-24 px-6">
        {/* Enhanced background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-depth-midnight/80 via-depth-void/60 to-krim-deep-space opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2260%22%20height%3D%2260%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2060%200%20L%200%200%200%2060%22%20fill%3D%22none%22%20stroke%3D%22rgba(6,182,212,0.05)%22%20stroke-width%3D%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-8 lg:space-y-10"
              style={{ willChange: 'transform' }}
            >

              {/* H1 - Matching HomePage scale exactly */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-black">
                  Karta™ Specialists for 
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-black">
                  Bank Operations
                </span>
              </h1>

              {/* Subhead - More prominent size */}
              <p className="text-2xl md:text-3xl lg:text-4xl text-text-secondary leading-[1.4] max-w-3xl font-light">
                12+ specialist teams that execute your complete banking operations lifecycle. From early intervention to recovery - each specialist handles specific operational roles with built-in compliance.
              </p>

              {/* Bullets - Enhanced with better sizing */}
              <div className="space-y-5 pt-2">
                {[
                  'Specialist Execution Teams',
                  'Compliance-First Design', 
                  'Immediate Deployment'
                ].map((bullet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-cyan-500/20">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-lg lg:text-xl text-text-secondary leading-relaxed font-medium">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTAs - Larger and more impactful */}
              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <motion.button
                  onClick={handlePrimaryDemo}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 rounded-2xl font-semibold text-lg text-white shadow-xl transition-all duration-300 overflow-hidden min-h-[64px]"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3 z-10">
                    <Play className="w-6 h-6" />
                    Schedule Karta Demo
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                </motion.button>
                
                <motion.button
                  onClick={handleSecondaryKendra}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 border-2 border-violet-500/40 hover:border-violet-400/60 rounded-2xl font-semibold text-lg text-violet-300 hover:text-white transition-all duration-300 backdrop-blur-sm bg-violet-500/10 hover:bg-violet-500/15 min-h-[64px]"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Stack className="w-6 h-6" />
                    Explore Kendra Platform
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Karta Grid Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: 0.1, ease: "easeOut" }}
              className="relative lg:pl-8"
              style={{ willChange: 'transform' }}
            >
              <div className="bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-xl rounded-3xl border border-white/15 p-10 shadow-2xl">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Active Specialist Fleet</h3>
                    <p className="text-base text-text-muted">12+ specialist teams organized into execution units</p>
                  </div>

                  {/* Contact Center Grid */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                      <span className="text-base font-semibold text-cyan-300">Contact Center Teams</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {coWorkerTiles.filter(tile => tile.type === 'contact-center').map((tile, index) => (
                        <motion.button
                          key={tile.id}
                          onClick={() => handleCoWorkerClick(tile)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative bg-gradient-to-br from-violet-500/15 to-purple-500/8 rounded-xl p-5 border border-violet-500/30 group hover:border-violet-400/50 transition-all duration-300 text-left overflow-hidden shadow-lg hover:shadow-xl hover:shadow-violet-500/20"
                          style={{ willChange: 'transform' }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center border border-violet-400/40 shadow-inner">
                              <Robot className="w-5 h-5 text-violet-300" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${
                                tile.status === 'active' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/60' 
                                : tile.status === 'working' ? 'bg-amber-400 shadow-lg shadow-amber-400/60'
                                : 'bg-gray-400'
                              } animate-pulse`} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-white group-hover:text-violet-200 transition-colors">
                              {tile.label}
                            </h3>
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Back Office Grid */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                      <span className="text-base font-semibold text-purple-300">Back Office Operations</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {coWorkerTiles.filter(tile => tile.type === 'back-office').map((tile, index) => (
                        <motion.button
                          key={tile.id}
                          onClick={() => handleCoWorkerClick(tile)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative bg-gradient-to-br from-purple-500/15 to-purple-600/8 rounded-xl p-4 border border-purple-500/30 group hover:border-purple-500/50 transition-all duration-300 text-left overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
                          style={{ willChange: 'transform' }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-violet-500/30 flex items-center justify-center border border-purple-400/40 shadow-inner">
                              <FileText className="w-4 h-4 text-purple-300" />
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              tile.status === 'active' ? 'bg-emerald-400 shadow-md shadow-emerald-400/60' 
                              : tile.status === 'working' ? 'bg-amber-400 shadow-md shadow-amber-400/60'
                              : 'bg-gray-400'
                            } animate-pulse`} />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors leading-tight">
                              {tile.label}
                            </h3>
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
                      animate={{
                        x: [Math.random() * 300, Math.random() * 300],
                        y: [Math.random() * 200, Math.random() * 200],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Page sections navigation"
        className={`${
          isNavSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'
        } bg-depth-midnight/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300`}
        initial={false}
        animate={{
          y: isNavSticky ? 0 : 0,
          opacity: 1
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }
                }}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeNav === item.id ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-krim-cyan focus:ring-offset-2 focus:ring-offset-krim-deep-space ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-krim-cyan to-cyan-600 text-white shadow-lg shadow-krim-cyan/25'
                    : 'text-text-muted hover:text-white border border-text-muted hover:border-surface-elevated'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Rest of sections would continue here... */}
      {/* For now, I'll add placeholder sections to complete the basic structure */}
      
      <section
        id="overview"
        className="py-20 px-6"
        aria-labelledby="overview-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="overview-heading" className="text-3xl font-bold mb-6">
            12+ Specialist Teams for Bank Operations
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            Karta deploys specialist teams organized into execution units. Each specialist handles specific operational roles within defined policies and compliance guardrails, executing work from early intervention through recovery while escalating complex situations to human teams.
          </p>
        </div>
      </section>

      {/* Contact Center Section */}
      <section
        id="contact-center"
        className="py-20 px-6"
        aria-labelledby="contact-center-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 id="contact-center-heading" className="text-3xl md:text-4xl font-bold text-white">
                  Customer-Facing Specialist Teams
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Four specialist teams with 13 specialized roles handle customer interactions across sales, retention, collections, and service channels. Each specialist operates within approved policies with automatic escalation procedures.
                </p>
              </div>
            </div>
            
            {/* Right Column - Specialist Team Cards */}
            <div className="space-y-8">
              {[
                {
                  title: 'Collections Specialists',
                  description: 'Early intervention through settlement authority across the delinquency lifecycle',
                  specialists: [
                    { name: 'Early Intervention (0-30 DPD)', role: 'Gentle reminders, behavioral timing optimization' },
                    { name: 'Strategic Negotiation (31-90 DPD)', role: 'Payment plan crafting, deal architecture' },
                    { name: 'Settlement Authority (90+ DPD)', role: 'Escalation handling, late-stage resolution' },
                    { name: 'Relationship Recovery', role: 'Post-payment rebuilding, financial wellness counseling' }
                  ],
                  color: 'emerald'
                },
                {
                  title: 'Service Specialists',
                  description: 'Inbound customer service and account management across all touchpoints',
                  specialists: [
                    { name: 'Inbound Query Handler', role: 'Account inquiries, payment status, general support' },
                    { name: 'Payment Processing Expert', role: 'Payment setup, modification, transaction support' },
                    { name: 'Document Management', role: 'Document requests, file processing, record updates' }
                  ],
                  color: 'cyan'
                },
                {
                  title: 'Sales Specialists',
                  description: 'Customer expansion and campaign execution for existing customer base only',
                  specialists: [
                    { name: 'Cross-sell/Up-sell Expert', role: 'Product recommendations, eligibility verification' },
                    { name: 'Onboarding & Activation', role: 'New product setup, feature activation, adoption' },
                    { name: 'Campaign Execution', role: 'Targeted outreach, offer delivery, conversion tracking' }
                  ],
                  color: 'violet'
                },
                {
                  title: 'Retention Specialists',
                  description: 'Customer lifecycle management and churn prevention strategies',
                  specialists: [
                    { name: 'At-Risk Identification', role: 'Early warning signals, behavioral pattern analysis' },
                    { name: 'Win-back Campaign Expert', role: 'Re-engagement strategies, targeted offers' },
                    { name: 'Save Strategy Execution', role: 'Retention offers, loyalty programs, recovery plans' }
                  ],
                  color: 'amber'
                }
              ].map((team, teamIndex) => (
                <motion.div
                  key={teamIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: teamIndex * 0.1, ...animationPresets.gentle }}
                  className={`bg-gradient-to-br from-${team.color}-500/8 to-${team.color}-600/4 rounded-xl p-6 border border-${team.color}-500/20 hover:border-${team.color}-400/40 transition-all duration-300`}
                >
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${team.color}-500/20 to-${team.color}-600/20 flex items-center justify-center border border-${team.color}-400/30`}>
                        <Users className={`w-5 h-5 text-${team.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{team.title}</h3>
                        </div>
                        <p className="text-sm text-gray-300">{team.description}</p>
                      </div>
                    </div>

                    {/* Specialists Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {team.specialists.map((specialist, specIndex) => (
                        <motion.div
                          key={specIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: teamIndex * 0.1 + specIndex * 0.05, ...animationPresets.gentle }}
                          className={`p-4 bg-${team.color}-500/5 rounded-lg border border-${team.color}-500/10 hover:border-${team.color}-500/20 transition-all duration-200`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${team.color}-400`} />
                              <h4 className="text-sm font-medium text-white">{specialist.name}</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed pl-4">{specialist.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back Office Section */}
      <section
        id="back-office"
        className="py-20 px-6 bg-gradient-to-b from-transparent to-depth-void/30"
        aria-labelledby="back-office-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 id="back-office-heading" className="text-3xl md:text-4xl font-bold text-white">
                  Operational Processing Specialists
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Six operational processing teams with specialized roles handle document processing, risk monitoring, compliance reviews, journey orchestration, and operational reporting across the complete banking lifecycle.
                </p>
              </div>
            </div>
            
            {/* Right Column - Co-Worker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Operations Co-Workers (Karta-Decide)',
                  description: 'Routes cases, manages queues and SLA monitoring',
                  details: 'Route cases to appropriate teams, manage workflow queues, monitor SLA compliance'
                },
                {
                  title: 'Risk Co-Workers (Karta-Risk)',
                  description: 'Monitors patterns, flags risk signals for review', 
                  details: 'Monitor transaction patterns, detect risk signals, flag cases for human review'
                },
                {
                  title: 'Compliance Co-Workers (Karta-Audit)',
                  description: 'Reviews interactions for violations, prepares audit evidence',
                  details: 'Review interactions for policy violations, prepare audit documentation, compile evidence'
                },
                {
                  title: 'Document Co-Workers (Karta-Doc)',
                  description: 'Generates notices, parses documents, manages regulatory letters',
                  details: 'Generate customer notices, parse incoming documents, manage regulatory correspondence'
                },
                {
                  title: 'Cure Co-Workers (Karta-Cure)',
                  description: 'Orchestrates multi-step journeys for delinquent accounts',
                  details: 'Coordinate multi-step collection workflows, manage delinquent account treatments'
                },
                {
                  title: 'Analytics Co-Workers (Karta-Report)',
                  description: 'Generates operational reports and performance data',
                  details: 'Generate operational reports, compile performance metrics, analyze operational trends'
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ...animationPresets.gentle }}
                  className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-white">{card.title}</h3>
                    <p className="text-xs text-gray-300">{card.description}</p>
                    <p className="text-xs text-gray-400">{card.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section
        id="stack"
        className="py-20 px-6"
        aria-labelledby="stack-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Diagram */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={animationPresets.gentle}
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white text-center mb-6">Technology Stack</h3>
                  
                  {/* Flow Diagram */}
                  <div className="flex items-center justify-between">
                    {['Agent Studio', 'Kendra Runtime', 'Kriya Primitives', 'Karta Co-Workers'].map((stage, i) => (
                      <React.Fragment key={i}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2, ...animationPresets.gentle }}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 max-w-[120px] text-center"
                        >
                          <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg p-4 border border-violet-500/30 mb-2">
                            <div className="text-xs text-violet-400 font-medium">{stage}</div>
                          </div>
                        </motion.div>
                        {i < 3 && (
                          <ArrowRight className="w-4 h-4 text-violet-400/50 mx-2" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Labels */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="text-violet-400 font-medium">Design</div>
                      <div className="text-gray-400">Agent Studio designs specialists by choosing roles, workflows, and escalation rules</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-purple-400 font-medium">Execute</div>
                      <div className="text-gray-400">Kendra orchestrates events and routes to appropriate specialists or humans</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 id="stack-heading" className="text-3xl md:text-4xl font-bold text-white">
                  Technology Architecture
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Karta specialists operate within a structured platform that manages workflows, defines actions, and provides design tools for configuration and deployment.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Kendra orchestrates',
                    description: 'Routes events, calls and cases to appropriate specialists, human teams, or systems based on defined rules.'
                  },
                  {
                    title: 'Kriya defines actions',
                    description: 'Co-workers execute defined functions that specify allowed data access, communication channels, and operational rules.'
                  },
                  {
                    title: 'Agent Studio configures specialists',
                    description: 'Configure roles, workflows, actions, escalation rules and communication channels for deployment.'
                  },
                  {
                    title: 'Kupa provides monitoring', 
                    description: 'Monitoring dashboards show co-worker activities, performance metrics, and escalation patterns for operational oversight.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, ...animationPresets.gentle }}
                    className="flex items-start gap-4 p-4 bg-violet-500/5 rounded-lg border border-violet-500/10"
                  >
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-gray-300">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Studio Section */}
      <section
        id="agent-studio"
        className="py-20 px-6"
        aria-labelledby="agent-studio-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 id="agent-studio-heading" className="text-3xl md:text-4xl font-bold text-white">
                  Karta Agent Studio
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Configure and deploy your specialist workforce. Design agent roles, set workflows, define escalation rules, and manage your complete specialist team.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Design Specialist Roles',
                    description: 'Configure each specialist\'s responsibilities, data access, and operational boundaries'
                  },
                  {
                    title: 'Set Workflow Rules',
                    description: 'Define how specialists collaborate, hand off cases, and escalate to human teams'
                  },
                  {
                    title: 'Deploy with Governance',
                    description: 'Test in sandbox, validate compliance, and deploy specialists with full audit trails'
                  },
                  {
                    title: 'Monitor & Optimize',
                    description: 'Real-time performance monitoring, specialist load balancing, and continuous improvement'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, ...animationPresets.gentle }}
                    className="flex items-start gap-4 p-4 bg-violet-500/5 rounded-lg border border-violet-500/10"
                  >
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-gray-300">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Configuration Flow */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={animationPresets.gentle}
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white text-center mb-6">Specialist Configuration Flow</h3>
                  
                  {/* Flow Diagram */}
                  <div className="flex items-center justify-between">
                    {['Design', 'Configure', 'Deploy', 'Monitor'].map((stage, i) => (
                      <React.Fragment key={i}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2, ...animationPresets.gentle }}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 max-w-[120px] text-center"
                        >
                          <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg p-4 border border-violet-500/30 mb-2">
                            <div className="text-xs text-violet-400 font-medium">{stage}</div>
                          </div>
                        </motion.div>
                        {i < 3 && (
                          <ArrowRight className="w-4 h-4 text-violet-400/50 mx-2" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Labels */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="text-violet-400 font-medium">Configure Teams</div>
                      <div className="text-gray-400">Set up specialist roles, capabilities, and team structures for your operation</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-purple-400 font-medium">Deploy & Scale</div>
                      <div className="text-gray-400">Launch specialists in phases, monitor performance, and scale your workforce</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section
        id="safety"
        className="py-20 px-6 bg-gradient-to-b from-depth-void/30 to-transparent"
        aria-labelledby="safety-heading"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <h2 id="safety-heading" className="text-3xl md:text-4xl font-bold text-white">
                Policy-Compliant Operations
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed max-w-4xl mx-auto">
                Karta operates within defined policies and compliance frameworks. All actions are governed by established rules, with clear escalation procedures to human teams.
              </p>
            </div>

            {/* Central Shield Visual */}
            <div className="relative max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={animationPresets.gentle}
                className="relative"
              >
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-full flex items-center justify-center border-4 border-emerald-500/30">
                  <Shield className="w-24 h-24 text-emerald-400" />
                </div>
                
                {/* Concentric rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/20"
                    style={{
                      width: `${100 + ring * 30}%`,
                      height: `${100 + ring * 30}%`,
                      left: `${-ring * 15}%`,
                      top: `${-ring * 15}%`
                    }}
                    animate={{
                      rotate: ring % 2 === 0 ? 360 : -360,
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      rotate: { duration: 20 + ring * 10, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Policy-governed actions',
                  description: 'All actions follow defined policies and rules that can be reviewed and modified by your team.'
                },
                {
                  title: 'Approved data sources',
                  description: 'Co-workers access only authorized data from your systems of record and defined inputs.'
                },
                {
                  title: 'Role-based access',
                  description: 'Each co-worker accesses only the data required for its specific role and functions.'
                },
                {
                  title: 'Validation controls',
                  description: 'Outbound communications are validated before sending; complex cases escalate to human agents.'
                },
                {
                  title: 'Structured escalations',
                  description: 'Cases escalate to human agents with complete context and recommended next steps.'
                },
                {
                  title: 'Complete audit trail',
                  description: 'All decisions, actions, and escalations are logged for compliance and review purposes.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ...animationPresets.gentle }}
                  className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 rounded-xl p-6 border border-emerald-500/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section
        id="examples"
        className="py-20 px-6"
        aria-labelledby="examples-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <h2 id="examples-heading" className="text-3xl md:text-4xl font-bold text-white">
                Implementation Examples
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed max-w-4xl mx-auto">
                Typical deployment configurations for different types of banking operations teams.
              </p>
            </div>

            {/* Scenario Switcher */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Scenario Tabs */}
              <div className="space-y-3">
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <motion.button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      activeScenario === key
                        ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/30 text-white'
                        : 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${activeScenario === key ? 'bg-orange-400' : 'bg-gray-500'}`} />
                      <span className="font-semibold">{scenario.title}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Scenario Content */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScenario}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={animationPresets.snappy}
                    className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-xl p-8 border border-orange-500/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">{scenarios[activeScenario as keyof typeof scenarios].title}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-400">Contact Center</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {scenarios[activeScenario as keyof typeof scenarios].contactCenter}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-amber-400">Back Office</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {scenarios[activeScenario as keyof typeof scenarios].backOffice}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rollout Section */}
      <section
        id="rollout"
        className="py-20 px-6 bg-gradient-to-b from-transparent to-depth-void/30"
        aria-labelledby="rollout-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <h2 id="rollout-heading" className="text-3xl md:text-4xl font-bold text-white">
                Implementation Phases
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed max-w-4xl mx-auto">
                Phased deployment approach starting with specific workflows and expanding operational coverage over time.
              </p>
            </div>

            {/* Implementation Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  phase: 'Phase 1',
                  title: 'Pilot & Learn',
                  description: 'Start with 1-2 specialists in controlled environments',
                  timeline: '4-6 weeks',
                  color: 'emerald'
                },
                {
                  phase: 'Phase 2',
                  title: 'Expand Coverage',
                  description: 'Add specialists for related workflows and channels',
                  timeline: '6-8 weeks', 
                  color: 'cyan'
                },
                {
                  phase: 'Phase 3',
                  title: 'Optimize & Scale',
                  description: 'Fine-tune performance and deploy across segments',
                  timeline: '8-12 weeks',
                  color: 'violet'
                },
                {
                  phase: 'Phase 4',
                  title: 'Full Operations',
                  description: 'Complete co-worker fleet handling majority of volume',
                  timeline: 'Ongoing',
                  color: 'orange'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, ...animationPresets.gentle }}
                  className={`relative bg-gradient-to-br from-${step.color}-500/10 to-${step.color}-600/5 rounded-xl p-6 border border-${step.color}-500/20`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{step.timeline}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Connection line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="text-center pt-8">
              <motion.button
                onClick={handlePrimaryDemo}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 z-10">
                  <Play className="w-5 h-5" />
                  Start Your Karta Implementation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={animationPresets.gentle}
              className="bg-gradient-to-br from-krim-deep-space via-depth-midnight to-depth-void rounded-2xl border border-violet-500/20 p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-violet-400/30">
                  <Play className="w-8 h-8 text-violet-400" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Schedule Your Karta Demo</h3>
                  <p className="text-gray-400">
                    See how Karta specialists can transform your bank operations
                  </p>
                </div>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowDemoModal(false)
                      navigate('/contact')
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  >
                    Book Demo Call
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 border border-violet-500/30 rounded-xl font-semibold text-violet-300 hover:text-white hover:border-violet-400/50 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Case Study
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Co-Worker Detail Modal */}
      <AnimatePresence>
        {selectedCoWorker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCoWorker(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={animationPresets.gentle}
              className="bg-gradient-to-br from-krim-deep-space via-depth-midnight to-depth-void rounded-2xl border border-violet-500/20 p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCoWorker(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-400/30">
                    {selectedCoWorker.type === 'contact-center' ? 
                      <Robot className="w-8 h-8 text-violet-400" /> : 
                      <FileText className="w-8 h-8 text-purple-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{selectedCoWorker.label} Co-Worker</h3>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedCoWorker.status === 'active' ? 'bg-emerald-400' 
                        : selectedCoWorker.status === 'working' ? 'bg-amber-400'
                        : 'bg-gray-400'
                      } animate-pulse`} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">What this co-worker does</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedCoWorker.description}</p>
                </div>


                {/* Capabilities */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Core Capabilities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCoWorker.capabilities.map((capability, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-violet-500/10"
                      >
                        <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{capability}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCoWorker(null)
                      setShowDemoModal(true)
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  >
                    Schedule Demo to See {selectedCoWorker.label} in Action
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KartaCoWorkers
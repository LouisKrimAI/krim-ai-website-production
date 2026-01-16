import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight,
  Phone,
  FileText,
  ChartBar,
  Shield,
  Headset,
  UserCircle,
  CurrencyDollar,
  Users,
  Warning,
  Scales,
  Files,
  ChartLine,
  Gear,
  HandHeart,
  CheckCircle,
  Lightning,
  Circle,
  PaintBrush,
  Code,
  Brain,
  ArrowsClockwise
} from '@phosphor-icons/react'
import { fadeUp, viewportOnce, getMotionVariant, reduced } from '../utils/motionPresets'
import { useReducedMotion } from '../hooks/useReducedMotion'
import HighlightText from '../components/atoms/HighlightText'
import { getSectionHighlights } from '../utils/highlights'

// Contact Center Specialist Teams - organized by execution teams with specialist sub-types
const contactCenterAgents = [
  {
    id: 'collections',
    name: 'Collections Specialists',
    icon: CurrencyDollar,
    description: '4 specialists: Early Intervention (0-30), Strategic Negotiation (31-90), Settlement Authority (90+), Relationship Recovery',
    capabilities: ['Early Intervention Specialist', 'Strategic Deal Architect', 'Settlement Authority', 'Relationship Recovery Expert'],
    specialists: [
      { name: 'Early Intervention (0-30 DPD)', role: 'Gentle reminders, behavioral timing optimization' },
      { name: 'Strategic Negotiation (31-90 DPD)', role: 'Payment plan crafting, deal architecture' },
      { name: 'Settlement Authority (90+ DPD)', role: 'Escalation handling, late-stage resolution' },
      { name: 'Relationship Recovery', role: 'Post-payment rebuilding, financial wellness counseling' }
    ]
  },
  {
    id: 'service',
    name: 'Service Specialists',
    icon: Headset,
    description: '3 specialists: Inbound query handling, payment processing, document management',
    capabilities: ['Inbound Query Specialist', 'Payment Processing Expert', 'Document Management', 'Status Update Automation'],
    specialists: [
      { name: 'Inbound Query Handler', role: 'Account inquiries, payment status, general support' },
      { name: 'Payment Processing Expert', role: 'Payment setup, modification, transaction support' },
      { name: 'Document Management', role: 'Document requests, file processing, record updates' }
    ]
  },
  {
    id: 'sales',
    name: 'Sales Specialists',
    icon: UserCircle,
    description: '3 specialists: Cross-sell/up-sell, onboarding & activation, campaign execution (existing customers only)',
    capabilities: ['Cross-sell/Up-sell Specialist', 'Onboarding & Activation Expert', 'Campaign Execution', 'Eligibility Verification'],
    specialists: [
      { name: 'Cross-sell/Up-sell Expert', role: 'Product recommendations, eligibility verification' },
      { name: 'Onboarding & Activation', role: 'New product setup, feature activation, adoption' },
      { name: 'Campaign Execution', role: 'Targeted outreach, offer delivery, conversion tracking' }
    ]
  },
  {
    id: 'retention',
    name: 'Retention Specialists',
    icon: HandHeart,
    description: '3 specialists: At-risk identification, win-back campaigns, save strategy execution',
    capabilities: ['At-Risk Identification', 'Win-back Campaign Expert', 'Save Strategy Execution', 'Customer Recovery Specialist'],
    specialists: [
      { name: 'At-Risk Identification', role: 'Early warning signals, behavioral pattern analysis' },
      { name: 'Win-back Campaign Expert', role: 'Re-engagement strategies, targeted offers' },
      { name: 'Save Strategy Execution', role: 'Retention offers, loyalty programs, recovery plans' }
    ]
  }
]

// Back Office Specialist Teams - operational processing specialists
const backOfficeAgents = [
  {
    id: 'risk',
    name: 'Risk Intelligence',
    icon: Warning,
    description: 'Pattern monitoring specialist, risk signal detection expert, case flagging intelligence',
    capabilities: ['Pattern Monitoring Specialist', 'Risk Signal Detection', 'Case Flagging Intelligence', 'Predictive Risk Engine']
  },
  {
    id: 'operations',
    name: 'Operations Control',
    icon: Gear,
    description: 'Master data flow conductor, case routing intelligence, SLA monitoring specialist',
    capabilities: ['Master Data Flow Conductor', 'Case Routing Intelligence', 'SLA Monitoring Specialist', 'Workflow Orchestration']
  },
  {
    id: 'document',
    name: 'Document Processing',
    icon: Files,
    description: 'Notice generation specialist, document parsing expert, regulatory letter management',
    capabilities: ['Notice Generation Specialist', 'Document Parsing Expert', 'Regulatory Letter Management', 'E-signature Processing']
  },
  {
    id: 'compliance',
    name: 'Compliance Monitoring',
    icon: Scales,
    description: 'Real-time compliance monitor, quality excellence auditor, evidence compilation specialist',
    capabilities: ['Real-time Compliance Monitor', 'Quality Excellence Auditor', 'Evidence Compilation', 'Violation Detection Engine']
  },
  {
    id: 'cure',
    name: 'Journey Orchestration',
    icon: CheckCircle,
    description: 'Multi-step workflow specialist, delinquency journey coordinator, treatment optimization',
    capabilities: ['Journey Orchestration Specialist', 'Multi-step Workflow Coordinator', 'Treatment Optimization', 'Recovery Path Planning']
  },
  {
    id: 'analytics',
    name: 'Intelligence Engine',
    icon: ChartLine,
    description: 'Automated regulatory reporter, predictive intelligence engine, performance analytics specialist',
    capabilities: ['Automated Regulatory Reporter', 'Predictive Intelligence Engine', 'Performance Analytics Specialist', 'Operational Metrics']
  }
]

const navItems = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'agents', label: 'Specialist Teams', href: '#agents' },
  { id: 'agent-studio', label: 'Agent Studio', href: '#agent-studio' },
  { id: 'platform', label: 'Platform', href: '#platform' },
  { id: 'roi', label: 'ROI', href: '#roi' },
  { id: 'deployment', label: 'Deployment', href: '#deployment' }
]

// Glass panel component matching Kula style
const GlassPanel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative rounded-[var(--krim-radius-xl)] bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] ${className}`}>
    {/* Corner accent dots */}
    <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
    <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />
    <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
    <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />
    {children}
  </div>
)

// Enhanced Agent card component with progressive disclosure
const AgentCard: React.FC<{ 
  agent: typeof contactCenterAgents[0]
  isExpanded?: boolean
  onToggle?: () => void
}> = ({ agent, isExpanded = false, onToggle }) => {
  const Icon = agent.icon
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      layout
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      className="group cursor-pointer"
      onClick={onToggle}
    >
      <GlassPanel className={`${isExpanded ? 'h-auto' : 'h-[240px]'} p-6 hover:bg-white/[0.04] transition-all duration-300 border hover:border-white/20`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-krim-mint/10 flex items-center justify-center border border-krim-mint/20 shrink-0 group-hover:bg-krim-mint/20 transition-colors">
            <Icon className="w-7 h-7 text-krim-mint/70" />
          </div>
          <div className="flex-1">
            <h4 className="text-white/90 font-semibold text-lg mb-1">{agent.name}</h4>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400/80" />
              <span className="text-xs text-white/50">Active</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10"
          >
            <ArrowRight className="w-3 h-3 text-white/50" />
          </motion.div>
        </div>
        
        <p className="text-white/60 text-sm leading-relaxed mb-4">{agent.description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="border-t border-white/10 pt-4"
            >
              <div className="space-y-4">
                {/* Specialists breakdown */}
                {(agent as any).specialists && (
                  <div>
                    <div className="text-xs text-white/40 mb-3">Specialist Team:</div>
                    <div className="space-y-2">
                      {(agent as any).specialists.map((specialist: any, index: number) => (
                        <div key={index} className="p-3 bg-white/[0.02] rounded-lg border border-white/5">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-krim-mint/60 mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <h5 className="text-xs font-medium text-white/80 mb-1">{specialist.name}</h5>
                              <p className="text-[10px] text-white/50 leading-relaxed">{specialist.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Core capabilities */}
                <div className="pt-2">
                  <div className="text-xs text-white/40 mb-2">Core Capabilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map(capability => (
                      <span key={capability} className="px-2 py-1 text-[10px] rounded-full bg-white/5 text-white/60 border border-white/10">
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  )
}

// Status indicator component
const StatusIndicator: React.FC<{ label: string; status: 'active' | 'idle' | 'processing' }> = ({ label, status }) => {
  const statusColors = {
    active: 'bg-krim-mint/70',
    idle: 'bg-white/20',
    processing: 'bg-krim-cyan/70'
  }
  
  return (
    <div className="flex items-center gap-2">
      <motion.div 
        className={`w-2 h-2 rounded-full ${statusColors[status]}`}
      />
      <span className="text-white/60 text-xs">{label}</span>
    </div>
  )
}

const KartaClean: React.FC = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const motionVariant = getMotionVariant(prefersReducedMotion)
  
  const [activeNav, setActiveNav] = useState('overview')
  const [isNavSticky, setIsNavSticky] = useState(false)
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set())
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Scroll handling
  const handleScroll = useCallback(() => {
    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
      const scrollPosition = window.scrollY
      setIsNavSticky(scrollPosition > heroBottom - 100)
    }

    // Update active nav
    const scrollPos = window.scrollY + 200
    let currentSection = 'overview'
    
    sectionRefs.current.forEach((element, id) => {
      if (element && scrollPos >= element.offsetTop) {
        currentSection = id
      }
    })
    
    setActiveNav(currentSection)
  }, [])

  useEffect(() => {
    const throttledScroll = () => requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.offsetTop - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleAgentExpansion = (agentId: string) => {
    setExpandedAgents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(agentId)) {
        newSet.delete(agentId)
      } else {
        newSet.add(agentId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-krim-deep-space">
      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
      </div>

      {/* Hero Section - Clean, executive-focused */}
      <section ref={heroRef} id="overview" className="relative pt-32 pb-24 px-6 md:px-8 lg:px-12">
        <div 
          ref={(el) => {
            if (el) sectionRefs.current.set('overview', el)
          }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
          >
            {/* Trust indicator */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-krim-mint" />
                <span className="text-sm text-white/80">Trusted by leading financial institutions</span>
              </div>
            </div>

            <h1 className="text-[clamp(48px,5vw,72px)] font-bold tracking-tight text-white/95 mb-6">
              Karta™ AI Co-Workers for<br />
              Credit Operations
            </h1>
            
            <p className="text-[clamp(18px,2vw,24px)] leading-relaxed text-white/70 mb-8 max-w-4xl mx-auto">
              12+ specialist AI agents that execute your complete credit operations lifecycle
            </p>
            
            <div className="mb-8 max-w-3xl mx-auto">
              <p className="text-[clamp(16px,1.8vw,20px)] leading-relaxed text-white/60 mb-6">
                From early intervention to recovery - each specialist handles specific operational roles with built-in compliance. Organized into execution teams that work together across sales, service, collections, retention, risk monitoring, and operational processing.
              </p>
            </div>

            {/* Authentic Trust Signals */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-krim-mint" />
                <span className="text-sm text-white/80">Handling live operations across multiple financial institutions</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                <span className="text-sm text-white/80">100% TCPA/Reg F compliant with full audit trails</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-krim-mint" />
                <span className="text-sm text-white/80">3-week pilot to production deployment</span>
              </div>
            </div>

            {/* Single primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-krim-mint text-krim-deep-space font-semibold rounded-full hover:bg-krim-cyan transition-colors duration-300 text-lg"
              >
                Schedule Executive Briefing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => navigate('/platform')}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/90 font-medium rounded-full hover:bg-white/5 transition-colors duration-300"
              >
                View 5-Minute Platform Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isNavSticky
            ? 'bg-krim-deep-space/95 backdrop-blur-lg border-b border-white/5 shadow-lg'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-8 py-4 overflow-x-auto scrollbar-hide">
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeNav === item.id
                    ? 'text-krim-mint'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Agents Section */}
      <section 
        id="agents" 
        className="py-24 px-6 md:px-8 lg:px-12"
        ref={(el) => {
          if (el) sectionRefs.current.set('agents', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(36px,4vw,48px)] font-bold tracking-tight text-white/95 mb-4">
              Front-Office Automation
            </h2>
            <p className="text-[clamp(16px,1.8vw,20px)] leading-relaxed text-white/70 max-w-2xl mx-auto">
              Voice & digital specialists. TCPA-native. Human handoff ready.
            </p>
          </motion.div>

          {/* Enhanced agent grid - Contact Center with Progressive Disclosure */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {contactCenterAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={motionVariant}
                transition={{ delay: index * 0.1 }}
              >
                <AgentCard 
                  agent={agent}
                  isExpanded={expandedAgents.has(agent.id)}
                  onToggle={() => toggleAgentExpansion(agent.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Back Office Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(36px,4vw,48px)] font-bold tracking-tight text-white/95 mb-4">
              Back-Office Intelligence
            </h2>
            <p className="text-[clamp(16px,1.8vw,20px)] leading-relaxed text-white/70 max-w-2xl mx-auto">
              Document processing. Risk assessment. Zero manual touches.
            </p>
          </motion.div>

          {/* Clean agent grid - Back Office */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {backOfficeAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={motionVariant}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel className="h-[220px] p-5 hover:bg-white/[0.04] transition-colors duration-300">
                  {/* Agent icon and name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-krim-cyan/10 flex items-center justify-center border border-krim-cyan/20 shrink-0">
                      <agent.icon className="w-6 h-6 text-krim-cyan/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white/90 font-semibold text-base mb-1">{agent.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400/80" />
                        <span className="text-xs text-white/50">Processing</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{agent.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-white/40">Automated</span>
                    <span className="text-xs text-krim-cyan/60">ML-Powered</span>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>

          {/* Compliance bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="flex items-center justify-center gap-8 p-6 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-krim-mint" />
              <span className="text-white/80 font-medium">TCPA: 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-krim-mint" />
              <span className="text-white/80 font-medium">Reg F: 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Scales className="w-5 h-5 text-krim-mint" />
              <span className="text-white/80 font-medium">FCRA: 100%</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Coordination Showcase */}
      <section className="relative py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,255,185,0.03)_0%,transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(36px,4vw,48px)] font-bold tracking-tight text-white/95 mb-4">
              Agents That Actually Coordinate
            </h2>
            <p className="text-[clamp(16px,1.8vw,20px)] leading-relaxed text-white/70 max-w-3xl mx-auto">
              Real-time handoffs between specialized agents. No data silos. No workflow breaks.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Coordination Flow Example 1 */}
            <GlassPanel className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-krim-mint/20 flex items-center justify-center">
                  <span className="text-krim-mint font-bold text-sm">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Inbound Call → Document Request</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-white/80">Collections Agent takes call</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-white/80">Triggers Document Agent for hardship proof</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-white/80">Risk Agent validates income automatically</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-white/80">Collections Agent receives approval in real-time</span>
                </div>
              </div>
            </GlassPanel>

            {/* Coordination Flow Example 2 */}
            <GlassPanel className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-krim-cyan/20 flex items-center justify-center">
                  <span className="text-krim-cyan font-bold text-sm">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Digital Touch → Compliance Check</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span className="text-white/80">Service Agent processes payment plan</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-orange-400" />
                  <span className="text-white/80">Compliance Agent runs real-time TCPA check</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-white/80">Analytics Agent logs interaction patterns</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-white/80">Service Agent confirms plan within guidelines</span>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10">
              <ArrowsClockwise className="w-5 h-5 text-krim-mint" />
              <span className="text-white/80 font-medium">Multi-agent workflows complete in under 2 seconds</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Studio Section */}
      <section 
        id="agent-studio" 
        className="py-24 px-6 md:px-8 lg:px-12 bg-gradient-to-br from-white/[0.02] to-transparent"
        ref={(el) => {
          if (el) sectionRefs.current.set('agent-studio', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(28px,3.2vw,36px)] font-semibold tracking-tight text-white/95 mb-4">
              Agent Studio
            </h2>
            <p className="text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/70 max-w-4xl mx-auto mb-8">
              Design custom co-workers for your unique workflows. Drag-and-drop interface for building 
              specialized agents using Kriya primitives with enterprise compliance built-in.
            </p>
            
            {/* Studio status ticker */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-krim-mint" />
                <span className="text-white/60">47 custom agents deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                <span className="text-white/60">270+ primitives available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-krim-mint/70" />
                <span className="text-white/60">Live design collaboration</span>
              </div>
            </div>
          </motion.div>

          {/* Main Studio Interface Mockup */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="mb-16"
          >
            <GlassPanel className="h-[500px] p-8 relative overflow-hidden">
              {/* Studio header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-krim-mint/20 flex items-center justify-center">
                    <PaintBrush className="w-4 h-4 text-krim-mint" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm">Custom Collections Agent</h4>
                    <p className="text-white/50 text-xs">Draft • Last edited 2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-krim-mint/10 px-3 py-1.5 rounded-full text-xs text-krim-mint border border-krim-mint/20">
                    Testing Mode
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-krim-mint" />
                    <span className="text-xs text-white/60">Auto-save active</span>
                  </div>
                </div>
              </div>

              {/* Design Canvas */}
              <div className="grid grid-cols-4 gap-6 h-full">
                {/* Left: Primitive Library */}
                <div className="col-span-1">
                  <div className="bg-white/[0.02] rounded-lg p-4 h-full border border-white/5">
                    <h5 className="text-white/80 text-sm font-medium mb-4">Primitive Library</h5>
                    <div className="space-y-3">
                      <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 cursor-pointer hover:bg-white/[0.06] transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-3 h-3 text-krim-mint/70" />
                          <span className="text-xs text-white/80 font-medium">Voice</span>
                        </div>
                        <p className="text-xs text-white/50">Call routing & recording</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 cursor-pointer hover:bg-white/[0.06] transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-3 h-3 text-krim-cyan/70" />
                          <span className="text-xs text-white/80 font-medium">Compliance</span>
                        </div>
                        <p className="text-xs text-white/50">TCPA & regulatory checks</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 cursor-pointer hover:bg-white/[0.06] transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <CurrencyDollar className="w-3 h-3 text-krim-mint/70" />
                          <span className="text-xs text-white/80 font-medium">Payment</span>
                        </div>
                        <p className="text-xs text-white/50">Processing & scheduling</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Visual Workflow Builder */}
                <div className="col-span-2">
                  <div className="bg-white/[0.02] rounded-lg p-4 h-full border border-white/5 relative">
                    <h5 className="text-white/80 text-sm font-medium mb-4">Workflow Designer</h5>
                    
                    {/* Visual flow */}
                    <div className="relative h-64">
                      {/* Flow nodes */}
                      <div className="absolute top-4 left-8 w-20 h-16 rounded-lg bg-krim-mint/10 border border-krim-mint/30 flex flex-col items-center justify-center">
                        <Phone className="w-4 h-4 text-krim-mint mb-1" />
                        <span className="text-xs text-white/80">Incoming Call</span>
                      </div>
                      
                      <div className="absolute top-4 left-36 w-20 h-16 rounded-lg bg-krim-cyan/10 border border-krim-cyan/30 flex flex-col items-center justify-center">
                        <Shield className="w-4 h-4 text-krim-cyan mb-1" />
                        <span className="text-xs text-white/80">TCPA Check</span>
                      </div>
                      
                      <div className="absolute top-28 left-8 w-20 h-16 rounded-lg bg-krim-mint/10 border border-krim-mint/30 flex flex-col items-center justify-center">
                        <UserCircle className="w-4 h-4 text-krim-mint mb-1" />
                        <span className="text-xs text-white/80">Verify Identity</span>
                      </div>
                      
                      <div className="absolute top-28 left-36 w-20 h-16 rounded-lg bg-krim-cyan/10 border border-krim-cyan/30 flex flex-col items-center justify-center">
                        <CurrencyDollar className="w-4 h-4 text-krim-cyan mb-1" />
                        <span className="text-xs text-white/80">Payment Options</span>
                      </div>

                      {/* Flow arrows */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" fill="rgba(167, 243, 208, 0.5)">
                            <polygon points="0 0, 6 2, 0 4" />
                          </marker>
                        </defs>
                        <path d="M 120 24 L 140 24" stroke="rgba(167, 243, 208, 0.5)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <path d="M 48 40 L 48 110" stroke="rgba(167, 243, 208, 0.5)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <path d="M 176 40 L 176 110" stroke="rgba(103, 232, 249, 0.5)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <path d="M 120 136 L 140 136" stroke="rgba(167, 243, 208, 0.5)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      </svg>
                      
                      {/* Drag indicator */}
                      <div className="absolute bottom-4 right-4 text-xs text-white/40 flex items-center gap-1">
                        <ArrowsClockwise className="w-3 h-3" />
                        <span>Drag to connect primitives</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Configuration Panel */}
                <div className="col-span-1">
                  <div className="bg-white/[0.02] rounded-lg p-4 h-full border border-white/5">
                    <h5 className="text-white/80 text-sm font-medium mb-4">Configuration</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-white/60 block mb-2">Selected: TCPA Check</label>
                        <div className="bg-white/[0.03] rounded p-2 border border-white/5">
                          <div className="text-xs text-white/80 mb-2">Consent verification required</div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked className="w-3 h-3" readOnly />
                            <span className="text-xs text-white/60">Record consent timestamp</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-white/60 block mb-2">Compliance Rules</label>
                        <div className="space-y-2">
                          <div className="bg-krim-mint/10 rounded px-2 py-1 text-xs text-krim-mint border border-krim-mint/20">
                            ✓ TCPA verified
                          </div>
                          <div className="bg-krim-cyan/10 rounded px-2 py-1 text-xs text-krim-cyan border border-krim-cyan/20">
                            ✓ Reg F compliant
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Studio Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <GlassPanel className="h-[200px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-krim-mint/10 flex items-center justify-center border border-krim-mint/20">
                    <Code className="w-5 h-5 text-krim-mint/70" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-base">No-Code Builder</h4>
                    <p className="text-white/60 text-sm">Visual workflow design</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Drag-and-drop interface for creating complex agent workflows. No programming 
                  required—just connect Kriya primitives to build powerful automation.
                </p>
              </GlassPanel>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
              transition={{ delay: 0.1 }}
            >
              <GlassPanel className="h-[200px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-krim-cyan/10 flex items-center justify-center border border-krim-cyan/20">
                    <Brain className="w-5 h-5 text-krim-cyan/70" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-base">AI-Assisted Design</h4>
                    <p className="text-white/60 text-sm">Intelligent recommendations</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Smart suggestions for optimizing workflows based on compliance requirements 
                  and industry best practices. Learn from successful agent patterns.
                </p>
              </GlassPanel>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
              transition={{ delay: 0.2 }}
            >
              <GlassPanel className="h-[200px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-krim-mint/10 flex items-center justify-center border border-krim-mint/20">
                    <CheckCircle className="w-5 h-5 text-krim-mint/70" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-base">Live Testing</h4>
                    <p className="text-white/60 text-sm">Real-time validation</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Test agents in sandbox environments with simulated scenarios. Validate 
                  compliance and performance before deploying to production.
                </p>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section 
        id="intelligence" 
        className="py-24 px-6 md:px-8 lg:px-12"
        ref={(el) => {
          if (el) sectionRefs.current.set('intelligence', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <h2 className="text-[clamp(24px,2.8vw,32px)] font-semibold tracking-tight text-white/95 mb-4">
                Emergent Learning Systems
              </h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-white/70 mb-6 max-w-[68ch]">
                Self-improving operational intelligence.
              </p>
              
            </motion.div>

            {/* Right: Enhanced AI Brain Visualization */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <GlassPanel className="h-[400px] p-8 flex flex-col justify-center relative overflow-hidden">
                {/* Simple background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-8 gap-4 h-full p-4">
                    {Array.from({length: 32}).map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-krim-mint/20" />
                    ))}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-krim-mint/70" />
                      <h3 className="text-white/80 text-sm font-medium">Krim-Learn Intelligence</h3>
                    </div>
                    <p className="text-white/50 text-xs">Real-time pattern learning across 10 loops</p>
                  </div>
                  
                  {/* Simple learning display */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-krim-mint/10 border-2 border-krim-mint/20 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-krim-mint" />
                    </div>
                  </div>

                  {/* Learning metrics with animated values */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-krim-mint" />
                        Workflow Optimization
                      </span>
                      <span className="text-krim-mint text-sm font-mono">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                        Compliance Recognition
                      </span>
                      <span className="text-krim-cyan text-sm font-mono">88%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-krim-mint/70" />
                        Risk Detection
                      </span>
                      <span className="text-krim-mint text-sm font-mono">82%</span>
                    </div>
                  </div>

                  {/* Active learning indicator */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-krim-mint" />
                        <span className="text-xs text-white/60">Learning from 2,347 operations</span>
                      </div>
                      <div className="text-xs text-krim-mint font-mono">24/7 Active</div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kriya Actions Section */}
      <section 
        id="kriya-actions" 
        className="py-24 px-6 md:px-8 lg:px-12 bg-white/[0.01]"
        ref={(el) => {
          if (el) sectionRefs.current.set('kriya-actions', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <h2 className="text-[clamp(24px,2.8vw,32px)] font-semibold tracking-tight text-white/95 mb-4">
                Compliance-Native Building Blocks
              </h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-white/70 mb-6 max-w-[68ch]">
                270+ atomic primitives for financial workflows.
              </p>
              
            </motion.div>

            {/* Right: Primitives overview */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <GlassPanel className="h-[400px] p-8">
                <div className="text-center mb-6">
                  <h3 className="text-white/80 text-sm font-medium mb-2">Primitive Categories</h3>
                  <p className="text-white/50 text-xs">270+ compliance-validated actions</p>
                </div>
                
                {/* Categories grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Voice</div>
                    <div className="text-white/50 mt-1">Call routing, IVR, recording</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Document</div>
                    <div className="text-white/50 mt-1">Generation, parsing, validation</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Compliance</div>
                    <div className="text-white/50 mt-1">TCPA, Reg F, FCRA checks</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Data</div>
                    <div className="text-white/50 mt-1">Enrichment, validation, scoring</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Payment</div>
                    <div className="text-white/50 mt-1">Processing, scheduling, verification</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-white/80">Communication</div>
                    <div className="text-white/50 mt-1">Email, SMS, portal messaging</div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Governed Learning Section */}
      <section 
        id="governed-learning" 
        className="py-24 px-6 md:px-8 lg:px-12"
        ref={(el) => {
          if (el) sectionRefs.current.set('governed-learning', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <h2 className="text-[clamp(24px,2.8vw,32px)] font-semibold tracking-tight text-white/95 mb-4">
                Enterprise Control Framework
              </h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-white/70 mb-6 max-w-[68ch]">
                10-stage validation with complete governance.
              </p>
              
            </motion.div>

            {/* Right: Validation pipeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <GlassPanel className="h-[400px] p-8 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h3 className="text-white/80 text-sm font-medium mb-2">Krim-Nyaya Pipeline</h3>
                  <p className="text-white/50 text-xs">10-stage validation process</p>
                </div>
                
                {/* Pipeline stages */}
                <div className="space-y-3">
                  {[
                    'Data Source Validation',
                    'Regulatory Compliance Check',
                    'Risk Assessment Analysis',
                    'Policy Hierarchy Review',
                    'Decision Logic Verification',
                    'Audit Trail Generation',
                    'Evidence Compilation',
                    'Final Authorization',
                    'Execution Monitoring',
                    'Post-Action Validation'
                  ].map((stage, index) => (
                    <div key={stage} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-krim-mint/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-medium text-krim-mint">{index + 1}</span>
                      </div>
                      <span className="text-xs text-white/60">{stage}</span>
                      <div className="w-1 h-1 rounded-full bg-krim-mint/70 ml-auto" />
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section 
        id="deployment" 
        className="py-24 px-6 md:px-8 lg:px-12"
        ref={(el) => {
          if (el) sectionRefs.current.set('deployment', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <h2 className="text-[clamp(24px,2.8vw,32px)] font-semibold tracking-tight text-white/95 mb-4">
                Enterprise Implementation
              </h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-white/70 mb-8 max-w-[68ch]">
                Secure API integration. Start with pilot, scale with proven ROI.
              </p>

              {/* Deployment steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-krim-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-krim-mint">1</span>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-1">System Integration</h4>
                    <p className="text-white/60 text-xs">Secure API connections to existing infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-krim-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-krim-mint">2</span>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-1">Policy Configuration</h4>
                    <p className="text-white/60 text-xs">Enterprise governance and compliance frameworks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-krim-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-krim-mint">3</span>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-1">Production Deployment</h4>
                    <p className="text-white/60 text-xs">Pilot validation, performance metrics, scaled rollout</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Simple visual */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
            >
              <GlassPanel className="h-[400px] p-8 flex items-center justify-center">
                <div className="text-center">
                  <Lightning className="w-12 h-12 text-krim-mint/70 mx-auto mb-4" />
                  <h3 className="text-white/80 text-lg font-medium mb-2">Rapid Deployment</h3>
                  <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
                    Average time from contract to first live agent interaction
                  </p>
                  <div className="text-[clamp(36px,4vw,48px)] font-bold text-krim-mint">
                    3-4 weeks
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section 
        id="roi" 
        className="py-24 px-6 md:px-8 lg:px-12 bg-white/[0.01]"
        ref={(el) => {
          if (el) sectionRefs.current.set('roi', el)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(28px,3.2vw,36px)] font-semibold tracking-tight text-white/95 mb-4">
              Enterprise Impact Metrics
            </h2>
            <p className="text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/70 max-w-3xl mx-auto">
              Quantified operational improvements from AI co-worker deployment across financial institutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Key Metrics */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
              className="lg:col-span-2"
            >
              <GlassPanel className="h-[400px] p-8">
                <h3 className="text-white/90 text-lg font-medium mb-6">Proven Performance Improvements</h3>
                
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="space-y-6">
                    {/* Cost Reduction */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Cost Reduction</span>
                        <span className="text-krim-mint text-xl font-bold">65%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-[65%] bg-krim-mint rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Average reduction in cost-to-serve per account</p>
                    </div>

                    {/* Resolution Time */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Resolution Time</span>
                        <span className="text-krim-cyan text-xl font-bold">78%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-[78%] bg-krim-cyan rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Faster case resolution with automated workflows</p>
                    </div>

                    {/* Compliance Score */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Compliance Score</span>
                        <span className="text-krim-mint text-xl font-bold">100%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-full bg-krim-mint rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Audit coverage with automated documentation</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Collection Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Collection Rate</span>
                        <span className="text-krim-cyan text-xl font-bold">43%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-[43%] bg-krim-cyan rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Improvement in successful payment collection</p>
                    </div>

                    {/* Agent Productivity */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Agent Productivity</span>
                        <span className="text-krim-mint text-xl font-bold">156%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-full bg-krim-mint rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Increase in cases handled per agent</p>
                    </div>

                    {/* Customer Satisfaction */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-sm">Customer Satisfaction</span>
                        <span className="text-krim-cyan text-xl font-bold">89%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="w-[89%] bg-krim-cyan rounded-full h-2"></div>
                      </div>
                      <p className="text-xs text-white/50 mt-2">Customer satisfaction with AI-assisted interactions</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Financial Impact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={motionVariant}
              transition={{ delay: 0.1 }}
            >
              <GlassPanel className="h-[400px] p-8 flex flex-col justify-center">
                <h3 className="text-white/90 text-lg font-medium mb-6 text-center">Financial Impact</h3>
                
                <div className="space-y-8">
                  {/* Deployment Timeline */}
                  <div className="text-center">
                    <div className="text-white/60 text-sm mb-2">Deployment Timeline</div>
                    <div className="text-[clamp(28px,3vw,32px)] font-bold text-krim-mint">3 Weeks</div>
                    <div className="text-xs text-white/50">From contract to live agents</div>
                  </div>

                  {/* ROI Timeframe */}
                  <div className="text-center">
                    <div className="text-white/60 text-sm mb-2">ROI Realization</div>
                    <div className="text-[clamp(28px,3vw,32px)] font-bold text-krim-cyan">2 Months</div>
                    <div className="text-xs text-white/50">Break-even with operational savings</div>
                  </div>

                  {/* Annual Savings */}
                  <div className="text-center">
                    <div className="text-white/60 text-sm mb-2">Annual Savings</div>
                    <div className="text-[clamp(28px,3vw,32px)] font-bold text-krim-mint">$2.4M+</div>
                    <div className="text-xs text-white/50">Per 1,000 accounts under management</div>
                  </div>
                </div>

                {/* Calculate ROI Button */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full px-4 py-2 border border-krim-mint/30 text-krim-mint hover:bg-krim-mint/10 rounded-lg transition-colors text-sm"
                  >
                    Calculate Your ROI
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
          >
            <h2 className="text-[clamp(24px,2.8vw,32px)] font-semibold tracking-tight text-white/95 mb-4">
              Deploy Enterprise Intelligence Infrastructure
            </h2>
            <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">
              Join financial institutions implementing operational intelligence that reduces cost-to-serve 
              while strengthening compliance posture and regulatory adherence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-krim-mint text-krim-deep-space font-medium rounded-full hover:bg-krim-cyan transition-colors duration-300"
              >
Request Implementation Plan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => navigate('/platform')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/90 font-medium rounded-full hover:bg-white/5 transition-colors duration-300"
              >
                Learn About Platform
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default KartaClean
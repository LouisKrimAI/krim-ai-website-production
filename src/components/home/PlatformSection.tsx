/**
 * PLATFORM SECTION - Redesigned with unique visual identity per tab
 * Each tab has distinct layout while maintaining identical container dimensions
 * Optimized for desktop viewport with maximum height utilization
 */
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Reveal } from '../Reveal'
import { 
  ArrowRight, Cpu, Brain, Users, ChartBar, Cube, 
  ChatCircle, Shield, Database, Cloud,
  GitBranch, Sparkle, Command,
  Monitor, Terminal, Code, Graph, Gauge,
  PersonArmsSpread, Robot, Headset, EnvelopeOpen,
  FileText, CheckCircle, Warning, Info, GridFour,
  Stack, Package, PuzzlePiece, Hexagon, Circle
} from '@phosphor-icons/react'

interface TabContent {
  id: string
  label: string
  icon: React.ReactNode
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    gradient: string
  }
  headline: string
  description: string
  bullets: string[]
  cta: string
  route: string
}

const tabsData: TabContent[] = [
  {
    id: 'kendra',
    label: 'Kendra',
    icon: <Cpu className="w-5 h-5" />,
    colorScheme: {
      primary: 'emerald',
      secondary: 'teal',
      accent: '#10b981',
      gradient: 'from-emerald-500/20 to-teal-600/10'
    },
    headline: 'Kendra – Safe Superintelligence Runtime for Credit Operations',
    description: 'Kendra is the execution engine behind Krim AI. It takes your credit data and policies, and turns them into coordinated, auditable actions across contact center and back office.',
    bullets: [
      'Orchestrates workflows for sales, retention, collections, servicing, support and back-office teams',
      'Keeps policies, data and events in sync so every action runs from the same facts and rules',
      'Checks and logs each action, so behaviour stays controlled, explainable and ready for audit'
    ],
    cta: 'Learn more about Kendra',
    route: '/platform'
  },
  {
    id: 'kula',
    label: 'Kula',
    icon: <Brain className="w-5 h-5" />,
    colorScheme: {
      primary: 'cyan',
      secondary: 'sky',
      accent: '#06b6d4',
      gradient: 'from-cyan-500/20 to-sky-600/10'
    },
    headline: 'Kula – Digital Twin for Credit Teams',
    description: 'Kula is the digital twin of how each person works – their portfolios, goals and daily workflows – and an assistant that helps them act on it.',
    bullets: [
      'Learns what each user owns, watches and wants to improve across credit operations',
      'Lets them describe intent in plain language; suggests strategies, automations and dashboards tailored to their role',
      'Runs changes in the twin first with real data and rules, then pushes approved plans into Kendra with a few clicks'
    ],
    cta: 'Explore Kula',
    route: '/kula'
  },
  {
    id: 'karta',
    label: 'Karta',
    icon: <Users className="w-5 h-5" />,
    colorScheme: {
      primary: 'violet',
      secondary: 'purple',
      accent: '#8b5cf6',
      gradient: 'from-violet-500/20 to-purple-600/10'
    },
    headline: 'Karta – AI Co-Workers for Contact Center & Back Office',
    description: 'Karta is a family of AI co-workers that take on conversations and cases, using structured primitives instead of free-form improvisation.',
    bullets: [
      'Contact Center: Handle inbound/outbound across voice, SMS and digital channels with enforced scripts and policies',
      'Back-Office: Prepare and triage cases, help with QA, reporting, reconciliations, disputes and compliance checks',
      'Designed to stay grounded in approved data and flows, escalating sensitive cases to humans with full context'
    ],
    cta: 'Meet the Karta Co-Workers',
    route: '/karta'
  },
  {
    id: 'kupa',
    label: 'Kupa',
    icon: <ChartBar className="w-5 h-5" />,
    colorScheme: {
      primary: 'teal',
      secondary: 'cyan',
      accent: '#14b8a6',
      gradient: 'from-teal-500/20 to-cyan-600/10'
    },
    headline: 'Kupa – Real-Time Command Centers for Credit Operations',
    description: 'Kupa is a set of command centers – tuned for portfolio, ops, risk, compliance and CX leaders – to see what AI and humans are doing and to steer the whole operation.',
    bullets: [
      'Live views of volumes, queues, segments, risk signals, outcomes, breaches and escalations',
      'Controls to tune priorities, throttles, routing, workloads and escalation rules without touching code',
      'Full change history and impact trails, so you can see which tweaks improved performance and which need rolling back'
    ],
    cta: 'View Kupa Command Centers',
    route: '/kupa'
  },
  {
    id: 'kriya',
    label: 'Kriya',
    icon: <Cube className="w-5 h-5" />,
    colorScheme: {
      primary: 'orange',
      secondary: 'amber',
      accent: '#f97316',
      gradient: 'from-orange-500/20 to-amber-600/10'
    },
    headline: 'Kriya – The Building Blocks of Safe Agentic Automation',
    description: 'Kriya primitives are the smallest building blocks of work in Krim – actions, checks and policies that define how to do credit work safely.',
    bullets: [
      'Primitives for steps like "send compliant notice", "review hardship", "design payment plan", "log promise", "trigger field visit", "close dispute"',
      'Each primitive defines what data can be used, what rules apply and which channels are allowed, so agentic behaviour stays inside approved boundaries',
      'Co-workers and workflows are composed from these primitives, so new automation automatically inherits safety, explainability and an audit trail'
    ],
    cta: 'Understand Kriya Primitives',
    route: '/kriya'
  }
]

const PlatformSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kendra')
  const [focusedTab, setFocusedTab] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedTab) return
      
      const tabIds = tabsData.map(tab => tab.id)
      const currentIndex = tabIds.indexOf(focusedTab)
      let newIndex = currentIndex

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          newIndex = (currentIndex + 1) % tabIds.length
          break
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = tabIds.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          setActiveTab(focusedTab)
          return
      }

      const newTabId = tabIds[newIndex]
      setFocusedTab(newTabId)
      tabRefs.current[newTabId]?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusedTab])

  const activeTabData = tabsData.find(tab => tab.id === activeTab) || tabsData[0]

  // Fixed container height calculation for desktop viewport
  // 1080px viewport - 80px header - 100px section padding - 250px for header/tabs = ~550px content height
  const CONTAINER_HEIGHT = 'min-h-[550px] max-h-[600px]'

  return (
    <section className="relative py-16 px-6 overflow-hidden">
      {/* Dynamic background gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.5), rgba(0, 0, 0, 0.8))',
            'linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.4), rgba(0, 0, 0, 0.7))',
            'linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.5), rgba(0, 0, 0, 0.8))'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%220.5%22%20opacity%3D%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22/%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Compact Section Header */}
        <div className="text-center mb-10 space-y-3">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 mb-2"
            >
              <GridFour className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Platform Architecture</span>
            </motion.div>
          </Reveal>
          
          <Reveal>
            <div className="flex justify-center mb-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-center">
                The Krim AI Platform
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Five integrated systems that turn credit operations into safe, coordinated AI work
            </p>
          </Reveal>
        </div>

        {/* Professional Tabbed Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glass morphism container */}
          <div className="rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
            
            {/* Tab Navigation - Redesigned */}
            <div 
              ref={tabsRef}
              role="tablist" 
              aria-label="Krim AI Platform Components"
              className="flex flex-wrap lg:flex-nowrap border-b border-white/[0.08] overflow-x-auto scrollbar-hide"
            >
              {tabsData.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2 px-6 py-5 text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${activeTab === tab.id 
                      ? `text-white ${
                        ''
                      }` 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }
                    focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-inset
                  `}
                  onClick={() => setActiveTab(tab.id)}
                  onFocus={() => setFocusedTab(tab.id)}
                  onBlur={() => setFocusedTab(null)}
                  onMouseEnter={() => setIsHovered(tab.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className={`transition-colors ${
                    activeTab === tab.id 
                      ? tab.id === 'kendra' ? 'text-emerald-400'
                        : tab.id === 'kula' ? 'text-cyan-400'
                        : tab.id === 'karta' ? 'text-violet-400'
                        : tab.id === 'kupa' ? 'text-teal-400'
                        : 'text-orange-400'
                      : isHovered === tab.id ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {tab.icon}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  
                  {/* Dynamic Active Tab Indicator */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 ${
                        tab.id === 'kendra' ? 'from-emerald-400 to-teal-400'
                          : tab.id === 'kula' ? 'from-cyan-400 to-sky-400'
                          : tab.id === 'karta' ? 'from-violet-400 to-purple-400'
                          : tab.id === 'kupa' ? 'from-teal-400 to-cyan-400'
                          : 'from-orange-400 to-amber-400'
                      }`}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Fixed Height Tab Content Container */}
            <div className={`relative ${CONTAINER_HEIGHT} p-8 lg:p-10 overflow-hidden`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`panel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring", damping: 20 }}
                  className={`h-full flex flex-col`}
                >
                  {/* Dynamic Header Based on Tab */}
                  <div className="mb-6">
                    <motion.h3 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-3"
                    >
                      {activeTabData.headline}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-base text-gray-400 leading-relaxed max-w-4xl"
                    >
                      {activeTabData.description}
                    </motion.p>
                  </div>

                  {/* Unique Layout for Each Tab */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Kendra - Advanced Runtime Orchestration Layout */}
                    {activeTab === 'kendra' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                      >
                        <div className="grid grid-cols-12 gap-4 h-full">
                          {/* Left Panel - System Overview */}
                          <div className="col-span-3 space-y-3">
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              whileHover={{ scale: 1.02 }}
                              className="rounded-xl p-4 border border-emerald-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                  <Cpu className="w-4 h-4 text-emerald-400" />
                                </motion.div>
                                <span className="text-xs font-semibold text-emerald-300">Runtime Engine</span>
                              </div>
                              
                              {/* Animated Metrics */}
                              <div className="space-y-2">
                                {[
                                  { label: 'CPU', value: 32, max: 100 },
                                  { label: 'Memory', value: 58, max: 100 },
                                  { label: 'Network', value: 71, max: 100 }
                                ].map((metric, i) => (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] text-gray-400">{metric.label}</span>
                                      <span className="text-[10px] font-mono text-emerald-400">{metric.value}%</span>
                                    </div>
                                    <div className="w-full border border-gray-700 rounded-full h-1">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.value}%` }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1 rounded-full"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              whileHover={{ scale: 1.02 }}
                              className="rounded-xl p-4 border border-teal-500/20"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Graph className="w-4 h-4 text-teal-400" />
                                <span className="text-xs font-semibold text-teal-300">Active Workflows</span>
                              </div>
                              <motion.div 
                                className="text-2xl font-bold text-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                              >
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.7 }}
                                >
                                  2,847
                                </motion.span>
                              </motion.div>
                              <div className="text-[10px] text-teal-400">↑ 12% from last hour</div>
                              
                              {/* Mini sparkline */}
                              <div className="mt-2 flex items-end gap-0.5 h-8">
                                {[20, 35, 28, 42, 38, 45, 52, 48].map((height, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: 0.8 + i * 0.05 }}
                                    className="flex-1 bg-gradient-to-t from-teal-500/40 to-teal-400/20 rounded-t"
                                  />
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                              whileHover={{ scale: 1.02 }}
                              className="rounded-xl p-4 border border-emerald-500/20"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-semibold text-emerald-300">Security Status</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-2 h-2 rounded-full bg-green-500"
                                />
                                <span className="text-xs text-green-400">All Systems Secure</span>
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Center - Main Orchestration View */}
                          <div className="col-span-6 space-y-4">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 }}
                              className="rounded-xl p-5 border border-white/5 h-full"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <GitBranch className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-semibold text-white">Orchestration Flow</span>
                                <motion.span
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="ml-auto text-xs text-emerald-400 font-mono"
                                >
                                  PROCESSING
                                </motion.span>
                              </div>
                              
                              {/* Visual Flow Diagram */}
                              <div className="relative h-48 mb-4">
                                {/* Connection Lines */}
                                <svg className="absolute inset-0 w-full h-full">
                                  <defs>
                                    <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                      <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                                    </linearGradient>
                                  </defs>
                                  {/* Animated connection paths */}
                                  <motion.path
                                    d="M 40 40 Q 100 60 160 40 T 280 40"
                                    stroke="url(#emerald-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <motion.path
                                    d="M 40 80 L 160 80 L 280 80"
                                    stroke="url(#emerald-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                                  />
                                  <motion.path
                                    d="M 40 120 Q 100 100 160 120 T 280 120"
                                    stroke="url(#emerald-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                                  />
                                </svg>
                                
                                {/* Node Points */}
                                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-4 p-4">
                                  {[
                                    { icon: Database, label: 'Data' },
                                    { icon: Shield, label: 'Policy' },
                                    { icon: Cpu, label: 'Process' },
                                    { icon: CheckCircle, label: 'Validate' },
                                    { icon: GitBranch, label: 'Route' },
                                    { icon: Terminal, label: 'Execute' },
                                    { icon: Graph, label: 'Monitor' },
                                    { icon: Cloud, label: 'Sync' }
                                  ].map((node, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.6 + i * 0.1 }}
                                      whileHover={{ scale: 1.2 }}
                                      className="relative flex flex-col items-center justify-center"
                                    >
                                      <motion.div
                                        animate={{ 
                                          boxShadow: [
                                            '0 0 10px rgba(16, 185, 129, 0.3)',
                                            '0 0 20px rgba(16, 185, 129, 0.5)',
                                            '0 0 10px rgba(16, 185, 129, 0.3)'
                                          ]
                                        }}
                                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center"
                                      >
                                        {React.createElement(node.icon, { className: 'w-5 h-5 text-emerald-400' })}
                                      </motion.div>
                                      <span className="text-[9px] text-gray-400 mt-1">{node.label}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Key Features */}
                              <div className="space-y-2">
                                {activeTabData.bullets.map((bullet, i) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4 + i * 0.1 }}
                                    className="flex items-start gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-gray-300 leading-relaxed">{bullet}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Right Panel - Live Monitoring */}
                          <div className="col-span-3 space-y-3">
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="rounded-xl p-4 border border-white/5"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Terminal className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-semibold text-gray-300">Live Event Stream</span>
                              </div>
                              
                              {/* Scrolling Event Log */}
                              <div className="space-y-1.5 font-mono text-[10px] overflow-hidden h-32">
                                {[
                                  { type: 'success', msg: 'Workflow #2847 initiated' },
                                  { type: 'info', msg: 'Policy validation: PASS' },
                                  { type: 'success', msg: 'Data sync completed' },
                                  { type: 'info', msg: 'Routing to processor' },
                                  { type: 'success', msg: 'Action logged to audit' },
                                  { type: 'warning', msg: 'Queue depth increasing' },
                                  { type: 'success', msg: 'Auto-scaling triggered' }
                                ].map((event, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="flex items-center gap-2"
                                  >
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                      event.type === 'success' ? 'bg-emerald-400' :
                                      event.type === 'warning' ? 'bg-yellow-400' : 'bg-teal-400'
                                    }`} />
                                    <span className={`${
                                      event.type === 'success' ? 'text-emerald-400' :
                                      event.type === 'warning' ? 'text-yellow-400' : 'text-teal-400'
                                    }`}>
                                      {event.msg}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                              className="rounded-xl p-4 border border-teal-500/20"
                            >
                              <div className="text-xs font-semibold text-teal-300 mb-2">Throughput</div>
                              <div className="text-2xl font-bold text-white mb-1">847/sec</div>
                              <div className="text-[10px] text-teal-400">↑ 23% efficiency gain</div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 }}
                              className="rounded-xl p-4 border border-green-500/20"
                            >
                              <div className="text-xs font-semibold text-green-300 mb-2">Compliance Score</div>
                              <div className="text-2xl font-bold text-white">100%</div>
                              <div className="flex items-center gap-1 mt-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-[10px] text-green-400">All checks passing</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Kula - Digital Twin Assistant Layout */}
                    {activeTab === 'kula' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                      >
                        {/* Natural Language Interface */}
                        <div className="grid grid-cols-3 gap-4 h-full">
                          {/* Conversation Panel */}
                          <div className="col-span-2 space-y-4">
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="rounded-xl p-5 border border-cyan-500/20"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <Brain className="w-5 h-5 text-cyan-400" />
                                <span className="text-sm font-semibold text-white">Digital Twin Assistant</span>
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="ml-auto w-3 h-3 rounded-full bg-cyan-400"
                                />
                              </div>
                              
                              {/* Chat Messages */}
                              <div className="space-y-3 mb-4">
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 }}
                                  className="flex gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                                    <PersonArmsSpread className="w-4 h-4 text-gray-300" />
                                  </div>
                                  <div className="flex-1 border border-gray-700/50 rounded-lg p-3 border border-gray-700/50">
                                    <p className="text-sm text-gray-300">"Show me all accounts over 90 days delinquent in California with balance {'>'}$5000"</p>
                                  </div>
                                </motion.div>
                                
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 }}
                                  className="flex gap-3 flex-row-reverse"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1 bg-gradient-to-br from-cyan-500/20 to-sky-500/10 rounded-lg p-3 border border-cyan-500/30">
                                    <p className="text-sm text-cyan-100">Found 847 accounts matching your criteria. I've prepared a workflow to prioritize them by recovery likelihood and compliance requirements.</p>
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      transition={{ delay: 0.8 }}
                                      className="mt-3 p-2 bg-cyan-500/10 rounded border border-cyan-500/20"
                                    >
                                      <div className="text-xs text-cyan-400 mb-1">Generated Workflow</div>
                                      <div className="text-xs text-gray-300">• Risk scoring • FDCPA compliance check • Payment plan generation</div>
                                    </motion.div>
                                  </div>
                                </motion.div>
                                
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.0 }}
                                  className="flex gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                                    <PersonArmsSpread className="w-4 h-4 text-gray-300" />
                                  </div>
                                  <div className="flex-1 border border-gray-700/50 rounded-lg p-3 border border-gray-700/50">
                                    <p className="text-sm text-gray-300">"Test this workflow with real data but don't execute yet"</p>
                                  </div>
                                </motion.div>
                              </div>
                              
                              {/* Input Field */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex gap-2"
                              >
                                <input 
                                  type="text"
                                  placeholder="Ask your digital twin anything about credit operations..."
                                  className="flex-1  border border-cyan-500/20 rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
                                  disabled
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-lg text-sm font-medium text-white hover:from-cyan-400 hover:to-sky-400 transition-all">
                                  Send
                                </button>
                              </motion.div>
                            </motion.div>
                            
                            {/* Simulation Results */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.4 }}
                              className="bg-gradient-to-br from-gray-800/30 to-cyan-900/10 rounded-xl p-5 border border-white/5"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Gauge className="w-5 h-5 text-cyan-400" />
                                <span className="text-sm font-semibold text-white">Digital Twin Simulation</span>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-2 bg-cyan-500/5 rounded border border-cyan-500/10">
                                  <div className="text-xl font-bold text-cyan-400">847</div>
                                  <div className="text-xs text-gray-400">Accounts</div>
                                </div>
                                <div className="text-center p-2 bg-green-500/5 rounded border border-green-500/10">
                                  <div className="text-xl font-bold text-green-400">92%</div>
                                  <div className="text-xs text-gray-400">Compliance</div>
                                </div>
                                <div className="text-center p-2 bg-sky-500/5 rounded border border-sky-500/10">
                                  <div className="text-xl font-bold text-sky-400">$2.4M</div>
                                  <div className="text-xs text-gray-400">Est. Recovery</div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Right Sidebar - Digital Twin Features */}
                          <div className="space-y-4">
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-gradient-to-br from-sky-500/10 to-sky-600/5 rounded-xl p-4 border border-sky-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkle className="w-4 h-4 text-sky-400" />
                                <span className="text-xs font-semibold text-sky-300">AI Capabilities</span>
                              </div>
                              <div className="space-y-2">
                                {[
                                  'Natural Language Query',
                                  'Workflow Generation',
                                  'Compliance Validation',
                                  'Impact Simulation'
                                ].map((capability, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="flex items-center gap-2 p-2 bg-sky-500/5 rounded"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                    <span className="text-xs text-gray-300">{capability}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 }}
                              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl p-4 border border-cyan-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <GitBranch className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs font-semibold text-cyan-300">Recent Actions</span>
                              </div>
                              <div className="space-y-1.5 text-xs">
                                <div className="text-cyan-400">✓ Workflow created</div>
                                <div className="text-sky-400">→ Testing in progress</div>
                                <div className="text-gray-500">... Awaiting approval</div>
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2 }}
                              className="rounded-xl p-4 border border-green-500/20"
                            >
                              <div className="text-2xl font-bold text-white mb-1">100%</div>
                              <div className="text-xs text-green-400">Policy Compliance</div>
                              <div className="w-full border border-gray-700 rounded-full h-1.5 mt-2">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ delay: 1.4, duration: 0.8 }}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                                />
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Karta - Professional AI Co-Workers Layout */}
                    {activeTab === 'karta' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                      >
                        <div className="grid grid-cols-3 gap-4 h-full">
                          {/* AI Agent Gallery */}
                          <div className="col-span-2 space-y-4">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                              className="bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/5 rounded-xl p-5 border border-violet-500/20"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <Users className="w-5 h-5 text-violet-400" />
                                <span className="text-sm font-semibold text-white">Active AI Co-Workers</span>
                                <motion.span 
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="ml-auto text-xs text-violet-400 font-mono"
                                >
                                  LIVE
                                </motion.span>
                              </div>
                              
                              {/* Professional Agent Cards */}
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { name: 'Kim Resolve', role: 'Dispute Resolution', status: 'active', tasks: 147 },
                                  { name: 'Kim Connect', role: 'Customer Outreach', status: 'active', tasks: 892 },
                                  { name: 'Kim Guardian', role: 'Compliance Monitor', status: 'active', tasks: 2431 },
                                  { name: 'Kim Early', role: 'Early Stage Collections', status: 'active', tasks: 534 },
                                  { name: 'Kim Orchestrator', role: 'Workflow Manager', status: 'training', tasks: 0 },
                                  { name: 'Kim Recovery', role: 'Account Recovery', status: 'active', tasks: 267 }
                                ].map((agent, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="relative bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg p-3 border border-violet-500/20 cursor-pointer overflow-hidden"
                                  >
                                    {/* Animated Background */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10"
                                      animate={{ 
                                        opacity: agent.status === 'active' ? [0, 0.3, 0] : 0,
                                        scale: agent.status === 'active' ? [1, 1.1, 1] : 1
                                      }}
                                      transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    
                                    <div className="relative">
                                      {/* Agent Avatar */}
                                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                        <Robot className="w-6 h-6 text-white" />
                                      </div>
                                      
                                      {/* Agent Info */}
                                      <div className="text-center">
                                        <div className="text-xs font-semibold text-white mb-0.5">{agent.name}</div>
                                        <div className="text-[10px] text-violet-400 mb-1">{agent.role}</div>
                                        
                                        {/* Status Indicator */}
                                        <div className="flex items-center justify-center gap-1">
                                          <div className={`w-2 h-2 rounded-full ${
                                            agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                                          } ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
                                          <span className="text-[10px] text-gray-400">
                                            {agent.status === 'active' ? `${agent.tasks} tasks` : 'Training'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Headset className="w-4 h-4 text-purple-400" />
                                  <span className="text-xs font-semibold text-purple-300">Contact Center</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">8,947</div>
                                <div className="text-xs text-purple-400">Interactions Today</div>
                                <div className="mt-2 text-[10px] text-gray-500">Voice: 3,241 • SMS: 2,892 • Email: 2,814</div>
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                                className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 rounded-lg p-4 border border-violet-500/20"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="w-4 h-4 text-violet-400" />
                                  <span className="text-xs font-semibold text-violet-300">Back Office</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">12,431</div>
                                <div className="text-xs text-violet-400">Cases Processed</div>
                                <div className="mt-2 text-[10px] text-gray-500">QA: 4,892 • Disputes: 3,241 • Reports: 4,298</div>
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Right Sidebar - Task Management */}
                          <div className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-4 border border-purple-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Graph className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-semibold text-purple-300">Real-Time Activity</span>
                              </div>
                              
                              {/* Live Activity Feed */}
                              <div className="space-y-2">
                                {[
                                  { agent: 'Kim Resolve', action: 'Resolved dispute #4821', time: 'now' },
                                  { agent: 'Kim Connect', action: 'Completed 50 calls', time: '2m ago' },
                                  { agent: 'Kim Guardian', action: 'Flagged compliance issue', time: '5m ago' }
                                ].map((activity, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="p-2 bg-purple-500/5 rounded border border-purple-500/10"
                                  >
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                      <div className="flex-1">
                                        <div className="text-[10px] font-medium text-white">{activity.agent}</div>
                                        <div className="text-[10px] text-gray-400">{activity.action}</div>
                                      </div>
                                      <div className="text-[9px] text-gray-600">{activity.time}</div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 }}
                              className="rounded-xl p-4 border border-green-500/20"
                            >
                              <div className="text-xs font-semibold text-green-300 mb-2">Success Rate</div>
                              <div className="text-3xl font-bold text-white mb-1">96.8%</div>
                              <div className="text-xs text-green-400">↑ 2.3% from last week</div>
                              
                              {/* Progress Bar */}
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between text-[10px] text-gray-400">
                                  <span>First Call Resolution</span>
                                  <span>87%</span>
                                </div>
                                <div className="w-full border border-gray-700 rounded-full h-1">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '87%' }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full"
                                  />
                                </div>
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 }}
                              className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 rounded-xl p-4 border border-violet-500/20"
                            >
                              <div className="text-xs font-semibold text-violet-300 mb-2">Escalation Control</div>
                              <div className="text-2xl font-bold text-white mb-1">1.8%</div>
                              <div className="text-xs text-violet-400">Human escalation rate</div>
                              <div className="text-[10px] text-gray-500 mt-1">Industry avg: 15-20%</div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Kupa - Mission Control Command Center */}
                    {activeTab === 'kupa' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                      >
                        {/* Executive Dashboard Grid */}
                        <div className="grid grid-cols-12 gap-4 h-full">
                          {/* Left Panel - Key Metrics */}
                          <div className="col-span-3 space-y-3">
                            {[
                              { label: 'Portfolio Volume', value: '847K', change: '+12%', icon: ChartBar, color: 'teal' },
                              { label: 'Queue Depth', value: '2,341', change: '-8%', icon: Stack, color: 'cyan' },
                              { label: 'Risk Score', value: '72.4', change: '+3%', icon: Warning, color: 'yellow' }
                            ].map((metric, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                                className={`bg-gradient-to-br from-${metric.color}-500/10 to-${metric.color}-600/5 rounded-lg p-4 border border-${metric.color}-500/20 relative overflow-hidden`}
                              >
                                {/* Animated Background Pattern */}
                                <motion.div
                                  className="absolute inset-0 opacity-10"
                                  animate={{ 
                                    backgroundPosition: ['0% 0%', '100% 100%'],
                                  }}
                                  transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                                  style={{
                                    backgroundImage: 'radial-gradient(circle at 20% 50%, currentColor 0%, transparent 50%)'
                                  }}
                                />
                                
                                <div className="relative">
                                  <div className="flex items-center gap-2 mb-2">
                                    {React.createElement(metric.icon, { className: `w-4 h-4 text-${metric.color}-400` })}
                                    <span className="text-xs text-gray-400">{metric.label}</span>
                                  </div>
                                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                                  <div className={`text-xs ${
                                    metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    {metric.change} from last hour
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Center - Main Command View */}
                          <div className="col-span-6">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 }}
                              className="bg-gradient-to-br from-gray-800/30 to-teal-900/10 rounded-xl p-5 border border-white/5 h-full flex flex-col"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <Monitor className="w-5 h-5 text-teal-400" />
                                  <span className="text-sm font-semibold text-white">Operations Command Center</span>
                                </div>
                                <motion.span
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="text-xs text-teal-400 font-mono flex items-center gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                                  LIVE
                                </motion.span>
                              </div>
                              
                              {/* Heat Map Visualization */}
                              <div className="flex-1  rounded-lg border border-teal-500/10 p-4 mb-4">
                                <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
                                  {Array.from({ length: 48 }, (_, i) => {
                                    const intensity = Math.random();
                                    return (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ 
                                          opacity: 1,
                                          backgroundColor: `rgba(20, 184, 166, ${intensity * 0.8})`
                                        }}
                                        transition={{ 
                                          delay: 0.5 + (i * 0.01),
                                          backgroundColor: {
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: 'reverse'
                                          }
                                        }}
                                        whileHover={{ scale: 1.5, zIndex: 10 }}
                                        className="rounded cursor-pointer relative"
                                        title={`Segment ${i + 1}: ${Math.floor(intensity * 100)}% activity`}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                              
                              {/* Control Features */}
                              <div className="grid grid-cols-3 gap-3">
                                {activeTabData.bullets.map((bullet, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 + i * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-teal-500/5 rounded-lg p-3 border border-teal-500/10"
                                  >
                                    <div className="text-[10px] text-teal-400 mb-1">Feature {i + 1}</div>
                                    <div className="text-[10px] text-gray-300 leading-relaxed">{bullet.substring(0, 60)}...</div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Right Panel - Controls & Alerts */}
                          <div className="col-span-3 space-y-3">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-lg p-4 border border-cyan-500/20"
                            >
                              <div className="text-xs font-semibold text-cyan-300 mb-3">Executive Controls</div>
                              <div className="space-y-2">
                                {[
                                  { name: 'Priority Mode', status: true },
                                  { name: 'Auto-Throttle', status: true },
                                  { name: 'Smart Routing', status: false },
                                  { name: 'Risk Override', status: false }
                                ].map((control, i) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.05 }}
                                    className="flex items-center justify-between p-2 bg-cyan-500/5 rounded"
                                  >
                                    <span className="text-xs text-gray-300">{control.name}</span>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                                        control.status ? 'bg-cyan-500/30' : 'bg-gray-700'
                                      }`}
                                    >
                                      <motion.div 
                                        className="w-4 h-4 rounded-full bg-white"
                                        animate={{ x: control.status ? 20 : 0 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                      />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                              className="bg-gradient-to-br from-yellow-500/10 to-orange-600/5 rounded-lg p-4 border border-yellow-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Warning className="w-4 h-4 text-yellow-400" />
                                <span className="text-xs font-semibold text-yellow-300">Active Alerts</span>
                              </div>
                              <div className="space-y-2">
                                {[
                                  { level: 'warning', msg: 'Queue depth exceeding threshold' },
                                  { level: 'info', msg: 'Scheduled maintenance in 2h' },
                                  { level: 'warning', msg: 'Compliance review pending' }
                                ].map((alert, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                    className="flex items-start gap-2 p-2 bg-yellow-500/5 rounded border border-yellow-500/10"
                                  >
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                                      alert.level === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                                    }`} />
                                    <span className="text-[10px] text-gray-300">{alert.msg}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 }}
                              className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg p-4 border border-teal-500/20"
                            >
                              <div className="text-xs font-semibold text-teal-300 mb-2">System Health</div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-2xl font-bold text-white">98.7%</div>
                                  <div className="text-[10px] text-teal-400">Uptime</div>
                                </div>
                                <div className="w-16 h-16 relative">
                                  <svg className="w-full h-full -rotate-90">
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      fill="none"
                                      className="text-gray-700"
                                    />
                                    <motion.circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      fill="none"
                                      className="text-teal-400"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 0.987 }}
                                      transition={{ delay: 1.2, duration: 1 }}
                                      strokeDasharray="176"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Kriya - Advanced Building Blocks System */}
                    {activeTab === 'kriya' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                      >
                        <div className="grid grid-cols-12 gap-4 h-full">
                          {/* Left Panel - Component Library */}
                          <div className="col-span-4 space-y-3 overflow-y-auto">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-gradient-to-br from-orange-500/10 to-amber-600/5 rounded-xl p-4 border border-orange-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Package className="w-4 h-4 text-orange-400" />
                                <span className="text-xs font-semibold text-orange-300">Primitive Library</span>
                                <span className="ml-auto text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">189 Components</span>
                              </div>
                              
                              {/* Component Categories */}
                              <div className="space-y-2">
                                {[
                                  { icon: EnvelopeOpen, name: 'Notices', count: 24, color: 'orange' },
                                  { icon: Shield, name: 'Compliance', count: 18, color: 'amber' },
                                  { icon: Database, name: 'Data Ops', count: 36, color: 'yellow' },
                                  { icon: ChatCircle, name: 'Communication', count: 42, color: 'orange' },
                                  { icon: FileText, name: 'Documentation', count: 28, color: 'amber' },
                                  { icon: CheckCircle, name: 'Validation', count: 31, color: 'yellow' }
                                ].map((category, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    className="flex items-center gap-3 p-2 bg-gradient-to-r from-orange-500/5 to-transparent rounded-lg border border-orange-500/10 cursor-pointer"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                                      {React.createElement(category.icon, { className: 'w-4 h-4 text-orange-400' })}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-xs font-medium text-white">{category.name}</div>
                                      <div className="text-[10px] text-orange-400">{category.count} primitives</div>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: [0, 180, 360] }}
                                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                      className="w-4 h-4 rounded-full border-2 border-orange-500/30 border-t-orange-400"
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Center - Building Block Composer */}
                          <div className="col-span-5">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 }}
                              className="bg-gradient-to-br from-gray-800/30 to-orange-900/10 rounded-xl p-5 border border-white/5 h-full flex flex-col"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <PuzzlePiece className="w-5 h-5 text-orange-400" />
                                <span className="text-sm font-semibold text-white">Primitive Composer</span>
                                <motion.div
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="ml-auto text-xs text-orange-400 font-mono"
                                >
                                  BUILDING
                                </motion.div>
                              </div>
                              
                              {/* Visual Flow Builder */}
                              <div className="flex-1  rounded-lg border border-orange-500/10 p-4">
                                {/* Flow Diagram */}
                                <div className="relative h-full">
                                  {/* Connection Lines */}
                                  <svg className="absolute inset-0 w-full h-full">
                                    <defs>
                                      <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                                        <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                                      </linearGradient>
                                    </defs>
                                    
                                    {/* Animated connections */}
                                    {[
                                      { path: 'M 50 50 L 150 50', delay: 0 },
                                      { path: 'M 150 50 L 150 100', delay: 0.2 },
                                      { path: 'M 150 100 L 250 100', delay: 0.4 },
                                      { path: 'M 250 100 L 250 150', delay: 0.6 },
                                      { path: 'M 250 150 L 350 150', delay: 0.8 }
                                    ].map((conn, i) => (
                                      <motion.path
                                        key={i}
                                        d={conn.path}
                                        stroke="url(#orange-gradient)"
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.6 + conn.delay, duration: 0.5 }}
                                      />
                                    ))}
                                  </svg>
                                  
                                  {/* Building Blocks */}
                                  <div className="relative h-full">
                                    {[
                                      { x: 20, y: 30, icon: Database, label: 'Get Data' },
                                      { x: 120, y: 30, icon: Shield, label: 'Check Policy' },
                                      { x: 120, y: 80, icon: ChatCircle, label: 'Send Notice' },
                                      { x: 220, y: 80, icon: CheckCircle, label: 'Validate' },
                                      { x: 220, y: 130, icon: FileText, label: 'Log Action' },
                                      { x: 320, y: 130, icon: Hexagon, label: 'Complete' }
                                    ].map((block, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        whileHover={{ scale: 1.2, zIndex: 10 }}
                                        className="absolute w-20 h-20"
                                        style={{ left: block.x, top: block.y }}
                                      >
                                        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-3 border border-orange-500/30 flex flex-col items-center justify-center cursor-pointer">
                                          {React.createElement(block.icon, { className: 'w-6 h-6 text-orange-400 mb-1' })}
                                          <span className="text-[9px] text-gray-300">{block.label}</span>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Primitive Properties */}
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                {activeTabData.bullets.map((bullet, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 + i * 0.1 }}
                                    className="bg-orange-500/5 rounded-lg p-2 border border-orange-500/10"
                                  >
                                    <div className="text-[10px] text-orange-400 mb-1">Feature {i + 1}</div>
                                    <div className="text-[9px] text-gray-300 leading-relaxed">{bullet.substring(0, 80)}...</div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Right Panel - Primitive Details */}
                          <div className="col-span-3 space-y-3">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-4 border border-amber-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Code className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-semibold text-amber-300">Active Primitive</span>
                              </div>
                              
                              {/* Code Preview */}
                              <div className=" rounded-lg p-3 border border-amber-500/10 font-mono text-[10px] space-y-1">
                                <div className="text-amber-400">// Send Compliant Notice</div>
                                <div className="text-gray-400">primitive: <span className="text-orange-400">'notice.send'</span></div>
                                <div className="text-gray-400">data: <span className="text-cyan-400">['account', 'template']</span></div>
                                <div className="text-gray-400">rules: <span className="text-green-400">['FDCPA', 'TCPA']</span></div>
                                <div className="text-gray-400">channels: <span className="text-purple-400">['sms', 'email']</span></div>
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                              className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-4 border border-yellow-500/20"
                            >
                              <div className="text-xs font-semibold text-yellow-300 mb-2">Safety Boundaries</div>
                              <div className="space-y-1">
                                {[
                                  'Data access restricted',
                                  'Compliance enforced',
                                  'Audit trail enabled',
                                  'Rollback supported'
                                ].map((safety, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + i * 0.05 }}
                                    className="flex items-center gap-2 text-[10px] text-gray-300"
                                  >
                                    <CheckCircle className="w-3 h-3 text-yellow-400" />
                                    {safety}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 }}
                              className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl p-4 border border-orange-500/20"
                            >
                              <div className="text-xs font-semibold text-orange-300 mb-2">Composition Stats</div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-white">847</div>
                                  <div className="text-[10px] text-orange-400">Workflows</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-white">2.3M</div>
                                  <div className="text-[10px] text-orange-400">Executions</div>
                                </div>
                              </div>
                              
                              <div className="mt-3 w-full border border-gray-700 rounded-full h-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '87%' }}
                                  transition={{ delay: 1.0, duration: 0.8 }}
                                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full"
                                />
                              </div>
                              <div className="text-[10px] text-gray-400 mt-1">87% automation rate</div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Dynamic CTA Based on Tab */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-auto pt-4 border-t border-white/[0.05]"
                  >
                    <Link to={activeTabData.route}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                          activeTab === 'kendra' 
                            ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/40'
                            : activeTab === 'kula'
                            ? 'bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border-cyan-500/20 hover:border-cyan-500/40'
                            : activeTab === 'karta'
                            ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/20 hover:border-violet-500/40'
                            : activeTab === 'kupa'
                            ? 'bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20 hover:border-teal-500/40'
                            : 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20 hover:border-orange-500/40'
                        }`}
                      >
                        <span className={`font-semibold transition-colors group-hover:text-white ${
                          activeTab === 'kendra' ? 'text-emerald-400'
                            : activeTab === 'kula' ? 'text-cyan-400'
                            : activeTab === 'karta' ? 'text-violet-400'
                            : activeTab === 'kupa' ? 'text-teal-400'
                            : 'text-orange-400'
                        }`}>
                          {activeTabData.cta}
                        </span>
                        <ArrowRight className={`w-5 h-5 transition-all group-hover:translate-x-1 group-hover:text-white ${
                          activeTab === 'kendra' ? 'text-emerald-400'
                            : activeTab === 'kula' ? 'text-cyan-400'
                            : activeTab === 'karta' ? 'text-violet-400'
                            : activeTab === 'kupa' ? 'text-teal-400'
                            : 'text-orange-400'
                        }`} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PlatformSection
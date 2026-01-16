/**
 * KRIM AI - HOMEPAGE REDESIGN
 * Enterprise B2B Homepage for CROs, COOs, CTOs, Heads of Credit Ops
 * Safe Superintelligence for Credit Operations
 * 
 * Design: Enterprise-grade, clean, trustworthy, subtly futuristic
 * Accessibility: WCAG AA compliant with full keyboard navigation
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Lightning,
  Brain,
  Cpu,
  CloudArrowUp,
  LockKey,
  Eye,
  FileText,
  ChartLine,
  Users,
  TrendUp,
  Phone,
  Desktop,
  Headset,
  Database,
  Cloud,
  HardDrives,
  Package,
  Robot,
  Target,
  Gauge,
  Buildings,
  ChartBar,
  Lock,
  Shield,
  Timer,
  Coins,
  UserCheck,
  Graph,
  Briefcase,
  Bank,
  Scales,
  Warning
} from '@phosphor-icons/react'
import Button from '../components/Button'
import Heavy3DWrapper from '../components/Heavy3DWrapper'
import { Reveal } from '../components/Reveal'

// The Krim AI Stack tabs data with exact copy
const platformTabs = [
  { 
    id: 'kendra', 
    label: 'Kendra',
    icon: <Cpu className="w-5 h-5" />,
    title: 'Kendra',
    oneliner: 'The foundation that orchestrates everything',
    bullets: [
      'Multi-agent orchestration across all workflows',
      'Real-time governance and compliance enforcement',
      'Complete audit trail of every decision'
    ],
    visual: {
      type: 'architecture',
      description: 'Central orchestration layer managing all AI operations'
    }
  },
  { 
    id: 'kula', 
    label: 'Kula',
    icon: <Brain className="w-5 h-5" />,
    title: 'Kula',
    oneliner: 'The intelligence layer that learns and decides',
    bullets: [
      'Advanced ML models trained on credit operations',
      'Continuous learning from outcomes',
      'Non-hallucinating decision engine'
    ],
    visual: {
      type: 'neural',
      description: 'Intelligent decision-making system'
    }
  },
  { 
    id: 'karta', 
    label: 'Karta AI Co-Workers',
    icon: <Robot className="w-5 h-5" />,
    title: 'Karta AI Co-Workers',
    oneliner: 'Specialized agents that execute specific tasks',
    bullets: [
      'Pre-built agents for collections, service, and compliance',
      'Custom agent creation for your workflows',
      'Human-in-the-loop collaboration'
    ],
    visual: {
      type: 'agents',
      description: 'Specialized AI workforce'
    }
  },
  { 
    id: 'kupa', 
    label: 'Kupa Command Centers',
    icon: <Desktop className="w-5 h-5" />,
    title: 'Kupa Command Centers',
    oneliner: 'Where humans monitor and control AI operations',
    bullets: [
      'Real-time operational dashboards',
      'Performance monitoring and intervention',
      'Workflow design and management'
    ],
    visual: {
      type: 'dashboard',
      description: 'Unified control interface'
    }
  },
  { 
    id: 'kriya', 
    label: 'Kriya Primitives',
    icon: <Package className="w-5 h-5" />,
    title: 'Kriya Primitives',
    oneliner: 'Building blocks to create any workflow',
    bullets: [
      'Pre-built templates for common workflows',
      'API integrations to your existing systems',
      'Custom logic and rule engines'
    ],
    visual: {
      type: 'blocks',
      description: 'Composable workflow components'
    }
  }
]

// Integration partners with auto-scroll
const integrationPartners = [
  'Salesforce', 'ServiceNow', 'Snowflake', 'Databricks', 
  'AWS', 'Azure', 'Google Cloud', 'Twilio', 'Stripe', 
  'Plaid', 'Five9', 'Genesys', 'NICE', 'Zendesk',
  'MongoDB', 'PostgreSQL', 'Oracle', 'SAP', 'Microsoft 365'
]

export default function HomepageRedesign() {
  const [activeTab, setActiveTab] = useState('kendra')
  const [isVisible, setIsVisible] = useState(false)
  const tabPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const activeTabData = platformTabs.find(tab => tab.id === activeTab)

  return (
    <div className="relative bg-krim-deep-space min-h-screen overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <Heavy3DWrapper adaptive />
      </div>

      {/* 1. HERO SECTION - Ultra-simplified */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Copy */}
            <Reveal>
              <div className="space-y-8">
                {/* H1 - Only one on the page */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                  Safe Superintelligence for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-krim-cyan to-krim-mint">
                    Credit Operations
                  </span>
                </h1>

                {/* Subhead */}
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  A governed runtime that orchestrates AI co-workers while you stay in full control.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-krim-cyan hover:bg-krim-cyan/90 text-krim-deep-space font-semibold px-8 py-4 text-lg transition-all hover:shadow-lg hover:shadow-krim-cyan/20"
                    onClick={() => window.location.href = '/contact'}
                    aria-label="Book a demo of Krim AI"
                  >
                    Book a demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="border-2 border-krim-cyan/50 text-krim-cyan hover:bg-krim-cyan/10 px-8 py-4 text-lg transition-all"
                    onClick={() => document.getElementById('platform-section')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Learn more about the Krim AI Stack"
                  >
                    See the Krim AI Stack
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Right Column - Krim AI Stack Card */}
            <Reveal>
              <div className="relative">
                <motion.div 
                  className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-xl rounded-3xl border border-krim-cyan/30 p-8 shadow-2xl"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">The Krim AI Stack</h3>
                  
                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-3">
                    {['Kendra', 'Kula', 'Karta', 'Kupa', 'Kriya'].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-6 py-3 bg-gradient-to-r from-krim-cyan/10 to-krim-mint/10 border border-krim-cyan/30 rounded-full text-white font-medium hover:border-krim-cyan/50 transition-all cursor-default"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <p className="text-sm text-gray-400">
                      Five layers working together to deliver safe, governed AI automation
                    </p>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. WHAT KRIM AI RUNS FOR YOU Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                What Krim AI Runs for You
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                End-to-end automation across your entire credit operations stack
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contact Center Automation */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <Headset className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Contact Center Automation
                </h3>
                <p className="text-gray-400">
                  Sales, retention, collections, service and support
                </p>
              </motion.div>
            </Reveal>

            {/* Back-Office Automation */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Back-Office Automation
                </h3>
                <p className="text-gray-400">
                  Operations, risk, compliance, finance and legal workflows
                </p>
              </motion.div>
            </Reveal>

            {/* Safe Superintelligence Layer */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Safe Superintelligence Layer
                </h3>
                <p className="text-gray-400">
                  Non-hallucinating AI with strict data boundaries
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. THE KRIM AI STACK - Accessible Tabs */}
      <section id="platform-section" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                The Krim AI Stack
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Five integrated layers that work together to deliver safe, governed AI automation
              </p>
            </div>
          </Reveal>

          {/* Tab Navigation - WCAG AA Compliant */}
          <Reveal>
            <div 
              role="tablist" 
              aria-label="Krim AI Stack components"
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {platformTabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all
                    focus:outline-none focus:ring-2 focus:ring-krim-cyan focus:ring-offset-2 focus:ring-offset-krim-deep-space
                    ${activeTab === tab.id 
                      ? 'bg-krim-cyan text-krim-deep-space' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab Panels */}
          <AnimatePresence mode="wait">
            {activeTabData && (
              <motion.div
                key={activeTab}
                role="tabpanel"
                ref={tabPanelRef}
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left: Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {activeTabData.title}
                    </h3>
                    <p className="text-lg text-gray-300">
                      {activeTabData.oneliner}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {activeTabData.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                        <span className="text-gray-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/platform"
                    className="inline-flex items-center text-krim-cyan hover:text-krim-mint transition-colors font-medium"
                    aria-label={`Learn more about ${activeTabData.title}`}
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                {/* Right: Visual Diagram Card */}
                <div className="relative">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 min-h-[400px] flex items-center justify-center">
                    {/* Visual representation based on tab */}
                    <div className="text-center">
                      {activeTab === 'kendra' && (
                        <div className="space-y-4">
                          <Cpu className="w-24 h-24 text-krim-cyan mx-auto opacity-50" />
                          <p className="text-gray-400">Central orchestration managing all layers</p>
                        </div>
                      )}
                      {activeTab === 'kula' && (
                        <div className="space-y-4">
                          <Brain className="w-24 h-24 text-krim-cyan mx-auto opacity-50" />
                          <p className="text-gray-400">Intelligent decision engine</p>
                        </div>
                      )}
                      {activeTab === 'karta' && (
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="w-16 h-16 bg-gray-800/50 rounded-xl flex items-center justify-center">
                              <Robot className="w-8 h-8 text-krim-cyan opacity-50" />
                            </div>
                          ))}
                        </div>
                      )}
                      {activeTab === 'kupa' && (
                        <div className="space-y-4">
                          <Desktop className="w-24 h-24 text-krim-cyan mx-auto opacity-50" />
                          <p className="text-gray-400">Unified command and control</p>
                        </div>
                      )}
                      {activeTab === 'kriya' && (
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="w-12 h-12 bg-gradient-to-br from-krim-cyan/20 to-krim-mint/20 rounded-lg" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. WHY CREDIT OPERATIONS NEED A NEW STACK */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Credit Operations Need a New Stack
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Work is fragmented */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Warning className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Work is fragmented and manual
                </h3>
                <p className="text-gray-400 mb-6">
                  Teams use 10+ disconnected tools. Agents toggle between screens. 
                  Data doesn't flow. Workflows break. Customers wait.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span>70% of agent time spent on manual tasks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span>15+ minutes average handle time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span>5-7 touchpoints per resolution</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* GenAI is powerful but hard to govern */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  GenAI is powerful but hard to govern
                </h3>
                <p className="text-gray-400 mb-6">
                  Point solutions create risk. No audit trails. Hallucinations happen. 
                  Compliance teams can't keep up. Trust erodes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>No visibility into AI decisions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Compliance violations from hallucinations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Shadow AI creating security risks</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. IMPACT Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                The Impact
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Measurable outcomes across your entire operation
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Coins className="w-8 h-8" />,
                title: "Lower cost to serve",
                metric: "50% reduction",
                description: "in operational costs"
              },
              {
                icon: <Timer className="w-8 h-8" />,
                title: "Faster resolution",
                metric: "3x faster",
                description: "case resolution"
              },
              {
                icon: <UserCheck className="w-8 h-8" />,
                title: "Better customer outcomes",
                metric: "85% CSAT",
                description: "customer satisfaction"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Stronger compliance posture",
                metric: "100% adherence",
                description: "to regulations"
              },
              {
                icon: <Graph className="w-8 h-8" />,
                title: "Continuous learning",
                metric: "15% monthly",
                description: "performance gains"
              }
            ].map((item, index) => (
              <Reveal key={index}>
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-6 text-center hover:border-krim-cyan/40 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-krim-cyan">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="text-2xl font-bold text-krim-cyan mb-1">
                    {item.metric}
                  </div>
                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTEGRATIONS Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Works with Your Existing Stack
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Seamlessly integrates with your systems. No rip and replace.
              </p>
            </div>
          </Reveal>

          {/* Auto-scrolling logo carousel */}
          <div className="relative mb-16">
            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-8"
                animate={{ x: [0, -1920] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[...integrationPartners, ...integrationPartners].map((partner, index) => (
                  <div 
                    key={`${partner}-${index}`} 
                    className="flex-shrink-0 px-8 py-4 bg-gray-900/50 rounded-lg border border-gray-800"
                  >
                    <span className="text-gray-400 font-medium whitespace-nowrap">{partner}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Two-column capabilities */}
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Your systems</h3>
                <ul className="space-y-4">
                  {[
                    'CRM and customer data platforms',
                    'Contact center and telephony',
                    'Core banking and loan systems',
                    'Data warehouses and analytics',
                    'Communication channels'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Krim's role</h3>
                <ul className="space-y-4">
                  {[
                    'Unified orchestration layer on top',
                    'Real-time data synchronization',
                    'Bi-directional API integrations',
                    'Event-driven automation triggers',
                    'Zero disruption to existing workflows'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. SECURITY, GOVERNANCE & NON-HALLUCINATION */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Security, Governance & Validation Controls
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Enterprise-grade security with complete transparency and control
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Data & Access */}
            <Reveal>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-krim-cyan/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-7 h-7 text-krim-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Data & access
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">SOC 2 Type II certified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">End-to-end encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Zero-trust architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Role-based access control</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Governance & Audit */}
            <Reveal>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-krim-cyan/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-krim-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Governance & audit
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Complete audit trail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Decision explainability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Compliance reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Real-time monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Model Safety */}
            <Reveal>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-krim-cyan/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-krim-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Model safety
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Non-hallucinating models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Grounded in your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Continuous validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                      <span className="text-sm">Human oversight built-in</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust badges */}
          <Reveal>
            <div className="mt-16 pt-12 border-t border-gray-800">
              <div className="flex flex-wrap justify-center gap-8">
                {['SOC 2 Type II', 'HIPAA Compliant', 'PCI DSS', 'ISO 27001', 'GDPR Ready'].map((badge) => (
                  <div key={badge} className="px-6 py-3 bg-gray-900/50 rounded-lg border border-gray-800">
                    <span className="text-sm text-gray-400 font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. DEPLOYMENT Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Deploy Your Way
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Flexible deployment options to meet your security and compliance requirements
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Multi-tenant cloud */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <Cloud className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Multi-tenant cloud
                </h3>
                <p className="text-gray-400 mb-4">
                  Fastest time to value with our managed cloud infrastructure
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Deploy in minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Automatic updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>99.99% uptime SLA</span>
                  </li>
                </ul>
              </motion.div>
            </Reveal>

            {/* Single-tenant VPC */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <CloudArrowUp className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Single-tenant VPC
                </h3>
                <p className="text-gray-400 mb-4">
                  Dedicated infrastructure in your cloud environment
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Isolated resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Custom configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Your security policies</span>
                  </li>
                </ul>
              </motion.div>
            </Reveal>

            {/* On-prem / private cloud */}
            <Reveal>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-krim-cyan/20 p-8 hover:border-krim-cyan/40 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-6">
                  <HardDrives className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  On-prem / private cloud
                </h3>
                <p className="text-gray-400 mb-4">
                  Complete control with deployment in your data centers
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Air-gapped option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>Full data sovereignty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-1.5 flex-shrink-0" />
                    <span>White-glove support</span>
                  </li>
                </ul>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative">
              {/* Rich gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-krim-cyan/10 via-krim-mint/5 to-transparent rounded-3xl" />
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-krim-cyan/30 p-12 lg:p-16 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Execution becomes autonomous.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-krim-cyan to-krim-mint">
                    Control stays absolute.
                  </span>
                </h2>
                
                <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
                  Join leading credit operations teams who are transforming their operations with Krim AI's 
                  safe superintelligence platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-krim-cyan hover:bg-krim-cyan/90 text-krim-deep-space font-semibold px-8 py-4 text-lg transition-all hover:shadow-lg hover:shadow-krim-cyan/20"
                    onClick={() => window.location.href = '/contact'}
                    aria-label="Book a demo of Krim AI"
                  >
                    Book a demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-krim-cyan hover:text-krim-mint transition-colors"
                    aria-label="Talk to our team about your portfolio"
                  >
                    Or talk to our team about your portfolio
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      SOC 2 Type II
                    </span>
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Bank-grade security
                    </span>
                    <span className="flex items-center gap-2">
                      <Scales className="w-4 h-4" />
                      CFPB compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
/**
 * Krim AI - PRECISION HOMEPAGE 
 * Sharp, focused, no bullshit
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import StunningIntegrationsSection from '../components/home/StunningIntegrationsSection'

// Import REBUILT visual components V2
import KendraVisualV2 from '../components/motion/krim-stack/KendraVisualV2'
import KulaVisualV2 from '../components/motion/krim-stack/KulaVisualV2'
import KartaVisualV2 from '../components/motion/krim-stack/KartaVisualV2'
import KupaVisualV2 from '../components/motion/krim-stack/KupaVisualV2'
import KriyaVisualV2 from '../components/motion/krim-stack/KriyaVisualV2'

import { 
  ShieldCheck, 
  Lightning, 
  Lock,
  Eye,
  CheckCircle,
  Warning,
  Brain,
  Users,
  Desktop,
  Cloud,
  FileText,
  Target,
  Cube
} from '@phosphor-icons/react'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Check for reduced motion
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Sharp Tab Component
function PillTab({ 
  isActive, 
  children, 
  onClick 
}: { 
  isActive: boolean
  children: React.ReactNode
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`px-6 py-3 rounded-full text-base font-semibold whitespace-nowrap relative overflow-hidden transition-all duration-300 ${
        isActive
          ? 'text-white border-2 border-emerald-400/60 bg-gradient-to-r from-emerald-400/15 to-cyan-400/10'
          : 'text-white/70 border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Tightened Krim AI Stack Section
function KrimAIStackSection() {
  const [activeTab, setActiveTab] = useState('kendra')

  const tabs = [
    { id: 'krimos', label: 'Kendra' },
    { id: 'kula', label: 'Kula' },
    { id: 'karta', label: 'Karta' },
    { id: 'kupa', label: 'Kupa' },
    { id: 'kriya', label: 'Kriya' }
  ]

  const tabContent = {
    krimos: {
      title: "Kendra – Governed Runtime for Credit Operations",
      subtitle: "Turns your fragmented credit stack into one controlled operating layer for humans and AI.",
      visual: <KendraVisualV2 />
    },
    kula: {
      title: "Kula – Natural-Language Digital Twin for Credit Teams",
      subtitle: "Lets leaders design, query and adjust operations in plain language, then push governed changes into production.",
      visual: <KulaVisualV2 />
    },
    karta: {
      title: "Karta – AI Co-Workers for Conversations and Cases",
      subtitle: "Takes on contact-center and back-office work under strict policies, with full auditability and human oversight.",
      visual: <KartaVisualV2 />
    },
    kupa: {
      title: "Kupa – Command Centers for Live Oversight", 
      subtitle: "Gives credit teams tailored dashboards for real-time visibility and precise control over every workflow and AI co-worker.",
      visual: <KupaVisualV2 />
    },
    kriya: {
      title: "Kriya – Building Blocks of Safe Agentic Automation",
      subtitle: "Defines what AI can see, decide and do so behaviour stays explainable, testable and compliant by design.",
      visual: <KriyaVisualV2 />
    }
  }

  return (
    <section className="py-16 md:py-20" style={{ minHeight: '720px', maxHeight: '80vh' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header - Tightened */}
        <div className="mb-12">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
              The Krim Stack
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Five layers that turn <span className="text-krim-mint font-semibold">credit operations</span> into 
              a <span className="text-krim-mint font-semibold">governed, intelligence runtime</span>.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => (
            <PillTab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </PillTab>
          ))}
        </motion.div>

        {/* 50/50 Content Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[580px] max-h-[580px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center space-y-6 pr-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {tabContent[activeTab as keyof typeof tabContent].subtitle}
                </p>
                
                {/* Key Mechanisms */}
                <div className="space-y-3">
                  {activeTab === 'kendra' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">10-stage validation pipeline enforces policy compliance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">7-level hierarchy prevents agent autonomy override</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Deterministic fallbacks catch AI errors before execution</span>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'kula' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Plain English becomes executable governance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Runtime policy changes without retraining</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Complete audit trail for examiner review</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'karta' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">FDCPA/TCPA constraints built into agent behavior</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Human oversight with real-time override controls</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Every conversation logged for compliance audit</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'kupa' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Live policy enforcement monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Override any decision in real-time</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Trace every decision from trigger to outcome</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'kriya' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Compliance constraints baked into primitives</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Explainable logic chains for regulators</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Testable components with predictable behavior</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="w-full h-full p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {tabContent[activeTab as keyof typeof tabContent].visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Homepage Component - REBUILT
export default function HomePageNewFixed() {
  return (
    <div className="min-h-screen relative">
      {/* Content wrapper */}
      <div className="relative z-10 overflow-x-hidden">
        
        {/* Hero Section - SHARP AND FOCUSED */}
        <section className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-20 md:py-32 overflow-hidden">
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16"
            >
              {/* Krim AI Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex justify-center"
              >
                <KrimAnimatedLogo size="xl" className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32" />
              </motion.div>

              <div className="space-y-8 lg:space-y-10 text-center max-w-6xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-center">
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                    Safe Superintelligence
                  </span>
                  {' '}
                  <span className="text-white">
                    for Credit Operations
                  </span>
                </h1>

                <div className="space-y-4 lg:space-y-6">
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed text-center">
                    <span className="text-white/80">A</span> <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-semibold">governed runtime</span> <span className="text-white/80">where every AI decision</span> 
                    <br />
                    <span className="text-white/80">passes through</span> <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-semibold">10 validation gates</span> <span className="text-white/80">before execution</span>.
                  </p>

                  <p className="text-lg md:text-xl max-w-3xl mx-auto font-semibold text-center">
                    <span className="text-white/80">AI errors caught before action.</span>
                    <br />
                    <span className="text-white/80">No compliance violations.</span> <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Only deterministic results</span>.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 lg:pt-16 w-full">
                <Link to="/contact" className="flex justify-center">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    className="px-8 py-4 bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-lg rounded-2xl hover:shadow-[0_12px_48px_rgba(0,255,136,0.3)] transition-all duration-300"
                  >
                    Book a demo
                  </motion.button>
                </Link>
                
                <Link to="/safe-superintelligence" className="flex justify-center">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    className="px-8 py-4 rounded-2xl border-2 border-krim-mint/50 text-krim-mint font-bold text-lg hover:bg-krim-mint/10 hover:border-krim-mint/70 transition-all duration-300"
                  >
                    See how Krim works
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Krim Stack Section */}
        <KrimAIStackSection />

        {/* Why Credit Operations Need a New Runtime - TIGHTENED */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <motion.div {...fadeInUp}>
                <div className="flex justify-center mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center leading-tight">
                    <span className="text-slate-200">
                      Why Credit Operations Need a
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-black">
                      New Runtime
                    </span>
                  </h2>
                </div>
                <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed text-center">
                  Legacy systems, manual work and black-box AI no longer keep up with today's credit risk.
                </p>
              </motion.div>
            </div>

            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 justify-items-center"
            >
              <motion.div 
                {...fadeInUp}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-red-500/[0.08] to-transparent backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 transition-all duration-500 h-full group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Cube className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Fragmented Tools</h3>
                  <p className="text-base text-white/70 leading-relaxed">Agents jump between 10+ systems; data sits in silos.</p>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-orange-500/[0.08] to-transparent backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-500 h-full group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Human Middleware</h3>
                  <p className="text-base text-white/70 leading-relaxed">People patch broken workflows and carry institutional memory.</p>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500 h-full group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Post-Fact Compliance</h3>
                  <p className="text-base text-white/70 leading-relaxed">Most activity is checked after the fact – if at all.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Integrations Section */}
        <StunningIntegrationsSection />

        {/* Governance & Security - TIGHTENED */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Built for Regulated Financial Services
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                SOC 2 Type II compliance, enterprise security controls, and deterministic governance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Governance */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  Governance
                </h3>
                <p className="text-lg text-white/70 mb-6">
                  Every action logged, every decision explainable, every outcome auditable.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Complete Audit Trails</h4>
                      <p className="text-white/70 text-sm">Every AI decision includes full policy validation chain</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Real-time Monitoring</h4>
                      <p className="text-white/70 text-sm">Live policy enforcement and compliance dashboards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Granular Controls</h4>
                      <p className="text-white/70 text-sm">Override decisions, adjust policies, trace actions</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Security & Deployment */}
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                  Deployment & Security
                </h3>
                <p className="text-lg text-white/70 mb-6">
                  Enterprise security requirements with flexible deployment options.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Cloud className="w-6 h-6 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Multi-Cloud Support</h4>
                      <p className="text-white/70 text-sm">AWS, Azure, Google Cloud with data residency controls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Enterprise Security</h4>
                      <p className="text-white/70 text-sm">SOC 2 Type II with encryption at rest and in transit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Desktop className="w-6 h-6 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">On-Premise Option</h4>
                      <p className="text-white/70 text-sm">Air-gapped deployment for maximum security</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA - SHARP */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                See it in action
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Contact our team to explore how Krim AI can transform your credit operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact" className="flex justify-center">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-krim-mint to-cyan-500 text-black font-bold text-lg hover:shadow-[0_12px_48px_rgba(0,255,136,0.3)] transition-all duration-300"
                  >
                    Book demo
                  </motion.button>
                </Link>
                
                <Link to="/kendra" className="flex justify-center">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    className="px-10 py-5 rounded-2xl border-2 border-emerald-400/50 text-emerald-400 font-bold text-lg hover:bg-emerald-400/10 hover:border-emerald-400/70 hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)] transition-all duration-300"
                  >
                    Explore platform
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
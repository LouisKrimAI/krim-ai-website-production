/**
 * Krim AI - Enterprise-Grade Homepage with Safe Superintelligence Focus
 * Clean, credible presentation for enterprise executives
 */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import StunningIntegrationsSection from '../components/home/StunningIntegrationsSection'

// Import the new premium visual components V2
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
  Target
} from '@phosphor-icons/react'

// Shared animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Enhanced Tab Component for 50/50 layout
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

// Enhanced Feature Card Component
function FeatureCard({ 
  title, 
  body, 
  icon, 
  accentColor = 'emerald' 
}: { 
  title: string
  body: string
  icon: React.ReactNode
  accentColor?: 'emerald' | 'cyan' | 'violet' | 'red'
}) {
  const accentStyles = {
    emerald: 'border-emerald-400/20 hover:border-emerald-400/40 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
    cyan: 'border-cyan-400/20 hover:border-cyan-400/40 hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]',
    violet: 'border-violet-400/20 hover:border-violet-400/40 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]',
    red: 'border-red-400/20 hover:border-red-400/40 hover:shadow-[0_8px_32px_rgba(239,68,68,0.15)]'
  }

  const iconColors = {
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    violet: 'text-violet-400',
    red: 'text-red-400'
  }

  return (
    <motion.div 
      {...fadeInUp}
      className={`relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border ${accentStyles[accentColor]} transition-all duration-500 h-full group`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col space-y-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center ${iconColors[accentColor]}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
        <p className="text-base text-white/70 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  )
}

// Enhanced Krim AI Stack Section with 50/50 Layout
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
        {/* Section Header */}
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
                
                {/* Key Benefits - Mechanism Focused */}
                <div className="space-y-3">
                  {activeTab === 'kendra' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Every action passes through 10-stage validation pipeline</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">7-level policy hierarchy enforces compliance constraints</span>
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
                        <span className="text-white/70">Natural language transforms into governed workflows</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Runtime policy updates without model retraining</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Complete audit trail for regulatory review</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'karta' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Agents operate within FDCPA/TCPA boundaries</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Human oversight with granular override controls</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Full conversation transcripts for compliance audit</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'kupa' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Real-time policy enforcement monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Instant override capabilities for any decision</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Complete decision traceability from trigger to outcome</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'kriya' && (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Compliance constraints built into automation primitives</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Explainable logic chains for regulatory examination</span>
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

// Main Homepage Component
export default function HomePageNew() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-x-hidden">
      {/* Particle Universe Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-black/90" />
        <div className="absolute inset-0 bg-[url('/space-pattern.svg')] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...stagger} className="text-center space-y-6">
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  Safe Superintelligence<br />
                  <span className="bg-gradient-to-r from-krim-mint via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    for Credit Operations
                  </span>
                </h1>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  Governance constraints precede agent intelligence.
                </p>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-krim-mint to-cyan-500 text-black font-bold text-lg hover:shadow-[0_12px_48px_rgba(0,255,136,0.3)] transition-all duration-300"
                  >
                    Book a Demo
                  </motion.button>
                </Link>
                
                <Link to="/safe-superintelligence">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    className="px-8 py-4 rounded-2xl border-2 border-emerald-400/50 text-emerald-400 font-bold text-lg hover:bg-emerald-400/10 hover:border-emerald-400/70 transition-all duration-300"
                  >
                    See How It Works
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Krim Stack Section */}
        <KrimAIStackSection />

        {/* Safe Superintelligence Section - Streamlined */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Governance Before Intelligence
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                10 validation stages. Explicit policies. Deterministic outcomes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/20">
                <h4 className="text-xl font-bold text-emerald-300 mb-4">Predictable at Scale</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Policies enforced exactly</li>
                  <li>• Circuit breakers stop AI hallucinations from becoming customer incidents</li>
                  <li>• Controlled automation depth</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20">
                <h4 className="text-xl font-bold text-blue-300 mb-4">Regulatory Confidence</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Complete explainability</li>
                  <li>• Full traceability</li>
                  <li>• Real-time dashboards</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-400/20">
                <h4 className="text-xl font-bold text-violet-300 mb-4">Operational Control</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Runtime policy updates</li>
                  <li>• Granular overrides</li>
                  <li>• Constraint-based optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
                Current AI Wasn't Built for Credit Operations
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                Generic AI operates on probabilities. Credit operations demand determinism.
              </p>
            </motion.div>

            <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={<Warning size={24} />}
                title="No policy hierarchy"
                body="Agent intelligence overrides business rules"
                accentColor="red"
              />
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Post-hoc governance"
                body="Guardrails added after model training"
                accentColor="red"
              />
              <FeatureCard
                icon={<Eye size={24} />}
                title="Black-box decisions"
                body="No traceable logic for compliance"
                accentColor="red"
              />
            </motion.div>

          </div>
        </section>


        {/* Why Section - Three Key Benefits */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Safe Superintelligence
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Safer */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <FeatureCard
                  icon={<ShieldCheck size={32} />}
                  title="Safer"
                  body="Policies are foundation. Compliance violations structurally impossible."
                  accentColor="emerald"
                />
              </motion.div>

              {/* Faster */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <FeatureCard
                  icon={<Lightning size={32} />}
                  title="Faster"
                  body="No learning cycles. No fine-tuning delays. Instant deployment."
                  accentColor="cyan"
                />
              </motion.div>

              {/* Self-Evolving */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <FeatureCard
                  icon={<Brain size={32} />}
                  title="Self-Evolving"
                  body="Policies get smarter. Intelligence adapts to your operations."
                  accentColor="violet"
                />
              </motion.div>
            </div>
          </div>
        </section>


        {/* Integrations Section */}
        <StunningIntegrationsSection />

        {/* Governance & Security Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Enterprise Governance & Security
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                Built for regulated financial services with enterprise security controls.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Governance */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                  Governance
                </h3>
                <p className="text-lg text-white/70 mb-8">
                  Every action is logged, every decision is explainable, every outcome is auditable.
                </p>
                <div className="space-y-6">
                  <FeatureCard
                    icon={<FileText size={24} />}
                    title="Complete Audit Trails"
                    body="Every AI decision includes full policy chain validation with timestamps and reasoning"
                    accentColor="emerald"
                  />
                  <FeatureCard
                    icon={<Eye size={24} />}
                    title="Real-time Monitoring"
                    body="Live dashboards show policy enforcement status and compliance metrics"
                    accentColor="emerald"
                  />
                  <FeatureCard
                    icon={<Target size={24} />}
                    title="Granular Controls"
                    body="Override any decision, adjust any policy, trace any action in real-time"
                    accentColor="emerald"
                  />
                </div>
              </motion.div>

              {/* Security & Deployment */}
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                  Security & Deployment
                </h3>
                <p className="text-lg text-white/70 mb-8">
                  Flexible deployment options for every enterprise security requirement.
                </p>
                <div className="space-y-6">
                  <FeatureCard
                    icon={<Cloud size={24} />}
                    title="Multi-Cloud Support"
                    body="Deploy on AWS, Azure, or Google Cloud with full data residency controls"
                    accentColor="violet"
                  />
                  <FeatureCard
                    icon={<Lock size={24} />}
                    title="Enterprise Security"
                    body="Encryption at rest and in transit with enterprise-grade controls"
                    accentColor="violet"
                  />
                  <FeatureCard
                    icon={<Desktop size={24} />}
                    title="On-Premise Option"
                    body="Air-gapped deployment for maximum security and data control"
                    accentColor="violet"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Ready to Deploy Safe Superintelligence?
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                See how governance constraints enable superintelligent automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-krim-mint to-cyan-500 text-black font-bold text-lg hover:shadow-[0_12px_48px_rgba(0,255,136,0.3)] transition-all duration-300"
                  >
                    Request Technical Documentation
                  </motion.button>
                </Link>
                
                <Link to="/safe-superintelligence">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    className="px-10 py-5 rounded-2xl border-2 border-emerald-400/50 text-emerald-400 font-bold text-lg hover:bg-emerald-400/10 hover:border-emerald-400/70 transition-all duration-300"
                  >
                    Review Governance Architecture
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
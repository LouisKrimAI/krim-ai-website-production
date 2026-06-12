/**
 * Banking domain page — KrimOS applied to lending operations end to end.
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Lightning, TrendUp,
  Cube, Users, Building, Lock, CheckCircle,
  ChartBar, Headset, Phone, FileText,
  Scales, Database, Eye, Target, Handshake,
  ArrowRight, CurrencyDollar, Clock, WarningCircle
} from '@phosphor-icons/react'

// Import motion components
import { StarfieldLayout, StarfieldSection } from '../../components/motion/StarfieldLayout'
import { Reveal, StaggerGrid, HoverLiftCard, GlassContainer } from '../../components/motion/primitives'
import Button from '../../components/Button'

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

/**
 * HERO SECTION
 */
function BankingHero() {
  return (
    <StarfieldSection glassLevel="ultraLight" className="relative py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <motion.div className="space-y-8" {...fadeInUp}>
            <div className="space-y-6">
              <p className="brand-eyebrow text-krim-ochre">KrimOS for Banking</p>
              <h1 className="brand-serif text-krim-off-white text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-tight [hyphens:none]">
                Lending operations, <span className="italic text-krim-ochre">governed end to end</span>.
              </h1>

              <p className="brand-sans text-krim-off-white/75 text-lg md:text-xl leading-relaxed max-w-xl">
                From origination to collections, KrimOS runs the work and validates every action
                against policy before it fires.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-krim-ochre text-krim-indigo font-semibold transition-transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Request a demo
                <ArrowRight weight="bold" className="ml-1 transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual Stack */}
          <motion.div {...fadeInUp} className="lg:block hidden">
            <div className="relative w-full max-w-2xl">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 backdrop-blur-xl">
                <div className="space-y-3">
                  {[
                    { name: 'AI Applications', desc: 'Kula, Karta, Kupa, Kriya', icon: '🧠' },
                    { name: 'Application Intelligence', desc: 'APIs, Orchestration, Governance', icon: '⚡' },
                    { name: 'Kendra Runtime', desc: 'KrimOS Core™ Runtime', icon: '🔷', highlight: true },
                    { name: 'Foundation Models', desc: 'GPT, Claude, Gemini, Llama', icon: '🎯' },
                    { name: 'Infrastructure', desc: 'Cloud, VPC, On-Premise', icon: '🏗️' }
                  ].map((layer, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className={layer.highlight ? "relative" : ""}
                    >
                      {layer.highlight ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-lg blur-sm" />
                          <div className="relative p-4 rounded-lg bg-gradient-to-r from-krim-mint/5 to-krim-cyan/5 border-2 border-krim-cyan/40">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{layer.icon}</span>
                                <div>
                                  <span className="text-xs font-mono text-krim-cyan/80">INTELLIGENCE LAYER</span>
                                  <span className="text-sm font-semibold text-white ml-2">{layer.name}</span>
                                </div>
                              </div>
                              <Lightning className="w-4 h-4 text-krim-mint/60" />
                            </div>
                            <div className="text-xs text-krim-mint/70 mt-1 ml-9">{layer.desc}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-lg bg-slate-900/30 border border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{layer.icon}</span>
                            <div>
                              <span className="text-xs font-mono text-white/70">{layer.name}</span>
                              <span className="text-sm text-white/80 ml-2">{layer.desc}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </StarfieldSection>
  )
}

/**
 * PROBLEM SECTION - Banking-Specific Pain Points
 */
function ProblemSection() {
  const problems = [
    {
      icon: <Cube className="w-8 h-8" />,
      title: "Fragmented tools",
      desc: "Disconnected systems force manual context-switching.",
      color: "emerald",
      stat: "Disconnected"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Knowledge drain",
      desc: "High staff churn means institutional knowledge walks out the door.",
      color: "cyan",
      stat: "Costly"
    },
    {
      icon: <WarningCircle className="w-8 h-8" />,
      title: "After-the-fact compliance",
      desc: "Rules enforced only after the action has fired.",
      color: "mint",
      stat: "Late"
    },
    {
      icon: <TrendUp className="w-8 h-8" />,
      title: "Brittle at scale",
      desc: "Manual workflows break under loan volume and complexity.",
      color: "amber",
      stat: "Brittle"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Slow Deployment",
      desc: "Policy changes take months to roll across legacy systems.",
      color: "red",
      stat: "3mo+"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "System Brittleness",
      desc: "Knowledge silos in custom code and spreadsheets make changes risky.",
      color: "purple",
      stat: "↑Risk"
    }
  ]

  const colorClasses = {
    emerald: {
      bg: 'from-emerald-500/[0.06] to-emerald-600/[0.03]',
      border: 'border-emerald-400/15 group-hover:border-emerald-400/35',
      icon: 'text-emerald-400',
      accent: 'via-emerald-400/50'
    },
    cyan: {
      bg: 'from-cyan-500/[0.06] to-cyan-600/[0.03]',
      border: 'border-cyan-400/15 group-hover:border-cyan-400/35',
      icon: 'text-cyan-400',
      accent: 'via-cyan-400/50'
    },
    mint: {
      bg: 'from-[#00FF88]/[0.06] to-[#00FF88]/[0.03]',
      border: 'border-[#00FF88]/15 group-hover:border-[#00FF88]/35',
      icon: 'text-[#00FF88]',
      accent: 'via-[#00FF88]/50'
    },
    amber: {
      bg: 'from-amber-500/[0.06] to-amber-600/[0.03]',
      border: 'border-amber-400/15 group-hover:border-amber-400/35',
      icon: 'text-amber-400',
      accent: 'via-amber-400/50'
    },
    red: {
      bg: 'from-red-500/[0.06] to-red-600/[0.03]',
      border: 'border-red-400/15 group-hover:border-red-400/35',
      icon: 'text-red-400',
      accent: 'via-red-400/50'
    },
    purple: {
      bg: 'from-purple-500/[0.06] to-purple-600/[0.03]',
      border: 'border-purple-400/15 group-hover:border-purple-400/35',
      icon: 'text-purple-400',
      accent: 'via-purple-400/50'
    }
  }

  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-white">Banking's Core </span>
            <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              Challenges
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Legacy systems, manual work, and fragmented tools keep banks trapped in operational debt.
          </p>
        </Reveal>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {problems.map((problem, idx) => {
            const colors = colorClasses[problem.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="group relative h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative p-8 rounded-2xl h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl`} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-2xl" />
                  <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
                  <div className={`absolute inset-0 rounded-2xl border ${colors.border} transition-colors duration-500`} />

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="h-[64px] mb-5">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${colors.icon}`}>
                        {problem.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{problem.title}</h3>
                    <p className="text-base text-white/70 leading-relaxed flex-1">{problem.desc}</p>
                    {problem.stat && (
                      <div className="pt-6 text-3xl font-black text-white/40">{problem.stat}</div>
                    )}
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${colors.accent} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
                </div>
              </motion.div>
            )
          })}
        </StaggerGrid>
      </div>
    </StarfieldSection>
  )
}

/**
 * SOLUTION SECTION - How KrimOS Solves Banking Challenges
 */
function SolutionSection() {
  const solutions = [
    {
      product: "Kendra",
      title: "Governed Runtime",
      desc: "AI for credit, servicing, collections with guardrails and audit trails.",
      benefits: ["Policy enforcement", "Full audit trail", "Real-time observability"],
      color: "emerald"
    },
    {
      product: "Kula",
      title: "Policy Interface",
      desc: "Define rules in plain language; changes deploy instantly without code.",
      benefits: ["No-code rule definition", "Instant rollout", "Self-documenting"],
      color: "cyan"
    },
    {
      product: "Karta",
      title: "AI Agents",
      desc: "Handles calls, emails, documents across channels. Observable and auditable.",
      benefits: ["Multi-channel", "20+ pre-built", "Auditable decisions"],
      color: "mint"
    },
    {
      product: "Kupa",
      title: "Command Center",
      desc: "Live visibility into workflows. Override agent decisions with full audit.",
      benefits: ["Real-time monitoring", "Instant overrides", "Audit trail"],
      color: "amber"
    },
    {
      product: "Kriya",
      title: "Workflow Blocks",
      desc: "Pre-built banking automation with compliance baked in.",
      benefits: ["Compliance built-in", "Pre-tested logic", "Observable"],
      color: "purple"
    }
  ]

  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              Five Products
            </span>
            <br />
            <span className="text-white">One Governed Platform</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Turn fragmented operations into a unified, governed intelligence runtime.
          </p>
        </Reveal>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="group relative h-full"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative p-6 rounded-2xl h-full overflow-hidden flex flex-col">
                {/* Background layers */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent rounded-2xl ${
                  solution.color === 'emerald' ? 'from-emerald-500/10' :
                  solution.color === 'cyan' ? 'from-cyan-500/10' :
                  solution.color === 'mint' ? 'from-[#00FF88]/10' :
                  solution.color === 'amber' ? 'from-amber-500/10' :
                  'from-purple-500/10'
                }`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-2xl" />
                <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
                <div className={`absolute inset-0 rounded-2xl border ${
                  solution.color === 'emerald' ? 'border-emerald-400/20 group-hover:border-emerald-400/40' :
                  solution.color === 'cyan' ? 'border-cyan-400/20 group-hover:border-cyan-400/40' :
                  solution.color === 'mint' ? 'border-[#00FF88]/20 group-hover:border-[#00FF88]/40' :
                  solution.color === 'amber' ? 'border-amber-400/20 group-hover:border-amber-400/40' :
                  'border-purple-400/20 group-hover:border-purple-400/40'
                } transition-colors duration-500`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-[28px] mb-5">
                    <div className={`text-sm font-bold font-mono tracking-widest ${
                      solution.color === 'emerald' ? 'text-emerald-400' :
                      solution.color === 'cyan' ? 'text-cyan-400' :
                      solution.color === 'mint' ? 'text-[#00FF88]' :
                      solution.color === 'amber' ? 'text-amber-400' :
                      'text-purple-400'
                    }`}>
                      {solution.product}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{solution.title}</h3>
                  <p className="text-sm text-white/70 flex-1 leading-relaxed">{solution.desc}</p>

                  <div className="space-y-2 pt-6">
                    {solution.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          solution.color === 'emerald' ? 'text-emerald-400' :
                          solution.color === 'cyan' ? 'text-cyan-400' :
                          solution.color === 'mint' ? 'text-[#00FF88]' :
                          solution.color === 'amber' ? 'text-amber-400' :
                          'text-purple-400'
                        }`} />
                        <span className="text-xs text-white/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </StarfieldSection>
  )
}

/**
 * USE CASES SECTION
 */
function UseCasesSection() {
  const useCases = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Credit decisions",
      desc: "Real-time approvals with full audit trails.",
      metrics: ["Compliant by design", "Real-time decisioning", "Fully audited"]
    },
    {
      icon: <Headset className="w-8 h-8" />,
      title: "Loan servicing",
      desc: "Automate payments, delinquency, and borrower comms at scale.",
      metrics: ["Hands-off", "Always on", "Governed end to end"]
    },
    {
      icon: <CurrencyDollar className="w-8 h-8" />,
      title: "Collections",
      desc: "Multi-channel outreach with rule enforcement and override capability.",
      metrics: ["FDCPA-safe", "45% uplift", "Auditable"]
    },
    {
      icon: <ChartBar className="w-8 h-8" />,
      title: "Delinquency Management",
      desc: "Track status and intervene automatically before escalation.",
      metrics: ["Real-time tracking", "Early intervention", "Compliant"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Regulatory Compliance",
      desc: "Real-time checks against FDCPA, TCPA, CFPB, FCRA, SCRA.",
      metrics: ["Real-time alerts", "Zero violations", "Audit-ready"]
    },
    {
      icon: <Scales className="w-8 h-8" />,
      title: "Policy Updates",
      desc: "Change rules in plain language; deploy instantly without redeployment.",
      metrics: ["Runtime updates", "Instant rollout", "Self-documenting"]
    }
  ]

  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-white">Mission-Critical </span>
            <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              Banking Workflows
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Credit decisions to collections. Every workflow. At scale.
          </p>
        </Reveal>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="group relative h-full"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative p-8 rounded-2xl h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl" />
                <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-[56px] mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-krim-mint/20 to-krim-cyan/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-krim-mint">
                      {useCase.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-base text-white/70 flex-1 leading-relaxed">{useCase.desc}</p>

                  <div className="space-y-2 pt-6">
                    {useCase.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-krim-mint" />
                        <span className="text-sm text-white/60">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </StarfieldSection>
  )
}

/**
 * COMPLIANCE SECTION — tabs per jurisdiction (India / USA / UK)
 */
type RegItem = { acronym: string; name: string; desc: string }
const REGIONS: Record<string, RegItem[]> = {
  India: [
    { acronym: 'RBI', name: 'Reserve Bank of India', desc: 'Fair Practices Code, master directions, prudential norms.' },
    { acronym: 'DPDP', name: 'Digital Personal Data Protection Act', desc: 'Consent, purpose limitation, breach notification.' },
    { acronym: 'PMLA', name: 'Prevention of Money Laundering Act', desc: 'KYC, suspicious-transaction reporting, retention.' },
    { acronym: 'NPCI', name: 'National Payments Corporation of India', desc: 'UPI, IMPS, NACH operating rules.' },
    { acronym: 'SEBI', name: 'Securities & Exchange Board of India', desc: 'Markets, NBFC linkages, investor protection.' },
  ],
  USA: [
    { acronym: 'CFPB', name: 'Consumer Financial Protection Bureau', desc: 'UDAAP rules and debt-collection oversight.' },
    { acronym: 'FCRA', name: 'Fair Credit Reporting Act', desc: 'Credit accuracy, disputes, permissible purpose.' },
    { acronym: 'FDCPA', name: 'Fair Debt Collection Practices Act', desc: 'Communication conduct and harassment limits.' },
    { acronym: 'TCPA', name: 'Telephone Consumer Protection Act', desc: 'Consent, contact windows, auto-dialler use.' },
    { acronym: 'GLBA', name: 'Gramm–Leach–Bliley Act', desc: 'Privacy and safeguards for customer data.' },
  ],
  UK: [
    { acronym: 'FCA', name: 'Financial Conduct Authority', desc: 'Conduct rules, SM&CR, fair treatment.' },
    { acronym: 'PRA', name: 'Prudential Regulation Authority', desc: 'Capital, liquidity, and prudential standards.' },
    { acronym: 'Consumer Duty', name: 'FCA Consumer Duty', desc: 'Outcomes-based fair treatment of retail customers.' },
    { acronym: 'UK GDPR', name: 'Data Protection Act 2018', desc: 'Personal data, consent, cross-border transfers.' },
    { acronym: 'MLR 2017', name: 'Money Laundering Regulations 2017', desc: 'KYC, due diligence, transaction monitoring.' },
  ],
}
const REGION_NAMES = ['India', 'USA', 'UK'] as const
type Region = typeof REGION_NAMES[number]

function ComplianceSection() {
  const [region, setRegion] = useState<Region>('India')
  const regs = REGIONS[region]

  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <p className="brand-eyebrow text-krim-ochre mb-5">Built for your regulator</p>
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] mb-5">
            Compliance, encoded for the jurisdiction you operate in.
          </h2>
          <p className="brand-sans text-krim-off-white/70 text-lg leading-relaxed">
            KrimOS encodes the rules of every market it serves. Govern™ enforces them at the
            runtime layer, on every action.
          </p>
        </Reveal>

        {/* Region tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {REGION_NAMES.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold brand-sans transition-all duration-200 ${
                region === r
                  ? 'text-krim-indigo bg-krim-ochre'
                  : 'text-krim-slate border border-white/10 bg-white/[0.03] hover:text-krim-off-white hover:border-krim-ochre/30'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Region cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {regs.map((reg) => (
              <div
                key={reg.acronym}
                className="group relative rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/[0.06] to-white/[0.015] border border-white/10 p-6 transition-colors duration-300 hover:border-krim-ochre/40 flex flex-col h-full"
              >
                <span className="block h-px w-9 bg-krim-ochre mb-5" aria-hidden />
                <div className="brand-serif text-krim-ochre text-2xl tracking-tight mb-2">{reg.acronym}</div>
                <h3 className="brand-serif text-krim-off-white text-base leading-snug mb-3">{reg.name}</h3>
                <p className="brand-sans text-krim-slate text-sm leading-relaxed flex-1">{reg.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </StarfieldSection>
  )
}

/**
 * SECURITY & DEPLOYMENT SECTION
 */
function SecuritySection() {
  const deploymentOptions = [
    { name: "Cloud", desc: "Managed SaaS with 99.99% uptime SLA." },
    { name: "VPC", desc: "Dedicated VPC in your AWS/GCP account." },
    { name: "On-Premise", desc: "Kubernetes in your data center." }
  ]

  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <h2 className="brand-serif text-krim-off-white text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] mb-6">
            Security and <span className="italic text-krim-ochre">sovereign deployment</span>.
          </h2>
          <p className="brand-sans text-krim-off-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            End-to-end encryption, immutable audit logs, and flexible deployment — from your cloud
            to your own data centre.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Security Features */}
          <Reveal direction="left">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-krim-mint mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">AES-256 Encryption</h3>
                    <p className="text-white/70">Data encrypted in transit and at rest with HSM key management.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-krim-cyan mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Audit Logging</h3>
                    <p className="text-white/70">Immutable logs with real-time monitoring dashboards.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-krim-ochre mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Sovereign deployment</h3>
                    <p className="text-white/70">Run on-prem, hybrid, or in your preferred sovereign cloud — your data, your environment.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Deployment Options */}
          <Reveal direction="right">
            <div className="space-y-4">
              {deploymentOptions.map((option, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative"
                  whileHover={{ x: 8 }}
                >
                  <div className="relative p-6 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent rounded-2xl group-hover:from-krim-mint/[0.08] transition-all duration-500" />
                    <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
                    <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover:border-krim-mint/30 transition-colors duration-500" />

                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-krim-mint" />
                        {option.name}
                      </h3>
                      <p className="text-white/70">{option.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </StarfieldSection>
  )
}

/**
 * CTA SECTION
 */
function CTASection() {
  return (
    <StarfieldSection glassLevel="light" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-white">Consolidate your </span>
            <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              banking operations
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            See how banks unify lending operations on KrimOS.
          </p>

          <Link to="/contact">
            <Button
              size="lg"
              className="bg-krim-ochre hover:bg-krim-ochre/90 text-krim-indigo font-semibold px-10 py-4 shadow-lg transition-all duration-200 mb-6"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <p className="text-white/60 text-sm">
            Get a personalized walkthrough of KrimOS in action.
          </p>
        </Reveal>
      </div>
    </StarfieldSection>
  )
}

/**
 * MAIN PAGE COMPONENT
 */
export default function BankingDomain() {
  return (
    <StarfieldLayout pageType="product" contentDensity="dense">
      <BankingHero />
      <ProblemSection />
      <SolutionSection />
      <UseCasesSection />
      <ComplianceSection />
      <SecuritySection />
      <CTASection />
    </StarfieldLayout>
  )
}

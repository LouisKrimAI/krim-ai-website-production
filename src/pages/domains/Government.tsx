/**
 * GOVERNMENT DOMAIN PAGE
 * Sovereign Safe Superintelligence Infrastructure for Government
 * Full-stack government-focused landing page with compliance, security, and citizen services
 */

import React from 'react'
import { motion, LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import Button from '../../components/Button'
import {
  Shield, Lock, Eye, CheckCircle, WarningCircle, Users, FileText,
  IdentificationCard, Building, Gavel, Database, Network, Cpu,
  ArrowRight, Target, Scales, ClipboardText, Certificate,
  Handshake, Globe, Briefcase, CreditCard, Lightning
} from '@phosphor-icons/react'

// Import layout components
import {
  StarfieldLayout,
  StarfieldSection
} from '../../components/motion/StarfieldLayout'

import {
  Reveal,
  StaggerGrid,
  HoverLiftCard,
  GlassContainer
} from '../../components/motion/primitives'

export default function Government() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <StarfieldLayout pageType="landing" contentDensity="dense">

          {/* ====== HERO SECTION ====== */}
          <StarfieldSection glassLevel="ultraLight" className="relative py-24 lg:py-40">
            <div className="container max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Hero Content */}
                <Reveal direction="up" delay={0} className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                      <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">
                        Sovereign Safe
                      </span>
                      <br />
                      <span className="text-white text-4xl md:text-5xl lg:text-6xl">
                        Superintelligence
                      </span>
                      <br />
                      <span className="text-white/80 text-3xl md:text-4xl lg:text-5xl font-light">
                        for Government
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 leading-[1.8] max-w-xl font-light">
                      Autonomous governance infrastructure that serves citizens, enforces regulations,
                      and operates with government-grade security, sovereignty, and auditability.
                      Built for the unique demands of federal, state, and local agencies.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to="/contact">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold px-8 py-3.5 shadow-lg transition-all duration-200 border border-krim-mint/30 w-full sm:w-auto"
                      >
                        Book Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="px-8 py-3.5"
                    >
                      Explore Platform
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-3 pt-8">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Certificate className="w-4 h-4 text-krim-mint" />
                      <span>FedRAMP Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Shield className="w-4 h-4 text-krim-cyan" />
                      <span>NIST 800-53</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Lock className="w-4 h-4 text-krim-mint" />
                      <span>Data Sovereignty</span>
                    </div>
                  </div>
                </Reveal>

                {/* Right: Visual Element */}
                <Reveal direction="up" delay={0.2} className="relative">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/20 to-krim-cyan/10 rounded-2xl blur-3xl opacity-40" />
                    <div className="relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
                      <div className="space-y-6">
                        {[
                          { label: 'Government Deployment', icon: Building, color: 'text-krim-mint' },
                          { label: 'Citizen Services & Casework', icon: Users, color: 'text-krim-cyan' },
                          { label: 'Regulatory Enforcement', icon: Gavel, color: 'text-emerald-400' },
                          { label: 'Secure & Auditable', icon: Lock, color: 'text-blue-400' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="flex items-center gap-4"
                          >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{item.label}</p>
                              <p className="text-xs text-white/50">Purpose-built for government</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </StarfieldSection>

          {/* ====== PROBLEM SECTION ====== */}
          <StarfieldSection glassLevel="standard" className="relative py-24 md:py-32 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <Reveal direction="up" className="mb-20">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight">
                    Government agencies face <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">unprecedented operational challenges</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
                    Legacy systems, fragmented data, manual workflows, and compliance complexity create barriers to modern, citizen-centric governance
                  </p>
                </div>
              </Reveal>

              {/* Problem Cards Grid */}
              <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Legacy IT Systems',
                    description: 'Siloed mainframes, incompatible protocols, and decades-old infrastructure that cannot integrate with modern AI capabilities',
                    icon: Cpu,
                    color: 'from-emerald-500/[0.06] to-emerald-600/[0.03]',
                    borderColor: 'border-emerald-400/15 group-hover:border-emerald-400/35',
                    iconColor: 'text-emerald-400'
                  },
                  {
                    title: 'Manual Casework Backlogs',
                    description: 'Benefits processing, permit approvals, and citizen requests handled manually, causing service delays and citizen dissatisfaction',
                    icon: FileText,
                    color: 'from-cyan-500/[0.06] to-cyan-600/[0.03]',
                    borderColor: 'border-cyan-400/15 group-hover:border-cyan-400/35',
                    iconColor: 'text-cyan-400'
                  },
                  {
                    title: 'Siloed Agencies',
                    description: 'Lack of inter-agency coordination prevents unified citizen view and duplicates work across federal, state, and local levels',
                    icon: Building,
                    color: 'from-teal-500/[0.06] to-teal-600/[0.03]',
                    borderColor: 'border-teal-400/15 group-hover:border-teal-400/35',
                    iconColor: 'text-teal-400'
                  },
                  {
                    title: 'Citizen Service Delays',
                    description: 'Multi-week processing times for applications, claims, and disputes reduce trust and create compliance burden for citizens',
                    icon: Users,
                    color: 'from-blue-500/[0.06] to-blue-600/[0.03]',
                    borderColor: 'border-blue-400/15 group-hover:border-blue-400/35',
                    iconColor: 'text-blue-400'
                  },
                  {
                    title: 'Compliance & Audit Burden',
                    description: 'Manual documentation, limited audit trails, and difficulty proving compliance with FedRAMP, FISMA, and NIST requirements',
                    icon: ClipboardText,
                    color: 'from-purple-500/[0.06] to-purple-600/[0.03]',
                    borderColor: 'border-purple-400/15 group-hover:border-purple-400/35',
                    iconColor: 'text-purple-400'
                  },
                  {
                    title: 'Data Sovereignty Risks',
                    description: 'Citizen data stored on commercial clouds, foreign servers, or third-party platforms without government control or guarantees',
                    icon: Globe,
                    color: 'from-red-500/[0.06] to-red-600/[0.03]',
                    borderColor: 'border-red-400/15 group-hover:border-red-400/35',
                    iconColor: 'text-red-400'
                  }
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, delay: index * 0.05 }}
                  >
                    <div className="relative h-full p-6 rounded-xl overflow-hidden">
                      {/* Multi-layer background for depth */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} rounded-xl`} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-xl" />
                      <div className="absolute inset-0 backdrop-blur-xl rounded-xl" />

                      {/* Border with gradient */}
                      <div className={`absolute inset-0 rounded-xl border ${problem.borderColor} transition-colors duration-500`} />

                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${problem.iconColor}/8 to-transparent`} />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${problem.iconColor}`}>
                          <problem.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-3">{problem.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {problem.description}
                        </p>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${problem.iconColor}/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl`} />
                    </div>
                  </motion.div>
                ))}
              </StaggerGrid>
            </div>
          </StarfieldSection>

          {/* ====== SOLUTION SECTION ====== */}
          <StarfieldSection glassLevel="light" className="relative py-24 md:py-32 border-t border-slate-800/50">
            <div className="container max-w-7xl mx-auto px-6">
              <Reveal direction="up" className="mb-20">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight">
                    <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">KrimOS</span> transforms government operations
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                    Our five-product stack delivers autonomous governance infrastructure with complete compliance assurance, government-grade security, and transparent auditability
                  </p>
                </div>
              </Reveal>

              {/* Five Products Grid */}
              <StaggerGrid staggerDelay={120} className="grid lg:grid-cols-5 gap-4">
                {[
                  {
                    name: 'Kendra',
                    title: 'Governed Runtime',
                    description: 'Intelligence and governance layer for agency operations. Controls policy enforcement, audits all decisions, validates every action before execution.',
                    icon: Cpu,
                    color: 'from-emerald-400 to-teal-400'
                  },
                  {
                    name: 'Kula',
                    title: 'Policy Interface',
                    description: 'Natural language policy configuration for government teams. Define agency regulations, compliance rules, and operational constraints in plain English.',
                    icon: FileText,
                    color: 'from-cyan-400 to-blue-400'
                  },
                  {
                    name: 'Karta',
                    title: 'Government AI',
                    description: 'AI co-workers for citizen services and casework. Autonomous benefits processing, permit reviews, and citizen request handling with full auditability.',
                    icon: Users,
                    color: 'from-blue-400 to-purple-400'
                  },
                  {
                    name: 'Kupa',
                    title: 'Command Centers',
                    description: 'Real-time oversight dashboards for program management. Monitor agency performance, citizen satisfaction metrics, and compliance status in unified view.',
                    icon: Eye,
                    color: 'from-purple-400 to-pink-400'
                  },
                  {
                    name: 'Kriya',
                    title: 'Automation Blocks',
                    description: 'Low-code building blocks for government-compliant automation. Assemble secure, auditable workflows without custom code or vendor lock-in.',
                    icon: Network,
                    color: 'from-pink-400 to-red-400'
                  }
                ].map((product, index) => (
                  <Reveal key={index} direction="up" delay={index * 0.1}>
                    <HoverLiftCard
                      className="h-full"
                      liftDistance={6}
                      scale={1.05}
                    >
                      <GlassContainer glassLevel="medium" className="h-full p-6 rounded-xl">
                        <div className="space-y-4 h-full flex flex-col">
                          <div>
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.color} opacity-20 flex items-center justify-center mb-3`}>
                              <product.icon className={`w-5 h-5 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`} />
                            </div>
                            <div className="space-y-2">
                              <p className={`text-xs font-mono font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent uppercase tracking-widest`}>
                                {product.name}
                              </p>
                              <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                            </div>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed flex-grow">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-white/50 pt-4 border-t border-white/10">
                            <CheckCircle className="w-3 h-3 text-krim-mint" />
                            <span>Government-grade</span>
                          </div>
                        </div>
                      </GlassContainer>
                    </HoverLiftCard>
                  </Reveal>
                ))}
              </StaggerGrid>

              {/* Solution Callout */}
              <Reveal direction="up" delay={0.6} className="mt-16">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800/80">
                  <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
                    <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">KrimOS</span> enables autonomous government at scale
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-6">Traditional Government IT</h4>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 text-lg leading-none mt-0.5">→</span>
                          <span>Manual processing creates multi-week backlogs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 text-lg leading-none mt-0.5">→</span>
                          <span>Agencies operate in silos with no unified view</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 text-lg leading-none mt-0.5">→</span>
                          <span>Limited audit trails and compliance documentation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-red-400 text-lg leading-none mt-0.5">→</span>
                          <span>Citizens frustrated by delays and lack of transparency</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-krim-cyan mb-6">With KrimOS Platform</h4>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li className="flex items-start gap-3">
                          <span className="text-krim-mint text-lg leading-none mt-0.5">→</span>
                          <span>Citizens get same-day approvals with zero manual intervention</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-krim-mint text-lg leading-none mt-0.5">→</span>
                          <span>Unified citizen view across all agencies and programs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-krim-mint text-lg leading-none mt-0.5">→</span>
                          <span>Complete audit trail proving FedRAMP, FISMA compliance</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-krim-mint text-lg leading-none mt-0.5">→</span>
                          <span>Transparent, explainable AI decisions citizens understand</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </StarfieldSection>

          {/* ====== USE CASES SECTION ====== */}
          <StarfieldSection glassLevel="standard" className="relative py-24 md:py-32 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              <Reveal direction="up" className="mb-20">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight">
                    KrimOS powers critical <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">government operations</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
                    From citizen services to regulatory enforcement, our platform automates the workflows that matter most
                  </p>
                </div>
              </Reveal>

              {/* Use Cases Grid */}
              <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Citizen Services',
                    description: 'Benefits applications, passport requests, license renewals. Same-day processing with personalized guidance and transparent status tracking.',
                    icon: IdentificationCard,
                    metrics: '80% faster approvals'
                  },
                  {
                    title: 'Regulatory Enforcement',
                    description: 'Environmental compliance monitoring, safety inspections, tax compliance audits. Consistent enforcement with complete audit trails.',
                    icon: Scales,
                    metrics: '100% documented'
                  },
                  {
                    title: 'Benefits Administration',
                    description: 'Determine eligibility, manage enrollment, track ongoing compliance. Unified experience across SNAP, Medicaid, housing benefits.',
                    icon: CreditCard,
                    metrics: '50M+ cases/year'
                  },
                  {
                    title: 'Procurement',
                    description: 'Vendor evaluation, contract compliance monitoring, payment processing. Transparent selection criteria with government oversight.',
                    icon: Briefcase,
                    metrics: '$B+ in contracts'
                  },
                  {
                    title: 'Inter-Agency Coordination',
                    description: 'Unified citizen identity across federal, state, local systems. Shared data with compliance controls and audit logging.',
                    icon: Handshake,
                    metrics: 'All agencies'
                  },
                  {
                    title: 'Compliance Monitoring',
                    description: 'Real-time tracking of FedRAMP, FISMA, NIST 800-53, state-specific regulations. Automatic evidence collection for audits.',
                    icon: CheckCircle,
                    metrics: 'Zero gaps'
                  }
                ].map((useCase, index) => (
                  <Reveal key={index} direction="up" delay={index * 0.05}>
                    <HoverLiftCard className="h-full">
                      <GlassContainer glassLevel="medium" className="h-full p-6 rounded-xl">
                        <div className="space-y-4 h-full flex flex-col">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-krim-mint">
                            <useCase.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {useCase.description}
                            </p>
                          </div>
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-xs font-mono text-krim-mint font-semibold tracking-wider">
                              {useCase.metrics}
                            </p>
                          </div>
                        </div>
                      </GlassContainer>
                    </HoverLiftCard>
                  </Reveal>
                ))}
              </StaggerGrid>
            </div>
          </StarfieldSection>

          {/* ====== COMPLIANCE & SOVEREIGNTY SECTION ====== */}
          <StarfieldSection glassLevel="light" className="relative py-24 md:py-32 border-t border-slate-800/50">
            <div className="container max-w-7xl mx-auto px-6">
              <Reveal direction="up" className="mb-20">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight">
                    Government-grade <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">security and compliance</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                    Built from the ground up for the most stringent regulatory environments. FedRAMP, FISMA, NIST 800-53 compliance with air-gapped deployment options.
                  </p>
                </div>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Compliance Standards */}
                <Reveal direction="left" delay={0.1}>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white mb-8">Compliance Certifications</h3>

                    {[
                      {
                        standard: 'FedRAMP',
                        subtitle: 'Moderate & High baseline',
                        description: 'Cloud computing security framework for federal agencies. Continuous monitoring and assessment.',
                        icon: Certificate
                      },
                      {
                        standard: 'FISMA',
                        subtitle: 'Federal Information Security Modernization',
                        description: 'Information security framework for federal information systems. Built-in controls and documentation.',
                        icon: Shield
                      },
                      {
                        standard: 'NIST 800-53',
                        subtitle: 'Security controls catalog',
                        description: 'Comprehensive security and privacy controls. Every KrimOS component maps to required controls.',
                        icon: Lock
                      },
                      {
                        standard: 'SOC 2 Type II',
                        subtitle: 'Security, availability, processing integrity',
                        description: 'Annual third-party audit confirming operational controls and security practices.',
                        icon: Eye
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-krim-cyan/40 transition-colors"
                      >
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 text-krim-mint">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-semibold text-white">{item.standard}</h4>
                            <p className="text-xs text-white/50 mb-1">{item.subtitle}</p>
                            <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>

                {/* Sovereignty & Security */}
                <Reveal direction="right" delay={0.2}>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white mb-8">Data Sovereignty & Control</h3>

                    {[
                      {
                        feature: 'On-Premise Deployment',
                        description: 'Deploy KrimOS entirely within government data centers. No cloud dependency, full physical control.',
                        icon: Building
                      },
                      {
                        feature: 'Sovereign Cloud',
                        description: 'Use GovCloud, FedRAMP-authorized clouds, or government-operated cloud infrastructure.',
                        icon: Globe
                      },
                      {
                        feature: 'Air-Gapped Operations',
                        description: 'Completely disconnected operation for highest-security agencies. Updates via secure channels.',
                        icon: Lock
                      },
                      {
                        feature: 'Government-Grade Encryption',
                        description: 'FIPS 140-2 validated cryptography. End-to-end encryption for all data in transit and at rest.',
                        icon: Shield
                      },
                      {
                        feature: 'Complete Audit Logging',
                        description: 'Immutable logs of every decision, action, and data access for compliance and investigation.',
                        icon: FileText
                      },
                      {
                        feature: 'No Third-Party Dependencies',
                        description: 'Fully controlled supply chain. No reliance on commercial vendors or foreign cloud providers.',
                        icon: CheckCircle
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-krim-mint/40 transition-colors"
                      >
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 text-krim-cyan">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-semibold text-white">{item.feature}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </StarfieldSection>

          {/* ====== SECURITY & DEPLOYMENT SECTION ====== */}
          <StarfieldSection glassLevel="standard" className="relative py-24 md:py-32 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              <Reveal direction="up" className="mb-20">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight">
                    Enterprise-grade <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">infrastructure for government</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
                    Mission-critical reliability, scalability, and disaster recovery designed for agencies that cannot afford downtime
                  </p>
                </div>
              </Reveal>

              <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    metric: '99.99%',
                    label: 'Availability SLA',
                    sublabel: 'Mission-critical uptime',
                    icon: CheckCircle
                  },
                  {
                    metric: '<100ms',
                    label: 'Decision Latency',
                    sublabel: 'Real-time policy enforcement',
                    icon: Lightning
                  },
                  {
                    metric: '1B+',
                    label: 'Citizen Records',
                    sublabel: 'Proven scalability',
                    icon: Users
                  },
                  {
                    metric: '24/7',
                    label: 'Government Support',
                    sublabel: 'Federal support team',
                    icon: Cpu
                  }
                ].map((stat, index) => (
                  <Reveal key={index} direction="up" delay={index * 0.1}>
                    <HoverLiftCard>
                      <GlassContainer glassLevel="medium" className="p-8 rounded-xl text-center">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-krim-mint">
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
                              {stat.metric}
                            </p>
                            <p className="text-sm font-semibold text-white mt-2">{stat.label}</p>
                            <p className="text-xs text-white/60">{stat.sublabel}</p>
                          </div>
                        </div>
                      </GlassContainer>
                    </HoverLiftCard>
                  </Reveal>
                ))}
              </StaggerGrid>

              {/* Deployment Options */}
              <Reveal direction="up" delay={0.5} className="mt-16">
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      name: 'On-Premise',
                      description: 'Deploy in government data centers. Full control, no cloud dependency.',
                      features: ['Physical control', 'Air-gapped ready', 'No internet required']
                    },
                    {
                      name: 'GovCloud',
                      description: 'AWS GovCloud or Azure Government. FedRAMP-authorized infrastructure.',
                      features: ['FedRAMP compliance', 'Scalable', 'Managed operations']
                    },
                    {
                      name: 'Hybrid',
                      description: 'Combine on-premise and cloud. Flexible deployments per agency need.',
                      features: ['Agency choice', 'Disaster recovery', 'Geographic distribution']
                    }
                  ].map((option, index) => (
                    <Reveal key={index} direction="up" delay={0.5 + index * 0.1}>
                      <HoverLiftCard>
                        <GlassContainer glassLevel="medium" className="p-6 rounded-xl h-full">
                          <div className="space-y-4 h-full flex flex-col">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">{option.name}</h4>
                              <p className="text-sm text-white/70">{option.description}</p>
                            </div>
                            <ul className="space-y-2 pt-4 border-t border-white/10 flex-grow">
                              {option.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                                  <CheckCircle className="w-3 h-3 text-krim-mint" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </GlassContainer>
                      </HoverLiftCard>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </StarfieldSection>

          {/* ====== FINAL CTA SECTION ====== */}
          <StarfieldSection glassLevel="ultraLight" className="relative py-24 md:py-40">
            <div className="container max-w-4xl mx-auto px-6">
              <Reveal direction="up">
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                      <span className="text-white">Ready to transform</span><br />
                      <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">government operations?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
                      See how KrimOS can help your agency automate citizen services, accelerate approvals,
                      and achieve compliance with government-grade security.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link to="/contact">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold px-8 py-3.5 shadow-lg transition-all duration-200 border border-krim-mint/30"
                      >
                        Book Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="px-8 py-3.5"
                    >
                      Download Datasheet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="pt-12 border-t border-slate-800/50">
                    <p className="text-sm text-white/50 mb-6">Trusted by government agencies nationwide</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                      {['Federal Agencies', 'State Governments', 'Local Authorities', 'Regulatory Bodies'].map((org, i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mx-auto mb-2 text-white/40">
                            <Building className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-white/60">{org}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </StarfieldSection>

        </StarfieldLayout>
      </MotionConfig>
    </LazyMotion>
  )
}

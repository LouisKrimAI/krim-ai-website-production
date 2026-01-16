import { useEffect } from 'react'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Lightning, ShieldCheck, Users, Target, TrendUp, CheckCircle, Globe, Gear, CaretRight, PuzzlePiece, Phone, CurrencyCircleDollar, Handshake, ArrowsOutSimple, Scales, ArrowClockwise, Database, Gavel, MapPin, ChartBar, Building, CurrencyDollar, Clock, Eye } from '@phosphor-icons/react'
import Button from '../components/Button'
import { CUSTOMER_METRICS } from '../data/claimsRegistry'
import { validateComponentMetrics } from '../utils/claimsValidation'
import PlatformHero from '../components/sections/PlatformHero'
import ParticleBackground from '../components/atoms/ParticleBackground'

// Import Starfield components for cosmic continuity
import { StarfieldLayout, StarfieldSection, FloatingCard } from '../components/motion/StarfieldLayout'
import { Reveal, StaggerGrid, HoverLiftCard, GlassContainer } from '../components/motion/primitives'


export default function Platform(){
  const mousePosition = useCursorGlow()
  
  // Validate component metrics in development
  useEffect(() => {
    validateComponentMetrics('Platform', [
      'uptime', 'responseTime', 'dailyOrchestration', 'compliance',
      'customers', 'interactions', 'forecastingAccuracy'
    ])
  }, [])


  return (
    <StarfieldLayout pageType="product" contentDensity="moderate">
      {/* Cursor glow effect - now part of cosmic environment */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Starfield particles provide the cosmic background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
      </div>

      {/* Content now floats in cosmic space */}
      <div className="relative z-10">
        {/* HERO SECTION - Enterprise AI Infrastructure */}
        <PlatformHero />


        {/* SYSTEM MODEL - THREE LAYERS */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header - Floating in cosmic space */}
            <Reveal
              delay={0}
              direction="up"
              className="mb-24"
            >
              {/* Centered Header Content */}
              <div className="max-w-4xl mx-auto">

                {/* Main Title - Centered with Better Typography */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center">
                  <span className="block bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-bold leading-tight">
                    Unified Intelligence Platform
                  </span>
                </h2>

                {/* Description - Centered */}
                <div className="flex justify-center">
                  <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-3xl text-center leading-relaxed font-light">
                    Complete operational control from command to execution—three integrated layers with enterprise governance, continuous learning, and autonomous intelligence at every level
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Action Labels Above Cards - Large */}
            <Reveal
              delay={0.3}
              direction="up"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-6"
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-400 tracking-tight">Command</h3>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-400 tracking-tight">Orchestrate</h3>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-400 tracking-tight">Execute</h3>
              </div>
            </Reveal>

            {/* Three Layers Grid - Floating Glass Cards in Cosmic Space */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: 'Kula Assistant',
                  subtitle: 'Strategic Command Center',
                  features: ['Natural language', 'Portfolio insights', 'Performance monitoring'],
                  color: 'cyan',
                  gradient: 'from-cyan-500/10 to-transparent'
                },
                {
                  title: 'Intelligent Primitives',
                  subtitle: 'Compliant Unified Intelligence',
                  features: ['Continuous learning', 'Enterprise governance', 'Adaptive reasoning'],
                  color: 'mint',
                  gradient: 'from-emerald-500/10 to-transparent'
                },
                {
                  title: 'Karta Co-Workers',
                  subtitle: 'Autonomous Execution Teams',
                  features: ['Customer-facing specialists', 'Operations specialists', 'Enhanced recovery performance'],
                  color: 'purple',
                  gradient: 'from-purple-500/10 to-transparent'
                }
              ].map((layer, i) => (
                <FloatingCard
                  key={i}
                  elevation={i === 1 ? 'medium' : 'high'}
                  glassLevel="light"
                  className="group"
                >
                  {/* Elegant Card with Subtle Gradient Border - Centered Content */}
                  <div className={`relative h-full rounded-3xl p-8 pt-12 transition-all duration-500 border flex flex-col items-center text-center ${
                    layer.color === 'cyan' ? 'border-cyan-400/20 hover:border-cyan-400/40 hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]' :
                    layer.color === 'mint' ? 'border-emerald-400/20 hover:border-emerald-400/40 hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]' :
                    'border-purple-400/20 hover:border-purple-400/40 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]'
                  }`}>
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{layer.title}</h3>

                    {/* Subtitle */}
                    <p className="text-xs text-white/50 mb-8 uppercase tracking-[0.15em] font-medium">{layer.subtitle}</p>

                    {/* Features - Clean List - Centered */}
                    <div className="space-y-4 w-full">
                      {layer.features.map((feature, j) => (
                        <div key={j} className="flex items-center justify-center gap-3">
                          <div className={`w-1 h-1 rounded-full flex-shrink-0 ${
                            layer.color === 'cyan' ? 'bg-cyan-400' :
                            layer.color === 'mint' ? 'bg-emerald-400' :
                            'bg-purple-400'
                          }`} />
                          <span className="text-sm text-white/70 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>

          </div>
        </StarfieldSection>

        {/* KENDRA SECTION - REFINED PREMIUM SHOWCASE */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header Section */}

            {/* Runtime Services Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Runtime Services
                </span>
              </h3>
              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
                The infrastructure services that power autonomous banking operations
              </p>
            </motion.div>

            {/* Runtime Services - 4-column Grid for 8 Core Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: 'Agent Lifecycle Management',
                  desc: 'Spawns, monitors, and terminates AI agents across banking operations',
                  icon: Gear,
                  gradient: 'from-krim-mint/12 via-krim-mint/4',
                  glowColor: 'rgba(0, 255, 136, 0.3)',
                  iconColor: 'text-krim-mint',
                  accentColor: 'bg-krim-mint'
                },
                {
                  title: 'Real-Time Context Sharing',
                  desc: 'Maintains customer state and conversation history across all channels and agents',
                  icon: Globe,
                  gradient: 'from-krim-cyan/12 via-krim-cyan/4',
                  glowColor: 'rgba(0, 212, 255, 0.3)',
                  iconColor: 'text-krim-cyan',
                  accentColor: 'bg-krim-cyan'
                },
                {
                  title: 'Policy Validation Engine',
                  desc: 'Pre-validates every agent action against banking regulations before execution',
                  icon: ShieldCheck,
                  gradient: 'from-purple-500/12 via-purple-500/4',
                  glowColor: 'rgba(139, 92, 246, 0.3)',
                  iconColor: 'text-purple-400',
                  accentColor: 'bg-purple-400'
                },
                {
                  title: 'Cross-System Data Access',
                  desc: 'Provides unified API layer for agents to access CRM, core banking, and bureau data',
                  icon: Database,
                  gradient: 'from-krim-coral/12 via-krim-coral/4',
                  glowColor: 'rgba(255, 111, 97, 0.3)',
                  iconColor: 'text-krim-coral',
                  accentColor: 'bg-krim-coral'
                },
                {
                  title: 'Workflow State Management',
                  desc: 'Tracks multi-step banking processes across agent hand-offs and system boundaries',
                  icon: ArrowsOutSimple,
                  gradient: 'from-cyan-500/12 via-cyan-500/4',
                  glowColor: 'rgba(6, 182, 212, 0.3)',
                  iconColor: 'text-cyan-400',
                  accentColor: 'bg-cyan-400'
                },
                {
                  title: 'Compliance Event Logging',
                  desc: 'Records every agent decision and action for regulatory audit and explainability',
                  icon: Scales,
                  gradient: 'from-amber-500/12 via-amber-500/4',
                  glowColor: 'rgba(245, 158, 11, 0.3)',
                  iconColor: 'text-amber-400',
                  accentColor: 'bg-amber-400'
                },
                {
                  title: 'Resource Allocation Control',
                  desc: 'Manages compute, API calls, and system access based on workload and priority',
                  icon: ChartBar,
                  gradient: 'from-emerald-500/12 via-emerald-500/4',
                  glowColor: 'rgba(16, 185, 129, 0.3)',
                  iconColor: 'text-emerald-400',
                  accentColor: 'bg-emerald-400'
                },
                {
                  title: 'Learning Loop Coordination',
                  desc: 'Aggregates performance data across agents to improve strategies and models',
                  icon: Brain,
                  gradient: 'from-indigo-500/12 via-indigo-500/4',
                  glowColor: 'rgba(99, 102, 241, 0.3)',
                  iconColor: 'text-indigo-400',
                  accentColor: 'bg-indigo-400'
                }
              ].map((card, i) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group relative"
                  >
                    {/* Simplified card with clean hover state */}
                    <div className={`relative bg-gradient-to-br ${card.gradient} to-transparent rounded-2xl p-6 backdrop-blur-sm h-full min-h-[220px] flex flex-col overflow-hidden border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 hover:translate-y-[-4px]`}>
                      {/* Icon - simplified */}
                      <div className={`${card.iconColor} mb-4`}>
                        <Icon size={32} weight="duotone" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 relative z-10">
                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${card.accentColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Tagline Below Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="text-center mt-20"
            >
              {/* Animated Tagline with Dot Separators */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {['Humans Approve', 'Agents Execute', 'Audit-Ready'].map((phrase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex items-center gap-6"
                  >
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                      <span className="bg-gradient-to-r from-white via-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                        {phrase}
                      </span>
                    </span>
                    {i < 2 && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </StarfieldSection>

        {/* INSIDE KENDRA - MODULE SHOWCASE */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <Reveal
              direction="up"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                  Inside Kendra
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Seven core modules that make autonomous operations possible
              </p>
            </Reveal>

            {/* Modules Grid - 2 columns responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto [&>*:nth-child(7)]:md:col-span-2 [&>*:nth-child(7)]:md:max-w-md [&>*:nth-child(7)]:md:mx-auto">
              {[
                {
                  title: 'Krim-Core',
                  subtitle: 'Orchestration engine',
                  description: 'Routes work through the right Karta co-workers and workflows, and manages context, retries and hand-offs between AI and humans.',
                  icon: Gear,
                  color: 'mint'
                },
                {
                  title: 'Krim-Fabric',
                  subtitle: 'Unified data layer',
                  description: 'Pulls together servicing, CRM, payments, bureaus and policies into the operational view every agent and workflow relies on.',
                  icon: Database,
                  color: 'cyan'
                },
                {
                  title: 'Krim-Govern',
                  subtitle: 'Policy engine',
                  description: 'Encodes laws, bank rules and internal policies so there is a single source of truth for what is allowed in every journey.',
                  icon: Scales,
                  color: 'purple'
                },
                {
                  title: 'Krim-Nyaya',
                  subtitle: 'Validator',
                  description: 'Checks proposed actions and messages against evidence and policy before they reach a customer or system, and blocks what doesn\'t qualify.',
                  icon: ShieldCheck,
                  color: 'coral'
                },
                {
                  title: 'Krim-Learn',
                  subtitle: 'Learning orchestrator',
                  description: 'Runs learning loops over outcomes and errors so strategies, flows and co-worker behaviour get better over time.',
                  icon: Brain,
                  color: 'mint'
                },
                {
                  title: 'Krim-Ledger',
                  subtitle: 'Usage & billing',
                  description: 'Tracks work units across agents and workflows so you can see value, control consumption and bill cleanly.',
                  icon: CurrencyCircleDollar,
                  color: 'cyan'
                },
                {
                  title: 'Krim-Sense',
                  subtitle: 'Telemetry & observability',
                  description: 'Streams metrics, logs and alerts into Kupa and your monitoring so performance and compliance stay visible.',
                  icon: ChartBar,
                  color: 'purple'
                }
              ].map((module, i) => {
                const Icon = module.icon
                const colorMap = {
                  mint: 'border-krim-mint/30 text-krim-mint',
                  cyan: 'border-krim-cyan/30 text-krim-cyan',
                  purple: 'border-purple-500/30 text-purple-400',
                  coral: 'border-krim-coral/30 text-krim-coral'
                }

                return (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className={`p-8 bg-black/30 border ${colorMap[module.color].split(' ')[0]} rounded-2xl hover:border-opacity-70 transition-all duration-300 h-full`}>
                      <div className={`w-14 h-14 rounded-xl bg-black/40 border ${colorMap[module.color].split(' ')[0]} flex items-center justify-center mb-6`}>
                        <Icon size={28} className={colorMap[module.color].split(' ')[1]} weight="duotone" />
                      </div>
                      <div className="mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">
                          {module.subtitle}
                        </p>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* HOW KENDRA WORKS - SIMPLIFIED */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <Reveal
              direction="up"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                  How Kendra Works
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Four core systems that make autonomous operations possible
              </p>
            </Reveal>

            {/* Simplified Core Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Data Integration',
                  description: 'Connects all your systems into one operational view that every agent can access safely.',
                  icon: Database,
                  color: 'cyan'
                },
                {
                  title: 'Policy Enforcement', 
                  description: 'Every action is checked against compliance rules before execution. No exceptions.',
                  icon: ShieldCheck,
                  color: 'mint'
                },
                {
                  title: 'Work Orchestration',
                  description: 'Routes tasks to the right agents and handles hand-offs between AI and humans.',
                  icon: Gear,
                  color: 'purple'
                },
                {
                  title: 'Continuous Learning',
                  description: 'Analyzes outcomes to improve strategies and agent performance over time.',
                  icon: Brain,
                  color: 'coral'
                }
              ].map((system, i) => {
                const Icon = system.icon
                const colorMap = {
                  mint: 'border-krim-mint/30 text-krim-mint',
                  cyan: 'border-krim-cyan/30 text-krim-cyan',
                  purple: 'border-purple-500/30 text-purple-400',
                  coral: 'border-krim-coral/30 text-krim-coral'
                }

                return (
                  <motion.div
                    key={i}
                    className={`relative group`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  >
                    <div className={`p-8 bg-black/30 border ${colorMap[system.color].split(' ')[0]} rounded-2xl hover:border-opacity-70 transition-all duration-300 h-full`}>
                      <div className={`w-14 h-14 rounded-xl bg-black/40 border ${colorMap[system.color].split(' ')[0]} flex items-center justify-center mb-6`}>
                        <Icon size={28} className={colorMap[system.color].split(' ')[1]} weight="duotone" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {system.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {system.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* EXECUTION FLOW SECTION */}


      {/* UNIFIED INTELLIGENCE - SIMPLIFIED */}
      <StarfieldSection glassLevel="light" className="py-20 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal
            direction="up"
            delay={0}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                Unified Intelligence Layer
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              One intelligence system powers every AI co-worker, ensuring consistent decisions across all customer interactions—no matter the channel or complexity.
            </p>
          </Reveal>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Shared Context',
                description: 'Every co-worker knows the full customer history and current situation',
                icon: Globe
              },
              {
                title: 'Consistent Decisions',
                description: 'Same rules and reasoning applied across all touchpoints',
                icon: CheckCircle
              },
              {
                title: 'Continuous Improvement',
                description: 'Learning from one interaction improves all future ones',
                icon: TrendUp
              }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-krim-mint/20 to-krim-cyan/10 border border-krim-mint/30 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-krim-mint" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </StarfieldSection>


        {/* ====== OUTCOMES THAT MATTER - Real Business Results ====== */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <Reveal
              direction="up"
              delay={0}
              className="mb-16"
            >
              <div className="w-full flex justify-center mb-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                  Outcomes That Matter
                </h2>
              </div>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
                Real operational improvements from production deployments
              </p>
            </Reveal>

            {/* Real Business Outcomes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Dramatic Cost Reduction',
                  description: 'Automate routine tasks to cut operational overhead while maintaining service quality',
                  impact: 'Cost Efficiency',
                  icon: CurrencyDollar,
                  color: 'green'
                },
                {
                  title: 'Stress-Free Compliance',
                  description: 'Built-in policy checks make regulatory requirements feel automatic instead of painful',
                  impact: 'Risk Management',
                  icon: ShieldCheck,
                  color: 'emerald'
                },
                {
                  title: 'First-Contact Resolution',
                  description: 'AI agents access complete context to solve complex issues without transfers or callbacks',
                  impact: 'Customer Experience',
                  icon: Phone,
                  color: 'blue'
                },
                {
                  title: 'Accelerated Processing',
                  description: 'Intelligent workflows compress loan and account processing from weeks to days',
                  impact: 'Speed to Market',
                  icon: Clock,
                  color: 'orange'
                },
                {
                  title: 'Always-On Service',
                  description: 'Handle customer needs 24/7 while humans focus on relationship-building and complex cases',
                  impact: 'Workforce Optimization',
                  icon: Users,
                  color: 'indigo'
                },
                {
                  title: 'Real-Time Visibility',
                  description: 'Every decision and action logged automatically for instant audit readiness and transparency',
                  impact: 'Operational Control',
                  icon: Eye,
                  color: 'cyan'
                }
              ].map((outcome, i) => {
                const Icon = outcome.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="p-6 bg-black/20 border border-white/[0.08] hover:border-white/[0.16] rounded-2xl transition-all duration-300 h-full">
                      {/* Icon and Impact Label */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-black/40 border flex items-center justify-center ${
                          outcome.color === 'green' ? 'border-green-400/30 text-green-400' :
                          outcome.color === 'emerald' ? 'border-emerald-400/30 text-emerald-400' :
                          outcome.color === 'blue' ? 'border-blue-400/30 text-blue-400' :
                          outcome.color === 'orange' ? 'border-orange-400/30 text-orange-400' :
                          outcome.color === 'indigo' ? 'border-indigo-400/30 text-indigo-400' :
                          outcome.color === 'cyan' ? 'border-cyan-400/30 text-cyan-400' :
                          'border-gray-400/30 text-gray-400'
                        }`}>
                          <Icon size={24} weight="duotone" />
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
                          outcome.color === 'green' ? 'text-green-400/80 bg-green-400/10' :
                          outcome.color === 'emerald' ? 'text-emerald-400/80 bg-emerald-400/10' :
                          outcome.color === 'blue' ? 'text-blue-400/80 bg-blue-400/10' :
                          outcome.color === 'orange' ? 'text-orange-400/80 bg-orange-400/10' :
                          outcome.color === 'indigo' ? 'text-indigo-400/80 bg-indigo-400/10' :
                          outcome.color === 'cyan' ? 'text-cyan-400/80 bg-cyan-400/10' :
                          'text-gray-400/80 bg-gray-400/10'
                        }`}>
                          {outcome.impact}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3">
                        {outcome.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm leading-relaxed">
                        {outcome.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* Tagline - Positioned with appropriate spacing */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12 mb-16">
          <Reveal
            direction="up"
            delay={0}
            className="text-center"
          >
            {/* Soft Reflection Line */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            </div>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-semibold">Software scale.</span>{' '}
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-semibold">Human oversight.</span>{' '}
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-semibold">Regulator-safe.</span>
            </motion.p>
          </Reveal>
        </div>


        {/* BUILT FOR NO HALLUCINATIONS AND NO DATA LEAKAGE - Updated */}
        <StarfieldSection glassLevel="standard" className="py-20 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header - More Concise */}
            <Reveal
              direction="up"
              delay={0}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                  Built for Pre-Execution Validation and Data Isolation
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto">
                Kendra is designed so AI can never 'freestyle' in production. Every action is grounded in real data, checked against policy, and executed with strict access controls – so you can automate aggressively without losing control.
              </p>
            </Reveal>

            {/* Safety Principles - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Policy-first execution',
                  description: 'Workflows and co-workers run through predefined primitives and policies, not raw prompts. Every step is constrained by what\'s explicitly allowed.',
                  icon: ShieldCheck,
                  color: 'mint'
                },
                {
                  title: 'Grounded, non-hallucinating behaviour',
                  description: 'Decisions and messages are driven by your governed data fabric and validation checks, not guesses or synthetic behaviour.',
                  icon: Database,
                  color: 'cyan'
                },
                {
                  title: 'Strict data boundaries',
                  description: 'Each user and co-worker only sees and sends what they are authorised to. Sensitive information cannot leak across products, portfolios or channels.',
                  icon: Scales,
                  color: 'purple'
                },
                {
                  title: 'Full auditability',
                  description: 'Every interaction, decision and rule check is logged so you can explain what happened to internal audit or regulators.',
                  icon: Globe,
                  color: 'coral'
                }
              ].map((principle, i) => {
                const Icon = principle.icon
                const colorMap = {
                  mint: 'border-krim-mint/30 text-krim-mint',
                  cyan: 'border-krim-cyan/30 text-krim-cyan',
                  purple: 'border-purple-500/30 text-purple-400',
                  coral: 'border-krim-coral/30 text-krim-coral'
                }

                return (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  >
                    <div className={`p-8 bg-black/30 border ${colorMap[principle.color].split(' ')[0]} rounded-2xl hover:border-opacity-70 transition-all duration-300 h-full`}>
                      <div className={`w-14 h-14 rounded-xl bg-black/40 border ${colorMap[principle.color].split(' ')[0]} flex items-center justify-center mb-6`}>
                        <Icon size={28} className={colorMap[principle.color].split(' ')[1]} weight="duotone" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* CTA SECTION */}

      {/* 6. IMPLEMENTATION SECTION - Redesigned for visual impact */}
      <StarfieldSection glassLevel="light" className="mb-16">
        {/* Hero Header - Minimal & Bold */}
        <div className="text-center mb-20">
          <Reveal
            direction="up"
            delay={0}
            className="inline-block mb-6"
          >
            <div className="text-sm uppercase tracking-[0.2em] text-krim-mint/60 font-semibold mb-4">
              Implementation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.1]">
              Live in{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                  {CUSTOMER_METRICS.deploymentTime} days
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-krim-mint to-krim-cyan rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </span>
            </h2>
          </Reveal>

          <motion.p
            className="text-xl text-white/60 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Production-ready infrastructure with zero downtime deployment.
          </motion.p>
        </div>

        {/* Timeline - Horizontal Flow */}
        <div className="mb-24 relative">
          {/* Progress Bar Background */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/10 hidden md:block" />
          <motion.div
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-coral hidden md:block"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
          />

          {/* Timeline Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            {[
              {
                title: 'Discovery & Setup',
                items: ['Architecture review', 'Security audit', 'Integration mapping'],
                color: 'krim-mint',
                icon: Target
              },
              {
                title: 'Infrastructure',
                items: ['Kubernetes deployment', 'Database setup', 'Monitoring config'],
                color: 'krim-cyan',
                icon: Database
              },
              {
                title: 'Integration',
                items: ['System integration', 'Data migration', 'API configuration'],
                color: 'krim-coral',
                icon: ArrowsOutSimple
              },
              {
                title: 'Validation',
                items: ['Load testing', 'Security testing', 'UAT & certification'],
                color: 'krim-mint',
                icon: ShieldCheck
              },
              {
                title: 'Go Live',
                items: ['Production deployment', 'Team training', '24/7 monitoring'],
                color: 'krim-cyan',
                icon: Lightning
              }
            ].map((phase, index) => {
              const Icon = phase.icon
              const colorMap: Record<string, string> = {
                'krim-mint': 'from-krim-mint/20 to-krim-mint/5',
                'krim-cyan': 'from-krim-cyan/20 to-krim-cyan/5',
                'krim-coral': 'from-krim-coral/20 to-krim-coral/5'
              }
              const borderColorMap: Record<string, string> = {
                'krim-mint': 'border-krim-mint/30',
                'krim-cyan': 'border-krim-cyan/30',
                'krim-coral': 'border-krim-coral/30'
              }
              const textColorMap: Record<string, string> = {
                'krim-mint': 'text-krim-mint',
                'krim-cyan': 'text-krim-cyan',
                'krim-coral': 'text-krim-coral'
              }

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Dot on timeline */}
                  <motion.div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0f1a] ${textColorMap[phase.color]} z-10 hidden md:block`}
                    style={{ backgroundColor: `var(--${phase.color})` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  />

                  {/* Content Card */}
                  <div className="pt-16 md:pt-20">
                    <div
                      className={`p-6 rounded-2xl border ${borderColorMap[phase.color]} bg-gradient-to-br ${colorMap[phase.color]} backdrop-blur-sm group hover:scale-105 transition-transform duration-300`}
                    >
                      {/* Icon */}
                      <div className="mb-4 flex justify-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[phase.color]} border ${borderColorMap[phase.color]} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${textColorMap[phase.color]}`} weight="duotone" />
                        </div>
                      </div>

                      {/* Title - Now the primary element */}
                      <h3 className="text-xl font-bold text-white text-center mb-4">
                        {phase.title}
                      </h3>

                      {/* Items */}
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="text-sm text-white/70 text-center leading-tight">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Team & Support - Simplified */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/5 via-krim-cyan/5 to-krim-coral/5" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-3">
                Your Dedicated Team
              </h3>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Expert project management and technical support throughout deployment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: 'Project Manager',
                  responsibility: 'End-to-end oversight',
                  icon: Users
                },
                {
                  role: 'Solutions Architect',
                  responsibility: 'Infrastructure design',
                  icon: Gear
                },
                {
                  role: 'Integration Specialist',
                  responsibility: 'System connectivity',
                  icon: PuzzlePiece
                }
              ].map((member, index) => {
                const Icon = member.icon
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-krim-mint/20 to-krim-cyan/20 border border-krim-mint/30 mb-4">
                      <Icon className="w-8 h-8 text-krim-mint" weight="duotone" />
                    </div>
                    <div className="text-lg font-bold text-white mb-1">
                      {member.role}
                    </div>
                    <div className="text-sm text-white/60">
                      {member.responsibility}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </StarfieldSection>

        <StarfieldSection glassLevel="standard" className="py-20 md:py-32 overflow-hidden">
          {/* Dramatic Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-cyan/[0.05] to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)',
                backgroundSize: '100% 100%'
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Main Heading */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                  Operate the Future
                </span>
                <br />
                <span className="text-white">
                  of Banking Operations
                </span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The institutions who deploy Intelligence Runtimes first will define the next era of lending.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 100 }}
                className="mb-16"
              >
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
                  >
                    Book Executive Briefing
                    <CaretRight size={20} weight="bold" className="ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative"
              >
                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    className="h-px flex-1 max-w-48 bg-gradient-to-r from-transparent via-white/20 to-white/20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-krim-cyan"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-px flex-1 max-w-48 bg-gradient-to-l from-transparent via-white/20 to-white/20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                    style={{ transformOrigin: 'right' }}
                  />
                </div>

                <motion.p
                  className="text-lg md:text-xl font-medium text-white/60 italic"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Servicing is now about <span className="text-krim-mint not-italic font-bold">intention</span>, not reaction.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </StarfieldSection>
      </div>
    </StarfieldLayout>
  )
}



import React, { useEffect } from 'react'
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

/* ── Shared color maps ── */
const COLOR_MAP: Record<string, { border: string; hoverBorder: string; text: string; bg: string; gradient: string; hoverGradient: string; shadow: string }> = {
  mint:    { border: 'border-krim-mint/20',    hoverBorder: 'hover:border-krim-mint/50',    text: 'text-krim-mint',    bg: 'bg-krim-mint/10',    gradient: 'from-krim-mint/[0.05] to-krim-mint/[0.02]', hoverGradient: 'group-hover:from-krim-mint/[0.12] group-hover:to-krim-mint/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]' },
  cyan:    { border: 'border-krim-cyan/20',    hoverBorder: 'hover:border-krim-cyan/50',    text: 'text-krim-cyan',    bg: 'bg-krim-cyan/10',    gradient: 'from-krim-cyan/[0.05] to-krim-cyan/[0.02]', hoverGradient: 'group-hover:from-krim-cyan/[0.12] group-hover:to-krim-cyan/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]' },
  purple:  { border: 'border-purple-500/20',   hoverBorder: 'hover:border-purple-500/50',   text: 'text-purple-400',   bg: 'bg-purple-500/10',   gradient: 'from-purple-500/[0.05] to-purple-500/[0.02]', hoverGradient: 'group-hover:from-purple-500/[0.12] group-hover:to-purple-500/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)]' },
  coral:   { border: 'border-krim-coral/20',   hoverBorder: 'hover:border-krim-coral/50',   text: 'text-krim-coral',   bg: 'bg-krim-coral/10',   gradient: 'from-krim-coral/[0.05] to-krim-coral/[0.02]', hoverGradient: 'group-hover:from-krim-coral/[0.12] group-hover:to-krim-coral/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(255,111,97,0.15)]' },
  emerald: { border: 'border-emerald-400/20',  hoverBorder: 'hover:border-emerald-400/50',  text: 'text-emerald-400',  bg: 'bg-emerald-400/10',  gradient: 'from-emerald-400/[0.05] to-emerald-400/[0.02]', hoverGradient: 'group-hover:from-emerald-400/[0.12] group-hover:to-emerald-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]' },
  green:   { border: 'border-green-400/20',    hoverBorder: 'hover:border-green-400/50',    text: 'text-green-400',    bg: 'bg-green-400/10',    gradient: 'from-green-400/[0.05] to-green-400/[0.02]', hoverGradient: 'group-hover:from-green-400/[0.12] group-hover:to-green-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(74,222,128,0.15)]' },
  blue:    { border: 'border-blue-400/20',     hoverBorder: 'hover:border-blue-400/50',     text: 'text-blue-400',     bg: 'bg-blue-400/10',     gradient: 'from-blue-400/[0.05] to-blue-400/[0.02]', hoverGradient: 'group-hover:from-blue-400/[0.12] group-hover:to-blue-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(96,165,250,0.15)]' },
  orange:  { border: 'border-orange-400/20',   hoverBorder: 'hover:border-orange-400/50',   text: 'text-orange-400',   bg: 'bg-orange-400/10',   gradient: 'from-orange-400/[0.05] to-orange-400/[0.02]', hoverGradient: 'group-hover:from-orange-400/[0.12] group-hover:to-orange-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(251,146,60,0.15)]' },
  indigo:  { border: 'border-indigo-400/20',   hoverBorder: 'hover:border-indigo-400/50',   text: 'text-indigo-400',   bg: 'bg-indigo-400/10',   gradient: 'from-indigo-400/[0.05] to-indigo-400/[0.02]', hoverGradient: 'group-hover:from-indigo-400/[0.12] group-hover:to-indigo-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(129,140,248,0.15)]' },
  amber:   { border: 'border-amber-400/20',    hoverBorder: 'hover:border-amber-400/50',    text: 'text-amber-400',    bg: 'bg-amber-400/10',    gradient: 'from-amber-400/[0.05] to-amber-400/[0.02]', hoverGradient: 'group-hover:from-amber-400/[0.12] group-hover:to-amber-400/[0.06]', shadow: 'group-hover:shadow-[0_8px_32px_rgba(251,191,36,0.15)]' },
}

/* ── Reusable accent-line color classes (Tailwind needs full strings) ── */
const ACCENT_BG: Record<string, string> = {
  mint: 'bg-krim-mint', cyan: 'bg-krim-cyan', purple: 'bg-purple-400', coral: 'bg-krim-coral',
  emerald: 'bg-emerald-400', green: 'bg-green-400', blue: 'bg-blue-400', orange: 'bg-orange-400',
  indigo: 'bg-indigo-400', amber: 'bg-amber-400',
}

/* ── Compact glassmorphic card (single background layer) ── */
function GlassCard({ color, children, className = '' }: { color: string; children: React.ReactNode; className?: string }) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.mint
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group relative backdrop-blur-md bg-gradient-to-br ${c.gradient} ${c.hoverGradient} border border-white/[0.08] ${c.hoverBorder} rounded-2xl overflow-hidden transition-all duration-500 ${c.shadow} ${className}`}
    >
      {children}
      {/* Accent line on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${ACCENT_BG[color] ?? 'bg-krim-mint'} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </motion.div>
  )
}


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
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Starfield particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <PlatformHero />


        {/* ══════ SYSTEM MODEL - THREE LAYERS ══════ */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <Reveal delay={0} direction="up" className="mb-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                    Enterprise AI Operating System
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                  Command, orchestrate, and execute—three integrated layers that bring governed intelligence to scale.
                </p>
              </div>
            </Reveal>

            {/* Action Labels */}
            <Reveal delay={0.3} direction="up" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-6">
              {[
                { label: 'Command', cls: 'text-cyan-400' },
                { label: 'Orchestrate', cls: 'text-emerald-400' },
                { label: 'Execute', cls: 'text-purple-400' },
              ].map((a) => (
                <div key={a.label} className="text-center">
                  <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tight ${a.cls}`}>{a.label}</h3>
                </div>
              ))}
            </Reveal>

            {/* Three Layers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  title: 'Kula Assistant',
                  subtitle: 'Strategic Command Center',
                  features: ['Natural language', 'Portfolio insights', 'Performance monitoring'],
                  color: 'cyan',
                },
                {
                  title: 'Intelligent Primitives',
                  subtitle: 'Compliant Unified Intelligence',
                  features: ['Continuous learning', 'Enterprise governance', 'Adaptive reasoning'],
                  color: 'emerald',
                },
                {
                  title: 'Karta Autonomous Workers',
                  subtitle: 'Autonomous Execution Teams',
                  features: ['Customer-facing specialists', 'Operations specialists', 'Enhanced recovery performance'],
                  color: 'purple',
                }
              ].map((layer, i) => (
                <GlassCard key={i} color={layer.color} className="p-7 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{layer.title}</h3>
                  <p className="text-xs text-white/50 mb-6 uppercase tracking-[0.15em] font-medium">{layer.subtitle}</p>
                  <div className="space-y-3 w-full">
                    {layer.features.map((feature, j) => (
                      <div key={j} className="flex items-center justify-center gap-3">
                        <div className={`w-1 h-1 rounded-full flex-shrink-0 ${ACCENT_BG[layer.color]}`} />
                        <span className="text-sm text-white/55">{feature}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </StarfieldSection>

        {/* ══════ KENDRA RUNTIME SERVICES ══════ */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mb-12"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Runtime Services
                </span>
              </h3>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                The infrastructure services that power autonomous regulated operations
              </p>
            </motion.div>

            {/* 4-column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {[
                { title: 'Agent Lifecycle Management', desc: 'Spawns, monitors, and terminates agents across regulated operations', icon: Gear, color: 'mint' },
                { title: 'Real-Time Context Sharing', desc: 'Maintains customer state and conversation history across all channels and agents', icon: Globe, color: 'cyan' },
                { title: 'Policy Validation Engine', desc: 'Pre-validates every agent action against compliance regulations before execution', icon: ShieldCheck, color: 'purple' },
                { title: 'Cross-System Data Access', desc: 'Provides unified API layer for agents to access CRM, core systems, and external data', icon: Database, color: 'coral' },
                { title: 'Workflow State Management', desc: 'Tracks multi-step regulated processes across agent hand-offs and system boundaries', icon: ArrowsOutSimple, color: 'cyan' },
                { title: 'Compliance Event Logging', desc: 'Records every agent decision and action for regulatory audit and explainability', icon: Scales, color: 'amber' },
                { title: 'Resource Allocation Control', desc: 'Manages compute, API calls, and system access based on workload and priority', icon: ChartBar, color: 'emerald' },
                { title: 'Learning Loop Coordination', desc: 'Aggregates performance data across agents to improve strategies and models', icon: Brain, color: 'indigo' },
              ].map((card, i) => {
                const Icon = card.icon
                const c = COLOR_MAP[card.color]
                return (
                  <GlassCard key={i} color={card.color} className="px-6 py-5 flex flex-col">
                    <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon size={22} className={c.text} weight="duotone" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-tight">{card.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed flex-1">{card.desc}</p>
                  </GlassCard>
                )
              })}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="text-center mt-16"
            >
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {['Humans Approve', 'Agents Execute', 'Audit-Ready'].map((phrase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
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
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </StarfieldSection>

        {/* ══════ INSIDE KENDRA - MODULE SHOWCASE ══════ */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Reveal direction="up" delay={0} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Inside Kendra
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                Seven core modules enabling autonomous operations
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto [&>*:nth-child(7)]:md:col-span-2 [&>*:nth-child(7)]:md:max-w-md [&>*:nth-child(7)]:md:mx-auto">
              {[
                { title: 'Krim-Core', subtitle: 'Orchestration engine', description: 'Routes work through the right Karta Autonomous Workers and workflows, and manages context, retries and hand-offs between AI and humans.', icon: Gear, color: 'mint' },
                { title: 'Krim-Fabric', subtitle: 'Unified data layer', description: 'Pulls together systems, data sources, and policies into the operational view every agent and workflow relies on.', icon: Database, color: 'cyan' },
                { title: 'Krim-Govern', subtitle: 'Policy engine', description: 'Encodes laws, organizational rules and internal policies so there is a single source of truth for what is allowed in every journey.', icon: Scales, color: 'purple' },
                { title: 'Krim-Nyaya', subtitle: 'Validator', description: 'Checks proposed actions and messages against evidence and policy before they reach a customer or system, and blocks what doesn\'t qualify.', icon: ShieldCheck, color: 'coral' },
                { title: 'Krim-Learn', subtitle: 'Learning orchestrator', description: 'Runs learning loops over outcomes and errors so strategies, flows and Autonomous Worker behaviour improve over time.', icon: Brain, color: 'mint' },
                { title: 'Krim-Ledger', subtitle: 'Usage & billing', description: 'Tracks work units across agents and workflows so you can see value, control consumption and bill cleanly.', icon: CurrencyCircleDollar, color: 'cyan' },
                { title: 'Krim-Sense', subtitle: 'Telemetry & observability', description: 'Streams metrics, logs and alerts into Kupa and your monitoring so performance and compliance stay visible.', icon: ChartBar, color: 'purple' },
              ].map((mod, i) => {
                const Icon = mod.icon
                const c = COLOR_MAP[mod.color]
                return (
                  <GlassCard key={i} color={mod.color} className="p-7">
                    <div className={`w-11 h-11 rounded-lg ${c.bg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon size={24} className={c.text} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{mod.title}</h3>
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">{mod.subtitle}</p>
                    <p className="text-sm text-white/55 leading-relaxed">{mod.description}</p>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* ══════ HOW KENDRA WORKS ══════ */}
        <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Reveal direction="up" delay={0} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  How Kendra Works
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                Four core systems for autonomous operations
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {[
                { title: 'Data Integration', description: 'Connects all your systems into one operational view that every agent can access safely.', icon: Database, color: 'cyan' },
                { title: 'Policy Enforcement', description: 'Every action is checked against compliance rules before execution. No exceptions.', icon: ShieldCheck, color: 'mint' },
                { title: 'Work Orchestration', description: 'Routes tasks to the right agents and handles hand-offs between AI and humans.', icon: Gear, color: 'purple' },
                { title: 'Continuous Learning', description: 'Analyzes outcomes to improve strategies and agent performance over time.', icon: Brain, color: 'coral' },
              ].map((system, i) => {
                const Icon = system.icon
                const c = COLOR_MAP[system.color]
                return (
                  <GlassCard key={i} color={system.color} className="p-7">
                    <div className={`w-11 h-11 rounded-lg ${c.bg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon size={24} className={c.text} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{system.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed">{system.description}</p>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </StarfieldSection>


        {/* ══════ UNIFIED INTELLIGENCE LAYER ══════ */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Reveal direction="up" delay={0} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Unified Intelligence Layer
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                One intelligence system powers every Autonomous Worker, ensuring consistent decisions across all customer interactions—no matter the channel or complexity.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { title: 'Shared Context', description: 'Every Autonomous Worker has access to complete customer history and current situation', icon: Globe },
                { title: 'Consistent Decisions', description: 'Same rules and reasoning applied across all touchpoints', icon: CheckCircle },
                { title: 'Continuous Improvement', description: 'Learning from one interaction improves all future ones', icon: TrendUp },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <GlassCard key={i} color="emerald" className="px-6 py-5 text-center">
                    <div className="w-11 h-11 rounded-lg bg-krim-mint/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-mint/30">
                      <Icon size={24} className="text-krim-mint" weight="duotone" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </StarfieldSection>


        {/* ══════ OUTCOMES THAT MATTER ══════ */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal direction="up" delay={0} className="mb-14">
              <div className="w-full flex justify-center mb-5">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Outcomes That Matter
                </h2>
              </div>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
                Real operational improvements from production deployments
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {[
                { title: 'Cost Reduction', description: 'Automate routine tasks to reduce operational overhead while maintaining service quality', impact: 'Cost Efficiency', icon: CurrencyDollar, color: 'green' },
                { title: 'Compliance Automation', description: 'Built-in policy checks ensure regulatory requirements are enforced automatically', impact: 'Risk Management', icon: ShieldCheck, color: 'emerald' },
                { title: 'First-Contact Resolution', description: 'Autonomous Workers access complete context to solve complex issues without transfers or callbacks', impact: 'Customer Experience', icon: Phone, color: 'blue' },
                { title: 'Accelerated Processing', description: 'Intelligent workflows compress account processing from weeks to days', impact: 'Speed to Market', icon: Clock, color: 'orange' },
                { title: '24/7 Operations', description: 'Handle customer needs around the clock while humans focus on relationship-building and complex cases', impact: 'Workforce Optimization', icon: Users, color: 'indigo' },
                { title: 'Complete Audit Trail', description: 'Every decision and action is logged for audit readiness and transparency', impact: 'Operational Control', icon: Eye, color: 'cyan' },
              ].map((outcome, i) => {
                const Icon = outcome.icon
                const c = COLOR_MAP[outcome.color]
                return (
                  <GlassCard key={i} color={outcome.color} className="px-6 py-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                        <Icon size={22} className={c.text} weight="duotone" />
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${c.text} ${c.bg}`}>
                        {outcome.impact}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{outcome.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{outcome.description}</p>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* Tagline */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 mt-10 mb-14">
          <Reveal direction="up" delay={0} className="text-center">
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


        {/* ══════ BUILT FOR PRE-EXECUTION VALIDATION ══════ */}
        <StarfieldSection glassLevel="standard" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Reveal direction="up" delay={0} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Built for Pre-Execution Validation and Data Isolation
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                Kendra ensures agents act within strict boundaries. Every action is grounded in real data, checked against policy, and enforced with strict access controls.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {[
                { title: 'Policy-first execution', description: 'Workflows and Autonomous Workers run through predefined primitives and policies, not raw prompts. Every step is constrained by what\'s explicitly allowed.', icon: ShieldCheck, color: 'mint' },
                { title: 'Grounded, non-hallucinating behaviour', description: 'Decisions and messages are driven by your governed data fabric and validation checks, not guesses or synthetic behaviour.', icon: Database, color: 'cyan' },
                { title: 'Strict data boundaries', description: 'Each user and Autonomous Worker only sees and sends what they are authorised to. Sensitive information cannot leak across products, portfolios or channels.', icon: Scales, color: 'purple' },
                { title: 'Complete Auditability', description: 'Every interaction, decision and rule check is logged for regulatory and internal audit purposes.', icon: Globe, color: 'coral' },
              ].map((principle, i) => {
                const Icon = principle.icon
                const c = COLOR_MAP[principle.color]
                return (
                  <GlassCard key={i} color={principle.color} className="p-7">
                    <div className={`w-11 h-11 rounded-lg ${c.bg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon size={24} className={c.text} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed">{principle.description}</p>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </StarfieldSection>

        {/* ══════ IMPLEMENTATION SECTION ══════ */}
        <StarfieldSection glassLevel="light" className="py-20 md:py-28">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal direction="up" delay={0} className="inline-block mb-5">
              <div className="text-sm uppercase tracking-[0.2em] text-krim-mint/60 font-semibold mb-4">
                Implementation
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
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
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Production-ready infrastructure with zero downtime deployment.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="mb-20 relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/10 hidden md:block" />
            <motion.div
              className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-coral hidden md:block"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-4 relative">
              {[
                { title: 'Discovery & Setup', items: ['Architecture review', 'Security audit', 'Integration mapping'], color: 'mint', icon: Target },
                { title: 'Infrastructure', items: ['Kubernetes deployment', 'Database setup', 'Monitoring config'], color: 'cyan', icon: Database },
                { title: 'Integration', items: ['System integration', 'Data migration', 'API configuration'], color: 'coral', icon: ArrowsOutSimple },
                { title: 'Validation', items: ['Load testing', 'Security testing', 'UAT & certification'], color: 'mint', icon: ShieldCheck },
                { title: 'Go Live', items: ['Production deployment', 'Team training', '24/7 monitoring'], color: 'cyan', icon: Lightning },
              ].map((phase, index) => {
                const Icon = phase.icon
                const c = COLOR_MAP[phase.color]
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
                      className={`absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0f1a] ${c.text} z-10 hidden md:block`}
                      style={{ backgroundColor: `var(--${phase.color})` }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                    />
                    <div className="pt-16 md:pt-20">
                      <div className={`group backdrop-blur-md bg-gradient-to-br ${c.gradient} ${c.hoverGradient} border border-white/[0.08] ${c.hoverBorder} rounded-2xl px-5 py-5 transition-all duration-500 overflow-hidden relative ${c.shadow}`}>
                        <div className="mb-3 flex justify-center">
                          <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                            <Icon className={`w-5 h-5 ${c.text}`} weight="duotone" />
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-white text-center mb-3">{phase.title}</h3>
                        <ul className="space-y-1.5">
                          {phase.items.map((item, i) => (
                            <li key={i} className="text-sm text-white/55 text-center leading-tight">{item}</li>
                          ))}
                        </ul>
                        <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${ACCENT_BG[phase.color]} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Team & Support */}
          <motion.div
            className="relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-krim-mint/[0.03] to-krim-cyan/[0.02] rounded-2xl border border-white/[0.08] p-7 md:px-10 md:py-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">Your Dedicated Team</h3>
              <p className="text-base text-white/60 max-w-2xl mx-auto">
                Expert project management and technical support throughout deployment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { role: 'Project Manager', responsibility: 'End-to-end oversight', icon: Users },
                { role: 'Solutions Architect', responsibility: 'Infrastructure design', icon: Gear },
                { role: 'Integration Specialist', responsibility: 'System connectivity', icon: PuzzlePiece },
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
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-krim-mint/10 mb-3">
                      <Icon className="w-6 h-6 text-krim-mint" weight="duotone" />
                    </div>
                    <div className="text-base font-bold text-white mb-1">{member.role}</div>
                    <div className="text-sm text-white/55">{member.responsibility}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </StarfieldSection>

        {/* ══════ FINAL CTA ══════ */}
        <StarfieldSection glassLevel="standard" className="py-20 md:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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
                  of Regulated Operations
                </span>
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The institutions who deploy Intelligence Runtimes first will lead the future of operations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 100 }}
                className="mb-12"
              >
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
                  >
                    Book Executive Briefing
                    <CaretRight size={20} weight="bold" className="ml-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
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
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
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
                  Operations become <span className="text-krim-mint not-italic font-bold">proactive</span>, not reactive.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </StarfieldSection>
      </div>
    </StarfieldLayout>
  )
}

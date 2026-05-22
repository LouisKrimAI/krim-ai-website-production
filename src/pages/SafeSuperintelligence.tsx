/**
 * SAFE SUPERINTELLIGENCE PAGE
 * Compact glassmorphic design language — DRY card components
 */

import React from 'react'
import { motion, LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Button from '../components/Button'
import {
  Shield, Lightning, Brain, Lock, CheckCircle,
  WarningCircle, Eye, ArrowRight, Cpu,
  Flask, Timer, Scales, Network,
  GitBranch, Database, Compass,
  UsersFour, ChartLineUp, Certificate, Stack
} from '@phosphor-icons/react'

// Import layout components
import {
  StarfieldLayout,
  StarfieldSection
} from '../components/motion/StarfieldLayout'

// ── Shared color maps for DRY card rendering ────────────────────────
const COLOR_MAP = {
  emerald: {
    card: 'from-emerald-500/[0.05] to-emerald-600/[0.02] group-hover:from-emerald-500/[0.12] group-hover:to-emerald-600/[0.06] border-white/[0.08] hover:border-emerald-400/50',
    shadow: 'group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
    icon: 'text-emerald-400',
    iconBg: 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/20',
    iconGlow: 'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-400/30',
    accent: 'via-emerald-400/60',
  },
  cyan: {
    card: 'from-cyan-500/[0.05] to-cyan-600/[0.02] group-hover:from-cyan-500/[0.12] group-hover:to-cyan-600/[0.06] border-white/[0.08] hover:border-cyan-400/50',
    shadow: 'group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]',
    icon: 'text-cyan-400',
    iconBg: 'from-cyan-500/20 to-cyan-600/10 border-cyan-400/20',
    iconGlow: 'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-400/30',
    accent: 'via-cyan-400/60',
  },
  teal: {
    card: 'from-teal-500/[0.05] to-teal-600/[0.02] group-hover:from-teal-500/[0.12] group-hover:to-teal-600/[0.06] border-white/[0.08] hover:border-teal-400/50',
    shadow: 'group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]',
    icon: 'text-teal-400',
    iconBg: 'from-teal-500/20 to-teal-600/10 border-teal-400/20',
    iconGlow: 'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-400/30',
    accent: 'via-teal-400/60',
  },
  mint: {
    card: 'from-green-500/[0.05] to-green-600/[0.02] group-hover:from-green-500/[0.12] group-hover:to-green-600/[0.06] border-white/[0.08] hover:border-green-400/50',
    shadow: 'group-hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]',
    icon: 'text-green-400',
    iconBg: 'from-green-500/20 to-green-600/10 border-green-400/20',
    iconGlow: 'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-400/30',
    accent: 'via-green-400/60',
  },
  green: {
    card: 'from-green-500/[0.05] to-green-600/[0.02] group-hover:from-green-500/[0.12] group-hover:to-green-600/[0.06] border-white/[0.08] hover:border-green-400/50',
    shadow: 'group-hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]',
    icon: 'text-green-400',
    iconBg: 'from-green-500/20 to-green-600/10 border-green-400/20',
    iconGlow: 'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-400/30',
    accent: 'via-green-400/60',
  },
} as const;

type GlassColor = keyof typeof COLOR_MAP;

// ── Reusable compact glass card ─────────────────────────────────────
function GlassCard({
  icon: Icon,
  title,
  desc,
  color,
  index = 0,
  children,
}: {
  icon: React.ElementType;
  title: React.ReactNode;
  desc?: React.ReactNode;
  color: GlassColor;
  index?: number;
  children?: React.ReactNode;
}) {
  const c = COLOR_MAP[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
    >
      <div
        className={`relative h-full p-7 rounded-2xl backdrop-blur-md bg-gradient-to-br ${c.card} border transition-all duration-500 flex flex-col overflow-hidden ${c.shadow}`}
      >
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.iconBg} border flex items-center justify-center mb-4 transition-all duration-300 ${c.iconGlow}`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>

        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        {desc && <p className="text-sm text-white/55 leading-relaxed flex-1">{desc}</p>}
        {children}

        {/* Bottom accent line — hover reveal */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${c.accent} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />
      </div>
    </motion.div>
  );
}

// 5-Layer Stack Visualization Component for Hero
function FiveLayerStack() {
  const layers = [
    { name: 'AI Applications', sublabel: 'Kula, Karta, Kupa', level: 5 },
    { name: 'Application Infrastructure', sublabel: 'APIs, Orchestration', level: 4 },
    {
      name: 'Kendra Runtime',
      sublabel: 'Intelligence & Governance Layer',
      level: 3.5,
      highlight: true
    },
    { name: 'Foundation Models', sublabel: 'GPT, Claude, Gemini, Llama', level: 3 },
    { name: 'Infrastructure', sublabel: 'Cloud, Compute, Storage', level: 2 },
    { name: 'Hardware', sublabel: 'GPUs, TPUs, Data Centers', level: 1 }
  ]

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
        <div className="space-y-3">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.level}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative"
            >
              {layer.highlight ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-lg blur-sm" />
                  <div className="relative p-4 rounded-lg bg-gradient-to-r from-krim-mint/5 to-krim-cyan/5 border-2 border-krim-cyan/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-krim-cyan rounded-full" />
                        <div>
                          <span className="text-xs font-mono text-krim-cyan/80">LAYER {layer.level}</span>
                          <span className="text-sm font-semibold text-white ml-2">{layer.name}</span>
                        </div>
                      </div>
                      <Lightning className="w-4 h-4 text-krim-mint/60" />
                    </div>
                    <div className="text-xs text-krim-mint/70 mt-1 ml-6">{layer.sublabel}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-slate-900/30 border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-slate-600 rounded-full" />
                    <div>
                      <span className="text-xs font-mono text-white/70">LAYER {layer.level}</span>
                      <span className="text-sm text-white/80 ml-2">{layer.name}</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/70 mt-0.5 ml-5">{layer.sublabel}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-krim-mint/80 font-medium">
            The missing runtime layer between AI and operations
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SafeSuperintelligence() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <StarfieldLayout pageType="product" contentDensity="moderate">

          {/* HERO SECTION */}
          <StarfieldSection glassLevel="ultraLight" className="relative py-20 md:py-28">
            <div className="container max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left: Content */}
                <div className="space-y-8">
                  <div className="space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                      <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                        Sovereign Safe Superintelligence Infrastructure
                      </span>
                      <br />
                      <span className="text-white text-3xl md:text-4xl lg:text-5xl">
                        for Highly-Regulated Domains
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 leading-[1.7] max-w-3xl">
                      Kendra is the intelligence runtime between foundation models and Autonomous Workers,
                      so you can automate complex workflows in regulated industries at scale while staying in full control.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold rounded-xl px-8 py-3.5 shadow-lg transition-all duration-200 border border-krim-mint/30 w-full sm:w-auto"
                      >
                        Book a demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Keep the visual */}
                <FiveLayerStack />
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 1: WHY SAFE SUPERINTELLIGENCE */}
          <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">Why we need </span>
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Sovereign Safe Superintelligence Infrastructure</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  AI models are powerful but unpredictable. In highly-regulated domains,
                  that unpredictability becomes a compliance, financial, and operational risk.
                </p>
              </div>

              <div className="space-y-12">
                {/* Core Reasons */}
                <div className="grid md:grid-cols-3 gap-6">
                  <GlassCard
                    icon={Brain}
                    title="Models lack context"
                    desc="Foundation models don't understand your specific business rules, regulatory requirements, or operational constraints."
                    color="emerald"
                    index={0}
                  />
                  <GlassCard
                    icon={WarningCircle}
                    title="Failures are costly"
                    desc="A single AI error in regulated operations can trigger regulatory violations, customer complaints, and significant financial losses."
                    color="cyan"
                    index={1}
                  />
                  <GlassCard
                    icon={Shield}
                    title="Trust requires validation"
                    desc="To deploy AI at scale, every action must be validated against policies before execution, not discovered after damage is done."
                    color="teal"
                    index={2}
                  />
                </div>

                {/* The Solution */}
                <div className="p-7 rounded-2xl backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-emerald-600/[0.02] border border-white/[0.06]">
                  <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
                    <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">Kendra</span> provides the missing runtime layer
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-6">Traditional AI deployment</h4>
                      <ul className="space-y-3 text-sm text-white/55">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">→</span>
                          <span>Models connect directly to production systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">→</span>
                          <span>Outputs execute without validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">→</span>
                          <span>Errors discovered after impact</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-krim-cyan mb-6">With Kendra runtime</h4>
                      <ul className="space-y-3 text-sm text-white/55">
                        <li className="flex items-start gap-2">
                          <span className="text-krim-mint mt-0.5">→</span>
                          <span>Runtime layer validates every AI decision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-krim-mint mt-0.5">→</span>
                          <span>Policy enforcement before execution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-krim-mint mt-0.5">→</span>
                          <span>Failures caught and prevented</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 2: COGNITIVE DEFECTS */}
          <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">The </span>
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">validation crisis</span>
                  <span className="text-white"> in production AI</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  Foundation models have cognitive defects unsuitable for regulated operations
                </p>
              </div>

              {/* 8 Defect Cards in Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {([
                  { title: 'Hallucination & Fabrication', desc: 'Hallucinated facts, capabilities, and actions', icon: Brain, glassColor: 'emerald' as GlassColor },
                  { title: 'Reasoning Instability', desc: 'Inconsistent logic across similar contexts', icon: GitBranch, glassColor: 'cyan' as GlassColor },
                  { title: 'Security Vulnerabilities', desc: 'Prompt injection and adversarial attacks', icon: WarningCircle, glassColor: 'emerald' as GlassColor },
                  { title: 'Memory Failures', desc: 'Forgets constraints and prior instructions', icon: Database, glassColor: 'teal' as GlassColor },
                  { title: 'Edge Case Collapse', desc: 'Breaks down in unexpected scenarios', icon: Lightning, glassColor: 'cyan' as GlassColor },
                  { title: 'Temporal Drift', desc: 'Inconsistent behavior over time', icon: Timer, glassColor: 'teal' as GlassColor },
                  { title: 'Authority Confusion', desc: 'Violates permission boundaries', icon: Lock, glassColor: 'emerald' as GlassColor },
                  { title: 'Scale Degradation', desc: 'Performance drops with complexity', icon: ChartLineUp, glassColor: 'cyan' as GlassColor },
                ] as const).map((defect, index) => (
                  <GlassCard
                    key={index}
                    icon={defect.icon}
                    title={defect.title}
                    desc={defect.desc}
                    color={defect.glassColor}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 3: RESEARCH SOLUTIONS */}
          <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="text-white">Research-driven </span>
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">solutions</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  Transforming AI safety challenges into solvable engineering problems
                </p>
              </div>

              {/* Research Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {([
                  { title: 'Epistemological validation', desc: 'Krim-Nyaya framework validates claims against ground truth before execution', icon: Compass, glassColor: 'mint' as GlassColor },
                  { title: 'Compositional safety', desc: 'Mathematical proofs ensure safety properties hold across agent interactions', icon: Network, glassColor: 'cyan' as GlassColor },
                  { title: 'Continuous validation', desc: 'Real-time temporal consistency checks maintain coherent state across operations', icon: Timer, glassColor: 'teal' as GlassColor },
                  { title: 'Adversarial resilience', desc: 'Red-team testing and continuous vulnerability probing', icon: Shield, glassColor: 'emerald' as GlassColor },
                  { title: 'Fairness audits', desc: 'Federated bias detection ensures equitable treatment without exposing data', icon: Scales, glassColor: 'cyan' as GlassColor },
                  { title: 'Multi-agent alignment', desc: 'State and memory coordination prevent conflicting actions between Autonomous Workers', icon: GitBranch, glassColor: 'emerald' as GlassColor },
                ] as const).map((solution, index) => (
                  <GlassCard
                    key={index}
                    icon={solution.icon}
                    title={solution.title}
                    desc={solution.desc}
                    color={solution.glassColor}
                    index={index}
                  />
                ))}
              </div>

              {/* Bottom Note */}
              <div className="mt-12 text-center">
                <p className="text-lg text-white/60 max-w-3xl mx-auto">
                  Every research breakthrough becomes <span className="text-krim-mint font-semibold">production-ready runtime code</span> that powers your operations
                </p>
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 4: STRUCTURAL SAFETY */}
          <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">Structural </span>
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">safety</span>
                  <span className="text-white"> by design</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  Three layers of protection that make AI predictable, controllable, and auditable
                </p>
              </div>

              <div className="space-y-12">
                {/* Three Pillars */}
                <div className="grid md:grid-cols-3 gap-6">
                  <GlassCard icon={Shield} title={<><span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">Safety</span> by construction</>} color="green" index={0}>
                    <p className="text-sm text-white/55 mb-3 leading-relaxed">
                      Build safety into the architecture, not bolt it on after
                    </p>
                    <ul className="space-y-3 text-sm text-white/55 flex-1">
                      <li>• Typed action primitives</li>
                      <li>• Formal policy constraints</li>
                      <li>• Capability boundaries</li>
                    </ul>
                  </GlassCard>

                  <GlassCard icon={Compass} title={<>Runtime <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">alignment</span></>} color="cyan" index={1}>
                    <p className="text-sm text-white/55 mb-3 leading-relaxed">
                      Continuous validation and correction during execution
                    </p>
                    <ul className="space-y-3 text-sm text-white/55 flex-1">
                      <li>• Pre-execution validation</li>
                      <li>• Dynamic policy injection</li>
                      <li>• Rollback mechanisms</li>
                    </ul>
                  </GlassCard>

                  <GlassCard icon={Eye} title={<>Full-stack <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">observability</span></>} color="emerald" index={2}>
                    <p className="text-sm text-white/55 mb-3 leading-relaxed">
                      Complete visibility from request to outcome
                    </p>
                    <ul className="space-y-3 text-sm text-white/55 flex-1">
                      <li>• Decision tracing</li>
                      <li>• Audit logging</li>
                      <li>• Performance metrics</li>
                    </ul>
                  </GlassCard>
                </div>

                {/* Decision Flow */}
                <div className="px-6 py-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-emerald-600/[0.02] border border-white/[0.06]">
                  <h3 className="text-center text-xl font-semibold text-white mb-8">
                    Every decision flows through validation gates
                  </h3>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between max-w-3xl mx-auto gap-2 md:gap-0">
                    <span className="text-sm text-white/55">Request</span>
                    <ArrowRight className="w-4 h-4 text-white/55" />
                    <span className="text-sm text-krim-mint">Policy Check</span>
                    <ArrowRight className="w-4 h-4 text-white/55" />
                    <span className="text-sm text-white/55">Process</span>
                    <ArrowRight className="w-4 h-4 text-white/55" />
                    <span className="text-sm text-krim-cyan">Validation</span>
                    <ArrowRight className="w-4 h-4 text-white/55" />
                    <span className="text-sm text-white/55">Execute</span>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>


          {/* SECTION 5: KENDRA IMPACTS */}
          <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">The impact of </span>
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Kendra runtime</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  Transform how AI operates in your regulated infrastructure
                </p>
              </div>

              <div className="space-y-12">
                {/* Key Impacts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <GlassCard icon={Lightning} title="Instant validation" desc="Sub-millisecond validation of every AI decision before it reaches your systems" color="green" index={0} />
                  <GlassCard icon={Database} title="Complete audit trail" desc="Every decision logged with full context for compliance and debugging" color="cyan" index={1} />
                  <GlassCard icon={GitBranch} title="Version control" desc="Roll back AI behaviors when issues are discovered, just like code deployments" color="emerald" index={2} />
                  <GlassCard icon={Stack} title="Model agnostic" desc="Works with any foundation model - GPT, Claude, Gemini, or open source" color="teal" index={3} />
                  <GlassCard icon={Scales} title="Policy as code" desc="Define business rules once, enforce them everywhere AI operates" color="cyan" index={4} />
                  <GlassCard icon={Certificate} title="Compliance ready" desc="Built-in support for regulatory requirements across domains" color="emerald" index={5} />
                </div>

                {/* Operational Benefits */}
                <div className="p-7 rounded-2xl backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-emerald-600/[0.02] border border-white/[0.06]">
                  <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
                    Operational transformation
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">100%</div>
                      <p className="text-sm text-white/55">AI decisions validated</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">Zero violations</div>
                      <p className="text-sm text-white/55">Unvalidated actions blocked</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">Real-time</div>
                      <p className="text-sm text-white/55">Policy enforcement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 6: REGULATED ORGANIZATIONS IMPACT */}
          <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">What this means for</span><br />
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">regulated organizations</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                  A validation layer between AI and operations that catches failures before they happen
                </p>
              </div>

              <div className="space-y-12">
                {/* Concrete Benefits */}
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-8 text-white">What Kendra <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">provides</span></h3>
                    <ul className="space-y-4 text-white/60">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Pre-execution validation</span>
                          <p className="text-sm text-white/55 mt-2">Every AI action checked against your policies before execution</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Audit trail for every decision</span>
                          <p className="text-sm text-white/55 mt-2">Complete logging of what was attempted, validated, and executed</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Continuous monitoring</span>
                          <p className="text-sm text-white/55 mt-2">Real-time oversight of AI operations with automated alerts</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-8 text-white">What Kendra <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">prevents</span></h3>
                    <ul className="space-y-4 text-white/60">
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Policy violations</span>
                          <p className="text-sm text-white/55 mt-2">Block actions that would violate business rules or regulations</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Hallucinated actions</span>
                          <p className="text-sm text-white/55 mt-2">Prevent hallucinated information, protocols, and capabilities</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Cascading failures</span>
                          <p className="text-sm text-white/55 mt-2">Isolate errors before they propagate through systems</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>

          {/* Final CTA Section */}
          <StarfieldSection glassLevel="ultraLight" className="relative py-20 md:py-28 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready for <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">validated AI</span> automation?
                </h2>
                <p className="text-lg md:text-xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto">
                  See how leading organizations deploy AI at scale<br />with <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">Kendra runtime</span> protection
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold rounded-xl px-8 py-3.5 shadow-lg transition-all duration-200 border border-krim-mint/30"
                    >
                      Book a technical deep dive
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </StarfieldSection>

        </StarfieldLayout>
      </MotionConfig>
    </LazyMotion>
  )
}

/**
 * SAFE SUPERINTELLIGENCE PAGE
 * Simplified version focused on content clarity and clean typography
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

// Simple fade animation
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// 5-Layer Stack Visualization Component for Hero - Keep as is
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
          <StarfieldSection glassLevel="ultraLight" className="relative py-24 lg:py-32">
            <div className="container max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Left: Content */}
                <div className="space-y-8">
                  <div className="space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
                      <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">
                        Safe Superintelligence
                      </span>
                      <br />
                      <span className="text-white text-3xl md:text-4xl lg:text-5xl">
                        for Bank Operations
                      </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/80 leading-[1.7] max-w-xl">
                      Kendra is the intelligence runtime between foundation models and AI co-workers, 
                      so you can automate complex banking workflows at scale while staying in full control.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold px-8 py-3.5 shadow-lg transition-all duration-200 border border-krim-mint/30 w-full sm:w-auto"
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

          {/* SECTION 1: WHY SAFE SUPERINTELLIGENCE - Refocused */}
          <StarfieldSection glassLevel="standard" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white leading-tight">
                  Why we need <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">Safe Superintelligence</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  AI models are powerful but unpredictable. In banking operations, 
                  that unpredictability becomes a compliance and financial risk.
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Core Reasons */}
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative h-full p-6 rounded-xl overflow-hidden">
                      {/* Multi-layer background for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] to-emerald-600/[0.03] rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-xl" />
                      <div className="absolute inset-0 backdrop-blur-xl rounded-xl" />
                      
                      {/* Border with gradient */}
                      <div className="absolute inset-0 rounded-xl border border-emerald-400/15 group-hover:border-emerald-400/35 transition-colors duration-500" />
                      
                      {/* Glow effect on hover - THE HIGHLIGHTING AURA */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-400/8 to-transparent" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/25 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/15">
                          <Brain className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-4">Models lack context</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Foundation models don't understand your specific business rules, 
                          regulatory requirements, or operational constraints.
                        </p>
                      </div>
                      
                      {/* Bottom accent line with animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <div className="relative h-full p-6 rounded-xl overflow-hidden">
                      {/* Multi-layer background for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] to-cyan-600/[0.03] rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-xl" />
                      <div className="absolute inset-0 backdrop-blur-xl rounded-xl" />
                      
                      {/* Border with gradient */}
                      <div className="absolute inset-0 rounded-xl border border-cyan-400/15 group-hover:border-cyan-400/35 transition-colors duration-500" />
                      
                      {/* Glow effect on hover - THE HIGHLIGHTING AURA */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/8 to-transparent" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/25 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-cyan-500/15">
                          <WarningCircle className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-4">Failures are costly</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          A single AI error in banking decisions can trigger regulatory violations, 
                          customer complaints, and significant financial losses.
                        </p>
                      </div>
                      
                      {/* Bottom accent line with animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <div className="relative h-full p-6 rounded-xl overflow-hidden">
                      {/* Multi-layer background for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.06] to-teal-600/[0.03] rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-xl" />
                      <div className="absolute inset-0 backdrop-blur-xl rounded-xl" />
                      
                      {/* Border with gradient */}
                      <div className="absolute inset-0 rounded-xl border border-teal-400/15 group-hover:border-teal-400/35 transition-colors duration-500" />
                      
                      {/* Glow effect on hover - THE HIGHLIGHTING AURA */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-400/8 to-transparent" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-400/25 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal-500/15">
                          <Shield className="w-6 h-6 text-teal-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-4">Trust requires validation</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          To deploy AI at scale, every action must be validated against policies 
                          before execution, not discovered after damage is done.
                        </p>
                      </div>
                      
                      {/* Bottom accent line with animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
                    </div>
                  </motion.div>
                </div>
                
                {/* The Solution */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800">
                  <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
                    <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">Kendra</span> provides the missing runtime layer
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-6">Traditional AI deployment</h4>
                      <ul className="space-y-3 text-sm text-white/70">
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
                      <ul className="space-y-3 text-sm text-white/70">
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

          {/* SECTION 2: COGNITIVE DEFECTS - Restructured as cards */}
          <StarfieldSection glassLevel="light" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white leading-tight">
                  The <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">validation crisis</span> in production AI
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  Foundation models exhibit cognitive defects that make them unsafe for banking operations
                </p>
              </div>
              
              {/* 8 Defect Cards in Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Hallucination & Fabrication',
                    desc: 'Invents facts, capabilities, or actions that don\'t exist',
                    icon: Brain,
                    glassColor: 'emerald' // Critical - use emerald
                  },
                  {
                    title: 'Reasoning Instability',
                    desc: 'Inconsistent logic across similar contexts',
                    icon: GitBranch,
                    glassColor: 'cyan' // Medium - use cyan
                  },
                  {
                    title: 'Security Vulnerabilities',
                    desc: 'Prompt injection and adversarial attacks',
                    icon: WarningCircle,
                    glassColor: 'emerald' // Critical - use emerald
                  },
                  {
                    title: 'Memory Failures',
                    desc: 'Forgets constraints and prior instructions',
                    icon: Database,
                    glassColor: 'teal' // Low - use teal
                  },
                  {
                    title: 'Edge Case Collapse',
                    desc: 'Breaks down in unexpected scenarios',
                    icon: Lightning,
                    glassColor: 'cyan' // Medium - use cyan
                  },
                  {
                    title: 'Temporal Drift',
                    desc: 'Inconsistent behavior over time',
                    icon: Timer,
                    glassColor: 'teal' // Low - use teal
                  },
                  {
                    title: 'Authority Confusion',
                    desc: 'Violates permission boundaries',
                    icon: Lock,
                    glassColor: 'emerald' // Critical - use emerald
                  },
                  {
                    title: 'Scale Degradation',
                    desc: 'Performance drops with complexity',
                    icon: ChartLineUp,
                    glassColor: 'cyan' // Medium - use cyan
                  }
                ].map((defect, index) => {
                  const bgGradientClass = defect.glassColor === 'emerald'
                    ? 'from-emerald-500/[0.06] to-emerald-600/[0.03]'
                    : defect.glassColor === 'cyan'
                    ? 'from-cyan-500/[0.06] to-cyan-600/[0.03]'
                    : 'from-teal-500/[0.06] to-teal-600/[0.03]';
                  
                  const borderClass = defect.glassColor === 'emerald'
                    ? 'border-emerald-400/15 group-hover:border-emerald-400/35'
                    : defect.glassColor === 'cyan'
                    ? 'border-cyan-400/15 group-hover:border-cyan-400/35'
                    : 'border-teal-400/15 group-hover:border-teal-400/35';
                  
                  const glowClass = defect.glassColor === 'emerald'
                    ? 'from-emerald-400/8'
                    : defect.glassColor === 'cyan'
                    ? 'from-cyan-400/8'
                    : 'from-teal-400/8';
                  
                  const accentClass = defect.glassColor === 'emerald'
                    ? 'via-emerald-400/50'
                    : defect.glassColor === 'cyan'
                    ? 'via-cyan-400/50'
                    : 'via-teal-400/50';
                  
                  const iconColorClass = defect.glassColor === 'emerald'
                    ? 'text-emerald-400'
                    : defect.glassColor === 'cyan'
                    ? 'text-cyan-400'
                    : 'text-teal-400';
                  
                  const iconBgClass = defect.glassColor === 'emerald'
                    ? 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/25 shadow-emerald-500/15'
                    : defect.glassColor === 'cyan'
                    ? 'from-cyan-500/20 to-cyan-600/10 border-cyan-400/25 shadow-cyan-500/15'
                    : 'from-teal-500/20 to-teal-600/10 border-teal-400/25 shadow-teal-500/15';
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group relative"
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <div className="relative h-full p-5 rounded-lg overflow-hidden">
                        {/* Multi-layer background for depth */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradientClass} rounded-lg`} />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-lg" />
                        <div className="absolute inset-0 backdrop-blur-xl rounded-lg" />
                        
                        {/* Border with gradient */}
                        <div className={`absolute inset-0 rounded-lg border ${borderClass} transition-colors duration-500`} />
                        
                        {/* Glow effect on hover - THE HIGHLIGHTING AURA */}
                        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${glowClass} to-transparent`} />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconBgClass} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                            <defect.icon className={`w-5 h-5 ${iconColorClass}`} />
                          </div>
                          <h3 className="text-base font-semibold text-white mb-3">{defect.title}</h3>
                          <p className="text-sm text-white/80 leading-relaxed">{defect.desc}</p>
                        </div>
                        
                        {/* Bottom accent line with animation */}
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${accentClass} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 3: RESEARCH SOLUTIONS - Now fully separate */}
          <StarfieldSection glassLevel="standard" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-6xl mx-auto px-6">
              {/* Header - Center aligned */}
              <div className="mb-16">
                <div className="flex justify-center mb-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-center">
                    <span className="text-white">Research-driven </span><span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">solutions</span>
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto text-center">
                  Transforming AI safety challenges into solvable engineering problems
                </p>
              </div>
              
              {/* Research Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { 
                    title: 'Epistemological validation', 
                    desc: 'Krim-Nyaya framework for truth verification - validates claims against ground truth before execution',
                    icon: Compass,
                    glassColor: 'mint' // Innovation - mint
                  },
                  { 
                    title: 'Compositional safety', 
                    desc: 'Mathematical proofs for multi-agent systems - ensures safety properties hold as agents interact',
                    icon: Network,
                    glassColor: 'cyan' // Research - cyan
                  },
                  { 
                    title: 'Continuous validation', 
                    desc: 'Real-time temporal consistency checks - maintains coherent state across long-running operations',
                    icon: Timer,
                    glassColor: 'teal' // Information - teal
                  },
                  { 
                    title: 'Adversarial resilience', 
                    desc: 'Automated red-team testing and defense - continuously probes for vulnerabilities',
                    icon: Shield,
                    glassColor: 'emerald' // Solution - emerald
                  },
                  { 
                    title: 'Fairness audits', 
                    desc: 'Federated bias detection across decisions - ensures equitable treatment without data exposure',
                    icon: Scales,
                    glassColor: 'cyan' // Research - cyan
                  },
                  { 
                    title: 'Multi-agent alignment', 
                    desc: 'State and memory coordination protocols - prevents conflicting actions between AI workers',
                    icon: GitBranch,
                    glassColor: 'emerald' // Solution - emerald
                  }
                ].map((solution, index) => {
                  const colorClass = solution.glassColor === 'mint' 
                    ? 'from-green-500/[0.06] to-green-600/[0.03] border-green-400/15 hover:border-green-400/35'
                    : solution.glassColor === 'cyan'
                    ? 'from-cyan-500/[0.06] to-cyan-600/[0.03] border-cyan-400/15 hover:border-cyan-400/35'
                    : solution.glassColor === 'emerald'
                    ? 'from-emerald-500/[0.06] to-emerald-600/[0.03] border-emerald-400/15 hover:border-emerald-400/35'
                    : 'from-teal-500/[0.06] to-teal-600/[0.03] border-teal-400/15 hover:border-teal-400/35';
                  
                  const iconColorClass = solution.glassColor === 'mint'
                    ? 'text-green-400'
                    : solution.glassColor === 'cyan'
                    ? 'text-cyan-400'
                    : solution.glassColor === 'emerald'
                    ? 'text-emerald-400'
                    : 'text-teal-400';
                  
                  const iconBgClass = solution.glassColor === 'mint'
                    ? 'from-green-500/20 to-green-600/10 border-green-400/25 shadow-green-500/15'
                    : solution.glassColor === 'cyan'
                    ? 'from-cyan-500/20 to-cyan-600/10 border-cyan-400/25 shadow-cyan-500/15'
                    : solution.glassColor === 'emerald'
                    ? 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/25 shadow-emerald-500/15'
                    : 'from-teal-500/20 to-teal-600/10 border-teal-400/25 shadow-teal-500/15';
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ delay: index * 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
                      className={`group relative p-6 rounded-xl bg-gradient-to-br ${colorClass} backdrop-blur-xl border transition-all duration-300`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconBgClass} border flex items-center justify-center mb-4`}>
                          <solution.icon className={`w-6 h-6 ${iconColorClass}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-4">{solution.title}</h3>
                        <p className="text-base text-white/80 leading-relaxed">{solution.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Bottom Note */}
              <div className="mt-12 text-center">
                <p className="text-lg text-white/70 max-w-3xl mx-auto">
                  Every research breakthrough becomes <span className="text-krim-mint font-semibold">production-ready runtime code</span> that powers your operations
                </p>
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 4: STRUCTURAL SAFETY - Simplified */}
          <StarfieldSection glassLevel="standard" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                  <span className="text-white">Structural </span><span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">safety</span><span className="text-white"> by design</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  Three layers of protection that make AI predictable, controllable, and auditable
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Three Pillars */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-green-500/[0.06] to-green-600/[0.03] backdrop-blur-xl border border-green-400/15 hover:border-green-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/25 shadow-green-500/15 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-3"><span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">Safety</span> by construction</h3>
                      <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        Build safety into the architecture, not bolt it on after
                      </p>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li>• Typed action primitives</li>
                        <li>• Formal policy constraints</li>
                        <li>• Capability boundaries</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-cyan-500/[0.06] to-cyan-600/[0.03] backdrop-blur-xl border border-cyan-400/15 hover:border-cyan-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/25 shadow-cyan-500/15 flex items-center justify-center mb-4">
                        <Compass className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-3">Runtime <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">alignment</span></h3>
                      <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        Continuous validation and correction during execution
                      </p>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li>• Pre-execution validation</li>
                        <li>• Dynamic policy injection</li>
                        <li>• Rollback mechanisms</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/[0.06] to-emerald-600/[0.03] backdrop-blur-xl border border-emerald-400/15 hover:border-emerald-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/25 shadow-emerald-500/15 flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-3">Full-stack <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">observability</span></h3>
                      <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        Complete visibility from request to outcome
                      </p>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li>• Decision tracing</li>
                        <li>• Audit logging</li>
                        <li>• Performance metrics</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decision Flow */}
                <div className="p-8 rounded-lg bg-slate-900/30 border border-slate-800">
                  <h3 className="text-center text-xl font-semibold text-white mb-8">
                    Every decision flows through validation gates
                  </h3>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between max-w-3xl mx-auto gap-2 md:gap-0">
                    <span className="text-sm text-white/70">Request</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-krim-mint">Policy Check</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">Process</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-krim-cyan">Validation</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">Execute</span>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>


          {/* SECTION 5: NEW KRIMOS IMPACTS */}
          <StarfieldSection glassLevel="standard" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white leading-tight">
                  The impact of <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">Kendra runtime</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  Transform how AI operates in your banking infrastructure
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Key Impacts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-green-500/[0.06] to-green-600/[0.03] backdrop-blur-xl border border-green-400/15 hover:border-green-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/25 shadow-green-500/15 flex items-center justify-center mb-4">
                        <Lightning className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Instant validation</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Sub-millisecond validation of every AI decision before it reaches your systems
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-cyan-500/[0.06] to-cyan-600/[0.03] backdrop-blur-xl border border-cyan-400/15 hover:border-cyan-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/25 shadow-cyan-500/15 flex items-center justify-center mb-4">
                        <Database className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Complete audit trail</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Every decision logged with full context for compliance and debugging
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/[0.06] to-emerald-600/[0.03] backdrop-blur-xl border border-emerald-400/15 hover:border-emerald-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/25 shadow-emerald-500/15 flex items-center justify-center mb-4">
                        <GitBranch className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Version control</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Roll back AI behaviors when issues are discovered, just like code deployments
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-teal-500/[0.06] to-teal-600/[0.03] backdrop-blur-xl border border-teal-400/15 hover:border-teal-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-400/25 shadow-teal-500/15 flex items-center justify-center mb-4">
                        <Stack className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Model agnostic</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Works with any foundation model - GPT, Claude, Gemini, or open source
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-cyan-500/[0.06] to-cyan-600/[0.03] backdrop-blur-xl border border-cyan-400/15 hover:border-cyan-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/25 shadow-cyan-500/15 flex items-center justify-center mb-4">
                        <Scales className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Policy as code</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Define business rules once, enforce them everywhere AI operates
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/[0.06] to-emerald-600/[0.03] backdrop-blur-xl border border-emerald-400/15 hover:border-emerald-400/35 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/25 shadow-emerald-500/15 flex items-center justify-center mb-4">
                        <Certificate className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">Compliance ready</h3>
                      <p className="text-base text-white/80 leading-relaxed">
                        Built-in support for FDCPA, FCRA, and other regulatory requirements
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Operational Benefits */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800">
                  <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
                    Operational transformation
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">100%</div>
                      <p className="text-sm text-white/70">AI decisions validated</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">Zero violations</div>
                      <p className="text-sm text-white/70">Unvalidated actions blocked</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent mb-2">Real-time</div>
                      <p className="text-sm text-white/70">Policy enforcement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>

          {/* SECTION 6: CREDIT INSTITUTIONS IMPACT - Simplified */}
          <StarfieldSection glassLevel="light" className="relative py-24 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                  <span className="text-white">What this means for<br /></span><span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">banking institutions</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  A validation layer between AI and operations that catches failures before they happen
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Concrete Benefits */}
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-8 text-white">What Kendra <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">provides</span></h3>
                    <ul className="space-y-4 text-white/80">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Pre-execution validation</span>
                          <p className="text-base text-white/70 mt-2">Every AI action checked against your policies before execution</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Audit trail for every decision</span>
                          <p className="text-base text-white/70 mt-2">Complete logging of what was attempted, validated, and executed</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Continuous monitoring</span>
                          <p className="text-base text-white/70 mt-2">Real-time oversight of AI operations with automated alerts</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-8 text-white">What Kendra <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">prevents</span></h3>
                    <ul className="space-y-4 text-white/80">
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Policy violations</span>
                          <p className="text-base text-white/70 mt-2">Block actions that would violate business rules or regulations</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Hallucinated actions</span>
                          <p className="text-base text-white/70 mt-2">Prevent AI from inventing information, protocols, or capabilities that don't exist</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Cascading failures</span>
                          <p className="text-base text-white/70 mt-2">Isolate errors before they propagate through systems</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </StarfieldSection>

          {/* Final CTA Section */}
          <StarfieldSection glassLevel="ultraLight" className="relative py-24 lg:py-32 border-t border-slate-800/50">
            <div className="container max-w-5xl mx-auto px-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                  Ready for <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">validated AI</span> automation?
                </h2>
                <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
                  See how leading banking institutions deploy AI at scale<br />with <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-semibold">Kendra runtime</span> protection
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/90 hover:to-krim-cyan/90 text-black font-semibold px-10 py-4 shadow-lg transition-all duration-200 border border-krim-mint/30"
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
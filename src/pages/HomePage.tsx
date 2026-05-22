/**
 * Krim AI — Homepage
 * Premium enterprise design. Glassmorphic cards, large typography, tight layout.
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import IntegrationsCarousel from '../components/home/IntegrationsCarousel'
import Button from '../components/Button'

import KendraVisualV2 from '../components/motion/krim-stack/KendraVisualV2'
import KulaVisualV2 from '../components/motion/krim-stack/KulaVisualV2'
import KartaVisualV2 from '../components/motion/krim-stack/KartaVisualV2'
import KupaVisualV2 from '../components/motion/krim-stack/KupaVisualV2'
import KriyaVisualV2 from '../components/motion/krim-stack/KriyaVisualV2'
import {
  ShieldCheck,
  Lightning,
  TrendUp,
  Headset,
  Buildings,
  ChartBar,
  Cube,
  Target,
  Cpu,
  Users,
  Brain,
  Cloud,
  Lock,
  FileText,
  Handshake,
  ArrowRight,
  ArrowsDownUp,
} from '@phosphor-icons/react'

/* ─────────────────────── Design tokens ─────────────────────── */

const accent = {
  emerald: {
    bg: 'from-emerald-500/[0.05] to-emerald-600/[0.02]',
    bgHover: 'group-hover:from-emerald-500/[0.12] group-hover:to-emerald-600/[0.06]',
    border: 'border-white/[0.08] hover:border-emerald-400/50',
    icon: 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/25',
    iconHover: 'group-hover:scale-110 group-hover:shadow-emerald-400/30 group-hover:shadow-lg',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
    line: 'via-emerald-400/60',
  },
  cyan: {
    bg: 'from-cyan-500/[0.05] to-cyan-600/[0.02]',
    bgHover: 'group-hover:from-cyan-500/[0.12] group-hover:to-cyan-600/[0.06]',
    border: 'border-white/[0.08] hover:border-cyan-400/50',
    icon: 'from-cyan-500/20 to-cyan-600/10 border-cyan-400/25',
    iconHover: 'group-hover:scale-110 group-hover:shadow-cyan-400/30 group-hover:shadow-lg',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]',
    line: 'via-cyan-400/60',
  },
  mint: {
    bg: 'from-[#00FF88]/[0.05] to-[#00FF88]/[0.02]',
    bgHover: 'group-hover:from-[#00FF88]/[0.12] group-hover:to-[#00FF88]/[0.06]',
    border: 'border-white/[0.08] hover:border-[#00FF88]/50',
    icon: 'from-[#00FF88]/20 to-[#00FF88]/10 border-[#00FF88]/25',
    iconHover: 'group-hover:scale-110 group-hover:shadow-[#00FF88]/30 group-hover:shadow-lg',
    text: 'text-[#00FF88]',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]',
    line: 'via-[#00FF88]/60',
  },
  teal: {
    bg: 'from-teal-500/[0.05] to-teal-600/[0.02]',
    bgHover: 'group-hover:from-teal-500/[0.12] group-hover:to-teal-600/[0.06]',
    border: 'border-white/[0.08] hover:border-teal-400/50',
    icon: 'from-teal-500/20 to-teal-600/10 border-teal-400/25',
    iconHover: 'group-hover:scale-110 group-hover:shadow-teal-400/30 group-hover:shadow-lg',
    text: 'text-teal-400',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]',
    line: 'via-teal-400/60',
  },
} as const

type Accent = keyof typeof accent

/* ─────────────────────── Shared primitives ─────────────────────── */

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

/**
 * GlassCard — premium glassmorphic card with vivid hover effects.
 * Hover: lifts, border brightens, background intensifies, colored glow radiates, accent line slides in.
 */
function GlassCard({
  children,
  color = 'emerald',
  className = '',
  compact = false,
  hover = true,
}: {
  children: React.ReactNode
  color?: Accent
  className?: string
  compact?: boolean
  hover?: boolean
}) {
  const a = accent[color]
  return (
    <motion.div
      {...fadeIn}
      className={`group relative ${className}`}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div
        className={`relative h-full flex flex-col ${compact ? 'px-6 py-5' : 'p-7'} rounded-2xl overflow-hidden backdrop-blur-md bg-gradient-to-br ${a.bg} ${a.bgHover} border ${a.border} transition-all duration-500 ${a.glow}`}
      >
        {children}
        {/* Accent line — slides in from center on hover */}
        <div
          className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${a.line} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />
      </div>
    </motion.div>
  )
}

function SectionHeading({
  gradient,
  plain,
  sub,
  className = '',
}: {
  gradient: string
  plain?: string
  sub?: string
  className?: string
}) {
  return (
    <motion.div {...fadeIn} className={`text-center mb-14 ${className}`}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
        <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
          {gradient}
        </span>
        {plain && <span className="text-white"> {plain}</span>}
      </h2>
      {sub && (
        <p className="mt-5 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          {sub}
        </p>
      )}
    </motion.div>
  )
}

/* Pill tab for KrimOS section */
function PillTab({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
        active
          ? 'text-white border border-emerald-400/50 bg-emerald-400/10 shadow-lg shadow-emerald-500/10'
          : 'text-white/50 border border-white/[0.06] bg-white/[0.02] hover:text-white/80 hover:border-white/15'
      }`}
    >
      {children}
    </button>
  )
}

/* ─────────────────────── KrimOS Stack ─────────────────────── */

function KrimOSStack() {
  const [tab, setTab] = useState('kendra')

  const tabs = [
    { id: 'kendra', label: 'Kendra' },
    { id: 'kula', label: 'Kula' },
    { id: 'karta', label: 'Karta' },
    { id: 'kupa', label: 'Kupa' },
    { id: 'kriya', label: 'Kriya' },
  ]

  const content: Record<string, { name: string; desc: string; sub: string; color: Accent; bullets: string[]; icon: React.ReactNode }> = {
    kendra: {
      name: 'Kendra',
      desc: 'Governed Runtime for Regulated Operations',
      sub: 'One controlled layer for all human and AI operations. Safe. Compliant. Auditable.',
      color: 'emerald',
      bullets: ['Safe superintelligence with governed runtime', 'Enterprise-grade compliance controls built-in', 'Complete audit trail for regulated operations'],
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    kula: {
      name: 'Kula',
      desc: 'Natural-Language Digital Twin for Operations Teams',
      sub: 'Design, query, and adjust operations in plain language. Push governed changes instantly.',
      color: 'cyan',
      bullets: ['Design workflows in plain language', 'Apply governed policy updates instantly', 'Fully traceable compliance audit trail'],
      icon: <Lightning className="w-5 h-5 text-cyan-400" />,
    },
    karta: {
      name: 'Karta',
      desc: 'Multi-Modal Autonomous Workers for Contact Center & Back-Office',
      sub: 'Voice, text, and document workflows handled end-to-end. Monitored. Compliant. Controllable.',
      color: 'mint',
      bullets: ['Handles voice, text, and document interactions end-to-end', '20+ pre-built specialists for regulated workflows', 'Real-time monitoring with instant override controls'],
      icon: <Users className="w-5 h-5 text-[#00FF88]" />,
    },
    kupa: {
      name: 'Kupa',
      desc: 'Command Centers for Live Oversight',
      sub: 'Real-time visibility. Instant overrides. Full control over every workflow.',
      color: 'teal',
      bullets: ['Real-time monitoring', 'Instant override capabilities', 'Complete decision traceability'],
      icon: <ChartBar className="w-5 h-5 text-teal-400" />,
    },
    kriya: {
      name: 'Kriya',
      desc: 'Building Blocks of Safe Agentic Automation',
      sub: 'Governed execution primitives. Explainable. Testable. Fully auditable.',
      color: 'emerald',
      bullets: ['Pre-built execution primitives ready to deploy', 'Policies enforced before every action', 'Every decision logged and auditable'],
      icon: <Target className="w-5 h-5 text-emerald-400" />,
    },
  }

  const c = content[tab]

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading gradient="The KrimOS" plain="Stack" sub="Five layers. One governed intelligence runtime." />

        {/* Tabs */}
        <motion.div {...fadeIn} className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((t) => (
            <PillTab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </PillTab>
          ))}
        </motion.div>

        {/* 50/50 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[540px] items-stretch">
          {/* Text */}
          <div className="flex flex-col justify-center lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">{c.name}</span>
                  <span className="text-white"> — {c.desc}</span>
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">{c.sub}</p>
                <ul className="space-y-3">
                  {c.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {c.icon}
                      <span className="text-white/60 text-base">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/${tab === 'kendra' ? 'kendra' : tab}`}>
                  <Button variant="primary" size="md" className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center rounded-2xl overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/[0.06]">
            <div className="w-full h-full p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {tab === 'kendra' && <KendraVisualV2 />}
                  {tab === 'kula' && <KulaVisualV2 />}
                  {tab === 'karta' && <KartaVisualV2 />}
                  {tab === 'kupa' && <KupaVisualV2 />}
                  {tab === 'kriya' && <KriyaVisualV2 />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Main page ─────────────────────── */

export default function HomePage() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [govTab, setGovTab] = useState<'control' | 'deploy'>('control')

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 overflow-x-hidden">

        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-24 md:py-32 overflow-hidden">
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center space-y-10"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="relative"
              >
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 blur-[60px]" />
                </div>
                <KrimAnimatedLogo size="xl" className="h-16 sm:h-20 md:h-24 lg:h-28 relative z-10" />
              </motion.div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.05] tracking-tight max-w-5xl">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Sovereign Superintelligence
                </span>
                <br />
                <span className="text-white">
                  for Safe Autonomous Operations
                </span>
              </h1>

              {/* Tagline pills */}
              <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
                {['Governed Intelligence', 'Controlled Execution', 'Full Audit Trail'].map((t, i) => (
                  <span key={i} className="text-sm md:text-base font-medium text-white/50 tracking-wide uppercase">
                    {i > 0 && <span className="mr-3 md:mr-5 text-white/20">|</span>}
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link to="/contact">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.04, boxShadow: '0 16px 48px rgba(0,255,136,0.3)' } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
                    className="px-8 py-4 bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-base rounded-xl transition-all duration-300"
                  >
                    Book a Demo
                  </motion.button>
                </Link>
                <a href="#domains">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.04 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
                    className="px-8 py-4 backdrop-blur-md bg-white/[0.03] border border-krim-mint/40 text-krim-mint font-bold text-base rounded-xl hover:bg-krim-mint/10 hover:border-krim-mint/60 transition-all duration-300"
                  >
                    Explore Domains
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ DOMAINS ═══════════════ */}
        <section id="domains" className="py-20 md:py-28 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <SectionHeading gradient="Built for" plain="Highly-Regulated Domains" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { to: '/banking', icon: <Handshake className="w-6 h-6 text-emerald-400" />, title: 'AI for Banking', desc: 'Safe superintelligence for credit, loan servicing, and compliance automation.', color: 'emerald' as Accent, cta: 'Explore Banking' },
                { to: '/government', icon: <Buildings className="w-6 h-6 text-cyan-400" />, title: 'AI for Government', desc: 'Governed AI for citizen services, enforcement, and sovereign infrastructure.', color: 'cyan' as Accent, cta: 'Explore Government' },
              ].map((d) => (
                <Link key={d.to} to={d.to} className="block">
                  <GlassCard color={d.color}>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${accent[d.color].icon} flex items-center justify-center mb-5 transition-all duration-300 ${accent[d.color].iconHover}`}>
                        {d.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{d.title}</h3>
                      <p className="text-white/60 leading-relaxed flex-1 text-sm">{d.desc}</p>
                      <div className={`flex items-center gap-2 pt-5 ${accent[d.color].text} font-semibold text-sm`}>
                        {d.cta} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ KRIMOS STACK ═══════════════ */}
        <KrimOSStack />

        {/* ═══════════════ GOVERNANCE FOR INTELLIGENCE ═══════════════ */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeading gradient="Governance" plain="for Intelligence" sub="Policies precede actions. Controls fire before decisions." />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, title: 'Predictable at Scale', items: ['Policies enforced precisely', 'Pre-execution validation', 'Controlled automation'], color: 'emerald' as Accent },
                { icon: <FileText className="w-6 h-6 text-cyan-400" />, title: 'Regulatory Confidence', items: ['Complete explainability', 'Full traceability', 'Real-time dashboards'], color: 'cyan' as Accent },
                { icon: <Target className="w-6 h-6 text-teal-400" />, title: 'Operational Control', items: ['Runtime policy updates', 'Granular overrides', 'Constraint-based optimization'], color: 'teal' as Accent },
              ].map((c, i) => (
                <GlassCard key={i} color={c.color} compact>
                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center mb-4`}>
                      {c.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">{c.title}</h4>
                    <ul className="space-y-1.5">
                      {c.items.map((item, j) => (
                        <li key={j} className="text-sm text-white/55 leading-relaxed flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full ${accent[c.color].text}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ WHY A NEW OS ═══════════════ */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeading
              gradient="Why You Need a"
              plain="New Operating System"
              sub="Legacy systems and unregulated AI don't work. Governed AI does."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: <Cube className="w-7 h-7 text-emerald-400" />, title: 'Fragmented Tools', desc: 'Agents jump between 10+ systems; data sits in silos.', color: 'emerald' as Accent },
                { icon: <Users className="w-7 h-7 text-cyan-400" />, title: 'Human Middleware', desc: 'People patch broken workflows and carry institutional memory.', color: 'cyan' as Accent },
                { icon: <ShieldCheck className="w-7 h-7 text-[#00FF88]" />, title: 'Post-Fact Compliance', desc: 'Most activity is checked after the fact — if at all.', color: 'mint' as Accent },
              ].map((c, i) => (
                <GlassCard key={i} color={c.color}>
                  <div className="relative z-10 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${accent[c.color].iconHover}`}>
                      {c.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{c.desc}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ WHY IT MATTERS ═══════════════ */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeading gradient="Why It" plain="Matters" sub="Operational outcomes executives actually care about." />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {[
                { icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />, title: 'Safer', desc: 'Governed execution. Every action defensible. Zero hallucinations in production.', color: 'emerald' as Accent },
                { icon: <Lightning className="w-8 h-8 text-cyan-400" />, title: 'Faster', desc: 'One runtime. One truth. No tool-switching, no delays.', color: 'cyan' as Accent },
                { icon: <TrendUp className="w-8 h-8 text-[#00FF88]" />, title: 'Compliant', desc: 'Evolve policies without breaking compliance guardrails.', color: 'mint' as Accent },
              ].map((c, i) => (
                <GlassCard key={i} color={c.color}>
                  <div className="relative z-10 text-center py-2">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${accent[c.color].iconHover}`}>
                      {c.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{c.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed">{c.desc}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="text-center">
              <Link to="/kendra">
                <motion.button
                  whileHover={!prefersReducedMotion ? { scale: 1.04 } : {}}
                  className="px-8 py-3.5 rounded-xl backdrop-blur-md bg-white/[0.02] border border-emerald-400/40 text-emerald-400 font-semibold text-base hover:bg-emerald-400/10 hover:border-emerald-400/60 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ INTELLIGENCE EVOLVES ═══════════════ */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <SectionHeading gradient="Intelligence" plain="that evolves with you" sub="Governed improvement. Safe compliance. Always auditable." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                { icon: <TrendUp className="w-6 h-6 text-emerald-400" />, title: 'Performance compounds', desc: 'Safe AI improves continuously through every interaction.', color: 'emerald' as Accent },
                { icon: <Brain className="w-6 h-6 text-cyan-400" />, title: 'Learns locally', desc: 'Refine behavior within your institution. Your data, your knowledge.', color: 'cyan' as Accent },
                { icon: <ShieldCheck className="w-6 h-6 text-[#00FF88]" />, title: 'Compliance holds', desc: 'Guardrails stay fixed. Intelligence evolves safely.', color: 'mint' as Accent },
                { icon: <Users className="w-6 h-6 text-teal-400" />, title: 'Shares gains safely', desc: 'Federated learning. No shared raw data. Full privacy.', color: 'teal' as Accent },
              ].map((c, i) => (
                <GlassCard key={i} color={c.color} compact>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${accent[c.color].iconHover}`}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ INTEGRATIONS CAROUSEL ═══════════════ */}
        <IntegrationsCarousel />

        {/* ═══════════════ GOVERNED INTELLIGENCE — CONTROL + DEPLOY ═══════════════ */}
        <section className="py-24 md:py-32 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeading gradient="Governed Intelligence" sub="Enterprise control meets flexible deployment" />

            {/* Tab switcher */}
            <motion.div {...fadeIn} className="flex justify-center mb-12">
              <div className="inline-flex gap-1 p-1 rounded-xl backdrop-blur-md bg-white/[0.02] border border-white/[0.06]">
                <button
                  onClick={() => setGovTab('control')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    govTab === 'control'
                      ? 'bg-emerald-400/15 border border-emerald-400/30 text-emerald-400'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Control Framework
                </button>
                <button
                  onClick={() => setGovTab('deploy')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    govTab === 'deploy'
                      ? 'bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88]'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Deployment Options
                </button>
              </div>
            </motion.div>

            {/* Control Framework */}
            <AnimatePresence mode="wait">
              {govTab === 'control' && (
                <motion.div
                  key="control"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {[
                      { icon: <Lightning className="w-6 h-6 text-emerald-400" />, title: 'Hallucination Intervention', desc: 'Catch AI errors before production.', color: 'emerald' as Accent },
                      { icon: <Users className="w-6 h-6 text-cyan-400" />, title: 'Human Control', desc: 'Critical decisions stay human. AI advises, you decide.', color: 'cyan' as Accent },
                      { icon: <FileText className="w-6 h-6 text-[#00FF88]" />, title: 'Audit Trail', desc: 'Complete history. Always defensible. Regulatory confidence.', color: 'mint' as Accent },
                    ].map((c, i) => (
                      <GlassCard key={i} color={c.color} compact>
                        <div className="relative z-10 text-center">
                          <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${accent[c.color].iconHover}`}>
                            {c.icon}
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{c.title}</h4>
                          <p className="text-sm text-white/55 leading-relaxed">{c.desc}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Policy-first banner */}
                  <div className="max-w-2xl mx-auto">
                    <GlassCard color="emerald" compact hover={false}>
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm font-semibold text-white">Policy-First Architecture</span>
                        <span className="text-xs text-white/45">— Pre-validated actions. Traceable decisions. Compliant outcomes.</span>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              )}

              {/* Deployment Options */}
              {govTab === 'deploy' && (
                <motion.div
                  key="deploy"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {[
                      { icon: <Buildings className="w-6 h-6 text-teal-400" />, title: 'On-Premise', desc: 'Sovereign AI in your data center.', color: 'teal' as Accent, items: ['100% data sovereignty', 'Air-gapped security', 'Custom integrations'] },
                      { icon: <Cloud className="w-6 h-6 text-emerald-400" />, title: 'Single-Tenant VPC', desc: 'Isolated, governed cloud deployment.', color: 'emerald' as Accent, items: ['Dedicated resources', 'Full control', 'High availability'] },
                      { icon: <Lightning className="w-6 h-6 text-teal-400" />, title: 'Multi-Tenant Cloud', desc: 'Fast, managed deployment. Scale instantly.', color: 'teal' as Accent, items: ['Instant deployment', 'Managed updates', 'Cost-effective'] },
                    ].map((c, i) => (
                      <GlassCard key={i} color={c.color}>
                        <div className="relative z-10 text-center">
                          <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${accent[c.color].icon} flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${accent[c.color].iconHover}`}>
                            {c.icon}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                          <p className="text-sm text-white/55 mb-4">{c.desc}</p>
                          <div className="space-y-1.5">
                            {c.items.map((item, j) => (
                              <div key={j} className="flex items-center justify-center gap-2">
                                <div className={`w-1 h-1 rounded-full ${accent[c.color].text}`} />
                                <span className="text-xs text-white/45">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div {...fadeIn} className="text-center mt-14">
              <Link to="/contact">
                <motion.button
                  whileHover={!prefersReducedMotion ? { scale: 1.04 } : {}}
                  className="px-8 py-3.5 rounded-xl backdrop-blur-md bg-white/[0.02] border border-emerald-400/40 text-emerald-400 font-semibold text-base hover:bg-emerald-400/10 hover:border-emerald-400/60 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ CLOSING CTA ═══════════════ */}
        <section className="py-24 md:py-32 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <motion.div {...fadeIn} className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                    Execution becomes
                  </span>{' '}
                  <span className="text-white">autonomous.</span>
                </h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                    Control stays
                  </span>{' '}
                  <span className="text-white">absolute.</span>
                </h2>
              </div>

              <div className="space-y-5">
                <h3 className="text-3xl md:text-4xl font-bold text-white">Ready to get started?</h3>
                <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
                  Let's explore how governed AI can run your operations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link to="/contact">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.04, boxShadow: '0 16px 48px rgba(0,255,136,0.3)' } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-krim-mint to-cyan-500 text-black font-bold text-base transition-all duration-300"
                  >
                    Book a Demo
                  </motion.button>
                </Link>
                <Link to="/kendra">
                  <motion.button
                    whileHover={!prefersReducedMotion ? { scale: 1.04 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
                    className="px-10 py-4 rounded-xl backdrop-blur-md bg-white/[0.02] border border-emerald-400/40 text-emerald-400 font-bold text-base hover:bg-emerald-400/10 hover:border-emerald-400/60 transition-all duration-300"
                  >
                    Explore Platform
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

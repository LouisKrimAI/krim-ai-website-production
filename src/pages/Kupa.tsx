/**
 * KUPA COMMAND CENTERS - Operational Control Interfaces
 * Compact glassmorphic design with teal/cyan accent theme
 */

import React from 'react'
import {
  Eye, Shield, Users, Target, Scales, ChartBar,
  Gavel, MapPin, Building,
  Lightning, TrendUp, ArrowRight
} from '@phosphor-icons/react'
import Button from '../components/Button'
import { motion, LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

// Import layout and motion components
import {
  StarfieldLayout,
  StarfieldSection
} from '../components/motion/StarfieldLayout'
import {
  Reveal
} from '../components/motion/primitives'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Compact glassmorphic card for command centers
interface CommandCenterCardProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  index: number
}

function CommandCenterCard({
  title,
  description,
  icon: Icon,
  index
}: CommandCenterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      className="group relative backdrop-blur-md bg-gradient-to-br from-teal-500/[0.05] to-cyan-500/[0.02] group-hover:from-teal-500/[0.12] group-hover:to-cyan-500/[0.06] border border-white/[0.08] hover:border-teal-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]"
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/15 to-cyan-500/10 border border-teal-400/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-400/30">
          <Icon className="w-5 h-5 text-teal-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/55 leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line with hover reveal */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400/60 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}


// Main Kupa Page Component
export default function Kupa() {
  const prefersReducedMotion = useReducedMotion()

  const commandCenters = [
    {
      title: 'Campaign Operations',
      description: 'Multi-channel performance tracking with compliance guardrails',
      icon: Target,
    },
    {
      title: 'Support Queue',
      description: 'Task routing between autonomous workers and human specialists',
      icon: Users,
    },
    {
      title: 'Legal Tracking',
      description: 'Dispute monitoring with deadline alerts and filing status',
      icon: Gavel,
    },
    {
      title: 'Field Operations',
      description: 'Field team deployment and visit outcome tracking',
      icon: MapPin,
    },
    {
      title: 'Compliance Monitor',
      description: 'Violation detection with automated interventions',
      icon: Scales,
    },
    {
      title: 'Risk Analysis',
      description: 'Portfolio deterioration alerts with intervention triggers',
      icon: TrendUp,
    },
    {
      title: 'Settlement Management',
      description: 'Approval workflows with enforced authority limits',
      icon: ChartBar,
    },
    {
      title: 'Executive View',
      description: 'Operational metrics with process drill-down capability',
      icon: Building,
    }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <StarfieldLayout pageType="product" contentDensity="sparse">

      {/* Hero Section */}
      <StarfieldSection glassLevel="ultraLight" className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-20 md:py-28">
        <div className="w-full container max-w-6xl mx-auto px-6">

          <div className="text-center">

            {/* Kupa Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kupa™ Command Centers
              </span>
            </motion.h2>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light tracking-wide mb-10 leading-relaxed"
            >
              Built on Kendra Runtime
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed"
            >
              See worker performance and portfolio health live across all channels. Act with policy controls when needed. Scale oversight without scaling headcount.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
              >
                Tour Live Operations Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

        </div>
      </StarfieldSection>

      {/* Command Centers Grid */}
      <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-6">

          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Eight Mission-Critical</span><br />
                <span className="text-white">Control Centers</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Tailored interfaces for campaigns, support, legal, field, compliance, risk, settlement, and executive oversight
              </p>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {commandCenters.map((center, index) => (
              <CommandCenterCard
                key={center.title}
                {...center}
                index={index}
              />
            ))}
          </div>
        </div>
      </StarfieldSection>

      {/* Core Capabilities */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-gray-800">
        <div className="container max-w-6xl mx-auto px-6">

          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Visibility, Action, Compliance</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Three capabilities working together to let you control operations at scale
              </p>
            </div>
          </Reveal>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Eye,
                title: 'Real-Time Visibility',
                description: 'Spot issues instantly across all operational channels',
                from: 'from-teal-400/[0.05]',
                to: 'to-cyan-400/[0.02]',
                hoverFrom: 'group-hover:from-teal-400/[0.12]',
                hoverTo: 'group-hover:to-cyan-400/[0.06]',
                hover: 'hover:border-teal-400/50',
                hoverShadow: 'group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]',
                iconBg: 'from-teal-400/15 to-teal-400/5',
                iconBorder: 'border-teal-400/20',
                iconColor: 'text-teal-400',
                iconGlow: 'group-hover:shadow-teal-400/30',
              },
              {
                icon: Lightning,
                title: 'Policy-Enforced Action',
                description: 'Act with built-in policy protection and approval workflows',
                from: 'from-cyan-400/[0.05]',
                to: 'to-teal-400/[0.02]',
                hoverFrom: 'group-hover:from-cyan-400/[0.12]',
                hoverTo: 'group-hover:to-teal-400/[0.06]',
                hover: 'hover:border-cyan-400/50',
                hoverShadow: 'group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]',
                iconBg: 'from-cyan-400/15 to-cyan-400/5',
                iconBorder: 'border-cyan-400/20',
                iconColor: 'text-cyan-400',
                iconGlow: 'group-hover:shadow-cyan-400/30',
              },
              {
                icon: Shield,
                title: 'Compliance Ready',
                description: 'Complete transparency and automatic compliance documentation',
                from: 'from-teal-400/[0.05]',
                to: 'to-cyan-400/[0.02]',
                hoverFrom: 'group-hover:from-teal-400/[0.12]',
                hoverTo: 'group-hover:to-cyan-400/[0.06]',
                hover: 'hover:border-teal-400/50',
                hoverShadow: 'group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]',
                iconBg: 'from-teal-400/15 to-teal-400/5',
                iconBorder: 'border-teal-400/20',
                iconColor: 'text-teal-400',
                iconGlow: 'group-hover:shadow-teal-400/30',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className={`group relative backdrop-blur-md bg-gradient-to-br ${pillar.from} ${pillar.to} ${pillar.hoverFrom} ${pillar.hoverTo} border border-white/[0.08] ${pillar.hover} rounded-2xl p-7 transition-all duration-500 overflow-hidden ${pillar.hoverShadow}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.iconBg} border ${pillar.iconBorder} flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${pillar.iconGlow}`}>
                    <pillar.icon className={`w-5 h-5 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white pt-1">{pillar.title}</h3>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400/60 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </StarfieldSection>

      {/* Architecture Integration Section */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Architecture:</span>{' '}
                <span className="text-white">Command Centers on Kendra</span>
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} once={true}>
            <div className="backdrop-blur-md bg-gradient-to-br from-teal-500/[0.05] to-cyan-500/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5 max-w-4xl mx-auto">
              <div className="space-y-4">
                {[
                  { label: 'Foundation', color: 'bg-teal-400', borderColor: 'border-teal-400', textColor: 'text-teal-400', text: 'Kendra Runtime (orchestration + policy enforcement)' },
                  { label: 'Data Layer', color: 'bg-krim-mint', borderColor: 'border-krim-mint', textColor: 'text-krim-mint', text: 'Kula Digital Twins (unified customer view)' },
                  { label: 'Actions', color: 'bg-emerald-400', borderColor: 'border-emerald-400', textColor: 'text-emerald-400', text: 'Kriya Primitives (policy-checked operations)' },
                  { label: 'Workers', color: 'bg-cyan-400', borderColor: 'border-cyan-400', textColor: 'text-cyan-400', text: 'Karta Autonomous Workers (automated task execution)' },
                ].map((item) => (
                  <div key={item.label} className={`flex items-start gap-4 px-4 py-3 rounded-lg bg-white/[0.02] border-l-2 ${item.borderColor}`}>
                    <div className={`w-2 h-2 rounded-full ${item.color} mt-2 flex-shrink-0`} />
                    <div className="flex-1">
                      <span className={`font-mono text-sm font-bold ${item.textColor} uppercase tracking-wider`}>{item.label}</span>
                      <p className="text-sm text-white/55 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
                <p className="text-sm text-white/55">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent font-bold">Real-time updates</span>
                  <span> across all components. </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-bold">Single source of truth.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Leadership Section - Role-Based Views */}
      <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-6">

          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Configured for Each Role</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                CROs see risk. COOs see operations. Compliance officers see violations. Each role gets their dashboard.
              </p>
            </div>
          </Reveal>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                role: 'Chief Risk Officer',
                icon: Shield,
                points: [
                  'Portfolio risk monitoring',
                  'Compliance violations tracking',
                  'Regulatory reporting automation'
                ]
              },
              {
                role: 'Head of Operations',
                icon: Target,
                points: [
                  'Campaign performance metrics',
                  'Agent productivity insights',
                  'Settlement workflow control'
                ]
              },
              {
                role: 'Chief Compliance Officer',
                icon: Scales,
                points: [
                  'Real-time compliance monitoring',
                  'Policy enforcement automation',
                  'Audit trail documentation'
                ]
              },
              {
                role: 'Legal Counsel',
                icon: Gavel,
                points: [
                  'Dispute case management',
                  'Legal deadline tracking',
                  'Regulatory filing status'
                ]
              },
              {
                role: 'Field Operations Lead',
                icon: MapPin,
                points: [
                  'Territory planning tools',
                  'Visit outcome tracking',
                  'Field team coordination'
                ]
              }
            ].map((persona, idx) => (
              <motion.div
                key={persona.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="group relative backdrop-blur-md bg-gradient-to-br from-teal-500/[0.05] to-cyan-500/[0.02] group-hover:from-teal-500/[0.12] group-hover:to-cyan-500/[0.06] border border-white/[0.08] hover:border-teal-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400/15 to-cyan-400/5 border border-teal-400/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-400/30">
                    <persona.icon className="w-5 h-5 text-teal-400" />
                  </div>
                </div>

                {/* Role */}
                <h3 className="text-lg font-bold text-white mb-4">
                  {persona.role}
                </h3>

                {/* Bullet points */}
                <ul className="space-y-3">
                  {persona.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-white/55 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400/60 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </StarfieldSection>

      {/* Final CTA */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-white/10">
        <div className="container max-w-4xl mx-auto px-6 text-center">

          <Reveal direction="up" delay={0}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Go Live in Weeks</span>
              </h2>

              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center leading-relaxed">
                Pre-built centers configured for your compliance. Deploy Kupa and scale operations immediately.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
              >
                See Kupa in action
              </Button>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>
        </StarfieldLayout>
      </MotionConfig>
    </LazyMotion>
  )
}

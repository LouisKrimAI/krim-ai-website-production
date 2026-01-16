/**
 * KRIM AI - HOW IT WORKS FLOW SECTION
 * Four-module horizontal flow showing data transformation from input to execution
 * Features: Animated SVG paths, flowing particles, glassmorphic cards, staggered reveals
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Database, Brain, Network, Lightning } from '@phosphor-icons/react'
import DataFlowLine from '../atoms/DataFlowLine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function HowItWorksFlow() {
  const prefersReducedMotion = useReducedMotion()

  // Module data configuration
  const modules = [
    {
      icon: Database,
      label: 'Data Layer',
      description: 'Streams real-time credit & behavioral data',
      color: 'mint' as const,
      gradient: 'from-krim-mint/10 to-transparent',
      borderColor: 'border-krim-mint/30',
      glowColor: 'shadow-krim-mint/20',
      delay: 0.2
    },
    {
      icon: Brain,
      label: 'Intelligence Layer',
      description: 'AI models predict borrower behavior',
      color: 'cyan' as const,
      gradient: 'from-krim-cyan/10 to-transparent',
      borderColor: 'border-krim-cyan/30',
      glowColor: 'shadow-krim-cyan/20',
      delay: 0.4
    },
    {
      icon: Network,
      label: 'Orchestration Layer',
      description: 'Coordinates 12+ AI agents in real time',
      color: 'purple' as const,
      gradient: 'from-krim-purple/10 to-transparent',
      borderColor: 'border-krim-purple/30',
      glowColor: 'shadow-krim-purple/20',
      delay: 0.6
    },
    {
      icon: Lightning,
      label: 'Execution Layer',
      description: 'Agents act across voice, SMS, email, chat, back-office',
      color: 'coral' as const,
      gradient: 'from-[#FF6B9D]/10 to-transparent',
      borderColor: 'border-[#FF6B9D]/30',
      glowColor: 'shadow-[#FF6B9D]/20',
      delay: 0.8
    }
  ]

  // Connection line positions (relative to container)
  const connections = [
    { from: { x: 280, y: 200 }, to: { x: 340, y: 200 }, color: 'mint' as const, delay: 1 },
    { from: { x: 600, y: 200 }, to: { x: 660, y: 200 }, color: 'cyan' as const, delay: 1.2 },
    { from: { x: 920, y: 200 }, to: { x: 980, y: 200 }, color: 'purple' as const, delay: 1.4 }
  ]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0A0E1F] to-[#050816]" />

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-krim-cyan/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(50, 255, 199, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(50, 255, 199, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            How the Platform Works
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From data to decision to action — all in{' '}
            <span className="text-krim-cyan font-semibold">milliseconds</span>.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Flow (hidden on mobile) */}
        <div className="hidden lg:block relative">
          {/* Module Cards */}
          <div className="grid grid-cols-4 gap-6 relative">
            {modules.map((module, index) => (
              <motion.div
                key={module.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: module.delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative"
              >
                {/* Glassmorphic Card */}
                <div
                  className={`
                    relative p-6 h-full rounded-2xl
                    bg-gradient-to-br ${module.gradient}
                    backdrop-blur-sm border-2 ${module.borderColor}
                    shadow-lg ${module.glowColor}
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl
                  `}
                >
                  {/* Module Number Badge */}
                  <motion.div
                    className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 ${module.borderColor} bg-black/50 backdrop-blur-sm flex items-center justify-center`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      scale: { duration: 0.5, delay: module.delay + 0.2, type: 'spring' },
                      rotate: { duration: 0.5, delay: module.delay + 0.2 }
                    }}
                  >
                    <span className="text-white/70 font-bold text-xs font-mono">
                      0{index + 1}
                    </span>
                  </motion.div>

                  {/* Icon Container */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0, -5, 0]
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.5
                          }
                    }
                  >
                    <module.icon className="w-8 h-8 text-white" weight="duotone" />
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-white mb-2 text-center">
                    {module.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 text-center leading-relaxed">
                    {module.description}
                  </p>

                  {/* Bottom glow line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${module.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: module.delay + 0.3 }}
                    style={{ originX: 0 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines (Desktop) */}
          <div className="absolute inset-0 pointer-events-none" style={{ height: '400px' }}>
            {connections.map((connection, index) => (
              <DataFlowLine
                key={`connection-${index}`}
                from={connection.from}
                to={connection.to}
                color={connection.color}
                delay={connection.delay}
                style="straight"
              />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              {/* Glassmorphic Card */}
              <div
                className={`
                  relative p-6 rounded-2xl
                  bg-gradient-to-br ${module.gradient}
                  backdrop-blur-sm border-2 ${module.borderColor}
                  shadow-lg ${module.glowColor}
                `}
              >
                {/* Module Number Badge */}
                <motion.div
                  className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 ${module.borderColor} bg-black/50 backdrop-blur-sm flex items-center justify-center`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    scale: { duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' },
                    rotate: { duration: 0.5, delay: index * 0.15 + 0.2 }
                  }}
                >
                  <span className="text-white/70 font-bold text-xs font-mono">
                    0{index + 1}
                  </span>
                </motion.div>

                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <module.icon className="w-7 h-7 text-white" weight="duotone" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{module.label}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Down Arrow Connector (for mobile, except last item) */}
              {index < modules.length - 1 && (
                <motion.div
                  className="flex justify-center my-4"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5 L12 19 M12 19 L7 14 M12 19 L17 14"
                      stroke={module.color === 'mint' ? '#32FFC7' : module.color === 'cyan' ? '#00FFF7' : module.color === 'purple' ? '#9A67FF' : '#FF6B9D'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-krim-mint animate-pulse" />
            <span className="text-xs md:text-sm text-white/60 font-mono tracking-wider">
              SUB-100MS LATENCY ACROSS ALL LAYERS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

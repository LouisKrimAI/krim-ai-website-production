/**
 * KRIM AI - ARCHITECTURE FLOW DIAGRAM SECTION
 * Visual representation of platform architecture with animated data flow
 * Features: Four-layer flow, animated particles, pulsing connectors, responsive layout
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Cpu, Network, DeviceMobile } from '@phosphor-icons/react'
import DataFlowLine from '../atoms/DataFlowLine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ArchitectureFlowDiagram() {
  const prefersReducedMotion = useReducedMotion()

  // Architecture layers configuration
  const layers = [
    {
      icon: Brain,
      label: 'Executive Strategy',
      description: 'Natural language command center',
      color: 'mint' as const,
      position: { desktop: { x: 20, y: 50 }, mobile: { order: 1 } }
    },
    {
      icon: Cpu,
      label: 'Intelligence Engine',
      description: 'AI models and decision logic',
      color: 'cyan' as const,
      position: { desktop: { x: 37, y: 50 }, mobile: { order: 2 } }
    },
    {
      icon: Network,
      label: 'AI Orchestrator',
      description: '12+ specialized AI agents',
      color: 'purple' as const,
      position: { desktop: { x: 54, y: 50 }, mobile: { order: 3 } }
    },
    {
      icon: DeviceMobile,
      label: 'Customer Channels',
      description: 'Voice, SMS, email, chat',
      color: 'coral' as const,
      position: { desktop: { x: 71, y: 50 }, mobile: { order: 4 } }
    }
  ]

  // Connection lines for desktop
  const connections = [
    { from: { x: 280, y: 250 }, to: { x: 380, y: 250 }, color: 'mint' as const, delay: 0.8 },
    { from: { x: 520, y: 250 }, to: { x: 620, y: 250 }, color: 'cyan' as const, delay: 1.2 },
    { from: { x: 760, y: 250 }, to: { x: 860, y: 250 }, color: 'purple' as const, delay: 1.6 }
  ]

  // Color mapping
  const colorMap = {
    mint: {
      text: 'text-krim-mint',
      bg: 'bg-krim-mint/10',
      border: 'border-krim-mint/30',
      glow: 'shadow-krim-mint/20'
    },
    cyan: {
      text: 'text-krim-cyan',
      bg: 'bg-krim-cyan/10',
      border: 'border-krim-cyan/30',
      glow: 'shadow-krim-cyan/20'
    },
    purple: {
      text: 'text-krim-purple',
      bg: 'bg-krim-purple/10',
      border: 'border-krim-purple/30',
      glow: 'shadow-krim-purple/20'
    },
    coral: {
      text: 'text-[#FF6B9D]',
      bg: 'bg-[#FF6B9D]/10',
      border: 'border-[#FF6B9D]/30',
      glow: 'shadow-[#FF6B9D]/20'
    }
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0A0E1F] to-[#050816]" />

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-krim-purple/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(154, 103, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(154, 103, 255, 0.1) 1px, transparent 1px)
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
            Technical Architecture
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From strategic intent to customer interaction — <span className="text-krim-cyan font-semibold">seamless, scalable, intelligent</span>
          </p>
        </motion.div>

        {/* Desktop: Linear Flow Diagram (hidden on mobile) */}
        <div className="hidden lg:block relative">
          {/* SVG Container for connection lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ height: '500px' }}>
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

          {/* Layer nodes */}
          <div className="relative flex justify-between items-center" style={{ height: '500px' }}>
            {layers.map((layer, index) => {
              const colors = colorMap[layer.color]

              return (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative flex flex-col items-center"
                  style={{
                    position: 'absolute',
                    left: `${layer.position.desktop.x}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Step number badge */}
                  <motion.div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 ${colors.border} ${colors.bg} backdrop-blur-sm flex items-center justify-center z-10`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      scale: { duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring' },
                      rotate: { duration: 0.5, delay: index * 0.2 + 0.3 }
                    }}
                  >
                    <span className={`${colors.text} font-bold text-xs font-mono`}>
                      0{index + 1}
                    </span>
                  </motion.div>

                  {/* Node container */}
                  <motion.div
                    className={`
                      relative p-8 rounded-2xl w-64
                      bg-gradient-to-br from-white/5 to-transparent
                      backdrop-blur-sm border-2 ${colors.border}
                      shadow-lg ${colors.glow}
                    `}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: [1, 1.02, 1]
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.7
                          }
                    }
                  >
                    {/* Outer pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${colors.border}`}
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                              scale: [1, 1.05, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }
                      }
                      transition={
                        prefersReducedMotion
                          ? {}
                          : {
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.5
                            }
                      }
                    />

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className={`p-4 rounded-full ${colors.bg} border-2 ${colors.border}`}
                        animate={
                          prefersReducedMotion
                            ? {}
                            : {
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
                                delay: index * 0.3
                              }
                        }
                      >
                        <layer.icon className={`w-8 h-8 ${colors.text}`} weight="duotone" />
                      </motion.div>
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-bold text-white mb-2 text-center leading-tight">
                      {layer.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/60 text-center leading-relaxed">
                      {layer.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {layers.map((layer, index) => {
            const colors = colorMap[layer.color]

            return (
              <motion.div
                key={layer.label}
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
                {/* Glassmorphic card */}
                <div
                  className={`
                    relative p-6 rounded-2xl
                    bg-gradient-to-br from-white/5 to-transparent
                    backdrop-blur-sm border-2 ${colors.border}
                    shadow-lg ${colors.glow}
                  `}
                >
                  {/* Step number badge */}
                  <motion.div
                    className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 ${colors.border} ${colors.bg} backdrop-blur-sm flex items-center justify-center`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      scale: { duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' },
                      rotate: { duration: 0.5, delay: index * 0.15 + 0.2 }
                    }}
                  >
                    <span className={`${colors.text} font-bold text-xs font-mono`}>
                      0{index + 1}
                    </span>
                  </motion.div>

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 shrink-0 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
                      <layer.icon className={`w-7 h-7 ${colors.text}`} weight="duotone" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{layer.label}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Down Arrow Connector (except last item) */}
                {index < layers.length - 1 && (
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
                        stroke={
                          layer.color === 'mint'
                            ? '#32FFC7'
                            : layer.color === 'cyan'
                            ? '#00FFF7'
                            : layer.color === 'purple'
                            ? '#9A67FF'
                            : '#FF6B9D'
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-krim-purple animate-pulse" />
            <span className="text-xs md:text-sm text-white/60 font-mono tracking-wider">
              CLOUD-NATIVE • API-FIRST • ENTERPRISE-SCALE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

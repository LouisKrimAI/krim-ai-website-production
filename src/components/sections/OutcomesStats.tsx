/**
 * KRIM AI - OUTCOMES STATS SECTION
 * Animated statistics showcasing platform impact and performance
 * Features: CountUp animations, circular glow rings, hover pulse effects, staggered reveals
 */

import React from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { ArrowDown, ArrowUp, ShieldCheck, Lightning } from '@phosphor-icons/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useRef, useEffect } from 'react'

export default function OutcomesStats() {
  const prefersReducedMotion = useReducedMotion()

  // Stats data configuration
  const stats = [
    {
      value: 80,
      suffix: '%',
      icon: ArrowDown,
      label: 'Workload Reduction',
      description: 'Automated operations free up human capacity',
      color: 'mint' as const,
      trend: 'down' as const
    },
    {
      value: 94,
      suffix: '%',
      icon: ArrowUp,
      label: 'Accuracy Improvement',
      description: 'AI-driven precision in borrower predictions',
      color: 'cyan' as const,
      trend: 'up' as const
    },
    {
      value: 100,
      suffix: '%',
      icon: ShieldCheck,
      label: 'Compliance Rate',
      description: 'Zero violations with real-time monitoring',
      color: 'purple' as const,
      trend: 'up' as const
    },
    {
      value: 10,
      suffix: '×',
      icon: Lightning,
      label: 'Speed Multiplier',
      description: 'Faster decision-making and execution',
      color: 'coral' as const,
      trend: 'up' as const
    }
  ]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1F] via-[#050816] to-[#0A0E1F]" />

      {/* Radial glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-krim-mint/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-krim-cyan/5 rounded-full blur-[120px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(50, 255, 199, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(50, 255, 199, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
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
            Outcomes That Matter
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Measurable impact across operations, compliance, and performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-krim-cyan animate-pulse" />
            <span className="text-xs md:text-sm text-white/60 font-mono tracking-wider">
              VERIFIED METRICS FROM 500+ ENTERPRISE DEPLOYMENTS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Individual stat card component with counter animation
function StatCard({ stat, index }: { stat: any; index: number }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const [count, setCount] = React.useState(0)

  // Color mapping
  const colorClasses = {
    mint: {
      text: 'text-krim-mint',
      bg: 'bg-krim-mint/10',
      border: 'border-krim-mint/30',
      glow: 'shadow-krim-mint/20',
      ring: '#32FFC7'
    },
    cyan: {
      text: 'text-krim-cyan',
      bg: 'bg-krim-cyan/10',
      border: 'border-krim-cyan/30',
      glow: 'shadow-krim-cyan/20',
      ring: '#00FFF7'
    },
    purple: {
      text: 'text-krim-purple',
      bg: 'bg-krim-purple/10',
      border: 'border-krim-purple/30',
      glow: 'shadow-krim-purple/20',
      ring: '#9A67FF'
    },
    coral: {
      text: 'text-[#FF6B9D]',
      bg: 'bg-[#FF6B9D]/10',
      border: 'border-[#FF6B9D]/30',
      glow: 'shadow-[#FF6B9D]/20',
      ring: '#FF6B9D'
    }
  }

  const colors = colorClasses[stat.color]

  // CountUp animation effect
  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      let start = 0
      const end = stat.value
      const duration = 2000 // 2 seconds
      const increment = end / (duration / 16) // 60fps

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    } else if (isInView && prefersReducedMotion) {
      // Immediately show final value if reduced motion
      setCount(stat.value)
    }
  }, [isInView, stat.value, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      className="relative group"
    >
      {/* Glassmorphic card */}
      <div
        className={`
          relative p-8 rounded-2xl
          bg-gradient-to-br from-white/5 to-transparent
          backdrop-blur-sm border-2 ${colors.border}
          shadow-lg ${colors.glow}
          transition-all duration-300
        `}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: `2px solid ${colors.ring}`,
            opacity: 0.2
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2]
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5
                }
          }
        />

        {/* Icon with trend indicator */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className={`relative p-4 rounded-full ${colors.bg} border-2 ${colors.border}`}
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
            <stat.icon className={`w-8 h-8 ${colors.text}`} weight="duotone" />
          </motion.div>
        </div>

        {/* Animated stat value */}
        <div className="text-center mb-4">
          <div className={`text-5xl md:text-6xl font-bold ${colors.text} mb-2 font-mono`}>
            {stat.trend === 'down' && <span className="text-3xl">↓</span>}
            {count}
            {stat.suffix}
            {stat.trend === 'up' && stat.icon !== Lightning && <span className="text-3xl">↑</span>}
          </div>
        </div>

        {/* Label */}
        <h3 className="text-lg font-bold text-white mb-2 text-center leading-tight">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 text-center leading-relaxed">
          {stat.description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  )
}

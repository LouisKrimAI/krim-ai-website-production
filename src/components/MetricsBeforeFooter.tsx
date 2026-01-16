import React from 'react'
import { motion } from 'framer-motion'
import { TrendUp, ShieldCheck, Users, Trophy, Lightning, Target } from '@phosphor-icons/react'

interface MetricHighlightProps {
  value: string
  label: string
  sublabel: string
  icon: React.ReactNode
  delay?: number
}

function MetricHighlight({ value, label, sublabel, icon, delay = 0 }: MetricHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          delay, 
          duration: 0.6, 
          ease: [0.0, 0.0, 0.2, 1] 
        }
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-krim-mint/30 transition-all duration-300 backdrop-blur-sm"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-krim-mint mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Metric Value */}
        <div className="text-5xl md:text-6xl font-bold font-display text-gradient mb-2 group-hover:text-krim-mint transition-colors duration-300">
          {value}
        </div>
        
        {/* Label */}
        <div className="text-lg font-semibold text-white mb-1">
          {label}
        </div>
        
        {/* Sublabel */}
        <div className="text-sm text-white">
          {sublabel}
        </div>
      </div>
    </motion.div>
  )
}

export default function MetricsBeforeFooter() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-mint/[0.03] to-transparent" />
      <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:60px_60px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center">
              Proven Results at <span className="text-gradient">Enterprise Scale</span>
            </h2>
          </div>
          <p className="text-xl text-white max-w-4xl mx-auto">
            Join 50+ financial institutions already transforming credit servicing<br />
            with our multi-agentic AI infrastructure. Zero violations,<br />
            <span className="text-krim-mint font-semibold">infinite scale, maximum empathy.</span>
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <MetricHighlight
            value="200M+"
            label="AI Calls Processed"
            sublabel="Zero violations across all interactions"
            icon={<Lightning className="w-12 h-12" />}
            delay={0}
          />
          <MetricHighlight
            value="$2B+"
            label="Total Debt Managed"
            sublabel="Across 50+ financial institutions"
            icon={<TrendUp className="w-12 h-12" />}
            delay={0.1}
          />
          <MetricHighlight
            value="35%"
            label="Collection Lift"
            sublabel="Higher recovery rates with behavioral AI"
            icon={<Target className="w-12 h-12" />}
            delay={0.2}
          />
          <MetricHighlight
            value="Zero"
            label="Compliance Violations"
            sublabel="Perfect regulatory compliance record"
            icon={<ShieldCheck className="w-12 h-12" />}
            delay={0.3}
          />
          <MetricHighlight
            value="3.2mo"
            label="Average Payback"
            sublabel="Guaranteed ROI with proven results"
            icon={<Trophy className="w-12 h-12" />}
            delay={0.4}
          />
          <MetricHighlight
            value="10M"
            label="Calls in 11 Hours"
            sublabel="Proven scale for enterprise operations"
            icon={<Users className="w-12 h-12" />}
            delay={0.5}
          />
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          {/* Trust Bar - Responsive: Grid on mobile, inline-flex on tablet+ */}
          <ul className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4 md:px-8 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm max-w-full">
            <li className="flex items-center gap-2 text-xs md:text-sm text-white whitespace-nowrap">
              <div className="w-2 h-2 bg-krim-mint rounded-full motion-safe:animate-pulse" aria-hidden="true"></div>
              <span>50+ Financial Institutions</span>
            </li>
            <li aria-hidden="true" className="hidden md:block w-px h-6 bg-white/20"></li>
            <li className="flex items-center gap-2 text-xs md:text-sm text-white whitespace-nowrap">
              <div className="w-2 h-2 bg-krim-mint rounded-full motion-safe:animate-pulse" aria-hidden="true"></div>
              <span>99.99% Uptime</span>
            </li>
            <li aria-hidden="true" className="hidden md:block w-px h-6 bg-white/20"></li>
            <li className="flex items-center gap-2 text-xs md:text-sm text-white whitespace-nowrap">
              <div className="w-2 h-2 bg-krim-mint rounded-full motion-safe:animate-pulse" aria-hidden="true"></div>
              <span>SOC2</span>
            </li>
            <li aria-hidden="true" className="hidden md:block w-px h-6 bg-white/20"></li>
            <li className="flex items-center gap-2 text-xs md:text-sm text-white whitespace-nowrap">
              <div className="w-2 h-2 bg-krim-mint rounded-full motion-safe:animate-pulse" aria-hidden="true"></div>
              <span>Enterprise Ready</span>
            </li>
          </ul>

          {/* Bottom Message */}
          <p className="text-white mt-8 max-w-2xl mx-auto">
            The multi-agentic AI infrastructure that never sleeps, never errs, and never loses empathy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
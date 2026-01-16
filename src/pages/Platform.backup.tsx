import { useState, useEffect } from 'react'
import { useCursorGlow } from '../hooks/useCursorGlow'
import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Button, { HeroButton } from '../components/Button'
import Card from '../components/Card'

import BrainVisualization from '../components/BrainVisualization'
import { Brain, Lightning, ShieldCheck, Users, Target, TrendUp, Trophy, CheckCircle, Globe, Gear, CaretRight, PuzzlePiece, Phone, ChartLine, FileText, ArrowClockwise, Handshake, ArrowsOutSimple, CurrencyCircleDollar, Megaphone, Headset, Scales, MapPin, Buildings, ArrowRight, Clock } from '@phosphor-icons/react'
import { CUSTOMER_METRICS, getDisplayMetric } from '../data/claimsRegistry'
import { validateComponentMetrics } from '../utils/claimsValidation'
import EnhancedCTA from '../components/atoms/EnhancedCTA'
import PlatformHero from '../components/sections/PlatformHero'
import ParticleBackground from '../components/atoms/ParticleBackground'
import Card3D from '../components/atoms/Card3D'
import LayerConnections from '../components/atoms/LayerConnections'
import HowItWorksFlow from '../components/sections/HowItWorksFlow'
import NeuralMeshBackground from '../components/atoms/NeuralMeshBackground'
import OutcomesStats from '../components/sections/OutcomesStats'
import ArchitectureFlowDiagram from '../components/sections/ArchitectureFlowDiagram'
import PlatformCTA from '../components/sections/PlatformCTA'

const DynamicBrainText = () => {
  const [currentText, setCurrentText] = useState(0)
  const texts = [
    'Multi Agentic OS',
    'Specialized AI Workforce',
    'AI Copilot'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.h3
      key={currentText}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold text-krim-mint mb-3"
    >
      {texts[currentText]}
    </motion.h3>
  )
}

export default function Platform(){
  const navigate = useNavigate()
  const mousePosition = useCursorGlow()
  const [activeTab, setActiveTab] = useState('copilot')
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.8])
  
  // Validate component metrics in development
  useEffect(() => {
    validateComponentMetrics('Platform', [
      'uptime', 'responseTime', 'dailyOrchestration', 'compliance',
      'customers', 'interactions', 'forecastingAccuracy'
    ])
  }, [])

  const technicalSpecifications = [
    {
      category: "Infrastructure",
      specs: [
        { name: "Container Orchestration", value: "Kubernetes 1.28+ with Helm charts" },
        { name: "Service Mesh", value: "Istio for traffic management & security" },
        { name: "Load Balancing", value: "NGINX Ingress with SSL termination" },
        { name: "Auto-scaling", value: "HPA + VPA with custom metrics" },
        { name: "Multi-AZ Deployment", value: "3+ availability zones, active-active" }
      ]
    },
    {
      category: "Data Layer",
      specs: [
        { name: "Primary Database", value: "PostgreSQL 15 with read replicas" },
        { name: "Caching Layer", value: "Redis Cluster (6.2+) with persistence" },
        { name: "Message Broker", value: "Apache Kafka with Schema Registry" },
        { name: "Search Engine", value: "Elasticsearch 8.x for analytics" },
        { name: "Data Warehouse", value: "Snowflake for enterprise reporting" }
      ]
    },
    {
      category: "AI Stack",
      specs: [
        { name: "AI Framework", value: "TensorFlow 2.15 + PyTorch Lightning" },
        { name: "Model Serving", value: "TensorFlow Serving + Triton" },
        { name: "GPU Acceleration", value: "NVIDIA A100/H100 clusters" },
        { name: "Vector Database", value: "Pinecone for embeddings" },
        { name: "AI Pipeline", value: "Kubeflow + AI Flow for lifecycle mgmt" }
      ]
    },
    {
      category: "Security & Compliance",
      specs: [
        { name: "Encryption", value: "AES-256 in transit & at rest" },
        { name: "Identity Management", value: "OIDC/SAML with MFA required" },
        { name: "Audit Logging", value: "Immutable logs with blockchain" },
        { name: "Vulnerability Scanning", value: "Continuous with Snyk + Twistlock" },
        { name: "Compliance", value: "SOC 2, HIPAA-ready, PCI DSS" }
      ]
    }
  ]

  const competitorComparison = [
    {
      feature: "Architecture Pattern",
      krim: "Event-driven microservices with CQRS",
      others: "Monolithic with basic API layer",
      advantage: "scalable"
    },
    {
      feature: "Processing Capacity",
      krim: `${getDisplayMetric('dailyInteractions')} concurrent operations per node`,
      others: "<1K concurrent operations total",
      advantage: "superior"
    },
    {
      feature: "AI Infrastructure",
      krim: "Dedicated GPU clusters + model serving",
      others: "CPU-only with basic AI models",
      advantage: "advanced"
    },
    {
      feature: "Real-time Processing",
      krim: "Apache Kafka + stream processing",
      others: "Batch processing with delays",
      advantage: "immediate"
    },
    {
      feature: "Data Residency Options",
      krim: "On-premise + cloud + hybrid",
      others: "Cloud-only with vendor lock-in",
      advantage: "flexible"
    },
    {
      feature: "Compliance Engine",
      krim: "Real-time violation prevention",
      others: "Post-hoc compliance checking",
      advantage: "proactive"
    },
    {
      feature: "API Architecture",
      krim: "REST + GraphQL + gRPC + Webhooks",
      others: "Limited REST APIs",
      advantage: "comprehensive"
    },
    {
      feature: "Observability Stack",
      krim: "Prometheus + Grafana + Jaeger + ELK",
      others: "Basic logging and monitoring",
      advantage: "complete"
    }
  ]

  return (
    <div className="relative isolate bg-krim-deep-space overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Global Background Elements - Applied to entire Platform page (same as homepage) */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
      </div>

      {/* Content wrapper with proper z-index layering */}
      <div className="relative z-10">
        {/* HERO SECTION - Enterprise AI Infrastructure */}
        <PlatformHero />

        {/* KRIMOS SECTION - PROFESSIONAL SHOWCASE */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-black">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-transparent" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">

            {/* CLEAN PROFESSIONAL HEADER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-20 md:mb-28 relative"
            >
              {/* Floating glow effect behind tagline */}
              <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/20 via-krim-cyan/20 to-krim-purple/20 blur-[120px] -z-10" />

              {/* Ultra-dramatic tagline */}
              <div className="mb-12 md:mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-2 md:space-y-3"
                >
                  <motion.h2
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none"
                    style={{
                      background: 'linear-gradient(90deg, #00FF88, #00D4FF, #B794F6, #00FF88)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 60px rgba(0, 255, 136, 0.5))'
                    }}
                  >
                    Humans Approve.
                  </motion.h2>
                  <motion.h2
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none"
                    style={{
                      background: 'linear-gradient(90deg, #00D4FF, #B794F6, #00FF88, #00D4FF)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 60px rgba(0, 212, 255, 0.5))'
                    }}
                  >
                    Agents Execute.
                  </motion.h2>
                  <motion.h2
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 0.6 }}
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none"
                    style={{
                      background: 'linear-gradient(90deg, #B794F6, #00FF88, #00D4FF, #B794F6)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 60px rgba(183, 148, 246, 0.5))'
                    }}
                  >
                    Audit-Ready.
                  </motion.h2>
                </motion.div>
              </div>

              {/* Kendra Branding with holographic effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative inline-block"
              >
                {/* Holographic scanline effect */}
                <motion.div
                  animate={{ y: [0, 100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-20 pointer-events-none"
                  style={{ filter: 'blur(1px)' }}
                />

                <div className="relative">
                  <h3 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter">
                    <motion.span
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      style={{
                        background: 'linear-gradient(90deg, #00D4FF, #00FF88, #B794F6, #00D4FF)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 80px rgba(0, 212, 255, 0.5)'
                      }}
                    >
                      Kendra
                    </motion.span>
                  </h3>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light tracking-wide">
                    The sovereign execution engine
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* PREMIUM SHOWCASE CARDS - ULTIMATE DESIGN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-32 md:mb-40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                {[
                  {
                    title: 'Collections & Recovery',
                    description: 'Outreach, payment plans, skip tracing, recovery',
                    color: 'cyan',
                    gradient: 'from-cyan-500 via-cyan-400 to-blue-500',
                    delay: 0.7
                  },
                  {
                    title: 'Servicing & Payments',
                    description: 'Payment processing, auto-debit, account maintenance',
                    color: 'mint',
                    gradient: 'from-emerald-500 via-krim-mint to-green-400',
                    delay: 0.85
                  },
                  {
                    title: 'Modifications & Hardship',
                    description: 'Loan restructuring, forbearance, loss mitigation',
                    color: 'purple',
                    gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
                    delay: 1.0
                  },
                  {
                    title: 'Compliance & Resolution',
                    description: 'Regulatory compliance, disputes, audit trails',
                    color: 'orange',
                    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
                    delay: 1.15
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.8,
                      delay: card.delay,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group relative perspective-1000"
                  >
                    {/* Multi-layer glow system */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500`}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-30 group-hover:opacity-50 blur transition-all duration-300`} />

                    {/* Main card container with glass morphism */}
                    <motion.div
                      className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500"
                      whileHover={{
                        scale: 1.03,
                        rotateY: 2,
                        rotateX: -2,
                        z: 50
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Animated energy border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${
                            card.color === 'cyan' ? '#06b6d4' :
                            card.color === 'mint' ? '#00FF88' :
                            card.color === 'purple' ? '#a855f7' :
                            '#f97316'
                          }, transparent)`,
                          backgroundSize: '200% 100%'
                        }}
                        animate={{
                          backgroundPosition: ['0% 0%', '200% 0%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />

                      {/* Holographic scanline effect */}
                      <motion.div
                        animate={{ y: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.3 }}
                        className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
                      />

                      {/* Premium corner accents - larger */}
                      <div className={`absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 ${
                        card.color === 'cyan' ? 'border-cyan-400' :
                        card.color === 'mint' ? 'border-krim-mint' :
                        card.color === 'purple' ? 'border-purple-400' :
                        'border-orange-400'
                      } opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className={`absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 ${
                        card.color === 'cyan' ? 'border-cyan-400' :
                        card.color === 'mint' ? 'border-krim-mint' :
                        card.color === 'purple' ? 'border-purple-400' :
                        'border-orange-400'
                      } opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 ${
                        card.color === 'cyan' ? 'border-cyan-400' :
                        card.color === 'mint' ? 'border-krim-mint' :
                        card.color === 'purple' ? 'border-purple-400' :
                        'border-orange-400'
                      } opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 ${
                        card.color === 'cyan' ? 'border-cyan-400' :
                        card.color === 'mint' ? 'border-krim-mint' :
                        card.color === 'purple' ? 'border-purple-400' :
                        'border-orange-400'
                      } opacity-60 group-hover:opacity-100 transition-opacity`} />

                      {/* Top decorative line */}
                      <div className={`absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-${
                        card.color === 'cyan' ? 'cyan' :
                        card.color === 'mint' ? 'krim-mint' :
                        card.color === 'purple' ? 'purple' :
                        'orange'
                      }-400/50 to-transparent`} />

                      {/* Card content with generous spacing */}
                      <div className="relative p-10 lg:p-14 space-y-6">
                        {/* Icon badge with particle effect */}
                        <motion.div
                          className="relative w-20 h-20 mb-2"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Pulsing glow behind icon */}
                          <motion.div
                            className={`absolute inset-0 bg-${
                              card.color === 'cyan' ? 'cyan' :
                              card.color === 'mint' ? 'krim-mint' :
                              card.color === 'purple' ? 'purple' :
                              'orange'
                            }-500/30 rounded-full blur-xl`}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          />
                          <div className={`relative w-full h-full rounded-xl bg-gradient-to-br ${
                            card.color === 'cyan' ? 'from-cyan-500/20 to-blue-500/10' :
                            card.color === 'mint' ? 'from-krim-mint/20 to-emerald-500/10' :
                            card.color === 'purple' ? 'from-purple-500/20 to-fuchsia-500/10' :
                            'from-orange-500/20 to-amber-500/10'
                          } border border-white/10 flex items-center justify-center backdrop-blur-sm`}>
                            <div className={`w-10 h-10 rounded-lg bg-${
                              card.color === 'cyan' ? 'cyan' :
                              card.color === 'mint' ? 'krim-mint' :
                              card.color === 'purple' ? 'purple' :
                              'orange'
                            }-400/50`} />
                          </div>
                        </motion.div>

                        {/* Title with animated gradient */}
                        <h4 className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight">
                          <motion.span
                            className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                            style={{ backgroundSize: '200% 100%' }}
                          >
                            {card.title}
                          </motion.span>
                        </h4>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-light">
                          {card.description}
                        </p>

                        {/* Bottom status indicator */}
                        <div className="pt-4 flex items-center gap-2">
                          <motion.div
                            className={`w-2 h-2 rounded-full bg-${
                              card.color === 'cyan' ? 'cyan' :
                              card.color === 'mint' ? 'krim-mint' :
                              card.color === 'purple' ? 'purple' :
                              'orange'
                            }-400`}
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          />
                          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">ACTIVE</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CORE PILLARS - 4 Columns Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {[
                  { text: 'Intelligence', subtitle: 'AI Expertise', color: 'krim-mint', rgb: '0, 255, 136' },
                  { text: 'Unity', subtitle: 'Unified Insights', color: 'krim-cyan', rgb: '0, 212, 255' },
                  { text: 'Learning', subtitle: 'Self-Optimizing', color: 'krim-purple', rgb: '183, 148, 246' },
                  { text: 'Compliance', subtitle: 'Built-in Compliance', color: 'krim-coral', rgb: '255, 107, 157' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div
                      className="flex justify-center mb-6"
                      animate={{
                        boxShadow: [
                          `0 0 20px rgba(${item.rgb}, 0.3)`,
                          `0 0 40px rgba(${item.rgb}, 0.6)`,
                          `0 0 20px rgba(${item.rgb}, 0.3)`
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <div className={`w-20 h-20 rounded-full border-2 border-${item.color}/50 bg-gradient-radial from-${item.color}/20 to-transparent flex items-center justify-center`}>
                        <div className={`w-10 h-10 rounded-full bg-${item.color}/50`} />
                      </div>
                    </motion.div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {item.subtitle}
                    </h4>
                    <p className="text-sm md:text-base text-white/60">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* SYSTEM MODEL SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-mint/[0.02] to-transparent" />
          <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:40px_40px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-purple bg-clip-text text-transparent">
                  System Model
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                Kendra is composed of coordinated intelligence and control layers:
              </p>
            </motion.div>

            {/* Layers Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 mb-16"
            >
              {[
                { layer: 'Kupa Command Centers', role: 'Human supervision, policy, audit & risk control', color: 'krim-cyan' },
                { layer: 'Kula Assistant', role: 'Natural-language strategic command & explainability', color: 'krim-mint' },
                { layer: 'Karta Co-Workers', role: 'Autonomous front-office & back-office execution', color: 'krim-purple' },
                { layer: 'Compliance Physics', role: 'Legal & policy enforcement before action', color: 'krim-coral' },
                { layer: 'Institutional Memory', role: 'Skills, context, history, case intelligence', color: 'krim-cyan' },
                { layer: 'Unified Data Fabric', role: 'Live borrower graph across core systems', color: 'krim-mint' }
              ].map((item, index) => (
                <motion.div
                  key={item.layer}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                    {/* Accent Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${item.color} rounded-l-xl`} />

                    <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {/* Layer Name */}
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-${item.color}`}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {item.layer}
                        </h3>
                      </div>

                      {/* Role Description */}
                      <p className="text-base text-white/60 leading-relaxed">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-center space-y-4"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                <motion.div
                  className="w-2 h-2 rounded-full bg-krim-mint"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
              </div>

              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                One OS. One execution surface.
              </p>
              <p className="text-lg md:text-xl text-white/70">
                Governed autonomy at institutional scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EXECUTION FLOW SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-cyan/[0.02] to-transparent" />
          <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:40px_40px]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-purple bg-clip-text text-transparent">
                  A Glimpse Inside Kendra
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-4">
                Borrower hardship intervention scenario:
              </p>
            </motion.div>

            {/* Flow Diagram */}
            <div className="relative max-w-5xl mx-auto">
              {/* Flow Steps */}
              <div className="space-y-8">
                {[
                  { step: 'Detect', description: 'Early distress signals identified', icon: Target, color: 'krim-cyan' },
                  { step: 'Assess', description: 'Full borrower context analyzed', icon: ChartLine, color: 'krim-mint' },
                  { step: 'Generate', description: 'Treatment options prepared', icon: Lightning, color: 'krim-purple' },
                  { step: 'Verify', description: 'Policy & regulatory checks enforced', icon: ShieldCheck, color: 'krim-coral' },
                  { step: 'Review', description: 'Supervisor reviews recommendation', icon: Users, color: 'krim-cyan' },
                  { step: 'Execute', description: 'Human approves; system executes', icon: CheckCircle, color: 'krim-mint' },
                  { step: 'Update', description: 'Core systems updated in real time', icon: Globe, color: 'krim-purple' },
                  { step: 'Audit', description: 'Evidence & decisions auto-logged', icon: FileText, color: 'krim-coral' },
                  { step: 'Learn', description: 'System improves for next cycle', icon: Brain, color: 'krim-cyan' }
                ].map((item, index) => {
                  const Icon = item.icon
                  const isLast = index === 8

                  return (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Flow Arrow (except for last item) */}
                      {!isLast && (
                        <motion.div
                          className="absolute left-[2.75rem] top-full w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          style={{ transformOrigin: 'top' }}
                        />
                      )}

                      {/* Step Card */}
                      <motion.div
                        className="relative group"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start gap-6 p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                          {/* Step Number & Icon */}
                          <div className="flex-shrink-0">
                            <div className="relative">
                              {/* Pulsing Background */}
                              <motion.div
                                className={`absolute inset-0 rounded-xl bg-${item.color}/20 blur-lg`}
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.2
                                }}
                              />

                              {/* Icon Container */}
                              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br from-${item.color}/30 to-${item.color}/10 border border-${item.color}/40 flex items-center justify-center`}>
                                <Icon size={28} className={`text-${item.color}`} weight="duotone" />
                              </div>

                              {/* Step Number Badge */}
                              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-${item.color} border-2 border-black flex items-center justify-center`}>
                                <span className="text-xs font-bold text-black">{index + 1}</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-3">
                              {item.step}
                              <motion.div
                                className={`w-1.5 h-1.5 rounded-full bg-${item.color}`}
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  scale: [1, 1.3, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.15
                                }}
                              />
                            </h3>
                            <p className="text-base md:text-lg text-white/60 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Hover Arrow */}
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <CaretRight size={20} className="text-white/40" weight="bold" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Cycle Arrow - Shows it's a continuous loop */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex items-center justify-center gap-3 mt-12"
              >
                <div className="h-px flex-1 max-w-48 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <ArrowClockwise size={24} className="text-krim-mint" weight="bold" />
                </motion.div>
                <div className="h-px flex-1 max-w-48 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
              </motion.div>

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="text-center text-white/50 text-sm mt-6 font-mono"
              >
                Continuous learning and improvement cycle
              </motion.p>
            </div>
          </div>
        </section>

        {/* ====== OUTCOMES THAT MATTER ====== */}

        {/* ENHANCED GROUPED LAYOUT */}
        <section className="relative py-20 md:py-32 overflow-hidden" aria-label="Platform outcomes and metrics">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] via-[#0a1a2e] to-[#0a0a1f]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-krim-cyan via-krim-purple to-krim-mint bg-clip-text text-transparent">
                  Outcomes That Matter
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Measurable business impact across operational efficiency, compliance, and speed
              </p>
            </motion.div>

            {/* Grouped Metrics with Tier System */}
            <div className="space-y-16">
              {/* TIER 1: BUSINESS IMPACT */}
              <div>
                {/* Tier 1 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    {
                      icon: Target,
                      metric: '50–90%',
                      label: 'Cost Reduction',
                      description: 'lower operational cost vs. traditional collection methods',
                      color: '#00FF88',
                      bgColor: 'rgba(0, 255, 136, 0.15)',
                      borderColor: 'rgba(0, 255, 136, 0.4)',
                      iconBg: 'rgba(0, 255, 136, 0.25)',
                      showCTA: true,
                      ctaText: 'Calculate Your Savings',
                      ctaLink: '/contact',
                      industryAvg: 35,
                      tier: 1
                    },
                    {
                      icon: Trophy,
                      metric: '~3 months',
                      label: 'ROI Payback',
                      description: 'typical payback period for platform investment',
                      color: '#00D4FF',
                      bgColor: 'rgba(0, 212, 255, 0.15)',
                      borderColor: 'rgba(0, 212, 255, 0.4)',
                      iconBg: 'rgba(0, 212, 255, 0.25)',
                      showCTA: true,
                      ctaText: 'See ROI Calculator',
                      ctaLink: '/contact',
                      tier: 1
                    },
                    {
                      icon: TrendUp,
                      metric: '~$1.5M',
                      label: 'Annual Efficiency',
                      description: 'savings per $100M serviced portfolio annually',
                      color: '#8B5CF6',
                      bgColor: 'rgba(139, 92, 246, 0.15)',
                      borderColor: 'rgba(139, 92, 246, 0.4)',
                      iconBg: 'rgba(139, 92, 246, 0.25)',
                      showCTA: true,
                      ctaText: 'View Case Study',
                      ctaLink: '/contact',
                      industryAvg: 650000,
                      tier: 1
                    }
                  ].map((card, index) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group"
                      >
                        <div
                          role="article"
                          aria-labelledby={`metric-${card.label}`}
                          className="relative p-6 lg:p-8 backdrop-blur-md rounded-2xl min-h-[380px] flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                          style={{
                            background: `linear-gradient(to bottom right, ${card.bgColor}, transparent)`,
                            border: `2px solid ${card.borderColor}`,
                            boxShadow: `0 0 20px ${card.color}10`
                          }}
                        >
                          {/* Grid Pattern */}
                          <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }} />

                          {/* Content */}
                          <div className="relative flex flex-col h-full">
                            {/* Icon */}
                            <motion.div
                              className="w-20 h-20 rounded-xl flex items-center justify-center mb-6"
                              style={{
                                background: `linear-gradient(to bottom right, ${card.iconBg}, transparent)`,
                                border: `1px solid ${card.borderColor}`
                              }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon size={40} style={{ color: card.color }} weight="duotone" />
                            </motion.div>

                            {/* Label */}
                            <h3 id={`metric-${card.label}`} className="text-2xl font-bold text-white mb-4">
                              {card.label}
                            </h3>

                            {/* Metric */}
                            <motion.div
                              className="text-5xl lg:text-6xl font-black mb-2 leading-none"
                              style={{
                                color: card.color,
                                filter: `drop-shadow(0 0 25px ${card.color}60)`,
                                fontVariantNumeric: 'tabular-nums'
                              }}
                              initial={{ scale: 0.5, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                            >
                              {card.metric}
                            </motion.div>

                            {/* Description */}
                            <p className="text-sm text-white/70 mt-auto mb-6 leading-relaxed">
                              {card.description}
                            </p>

                            {/* CTA Button */}
                            {card.showCTA && (
                              <Link
                                to={card.ctaLink}
                                state={{ context: `Interested in ${card.label}` }}
                                className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group/cta"
                                style={{
                                  background: `linear-gradient(to right, ${card.color}15, transparent)`,
                                  border: `1px solid ${card.borderColor}`
                                }}
                              >
                                <span className="text-sm font-semibold text-white group-hover/cta:text-opacity-100">
                                  {card.ctaText}
                                </span>
                                <ArrowRight
                                  className="w-4 h-4 transition-transform group-hover/cta:translate-x-1"
                                  style={{ color: card.color }}
                                />
                              </Link>
                            )}

                            {/* Status Indicator */}
                            <div className="absolute top-6 right-6">
                              <motion.div
                                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: card.color,
                                  boxShadow: `0 0 15px ${card.color}`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* TIER 2: PLATFORM PERFORMANCE */}
              <div>
                {/* Tier 2 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    {
                      icon: Lightning,
                      metric: '70%+',
                      label: 'Autonomous Execution',
                      description: 'steps completed without human intervention across workflows',
                      color: '#8B5CF6',
                      bgColor: 'rgba(139, 92, 246, 0.12)',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      iconBg: 'rgba(139, 92, 246, 0.2)',
                      tier: 2
                    },
                    {
                      icon: Clock,
                      metric: 'Minutes',
                      label: 'Resolution Speed',
                      description: 'average resolution time, not days or weeks',
                      color: '#00D4FF',
                      bgColor: 'rgba(0, 212, 255, 0.12)',
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                      iconBg: 'rgba(0, 212, 255, 0.2)',
                      tier: 2
                    },
                    {
                      icon: CheckCircle,
                      metric: '~30 days',
                      label: 'Time to Value',
                      description: 'from contract signature to live production deployment',
                      color: '#00FF88',
                      bgColor: 'rgba(0, 255, 136, 0.12)',
                      borderColor: 'rgba(0, 255, 136, 0.3)',
                      iconBg: 'rgba(0, 255, 136, 0.2)',
                      tier: 2
                    }
                  ].map((card, index) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <div
                          role="article"
                          aria-labelledby={`metric-${card.label}`}
                          className="relative p-6 lg:p-8 backdrop-blur-md rounded-2xl min-h-[320px] flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            background: `linear-gradient(to bottom right, ${card.bgColor}, transparent)`,
                            border: `1px solid ${card.borderColor}`
                          }}
                        >
                          {/* Grid Pattern */}
                          <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }} />

                          {/* Content */}
                          <div className="relative flex flex-col h-full">
                            {/* Icon */}
                            <div
                              className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                              style={{
                                background: `linear-gradient(to bottom right, ${card.iconBg}, transparent)`,
                                border: `1px solid ${card.borderColor}`
                              }}
                            >
                              <Icon size={32} style={{ color: card.color }} weight="duotone" />
                            </div>

                            {/* Label */}
                            <h3 id={`metric-${card.label}`} className="text-xl font-bold text-white/90 mb-3">
                              {card.label}
                            </h3>

                            {/* Metric */}
                            <motion.div
                              className="text-4xl lg:text-5xl font-black mb-auto"
                              style={{
                                color: card.color,
                                filter: `drop-shadow(0 0 20px ${card.color}50)`,
                                fontVariantNumeric: 'tabular-nums'
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                            >
                              {card.metric}
                            </motion.div>

                            {/* Description */}
                            <p className="text-sm text-white/60 mt-4 leading-relaxed">
                              {card.description}
                            </p>

                            {/* Status Indicator */}
                            <div className="absolute top-6 right-6">
                              <motion.div
                                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor: card.color,
                                  boxShadow: `0 0 12px ${card.color}`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* TIER 3: COMPLIANCE - Featured Card */}
              <div>
                {/* Featured Compliance Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 100 }}
                  className="max-w-4xl mx-auto"
                >
                  <div
                    role="article"
                    aria-labelledby="metric-Compliance"
                    className="relative p-8 lg:p-12 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(0, 255, 136, 0.10), transparent)',
                      border: '2px solid rgba(139, 92, 246, 0.4)',
                      boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }} />

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                      {/* Icon */}
                      <motion.div
                        className="w-28 h-28 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), transparent)',
                          border: '1px solid rgba(139, 92, 246, 0.4)'
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ShieldCheck size={56} style={{ color: '#8B5CF6' }} weight="duotone" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 id="metric-Compliance" className="text-3xl font-bold text-white mb-4">
                          Zero Compliance Violations
                        </h3>

                        <motion.div
                          className="text-7xl lg:text-8xl font-black mb-4 leading-none"
                          style={{
                            color: '#8B5CF6',
                            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
                            fontVariantNumeric: 'tabular-nums'
                          }}
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8, type: "spring" }}
                        >
                          ZERO
                        </motion.div>

                        <p className="text-lg text-white/80 mb-6 max-w-2xl">
                          All regulatory requirements enforced before execution — FDCPA, TCPA, CFPB, and industry-specific compliance built into every workflow
                        </p>

                        {/* Compliance Badges */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          {['FDCPA', 'TCPA', 'CFPB', 'SCRA'].map((badge, i) => (
                            <motion.div
                              key={badge}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1 + i * 0.1 }}
                              className="px-3 py-1.5 rounded-md bg-krim-purple/20 border border-krim-purple/40"
                            >
                              <span className="text-xs font-bold text-krim-purple">{badge}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-6 right-6">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-4 h-4 rounded-full bg-krim-purple"
                          style={{
                            boxShadow: '0 0 20px #8B5CF6'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="relative py-20 bg-gradient-to-b from-[#0a0a1f] to-[#0a0a1f]">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Soft Reflection Line */}
              <div className="flex justify-center mb-8">
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
                <span className="text-krim-purple">Software scale.</span>{' '}
                <span className="text-krim-cyan">Human oversight.</span>{' '}
                <span className="text-krim-mint">Regulator-safe.</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* GOVERNANCE & SAFETY SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-mint/[0.02] to-transparent" />
          <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:40px_40px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-purple bg-clip-text text-transparent">
                  Governance & Safety
                </span>
              </h2>
            </motion.div>

            {/* Governance Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { feature: 'Policy-first execution', icon: ShieldCheck, color: 'krim-mint' },
                { feature: 'Human override & command hierarchy', icon: Users, color: 'krim-cyan' },
                { feature: 'Regulator-ready audit trails', icon: FileText, color: 'krim-purple' },
                { feature: 'Model governance & version control', icon: Gear, color: 'krim-coral' },
                { feature: 'SOC-aligned security architecture', icon: ShieldCheck, color: 'krim-mint' },
                { feature: 'Identity & access controls', icon: CheckCircle, color: 'krim-cyan' }
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 80
                    }}
                    className="relative group"
                  >
                    <motion.div
                      className="relative p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 h-full"
                      whileHover={{ scale: 1.03 }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br from-${item.color}/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      {/* Icon */}
                      <div className="relative mb-4">
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color}/30 to-${item.color}/10 border border-${item.color}/40 flex items-center justify-center`}
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${item.color === 'krim-mint' ? 'rgba(0, 255, 136, 0)' : item.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0)' : item.color === 'krim-purple' ? 'rgba(183, 148, 246, 0)' : 'rgba(255, 107, 157, 0)'}`,
                              `0 0 20px 4px ${item.color === 'krim-mint' ? 'rgba(0, 255, 136, 0.2)' : item.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0.2)' : item.color === 'krim-purple' ? 'rgba(183, 148, 246, 0.2)' : 'rgba(255, 107, 157, 0.2)'}`,
                              `0 0 0 0 ${item.color === 'krim-mint' ? 'rgba(0, 255, 136, 0)' : item.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0)' : item.color === 'krim-purple' ? 'rgba(183, 148, 246, 0)' : 'rgba(255, 107, 157, 0)'}`
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        >
                          <Icon size={28} className={`text-${item.color}`} weight="duotone" />
                        </motion.div>

                        {/* Status Indicator */}
                        <motion.div
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-${item.color} border-2 border-black`}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </div>

                      {/* Feature Text */}
                      <h3 className="relative text-base md:text-lg font-bold text-white leading-relaxed">
                        {item.feature}
                      </h3>

                      {/* Bottom Accent Line */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${item.color}/50 to-transparent rounded-b-xl`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.15 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.div
                  className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent via-krim-mint/40 to-krim-mint/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <ShieldCheck size={24} className="text-krim-mint" weight="fill" />
                </motion.div>
                <motion.div
                  className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent via-krim-mint/40 to-krim-mint/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ transformOrigin: 'right' }}
                />
              </div>

              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Trust by <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">architecture</span> — not inspection.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
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
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Operate the Future
                </span>
                <br />
                <span className="text-white">
                  of Credit Servicing
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
                  <motion.div
                    className="relative inline-block group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated Glow Ring */}
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />

                    {/* Button */}
                    <div className="relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-krim-cyan to-krim-mint rounded-full font-bold text-lg md:text-xl text-black shadow-lg shadow-krim-cyan/50 group-hover:shadow-krim-mint/50 transition-all duration-300">
                      <span className="flex items-center gap-3">
                        Book Executive Briefing
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <CaretRight size={24} weight="bold" />
                        </motion.span>
                      </span>
                    </div>

                    {/* Pulse Ring */}
                    <motion.div
                      className="absolute inset-0 border-2 border-krim-cyan rounded-full"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
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
        </section>


      {/* Multi-Agentic Operating System Core - IMPORTED VISUAL */}
      <section className="relative py-16 z-content overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-cyan/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
              <span className="block bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">The AI Brain</span>
              <span className="block text-white">Powering Everything</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white text-center mb-12 max-w-4xl mx-auto leading-relaxed mobile-body prevent-orphans">
              12 specialized agents. One unified intelligence. Zero manual work.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Brain Visualization Section */}
      <section className="relative py-8 z-content -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center lg:justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
              className="flex justify-center lg:justify-center"
            >
              <div className="relative">
                <BrainVisualization size="large" className="mx-auto" />
                {/* Simplified Brain Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-center mt-8"
                >
                  <DynamicBrainText />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-LAYER ENTERPRISE ARCHITECTURE */}
      <section className="relative mb-16 py-12">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Three integrated layers that deliver autonomous credit servicing with enterprise-grade reliability and Fortune 500 compliance standards.
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
            {/* Layer Connection Lines (Desktop Only) */}
            <LayerConnections />
            {/* Layer 1: AI Copilot */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Number Badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-krim-mint/40 bg-krim-mint/10 backdrop-blur-sm flex items-center justify-center z-10"
                initial={{ scale: 0, rotate: -180, boxShadow: '0 0 0px rgba(50, 255, 199, 0.3)' }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(50, 255, 199, 0.3)',
                    '0 0 15px rgba(50, 255, 199, 0.5)',
                    '0 0 0px rgba(50, 255, 199, 0.3)'
                  ]
                }}
                transition={{
                  scale: { duration: 0.6, delay: 0.5, type: 'spring' },
                  rotate: { duration: 0.6, delay: 0.5 },
                  boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <span className="text-krim-mint font-bold text-sm font-mono">01</span>
              </motion.div>

              <Card3D glowColor="mint" intensity="medium" enableTilt={true} enableGlow={true}>
                <div className="p-6 md:p-8 h-full bg-gradient-to-br from-krim-mint/5 to-transparent border-2 border-krim-mint/20 rounded-2xl">
                  <div className="text-center">
                    {/* Enhanced Icon Container */}
                    <motion.div
                      className="relative w-20 h-20 mx-auto mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* Rotating glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-mint/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />

                      {/* Icon core */}
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-krim-mint to-krim-cyan flex items-center justify-center shadow-lg shadow-krim-mint/30">
                        <Brain className="w-12 h-12 text-black" weight="duotone" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">AI Copilot</h3>
                    <p className="text-base text-krim-mint/90 font-semibold mb-6">Strategic Command Center</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Natural language command center. Strategic oversight. Real-time control.
                    </p>
                  </div>

                  {/* Micro bullets */}
                  <div className="space-y-3 pt-4 border-t border-krim-mint/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-mint" />
                      <span className="text-white/70 text-sm">Natural language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-mint" />
                      <span className="text-white/70 text-sm">Portfolio insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-mint" />
                      <span className="text-white/70 text-sm">Performance monitoring</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* Layer 2: Multi-Agentic OS */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Number Badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-krim-cyan/40 bg-krim-cyan/10 backdrop-blur-sm flex items-center justify-center z-10"
                initial={{ scale: 0, rotate: -180, boxShadow: '0 0 0px rgba(0, 255, 247, 0.3)' }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(0, 255, 247, 0.3)',
                    '0 0 15px rgba(0, 255, 247, 0.5)',
                    '0 0 0px rgba(0, 255, 247, 0.3)'
                  ]
                }}
                transition={{
                  scale: { duration: 0.6, delay: 0.65, type: 'spring' },
                  rotate: { duration: 0.6, delay: 0.65 },
                  boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                }}
              >
                <span className="text-krim-cyan font-bold text-sm font-mono">02</span>
              </motion.div>

              <Card3D glowColor="cyan" intensity="medium" enableTilt={true} enableGlow={true}>
                <div className="p-6 md:p-8 h-full bg-gradient-to-br from-krim-cyan/5 to-transparent border-2 border-krim-cyan/20 rounded-2xl">
                  <div className="text-center">
                    {/* Enhanced Icon Container */}
                    <motion.div
                      className="relative w-20 h-20 mx-auto mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* Rotating glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-cyan/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />

                      {/* Icon core */}
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-krim-cyan to-krim-purple flex items-center justify-center shadow-lg shadow-krim-cyan/30">
                        <Lightning className="w-12 h-12 text-black" weight="duotone" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">Multi-Agentic OS</h3>
                    <p className="text-base text-krim-cyan/90 font-semibold mb-6">Intelligent Coordination Engine</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      12 agents. Zero latency. Perfect compliance. 200M+ daily interactions.
                    </p>
                  </div>

                  {/* Micro bullets */}
                  <div className="space-y-3 pt-4 border-t border-krim-cyan/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                      <span className="text-white/70 text-sm">12 specialized agents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                      <span className="text-white/70 text-sm">200M+ interactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-cyan" />
                      <span className="text-white/70 text-sm">Zero latency</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* Layer 3: Agentic AI Workforce */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Number Badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-krim-purple/40 bg-krim-purple/10 backdrop-blur-sm flex items-center justify-center z-10"
                initial={{ scale: 0, rotate: -180, boxShadow: '0 0 0px rgba(154, 103, 255, 0.3)' }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(154, 103, 255, 0.3)',
                    '0 0 15px rgba(154, 103, 255, 0.5)',
                    '0 0 0px rgba(154, 103, 255, 0.3)'
                  ]
                }}
                transition={{
                  scale: { duration: 0.6, delay: 0.8, type: 'spring' },
                  rotate: { duration: 0.6, delay: 0.8 },
                  boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                }}
              >
                <span className="text-krim-purple font-bold text-sm font-mono">03</span>
              </motion.div>

              <Card3D glowColor="violet" intensity="medium" enableTilt={true} enableGlow={true}>
                <div className="p-6 md:p-8 h-full bg-gradient-to-br from-krim-purple/5 to-transparent border-2 border-krim-purple/20 rounded-2xl">
                  <div className="text-center">
                    {/* Enhanced Icon Container */}
                    <motion.div
                      className="relative w-20 h-20 mx-auto mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* Rotating glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-purple/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />

                      {/* Icon core */}
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-krim-purple to-krim-coral flex items-center justify-center shadow-lg shadow-krim-purple/30">
                        <Users className="w-12 h-12 text-white" weight="duotone" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">Agentic AI Workforce</h3>
                    <p className="text-base text-krim-purple/90 font-semibold mb-6">Autonomous Execution Teams</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Empathy-first approach. Guaranteed performance. 47% recovery lift.
                    </p>
                  </div>

                  {/* Micro bullets */}
                  <div className="space-y-3 pt-4 border-t border-krim-purple/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-purple" />
                      <span className="text-white/70 text-sm">4 customer-facing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-purple" />
                      <span className="text-white/70 text-sm">8 operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-krim-purple" />
                      <span className="text-white/70 text-sm">+47% recovery</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>

          {/* Architecture Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-1 md:gap-8 mb-8 px-4">
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-4 justify-center text-center flex-wrap">
                <span className="text-krim-mint font-bold text-base sm:text-lg md:text-4xl whitespace-nowrap">Command</span>
                <CaretRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-8 md:h-8 text-krim-mint flex-shrink-0" />
                <span className="text-krim-cyan font-bold text-base sm:text-lg md:text-4xl whitespace-nowrap">Orchestrate</span>
                <CaretRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-8 md:h-8 text-krim-cyan flex-shrink-0" />
                <span className="text-krim-purple font-bold text-base sm:text-lg md:text-4xl whitespace-nowrap">Execute</span>
              </div>
            </div>
            <p className="text-base md:text-lg text-white max-w-3xl mx-auto">
              From executive strategy to autonomous execution in milliseconds. This is the future of credit servicing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS - 4-Module Flow Visualization */}
      <HowItWorksFlow />

      {/* Core Capabilities Grid - Enhanced */}
      <section className="relative py-20 md:py-28 z-content overflow-hidden">
        {/* Neural Mesh Background */}
        <NeuralMeshBackground nodeCount={25} opacity={0.3} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-transparent to-[#050816]/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">
              Core Capabilities
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Enterprise-grade infrastructure powering autonomous credit operations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                icon: <Lightning className="w-8 h-8" />,
                title: "Real-time Orchestration",
                description: "Handle millions of customer interactions daily without manual work",
                color: "mint" as const,
                metric: "200M+",
                metricLabel: "Daily Interactions",
                progress: 98
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Compliance Protection",
                description: "Eliminate violations before they happen. Automated monitoring protects your business 24/7.",
                color: "cyan" as const,
                metric: "100%",
                metricLabel: "Violation Prevention",
                progress: 100
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Predictive Intelligence",
                description: "Know which borrowers will pay before you call. Optimize every conversation.",
                color: "violet" as const,
                metric: "94%",
                metricLabel: "Prediction Accuracy",
                progress: 94
              },
              {
                icon: <TrendUp className="w-8 h-8" />,
                title: "Infinite Scalability",
                description: "Start with 1,000 loans, scale to 1 million. No infrastructure changes needed.",
                color: "mint" as const,
                metric: "1M+",
                metricLabel: "Concurrent Loans",
                progress: 95
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card3D
                  glowColor={capability.color}
                  intensity="medium"
                  enableTilt={true}
                  enableGlow={true}
                >
                  <div className="h-full p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border-2 border-white/10 rounded-2xl">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`mx-auto mb-4 p-4 rounded-full w-fit ${
                        capability.color === 'mint'
                          ? 'bg-krim-mint/20 border-2 border-krim-mint/30'
                          : capability.color === 'cyan'
                          ? 'bg-krim-cyan/20 border-2 border-krim-cyan/30'
                          : 'bg-krim-purple/20 border-2 border-krim-purple/30'
                      }`}
                    >
                      <div className={
                        capability.color === 'mint'
                          ? 'text-krim-mint'
                          : capability.color === 'cyan'
                          ? 'text-krim-cyan'
                          : 'text-krim-purple'
                      }>
                        {capability.icon}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight text-center">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed text-center mb-6">
                      {capability.description}
                    </p>

                    {/* Metric Display */}
                    <div className="text-center mb-3">
                      <div className={`text-2xl font-bold mb-1 ${
                        capability.color === 'mint'
                          ? 'text-krim-mint'
                          : capability.color === 'cyan'
                          ? 'text-krim-cyan'
                          : 'text-krim-purple'
                      }`}>
                        {capability.metric}
                      </div>
                      <div className="text-xs text-white/50">{capability.metricLabel}</div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full ${
                          capability.color === 'mint'
                            ? 'bg-gradient-to-r from-krim-mint to-krim-mint/50'
                            : capability.color === 'cyan'
                            ? 'bg-gradient-to-r from-krim-cyan to-krim-cyan/50'
                            : 'bg-gradient-to-r from-krim-purple to-krim-purple/50'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${capability.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OUTCOMES THAT MATTER - Animated Stats Section */}
      <OutcomesStats />

      {/* ARCHITECTURE FLOW DIAGRAM - Visual representation of platform architecture */}
      <ArchitectureFlowDiagram />

      {/* 3. CAPABILITIES SECTION - What it can do */}
      <section className="mb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            <span className="text-gradient bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              How powerful can any credit servicing platform be?
            </span>
          </h2>
          <p className="text-xl text-white max-w-4xl mx-auto mb-8">
            Comprehensive debt collection platform with AI agent capabilities, 
            real-time processing, and enterprise integrations. Built for {getDisplayMetric('customers')} financial institutions.
          </p>
          <div className="bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 rounded-xl p-6 border border-krim-mint/30 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-krim-mint mb-3 text-white">Three Core Capability Areas</h3>
            <p className="text-white">
              Agent Capabilities → Processing Capabilities → Integration Capabilities
            </p>
          </div>
        </div>


      {/* 4. TECH SPECS SECTION - Gated Technical Specifications CTA */}
      <section className="mb-16">
        {/* Gated Technical Specifications CTA - Enhanced */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-12 bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 border border-krim-mint/30" glow hover3D>
            <div className="text-center">
              {/* Heading */}
              <motion.h3
                className="text-3xl font-bold text-center text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Technical Specifications & Performance SLAs
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-xl text-white/80 max-w-4xl mx-auto mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Complete enterprise-grade technical documentation including security certifications,
                deployment architectures, system requirements, and contractual SLA commitments.
              </motion.p>

              {/* Feature Cards with Animations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Security Card */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative bg-black/30 rounded-lg p-6 border border-krim-mint/30 hover:border-krim-mint/60 transition-all h-full">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-krim-mint/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                      initial={{ opacity: 0 }}
                    />

                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(0, 255, 136, 0.2)',
                          '0 0 30px rgba(0, 255, 136, 0.4)',
                          '0 0 15px rgba(0, 255, 136, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative"
                    >
                      <ShieldCheck className="w-12 h-12 text-krim-mint mx-auto mb-4" />
                    </motion.div>

                    <h4 className="font-bold text-krim-mint mb-3 text-white text-center">Security & Compliance</h4>
                    <p className="text-sm text-white/80">SOC 2, FDCPA, HIPAA certifications with zero violations across {getDisplayMetric('interactions')} interactions</p>
                  </div>
                </motion.div>

                {/* Tech Stack Card */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative bg-black/30 rounded-lg p-6 border border-krim-cyan/30 hover:border-krim-cyan/60 transition-all h-full">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-krim-cyan/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                      initial={{ opacity: 0 }}
                    />

                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(0, 255, 255, 0.2)',
                          '0 0 30px rgba(0, 255, 255, 0.4)',
                          '0 0 15px rgba(0, 255, 255, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                      className="relative"
                    >
                      <Gear className="w-12 h-12 text-krim-cyan mx-auto mb-4" />
                    </motion.div>

                    <h4 className="font-bold text-krim-cyan mb-3 text-white text-center">Complete Tech Stack</h4>
                    <p className="text-sm text-white/80">Kubernetes, microservices, AI pipeline, and enterprise deployment options</p>
                  </div>
                </motion.div>

                {/* Performance SLAs Card */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative bg-black/30 rounded-lg p-6 border border-krim-coral/30 hover:border-krim-coral/60 transition-all h-full">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-krim-coral/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                      initial={{ opacity: 0 }}
                    />

                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(255, 107, 107, 0.2)',
                          '0 0 30px rgba(255, 107, 107, 0.4)',
                          '0 0 15px rgba(255, 107, 107, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                      className="relative"
                    >
                      <TrendUp className="w-12 h-12 text-krim-coral mx-auto mb-4" />
                    </motion.div>

                    <h4 className="font-bold text-krim-coral mb-3 text-white text-center">Performance SLAs</h4>
                    <p className="text-sm text-white/80">{getDisplayMetric('uptime')} uptime, {"<" + getDisplayMetric('responseTime')} response times</p>
                  </div>
                </motion.div>
              </div>

              {/* What's Included Box */}
              <motion.div
                className="bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 rounded-xl p-6 border border-krim-mint/30 max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h4 className="text-xl font-bold text-krim-mint mb-4 text-white text-center">What's Included:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>✓ Security & compliance certifications</li>
                    <li>✓ Complete technical stack breakdown</li>
                    <li>✓ Deployment architecture options</li>
                    <li>✓ System requirements & specifications</li>
                  </ul>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>✓ Performance SLAs with guarantees</li>
                    <li>✓ Support commitments & response times</li>
                    <li>✓ Scalability targets & guarantees</li>
                    <li>✓ Implementation timeline & process</li>
                  </ul>
                </div>
              </motion.div>

              {/* CTA Button with Enhanced Animation */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link to="/contact" state={{ downloadAsset: 'technical-specifications' }}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    {/* Pulsing glow behind button */}
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-krim-mint/40 via-krim-cyan/40 to-krim-mint/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />

                    <Button className="relative bg-krim-mint text-black font-bold px-12 py-6 text-xl transition-all mb-4 shadow-lg shadow-krim-mint/50">
                      Get Complete Specs
                    </Button>
                  </motion.div>
                </Link>

                <motion.p
                  className="text-sm text-white/70 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Enterprise technical documentation • 32 pages • PDF format
                </motion.p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Trust & Social Proof */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-white/60 mb-6 tracking-wider uppercase">Trusted by Financial Institutions</p>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              "Credit Unions",
              "Community Banks",
              "Regional Lenders",
              "Auto Finance",
              "Consumer Finance",
              "Collection Agencies"
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-krim-mint/30 hover:bg-white/10 transition-all"
              >
                <span className="text-white/80 text-sm font-medium">{category}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

        {/* Processing Capabilities - Split-Screen Showcase */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Real-Time Processing Power
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Panel - Real-Time Processing */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-krim-cyan/10 to-black/50 border border-krim-cyan/30 p-10 h-full hover:border-krim-cyan/60 transition-all">
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-krim-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                />

                {/* Icon with animation */}
                <motion.div
                  className="relative w-16 h-16 mb-6"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                      '0 0 40px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-full h-full rounded-full bg-krim-cyan/20 border-2 border-krim-cyan/50 flex items-center justify-center">
                    <Lightning className="w-8 h-8 text-krim-cyan" weight="duotone" />
                  </div>
                </motion.div>

                {/* Heading */}
                <h4 className="text-2xl font-bold text-krim-cyan mb-4">Real-Time Processing</h4>

                {/* Hero Metric */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
                >
                  <div className="text-4xl font-bold text-krim-cyan">{"<" + getDisplayMetric('responseTime')}</div>
                  <div className="text-white/70 text-sm">API Response Time</div>
                </motion.div>

                {/* Concise Description */}
                <p className="text-white/80 mb-6 text-base leading-relaxed">
                  Lightning-fast infrastructure that scales from thousands to millions of operations without breaking a sweat.
                </p>

                {/* Key Features - Streamlined */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-cyan mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">Event-Driven Architecture</div>
                      <div className="text-white/60 text-xs">Apache Kafka + Redis for microsecond precision</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-cyan mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">Auto-Scaling Infrastructure</div>
                      <div className="text-white/60 text-xs">{getDisplayMetric('dailyInteractions')} concurrent ops → {CUSTOMER_METRICS.dailyOrchestration} calls/day</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-cyan mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">Reliability First</div>
                      <div className="text-white/60 text-xs">{getDisplayMetric('uptime')} uptime with circuit breakers & retry logic</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - AI Processing */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-krim-mint/10 to-black/50 border border-krim-mint/30 p-10 h-full hover:border-krim-mint/60 transition-all">
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-krim-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                />

                {/* Icon with animation */}
                <motion.div
                  className="relative w-16 h-16 mb-6"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0.3)',
                      '0 0 40px rgba(0, 255, 136, 0.5)',
                      '0 0 20px rgba(0, 255, 136, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="w-full h-full rounded-full bg-krim-mint/20 border-2 border-krim-mint/50 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-krim-mint" weight="duotone" />
                  </div>
                </motion.div>

                {/* Heading */}
                <h4 className="text-2xl font-bold text-krim-mint mb-4">AI Processing</h4>

                {/* Hero Metric */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
                >
                  <div className="text-4xl font-bold text-krim-mint">500+</div>
                  <div className="text-white/70 text-sm">AI Signals Analyzed</div>
                </motion.div>

                {/* Concise Description */}
                <p className="text-white/80 mb-6 text-base leading-relaxed">
                  Enterprise-grade AI pipeline that learns, adapts, and optimizes every interaction in real time.
                </p>

                {/* Key Features - Streamlined */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-mint mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">Production ML Infrastructure</div>
                      <div className="text-white/60 text-xs">TensorFlow + PyTorch on NVIDIA GPU clusters</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-mint mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">MLOps Pipeline</div>
                      <div className="text-white/60 text-xs">Kubeflow orchestration with continuous retraining</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-krim-mint mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm">Model Performance</div>
                      <div className="text-white/60 text-xs">A/B testing framework + AI Flow experiment tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integration Capabilities - Hub Visualization */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Universal Integration Hub
          </motion.h3>

          <motion.p
            className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Seamlessly connects with your existing infrastructure through 50+ pre-built integrations
          </motion.p>

          {/* Hub Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Lines (decorative) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-krim-mint/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            {/* Grid Layout - Hub at center, satellites around */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
              {/* Left Satellite - Core Banking */}
              <motion.div
                className="group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="p-6 border border-krim-coral/30 hover:border-krim-coral/60 transition-all relative overflow-hidden" glow hover3D>
                  {/* Animated connection pulse */}
                  <motion.div
                    className="absolute top-1/2 right-0 w-8 h-px bg-gradient-to-r from-krim-coral/50 to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div className="text-center mb-4">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(255, 107, 107, 0.2)',
                          '0 0 30px rgba(255, 107, 107, 0.4)',
                          '0 0 15px rgba(255, 107, 107, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-block"
                    >
                      <Globe className="w-12 h-12 text-krim-coral mx-auto mb-2" />
                    </motion.div>
                    <h4 className="font-bold text-krim-coral text-white text-center">Core Banking Systems</h4>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-coral flex-shrink-0" />
                      <span>Jack Henry (Episys/SilverLake)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-coral flex-shrink-0" />
                      <span>FIS (Profile/Horizon)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-coral flex-shrink-0" />
                      <span>Fiserv (Signature/Premier)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-coral flex-shrink-0" />
                      <span>Custom REST/SOAP APIs</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* Center Hub - Krim AI Platform */}
              <motion.div
                className="lg:order-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              >
                <div className="relative">
                  {/* Pulsing rings around hub */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-krim-mint/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-krim-cyan/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />

                  {/* Central hub card */}
                  <div className="relative bg-gradient-to-br from-krim-mint/20 to-krim-cyan/20 rounded-full p-8 border-2 border-krim-mint/50 hover:border-krim-mint/80 transition-all">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="w-16 h-16 mx-auto mb-4"
                      >
                        <PuzzlePiece className="w-full h-full text-krim-mint" weight="duotone" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">Krim AI Platform</h4>
                      <p className="text-sm text-white/70">Central Integration Hub</p>
                      <motion.div
                        className="mt-4 text-3xl font-bold text-krim-mint"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                      >
                        50+
                      </motion.div>
                      <p className="text-xs text-white/60">Active Connectors</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Satellite - CRM & Collections */}
              <motion.div
                className="group lg:order-3"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="p-6 border border-krim-mint/30 hover:border-krim-mint/60 transition-all relative overflow-hidden" glow hover3D>
                  {/* Animated connection pulse */}
                  <motion.div
                    className="absolute top-1/2 left-0 w-8 h-px bg-gradient-to-l from-krim-mint/50 to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />

                  <div className="text-center mb-4">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(0, 255, 136, 0.2)',
                          '0 0 30px rgba(0, 255, 136, 0.4)',
                          '0 0 15px rgba(0, 255, 136, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                      className="inline-block"
                    >
                      <Users className="w-12 h-12 text-krim-mint mx-auto mb-2" />
                    </motion.div>
                    <h4 className="font-bold text-krim-mint text-white text-center">CRM & Collection Systems</h4>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-mint flex-shrink-0" />
                      <span>Salesforce & HubSpot</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-mint flex-shrink-0" />
                      <span>FICO Debt Manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-mint flex-shrink-0" />
                      <span>CSS Impact & C&R Software</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-krim-mint flex-shrink-0" />
                      <span>Experian Collection Systems</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Satellite - Communication & Telephony */}
            <motion.div
              className="mt-8 max-w-md mx-auto group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-6 border border-krim-cyan/30 hover:border-krim-cyan/60 transition-all relative" glow hover3D>
                {/* Animated connection pulse to center */}
                <motion.div
                  className="absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-t from-krim-cyan/50 to-transparent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                <div className="text-center mb-4">
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 15px rgba(0, 255, 255, 0.2)',
                        '0 0 30px rgba(0, 255, 255, 0.4)',
                        '0 0 15px rgba(0, 255, 255, 0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                    className="inline-block"
                  >
                    <Gear className="w-12 h-12 text-krim-cyan mx-auto mb-2" />
                  </motion.div>
                  <h4 className="font-bold text-krim-cyan text-white text-center">Communication & Telephony</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-krim-cyan flex-shrink-0" />
                    <span>Avaya, Cisco, Genesys</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-krim-cyan flex-shrink-0" />
                    <span>Twilio, RingCentral</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-krim-cyan flex-shrink-0" />
                    <span>WebRTC voice infrastructure</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-krim-cyan flex-shrink-0" />
                    <span>SMS, Email, WhatsApp APIs</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 6. IMPLEMENTATION SECTION - How to deploy */}
      <section className="mb-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Implementation Process
            <span className="text-gradient bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              {" "}& Timeline
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Proven deployment methodology with {CUSTOMER_METRICS.deploymentTime}-day implementation timeline.
            Complete project management, technical support, and professional implementation services.
          </motion.p>

          <motion.div
            className="bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 rounded-xl p-6 border border-krim-mint/30 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-krim-mint mb-3 text-white">Implementation Overview</h3>
            <p className="text-white">
              {CUSTOMER_METRICS.deploymentTime}-day implementation with 48-hour production go-live.
              Professional deployment methodology with dedicated project management.
            </p>
          </motion.div>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            30-Day Implementation Timeline
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {(() => {
              // Helper function for dynamic Tailwind color classes
              const getColorClasses = (color: string) => {
                const colorMap: Record<string, { border30: string; border50: string; text: string }> = {
                  'krim-mint': { border30: 'border-krim-mint/30', border50: 'border-krim-mint/50', text: 'text-krim-mint' },
                  'krim-cyan': { border30: 'border-krim-cyan/30', border50: 'border-krim-cyan/50', text: 'text-krim-cyan' },
                  'krim-coral': { border30: 'border-krim-coral/30', border50: 'border-krim-coral/50', text: 'text-krim-coral' }
                }
                return colorMap[color] || colorMap['krim-mint']
              }

              return [
                {
                  phase: "Phase 1",
                  title: "Discovery & Planning",
                  duration: "Days 1-7",
                  color: "krim-mint",
                tasks: [
                  "Technical architecture review",
                  "Integration points mapping",
                  "Security & compliance audit",
                  "Resource allocation planning"
                ]
              },
              {
                phase: "Phase 2",
                title: "Infrastructure Setup",
                duration: "Days 8-14",
                color: "krim-cyan",
                tasks: [
                  "Kubernetes cluster deployment",
                  "Database & caching layer setup",
                  "Security configuration",
                  "Monitoring & logging setup"
                ]
              },
              {
                phase: "Phase 3",
                title: "System Integration",
                duration: "Days 15-21",
                color: "krim-coral",
                tasks: [
                  "Core banking system integration",
                  "CRM & telephony connections",
                  "Data migration & validation",
                  "API endpoint configuration"
                ]
              },
              {
                phase: "Phase 4",
                title: "Testing & Validation",
                duration: "Days 22-28",
                color: "krim-mint",
                tasks: [
                  "End-to-end system testing",
                  "Performance & load testing",
                  "Security penetration testing",
                  "Compliance validation"
                ]
              },
              {
                phase: "Phase 5",
                title: "Go-Live & Support",
                duration: "Days 29-30",
                color: "krim-cyan",
                tasks: [
                  "48-hour production deployment",
                  "Staff training & onboarding",
                  "24/7 monitoring activation",
                  "Success metrics tracking"
                ]
              }
            ].map((phase, index) => {
              const colorClasses = getColorClasses(phase.color)
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`p-6 h-full border ${colorClasses.border30} hover:${colorClasses.border50} transition-all`} glow hover3D>
                    <div className="text-center mb-4">
                      <div className={`text-sm font-bold ${colorClasses.text} mb-1`}>{phase.phase}</div>
                      <h4 className={`text-lg font-bold ${colorClasses.text} mb-2`}>{phase.title}</h4>
                    <div className="text-sm text-white font-semibold">{phase.duration}</div>
                  </div>
                  <ul className="space-y-2 text-center">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-xs text-white">
                        {task}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
              )
            })
            })()}
          </div>
        </div>

        {/* Support Structure */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Complete Support Structure
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <Card className="p-8 border border-krim-mint/30 hover:border-krim-mint/60 transition-all h-full" glow hover3D>
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-krim-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  initial={{ opacity: 0 }}
                />
              <div className="flex justify-center mb-6">
                <h4 className="text-2xl font-bold text-krim-mint text-white text-center flex items-center">
                  <Users className="w-8 h-8 mr-3" />
                  Dedicated Team Structure
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-white">Technical Project Manager</p>
                    <p className="text-sm text-white">End-to-end implementation oversight</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-white">Solutions Architect</p>
                    <p className="text-sm text-white">Infrastructure design & optimization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-white">Integration Specialists</p>
                    <p className="text-sm text-white">System connectivity & data migration</p>
                  </div>
                </div>
              </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <Card className="p-8 border border-krim-cyan/30 hover:border-krim-cyan/60 transition-all h-full" glow hover3D>
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-krim-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  initial={{ opacity: 0 }}
                />
              <div className="flex justify-center mb-6">
                <h4 className="text-2xl font-bold text-krim-cyan text-white text-center flex items-center">
                  <Target className="w-8 h-8 mr-3" />
                  Success Milestones
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-white">Infrastructure deployed</span>
                  <span className="text-krim-cyan font-bold whitespace-nowrap">Day 14</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-white">Systems integrated & tested</span>
                  <span className="text-krim-cyan font-bold whitespace-nowrap">Day 21</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-white">Staff trained & certified</span>
                  <span className="text-krim-cyan font-bold whitespace-nowrap">Day 28</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-white">Production go-live</span>
                  <span className="text-krim-cyan font-bold whitespace-nowrap">Day 30</span>
                </div>
              </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Implementation Success Metrics */}
        <motion.div
          className="bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 rounded-xl p-8 border border-krim-mint/30 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-2xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Implementation Track Record
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
            >
              <div className="text-5xl font-bold text-krim-mint mb-2">{CUSTOMER_METRICS.deploymentTime}</div>
              <div className="text-white font-semibold">Day Implementation</div>
              <div className="text-xs text-white/70 mt-1">With 48-hour production go-live</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
            >
              <div className="text-5xl font-bold text-krim-cyan mb-2">100%</div>
              <div className="text-white font-semibold">Implementation Success</div>
              <div className="text-xs text-white/70 mt-1">Across all client deployments</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
            >
              <div className="text-5xl font-bold text-krim-mint mb-2">24/7</div>
              <div className="text-white font-semibold">Go-Live Support</div>
              <div className="text-xs text-white/70 mt-1">Dedicated implementation team</div>
            </motion.div>
          </div>

          <motion.p
            className="text-lg text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We've deployed {getDisplayMetric('customers')} successful implementations with proven methodology.
            Our professional deployment process ensures seamless integration with minimal business disruption.
          </motion.p>
        </motion.div>
      </section>



      {/* PLATFORM CTA - Final Call-to-Action */}
      <PlatformCTA />

      </div>
    </div>
  )
}

// ArchitectureLayer Component moved from Home.tsx (commit ce2e4070)
function ArchitectureLayer({ layer, title, subtitle, description, icon, color }: {
  layer: string
  title: string
  subtitle: string
  description: string
  icon: ReactNode
  color: 'mint' | 'cyan' | 'purple'
}) {
  const colorClasses = {
    mint: 'from-krim-mint/20 to-transparent border-krim-mint/30 text-krim-mint',
    cyan: 'from-krim-cyan/20 to-transparent border-krim-cyan/30 text-krim-cyan',
    purple: 'from-krim-purple/20 to-transparent border-krim-purple/30 text-krim-purple'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <Card className={`h-full bg-gradient-to-br ${colorClasses[color]} relative overflow-hidden`} glow hover3D>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <div className="text-8xl font-bold">{layer.split(' ')[1]}</div>
        </div>
        <div className={`mb-4 ${colorClasses[color].split(' ')[2]}`}>
          {icon}
        </div>
        <div className="text-xs text-white uppercase tracking-wider mb-2">{layer}</div>
        <h3 className="text-2xl font-bold text-white mb-1 text-white">{title}</h3>
        <div className="text-sm text-krim-cyan mb-4">{subtitle}</div>
        <p className="text-white">{description}</p>
      </Card>
    </motion.div>
  )
}


/**
 * KRIM AI - KULA: AI CO-WORKERS THAT EXECUTE CREDIT WORK FLOW
 * Interactive visualization showing AI co-workers executing credit workflows
 * with real-time orchestration and intelligent task routing
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  Brain,
  ChartLine,
  FileText,
  Users,
  ArrowRight,
  CheckCircle,
  ClockCountdown,
  ShieldCheck
} from '@phosphor-icons/react'

interface KulaAICoWorkersProps {
  className?: string
}

export default function KulaAICoWorkers({ className = '' }: KulaAICoWorkersProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [hoveredWorker, setHoveredWorker] = useState<'intake' | 'analysis' | 'action' | 'compliance' | null>(null)
  const [workflowActive, setWorkflowActive] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring animations for scroll-based transforms
  const titleProgress = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  const workflowProgress = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  // AI Co-Worker nodes representing credit workflow stages
  const aiCoWorkers = [
    {
      id: 'intake',
      name: 'Case Intake',
      icon: FileText,
      color: 'krim-cyan',
      description: 'Ingests cases, validates data, routes to appropriate teams',
      position: { x: -200, y: 0 },
      tasks: ['Document validation', 'Data extraction', 'Priority assignment']
    },
    {
      id: 'analysis',
      name: 'Risk Analysis',
      icon: ChartLine,
      color: 'krim-mint',
      description: 'Analyzes credit risk, payment history, and recovery probability',
      position: { x: -60, y: 0 },
      tasks: ['Credit scoring', 'Payment patterns', 'Risk segmentation']
    },
    {
      id: 'action',
      name: 'Action Execution',
      icon: Brain,
      color: 'krim-purple',
      description: 'Executes collection strategies, negotiates settlements, sends communications',
      position: { x: 60, y: 0 },
      tasks: ['Outreach automation', 'Settlement offers', 'Payment scheduling']
    },
    {
      id: 'compliance',
      name: 'Compliance Check',
      icon: ShieldCheck,
      color: 'white',
      description: 'Validates all actions against FDCPA, TCPA, and state regulations',
      position: { x: 200, y: 0 },
      tasks: ['Regulatory validation', 'Audit trail', 'Evidence collection']
    }
  ]

  // Workflow connections
  const workflowConnections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 }
  ]

  return (
    <section
      ref={sectionRef}
      className={`relative py-32 overflow-hidden bg-gradient-to-b from-black via-[#0A081B] to-black ${className}`}
    >
      {/* Cosmic Background with Motion Gradients */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent 70%)',
              'radial-gradient(circle, rgba(0, 255, 136, 0.2), transparent 70%)',
              'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent 70%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(0, 255, 136, 0.15), transparent 70%)',
              'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
              'radial-gradient(circle, rgba(0, 255, 136, 0.15), transparent 70%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      {/* Particle Shimmer Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-krim-mint/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
            animate={{
              y: [null, -150],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          style={{ opacity: titleProgress }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-krim-mint">Kula</span>
            <span className="text-white"> — AI Co-Workers That</span>
            <br />
            <span className="text-white">Execute Credit Work Flow</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            Autonomous AI agents that handle intake, analysis, action, and compliance —
            <br />
            working 24/7 alongside your human team.
          </motion.p>
        </motion.div>

        {/* Workflow Visualization */}
        <motion.div
          className="relative mb-20"
          style={{ opacity: workflowProgress }}
          onMouseEnter={() => setWorkflowActive(true)}
          onMouseLeave={() => setWorkflowActive(false)}
        >
          {/* Central Workflow Container */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              {workflowConnections.map((conn, i) => {
                const fromWorker = aiCoWorkers[conn.from]
                const toWorker = aiCoWorkers[conn.to]

                return (
                  <motion.line
                    key={i}
                    x1={fromWorker.position.x + 960}
                    y1={fromWorker.position.y + 250}
                    x2={toWorker.position.x + 960}
                    y2={toWorker.position.y + 250}
                    stroke="url(#workflow-gradient)"
                    strokeWidth={workflowActive ? 3 : 2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: workflowActive ? 0.8 : 0.4
                    }}
                    transition={{
                      pathLength: { duration: 1.5, delay: i * 0.3 },
                      opacity: { duration: 0.3 }
                    }}
                  />
                )
              })}
              <defs>
                <linearGradient id="workflow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 212, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(0, 255, 136, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Data Flow Particles */}
            {workflowActive && (
              <>
                {workflowConnections.map((conn, i) => {
                  const fromWorker = aiCoWorkers[conn.from]
                  const toWorker = aiCoWorkers[conn.to]

                  return (
                    <motion.div
                      key={`flow-${i}`}
                      className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-krim-cyan to-krim-mint shadow-lg shadow-krim-mint/50"
                      initial={{
                        x: fromWorker.position.x,
                        y: fromWorker.position.y,
                        opacity: 0
                      }}
                      animate={{
                        x: [fromWorker.position.x, toWorker.position.x],
                        y: [fromWorker.position.y, toWorker.position.y],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'linear'
                      }}
                    />
                  )
                })}
              </>
            )}

            {/* AI Co-Worker Nodes */}
            {aiCoWorkers.map((worker, index) => {
              const Icon = worker.icon
              const isHovered = hoveredWorker === worker.id

              return (
                <motion.div
                  key={worker.id}
                  className="absolute"
                  style={{
                    x: worker.position.x,
                    y: worker.position.y
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredWorker(worker.id as any)}
                  onMouseLeave={() => setHoveredWorker(null)}
                >
                  <div className="flex flex-col items-center gap-4 w-48">
                    {/* Icon Container */}
                    <motion.div
                      className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${
                        worker.color === 'krim-cyan' ? 'from-krim-cyan/30 to-krim-cyan/10 border-krim-cyan' :
                        worker.color === 'krim-mint' ? 'from-krim-mint/30 to-krim-mint/10 border-krim-mint' :
                        worker.color === 'krim-purple' ? 'from-purple-500/30 to-purple-500/10 border-purple-500' :
                        'from-white/30 to-white/10 border-white'
                      } border-2 backdrop-blur-sm flex items-center justify-center group cursor-pointer`}
                      animate={{
                        boxShadow: isHovered
                          ? [
                              `0 0 20px ${worker.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0.4)' : worker.color === 'krim-mint' ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
                              `0 0 40px ${worker.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0.6)' : worker.color === 'krim-mint' ? 'rgba(0, 255, 136, 0.6)' : 'rgba(255, 255, 255, 0.6)'}`,
                              `0 0 20px ${worker.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0.4)' : worker.color === 'krim-mint' ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`
                            ]
                          : `0 0 10px ${worker.color === 'krim-cyan' ? 'rgba(0, 212, 255, 0.2)' : worker.color === 'krim-mint' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity },
                        scale: { duration: 0.3 }
                      }}
                    >
                      <Icon
                        size={40}
                        className={`${
                          worker.color === 'krim-cyan' ? 'text-krim-cyan' :
                          worker.color === 'krim-mint' ? 'text-krim-mint' :
                          worker.color === 'krim-purple' ? 'text-purple-400' :
                          'text-white'
                        } group-hover:scale-110 transition-transform`}
                        weight="fill"
                      />

                      {/* Active Indicator */}
                      {workflowActive && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Label */}
                    <div className="text-center">
                      <h3 className={`text-lg font-bold mb-2 ${
                        worker.color === 'krim-cyan' ? 'text-krim-cyan' :
                        worker.color === 'krim-mint' ? 'text-krim-mint' :
                        worker.color === 'krim-purple' ? 'text-purple-400' :
                        'text-white'
                      }`}>
                        {worker.name}
                      </h3>
                      <p className="text-xs text-white/60 leading-tight">
                        {worker.description}
                      </p>
                    </div>

                    {/* Expanded Task List on Hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full mt-4 p-4 bg-black/80 border ${
                          worker.color === 'krim-cyan' ? 'border-krim-cyan/30' :
                          worker.color === 'krim-mint' ? 'border-krim-mint/30' :
                          worker.color === 'krim-purple' ? 'border-purple-500/30' :
                          'border-white/30'
                        } rounded-lg backdrop-blur-sm min-w-[200px] z-50`}
                      >
                        <p className="text-xs font-semibold text-white/80 mb-2">Key Tasks:</p>
                        <ul className="space-y-1">
                          {worker.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                              <CheckCircle size={14} className="text-krim-mint mt-0.5 flex-shrink-0" weight="fill" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: 'Cases Processed', value: '10,000+', sublabel: 'per day', icon: FileText },
            { label: 'Response Time', value: '<2min', sublabel: 'average', icon: ClockCountdown },
            { label: 'Compliance Rate', value: '100%', sublabel: 'validated', icon: ShieldCheck },
            { label: 'Team Collaboration', value: '24/7', sublabel: 'availability', icon: Users }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm hover:border-krim-mint/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Icon size={32} className="text-krim-mint mx-auto mb-3" weight="fill" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60 mb-1">{stat.label}</div>
                <div className="text-xs text-white/40">{stat.sublabel}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-white/60 mb-6">
            See how Kula AI co-workers can transform your credit operations
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-lg rounded-lg shadow-lg shadow-krim-mint/40 hover:shadow-krim-mint/60 transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore AI Co-Workers
            <ArrowRight size={20} weight="bold" />
          </motion.button>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-krim-mint/10 to-transparent blur-3xl pointer-events-none" />
      </div>
    </section>
  )
}

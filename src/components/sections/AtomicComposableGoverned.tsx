/**
 * KRIM AI - ATOMIC. COMPOSABLE. GOVERNED. SECTION
 * Interactive hero-level visual system representing modular intelligence
 * with atomic particles, composable connections, and governance rings
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Atom, Network, ShieldCheck } from '@phosphor-icons/react'

interface AtomicComposableGovernedProps {
  className?: string
}

export default function AtomicComposableGoverned({ className = '' }: AtomicComposableGovernedProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [hoveredNode, setHoveredNode] = useState<'atomic' | 'composable' | 'governed' | null>(null)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring animations for scroll-based transforms
  const atomicProgress = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  const composableProgress = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  const governedProgress = useSpring(useTransform(scrollYProgress, [0.4, 0.7], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  // Particle positions for atomic visualization (8 particles in orbital pattern)
  const atomicParticles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 80
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.1
    }
  })

  // Node positions for composable network (hexagonal grid)
  const composableNodes = [
    { x: 0, y: -60, id: 1 },
    { x: -50, y: -30, id: 2 },
    { x: 50, y: -30, id: 3 },
    { x: -50, y: 30, id: 4 },
    { x: 50, y: 30, id: 5 },
    { x: 0, y: 60, id: 6 }
  ]

  // Connections between composable nodes
  const composableConnections = [
    { from: 1, to: 2 }, { from: 1, to: 3 },
    { from: 2, to: 4 }, { from: 3, to: 5 },
    { from: 4, to: 6 }, { from: 5, to: 6 }
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
            className="absolute w-1 h-1 bg-krim-cyan/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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
        {/* Heading with Sequential Fade-In */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {['Atomic', 'Composable', 'Governed'].map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`inline-block ${
                  word === 'Atomic' ? 'text-krim-cyan' :
                  word === 'Composable' ? 'text-krim-mint' :
                  'text-white'
                }`}
              >
                {word}
                {index < 2 && <span className="text-white">. </span>}
                {index === 2 && <span className="text-white">.</span>}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            Built from atomic intelligence units that compose into sophisticated workflows,<br />
            all enclosed within compliance guardrails.
          </motion.p>
        </div>

        {/* Three Visual Nodes with Animations */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* ATOMIC NODE */}
          <motion.div
            className="relative"
            onHoverStart={() => setHoveredNode('atomic')}
            onHoverEnd={() => setHoveredNode(null)}
            style={{ opacity: atomicProgress }}
          >
            <div className="relative h-80 flex flex-col items-center justify-center">
              {/* Central Core */}
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-krim-cyan to-krim-cyan/60"
                animate={{
                  boxShadow: hoveredNode === 'atomic'
                    ? ['0 0 20px rgba(0, 212, 255, 0.6)', '0 0 40px rgba(0, 212, 255, 0.8)', '0 0 20px rgba(0, 212, 255, 0.6)']
                    : '0 0 20px rgba(0, 212, 255, 0.4)',
                  scale: hoveredNode === 'atomic' ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Orbiting Particles */}
              {atomicParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-krim-cyan/60"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [0, particle.x, 0],
                    y: [0, particle.y, 0],
                    opacity: [0, 1, 0],
                    scale: hoveredNode === 'atomic' ? [1, 1.5, 1] : 1
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: 'linear'
                  }}
                />
              ))}

              {/* Merging/Splitting Animation */}
              <motion.div
                className="absolute w-6 h-6 rounded-full bg-krim-cyan/40"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Label */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Atom size={32} className="text-krim-cyan" weight="fill" />
              </div>
              <h3 className="text-2xl font-bold text-krim-cyan mb-3">Atomic</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Individual intelligence units that can merge, split, and specialize dynamically
              </p>

              {hoveredNode === 'atomic' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 bg-krim-cyan/10 border border-krim-cyan/30 rounded-lg backdrop-blur-sm"
                >
                  <p className="text-xs text-white/80">
                    Each agent is a self-contained unit with specific capabilities,
                    enabling modular intelligence deployment.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* COMPOSABLE NODE */}
          <motion.div
            className="relative"
            onHoverStart={() => setHoveredNode('composable')}
            onHoverEnd={() => setHoveredNode(null)}
            style={{ opacity: composableProgress }}
          >
            <div className="relative h-80 flex flex-col items-center justify-center">
              {/* Network Nodes */}
              {composableNodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-krim-mint to-krim-mint/60"
                  style={{ x: node.x, y: node.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: hoveredNode === 'composable' ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: i * 0.1 },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                  }}
                />
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                {composableConnections.map((conn, i) => {
                  const fromNode = composableNodes.find(n => n.id === conn.from)!
                  const toNode = composableNodes.find(n => n.id === conn.to)!

                  return (
                    <motion.line
                      key={i}
                      x1={fromNode.x + 160}
                      y1={fromNode.y + 160}
                      x2={toNode.x + 160}
                      y2={toNode.y + 160}
                      stroke="rgba(0, 255, 136, 0.4)"
                      strokeWidth={hoveredNode === 'composable' ? 2 : 1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: hoveredNode === 'composable' ? 0.8 : 0.4
                      }}
                      transition={{
                        pathLength: { duration: 1, delay: i * 0.1 },
                        opacity: { duration: 0.3 }
                      }}
                    />
                  )
                })}
              </svg>

              {/* Data Flow Particles */}
              {hoveredNode === 'composable' && (
                <>
                  {composableConnections.map((conn, i) => {
                    const fromNode = composableNodes.find(n => n.id === conn.from)!
                    const toNode = composableNodes.find(n => n.id === conn.to)!

                    return (
                      <motion.div
                        key={`flow-${i}`}
                        className="absolute w-2 h-2 rounded-full bg-krim-mint"
                        initial={{ x: fromNode.x, y: fromNode.y }}
                        animate={{
                          x: [fromNode.x, toNode.x],
                          y: [fromNode.y, toNode.y]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: 'linear'
                        }}
                      />
                    )
                  })}
                </>
              )}
            </div>

            {/* Label */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Network size={32} className="text-krim-mint" weight="fill" />
              </div>
              <h3 className="text-2xl font-bold text-krim-mint mb-3">Composable</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Agents connect and orchestrate into complex workflows with emergent capabilities
              </p>

              {hoveredNode === 'composable' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 bg-krim-mint/10 border border-krim-mint/30 rounded-lg backdrop-blur-sm"
                >
                  <p className="text-xs text-white/80">
                    Mix and match agents to create custom workflows that adapt to your specific needs.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* GOVERNED NODE */}
          <motion.div
            className="relative"
            onHoverStart={() => setHoveredNode('governed')}
            onHoverEnd={() => setHoveredNode(null)}
            style={{ opacity: governedProgress }}
          >
            <div className="relative h-80 flex flex-col items-center justify-center">
              {/* Central System */}
              <motion.div
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/10"
                animate={{
                  boxShadow: hoveredNode === 'governed'
                    ? ['0 0 20px rgba(255, 255, 255, 0.4)', '0 0 40px rgba(255, 255, 255, 0.6)', '0 0 20px rgba(255, 255, 255, 0.4)']
                    : '0 0 10px rgba(255, 255, 255, 0.2)'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Governance Rings */}
              {[1, 2, 3].map((ring, i) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border-2"
                  style={{
                    width: 60 + i * 40,
                    height: 60 + i * 40,
                    borderColor: hoveredNode === 'governed' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: hoveredNode === 'governed' ? [1, 1.05, 1] : 1,
                    rotate: hoveredNode === 'governed' ? [0, 360] : 0
                  }}
                  transition={{
                    opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
                  }}
                />
              ))}

              {/* Shield Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: hoveredNode === 'governed'
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 60%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 60%)'
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Label */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck size={32} className="text-white" weight="fill" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Governed</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Every action is bounded by compliance rules, with automatic evidence collection
              </p>

              {hoveredNode === 'governed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 bg-white/10 border border-white/30 rounded-lg backdrop-blur-sm"
                >
                  <p className="text-xs text-white/80">
                    Compliance is the physics — rules are enforced before execution,
                    not after the fact.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Sequential Connection Workflow Animation */}
        <motion.div
          className="relative h-32 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-8">
            {/* Atomic → Composable */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan flex items-center justify-center">
                <Atom size={24} className="text-krim-cyan" weight="fill" />
              </div>
              <motion.div
                className="w-24 h-0.5 bg-gradient-to-r from-krim-cyan to-krim-mint"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{ transformOrigin: 'left' }}
              />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint flex items-center justify-center">
                <Network size={24} className="text-krim-mint" weight="fill" />
              </div>
            </motion.div>

            {/* Composable → Governed */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div
                className="w-24 h-0.5 bg-gradient-to-r from-krim-mint to-white"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.6 }}
                style={{ transformOrigin: 'left' }}
              />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white flex items-center justify-center">
                <ShieldCheck size={24} className="text-white" weight="fill" />
              </div>
            </motion.div>
          </div>

          {/* Flow Description */}
          <motion.p
            className="text-center text-white/60 text-sm mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            Atomic units compose into workflows, enclosed by governance guardrails
          </motion.p>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-krim-mint/10 to-transparent blur-3xl pointer-events-none" />
      </div>
    </section>
  )
}

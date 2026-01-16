/**
 * HERO SECTION - Enterprise Homepage
 * Safe Superintelligence for Credit Operations
 * Professional design with proper spacing and brand identity
 */
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button, { HeroButton } from '../Button'
import { Reveal } from '../Reveal'
import { preventCriticalOrphans } from '../../utils/widont'
import { KrimWordmark } from '../KrimLogo'
import { ArrowRight, Play, Shield, Brain, Lightning } from '@phosphor-icons/react'

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-krim-deep-space via-transparent to-krim-deep-space/50 pointer-events-none" />
      
      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,136,0.1)_0%,transparent_50%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Top Bar with Logo and Navigation hint */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-6 md:left-12"
        >
          <KrimWordmark size="md" className="opacity-90 hover:opacity-100 transition-opacity" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20 lg:mt-0">
          
          {/* Left Column: Premium Content */}
          <div className="space-y-8">
            <Reveal>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-full border border-krim-mint/20 backdrop-blur-sm"
              >
                <Shield className="w-4 h-4 text-krim-mint" />
                <span className="text-sm font-semibold text-krim-mint">
                  Enterprise-Grade AI Governance
                </span>
                <span className="text-xs text-gray-400 font-medium">SOC 2 Type II</span>
              </motion.div>
            </Reveal>

            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  {preventCriticalOrphans("Safe Superintelligence")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent">
                  for Credit Operations
                </span>
              </h1>
            </Reveal>

            <Reveal>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                A governed multi-agent OS that orchestrates AI co-workers across your entire credit operation—with 
                <span className="text-white font-medium"> compliance</span> and 
                <span className="text-white font-medium"> explainability</span> built into every action.
              </p>
            </Reveal>

            <Reveal>
              <div className="space-y-4">
                {[
                  {
                    icon: <Lightning className="w-5 h-5" />,
                    title: 'Contact Center Automation',
                    desc: 'Sales, retention, collections, service & support—all orchestrated'
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    title: 'Back-Office Intelligence',
                    desc: 'Operations, risk, compliance, finance & legal workflows automated'
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Unified Control Plane',
                    desc: 'Design, deploy, and audit every AI and human action in one place'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-krim-mint/20 to-krim-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-krim-mint">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HeroButton
                      variant="primary"
                      className="group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Book a demo
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-krim-mint to-krim-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                    </HeroButton>
                  </motion.div>
                </Link>
                <Link to="/platform">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      className="group border-gray-700 hover:border-krim-mint/50 transition-colors"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch platform overview
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Professional Architecture Diagram */}
          <div className="relative lg:pl-12 mt-12 lg:mt-0">
            <Reveal>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative max-w-xl mx-auto"
              >
                {/* Glowing orb background effect */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 blur-3xl rounded-full" />
                </div>

                {/* Central Kendra Card - Enhanced Design */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="relative z-20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
                >
                  <div className="text-center space-y-4">
                    <motion.div 
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-gradient-to-br from-krim-mint to-krim-cyan rounded-xl mx-auto flex items-center justify-center shadow-lg"
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Kendra Runtime</h3>
                      <p className="text-sm text-gray-400">Governed Multi-Agent Operating System</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {['99.9% SLA', 'SOC 2', 'GDPR'].map((badge, i) => (
                        <span key={i} className="px-2 py-1 text-xs font-medium text-krim-mint bg-krim-mint/10 rounded-full border border-krim-mint/20">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Left Side: Input Systems - Professional Layout */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute top-1/2 -left-40 lg:-left-48 transform -translate-y-1/2 space-y-3 hidden lg:block"
                >
                  {[
                    { name: 'Loan Systems', icon: '📊' },
                    { name: 'CRM Platform', icon: '👥' },
                    { name: 'Contact Center', icon: '📞' },
                    { name: 'Payments', icon: '💳' },
                    { name: 'Data Lakes', icon: '🗄️' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      className="group relative"
                    >
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors backdrop-blur-sm">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-xs font-medium text-gray-300 whitespace-nowrap">{item.name}</span>
                      </div>
                      
                      {/* Connection line */}
                      <svg className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-8 h-px">
                        <motion.line
                          x1="0" y1="0" x2="32" y2="0"
                          stroke="url(#gradient-left)"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                        />
                      </svg>
                    </motion.div>
                  ))}
                  
                  <defs>
                    <linearGradient id="gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </motion.div>

                {/* Right Side: Output Systems - Professional Layout */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute top-1/2 -right-40 lg:-right-48 transform -translate-y-1/2 space-y-3 hidden lg:block"
                >
                  {[
                    { name: 'AI Co-Workers', icon: '🤖', desc: 'Autonomous agents' },
                    { name: 'Human Teams', icon: '👨‍💼', desc: 'Augmented workforce' },
                    { name: 'Omnichannel', icon: '📱', desc: 'Voice, SMS, Digital' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.15 }}
                      className="group relative"
                    >
                      {/* Connection line */}
                      <svg className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-8 h-px">
                        <motion.line
                          x1="0" y1="0" x2="32" y2="0"
                          stroke="url(#gradient-right)"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                        />
                      </svg>
                      
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-lg border border-krim-mint/30 hover:border-krim-mint/50 transition-colors backdrop-blur-sm">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-white whitespace-nowrap">{item.name}</p>
                          <p className="text-[10px] text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <defs>
                    <linearGradient id="gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16FFBB" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#16FFBB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </motion.div>

                {/* Mobile-friendly integration badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden"
                >
                  {['CRM', 'LMS', 'APIs', 'Voice', 'SMS', 'Chat'].map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/[0.05] rounded-full border border-white/[0.1]">
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
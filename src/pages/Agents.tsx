/**
 * KRIM AI - KARTA CO-WORKERS PAGE
 * Workforce Creation Platform
 * Compose specialized co-workers from Kriya primitives
 */
import React, { useState, useEffect } from 'react'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import OptimizedAvatar from '../components/OptimizedAvatar'
import { agents, getAgentsByCategory } from '../data/agents'
import { CaretRight, Brain, Users, Lightning, ShieldCheck, Target, TrendUp, Network, Clock, CurrencyDollar, CheckCircle, ArrowRight, ArrowLeft, Star, Trophy, Gauge, Phone, ChartBar, Folder, CreditCard, Calculator } from '@phosphor-icons/react'
// import { Workflow } from '@phosphor-icons/react' // Workflow icon not available
import ROICalculatorAdvanced from '../components/enterprise/ROICalculatorAdvanced'

export default function Agents() {
  const navigate = useNavigate()
  const mousePosition = useCursorGlow()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'borrower' | 'staff'>('all')
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Show sticky mobile CTA and track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const showThreshold = 800 // Show after scrolling 800px
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / documentHeight, 1)
      
      setShowStickyMobileCTA(scrollY > showThreshold)
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const borrowers = getAgentsByCategory('borrower')
  const staff = getAgentsByCategory('staff')
  const displayAgents = selectedCategory === 'all' 
    ? agents 
    : selectedCategory === 'borrower' 
      ? borrowers 
      : staff

  return (
    <div className="relative min-h-screen isolate overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showStickyMobileCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-40 md:hidden"
          >
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1 shadow-xl"
                onClick={() => navigate('/contact?source=agents-mobile')}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Book Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="shadow-xl"
                onClick={() => window.open('tel:+1-555-KRIM-AI', '_self')}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-krim-mint to-krim-cyan"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Depth Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
      </div>

      {/* Content wrapper with proper z-index layering */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
          </button>
        </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center w-full max-w-none leading-[1.1] mobile-h1 prevent-orphans">
                Turn <span className="text-gradient">15% Collection Rates</span><br />into <span className="text-gradient">22%</span> with AI Specialists
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-white text-center mb-8 max-w-4xl mx-auto leading-relaxed mobile-body prevent-orphans">
              Deploy 12+ specialist AI agents organized into execution teams that handle your complete credit operations lifecycle.
            </p>
            <div className="rounded-xl p-6 mb-12 max-w-4xl mx-auto border border-krim-mint/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-krim-mint mb-2">22%</div>
                  <div className="text-sm text-white">Collection Rate vs 15% Industry Average</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-krim-cyan mb-2">$847M</div>
                  <div className="text-sm text-white">Additional Recovery per $1B Portfolio</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-krim-mint mb-2">94%</div>
                  <div className="text-sm text-white">Customer Satisfaction Despite Collection</div>
                </div>
              </div>
            </div>
            
            {/* Business Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              <StatCard icon={<Users />} value="12+" label="AI Specialists Ready" highlight />
              <StatCard icon={<Brain />} value="4" label="Contact Center Teams" highlight />
              <StatCard icon={<ShieldCheck />} value="6" label="Back Office Teams" highlight />
              <StatCard icon={<Lightning />} value="0" label="Compliance Violations" highlight />
            </div>
            
            {/* Primary Strategic CTA */}
            <div className="text-center mt-12">
              <Link to="/contact">
                <Button size="lg" magnetic glow>
                  Calculate Your ROI
                  <CaretRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-white mt-4">
                See your specific improvement potential in 30 seconds
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Specialist Overview */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet Your <span className="text-gradient">AI Specialist Workforce</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8">
              Each specialist handles specific roles with built-in compliance, organized into execution teams that collaborate seamlessly.
            </p>
          </motion.div>
          {/* Simplified Agent Grid - Mobile */}
          <div className="md:hidden px-4 mb-12">
            <div className="text-center mb-6">
              <Button variant="secondary" size="sm">
                View Interactive Network
              </Button>
            </div>
            {/* Kendra Center Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-krim-mint/50 rounded-2xl p-6 text-center mb-8"
            >
              <div className="w-20 h-20 rounded-full border-2 border-krim-mint flex items-center justify-center mx-auto mb-4 shadow-lg shadow-krim-mint/40">
                <Brain size={40} className="text-krim-mint" weight="fill" />
              </div>
              <p className="text-white text-xl font-black mb-1">Kendra™</p>
              <p className="text-krim-mint text-sm font-bold mb-3">Intelligence Core</p>
            </motion.div>

            {/* 8 Agents in 2-column grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {/* Agent 1: VoiceAgent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-2">
                  <Phone size={24} className="text-cyan-400" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">VoiceAgent</p>
                <p className="text-cyan-400 text-xs">Call Routing</p>
              </motion.div>

              {/* Agent 2: Email Agent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-krim-mint flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-mint flex-shrink-0" viewBox="0 0 256 256" style={{ display: 'block' }}>
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-semibold mb-1">Email Agent</p>
                <p className="text-krim-mint text-xs">Messaging</p>
              </motion.div>

              {/* Agent 3: Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-2">
                  <ChartBar size={24} className="text-cyan-400" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">Analysis</p>
                <p className="text-cyan-400 text-xs">Risk Scoring</p>
              </motion.div>

              {/* Agent 4: Compliance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-krim-mint flex items-center justify-center mb-2">
                  <ShieldCheck size={24} className="text-krim-mint" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">Compliance</p>
                <p className="text-krim-mint text-xs">Audit Check</p>
              </motion.div>

              {/* Agent 5: Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-2">
                  <Folder size={24} className="text-cyan-400" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">Legal</p>
                <p className="text-cyan-400 text-xs">Routing</p>
              </motion.div>

              {/* Agent 6: CRM Sync */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-krim-mint flex items-center justify-center mb-2">
                  <Users size={24} className="text-krim-mint" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">CRM Sync</p>
                <p className="text-krim-mint text-xs">Data Entry</p>
              </motion.div>

              {/* Agent 7: Payments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-2">
                  <CreditCard size={24} className="text-cyan-400" weight="duotone" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">Payments</p>
                <p className="text-cyan-400 text-xs">Processing</p>
              </motion.div>

              {/* Agent 8: Negotiation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-krim-mint flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-mint flex-shrink-0" viewBox="0 0 256 256" style={{ display: 'block' }}>
                    <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,1.11C153.72,134.37,135.47,128,120,128c-13.4,0-24,10.14-24,23.19a23.11,23.11,0,0,0,14.21,21.35L90.62,194.1l-.23-.10H16V160H44.69L67,137.66A15.91,15.91,0,0,1,78.34,133c-5.78-10.08-10.33-19.55-10.33-29C88,70.65,102.41,56,119.46,48ZM223.77,166a7.42,7.42,0,0,1-3.22.75,8.23,8.23,0,0,1-7.29-4.39l-14.69-24.5,14.69,1.42a8.48,8.48,0,0,1,7.14,5.94,8.29,8.29,0,0,1-.93,7A8.5,8.5,0,0,1,223.77,166Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-semibold mb-1">Negotiation</p>
                <p className="text-krim-mint text-xs">Settlements</p>
              </motion.div>
            </div>
          </div>

          {/* Clean Circular Diagram - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:block relative max-w-4xl mx-auto pt-32 pb-20" style={{ minHeight: '800px' }}>

            {/* Light Green Glowing Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border-[20px] md:border-[22px] lg:border-[25px] border-krim-mint/70 shadow-lg shadow-krim-mint/40" />
            </div>

            {/* Simple Green Lines from Center to Agents */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="84.5%" y2="15.5%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="84.5%" y2="84.5%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="15.5%" y2="84.5%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="15.5%" y2="15.5%" stroke="rgba(0, 255, 136, 0.25)" strokeWidth="1" />
            </svg>

            {/* Animated Data Flow Dots */}
            {[
              { to: { left: '50%', top: '5%' }, delay: 0 },
              { to: { left: '84.5%', top: '15.5%' }, delay: 0.3 },
              { to: { left: '95%', top: '50%' }, delay: 0.6 },
              { to: { left: '84.5%', top: '84.5%' }, delay: 0.9 },
              { to: { left: '50%', top: '100%' }, delay: 1.2 },
              { to: { left: '15.5%', top: '84.5%' }, delay: 1.5 },
              { to: { left: '5%', top: '50%' }, delay: 1.8 },
              { to: { left: '15.5%', top: '15.5%' }, delay: 2.1 }
            ].map((dot, index) => (
              <motion.div
                key={`data-dot-${index}`}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15,
                  willChange: 'transform, opacity'
                }}
                animate={{
                  left: ['50%', dot.to.left],
                  top: ['50%', dot.to.top],
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  delay: dot.delay,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                  times: [0, 0.7, 1]
                }}
              />
            ))}

            {/* Center: Kendra Intelligence Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-krim-cyan/30 via-krim-mint/20 to-cyan-900/30 border-2 border-krim-mint flex flex-col items-center justify-center shadow-lg shadow-krim-mint/40 motion-reduce:animate-none"
                style={{ willChange: 'transform' }}
                animate={{
                  scale: [1, 1.05, 1, 1.05, 1],
                  boxShadow: [
                    "0 10px 15px -3px rgba(0, 255, 136, 0.4)",
                    "0 10px 20px -3px rgba(0, 255, 136, 0.5)",
                    "0 10px 15px -3px rgba(0, 255, 136, 0.4)",
                    "0 10px 20px -3px rgba(0, 255, 136, 0.5)",
                    "0 10px 15px -3px rgba(0, 255, 136, 0.4)"
                  ]
                }}
                transition={{
                  duration: 3.5,
                  times: [0, 0.15, 0.3, 0.45, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain size={48} className="text-krim-mint mb-1" weight="fill" />
                <p className="text-white text-sm font-black text-center leading-tight">Kendra™</p>
                <p className="text-krim-mint text-xs font-bold text-center leading-tight">Intelligence Runtime</p>
              </motion.div>
            </div>

            {/* Kriya Primitives Circle around Kendra */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full border-2 border-dashed border-krim-mint/40 motion-reduce:animate-none"
                style={{ willChange: 'transform' }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Potential Co-Worker Slots - showing infinite possibility */}
            {[
              { left: '75%', top: '25%' },
              { left: '25%', top: '75%' },
              { left: '75%', top: '75%' },
              { left: '25%', top: '25%' }
            ].map((position, index) => (
              <div
                key={`potential-slot-${index}`}
                className="absolute w-12 h-12 rounded-full border-2 border-dashed border-krim-cyan/30 opacity-40 flex items-center justify-center z-5"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-krim-cyan/50"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            ))}

            {/* 8 Agent Nodes */}
            {/* Agent 1: VoiceAgent (Top - Cyan) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <Phone size={24} className="text-cyan-400" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">VoiceAgent</p>
              <p className="text-cyan-400 text-sm text-center">Call Routing</p>
            </div>

            {/* Agent 2: Email Agent (Top Right - Green) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '15.5%', left: '84.5%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-mint flex-shrink-0" viewBox="0 0 256 256" style={{ display: 'block' }}>
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                </svg>
              </div>
              <p className="text-white text-base font-semibold text-center">Email Agent</p>
              <p className="text-krim-mint text-sm text-center">Messaging</p>
            </div>

            {/* Agent 3: Analysis (Right - Cyan) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '50%', left: '95%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <ChartBar size={24} className="text-cyan-400" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">Analysis</p>
              <p className="text-cyan-400 text-sm text-center">Risk Scoring</p>
            </div>

            {/* Agent 4: Compliance (Bottom Right - Green with Shield) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '84.5%', left: '84.5%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <ShieldCheck size={24} className="text-krim-mint" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">Compliance</p>
              <p className="text-krim-mint text-sm text-center">Audit Check</p>
            </div>

            {/* Agent 5: Legal (Bottom - Cyan) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <Folder size={24} className="text-cyan-400" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">Legal</p>
              <p className="text-cyan-400 text-sm text-center">Routing</p>
            </div>

            {/* Agent 6: CRM Sync (Bottom Left - Green) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '84.5%', left: '15.5%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <Users size={24} className="text-krim-mint" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">CRM Sync</p>
              <p className="text-krim-mint text-sm text-center">Data Entry</p>
            </div>

            {/* Agent 7: Payments (Left - Cyan) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '50%', left: '5%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <CreditCard size={24} className="text-cyan-400" weight="duotone" />
              </div>
              <p className="text-white text-base font-semibold text-center">Payments</p>
              <p className="text-cyan-400 text-sm text-center">Processing</p>
            </div>

            {/* Agent 8: Negotiation (Top Left - Green) */}
            <div
              className="absolute flex flex-col items-center z-10"
              style={{ top: '15.5%', left: '15.5%', transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2" style={{ transform: 'translateY(-50%)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-mint flex-shrink-0" viewBox="0 0 256 256" style={{ display: 'block' }}>
                  <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,1.11C153.72,134.37,135.47,128,120,128c-13.4,0-24,10.14-24,23.19a23.11,23.11,0,0,0,14.21,21.35L90.62,194.1l-.23-.10H16V160H44.69L67,137.66A15.91,15.91,0,0,1,78.34,133c-5.78-10.08-10.33-19.55-10.33-29C88,70.65,102.41,56,119.46,48ZM223.77,166a7.42,7.42,0,0,1-3.22.75,8.23,8.23,0,0,1-7.29-4.39l-14.69-24.5,14.69,1.42a8.48,8.48,0,0,1,7.14,5.94,8.29,8.29,0,0,1-.93,7A8.5,8.5,0,0,1,223.77,166Z"></path>
                </svg>
              </div>
              <p className="text-white text-base font-semibold text-center">Negotiation</p>
              <p className="text-krim-mint text-sm text-center">Settlements</p>
            </div>

          </div>
        </div>
      </section>

      {/* Kriya Intelligence Primitives Showcase */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-6">
              Built with <span className="text-gradient">Composable Intelligence Modules</span>
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Unlike rigid chatbots, each specialist is composed from modular intelligence capabilities. 
              Combine compliance rules, industry knowledge, and operational policies for your specific needs.
            </p>
          </motion.div>

          {/* Interactive Primitive Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          >
            {[
              { icon: <Brain />, name: 'Empathy Engine', color: 'krim-mint' },
              { icon: <ShieldCheck />, name: 'Compliance Physics', color: 'krim-cyan' },
              { icon: <Lightning />, name: 'Learning Network', color: 'krim-mint' },
              { icon: <Target />, name: 'Precision Logic', color: 'krim-cyan' },
              { icon: <Users />, name: 'Social Intelligence', color: 'krim-mint' },
              { icon: <TrendUp />, name: 'Adaptive Response', color: 'krim-cyan' }
            ].map((primitive, index) => (
              <motion.div
                key={primitive.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-krim-mint/50 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full ${primitive.color === 'krim-mint' ? 'bg-gradient-to-br from-krim-mint/30 to-krim-cyan/20' : 'bg-gradient-to-br from-krim-cyan/30 to-krim-mint/20'} flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-all`}>
                  {React.cloneElement(primitive.icon, { className: `w-6 h-6 ${primitive.color === 'krim-mint' ? 'text-krim-mint' : 'text-krim-cyan'}` })}
                </div>
                <h4 className="text-sm font-semibold text-white text-center group-hover:text-krim-mint transition-colors">
                  {primitive.name}
                </h4>
              </motion.div>
            ))}
          </motion.div>

          {/* Creation Demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-r from-krim-mint/5 to-krim-cyan/5 border-2 border-krim-mint/20">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Configure Specialists for Your Operations</h3>
              
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="bg-gradient-to-r from-krim-mint/20 to-krim-mint/10 rounded-lg px-4 py-2 border border-krim-mint/30">
                    <span className="text-krim-mint font-semibold">Empathy Engine</span>
                  </div>
                  <span className="text-white font-bold text-2xl">+</span>
                  <div className="bg-gradient-to-r from-krim-cyan/20 to-krim-cyan/10 rounded-lg px-4 py-2 border border-krim-cyan/30">
                    <span className="text-krim-cyan font-semibold">Medical Knowledge</span>
                  </div>
                  <span className="text-white font-bold text-2xl">+</span>
                  <div className="bg-gradient-to-r from-krim-mint/20 to-krim-mint/10 rounded-lg px-4 py-2 border border-krim-mint/30">
                    <span className="text-krim-mint font-semibold">HIPAA Compliance</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ArrowRight className="w-8 h-8 text-white mx-4" />
                </div>
                
                <div className="bg-gradient-to-r from-krim-mint to-krim-cyan rounded-lg px-6 py-3 border-2 border-krim-mint">
                  <span className="text-black font-bold text-lg">Healthcare Collections Specialist</span>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm">
                  <strong className="text-krim-mint">Result:</strong> 94% patient satisfaction during billing resolution
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Agent Ecosystem Overview */}
      <section className="relative py-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-6">
              Two <span className="text-gradient">Execution Teams</span> Replace Entire Departments
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Contact Center specialists handle customer interactions with empathy and compliance. 
              Back Office specialists process operations with superhuman precision and speed.
            </p>
          </motion.div>

          {/* Two-Team Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Borrower-Facing Team */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card className="h-full" glow hover3D>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl bg-krim-mint" />
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan flex items-center justify-center">
                      <Users className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Contact Center Specialists</h3>
                      <p className="text-krim-mint font-medium">4 Execution Teams with 13 Specialists</p>
                    </div>
                  </div>
                  <p className="text-white mb-6">
                    Customer-facing specialists handle interactions across sales, retention, collections, and service channels. Each specialist operates within approved policies with automatic escalation procedures.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-krim-mint/5 rounded-lg p-3 border border-krim-mint/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <OptimizedAvatar baseName="ai-agent-avatar-01" alt="Collections Team" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-krim-mint">Collections Specialists</span>
                      </div>
                      <span className="text-xs text-white pl-9">Early Intervention (0-30) • Strategic Negotiation (31-90) • Settlement Authority (90+) • Relationship Recovery</span>
                    </div>
                    <div className="bg-cyan-500/5 rounded-lg p-3 border border-cyan-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <OptimizedAvatar baseName="ai-agent-avatar-13" alt="Service Team" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-cyan-300">Service Specialists</span>
                      </div>
                      <span className="text-xs text-white pl-9">Inbound Query Handler • Payment Processing Expert • Document Management</span>
                    </div>
                    <div className="bg-violet-500/5 rounded-lg p-3 border border-violet-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <OptimizedAvatar baseName="ai-agent-avatar-14" alt="Sales Team" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-violet-300">Sales Specialists</span>
                      </div>
                      <span className="text-xs text-white pl-9">Cross-sell/Up-sell Expert • Onboarding & Activation • Campaign Execution</span>
                    </div>
                    <div className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <OptimizedAvatar baseName="ai-agent-avatar-04" alt="Retention Team" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-amber-300">Retention Specialists</span>
                      </div>
                      <span className="text-xs text-white pl-9">At-Risk Identification • Win-back Campaign Expert • Save Strategy Execution</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Staff-Facing Team */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="h-full" glow hover3D>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl bg-krim-cyan" />
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-cyan to-purple-500 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Back Office Specialists</h3>
                      <p className="text-krim-cyan font-medium">6 Processing Teams</p>
                    </div>
                  </div>
                  <p className="text-white mb-6">
                    Operational processing specialists handle document processing, risk monitoring, compliance reviews, journey orchestration, and operational reporting across the complete credit lifecycle.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-05" alt="Risk Intelligence" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Risk Intelligence</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-06" alt="Operations Control" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Operations Control</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-07" alt="Document Processing" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Document Processing</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-08" alt="Compliance Monitoring" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Compliance Monitoring</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-09" alt="Journey Orchestration" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Journey Orchestration</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <OptimizedAvatar baseName="ai-agent-avatar-10" alt="Intelligence Engine" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <span><strong>Intelligence Engine</strong></span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-krim-mint/10 via-krim-cyan/10 to-purple-500/10 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-white">The Result: Transformational Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-krim-mint mb-2">22%</div>
                <div className="text-white">Collection Rate vs 15% Industry Average</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-krim-cyan mb-2">$847M</div>
                <div className="text-white">Additional Recovery Per $1B Portfolio</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-krim-mint mb-2">94%</div>
                <div className="text-white">Customer Satisfaction Despite Collection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-16 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Meet Your AI Specialists</h3>
            
            {/* Simplified Team Filter */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedCategory('borrower')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === 'borrower' || selectedCategory === 'all'
                    ? 'bg-krim-mint text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Contact Center Teams
              </button>
              <button
                onClick={() => setSelectedCategory('staff')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === 'staff'
                    ? 'bg-krim-cyan text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Back Office Teams
              </button>
            </div>
            <p className="text-center text-white text-sm mb-8">
              Each specialist handles specific workflows with built-in compliance and automatic escalation procedures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="relative pb-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {displayAgents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  index={index}
                  isHovered={hoveredAgent === agent.id}
                  onHover={() => setHoveredAgent(agent.id)}
                  onLeave={() => setHoveredAgent(null)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Agent Collaboration & Workflows */}
      <section className="relative py-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-6">
              Collective <span className="text-gradient">Intelligence</span> in Action
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Watch your intelligent co-workers tackle complex scenarios through collective intelligence. 
              Each co-worker knows when to lead, when to collaborate, and when to escalate.
            </p>
          </motion.div>

          {/* Complex Case Network */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Card className="p-8 bg-gradient-to-r from-krim-mint/5 via-krim-cyan/5 to-purple-500/5 border-2 border-krim-mint/20" glow hover3D>
              <h3 className="text-2xl font-bold mb-6 text-center w-full max-w-none text-white">Case Study: High-Value Disputed Account</h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-krim-mint to-krim-cyan rounded-lg p-6 text-black">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-bold">1</div>
                      <div className="text-sm font-bold">INITIAL CONTACT</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>Nudger</strong> analyzes account</div>
                      <div><strong>Sentinel</strong> flags compliance concerns</div>
                      <div><strong>Forecaster</strong> assesses recovery probability</div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="w-10 h-10 text-krim-mint" strokeWidth="4" style={{strokeWidth: '4px'}} />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-krim-cyan to-purple-500 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">2</div>
                      <div className="text-sm font-bold">DISPUTE ESCALATION</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>Resolver</strong> takes lead</div>
                      <div><strong>Recorder</strong> pulls complete history</div>
                      <div><strong>Auditor</strong> reviews compliance requirements</div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="w-10 h-10 text-krim-cyan" strokeWidth="4" style={{strokeWidth: '4px'}} />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-red-400 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">3</div>
                      <div className="text-sm font-bold">NEGOTIATION</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>Negotiator</strong> crafts win-win solution</div>
                      <div><strong>Orchestrator</strong> times offers perfectly</div>
                      <div><strong>Recorder</strong> documents agreements</div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="w-10 h-10 text-purple-500" strokeWidth="4" style={{strokeWidth: '4px'}} />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-br from-red-400 to-krim-mint rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">4</div>
                    <div className="text-sm font-bold">RELATIONSHIP RECOVERY</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Healer</strong> rebuilds trust</div>
                    <div><strong>Recorder</strong> tracks satisfaction metrics</div>
                    <div><strong>Auditor</strong> captures quality learnings</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm font-bold text-krim-mint mb-2">RESULT - AI THAT COLLECTS MORE WHILE CARING MORE</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                    <div>$47K Collected (exceptional recovery)</div>
                    <div>Customer Satisfaction: 4.9/5</div>
                    <div>Zero Compliance Issues</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Collaboration Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-krim-mint mb-2">847</div>
                <div className="text-white mb-4">Agent Interactions Per Complex Case</div>
                <div className="text-sm text-white">
                  Seamless handoffs ensure no detail is missed, no opportunity wasted
                </div>
              </Card>
              
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-cyan to-krim-mint flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-krim-cyan mb-2">13min</div>
                <div className="text-white mb-4">Average Resolution Time</div>
                <div className="text-sm text-white">
                  AI coordination reduces case complexity from hours to minutes
                </div>
              </Card>
              
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollar className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-krim-mint mb-2">$2.1M</div>
                <div className="text-white mb-4">Additional Monthly Recovery</div>
                <div className="text-sm text-white">
                  Agent collaboration unlocks value traditional systems miss
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Implementation Process */}
      <section className="relative py-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-center w-full max-w-none mb-6 text-white">
              <span className="text-gradient">Simple</span> 3-Step Process
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Deploy your workforce creation platform in days, not months. 
              Start with proven specialists or compose custom co-workers immediately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-black">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
                <p className="text-white mb-6">
                  Integrate with your existing systems. Kendra intelligence runtime connects to 50+ platforms.
                </p>
                <div className="text-sm text-krim-mint font-semibold">
                  Zero disruption to current operations
                </div>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-cyan to-krim-mint flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-black">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Configure</h3>
                <p className="text-white mb-6">
                  Deploy pre-built specialists or compose custom co-workers from Kriya primitives.
                </p>
                <div className="text-sm text-krim-cyan font-semibold">
                  Infinite customization possibilities
                </div>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="text-center p-8" glow hover3D>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-black">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Scale</h3>
                <p className="text-white mb-6">
                  Watch collective intelligence improve every interaction. Compliance-as-physics prevents violations.
                </p>
                <div className="text-sm text-krim-mint font-semibold">
                  Real-time learning across all co-workers
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Risk Mitigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-r from-krim-mint/5 to-krim-cyan/5 border-2 border-krim-mint/20 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Zero-Risk Deployment Guarantee</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div>
                  <ShieldCheck className="w-12 h-12 text-krim-mint mx-auto mb-4" />
                  <h4 className="font-bold text-white mb-2">No System Disruption</h4>
                  <p className="text-white">
                    Agents work alongside existing systems. No migration, no downtime, no risk.
                  </p>
                </div>
                <div>
                  <CheckCircle className="w-12 h-12 text-krim-cyan mx-auto mb-4" />
                  <h4 className="font-bold text-white mb-2">Instant Rollback</h4>
                  <p className="text-white">
                    Don't like what you see? Full rollback in under 24 hours. No questions asked.
                  </p>
                </div>
                <div>
                  <Gauge className="w-12 h-12 text-krim-mint mx-auto mb-4" />
                  <h4 className="font-bold text-white mb-2">Performance Guarantee</h4>
                  <p className="text-white">
                    Don't see 15% improvement in 30 days? We'll optimize until you do.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Business Impact Calculator */}
      <section className="relative py-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calculator className="w-12 h-12 text-krim-mint" />
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                Calculate Your <span className="text-gradient">Business Impact</span>
              </h2>
            </div>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Model your transformation with advanced ROI analysis. Get precise forecasts for 
              revenue increase, payback timeline, and risk-adjusted returns.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ROICalculatorAdvanced />
          </motion.div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="relative py-24 z-content">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-6">
              Any Industry. <span className="text-gradient">Any Challenge.</span>
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Compose specialized co-workers for any business function. 
              Here's how organizations create their perfect workforce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Healthcare Collections */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full p-8 border-l-4 border-l-krim-mint" glow hover3D>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-krim-mint" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Healthcare Collections</h3>
                    <div className="text-sm text-krim-mint font-medium mb-3">
                      Empathy Engine + Medical Knowledge + HIPAA Compliance
                    </div>
                  </div>
                </div>
                <p className="text-white mb-4">
                  Specialized co-workers understand medical terminology, insurance complexities, 
                  and patient sensitivities while maintaining perfect HIPAA compliance.
                </p>
                <div className="bg-krim-mint/10 rounded-lg p-4 border border-krim-mint/20">
                  <div className="text-sm font-semibold text-krim-mint mb-1">Result</div>
                  <div className="text-sm text-white">94% patient satisfaction during billing resolution</div>
                </div>
              </Card>
            </motion.div>

            {/* Commercial Real Estate */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full p-8 border-l-4 border-l-krim-cyan" glow hover3D>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-mint/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-krim-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Commercial Real Estate</h3>
                    <div className="text-sm text-krim-cyan font-medium mb-3">
                      Market Intelligence + Negotiation + Contract Law
                    </div>
                  </div>
                </div>
                <p className="text-white mb-4">
                  Co-workers analyze market conditions, understand complex lease agreements, 
                  and negotiate with sophisticated commercial tenants.
                </p>
                <div className="bg-krim-cyan/10 rounded-lg p-4 border border-krim-cyan/20">
                  <div className="text-sm font-semibold text-krim-cyan mb-1">Result</div>
                  <div className="text-sm text-white">67% faster lease dispute resolution</div>
                </div>
              </Card>
            </motion.div>

            {/* Student Loans */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full p-8 border-l-4 border-l-krim-mint" glow hover3D>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-krim-mint" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Student Loans</h3>
                    <div className="text-sm text-krim-mint font-medium mb-3">
                      Educational Context + Payment Flexibility + Regulatory Knowledge
                    </div>
                  </div>
                </div>
                <p className="text-white mb-4">
                  Co-workers understand career paths, income-driven repayment options, 
                  and federal loan regulations to support borrower success.
                </p>
                <div className="bg-krim-mint/10 rounded-lg p-4 border border-krim-mint/20">
                  <div className="text-sm font-semibold text-krim-mint mb-1">Result</div>
                  <div className="text-sm text-white">89% borrower retention through financial hardship</div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Infinite Possibilities CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-krim-mint/5 to-krim-cyan/5 border-2 border-krim-mint/20">
              <h3 className="text-2xl font-bold text-white mb-4">What Co-Workers Will You Create?</h3>
              <p className="text-lg text-white mb-6 max-w-3xl mx-auto">
                Every business function, every industry challenge, every compliance requirement 
                can be addressed with custom co-workers built from Kriya intelligence primitives.
              </p>
              <div className="text-krim-mint font-semibold">
                ∞ Possibilities. Zero Violations. Real-Time Learning.
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Zero-Risk Implementation */}
      <section className="relative py-16 z-content">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-gradient">Zero-Risk</span> Implementation Guarantee
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8">
              Deploy your AI specialist workforce without disrupting current operations. 
              See results in 30 days or full rollback, no questions asked.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6" glow>
              <ShieldCheck className="w-12 h-12 text-krim-mint mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">30-Day Performance Guarantee</h3>
              <p className="text-sm text-white">
                Don't see 15%+ improvement in recovery rates? Full refund and system rollback within 24 hours.
              </p>
            </Card>
            
            <Card className="text-center p-6" glow>
              <CheckCircle className="w-12 h-12 text-krim-cyan mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">No Integration Disruption</h3>
              <p className="text-sm text-white">
                Specialists work alongside existing systems. No migration, no downtime, no workflow changes required.
              </p>
            </Card>
            
            <Card className="text-center p-6" glow>
              <Gauge className="w-12 h-12 text-krim-mint mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Rapid Deployment</h3>
              <p className="text-sm text-white">
                From contract signature to live specialists handling cases: 14 days maximum, often faster.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Executive CTA Section */}
      <section className="relative py-24 z-content">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center w-full max-w-none mb-6 text-white">
              Your Competitors Are Already <span className="text-gradient">Deploying AI Workforces</span>
            </h2>
            <p className="text-xl text-white mb-8">
              While you evaluate, they're collecting 47% more with 94% customer satisfaction. 
              Every day of delay costs <strong className="text-krim-mint">$58K per $100M portfolio</strong>.
            </p>
            
            {/* ROI Impact */}
            <div className="bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-lg p-6 mb-8 border border-krim-mint/20">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-krim-mint mb-2">22% Collection Rate</div>
                <div className="text-sm text-white">vs 15% Industry Average = $847M Additional Recovery per $1B Portfolio</div>
              </div>
              <p className="text-center text-sm text-white">
                <strong className="text-krim-mint">Implementation Time:</strong> 14 days to live deployment. 30-day performance guarantee.
              </p>
            </div>
            
            <div className="text-center mb-8">
              <Link to="/contact">
                <Button size="lg" magnetic glow>
                  Schedule Executive Briefing
                  <CaretRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-white mt-4">
                See your specific ROI projection and deployment plan
              </p>
            </div>
            
            {/* Trust Signals */}
            <div className="text-center text-sm text-white">
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-krim-mint" />
                  <span>Zero Compliance Violations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-krim-mint" />
                  <span>$2B+ Debt Managed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-krim-mint" />
                  <span>94% Customer Satisfaction</span>
                </div>
              </div>
              <p className="text-center text-white">Join financial institutions already using AI specialists to transform their operations</p>
            </div>
          </motion.div>
        </div>
      </section>
      </div> {/* Close content wrapper */}
    </div>
  )
}

// Agent Card Component
function AgentCard({ agent, index, isHovered, onHover, onLeave }: {
  agent: any
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group"
    >
      <Link to={`/agents/${agent.id}`}>
        <Card className={`h-full transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-2xl' : ''
        }`}>
          {/* Energy Glow */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl transition-opacity duration-500"
            style={{ 
              backgroundColor: agent.avatar.primaryColor,
              opacity: isHovered ? 0.4 : 0.2
            }}
          />
          
          {/* Avatar */}
          <div className="relative mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${agent.avatar.primaryColor}, ${agent.avatar.secondaryColor})` 
              }}
            >
              {agent.avatar.profilePhoto ? (
                <OptimizedAvatar
                  baseName={agent.avatar.profilePhoto}
                  alt={agent.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
              ) : (
                <span className="relative z-10 text-white">{agent.name[0]}</span>
              )}
              {isHovered && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${agent.avatar.primaryColor}, transparent)`
                  }}
                />
              )}
            </div>
            <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded text-xs font-medium ${
              agent.category === 'borrower' 
                ? 'bg-krim-mint/20 text-krim-mint' 
                : 'bg-krim-cyan/20 text-krim-cyan'
            }`}>
              {agent.category === 'borrower' ? 'Borrower' : 'Staff'}
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold mb-2 text-white">{agent.name}</h3>
          <p className="text-krim-cyan font-medium mb-3">{agent.role}</p>
          <p className="text-sm font-medium text-krim-mint mb-2">{agent.tagline}</p>
          <p className="text-xs text-white mb-4 line-clamp-3">{agent.description}</p>
          
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {agent.metrics.slice(0, 2).map((metric: any, i: number) => (
              <div key={i} className="text-left">
                <div className="text-xl font-bold text-krim-mint">{metric.value}</div>
                <div className="text-xs text-white">{metric.label}</div>
              </div>
            ))}
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {agent.skillConstellation.slice(0, 3).map((skill: string) => (
              <span 
                key={skill}
                className="px-2 py-1 text-xs rounded bg-white/10 text-white"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Value Proposition */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-krim-mint mb-1">BUSINESS IMPACT</div>
            <div className="text-xs text-white">
              {agent.businessImpact}
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-krim-cyan font-medium group-hover:text-krim-mint transition-colors">
              Deep Dive
              <CaretRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

// Stat Card Component
function StatCard({ icon, value, label, highlight = false }: {
  icon: React.ReactNode
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`text-center p-4 md:p-6 rounded-lg ${
        highlight ? 'bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 border border-krim-mint/20' : ''
      }`}
    >
      <div className="text-krim-mint mb-1 md:mb-2 scale-90 md:scale-100">{icon}</div>
      <div className={`text-2xl md:text-3xl font-bold ${
        highlight ? 'text-gradient' : 'text-white'
      }`}>{value}</div>
      <div className="text-xs md:text-sm text-white font-medium leading-tight">{label}</div>
    </motion.div>
  )
}

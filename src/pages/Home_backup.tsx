/**
 * KRIM AI - HOMEPAGE RTF COMPLIANT
 * Progressive Disclosure Architecture - Trimmed from 4,705 to ~2,300 words
 * Exact RTF Requirements Implementation
 */
import React, { Suspense, useState, useEffect, useRef, ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button, { HeroButton } from '../components/Button'
import PartnershipsSection from '../components/sections/PartnershipsSection'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import { useClaimsRegistry } from '../hooks/useClaimsRegistry'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'
import { MetricDisplay } from '../components/common/MetricDisplay'
import { CaretRight, CaretDown, TrendUp, ShieldCheck, Users, Lightning, Trophy, Brain, Target, CheckCircle, Warning, X, Cpu, Cube, LockKey, Path, Cloud, Phone, CreditCard, Folder, ChartBar, Desktop, CloudArrowUp, CloudCheck, GitBranch, Network, FileText } from '@phosphor-icons/react'
import { agents } from '../data/agents'
import OptimizedAvatar from '../components/OptimizedAvatar'
import { Reveal } from '../components/Reveal'
import { preventCriticalOrphans } from '../utils/widont'
import ResponsiveText from '../components/ResponsiveText'
import Card3D from '../components/atoms/Card3D'
import ParticleBackground from '../components/atoms/ParticleBackground'
import EnhancedCTA, { PulsingCTA } from '../components/atoms/EnhancedCTA'
import { PulseGlow, FloatingElement, HoverGlow } from '../components/atoms/MicroInteractions'
import GovernanceCircularVisual from '../components/atoms/GovernanceCircularVisual'
import AnimatedIcon from '../components/atoms/AnimatedIcon'

// Feature flag for layering fix (white flash / vanishing sections)
const KRIM_FIX_WHITEFLASH_V1 = true

// Scroll fix applied: Reveal component + isolated 3D background observer

// Effect-driven 3D loader for Home page (prevents eager R3F loading)
function Dynamic3DBackground() {
  const [Wrapper, setWrapper] = useState<ComponentType<{ adaptive: boolean }> | null>(null);
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Gate 1: only after first commit
  useEffect(() => { setMounted(true); }, []);

  // Gate 2: only when in viewport, then load during idle
  useEffect(() => {
    if (!mounted || !hostRef.current) return;

    let seen = false;
    const el = hostRef.current;

    const start = () =>
      import('../components/Heavy3DWrapper')
        .then(m => setWrapper(() => m.default))
        .catch(() => { /* keep empty on failure */ });

    const load = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(start);
      } else {
        setTimeout(start, 0);
      }
    };

    const io = new IntersectionObserver((entries) => {
      if (seen) return;
      if (entries.some(e => e.isIntersecting)) {
        seen = true;
        io.disconnect();
        load();
      }
    }, {
      rootMargin: '200px',
      // Reverted to null (viewport) - no longer need .hero-container hack with layering fix
      root: null
    });

    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`absolute inset-0 pointer-events-none ${KRIM_FIX_WHITEFLASH_V1 ? '-z-10' : ''}`}
      style={{ minHeight: 200 }}
    >
      {Wrapper ? <Wrapper adaptive /> : null}
    </div>
  );
}

export default function Home() {
  const { getDisplayMetric, getFormattedValue } = useClaimsRegistry()
  const mousePosition = useCursorGlow()
  const prefersReducedMotion = useReducedMotion()
  const [deviceCapability] = useState(() => getDeviceCapability())

  return (
    <div className={`relative bg-krim-deep-space overflow-x-hidden ${KRIM_FIX_WHITEFLASH_V1 ? 'isolate' : ''}`}>
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Background */}
      <Dynamic3DBackground />

      {/* Global Background Elements - Applied to entire homepage */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
      </div>

      {/* Content wrapper with proper z-index layering */}
      <main id="main-content" className={KRIM_FIX_WHITEFLASH_V1 ? 'relative z-10' : ''}>
      {/* HERO SECTION - RTF EXACT REQUIREMENTS */}
      <section className="hero-container relative min-h-screen flex items-center overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 relative z-10 mobile-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
            }}
          >
            {/* Logo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
              }}
              className="flex justify-center mb-8"
            >
              <KrimAnimatedLogo size="xl" />
            </motion.div>

            {/* HERO HEADLINE */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } }
              }}
              className="text-3xl md:text-5xl lg:text-6xl font-black w-full max-w-none text-center mb-6 leading-[1.2] mobile-h1"
            >
              <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-mint bg-clip-text text-transparent">
                Emergent Intelligence Runtime
              </span>
              <br />
              <span className="text-white">For Credit Operations</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
              className="text-white/80 text-lg md:text-xl font-normal text-center mb-12 max-w-2xl mx-auto"
            >
              Compliant-First. Amplify Outcomes. Reduce Cost.
            </motion.p>

            {/* Dual CTAs - Enhanced with Magnetic & Ripple Effects */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
              }}
              className="flex flex-wrap justify-center gap-4 mb-20"
            >
              <Link to="/contact">
                <EnhancedCTA
                  variant="primary"
                  size="lg"
                  magneticEffect={true}
                  glowEffect={true}
                  icon={<CaretRight className="w-5 h-5" weight="bold" />}
                >
                  Book Demo
                </EnhancedCTA>
              </Link>
              <Link to="/platform">
                <EnhancedCTA
                  variant="outline"
                  size="lg"
                  magneticEffect={true}
                  glowEffect={true}
                >
                  Explore Kendra
                </EnhancedCTA>
              </Link>
            </motion.div>

            {/* Trusted Partnerships */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }
              }}
              className="w-full flex flex-col items-center"
            >
              <p className="text-lg md:text-xl font-semibold text-white/60 mb-6 text-center">
                Trusted partnerships
              </p>
              <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <img
                  src="/partnerships/nvidia-inception.png"
                  alt="NVIDIA Inception Partner"
                  className="h-8 md:h-10 w-auto max-w-[100px] md:max-w-[140px] object-contain"
                  loading="lazy"
                />
                <img
                  src="/partnerships/aws-activate.png"
                  alt="AWS Activate Partner"
                  className="h-auto w-auto max-h-8 md:max-h-10 max-w-[100px] md:max-w-[140px] object-contain"
                  style={{ aspectRatio: 'auto' }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
          <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Credit Operations Are at Maximum Strain.
            </h2>
            <p className="text-base md:text-lg text-white/70">
              A perfect storm: Legacy systems, rising delinquencies and tightening regulation.
            </p>
          </motion.div>

          {/* Three Problem Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.07 }}
          >
            {/* Card 1: 40+ Fragmented Tools */}
            <motion.div
              className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                40+ Fragmented Tools
              </h3>
              <p className="text-white/80 text-base md:text-lg">
                Blind spots, friction, delays.<br />
                Siloed data kills efficiency & governance.
              </p>
            </motion.div>

            {/* Card 2: Surviving on Human Middleware */}
            <motion.div
              className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1], delay: 0.07 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Surviving on Human Middleware
              </h3>
              <p className="text-white/80 text-base md:text-lg">
                People patch broken workflows<br />
                65% staff churn = lost expertise
              </p>
            </motion.div>

            {/* Card 3: Post-Fact Compliance Risk */}
            <motion.div
              className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1], delay: 0.14 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Post-Fact Compliance Risk
              </h3>
              <p className="text-white/80 text-base md:text-lg">
                Only 5% of activity is reviewed.<br />
                $1.2M avg. penalty
              </p>
            </motion.div>
          </motion.div>

          {/* Closing Statement */}
          <motion.p
            className="text-center text-base md:text-lg text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1], delay: 0.21 }}
          >
            Credit leaders are urgently seeking unified, automated, compliant operating models.
          </motion.p>
        </div>
      </section>
      {/* KRIMOS CHANGES WHAT'S POSSIBLE SECTION */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        {/* Hero Section Background - Particle Background, Grid & Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
          <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-krim-mint">Kendra™</span>
              <br className="sm:hidden" />
              <span className="sm:inline"> </span>
              <span className="text-white">changes what's possible</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute inset-0 blur-xl"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                  Autonomy with Governance
                </h3>
              </motion.div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent relative z-10">
                Autonomy with Governance
              </h3>
            </motion.div>
          </motion.div>

          {/* Three Cards with Advanced Connection System */}
          <div className="flex flex-col gap-12 md:gap-0 md:relative max-w-6xl mx-auto md:min-h-[2000px]">

            {/* FUTURISTIC TECH CABLE CONNECTION SYSTEM - Hidden on mobile for better UX */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 5 }}
              viewBox="0 0 1000 1800"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Bright Animated Gradients */}
                <linearGradient id="cableGlow1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="1" />
                  <stop offset="50%" stopColor="#00FF88" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="cableGlow2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity="1" />
                </linearGradient>

                {/* Ultra Strong Glow */}
                <filter id="megaGlow">
                  <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* CABLE 1: Card 1 to Card 2 - THICK AND BRIGHT */}
              <motion.path
                d="M 100 300 Q 500 420, 900 700"
                stroke="url(#cableGlow1)"
                strokeWidth="12"
                fill="none"
                filter="url(#megaGlow)"
                strokeLinecap="round"
                opacity="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />

              {/* Animated data flow 1 */}
              <motion.path
                d="M 100 300 Q 500 420, 900 700"
                stroke="#00D4FF"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="40 60"
                opacity="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7 }}
              >
                <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" />
              </motion.path>

              {/* CABLE 2: Card 2 to Card 3 - THICK AND BRIGHT */}
              <motion.path
                d="M 900 900 Q 500 1050, 100 1350"
                stroke="url(#cableGlow2)"
                strokeWidth="12"
                fill="none"
                filter="url(#megaGlow)"
                strokeLinecap="round"
                opacity="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              />

              {/* Animated data flow 2 */}
              <motion.path
                d="M 900 900 Q 500 1050, 100 1350"
                stroke="#00FF88"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="40 60"
                opacity="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.2 }}
              >
                <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" />
              </motion.path>

              {/* HUGE GLOWING CONNECTION PORTS */}
              {/* Port 1 - Card 1 output */}
              <motion.circle
                cx="100"
                cy="300"
                r="20"
                fill="#00D4FF"
                filter="url(#megaGlow)"
                opacity="1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
              </motion.circle>

              {/* Port 2 - Card 2 input */}
              <motion.circle
                cx="900"
                cy="700"
                r="20"
                fill="#00FF88"
                filter="url(#megaGlow)"
                opacity="1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </motion.circle>

              {/* Port 3 - Card 2 output */}
              <motion.circle
                cx="900"
                cy="900"
                r="20"
                fill="#FFFFFF"
                filter="url(#megaGlow)"
                opacity="1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" begin="1s" />
              </motion.circle>

              {/* Port 4 - Card 3 input */}
              <motion.circle
                cx="100"
                cy="1350"
                r="20"
                fill="#00FF88"
                filter="url(#megaGlow)"
                opacity="1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" begin="1.5s" />
              </motion.circle>

              {/* MOVING DATA PACKETS - Visible circles traveling along cables */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={`packet1-${i}`}
                  r="8"
                  fill="#00D4FF"
                  filter="url(#megaGlow)"
                  opacity="0"
                >
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                    path="M 100 300 Q 500 420, 900 700"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                  />
                </motion.circle>
              ))}

              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={`packet2-${i}`}
                  r="8"
                  fill="#00FF88"
                  filter="url(#megaGlow)"
                  opacity="0"
                >
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                    path="M 900 900 Q 500 1050, 100 1350"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                  />
                </motion.circle>
              ))}
            </svg>

            {/* CARD 1: Autonomous Agents - Left Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative md:absolute md:top-0 md:left-0 w-full md:w-[520px]"
              style={{ zIndex: 20 }}
            >
              <Card3D
                glowColor="cyan"
                intensity="strong"
                enableTilt={true}
                enableGlow={true}
                className="bg-gradient-to-br from-krim-cyan/20 via-krim-cyan/10 to-krim-deep-space/90 border-2 border-krim-cyan/50 p-10 backdrop-blur-xl shadow-2xl shadow-krim-cyan/20 min-h-[540px]"
              >
                <div className="relative z-10">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-krim-cyan to-krim-cyan/50 flex items-center justify-center shadow-lg shadow-krim-cyan/30 mb-4">
                      <Cpu size={32} className="text-white" weight="bold" />
                    </div>
                    <h3 className="text-3xl md:text-4xl text-krim-cyan uppercase tracking-tight text-center">
                      Autonomous Agents
                    </h3>
                  </div>

                  <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
                    AI Co-Workers execute compliant end-to-end workflows without human intervention.
                  </p>

                  {/* Agent Flow Visualization */}
                  <div className="relative w-full h-32 mb-8 mt-4 rounded-xl bg-black/30 border border-krim-cyan/30 overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-10 bg-[size:16px_16px]" />

                    {[
                      { size: 14, speed: 3.2, delay: 0, path: 'straight', color: 'from-krim-cyan to-krim-mint' },
                      { size: 12, speed: 3.8, delay: 0.8, path: 'wave', color: 'from-krim-mint to-cyan-400' },
                      { size: 16, speed: 2.9, delay: 1.6, path: 'straight', color: 'from-cyan-400 to-krim-cyan' },
                      { size: 10, speed: 4.2, delay: 2.4, path: 'zigzag', color: 'from-krim-cyan to-white' },
                      { size: 13, speed: 3.5, delay: 3.2, path: 'wave', color: 'from-white to-krim-mint' },
                    ].map((agent, i) => (
                      <motion.div
                        key={i}
                        className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${agent.color}`}
                        style={{
                          width: agent.size,
                          height: agent.size,
                          boxShadow: '0 0 12px rgba(0, 212, 255, 0.8)',
                        }}
                        animate={{
                          x: [-30, 260],
                          y: agent.path === 'wave'
                            ? [0, -20, 0, 20, 0]
                            : agent.path === 'zigzag'
                            ? [0, -15, 15, -15, 0]
                            : 0,
                          opacity: [0, 1, 1, 1, 0],
                          scale: [0.6, 1.2, 1, 1, 0.6],
                        }}
                        transition={{
                          duration: agent.speed,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: agent.delay,
                          y: { duration: agent.speed / 1.5, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      />
                    ))}

                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-krim-cyan/40 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-krim-mint/40 to-transparent" />
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-krim-cyan/20">
                    <span className="text-krim-cyan font-bold text-xl md:text-2xl">Scale output not cost</span>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* CARD 2: Continuous Learning - Right Aligned */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative md:absolute md:top-[640px] md:right-0 w-full md:w-[520px]"
              style={{ zIndex: 20 }}
            >
              <Card3D
                glowColor="mint"
                intensity="strong"
                enableTilt={true}
                enableGlow={true}
                className="bg-gradient-to-br from-white/15 via-white/8 to-krim-deep-space/90 border-2 border-white/40 p-10 backdrop-blur-xl shadow-2xl shadow-white/20 min-h-[540px]"
              >
                {/* Holographic Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-20 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(0, 212, 255, 0.2) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />

                {/* Scanline Effect */}
                <motion.div
                  className="absolute inset-0 opacity-10 rounded-xl pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
                  }}
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                <div className="relative z-10">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white to-white/50 flex items-center justify-center shadow-lg shadow-white/30 mb-4">
                      <Brain size={32} className="text-krim-deep-space" weight="bold" />
                    </div>
                    <h3 className="text-3xl md:text-4xl text-white uppercase tracking-tight text-center">
                      Continuous<br />Learning
                    </h3>
                  </div>

                  <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
                    Every cycle feeds the emergent intelligence. Policy, Routing, Agent Behaviour, Strategy.
                  </p>

                  {/* Neural Network Visualization */}
                  <div className="flex justify-center mb-8 h-32 items-center mt-4">
                    <div className="relative w-32 h-32">
                      {/* Learning Waves */}
                      {[0, 0.6, 1.2].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-krim-mint/60"
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.8, 0, 0.8],
                            borderColor: ['rgba(22, 255, 187, 0.6)', 'rgba(22, 255, 187, 0)', 'rgba(22, 255, 187, 0.6)']
                          }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: delay
                          }}
                        />
                      ))}

                      {/* Brain Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(22, 255, 187, 0.4) 0%, transparent 70%)',
                        }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />

                      {/* Central Icon */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.12, 1],
                          rotate: [0, 3, -3, 0]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <Brain size={48} className="text-krim-mint drop-shadow-[0_0_16px_rgba(0,255,136,0.8)]" weight="fill" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-white/20">
                    <span className="text-white font-bold text-xl md:text-2xl">Performance compounds</span>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* CARD 3: Compliant by Design - Left Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative md:absolute md:top-[1280px] md:left-0 w-full md:w-[520px]"
              style={{ zIndex: 20 }}
            >
              <Card3D
                glowColor="mint"
                intensity="strong"
                enableTilt={true}
                enableGlow={true}
                className="bg-gradient-to-br from-krim-mint/20 via-krim-mint/10 to-krim-deep-space/90 border-2 border-dashed border-krim-mint/60 p-10 backdrop-blur-xl shadow-2xl shadow-krim-mint/20 min-h-[540px]"
              >
                <div className="relative z-10">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-krim-mint to-krim-mint/50 flex items-center justify-center shadow-lg shadow-krim-mint/30 mb-4">
                      <ShieldCheck size={32} className="text-white" weight="bold" />
                    </div>
                    <h3 className="text-3xl md:text-4xl text-krim-mint uppercase tracking-tight text-center">
                      Compliant by Design
                    </h3>
                  </div>

                  <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
                    Controls embedded before action.<br />Autonomous audit trails protect every interaction.
                  </p>

                  {/* Shield Protection Visualization */}
                  <div className="flex justify-center mb-8 h-32 items-center mt-4">
                    <div className="relative w-32 h-32">
                      {/* Protection Waves */}
                      {[0, 0.6, 1.2].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-krim-mint/60"
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.8, 0, 0.8],
                            borderColor: ['rgba(22, 255, 187, 0.6)', 'rgba(22, 255, 187, 0)', 'rgba(22, 255, 187, 0.6)']
                          }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: delay
                          }}
                        />
                      ))}

                      {/* Shield Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(22, 255, 187, 0.4) 0%, transparent 70%)',
                        }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />

                      {/* Central Shield */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.12, 1],
                          rotate: [0, 3, -3, 0]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <ShieldCheck size={48} className="text-krim-mint drop-shadow-[0_0_16px_rgba(0,255,136,0.8)]" weight="fill" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-krim-mint/20">
                    <span className="text-krim-mint font-bold text-xl md:text-2xl">Violations vanish</span>
                  </div>
                </div>
              </Card3D>
            </motion.div>

          </div>

        </div>
      </section>

      {/* KRIMOS MULTI-AGENTIC SUBSTRATE SECTION */}
      <section className="py-20 relative overflow-hidden">
        {/* Cosmic Background with Gradient Orbs */}
        <div className="absolute inset-0">
          {/* Large pulsing orbs */}
          <motion.div
            className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Motion Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-krim-mint/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center">
                <span className="text-krim-mint">Kendra™</span><br />
                <span className="text-white">The Emergent Intelligence Substrate</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-white/80 text-lg md:text-xl max-w-4xl text-center">
                The governed environment where AI systems execute<br />
                Post-Disbursal Credit Operations
              </p>
            </div>
          </motion.div>

          {/* Horizontal Icon Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Policy & Controls */}
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl backdrop-blur-sm hover:border-krim-mint/40 transition-all duration-300"
                whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 mb-4 rounded-full bg-krim-mint/10 border-2 border-krim-mint flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ShieldCheck size={32} className="text-krim-mint" weight="bold" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3">Policy & controls</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Rules, approvals, authority ladders embedded in-line
                </p>
              </motion.div>

              {/* Orchestration */}
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl backdrop-blur-sm hover:border-krim-mint/40 transition-all duration-300"
                whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 mb-4 rounded-full bg-krim-mint/10 border-2 border-krim-mint flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GitBranch size={32} className="text-krim-mint" weight="bold" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3">Orchestration</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Policy → Talk → Act → Evidence as one governed flow
                </p>
              </motion.div>

              {/* Shared Context */}
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl backdrop-blur-sm hover:border-krim-mint/40 transition-all duration-300"
                whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 mb-4 rounded-full bg-krim-mint/10 border-2 border-krim-mint flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Network size={32} className="text-krim-mint" weight="bold" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3">Shared context</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Identity, data and telemetry across agents and channels
                </p>
              </motion.div>

              {/* Evidence by Default */}
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl backdrop-blur-sm hover:border-krim-mint/40 transition-all duration-300"
                whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="w-16 h-16 mb-4 rounded-full bg-krim-mint/10 border-2 border-krim-mint flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText size={32} className="text-krim-mint" weight="bold" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3">Evidence by default</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Transcripts, consents, decisions auto-captured
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Triangle Layout - Why it matters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            {/* Heading */}
            <h3 className="text-3xl md:text-4xl font-black text-white text-center mb-16">Why it matters</h3>

            {/* Icons Container - Three concepts centered horizontally */}
            <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 md:gap-8 lg:gap-16 max-w-6xl mx-auto px-6">

              {/* Safer - Blue */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center"
                role="figure"
                aria-label="Safer: Controls fire before actions; every step is defensible"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-4 border-blue-400 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(96, 165, 250, 0.6)" }}
                  transition={{ duration: 0.4 }}
                >
                  <ShieldCheck size={48} className="text-blue-400" weight="bold" />
                </motion.div>
                <h4 className="text-3xl font-bold text-white mb-4">Safer</h4>
                <p className="text-white/90 text-lg leading-relaxed text-center max-w-[280px]">
                  Controls fire before actions; every step is defensible
                </p>
              </motion.div>

              {/* Faster - Mint */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center"
                role="figure"
                aria-label="Faster: Agents coordinate under one substrate; no swivel-chair work"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-krim-mint/30 to-emerald-500/30 border-4 border-krim-mint flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(0, 255, 136, 0.6)" }}
                  transition={{ duration: 0.4 }}
                >
                  <Lightning size={48} className="text-krim-mint" weight="bold" />
                </motion.div>
                <h4 className="text-3xl font-bold text-white mb-4">Faster</h4>
                <p className="text-white/90 text-lg leading-relaxed text-center max-w-[280px]">
                  Agents coordinate under one substrate; no swivel-chair work
                </p>
              </motion.div>

              {/* Evolving - Purple */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col items-center"
                role="figure"
                aria-label="Evolving: Policies and agents improve without breaking compliance"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-4 border-purple-400 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)" }}
                  transition={{ duration: 0.4 }}
                >
                  <TrendUp size={48} className="text-purple-400" weight="bold" />
                </motion.div>
                <h4 className="text-3xl font-bold text-white mb-4">Evolving</h4>
                <p className="text-white/90 text-lg leading-relaxed text-center max-w-[280px]">
                  Policies and agents improve without breaking compliance
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button with Pulsing Neon Energy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Link to="/agents">
              <motion.div className="relative">
                {/* Pulsing glow background */}
                <motion.div
                  className="absolute inset-0 rounded-lg blur-xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                      '0 0 40px rgba(0, 255, 136, 0.8)',
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated border shimmer */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['-200% 0', '200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 136, 0.6), 0 0 50px rgba(0, 255, 136, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 bg-transparent border-2 border-krim-mint text-krim-mint font-bold text-lg rounded-lg hover:bg-krim-mint/10 transition-all duration-300 flex items-center gap-2"
                  animate={{
                    borderColor: [
                      'rgba(0, 255, 136, 1)',
                      'rgba(0, 255, 136, 0.6)',
                      'rgba(0, 255, 136, 1)',
                    ],
                  }}
                  transition={{
                    borderColor: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="relative z-10">See Kendra Command Centers</span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <CaretRight className="w-5 h-5" weight="bold" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CO-PILOT SECTION */}
      <section className="py-20 relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center">
                <span className="text-krim-cyan">Kula Assistant</span><br />
                <span className="text-white">The Interactive Interface for</span><br />
                <span className="text-krim-mint">Kendra™</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-white/80 text-lg md:text-xl max-w-4xl text-center">
                Access, direct, and approve autonomous credit operations<br />
                through natural language.
              </p>
            </div>
          </motion.div>

          {/* Four Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1: Access intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 text-center hover:border-krim-cyan/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-krim-cyan/20 flex items-center justify-center mx-auto mb-4">
                <AnimatedIcon animation="pulse" duration={3.5}>
                  <Brain size={32} className="text-krim-cyan" weight="fill" />
                </AnimatedIcon>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Access<br />intelligence
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Access & retrieve<br />Portfolio, Risk, Policy
              </p>
            </motion.div>

            {/* Card 2: Human / AI Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 text-center hover:border-krim-cyan/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-krim-cyan/20 flex items-center justify-center mx-auto mb-4">
                <AnimatedIcon animation="float" duration={4}>
                  <Users size={32} className="text-krim-cyan" weight="fill" />
                </AnimatedIcon>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Human/AI<br />Collaboration
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Target outcomes together<br />through language (Voice or Text)
              </p>
            </motion.div>

            {/* Card 3: Control execution (highlighted) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-krim-mint/10 to-transparent border-2 border-krim-mint/60 rounded-2xl p-6 text-center hover:border-krim-mint transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-krim-mint/20 flex items-center justify-center mx-auto mb-4">
                <AnimatedIcon animation="bounce" duration={2.5}>
                  <Lightning size={32} className="text-krim-mint" weight="fill" />
                </AnimatedIcon>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Control<br />execution
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Build, Launch, Adjust<br />All from one place
              </p>
            </motion.div>

            {/* Card 4: Governed & secure */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 text-center hover:border-krim-cyan/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-krim-cyan/20 flex items-center justify-center mx-auto mb-4">
                <AnimatedIcon animation="pulse" duration={3}>
                  <ShieldCheck size={32} className="text-krim-cyan" weight="fill" />
                </AnimatedIcon>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Governed<br />& Secure
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Nothing runs without policy checks
              </p>
            </motion.div>
          </div>

          {/* Bottom Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-krim-mint/20 via-krim-mint/10 to-transparent border-2 border-krim-mint/40 rounded-2xl p-8 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                You don't operate workflows<br />You authorize outcomes
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KULA SECTION - AI CO-WORKERS */}
      <section className="py-32 bg-gradient-to-b from-black/20 to-transparent relative overflow-hidden">
        {/* Animated AI Grid Background */}
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        {/* Glowing Gradient Orbs with Parallax */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-violet-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity as any, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-cyan-500/20 via-violet-600/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity as any, ease: "easeInOut" }}
        />

        {/* Floating Particles Background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity as any,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center mb-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center">
                <span className="text-krim-cyan">Karta - AI Coworkers</span><br />
                <span className="text-white">That Execute Credit Workflows</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg md:text-xl text-white/70 text-center">Across Channels and Systems</p>
            </div>
          </motion.div>

          {/* Mobile Agent Grid - Shows all 8 agents in 2-column layout */}
          <div className="md:hidden px-4 mb-12">
            {/* Kendra Center Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-krim-cyan/10 via-krim-mint/5 to-cyan-900/10 border-2 border-krim-mint/50 rounded-2xl p-6 text-center mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-krim-cyan/30 via-krim-mint/20 to-cyan-900/30 border-2 border-krim-mint flex items-center justify-center mx-auto mb-4 shadow-lg shadow-krim-mint/40">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border-2 border-cyan-400 flex items-center justify-center mb-2">
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
                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-krim-mint/30 hover:border-krim-mint/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-krim-mint/30 to-green-600/20 border-2 border-krim-mint flex items-center justify-center mb-2">
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
                <p className="text-krim-mint text-xs font-bold text-center leading-tight">Intelligence Core</p>
              </motion.div>
            </div>

            {/* Purple Dotted Circle around Kendra */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full border-2 border-dashed border-purple-400/40 motion-reduce:animate-none"
                style={{ willChange: 'transform' }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

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

      {/* Horizontal Banner - Kria Intelligence Units */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="my-24"
          >
            <div className="relative max-w-6xl mx-auto px-6">
              {/* Subtle glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-krim-mint/5 to-transparent blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Banner content */}
              <div className="relative">
                {/* Main text */}
                <div className="text-center">
                  {/* Top accent line */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                    <div className="mx-4 w-2 h-2 rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                  </div>

                  <motion.h3
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                      Kria Intelligence Units
                    </span>
                  </motion.h3>
                  <div className="w-full flex justify-center">
                    <motion.p
                      className="text-lg md:text-xl text-white/60 font-light tracking-wide text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      The foundation of every action
                    </motion.p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="flex items-center justify-center mt-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                    <div className="mx-4 w-2 h-2 rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

      {/* KRIA CO-WORKERS DETAILS SECTION */}
      <section className="py-20 relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Contact Center Co-Workers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 hover:border-krim-cyan/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-black text-white mb-3 text-center">
                Contact Center Co-Workers
              </h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed text-center">
                Customer-facing AI workforce handling interactions with empathy
              </p>

              {/* Co-Workers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { id: 'nudger', avatar: 'ai-agent-avatar-01' },
                  { id: 'broker', avatar: 'ai-agent-avatar-13' },
                  { id: 'resolver', avatar: 'ai-agent-avatar-14' },
                  { id: 'restorer', avatar: 'ai-agent-avatar-04' },
                  { id: 'interpreter', avatar: 'ai-agent-avatar-11' },
                  { id: 'planner', avatar: 'ai-agent-avatar-12' }
                ].map(({ id, avatar }) => {
                  const agent = agents.find(a => a.id === id)
                  if (!agent) return null
                  return (
                    <Link
                      key={agent.id}
                      to={`/agents/${agent.id}`}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="w-16 h-16 mb-3 relative rounded-full overflow-hidden">
                        <OptimizedAvatar
                          baseName={avatar}
                          alt={agent.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-xs font-semibold group-hover:text-krim-cyan transition-colors">{agent.name}</p>
                      <p className="text-krim-cyan text-[10px] opacity-60">{agent.role.split(' ')[0]}</p>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Back-Office Co-Workers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 hover:border-krim-mint/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-black text-white mb-3 text-center">
                Back-Office Co-Workers
              </h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed text-center">
                Enterprise operations AI executing workflows with precision
              </p>

              {/* Co-Workers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { id: 'orchestrator', avatar: 'ai-agent-avatar-05' },
                  { id: 'sentinel', avatar: 'ai-agent-avatar-06' },
                  { id: 'strategist', avatar: 'ai-agent-avatar-07' },
                  { id: 'forecaster', avatar: 'ai-agent-avatar-08' },
                  { id: 'auditor', avatar: 'ai-agent-avatar-09' },
                  { id: 'recorder', avatar: 'ai-agent-avatar-10' }
                ].map(({ id, avatar }) => {
                  const agent = agents.find(a => a.id === id)
                  if (!agent) return null
                  return (
                    <Link
                      key={agent.id}
                      to={`/agents/${agent.id}`}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="w-16 h-16 mb-3 relative rounded-full overflow-hidden">
                        <OptimizedAvatar
                          baseName={avatar}
                          alt={agent.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-xs font-semibold group-hover:text-krim-mint transition-colors">{agent.name}</p>
                      <p className="text-krim-mint text-[10px] opacity-60">{agent.role.split(' ')[0]}</p>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Mobile: Enhanced Atomic/Composable/Governed Cards */}
          <div className="md:hidden px-4 max-w-lg mx-auto mb-16 relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/20 via-purple-400/20 to-krim-mint/20 -z-10" />
            {[0, 1].map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute left-1/2 w-2 h-2 -ml-1 rounded-full bg-purple-400/60 shadow-lg shadow-purple-400/50"
                style={{ top: `${(i + 1) * 33}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              />
            ))}

            {/* Atomic Card - Enhanced for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-cyan-500/10 via-black/40 to-cyan-500/10 border-2 border-cyan-400/40 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-hidden shadow-xl shadow-cyan-500/10"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0)',
                    '0 0 30px rgba(6, 182, 212, 0.3)',
                    '0 0 20px rgba(6, 182, 212, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative mb-6 flex justify-center">
                <motion.div
                  className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400/30 to-cyan-600/10 flex items-center justify-center border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(6, 182, 212, 0.3)',
                      '0 10px 30px -3px rgba(6, 182, 212, 0.5)',
                      '0 10px 25px -3px rgba(6, 182, 212, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedIcon animation="rotate" duration={4}>
                    <Cube size={32} weight="duotone" className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  </AnimatedIcon>
                </motion.div>
              </div>

              <h3 className="text-3xl font-black text-white mb-4 text-center drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                Atomic
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-3 text-center">
                Modular intelligence units that work independently. Deploy instantly, scale infinitely.
              </p>
              <p className="text-cyan-400/80 text-sm leading-relaxed text-center">
                Pre-built agents ready to activate—no training required.
              </p>
            </motion.div>

            {/* Composable Card - Enhanced for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-purple-500/10 via-black/40 to-purple-500/10 border-2 border-purple-400/40 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-hidden shadow-xl shadow-purple-500/10"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0)',
                    '0 0 30px rgba(168, 85, 247, 0.3)',
                    '0 0 20px rgba(168, 85, 247, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              <div className="relative mb-6 flex justify-center">
                <motion.div
                  className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-400/30 to-purple-600/10 flex items-center justify-center border-2 border-purple-400/50 shadow-lg shadow-purple-400/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(168, 85, 247, 0.3)',
                      '0 10px 30px -3px rgba(168, 85, 247, 0.5)',
                      '0 10px 25px -3px rgba(168, 85, 247, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <AnimatedIcon animation="swing" duration={3.5}>
                    <Path size={32} weight="duotone" className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  </AnimatedIcon>
                </motion.div>
              </div>

              <h3 className="text-3xl font-black text-white mb-4 text-center drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                Composable
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-3 text-center">
                Flexible assembly and reconfiguration. Build workflows, not workarounds.
              </p>
              <p className="text-purple-400/80 text-sm leading-relaxed text-center">
                Custom agents via Co-Pilot or Agent Studio.
              </p>
            </motion.div>

            {/* Governed Card - Enhanced for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-krim-mint/10 via-black/40 to-krim-mint/10 border-2 border-krim-mint/40 rounded-2xl p-6 backdrop-blur-sm overflow-hidden shadow-xl shadow-krim-mint/10"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 136, 0)',
                    '0 0 30px rgba(0, 255, 136, 0.3)',
                    '0 0 20px rgba(0, 255, 136, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />

              <div className="relative mb-6 flex justify-center">
                <motion.div
                  className="w-20 h-20 rounded-xl bg-gradient-to-br from-krim-mint/30 to-green-600/10 flex items-center justify-center border-2 border-krim-mint/50 shadow-lg shadow-krim-mint/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                      '0 10px 30px -3px rgba(0, 255, 136, 0.5)',
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <AnimatedIcon animation="pulse" duration={3}>
                    <ShieldCheck size={32} weight="duotone" className="text-krim-mint drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
                  </AnimatedIcon>
                </motion.div>
              </div>

              <h3 className="text-3xl font-black text-white mb-4 text-center drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">
                Governed
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-3 text-center">
                Controls are woven into every execution layer—pre-action compliance guardrails.
              </p>
              <p className="text-krim-mint/80 text-sm leading-relaxed text-center">
                Work becomes autonomous<br />Compliance is stress-free
              </p>
            </motion.div>
          </div>

          {/* Desktop: Original Atomic/Composable/Governed Cards */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Atomic Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-cyan-500/10 via-white/5 to-transparent border-2 border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              {/* Icon container */}
              <div className="relative mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
                  <AnimatedIcon animation="rotate" duration={4}>
                    <Cube size={32} weight="duotone" className="text-cyan-400" />
                  </AnimatedIcon>
                </div>
                {/* Floating particle effect */}
                <motion.div
                  className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <h3 className="text-3xl font-black text-white mb-4 relative z-10 text-center">
                Atomic
              </h3>
              <p className="text-white/80 text-base leading-relaxed mb-3 relative z-10 text-center">
                Modular intelligence units that work independently. Deploy instantly, scale infinitely.
              </p>
              <p className="text-cyan-400/70 text-sm leading-relaxed relative z-10 text-center">
                Pre-built agents ready to activate—no training required.
              </p>
            </motion.div>

            {/* Composable Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent border-2 border-purple-400/30 rounded-2xl p-8 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              {/* Icon container */}
              <div className="relative mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-600/10 flex items-center justify-center border border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-300">
                  <AnimatedIcon animation="swing" duration={3.5}>
                    <Path size={32} weight="duotone" className="text-purple-400" />
                  </AnimatedIcon>
                </div>
                {/* Connection nodes animation */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <h3 className="text-3xl font-black text-white mb-4 relative z-10 text-center">
                Composable
              </h3>
              <p className="text-white/80 text-base leading-relaxed mb-3 relative z-10 text-center">
                Flexible assembly and dynamic reconfiguration. Build workflows that evolve with your needs.
              </p>
              <p className="text-purple-400/70 text-sm leading-relaxed relative z-10 text-center">
                Generate custom agents via Co-Pilot or Agent Studio.
              </p>
            </motion.div>

            {/* Governed Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-green-500/10 via-white/5 to-transparent border-2 border-krim-mint/30 rounded-2xl p-8 hover:border-krim-mint/60 hover:shadow-2xl hover:shadow-krim-mint/20 transition-all duration-500 relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/0 via-krim-mint/0 to-krim-mint/0 group-hover:from-krim-mint/10 group-hover:via-krim-mint/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              {/* Icon container */}
              <div className="relative mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-krim-mint/20 to-green-600/10 flex items-center justify-center border border-krim-mint/30 group-hover:border-krim-mint/60 transition-all duration-300">
                  <AnimatedIcon animation="pulse" duration={3}>
                    <ShieldCheck size={32} weight="duotone" className="text-krim-mint" />
                  </AnimatedIcon>
                </div>
                {/* Shield pulse effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-lg border-2 border-krim-mint/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </div>

              <h3 className="text-3xl font-black text-white mb-4 relative z-10 text-center">
                Governed
              </h3>
              <p className="text-white/80 text-base leading-relaxed mb-3 relative z-10 text-center">
                Pre-action compliance guardrails ensure every decision meets regulatory standards.
              </p>
              <p className="text-krim-mint/70 text-sm leading-relaxed relative z-10 text-center">
                Work becomes autonomous<br />Compliance is stress-free
              </p>
            </motion.div>
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-krim-mint/20 via-krim-mint/10 to-transparent border-2 border-krim-mint/40 rounded-2xl p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Work becomes autonomous<br />
                Compliance is stress-free
              </h3>
              <Link to="/agents">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-krim-mint text-black font-bold text-lg rounded-lg shadow-lg shadow-krim-mint/40 hover:shadow-krim-mint/60 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Meet Kula Co-Workers
                  <CaretRight className="w-5 h-5" weight="bold" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EMERGENT INTELLIGENCE SECTION */}
      <section className="py-20 bg-gradient-to-b from-black/20 to-transparent relative overflow-hidden">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading with Letter-Spacing Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 20, letterSpacing: '0.2em' }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: '0.05em' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent mb-6 text-center"
              >
                Emergent Intelligence
              </motion.h2>
            </div>
          </motion.div>

          {/* Mobile: Enhanced Vertical Stack Layout with Modern Graphics */}
          <div className="md:hidden px-4 max-w-lg mx-auto relative">
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full max-w-md rounded-full bg-gradient-radial from-krim-mint/5 via-krim-cyan/3 to-transparent blur-3xl opacity-40" />
            </div>

            {/* Center Chart with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-krim-cyan/10 via-krim-mint/5 to-cyan-900/10 border-2 border-krim-mint/40 rounded-2xl p-8 text-center mb-8 overflow-hidden backdrop-blur-sm shadow-lg shadow-krim-mint/10"
            >
              {/* Animated Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-krim-mint/40 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-krim-cyan/40 rounded-br-2xl" />

              {/* Pulsing Glow Behind Chart */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 blur-xl" />
              </motion.div>

              {/* Animated Bar Chart */}
              <div className="flex items-end gap-2 mb-4 justify-center relative z-10">
                {[
                  { height: 'h-8', color: 'from-krim-cyan to-krim-cyan/60', delay: 0.4 },
                  { height: 'h-12', color: 'from-krim-cyan to-krim-cyan/70', delay: 0.5 },
                  { height: 'h-16', color: 'from-krim-cyan to-krim-cyan/80', delay: 0.6 },
                  { height: 'h-20', color: 'from-krim-mint to-krim-mint/70', delay: 0.7 },
                  { height: 'h-24', color: 'from-krim-mint to-krim-mint/80', delay: 0.8 },
                ].map((bar, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: bar.delay,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    className={`w-6 ${bar.height} bg-gradient-to-t ${bar.color} rounded-t origin-bottom shadow-lg ${i >= 3 ? 'shadow-krim-mint/30' : 'shadow-krim-cyan/30'}`}
                  />
                ))}
              </div>
              <p className="text-krim-mint text-lg font-bold relative z-10 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]">
                Improving Over Time
              </p>
            </motion.div>

            {/* 4 Enhanced Nodes in Vertical Stack */}
            <div className="space-y-6 relative">
              {/* Connecting Dots Between Cards */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-krim-cyan/20 via-krim-mint/20 to-krim-cyan/20 -z-10" />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute left-1/2 w-2 h-2 -ml-1 rounded-full bg-krim-mint/60 shadow-lg shadow-krim-mint/50"
                  style={{ top: `${(i + 1) * 25}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.5 }}
                />
              ))}

              {/* Node 1: Performance compounds */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-krim-cyan/5 via-black/40 to-krim-cyan/10 border-2 border-krim-cyan/40 rounded-2xl p-6 text-center backdrop-blur-sm overflow-hidden shadow-xl shadow-krim-cyan/10"
              >
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 212, 255, 0)',
                      '0 0 30px rgba(0, 212, 255, 0.3)',
                      '0 0 20px rgba(0, 212, 255, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon with Pulse Animation */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan flex items-center justify-center mx-auto mb-4 relative shadow-lg shadow-krim-cyan/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(0, 212, 255, 0.3)',
                      '0 10px 30px -3px rgba(0, 212, 255, 0.5)',
                      '0 10px 25px -3px rgba(0, 212, 255, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TrendUp size={32} className="text-krim-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" weight="fill" />
                </motion.div>

                <h4 className="text-krim-cyan text-xl font-bold mb-2 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">Performance compounds</h4>
                <p className="text-white/90 text-base leading-snug">
                  Automation becomes continuous optimization
                </p>
              </motion.div>

              {/* Node 2: Learns locally */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-krim-mint/5 via-black/40 to-krim-mint/10 border-2 border-krim-mint/40 rounded-2xl p-6 text-center backdrop-blur-sm overflow-hidden shadow-xl shadow-krim-mint/10"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0)',
                      '0 0 30px rgba(0, 255, 136, 0.3)',
                      '0 0 20px rgba(0, 255, 136, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />

                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint flex items-center justify-center mx-auto mb-4 relative shadow-lg shadow-krim-mint/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                      '0 10px 30px -3px rgba(0, 255, 136, 0.5)',
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <Target size={32} className="text-krim-mint drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]" weight="fill" />
                </motion.div>

                <h4 className="text-krim-mint text-xl font-bold mb-2 drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">Learns locally</h4>
                <p className="text-white/90 text-base leading-snug">
                  Outcomes and exceptions refine behaviour inside your institution
                </p>
              </motion.div>

              {/* Node 3: Compliance holds */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-krim-mint/5 via-black/40 to-krim-mint/10 border-2 border-krim-mint/40 rounded-2xl p-6 text-center backdrop-blur-sm overflow-hidden shadow-xl shadow-krim-mint/10"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0)',
                      '0 0 30px rgba(0, 255, 136, 0.3)',
                      '0 0 20px rgba(0, 255, 136, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint flex items-center justify-center mx-auto mb-4 relative shadow-lg shadow-krim-mint/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                      '0 10px 30px -3px rgba(0, 255, 136, 0.5)',
                      '0 10px 25px -3px rgba(0, 255, 136, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <ShieldCheck size={32} className="text-krim-mint drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]" weight="fill" />
                </motion.div>

                <h4 className="text-krim-mint text-xl font-bold mb-2 drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">Compliance holds</h4>
                <p className="text-white/90 text-base leading-snug">
                  Guardrails remain fixed as intelligence advances
                </p>
              </motion.div>

              {/* Node 4: Shares gains safely */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-krim-cyan/5 via-black/40 to-krim-cyan/10 border-2 border-krim-cyan/40 rounded-2xl p-6 text-center backdrop-blur-sm overflow-hidden shadow-xl shadow-krim-cyan/10"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 212, 255, 0)',
                      '0 0 30px rgba(0, 212, 255, 0.3)',
                      '0 0 20px rgba(0, 212, 255, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />

                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan flex items-center justify-center mx-auto mb-4 relative shadow-lg shadow-krim-cyan/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px -3px rgba(0, 212, 255, 0.3)',
                      '0 10px 30px -3px rgba(0, 212, 255, 0.5)',
                      '0 10px 25px -3px rgba(0, 212, 255, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </motion.div>

                <h4 className="text-krim-cyan text-xl font-bold mb-2 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">Shares gains safely</h4>
                <p className="text-white/90 text-base leading-snug">
                  Federated learning lifts performance without sharing raw data
                </p>
              </motion.div>
            </div>
          </div>

          {/* Desktop: Circular Diagram with Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block relative max-w-5xl mx-auto min-h-[700px] lg:min-h-[800px]"
            role="region"
            aria-label="Emergent Intelligence Visualization"
          >
            {/* Radial Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-radial from-krim-mint/10 via-krim-cyan/5 to-transparent blur-3xl opacity-60" />
            </div>

            {/* Rotating Dotted Circle Border with Data Dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
                transition={{ duration: prefersReducedMotion ? 0 : 120, repeat: prefersReducedMotion ? 0 : (Infinity as any), ease: 'linear' }}
                className="w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-dashed border-krim-mint/30 relative"
              >
                {/* Fixed Data Dots Around Ring - 18 dots at 20° intervals for full coverage */}
                {Array.from({ length: 18 }, (_, i) => i * 20).map((angle, i) => {
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 175 : window.innerWidth < 1024 ? 210 : 250;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-krim-cyan shadow-lg shadow-krim-cyan/80"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    />
                  );
                })}
              </motion.div>
            </div>

            {/* Hollow Circle Around Center Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-krim-cyan/40" />
            </div>

            {/* Center: Chart with Dynamic Pulsing Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              {/* Pulsing Glow Behind Chart */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 3,
                  repeat: prefersReducedMotion ? 0 : (Infinity as any),
                  ease: 'easeInOut',
                }}
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-krim-cyan/40 via-krim-mint/30 to-krim-cyan/40 blur-2xl" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-48 h-48 flex flex-col items-center justify-center relative"
              >
                {/* Animated Bar Chart with Sequential Growth */}
                <div className="flex items-end gap-2 mb-3">
                  {[
                    { height: 'h-8', color: 'from-krim-cyan to-krim-cyan/60', delay: 0.4 },
                    { height: 'h-12', color: 'from-krim-cyan to-krim-cyan/70', delay: 0.5 },
                    { height: 'h-16', color: 'from-krim-cyan to-krim-cyan/80', delay: 0.6 },
                    { height: 'h-20', color: 'from-krim-mint to-krim-mint/70', delay: 0.7 },
                    { height: 'h-24', color: 'from-krim-mint to-krim-mint/80', delay: 0.8 },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.6,
                        delay: prefersReducedMotion ? 0 : bar.delay,
                        type: prefersReducedMotion ? undefined : 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                      className={`w-6 ${bar.height} bg-gradient-to-t ${bar.color} rounded-t origin-bottom`}
                    />
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-krim-mint text-base md:text-lg font-bold text-center drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
                >
                  Improving<br />Over Time
                </motion.p>
              </motion.div>
            </div>

            {/* Node 1: Performance compounds (Top Left) with Halo & Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-[0%] left-[2%] md:left-[-1%] flex flex-col items-center max-w-[220px] md:max-w-[300px] group cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Performance compounds - Automation becomes continuous optimization"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.currentTarget.classList.add('keyboard-active')
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.classList.remove('keyboard-active')
                }
              }}
            >
              {/* Icon with Halo */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-20 h-20 mb-3"
              >
                {/* Soft Lighting Halo */}
                <div className="absolute inset-0 rounded-full bg-krim-cyan/20 blur-xl group-hover:bg-krim-cyan/40 group-focus-visible:bg-krim-cyan/40 transition-colors duration-300" />

                {/* Icon Circle with Pulse on Hover */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : {
                    boxShadow: [
                      '0 0 20px rgba(0, 212, 255, 0.4)',
                      '0 0 40px rgba(0, 212, 255, 0.6)',
                      '0 0 20px rgba(0, 212, 255, 0.4)',
                    ],
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1, repeat: prefersReducedMotion ? 0 : (Infinity as any) }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-krim-cyan group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black"
                >
                  <TrendUp size={32} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                </motion.div>

                {/* Connection Line to Center on Hover */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-full w-32 h-0.5 bg-gradient-to-r from-krim-cyan to-transparent origin-left"
                  style={{ transformOrigin: 'left center' }}
                />
              </motion.div>

              <motion.h4
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-krim-cyan text-xl md:text-2xl font-bold text-center mb-2"
              >
                Performance compounds
              </motion.h4>
              <p className="text-white/80 text-base md:text-lg text-center leading-snug">
                Automation becomes<br />continuous optimization
              </p>
            </motion.div>

            {/* Node 2: Learns locally (Top Right) with Halo & Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-[0%] right-[2%] md:right-[-1%] flex flex-col items-center max-w-[220px] md:max-w-[300px] group cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Learns locally - Outcomes refine behavior inside your institution"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.currentTarget.classList.add('keyboard-active')
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.classList.remove('keyboard-active')
                }
              }}
            >
              {/* Icon with Halo */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-20 h-20 mb-3"
              >
                {/* Soft Lighting Halo */}
                <div className="absolute inset-0 rounded-full bg-krim-mint/20 blur-xl group-hover:bg-krim-mint/40 group-focus-visible:bg-krim-mint/40 transition-colors duration-300" />

                {/* Icon Circle with Pulse on Hover */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : {
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                      '0 0 40px rgba(0, 255, 136, 0.6)',
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                    ],
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1, repeat: prefersReducedMotion ? 0 : (Infinity as any) }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-krim-mint group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black"
                >
                  <Target size={32} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                </motion.div>

                {/* Connection Line to Center on Hover */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 right-full w-32 h-0.5 bg-gradient-to-l from-krim-mint to-transparent origin-right"
                  style={{ transformOrigin: 'right center' }}
                />
              </motion.div>

              <motion.h4
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-krim-mint text-xl md:text-2xl font-bold text-center mb-2"
              >
                Learns locally
              </motion.h4>
              <p className="text-white/80 text-base md:text-lg text-center leading-snug">
                Outcomes and exceptions refine behaviour inside your institution
              </p>
            </motion.div>

            {/* Node 3: Compliance holds (Bottom Left) with Halo & Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-[0%] left-[2%] md:left-[-1%] flex flex-col items-center max-w-[220px] md:max-w-[300px] group cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Compliance holds - Guardrails remain fixed as intelligence advances"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.currentTarget.classList.add('keyboard-active')
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.classList.remove('keyboard-active')
                }
              }}
            >
              {/* Icon with Halo */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-20 h-20 mb-3"
              >
                {/* Soft Lighting Halo */}
                <div className="absolute inset-0 rounded-full bg-krim-mint/20 blur-xl group-hover:bg-krim-mint/40 group-focus-visible:bg-krim-mint/40 transition-colors duration-300" />

                {/* Icon Circle with Pulse on Hover */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : {
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                      '0 0 40px rgba(0, 255, 136, 0.6)',
                      '0 0 20px rgba(0, 255, 136, 0.4)',
                    ],
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1, repeat: prefersReducedMotion ? 0 : (Infinity as any) }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-krim-mint group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black"
                >
                  <ShieldCheck size={32} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                </motion.div>

                {/* Connection Line to Center on Hover */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-full w-32 h-0.5 bg-gradient-to-r from-krim-mint to-transparent origin-left"
                  style={{ transformOrigin: 'left center' }}
                />
              </motion.div>

              <motion.h4
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="text-krim-mint text-xl md:text-2xl font-bold text-center mb-2"
              >
                Compliance holds
              </motion.h4>
              <p className="text-white/80 text-base md:text-lg text-center leading-snug">
                Guardrails remain fixed as intelligence advances
              </p>
            </motion.div>

            {/* Node 4: Shares gains safely (Bottom Right) with Halo & Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-[0%] right-[2%] md:right-[-1%] flex flex-col items-center max-w-[220px] md:max-w-[300px] group cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Shares gains safely - Federated learning without sharing raw data"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.currentTarget.classList.add('keyboard-active')
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.classList.remove('keyboard-active')
                }
              }}
            >
              {/* Icon with Halo */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-20 h-20 mb-3"
              >
                {/* Soft Lighting Halo */}
                <div className="absolute inset-0 rounded-full bg-krim-cyan/20 blur-xl group-hover:bg-krim-cyan/40 group-focus-visible:bg-krim-cyan/40 transition-colors duration-300" />

                {/* Icon Circle with Pulse on Hover */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : {
                    boxShadow: [
                      '0 0 20px rgba(0, 212, 255, 0.4)',
                      '0 0 40px rgba(0, 212, 255, 0.6)',
                      '0 0 20px rgba(0, 212, 255, 0.4)',
                    ],
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1, repeat: prefersReducedMotion ? 0 : (Infinity as any) }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-krim-cyan group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </motion.div>

                {/* Connection Line to Center on Hover */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 right-full w-32 h-0.5 bg-gradient-to-l from-krim-cyan to-transparent origin-right"
                  style={{ transformOrigin: 'right center' }}
                />
              </motion.div>

              <motion.h4
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-krim-cyan text-xl md:text-2xl font-bold text-center mb-2"
              >
                Shares gains safely
              </motion.h4>
              <p className="text-white/80 text-base md:text-lg text-center leading-snug">
                Federated learning lifts performance without sharing raw data
              </p>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                x1="25%" y1="25%" x2="50%" y2="50%"
                stroke="rgba(0, 255, 136, 0.3)" strokeWidth="2" strokeDasharray="4,4"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                x1="75%" y1="25%" x2="50%" y2="50%"
                stroke="rgba(0, 255, 136, 0.3)" strokeWidth="2" strokeDasharray="4,4"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                x1="25%" y1="75%" x2="50%" y2="50%"
                stroke="rgba(0, 255, 136, 0.3)" strokeWidth="2" strokeDasharray="4,4"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                x1="75%" y1="75%" x2="50%" y2="50%"
                stroke="rgba(0, 255, 136, 0.3)" strokeWidth="2" strokeDasharray="4,4"
              />
            </svg>

            {/* Animated Particles/Dots */}
            <motion.div
              className="absolute"
              animate={{
                left: ['25%', '50%', '25%'],
                top: ['25%', '50%', '25%']
              }}
              transition={{ duration: 4, repeat: Infinity as any, ease: 'linear' }}
              style={{ width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px' }}
            >
              <div className="w-full h-full rounded-full bg-krim-cyan shadow-lg shadow-krim-cyan/50" />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                left: ['75%', '50%', '75%'],
                top: ['25%', '50%', '25%']
              }}
              transition={{ duration: 4, repeat: Infinity as any, ease: 'linear', delay: 1 }}
              style={{ width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px' }}
            >
              <div className="w-full h-full rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50" />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                left: ['25%', '50%', '25%'],
                top: ['75%', '50%', '75%']
              }}
              transition={{ duration: 4, repeat: Infinity as any, ease: 'linear', delay: 2 }}
              style={{ width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px' }}
            >
              <div className="w-full h-full rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50" />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                left: ['75%', '50%', '75%'],
                top: ['75%', '50%', '75%']
              }}
              transition={{ duration: 4, repeat: Infinity as any, ease: 'linear', delay: 3 }}
              style={{ width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px' }}
            >
              <div className="w-full h-full rounded-full bg-krim-cyan shadow-lg shadow-krim-cyan/50" />
            </motion.div>

            {/* Floating Particle System - Neural Sparks */}
            {[
              { x: 10, y: 20, delay: 0, color: 'cyan' },
              { x: 85, y: 15, delay: 1, color: 'mint' },
              { x: 15, y: 80, delay: 2, color: 'mint' },
              { x: 90, y: 70, delay: 3, color: 'cyan' },
              { x: 50, y: 10, delay: 1.5, color: 'cyan' },
              { x: 50, y: 90, delay: 2.5, color: 'mint' },
              { x: 30, y: 50, delay: 0.5, color: 'mint' },
              { x: 70, y: 50, delay: 3.5, color: 'cyan' },
            ].slice(0, deviceCapability === 'low' ? 3 : deviceCapability === 'medium' ? 6 : 8).map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute pointer-events-none"
                initial={{ opacity: 0 }}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0, 0.6, 0],
                  y: [0, -30, -60],
                  scale: [1, 1.2, 0.8],
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 4,
                  delay: prefersReducedMotion ? 0 : particle.delay,
                  repeat: prefersReducedMotion ? 0 : (Infinity as any),
                  ease: 'easeOut',
                }}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: '3px',
                  height: '3px',
                }}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    particle.color === 'cyan'
                      ? 'bg-krim-cyan shadow-lg shadow-krim-cyan/80'
                      : 'bg-krim-mint shadow-lg shadow-krim-mint/80'
                  }`}
                />
              </motion.div>
            ))}

            {/* Occasional Sparks Between Icons - Disabled on low-end devices and reduced motion */}
            {deviceCapability !== 'low' && !prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute left-[25%] top-[25%] w-1 h-1 rounded-full bg-krim-cyan"
                  animate={{
                    opacity: [0, 1, 0],
                    left: ['25%', '50%'],
                    top: ['25%', '50%'],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 5,
                    repeat: Infinity as any,
                    repeatDelay: 3,
                  }}
                  style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)' }}
                />
                <motion.div
                  className="absolute right-[25%] top-[25%] w-1 h-1 rounded-full bg-krim-mint"
                  animate={{
                    opacity: [0, 1, 0],
                    right: ['25%', '50%'],
                    top: ['25%', '50%'],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 7,
                    repeat: Infinity as any,
                    repeatDelay: 3,
                  }}
                  style={{ boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)' }}
                />
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS CHANGES SECTION */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/20 relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-center">
                A New World for Credit Operations
              </h2>
            </div>
          </motion.div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Humans move up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 hover:border-krim-cyan/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-krim-cyan flex items-center justify-center mb-6 mx-auto">
                <Users size={32} className="text-black" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Humans move up
              </h3>
              <p className="text-white/70 leading-relaxed">
                People stop operating workflows — they govern outcomes, strategy, and exceptions.
              </p>
            </motion.div>

            {/* Card 2: Compliance as physics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 hover:border-krim-cyan/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-krim-cyan flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck size={32} className="text-black" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Compliance as physics
              </h3>
              <p className="text-white/70 leading-relaxed">
                Rules are enforced before execution and every action is auto-evidenced.
              </p>
            </motion.div>

            {/* Card 3: Observe and Compose */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-krim-mint/10 to-transparent border-2 border-krim-mint/60 rounded-2xl p-8 hover:border-krim-mint transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-krim-mint flex items-center justify-center mb-6 mx-auto">
                <Target size={32} className="text-black" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Observe and Compose
              </h3>
              <p className="text-white/70 leading-relaxed">
                Everything is visible, explainable, and re-shapable without rewiring systems.
              </p>
            </motion.div>
          </div>

          {/* Bottom Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-krim-mint/20 via-krim-mint/10 to-transparent border-2 border-krim-mint/40 rounded-2xl p-8 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">
                Autonomy carries the work<br />Governance keeps control
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ECOSYSTEM · SECURITY · DEPLOYMENT SECTION */}
      <section className="py-20 bg-gradient-to-b from-black/20 to-transparent relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-center">
                Ecosystem · Security · Deployment
              </h2>
            </div>
          </motion.div>

          {/* Three Sections */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* INTEGRATIONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 min-h-[220px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-64">
                  <h3 className="text-krim-cyan text-xl font-bold uppercase mb-4 tracking-wide">INTEGRATIONS</h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    Core banking, CRM, dialers, payments, legal, BI
                  </p>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 flex-1">
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                      <path d="M248,80H229.2a16,16,0,0,0-13.6-16H176a16,16,0,0,0-16,16v48a8,8,0,0,1-16,0V96a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v32a8,8,0,0,1-16,0V80a16,16,0,0,0-16-16H8A8,8,0,0,0,8,80H40v48a24,24,0,0,0,48,0V96h32v32a24,24,0,0,0,48,0V96h32v32a24,24,0,0,0,48,0V80h0Z"></path>
                    </svg>
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Banking</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Core Systems</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <Users size={32} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">CRM</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Customer Data</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <Target size={32} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Dialers</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Communication</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                      <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path>
                    </svg>
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Payments</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Transactions</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <ShieldCheck size={32} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Legal</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Compliance</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                    <TrendUp size={32} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">BI</p>
                  <p className="text-white/60 text-xs text-center whitespace-nowrap">Analytics</p>
                </div>
              </div>
            </div>
            </motion.div>

            {/* SECURE BY ARCHITECTURE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-krim-mint/10 to-transparent border-2 border-krim-mint/40 rounded-2xl p-6 min-h-[220px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-64">
                  <h3 className="text-krim-mint text-xl font-bold uppercase mb-4 tracking-wide">SECURE BY ARCHITECTURE</h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    Audit trails, zero-trust policies, encrypted data at rest and in motion
                  </p>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-6 flex-1">
                  {/* Audit Logging */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-3 group-hover:bg-krim-mint/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-mint group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors whitespace-nowrap">Audit Logging</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Complete History</p>
                  </div>

                  {/* Zero-Trust Access */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-3 group-hover:bg-krim-mint/30 transition-colors">
                      <ShieldCheck size={32} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors whitespace-nowrap">Zero-Trust Access</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Always Verify</p>
                  </div>

                  {/* End-to-End Encryption */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-3 group-hover:bg-krim-mint/30 transition-colors">
                      <LockKey size={32} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">End-to-End Encryption</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Data Protection</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DEPLOYMENT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 min-h-[220px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-64">
                  <h3 className="text-krim-cyan text-xl font-bold uppercase mb-4 tracking-wide">DEPLOYMENT</h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    On-Prem, Single-Tenant VPC, Multi-Tenant Cloud
                  </p>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-6 flex-1">
                  {/* On-Premise with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">On-Premise</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Isolated Infrastructure</p>
                  </div>

                  {/* Single-Tenant VPC with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M160,40a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H168A8,8,0,0,1,160,40Zm40,24H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm0,32H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm37.66,53.66a8,8,0,0,1-11.32,0L206,129.31A48.07,48.07,0,0,1,136,96a48,48,0,0,1,96,0,48,48,0,0,1-6.69,24.34l20.35,20.35A8,8,0,0,1,237.66,149.66ZM216,96a32,32,0,1,0-32,32A32,32,0,0,0,216,96ZM144,192H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-88,0H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Single-Tenant VPC</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Dedicated Cloud</p>
                  </div>

                  {/* Multi-Tenant Cloud with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-3 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M160,40a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H168A8,8,0,0,1,160,40Zm40,24H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm0,32H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM136,120a48,48,0,1,0,48-48A48.05,48.05,0,0,0,136,120Zm80,0a32,32,0,1,1-32-32A32,32,0,0,1,216,120ZM144,192H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-88,0H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Multi-Tenant Cloud</p>
                    <p className="text-white/60 text-xs text-center whitespace-nowrap">Shared Resources</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY IT'S SAFE SECTION */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/20 relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-center">
                <span className="text-krim-mint">Kendra</span> - Building the Future<br />of Credit Operations
              </h2>
            </div>
          </motion.div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Compliance woven into every action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 text-center hover:border-krim-mint/50 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-krim-mint flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={36} className="text-black" weight="fill" />
              </div>
              <h3 className="text-xl font-black text-white">
                Compliance Woven into<br />Every Action
              </h3>
            </motion.div>

            {/* Card 2: Performance scales with continuous learning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 text-center hover:border-krim-cyan/50 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-krim-cyan flex items-center justify-center mx-auto mb-6">
                <TrendUp size={36} className="text-black" weight="fill" />
              </div>
              <h3 className="text-xl font-black text-white">
                Performance Rises with<br />Continuous Learning
              </h3>
            </motion.div>

            {/* Card 3: Banking-grade architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-8 text-center hover:border-krim-cyan/50 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-krim-cyan flex items-center justify-center mx-auto mb-6">
                <Lightning size={36} className="text-black" weight="fill" />
              </div>
              <h3 className="text-xl font-black text-white">
                Banking-Grade<br />Architecture
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION SECTION */}
      <section className="py-32 bg-gradient-to-b from-transparent to-black/30 relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full flex justify-center mb-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white text-center">
                See it in action
              </h2>
            </div>
            <div className="w-full flex justify-center mb-12">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl text-center">
                Contact our team to explore how we can<br />transform your operations.
              </p>
            </div>

            {/* Book Demo Button */}
            <div className="w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to="/contact">
                  <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-krim-cyan/50 transition-all duration-300 hover:scale-105">
                    <span>Book Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      </main>
      {/* End content wrapper */}
    </div>
  )
}
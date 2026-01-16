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
import IntegrationsSection from '../components/sections/IntegrationsSection'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import { useClaimsRegistry } from '../hooks/useClaimsRegistry'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'
import { MetricDisplay } from '../components/common/MetricDisplay'
import { CaretRight, CaretDown, TrendUp, ShieldCheck, Users, Lightning, Trophy, Brain, Target, CheckCircle, Warning, X, Cpu, Cube, LockKey, Path, Cloud, Phone, CreditCard, Folder, ChartBar, Desktop, CloudArrowUp, CloudCheck, GitBranch, Network, FileText, Megaphone, Headset, Scales, MapPin, ChartLine, Handshake, Buildings } from '@phosphor-icons/react'
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black w-full max-w-none text-center mb-6 leading-[1.2] mobile-h1"
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
              Compliant-First. Outcomes Amplified. Costs Reduced.
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

      {/* PERFECT STORM SECTION - Hero Section Background */}
      <section className="relative overflow-hidden py-20">
        {/* Hero Section Background - Particle Background, Grid & Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
          <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
        </div>

        {/* Black Gradient Overlay at Top */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-0" />

        {/* Section Header */}
        <div className="relative z-10 mb-10 px-6">
          <div className="w-full flex justify-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Credit Operations<br />
              Are <span className="text-krim-mint">at Maximum Strain</span>
            </motion.h2>
          </div>
          <div className="w-full flex justify-center">
            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A perfect storm: Legacy systems, rising delinquencies and tightening regulation.
            </motion.p>
          </div>
        </div>

        {/* Three Problems - Futuristic Cards */}
        <div className="relative z-10 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Card 1: 40+ Fragmented Tools */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8, delay: 0 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="relative rounded-3xl p-6 border border-[#FF4C61]/30 overflow-hidden backdrop-blur-xl flex flex-col min-h-[320px]"
              style={{ background: 'radial-gradient(ellipse 500px 300px at top, rgba(255, 76, 97, 0.1), transparent), rgba(10, 8, 27, 0.6)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 76, 97, 0.15)' }}
            >
              {/* Scan-line overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.03) 1px, transparent 2px, transparent 4px)', animation: 'scan-lines 8s linear infinite' }}></div>

              {/* Hexagonal Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0 }}
                className="flex justify-center mb-4"
              >
                <div className="hexagon-icon w-16 h-16 bg-gradient-to-br from-[#FF4C61]/40 to-[#FF4C61]/20 border-2 border-[#FF4C61]/60 flex items-center justify-center relative group">
                  <Network size={32} className="text-[#FF4C61] relative z-10" weight="duotone" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 76, 97, 0.8))' }} />
                  <div className="absolute inset-[-6px] hexagon-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255, 76, 97, 0.6) 60deg, transparent 120deg)', animation: 'rotate-border 4s linear infinite' }}></div>
                </div>
              </motion.div>

              {/* Title with gradient */}
              <h3 className="text-[clamp(1.25rem,1.6vw+0.4rem,1.65rem)] font-bold text-center mb-0 leading-tight min-h-[3.5rem] flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF4C61 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}>
                <span>40+ Fragmented</span>
                <span>Tools</span>
              </h3>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-end space-y-8">
                <p className="text-[clamp(0.84rem,0.9vw+0.45rem,1.01rem)] font-semibold text-krim-cyan opacity-85 text-center transition-all duration-300 hover:opacity-100 h-[1.2rem] flex items-center justify-center leading-tight">
                  Blind spots, friction, delays
                </p>
                <p className="text-[clamp(0.9rem,1vw+0.4rem,1.2rem)] font-bold text-center px-2 py-2 rounded-xl h-[3.15rem] flex items-center justify-center whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #00FF88 0%, #FF4C61 50%, #00FF88 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite' }}>
                  Data siloes kill efficiency
                </p>
              </div>
            </motion.div>

            {/* Card 2: Human Middleware */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8, delay: 0.15 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="relative rounded-3xl p-6 border border-[#00FF88]/30 overflow-hidden backdrop-blur-xl flex flex-col min-h-[320px]"
              style={{ background: 'radial-gradient(ellipse 500px 300px at top, rgba(0, 255, 136, 0.1), transparent), rgba(10, 8, 27, 0.6)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 255, 136, 0.15)' }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.03) 1px, transparent 2px, transparent 4px)', animation: 'scan-lines 8s linear infinite' }}></div>

              {/* Hexagonal Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
                className="flex justify-center mb-4"
              >
                <div className="hexagon-icon w-16 h-16 bg-gradient-to-br from-[#00FF88]/40 to-[#00FF88]/20 border-2 border-[#00FF88]/60 flex items-center justify-center relative group">
                  <Users size={32} className="text-[#00FF88] relative z-10" weight="duotone" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))' }} />
                  <div className="absolute inset-[-6px] hexagon-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 136, 0.6) 60deg, transparent 120deg)', animation: 'rotate-border 4s linear infinite' }}></div>
                </div>
              </motion.div>

              <h3 className="text-[clamp(1.25rem,1.6vw+0.4rem,1.65rem)] font-bold text-center mb-0 leading-tight min-h-[3.5rem] flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #00FF88 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}>
                <span>Human</span>
                <span>Middleware</span>
              </h3>

              <div className="flex-1 flex flex-col justify-end space-y-8">
                <p className="text-[clamp(0.84rem,0.9vw+0.45rem,1.01rem)] font-semibold text-krim-cyan opacity-85 text-center transition-all duration-300 hover:opacity-100 h-[1.2rem] flex items-center justify-center leading-tight">
                  People patch broken workflows
                </p>
                <p className="text-[clamp(0.9rem,1vw+0.4rem,1.2rem)] font-bold text-center px-2 py-2 rounded-xl h-[3.15rem] flex items-center justify-center whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #00FF88 0%, #00D4FF 50%, #00FF88 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite' }}>
                  65% staff churn = lost expertise
                </p>
              </div>
            </motion.div>

            {/* Card 3: Post-Fact Compliance Risk */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="relative rounded-3xl p-6 border border-[#00D4FF]/30 overflow-hidden backdrop-blur-xl flex flex-col min-h-[320px]"
              style={{ background: 'radial-gradient(ellipse 500px 300px at top, rgba(0, 212, 255, 0.1), transparent), rgba(10, 8, 27, 0.6)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 212, 255, 0.15)' }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.03) 1px, transparent 2px, transparent 4px)', animation: 'scan-lines 8s linear infinite' }}></div>

              {/* Hexagonal Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="flex justify-center mb-4"
              >
                <div className="hexagon-icon w-16 h-16 bg-gradient-to-br from-[#00D4FF]/40 to-[#00D4FF]/20 border-2 border-[#00D4FF]/60 flex items-center justify-center relative group">
                  <ShieldCheck size={32} className="text-[#00D4FF] relative z-10" weight="duotone" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' }} />
                  <div className="absolute inset-[-6px] hexagon-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 212, 255, 0.6) 60deg, transparent 120deg)', animation: 'rotate-border 4s linear infinite' }}></div>
                </div>
              </motion.div>

              <h3 className="text-[clamp(1.25rem,1.6vw+0.4rem,1.65rem)] font-bold text-center mb-0 leading-tight min-h-[3.5rem] flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #00D4FF 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}>
                <span>Post-Fact</span>
                <span>Compliance Risk</span>
              </h3>

              <div className="flex-1 flex flex-col justify-end space-y-8">
                <p className="text-[clamp(0.84rem,0.9vw+0.45rem,1.01rem)] font-semibold text-krim-cyan opacity-85 text-center transition-all duration-300 hover:opacity-100 h-[1.2rem] flex items-center justify-center leading-tight">
                  Only 5% of activity is reviewed
                </p>
                <p className="text-[clamp(0.9rem,1vw+0.4rem,1.2rem)] font-bold text-center px-2 py-2 rounded-xl h-[3.15rem] flex items-center justify-center whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #00FF88 0%, #00D4FF 50%, #00FF88 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite' }}>
                  $1.2M avg. penalty
                </p>
              </div>
            </motion.div>

          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-xl md:text-2xl text-white font-bold max-w-4xl mx-auto leading-relaxed">
              Credit leaders are urgently seeking<br />
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                Unified, Automated, Compliant
              </span>{' '}
              operating models.
            </p>
          </motion.div>
        </div>
      </section>
      {/* KRIMOS CHANGES WHAT'S POSSIBLE SECTION */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
          <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-krim-mint/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-krim-cyan/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Animated background glow effect for headline */}
              <motion.span
                className="absolute inset-0 blur-2xl opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.4), transparent 70%)',
                  zIndex: -1
                }}
              />

              <span className="relative flex items-center justify-center gap-3 mb-4">
                <KrimAnimatedLogo size="xl" className="inline-block" /> <span className="text-3xl translate-y-1.5 inline-block">introduces</span>
              </span>
              <span className="relative block"><br />
                <span className="relative inline-block">
                  <span className="text-krim-mint relative">
                    Kendra™
                    {/* Pulsing glow behind Kendra */}
                    <motion.span
                      className="absolute inset-0 blur-lg"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: 'linear-gradient(90deg, #00FF88, #00D4FF)',
                        WebkitBackgroundClip: 'text',
                        zIndex: -1
                      }}
                    />
                  </span>
                </span>
              </span>
            </motion.h2>

            <motion.h3
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="relative inline-block bg-gradient-to-r from-white via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                The Emergent Intelligence Runtime
                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  style={{
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black, transparent)',
                    maskImage: 'linear-gradient(90deg, transparent, black, transparent)'
                  }}
                />
              </span>
            </motion.h3>

            <motion.p
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A governed & unified environment where AI systems execute post-disbursal credit workflows.
            </motion.p>

            {/* Kendra Pillars Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative inline-block"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Kendra Pillars
              </h3>
              <motion.div
                className="h-1 bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>
          </motion.div>

          {/* Kendra Pillars - Enhanced 4 Column Grid with Connection Lines */}
          <div className="relative">
            {/* Connection Lines - Desktop Only */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px pointer-events-none">
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Horizontal connecting line */}
                <svg className="absolute inset-0 w-full h-full" style={{ top: '-1px' }}>
                  <motion.line
                    x1="12%" y1="0" x2="88%" y2="0"
                    stroke="url(#gradient-line)"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FF88" stopOpacity="0.4" />
                      <stop offset="33%" stopColor="#00D4FF" stopOpacity="0.4" />
                      <stop offset="66%" stopColor="#B794F6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated data flow particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 w-2 h-2 rounded-full"
                    style={{
                      background: ['#00FF88', '#00D4FF', '#B794F6', '#FF6B9D'][i],
                      boxShadow: `0 0 10px ${['#00FF88', '#00D4FF', '#B794F6', '#FF6B9D'][i]}`
                    }}
                    initial={{ left: '12%', opacity: 0 }}
                    animate={{
                      left: ['12%', '88%'],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.7 + 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
              {/* Pillar 1: Expert AI Co-Workers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group h-full"
              >
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-krim-mint/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <Card3D glowColor="mint" intensity="subtle" enableTilt={true} enableGlow={true}>
                  <div className="relative bg-gradient-to-br from-krim-mint/10 to-transparent border-2 border-krim-mint/30 rounded-2xl p-8 group-hover:border-krim-mint/40 transition-all duration-500 h-full min-h-[340px] backdrop-blur-sm flex flex-col">
                    {/* Animated icon with pulsing ring */}
                    <div className="relative mb-6 mx-auto w-24 h-24">
                      {/* Outer pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-mint/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                      {/* Icon container */}
                      <motion.div
                        className="relative flex items-center justify-center w-full h-full rounded-full bg-krim-mint/20 border-2 border-krim-mint/50 group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(0, 255, 136, 0.3)',
                            '0 0 40px rgba(0, 255, 136, 0.6)',
                            '0 0 20px rgba(0, 255, 136, 0.3)'
                          ]
                        }}
                        style={{ transitionTimingFunction: 'ease-in-out', transitionDuration: '2s' }}
                      >
                        <Users size={44} className="text-krim-mint" weight="duotone" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      Expert<br />AI Co-Workers
                    </h3>

                    <p className="text-base text-white/70 text-center leading-relaxed">
                      Scale output,<br />not cost.
                    </p>

                    {/* Neural connection indicator */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-krim-mint"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </Card3D>
              </motion.div>

              {/* Pillar 2: Unified Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group h-full"
              >
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-krim-cyan/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <Card3D glowColor="cyan" intensity="subtle" enableTilt={true} enableGlow={true}>
                  <div className="relative bg-gradient-to-br from-krim-cyan/10 to-transparent border-2 border-krim-cyan/30 rounded-2xl p-8 group-hover:border-krim-cyan/40 transition-all duration-500 h-full min-h-[340px] backdrop-blur-sm flex flex-col">
                    {/* Animated icon with pulsing ring */}
                    <div className="relative mb-6 mx-auto w-24 h-24">
                      {/* Outer pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-cyan/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                      />
                      {/* Icon container */}
                      <motion.div
                        className="relative flex items-center justify-center w-full h-full rounded-full bg-krim-cyan/20 border-2 border-krim-cyan/50 group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(0, 212, 255, 0.3)',
                            '0 0 40px rgba(0, 212, 255, 0.6)',
                            '0 0 20px rgba(0, 212, 255, 0.3)'
                          ]
                        }}
                        style={{ transitionTimingFunction: 'ease-in-out', transitionDuration: '2s' }}
                      >
                        <Brain size={44} className="text-krim-cyan" weight="duotone" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      Unified Intelligence
                    </h3>

                    <p className="text-base text-white/70 text-center leading-relaxed">
                      Real-time dashboards, controls, and analytics.
                    </p>

                    {/* Neural connection indicator */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-krim-cyan"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </Card3D>
              </motion.div>

              {/* Pillar 3: Continuous Learning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group h-full"
              >
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-krim-cyan/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <Card3D glowColor="cyan" intensity="subtle" enableTilt={true} enableGlow={true}>
                  <div className="relative bg-gradient-to-br from-krim-cyan/10 to-transparent border-2 border-krim-cyan/30 rounded-2xl p-8 group-hover:border-krim-cyan/40 transition-all duration-500 h-full min-h-[340px] backdrop-blur-sm flex flex-col">
                    {/* Animated icon with pulsing ring */}
                    <div className="relative mb-6 mx-auto w-24 h-24">
                      {/* Outer pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-cyan/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                      />
                      {/* Icon container */}
                      <motion.div
                        className="relative flex items-center justify-center w-full h-full rounded-full bg-krim-cyan/20 border-2 border-krim-cyan/50 group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(183, 148, 246, 0.3)',
                            '0 0 40px rgba(183, 148, 246, 0.6)',
                            '0 0 20px rgba(183, 148, 246, 0.3)'
                          ]
                        }}
                        style={{ transitionTimingFunction: 'ease-in-out', transitionDuration: '2s' }}
                      >
                        <TrendUp size={44} className="text-krim-cyan" weight="duotone" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      Continuous Learning
                    </h3>

                    <p className="text-base text-white/70 text-center leading-relaxed">
                      Compounding efficiency & outcomes.
                    </p>

                    {/* Neural connection indicator */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-krim-cyan"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                </Card3D>
              </motion.div>

              {/* Pillar 4: Compliant-by Design */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group h-full"
              >
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-krim-coral/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />

                <Card3D glowColor="coral" intensity="subtle" enableTilt={true} enableGlow={true}>
                  <div className="relative bg-gradient-to-br from-krim-coral/10 to-transparent border-2 border-krim-coral/30 rounded-2xl p-8 group-hover:border-krim-coral/40 transition-all duration-500 h-full min-h-[340px] backdrop-blur-sm flex flex-col">
                    {/* Animated icon with pulsing ring */}
                    <div className="relative mb-6 mx-auto w-24 h-24">
                      {/* Outer pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-krim-coral/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
                      />
                      {/* Icon container */}
                      <motion.div
                        className="relative flex items-center justify-center w-full h-full rounded-full bg-krim-coral/20 border-2 border-krim-coral/50 group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(255, 107, 157, 0.3)',
                            '0 0 40px rgba(255, 107, 157, 0.6)',
                            '0 0 20px rgba(255, 107, 157, 0.3)'
                          ]
                        }}
                        style={{ transitionTimingFunction: 'ease-in-out', transitionDuration: '2s' }}
                      >
                        <ShieldCheck size={44} className="text-krim-coral" weight="duotone" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      Compliance<br />as Physics
                    </h3>

                    <p className="text-base text-white/70 text-center leading-relaxed">
                      Violations vanish. Proof generated at every step.
                    </p>

                    {/* Neural connection indicator */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-krim-coral"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    />
                  </div>
                </Card3D>
              </motion.div>
            </div>
          </div>

          {/* Closing statement - Autonomy with Governance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Autonomy with Governance
                </span>
              </h2>
            </div>
          </motion.div>

        </div>
      </section>

      {/* KUPA COMMAND CENTERS */}
      <section className="py-32 relative">
        {/* Consistent Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="w-full flex justify-center mb-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Kupa Command Centers
                </span>
              </h2>
            </div>
            <div className="w-full flex justify-center mb-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Mission Control for Credit Operations
              </h3>
            </div>
          </motion.div>

          {/* Mission Control - Tree Hierarchy */}
          <div className="relative w-full max-w-7xl mx-auto pt-8 pb-20 px-6">
            {/* AI Intelligence Tree Branches - SVG Layer */}
            <svg className="absolute top-40 left-0 w-full h-[600px] pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                {/* Gradient for branches */}
                <linearGradient id="branchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(20, 184, 166, 0.6)" />
                  <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                </linearGradient>

                {/* Glow filter for branches */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main Trunk */}
              <motion.path
                d="M 50% 0 L 50% 80"
                stroke="url(#branchGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Primary Branch Split */}
              <motion.path
                d="M 50% 80 Q 30% 100, 25% 140"
                stroke="url(#branchGradient)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
              <motion.path
                d="M 50% 80 Q 70% 100, 75% 140"
                stroke="url(#branchGradient)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />

              {/* Secondary Branches to Row 1 (4 centers) */}
              {[
                { x1: '25%', y1: '140', x2: '12.5%', y2: '180', delay: 0.5 }, // Campaign
                { x1: '25%', y1: '140', x2: '37.5%', y2: '180', delay: 0.6 }, // Support
                { x1: '75%', y1: '140', x2: '62.5%', y2: '180', delay: 0.7 }, // Legal
                { x1: '75%', y1: '140', x2: '87.5%', y2: '180', delay: 0.8 }, // Field Ops
              ].map((branch, i) => (
                <motion.path
                  key={`branch-row1-${i}`}
                  d={`M ${branch.x1} ${branch.y1} Q ${branch.x1} ${parseInt(branch.y1) + 20}, ${branch.x2} ${branch.y2}`}
                  stroke="url(#branchGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: branch.delay, ease: "easeOut" }}
                />
              ))}

              {/* Branches to Row 2 (4 centers) */}
              {[
                { x1: '25%', y1: '140', x2: '12.5%', y2: '340', delay: 0.9 },  // Compliance
                { x1: '25%', y1: '140', x2: '37.5%', y2: '340', delay: 1.0 },  // Risk
                { x1: '75%', y1: '140', x2: '62.5%', y2: '340', delay: 1.1 },  // Settlements
                { x1: '75%', y1: '140', x2: '87.5%', y2: '340', delay: 1.2 },  // Enterprise
              ].map((branch, i) => (
                <motion.path
                  key={`branch-row2-${i}`}
                  d={`M ${branch.x1} ${branch.y1} Q ${branch.x1} ${parseInt(branch.y1) + 80}, ${branch.x2} ${branch.y2}`}
                  stroke="url(#branchGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: branch.delay, ease: "easeOut" }}
                />
              ))}

              {/* AI Intelligence Particles - Flowing along branches */}
              {/* Trunk particles */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`trunk-particle-${i}`}
                  r="3"
                  fill="rgba(20, 184, 166, 0.8)"
                  filter="url(#glow)"
                  animate={{
                    cy: ['0', '80'],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "linear",
                  }}
                  cx="50%"
                />
              ))}

              {/* Neural Junction Nodes (Leaves) */}
              {[
                { cx: '50%', cy: '80', size: 4 },   // Main junction
                { cx: '25%', cy: '140', size: 3 },  // Left branch junction
                { cx: '75%', cy: '140', size: 3 },  // Right branch junction
              ].map((node, i) => (
                <g key={`junction-${i}`}>
                  {/* Outer pulse ring */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.size + 4}
                    fill="none"
                    stroke="rgba(20, 184, 166, 0.4)"
                    strokeWidth="1"
                    animate={{
                      r: [node.size + 4, node.size + 8],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  {/* Core node */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.size}
                    fill="rgba(52, 211, 153, 0.9)"
                    filter="url(#glow)"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  {/* Inner sparkle */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.size / 2}
                    fill="rgba(255, 255, 255, 0.8)"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </g>
              ))}

              {/* Data flow particles on primary branches */}
              {[
                { path: 'M 50% 80 Q 30% 100, 25% 140', delay: 0 },
                { path: 'M 50% 80 Q 70% 100, 75% 140', delay: 0.5 },
              ].map((flow, i) => (
                <motion.circle
                  key={`flow-particle-${i}`}
                  r="2.5"
                  fill="rgba(96, 165, 250, 0.9)"
                  filter="url(#glow)"
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={flow.path}
                    begin={`${flow.delay}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${flow.delay}s`}
                  />
                </motion.circle>
              ))}
            </svg>

            {/* 8 Command Centers - Tree Structure (2 Rows: 4+4) */}
            <div className="space-y-12">
              {/* Row 1: First 4 Centers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { name: 'Campaign', icon: Megaphone, color: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/40', text: 'text-pink-400', delay: 0.1 },
                  { name: 'Support', icon: Headset, color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400', delay: 0.2 },
                  { name: 'Legal', icon: Scales, color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/40', text: 'text-blue-400', delay: 0.3 },
                  { name: 'Field Ops', icon: MapPin, color: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', delay: 0.4 },
                ].map((zone) => {
                  const Icon = zone.icon
                  return (
                    <motion.div
                      key={zone.name}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: zone.delay, type: "spring", stiffness: 100 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group"
                      style={{ zIndex: 10 }}
                    >
                      {/* Oval Command Center */}
                      <div className={`relative h-44 rounded-[2.5rem] bg-gradient-to-br ${zone.color} backdrop-blur-md border-2 ${zone.border} overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                        {/* Scan Line */}
                        <motion.div
                          animate={{ y: ['-100%', '200%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: zone.delay }}
                          className="absolute inset-0 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent"
                        />

                        {/* Content */}
                        <div className="relative h-full p-6 flex flex-col items-center justify-center gap-4">
                          {/* Icon with enhanced glow */}
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Icon size={48} className={`${zone.text} drop-shadow-[0_0_20px_currentColor]`} weight="fill" />
                          </motion.div>

                          {/* Zone Name */}
                          <h3 className={`text-lg lg:text-xl font-black ${zone.text} text-center tracking-wide`}>
                            {zone.name}
                          </h3>
                        </div>

                        {/* Hover Glow */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${zone.text.replace('text-', 'from-')} to-transparent`} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Row 2: Last 4 Centers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { name: 'Compliance', icon: ShieldCheck, color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/40', text: 'text-amber-400', delay: 0.5 },
                  { name: 'Risk', icon: ChartLine, color: 'from-red-500/20 to-rose-500/10', border: 'border-red-500/40', text: 'text-red-400', delay: 0.6 },
                  { name: 'Settlements', icon: Handshake, color: 'from-lime-500/20 to-green-500/10', border: 'border-lime-500/40', text: 'text-lime-400', delay: 0.7 },
                  { name: 'Enterprise', icon: Buildings, color: 'from-teal-500/20 to-cyan-500/10', border: 'border-teal-500/40', text: 'text-teal-400', delay: 0.8 },
                ].map((zone) => {
                  const Icon = zone.icon
                  return (
                    <motion.div
                      key={zone.name}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: zone.delay, type: "spring", stiffness: 100 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group"
                      style={{ zIndex: 10 }}
                    >
                      {/* Oval Command Center */}
                      <div className={`relative h-44 rounded-[2.5rem] bg-gradient-to-br ${zone.color} backdrop-blur-md border-2 ${zone.border} overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                        {/* Scan Line */}
                        <motion.div
                          animate={{ y: ['-100%', '200%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: zone.delay }}
                          className="absolute inset-0 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent"
                        />

                        {/* Content */}
                        <div className="relative h-full p-6 flex flex-col items-center justify-center gap-4">
                          {/* Icon with enhanced glow */}
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Icon size={48} className={`${zone.text} drop-shadow-[0_0_20px_currentColor]`} weight="fill" />
                          </motion.div>

                          {/* Zone Name */}
                          <h3 className={`text-lg lg:text-xl font-black ${zone.text} text-center tracking-wide`}>
                            {zone.name}
                          </h3>
                        </div>

                        {/* Hover Glow */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${zone.text.replace('text-', 'from-')} to-transparent`} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Sequential Typography Animation - Live Statements */}
              <div className="text-xl md:text-2xl font-semibold tracking-wide flex flex-wrap justify-center gap-x-3 gap-y-2 mt-16">
                {/* "Live oversight." */}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-krim-mint inline-block"
                  style={{
                    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
                  }}
                >
                  Live oversight.
                </motion.span>

                {/* "Live intervention." */}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-krim-cyan inline-block"
                  style={{
                    textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                  }}
                >
                  Live intervention.
                </motion.span>

                {/* "Live intelligence." */}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 1.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-white inline-block"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Live intelligence.
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
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
          {/* Triangle Layout - Why it matters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            {/* Heading */}
            <div className="w-full flex justify-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Why it matters
                </span>
              </h2>
            </div>

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
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-mint/30 border-4 border-krim-cyan flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(0, 212, 255, 0.6)" }}
                  transition={{ duration: 0.4 }}
                >
                  <TrendUp size={48} className="text-krim-cyan" weight="bold" />
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

      {/* KULA ASSISTANT SECTION - Enhanced */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Grid */}
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        {/* Ambient Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-krim-cyan/15 via-krim-cyan/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-krim-mint/15 via-krim-mint/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading with Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                Kula Assistant
              </span>
            </h2>

            <p className="text-2xl md:text-3xl text-white font-bold mb-6 tracking-tight">
              Interactive Intelligence Interface
            </p>

            <p className="text-white/70 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Human-in-the-loop orchestration, design, analysis & approvals<br className="hidden md:block" />
              <span className="text-krim-mint">through natural language.</span>
            </p>
          </motion.div>

          {/* Main Layout: Chat Demo + Equilateral Triangle of Action Cards */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

            {/* LEFT SIDE: Interactive Demo Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-[55%] relative"
            >
              <div className="relative">
                {/* Demo Terminal/Chat Interface */}
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl border-2 border-krim-cyan/30 shadow-[0_0_50px_rgba(0,212,255,0.2)] overflow-hidden">
                  {/* Terminal Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-white/60 text-sm font-mono ml-4">kula-assistant://interface</span>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-8 space-y-6">
                    {/* User Message */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">You</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tl-sm px-6 py-4">
                          <p className="text-white/90 text-lg">
                            "Build a workflow for high-risk accounts"
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Kula Response */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-krim-cyan to-krim-mint flex items-center justify-center flex-shrink-0">
                        <Brain size={20} className="text-white" weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-br from-krim-cyan/20 to-krim-mint/20 border border-krim-cyan/40 rounded-2xl rounded-tl-sm px-6 py-4">
                          <p className="text-white/90 text-lg mb-4">
                            ✓ Workflow created with 3 automated steps
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-krim-cyan/20 border border-krim-cyan/40 text-krim-cyan text-sm">
                              Risk Assessment
                            </span>
                            <span className="px-3 py-1 rounded-full bg-krim-mint/20 border border-krim-mint/40 text-krim-mint text-sm">
                              Compliance Check
                            </span>
                            <span className="px-3 py-1 rounded-full bg-krim-mint/20 border border-krim-mint/40 text-krim-mint text-sm">
                              Escalation Rules
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Typing Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-krim-cyan to-krim-mint flex items-center justify-center flex-shrink-0">
                        <Brain size={20} className="text-white" weight="fill" />
                      </div>
                      <div className="flex gap-1.5">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-krim-cyan"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-krim-cyan"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-krim-cyan"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Floating Action Indicators */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-1/4 bg-gradient-to-br from-krim-cyan/90 to-krim-cyan/70 backdrop-blur-xl rounded-xl px-4 py-3 border border-krim-cyan/50 shadow-lg hidden lg:block"
                >
                  <div className="flex items-center gap-2">
                    <GitBranch size={20} className="text-white" weight="duotone" />
                    <span className="text-white text-sm font-semibold">Building...</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -left-6 top-1/2 bg-gradient-to-br from-krim-mint/90 to-krim-mint/70 backdrop-blur-xl rounded-xl px-4 py-3 border border-krim-mint/50 shadow-lg hidden lg:block"
                >
                  <div className="flex items-center gap-2">
                    <TrendUp size={20} className="text-white" weight="duotone" />
                    <span className="text-white text-sm font-semibold">Analyzing...</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Vertical Icon Stack with Alternating Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full lg:w-[45%] flex items-center justify-center"
            >
              {/* Vertical Stack Container */}
              <div className="flex flex-col gap-12">

                {/* Item 1: Build workflows - Text on LEFT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center gap-6"
                >
                  {/* Text Left */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-base md:text-lg font-bold text-right drop-shadow-lg whitespace-nowrap"
                  >
                    <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Build</span>{' '}
                    <span className="text-white">workflows.</span>
                  </motion.p>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Pulsing Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-16 h-16 rounded-full border-2 border-krim-cyan/50"
                    />

                    {/* Icon Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] backdrop-blur-sm">
                      <GitBranch size={32} className="text-krim-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" weight="duotone" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Item 2: Analyze outcomes - Text on RIGHT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex items-center gap-6"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Pulsing Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="absolute inset-0 w-16 h-16 rounded-full border-2 border-krim-mint/50"
                    />

                    {/* Icon Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-krim-mint/30 to-krim-mint/10 border-2 border-krim-mint/60 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)] backdrop-blur-sm">
                      <TrendUp size={24} className="text-krim-mint drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" weight="duotone" />
                    </div>
                  </motion.div>

                  {/* Text Right */}
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-base md:text-lg font-bold text-left drop-shadow-lg whitespace-nowrap"
                  >
                    <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Analyze</span>{' '}
                    <span className="text-white">outcomes.</span>
                  </motion.p>
                </motion.div>

                {/* Item 3: Execute policy at scale - Text on LEFT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="flex items-center gap-6"
                >
                  {/* Text Left */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="text-base md:text-lg font-bold text-right drop-shadow-lg whitespace-nowrap"
                  >
                    <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Execute</span>{' '}
                    <span className="text-white">policy at scale.</span>
                  </motion.p>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Pulsing Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="absolute inset-0 w-16 h-16 rounded-full border-2 border-krim-cyan/50"
                    />

                    {/* Icon Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-krim-cyan/30 to-krim-cyan/10 border-2 border-krim-cyan/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] backdrop-blur-sm">
                      <Lightning size={32} className="text-krim-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" weight="duotone" />
                    </div>
                  </motion.div>
                </motion.div>

              </div>
            </motion.div>

          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <Link to="/agents">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-krim-cyan to-krim-mint text-black font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet Kula Assistant
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* KULA SECTION - AI CO-WORKERS */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-black/20 to-transparent relative overflow-hidden">
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
            className="mb-4"
          >
            <div className="w-full flex justify-center mb-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center">
                <span className="text-krim-cyan">Karta™ - AI Coworkers</span>
              </h2>
            </div>
            <div className="w-full flex justify-center mb-3">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
                That Execute Credit Workflows
              </h3>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg md:text-xl text-white/70 text-center">Across Channels and Systems</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* KRIA CO-WORKERS DETAILS SECTION */}
      <section className="pb-20 relative">
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
              <h3 className="text-2xl font-black text-white mb-8 text-center">
                Contact Center Co-Workers
              </h3>

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
              <h3 className="text-2xl font-black text-white mb-8 text-center">
                Back-Office Co-Workers
              </h3>

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
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Section Header: Atomic Composable Governed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="w-full flex justify-center mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                  Atomic. Composable. Governed.
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Automate end-to-end workflows with auditable, policy-bound AI agents.
            </p>

            {/* Decorative line */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan mx-auto mt-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>


          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link to="/agents">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-krim-mint text-black font-bold text-lg rounded-lg shadow-lg shadow-krim-mint/40 hover:shadow-krim-mint/60 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Meet Karta Coworker
                <CaretRight className="w-5 h-5" weight="bold" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* KRIM STACK DETAILS - Mini-Sections */}
      <section id="krim-stack-details" className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Kendra Mini-Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative bg-slate-900/30 border border-white/10 rounded-xl p-4 hover:bg-slate-900/50 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-krim-mint mb-1">Kendra</h3>
                <p className="text-xs text-white/70 uppercase tracking-wider">Intelligence Runtime</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                The orchestration layer that governs multi-agent systems, ensuring seamless coordination and optimal resource allocation across all credit operations.
              </p>
            </motion.div>

            {/* Kula Mini-Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-slate-900/30 border border-white/10 rounded-xl p-4 hover:bg-slate-900/50 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-krim-cyan mb-1">Kula</h3>
                <p className="text-xs text-white/70 uppercase tracking-wider">Assistant Interface</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Your conversational AI assistant that provides instant insights, answers complex queries, and helps you navigate the entire credit management ecosystem.
              </p>
            </motion.div>

            {/* Karta Mini-Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-slate-900/30 border border-white/10 rounded-xl p-4 hover:bg-slate-900/50 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-krim-mint mb-1">Karta</h3>
                <p className="text-xs text-white/70 uppercase tracking-wider">AI Co-Workers</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Specialized AI agents that execute specific credit workflows, from collections and compliance to customer outreach—working alongside your human teams.
              </p>
            </motion.div>

            {/* Kupa Mini-Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative bg-slate-900/30 border border-white/10 rounded-xl p-4 hover:bg-slate-900/50 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-krim-mint mb-1">Kupa</h3>
                <p className="text-xs text-white/70 uppercase tracking-wider">Command Centers</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Mission-critical dashboards that provide real-time oversight, analytics, and control over all credit operations with enterprise-grade security and governance.
              </p>
            </motion.div>

            {/* Kriya Mini-Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group relative bg-slate-900/30 border border-white/10 rounded-xl p-4 hover:bg-slate-900/50 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-krim-coral mb-1">Kriya</h3>
                <p className="text-xs text-white/70 uppercase tracking-wider">Workflow Engine</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                The automation engine that sequences and executes complex credit workflows, adapting dynamically to changing conditions and regulatory requirements.
              </p>
            </motion.div>

          </div>
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
                  <TrendUp size={24} className="text-krim-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" weight="fill" />
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
                  <ShieldCheck size={24} className="text-krim-mint drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]" weight="fill" />
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
                  <TrendUp size={24} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
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
                  <ShieldCheck size={24} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
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

      {/* ECOSYSTEM · SECURITY · DEPLOYMENT SECTION */}
      <section className="py-12 bg-gradient-to-b from-black/20 to-transparent relative">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Ecosystem · Security · Deployment
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Three Sections */}
          <div className="space-y-4 max-w-6xl mx-auto">
            {/* INTEGRATIONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-48">
                  <h3 className="text-krim-cyan text-base font-bold uppercase tracking-wide">INTEGRATIONS</h3>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 flex-1">
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                      <path d="M248,80H229.2a16,16,0,0,0-13.6-16H176a16,16,0,0,0-16,16v48a8,8,0,0,1-16,0V96a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v32a8,8,0,0,1-16,0V80a16,16,0,0,0-16-16H8A8,8,0,0,0,8,80H40v48a24,24,0,0,0,48,0V96h32v32a24,24,0,0,0,48,0V96h32v32a24,24,0,0,0,48,0V80h0Z"></path>
                    </svg>
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Banking</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <Users size={24} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">CRM</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <Target size={24} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Dialers</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                      <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path>
                    </svg>
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Payments</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <ShieldCheck size={24} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Legal</p>
                </div>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px]">
                  <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                    <TrendUp size={24} className="text-krim-cyan group-hover:scale-110 transition-transform" weight="fill" />
                  </div>
                  <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">BI</p>
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
              className="bg-gradient-to-br from-krim-mint/10 to-transparent border-2 border-krim-mint/40 rounded-2xl p-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-48">
                  <h3 className="text-krim-mint text-base font-bold uppercase tracking-wide">SECURE BY ARCHITECTURE</h3>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {/* Audit Logging */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-2 group-hover:bg-krim-mint/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-mint group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors whitespace-nowrap">Audit Logging</p>
                  </div>

                  {/* Zero-Trust Access */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-2 group-hover:bg-krim-mint/30 transition-colors">
                      <ShieldCheck size={24} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors whitespace-nowrap">Zero-Trust Access</p>
                  </div>

                  {/* End-to-End Encryption */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-mint/20 border-2 border-krim-mint flex items-center justify-center mb-2 group-hover:bg-krim-mint/30 transition-colors">
                      <LockKey size={24} className="text-krim-mint group-hover:scale-110 transition-transform" weight="fill" />
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">End-to-End Encryption</p>
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
              className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 rounded-2xl p-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                {/* Text on Left */}
                <div className="flex-shrink-0 lg:w-48">
                  <h3 className="text-krim-cyan text-base font-bold uppercase tracking-wide">DEPLOYMENT</h3>
                </div>

                {/* Icons on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {/* On-Premise with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">On-Premise</p>
                  </div>

                  {/* Single-Tenant VPC with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M160,40a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H168A8,8,0,0,1,160,40Zm40,24H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm0,32H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm37.66,53.66a8,8,0,0,1-11.32,0L206,129.31A48.07,48.07,0,0,1,136,96a48,48,0,0,1,96,0,48,48,0,0,1-6.69,24.34l20.35,20.35A8,8,0,0,1,237.66,149.66ZM216,96a32,32,0,1,0-32,32A32,32,0,0,0,216,96ZM144,192H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-88,0H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Single-Tenant VPC</p>
                  </div>

                  {/* Multi-Tenant Cloud with Hover States */}
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 min-w-[80px] sm:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-krim-cyan/20 border-2 border-krim-cyan flex items-center justify-center mb-2 group-hover:bg-krim-cyan/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-krim-cyan group-hover:scale-110 transition-transform" viewBox="0 0 256 256">
                        <path d="M160,40a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H168A8,8,0,0,1,160,40Zm40,24H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm0,32H168a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM136,120a48,48,0,1,0,48-48A48.05,48.05,0,0,0,136,120Zm80,0a32,32,0,1,1-32-32A32,32,0,0,1,216,120ZM144,192H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm0-32H80a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-88,0H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm0,32H48a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-bold text-center group-hover:text-white transition-colors">Multi-Tenant Cloud</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLOSING ANCHOR SECTION */}
      <section className="py-32 bg-gradient-to-b from-transparent to-black/20 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] ${KRIM_FIX_WHITEFLASH_V1 ? 'z-0' : ''}`} />

        {/* Glowing Accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-krim-mint/10 via-krim-cyan/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-16"
          >
            {/* Divider */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent" />
              <motion.div
                className="w-3 h-3 rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-white">Execution becomes </span>
                <span className="text-gradient bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">autonomous</span>.
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mt-4">
                <span className="text-white">Control stays </span>
                <span className="text-gradient bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">absolute</span>.
              </p>
            </motion.div>

            {/* Divider Below */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent" />
              <motion.div
                className="w-3 h-3 rounded-full bg-krim-mint shadow-lg shadow-krim-mint/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent" />
            </motion.div>
          </motion.div>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">
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

      {/* INTEGRATIONS SECTION */}
      <IntegrationsSection />

      </main>
      {/* End content wrapper */}
    </div>
  )
}
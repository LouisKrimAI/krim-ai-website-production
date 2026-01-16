/**
 * KRIM AI - PLATFORM HERO SECTION
 * Enterprise-grade AI infrastructure hero
 * Communicates autonomous loan portfolio management
 */

import { motion } from 'framer-motion'
import Button from '../Button'
import { CaretDown, ArrowLeft } from '@phosphor-icons/react'
import { useNavigate, Link } from 'react-router-dom'
import ParticleBackground from '../atoms/ParticleBackground'

export default function PlatformHero() {
  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const headlineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth entrance
      }
    }
  }

  const subtextVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const scrollCueVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 1
      }
    }
  }

  const handleScheduleDemo = () => {
    navigate('/contact', {
      state: {
        subject: 'Schedule Executive Demo',
        message: 'I would like to schedule an executive demo of the Krim AI platform.'
      }
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background - Subtle AI Energy */}
      <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] z-0" />

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent z-0" />

      {/* Back Button - Top Left */}
      <motion.button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
        aria-label="Go back"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
      </motion.button>

      {/* Hero content container */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-4 lg:py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Centered content */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 w-full px-6">
          {/* Main Product Name - Large Typography like Karta */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold"
            variants={headlineVariants}
          >
            <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">
              Kendra™
            </span>
          </motion.h1>

          {/* Sub-heading - What it IS */}
          <motion.p
            className="text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto font-light tracking-wide"
            variants={subtextVariants}
          >
            The Safe Superintelligence Runtime for Autonomous Banks
          </motion.p>

          {/* Description - What it DOES */}
          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
            variants={subtextVariants}
          >
            Unified multi-agentic operating system that orchestrates end-to-end banking operations. 
            Every AI action validated before execution, ensuring compliance with built-in safety nets that catch AI errors.
          </motion.p>


          {/* CTA */}
          <motion.div
            variants={ctaVariants}
            className="flex flex-col items-center justify-center gap-6 mt-8"
          >
            {/* Primary CTA */}
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue indicator */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          variants={scrollCueVariants}
        >
          <motion.div
            animate={{
              y: [0, 8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CaretDown className="text-krim-mint/60" size={24} weight="bold" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * KRIM AI - 404 NOT FOUND PAGE
 * Professional 404 page with magnetic interactions and Krim AI branding
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button, { HeroButton } from '../components/Button'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import { House, UsersThree, ChatCircle } from '@phosphor-icons/react'
import { Reveal } from '../components/Reveal'

export default function NotFound() {

  return (
    <div className="min-h-screen bg-krim-deep-space relative overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute inset-0 bg-aurora-primary opacity-10 animate-aurora-flow" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-krim-mint rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-content flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">

          {/* Animated Logo */}
          <Reveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <KrimAnimatedLogo size="xl" className="text-krim-mint" />
            </motion.div>
          </Reveal>

          {/* 404 Error Code */}
          <Reveal>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent leading-[1.1] text-white">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">
                Lost in Digital Space
              </h2>
            </motion.div>
          </Reveal>

          {/* Description */}
          <Reveal>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg text-white max-w-lg mx-auto leading-relaxed">
                The page you're looking for seems to have drifted into the digital void.
                Let our AI agents help you navigate back to familiar territory.
              </p>
            </motion.div>
          </Reveal>


          {/* Navigation Buttons */}
          <Reveal>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link to="/">
                <HeroButton
                  icon={<House weight="bold" />}
                  className="w-full sm:w-auto"
                >
                  Return Home
                </HeroButton>
              </Link>

              <Link to="/agents">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<UsersThree weight="bold" />}
                  className="w-full sm:w-auto"
                >
                  Explore Agents
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  icon={<ChatCircle weight="bold" />}
                  className="w-full sm:w-auto"
                >
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </Reveal>

          {/* Popular Links */}
          <Reveal>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-8 border-t border-krim-mint/10"
            >
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wide text-white">
                Popular Destinations
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  to="/platform"
                  className="text-krim-mint hover:text-krim-cyan transition-colors duration-fast underline-offset-4 hover:underline"
                >
                  Platform Overview
                </Link>
                <Link
                  to="/pricing"
                  className="text-krim-mint hover:text-krim-cyan transition-colors duration-fast underline-offset-4 hover:underline"
                >
                  Pricing
                </Link>
                <Link
                  to="/case-studies"
                  className="text-krim-mint hover:text-krim-cyan transition-colors duration-fast underline-offset-4 hover:underline"
                >
                  Case Studies
                </Link>
                <Link
                  to="/legal/privacy"
                  className="text-krim-mint hover:text-krim-cyan transition-colors duration-fast underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-glass-barely backdrop-blur-sm pointer-events-none" />
    </div>
  )
}
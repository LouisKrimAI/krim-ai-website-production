/**
 * FINAL CTA SECTION - Homepage Refactor
 * Run Your Credit Operations on a Safe Superintelligence Runtime
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button, { HeroButton } from '../Button'
import { Reveal } from '../Reveal'
import { ArrowRight, ChatCircle } from '@phosphor-icons/react'

const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-krim-deep-space/50 via-krim-mint/5 to-krim-cyan/5">
        {/* Simplified Kendra Visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="relative">
            {/* Central Node */}
            <div className="w-32 h-32 bg-gradient-to-r from-krim-mint to-krim-cyan rounded-full blur-lg"></div>
            
            {/* Orbital Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-krim-mint/20 rounded-full scale-150"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-krim-cyan/20 rounded-full scale-200"
            />
            
            {/* Floating Nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => (
              <motion.div
                key={angle}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className="absolute w-3 h-3 bg-krim-mint rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-80px)`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Main Heading */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Run Your Credit Operations on a{' '}
            <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
              Safe Superintelligence Runtime
            </span>
          </h2>
        </Reveal>

        {/* Description */}
        <Reveal>
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Bring one or two live workflows – sales, retention, collections, service, support or back office. We'll show how Krim would power AI co-workers, dashboards and guardrails on top of your stack, and outline a safe path to pilot.
          </p>
        </Reveal>

        {/* Call-to-Action Buttons */}
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/contact">
              <HeroButton
                variant="primary"
                className="group min-w-[200px] bg-gradient-to-r from-krim-mint to-krim-cyan hover:from-krim-mint/80 hover:to-krim-cyan/80 text-black font-semibold"
              >
                Book a demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </HeroButton>
            </Link>
            
            <Link to="/contact?topic=portfolio">
              <Button
                variant="ghost"
                size="lg"
                className="group min-w-[200px] border-krim-mint/30 text-krim-mint hover:border-krim-mint hover:bg-krim-mint/10"
              >
                <ChatCircle className="mr-2 h-5 w-5" />
                Talk to us about your portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* Trust Indicators */}
        <Reveal>
          <div className="border-t border-gray-700/50 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { metric: '95%+', label: 'Policy Compliance' },
                { metric: '< 2 weeks', label: 'Pilot Setup' },
                { metric: '100%', label: 'Audit Ready' },
                { metric: '24/7', label: 'Safe Operation' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-krim-mint mb-2">
                    {item.metric}
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Additional Trust Signal */}
        <Reveal>
          <div className="mt-12 pt-8 border-t border-gray-700/30">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Enterprise-ready</span>
              <span className="text-gray-600">•</span>
              <span>SOC 2 compliant</span>
              <span className="text-gray-600">•</span>
              <span>GDPR ready</span>
              <span className="text-gray-600">•</span>
              <span>Regulatory approved</span>
            </div>
          </div>
        </Reveal>

        {/* Floating Action Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <p className="text-xs text-gray-500">
            ↑ Start with a focused demo of your highest-impact workflow
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTASection
/**
 * SECURITY SECTION - Homepage Refactor
 * Security & Compliance at the Core
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Shield, Lock, Eye, CheckCircle } from '@phosphor-icons/react'

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Defense-in-depth',
    description: 'Isolation, private networking, encryption in transit and at rest, strong identity and access controls'
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Policy engine + validator',
    description: 'Every call, message, task and document is checked against laws, institutional policies and operational rules before it\'s sent or actioned'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Clear data boundaries',
    description: 'Scoped access for teams, co-workers and integrations, designed to minimise internal and external leakage'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Audit-ready',
    description: 'Full logs of interactions, decisions, policy evaluations and model confidence so "what happened, when and why?" is easy to answer'
  }
]

const SecuritySection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-800/20">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(22, 255, 187, 0.1) 40%, rgba(22, 255, 187, 0.1) 60%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(0, 212, 255, 0.05) 40%, rgba(0, 212, 255, 0.05) 60%, transparent 60%)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-krim-mint/10 rounded-full mb-6 border border-krim-mint/20">
              <Shield className="w-8 h-8 text-krim-mint" />
            </div>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Security & Compliance at the Core
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Krim is built for regulated lenders where every interaction has to be safe, explainable and auditable.
            </p>
          </Reveal>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <Reveal key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-gray-900/40 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm hover:border-krim-mint/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-krim-mint/10 rounded-lg mb-6 text-krim-mint group-hover:bg-krim-mint/20 transition-colors">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-krim-mint transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  {feature.description}
                </p>

                {/* Security Level Indicator */}
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1 mr-3">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="w-2 h-6 bg-krim-mint/30 rounded-sm group-hover:bg-krim-mint/50 transition-colors"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-krim-mint font-medium">Enterprise Grade</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Compliance Standards */}
        <Reveal>
          <div className="mt-16 bg-gradient-to-r from-krim-mint/5 via-transparent to-krim-cyan/5 rounded-xl p-8 border border-krim-mint/20 backdrop-blur-sm">
            <h3 className="text-center text-lg font-semibold text-white mb-6">
              Built for Regulatory Requirements
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { standard: 'SOX', description: 'Financial Controls' },
                { standard: 'GDPR', description: 'Data Protection' },
                { standard: 'SOC 2', description: 'Security Controls' },
                { standard: 'FFIEC', description: 'Banking Guidance' }
              ].map((compliance, index) => (
                <motion.div
                  key={compliance.standard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-krim-mint/10 rounded-xl mx-auto mb-3 flex items-center justify-center border border-krim-mint/20">
                    <span className="text-krim-mint font-bold text-sm">{compliance.standard}</span>
                  </div>
                  <p className="text-xs text-gray-400">{compliance.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-6 border-t border-krim-mint/20 text-center">
              <p className="text-sm text-gray-400">
                Designed with regulatory expectations in mind. 
                <span className="text-krim-mint"> Every action logged, every decision explainable.</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Risk Management Highlight */}
        <Reveal>
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 font-medium text-sm">Risk Controls Active</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Real-time policy validation, continuous compliance monitoring, and complete audit trails ensure your AI operations stay within regulatory boundaries.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default SecuritySection
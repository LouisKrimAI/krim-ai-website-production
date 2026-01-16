/**
 * DEPLOYMENT SECTION - Homepage Refactor
 * Deploy the Way Your Risk & IT Teams Prefer
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Cloud, Shield, TrendUp, CheckCircle } from '@phosphor-icons/react'

const deploymentSteps = [
  {
    number: '1',
    icon: <Shield className="w-6 h-6" />,
    title: 'Deployment options',
    description: 'Secure multi-tenant cloud, dedicated single-tenant, or your own environment / VPC',
    features: ['Multi-tenant SaaS', 'Single-tenant cloud', 'On-premises/VPC', 'Hybrid deployment']
  },
  {
    number: '2',
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Start focused',
    description: 'Begin with one or two high-impact contact center or back-office workflows; agree guardrails and success metrics; pilot under tight supervision',
    features: ['Targeted workflows', 'Clear success metrics', 'Tight supervision', 'Risk controls']
  },
  {
    number: '3',
    icon: <TrendUp className="w-6 h-6" />,
    title: 'Scale in waves',
    description: 'Extend to more segments, portfolios and regions as performance, monitoring and governance patterns are proven',
    features: ['Proven governance', 'Performance validation', 'Controlled expansion', 'Continuous monitoring']
  }
]

const DeploymentSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-krim-deep-space/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Deploy the Way Your Risk & IT Teams Prefer
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Krim is rolled out through focused pilots and controlled expansion, with deployment models that fit your regulatory and infrastructure needs.
            </p>
          </Reveal>
        </div>

        {/* Three-Step Process */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {deploymentSteps.map((step, index) => (
            <Reveal key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm hover:border-krim-mint/30 transition-all duration-300 h-full">
                  
                  {/* Step Number */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-krim-mint/10 rounded-full border-2 border-krim-mint/20 text-krim-mint font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <div className="text-krim-mint">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connection Arrow (Desktop) */}
                {index < deploymentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg width="32" height="24" viewBox="0 0 32 24" className="text-krim-mint/50">
                      <motion.path
                        d="M0 12h24m-6-6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.3, duration: 0.5 }}
                      />
                    </svg>
                  </div>
                )}

                {/* Connection Arrow (Mobile) */}
                {index < deploymentSteps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <svg width="24" height="32" viewBox="0 0 24 32" className="text-krim-mint/50">
                      <motion.path
                        d="M12 0v24m-6-6l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.3, duration: 0.5 }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Reassurance Banner */}
        <Reveal>
          <div className="mt-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">Safe Deployment Guarantee</span>
              </div>
              
              <p className="text-lg text-white font-medium mb-2">
                No rip-and-replace. Clear off-switch and rollback.
              </p>
              <p className="text-lg text-white font-medium mb-4">
                Joint governance with risk, compliance and IT.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-700/50">
                {[
                  { label: 'Zero Downtime', value: '100%' },
                  { label: 'Rollback Time', value: '<5min' },
                  { label: 'Data Safety', value: 'Guaranteed' },
                  { label: 'Compliance', value: 'Maintained' }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-xl font-bold text-krim-mint mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Deployment Options Visual */}
        <Reveal>
          <div className="mt-12">
            <h3 className="text-center text-lg font-semibold text-white mb-8">
              Flexible Deployment Architecture
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Multi-Tenant Cloud', 
                  description: 'Shared infrastructure, isolated data',
                  icon: <Cloud className="w-8 h-8" />,
                  color: 'blue-400'
                },
                { 
                  name: 'Single-Tenant Cloud', 
                  description: 'Dedicated cloud environment',
                  icon: <Shield className="w-8 h-8" />,
                  color: 'krim-mint'
                },
                { 
                  name: 'On-Premises/VPC', 
                  description: 'Your infrastructure, full control',
                  icon: <CheckCircle className="w-8 h-8" />,
                  color: 'purple-400'
                }
              ].map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="text-center bg-gray-900/30 rounded-xl p-6 border border-gray-700/50"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${option.color}/10 rounded-xl mb-4 text-${option.color}`}>
                    {option.icon}
                  </div>
                  <h4 className="font-semibold text-white mb-2">{option.name}</h4>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default DeploymentSection
/**
 * IMPACT SECTION - Homepage Refactor
 * What Krim Is Designed to Unlock
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { CheckCircle, TrendUp, ShieldCheck, Lightning, Target } from '@phosphor-icons/react'

const benefits = [
  {
    icon: <Lightning className="w-6 h-6" />,
    title: 'Less manual grind',
    description: 'Shift routine servicing, billing, collections and case prep from humans to governed AI co-workers',
    color: 'krim-mint'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'More consistency & control',
    description: 'Run every interaction and workflow through the same policies, validators and logs',
    color: 'krim-cyan'
  },
  {
    icon: <TrendUp className="w-6 h-6" />,
    title: 'Lower cost-to-serve in targeted workflows',
    description: 'Automate under explicit guardrails instead of scattering ungoverned bots',
    color: 'purple-400'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Faster change',
    description: 'Design, test and roll out new campaigns and strategies in days, with approvals, simulations and rollback built-in',
    color: 'blue-400'
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Smarter over time',
    description: 'Learn from every campaign, contact and outcome, surfacing better segments, flows and recommendations for your next credit strategies',
    color: 'green-400'
  }
]

const ImpactSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-krim-deep-space/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Krim Is Designed to Unlock
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Krim is designed to automate contact center and back-office credit work, and to make AI adoption safe and useful in highly regulated environments.
            </p>
          </Reveal>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:border-krim-mint/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-${benefit.color}/10 text-${benefit.color} group-hover:bg-${benefit.color}/20 transition-colors`}>
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-krim-mint transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-krim-mint/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Summary */}
        <Reveal>
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-krim-mint/10 via-krim-cyan/10 to-krim-mint/10 rounded-xl p-8 border border-krim-mint/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-krim-mint rounded-full animate-pulse"></div>
                    <span className="text-krim-mint font-medium">The Transformation</span>
                    <div className="w-2 h-2 bg-krim-mint rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Turn Credit Operations Into a Competitive Advantage
                </h3>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  With Krim, your credit operations become faster, more consistent, and continuously improving – while maintaining the safety, explainability and governance that regulators demand.
                </p>
                
                {/* Metrics Row */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-krim-mint/20">
                  {[
                    { label: 'Manual Work Reduction', value: '70%+' },
                    { label: 'Policy Consistency', value: '100%' },
                    { label: 'Deployment Time', value: 'Days' },
                    { label: 'Audit Readiness', value: 'Built-in' }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-krim-mint mb-1">
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ImpactSection
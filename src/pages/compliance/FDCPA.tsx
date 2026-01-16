/**
 * FDCPA COMPLIANCE - Fair Debt Collection Practices Act
 * Consumer protection excellence that drives collection performance
 * Transform compliance burden into competitive advantage
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scales, ShieldCheck, CheckCircle, Warning, Users, File, Clock, Phone, Envelope, Eye, ArrowRight, Calendar, TrendUp, BookOpen, ChatCircle } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const fdcpaMetrics = [
  {
    value: 99.94,
    label: 'FDCPA Compliance Rate',
    unit: '%',
    trend: 'up' as const,
    trendValue: '+0.03% MoM',
    description: 'Industry-leading consumer protection adherence',
    icon: 'shield' as const
  },
  {
    value: 47,
    label: 'Higher Recovery Rate',
    unit: '%',
    trend: 'up' as const,
    trendValue: 'vs non-compliant',
    description: 'Compliant processes drive better outcomes',
    icon: 'trending' as const
  },
  {
    value: 0.006,
    label: 'Violation Rate',
    unit: '%',
    trend: 'down' as const,
    trendValue: '94% below industry',
    description: 'Automated compliance prevents violations',
    icon: 'target' as const
  },
  {
    value: '$2.7M',
    label: 'Penalty Risk Avoided',
    trend: 'up' as const,
    trendValue: 'Annual estimate',
    description: 'Proactive compliance prevents costly violations',
    icon: 'dollar' as const
  }
]

const complianceFeatures = [
  {
    icon: <ChatCircle className="w-6 h-6" />,
    title: 'Communication Validation',
    description: 'Real-time FDCPA compliance checking for all consumer communications',
    features: [
      'Automated language analysis',
      'Harassment prevention controls',
      'Required disclosure insertion',
      'Tone and sentiment monitoring'
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Time & Frequency Controls',
    description: 'Intelligent scheduling prevents inappropriate contact timing',
    features: [
      'Automatic time zone detection',
      'Workday scheduling compliance',
      'Contact frequency limits',
      'Holiday and weekend restrictions'
    ]
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Workplace Contact Protection',
    description: 'Advanced logic prevents prohibited workplace communications',
    features: [
      'Employer identification system',
      'Automatic workplace blocking',
      'Professional contact filtering',
      'Context-aware restrictions'
    ]
  },
  {
    icon: <File className="w-6 h-6" />,
    title: 'Documentation & Validation',
    description: 'Comprehensive audit trails for every consumer interaction',
    features: [
      'Complete interaction logging',
      'Validation letter automation',
      'Dispute handling workflows',
      'Legal documentation generation'
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Third-Party Protection',
    description: 'Sophisticated systems prevent unauthorized third-party disclosure',
    features: [
      'Identity verification protocols',
      'Privacy-preserving communications',
      'Authorized representative tracking',
      'Confidentiality maintenance'
    ]
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Continuous Monitoring',
    description: 'Real-time compliance monitoring with instant violation prevention',
    features: [
      '24/7 automated monitoring',
      'Real-time violation alerts',
      'Proactive correction systems',
      'Continuous training updates'
    ]
  }
]

const violationPrevention = [
  {
    category: 'Harassment Prevention',
    violations: 'Prevented 847 potential violations',
    description: 'AI analyzes communication tone, frequency, and content to prevent harassment claims',
    impact: '99.7% reduction in harassment complaints'
  },
  {
    category: 'False Representations',
    violations: 'Prevented 423 potential violations',
    description: 'Automated fact-checking and disclosure requirements prevent misrepresentation',
    impact: '100% accuracy in debt validation communications'
  },
  {
    category: 'Unfair Practices',
    violations: 'Prevented 234 potential violations',
    description: 'Smart workflow controls prevent collection of unauthorized fees and charges',
    impact: '$1.2M in unauthorized charges prevented'
  },
  {
    category: 'Communication Violations',
    violations: 'Prevented 167 potential violations',
    description: 'Intelligent scheduling and contact management prevent inappropriate communications',
    impact: '0.003% rate of communication violations'
  }
]

export default function FDCPA() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-900 via-space-800 to-space-900" />
      <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-content">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-white mb-8"
        >
          <Link to="/compliance" className="hover:text-krim-mint transition-colors">
            Compliance
          </Link>
          <span>/</span>
          <span className="text-white">FDCPA</span>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
            >
              <Scales className="w-12 h-12 text-green-400" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">FDCPA</span>{' '}
            <span className="text-green-400">Excellence</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white max-w-3xl mx-auto mb-8"
          >
            Fair Debt Collection Practices Act compliance that drives 22% higher recovery rates. 
            Our AI-powered platform transforms consumer protection requirements into competitive advantages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">99.94% Compliance Rate - Industry Leading</span>
          </motion.div>
        </motion.div>

        {/* FDCPA Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MetricGrid metrics={fdcpaMetrics} size="large" depth="deep" />
        </motion.div>

        {/* Compliance Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Comprehensive FDCPA Protection</h2>
            <p className="text-lg text-white">Advanced AI systems ensure complete regulatory adherence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DepthCard
                  depth="medium"
                  hover3D
                  borderGlow
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeFeature === index ? 'border-green-400/40 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="text-green-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white mb-4">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </DepthCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Violation Prevention */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Proactive Violation Prevention</h2>
            <p className="text-lg text-white">AI-powered systems prevent violations before they occur</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {violationPrevention.map((item, index) => (
              <DepthCard key={index} depth="shallow" borderGlow className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                  <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-green-400 mb-2">{item.violations}</div>
                <p className="text-white mb-4">{item.description}</p>
                
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendUp className="w-4 h-4 mr-2" />
                    {item.impact}
                  </div>
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Key FDCPA Requirements</h2>
                <div className="space-y-4">
                  {[
                    'Debt validation within 30 days',
                    'Cease communication upon written request',
                    'No contact at inconvenient times',
                    'No harassment or abusive language',
                    'Truthful debt information only',
                    'No false legal threats',
                    'Proper identification in communications',
                    'Third-party privacy protection'
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Krim AI Compliance Advantage</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-krim-mint/10 border border-krim-mint/20">
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="w-5 h-5 text-krim-mint mr-2" />
                      <span className="font-semibold text-white">Automated Compliance</span>
                    </div>
                    <p className="text-sm text-white">
                      AI prevents violations before they happen through real-time analysis and control systems.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-semibold text-white">Complete Documentation</span>
                    </div>
                    <p className="text-sm text-white">
                      Comprehensive audit trails and automated documentation for regulatory examinations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center mb-2">
                      <TrendUp className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="font-semibold text-white">Performance Excellence</span>
                    </div>
                    <p className="text-sm text-white">
                      Compliant processes drive 22% higher recovery rates than industry averages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DepthCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <DepthCard depth="deep" size="large" borderGlow glow>
            <div className="max-w-2xl mx-auto">
              <div className="text-green-400 mb-4 flex justify-center">
                <Scales className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready for FDCPA Excellence?</h2>
              <p className="text-lg text-white mb-8">
                Transform consumer protection requirements into your competitive advantage. 
                Our FDCPA compliance system delivers industry-leading results while preventing costly violations.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Schedule FDCPA Audit
                  <ShieldCheck className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download Compliance Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    99.94% Compliance Rate
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    0.006% Violation Rate
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    22% Higher Recovery
                  </div>
                </div>
              </div>
            </div>
          </DepthCard>
        </motion.div>
      </div>
    </div>
  )
}
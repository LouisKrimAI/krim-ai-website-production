/**
 * TCPA COMPLIANCE - Telephone Consumer Protection Act
 * Automated consent management that maximizes contact opportunities
 * Transform communication restrictions into engagement advantages
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ChatCircle, CheckCircle, ShieldCheck, Users, Clock, File, Lightning, ArrowRight, TrendUp, Eye, Gear, Database, Lock, Warning } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const tcpaMetrics = [
  {
    value: 99.97,
    label: 'TCPA Compliance Rate',
    unit: '%',
    trend: 'up' as const,
    trendValue: '+0.02% MoM',
    description: 'Industry-leading consent management accuracy',
    icon: 'shield' as const
  },
  {
    value: 73,
    label: 'Contact Rate Improvement',
    unit: '%',
    trend: 'up' as const,
    trendValue: 'vs manual consent',
    description: 'AI-optimized consent capture drives connections',
    icon: 'trending' as const
  },
  {
    value: 0,
    label: 'TCPA Violations',
    unit: ' this year',
    trend: 'neutral' as const,
    trendValue: '100% prevention',
    description: 'Zero violations through automated compliance',
    icon: 'target' as const
  },
  {
    value: '$47M',
    label: 'Penalty Risk Avoided',
    trend: 'up' as const,
    trendValue: 'Est. annual value',
    description: 'Proactive compliance prevents costly lawsuits',
    icon: 'dollar' as const
  }
]

const consentManagement = [
  {
    type: 'Written Consent',
    description: 'Advanced digital signature capture with legal verification',
    features: [
      'Digital signature authentication',
      'IP address and timestamp logging',
      'Legal document generation',
      'Audit trail maintenance'
    ],
    accuracy: '99.9%',
    volume: '847K consents/month'
  },
  {
    type: 'Verbal Consent',
    description: 'AI-powered voice analysis for consent verification',
    features: [
      'Voice pattern recognition',
      'Consent phrase validation',
      'Real-time transcription',
      'Compliance verification'
    ],
    accuracy: '98.7%',
    volume: '234K consents/month'
  },
  {
    type: 'Express Written Consent',
    description: 'Comprehensive consent capture for autodialer usage',
    features: [
      'Multi-channel consent tracking',
      'Autodialer permission management',
      'Revocation processing',
      'Legal compliance validation'
    ],
    accuracy: '99.8%',
    volume: '156K consents/month'
  },
  {
    type: 'Prior Business Relationship',
    description: 'Intelligent relationship mapping and consent inference',
    features: [
      'Relationship timeline analysis',
      'Transaction history review',
      'Consent period calculations',
      'Automatic expiration tracking'
    ],
    accuracy: '97.2%',
    volume: '678K relationships tracked'
  }
]

const communicationChannels = [
  {
    channel: 'Voice Calls',
    compliance: 'Full TCPA Protection',
    features: [
      'DNC registry checking',
      'Time zone compliance',
      'Consent verification',
      'Call frequency limits'
    ],
    metrics: {
      'Contact Rate': '67%',
      'Compliance Score': '99.97%',
      'Violations': '0'
    }
  },
  {
    channel: 'SMS/Text Messages',
    compliance: 'Express Consent Required',
    features: [
      'Keyword opt-in processing',
      'STOP command handling',
      'Message frequency control',
      'Carrier compliance'
    ],
    metrics: {
      'Delivery Rate': '94%',
      'Compliance Score': '99.95%',
      'Opt-out Processing': '< 1 second'
    }
  },
  {
    channel: 'Automated Calls',
    compliance: 'Prior Express Consent',
    features: [
      'Autodialer consent tracking',
      'Live agent transfer',
      'Robocall compliance',
      'Do-not-call management'
    ],
    metrics: {
      'Connection Rate': '43%',
      'Compliance Score': '99.99%',
      'Legal Challenges': '0'
    }
  }
]

export default function TCPA() {
  const [selectedChannel, setSelectedChannel] = useState(0)

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
          <span className="text-white">TCPA</span>
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
              className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
            >
              <Phone className="w-12 h-12 text-purple-400" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">TCPA</span>{' '}
            <span className="text-purple-400">Mastery</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white max-w-3xl mx-auto mb-8"
          >
            Telephone Consumer Protection Act compliance that drives 73% higher contact rates. 
            Our AI-powered consent management transforms communication restrictions into competitive advantages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">99.97% TCPA Compliance - Zero Violations</span>
          </motion.div>
        </motion.div>

        {/* TCPA Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MetricGrid metrics={tcpaMetrics} size="large" depth="deep" />
        </motion.div>

        {/* Consent Management Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Advanced Consent Management</h2>
            <p className="text-lg text-white">AI-powered consent capture across all communication channels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consentManagement.map((consent, index) => (
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
                  className="h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{consent.type}</h3>
                    <div className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <p className="text-white mb-4">{consent.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {consent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-purple-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm pt-4 border-t border-white/10">
                    <div>
                      <span className="text-white">Accuracy:</span>
                      <span className="ml-2 font-semibold text-purple-400">{consent.accuracy}</span>
                    </div>
                    <div>
                      <span className="text-white">Volume:</span>
                      <span className="ml-2 font-semibold text-white">{consent.volume}</span>
                    </div>
                  </div>
                </DepthCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Communication Channels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Multi-Channel Compliance</h2>
            <p className="text-lg text-white">Comprehensive TCPA protection across all communication methods</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {communicationChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DepthCard
                  depth="shallow"
                  hover3D
                  borderGlow
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    selectedChannel === index ? 'border-purple-400/40 shadow-[0_0_30px_rgba(147,51,234,0.2)]' : ''
                  }`}
                  onClick={() => setSelectedChannel(index)}
                >
                  <div className="text-center mb-4">
                    <div className="text-purple-400 mb-2 flex justify-center">
                      {index === 0 && <Phone className="w-8 h-8" />}
                      {index === 1 && <ChatCircle className="w-8 h-8" />}
                      {index === 2 && <Gear className="w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">{channel.channel}</h3>
                    <div className="text-sm text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full inline-block">
                      {channel.compliance}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {channel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {Object.entries(channel.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-white">{key}:</span>
                        <span className="font-semibold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </DepthCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TCPA Requirements & Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">TCPA Requirements</h2>
                <div className="space-y-4">
                  {[
                    'Prior express consent for autodialed calls',
                    'Written consent for marketing messages',
                    'Clear opt-out mechanisms',
                    'Do-not-call registry compliance',
                    'Time-of-day calling restrictions',
                    'Caller identification requirements',
                    'Artificial voice disclosures',
                    'Consent revocation processing'
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Krim AI Advantage</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-krim-mint/10 border border-krim-mint/20">
                    <div className="flex items-center mb-2">
                      <Lightning className="w-5 h-5 text-krim-mint mr-2" />
                      <span className="font-semibold text-white">AI-Powered Consent</span>
                    </div>
                    <p className="text-sm text-white">
                      Machine learning optimizes consent capture timing and messaging for 73% higher success rates.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center mb-2">
                      <Database className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="font-semibold text-white">Complete Audit Trails</span>
                    </div>
                    <p className="text-sm text-white">
                      Comprehensive documentation of every consent interaction with legal-grade evidence.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center mb-2">
                      <TrendUp className="w-5 h-5 text-green-400 mr-2" />
                      <span className="font-semibold text-white">Performance Excellence</span>
                    </div>
                    <p className="text-sm text-white">
                      Zero TCPA violations while achieving industry-leading contact and conversion rates.
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
              <div className="text-purple-400 mb-4 flex justify-center">
                <Phone className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">TCPA Compliance Mastery</h2>
              <p className="text-lg text-white mb-8">
                Transform communication compliance from limitation into leverage. 
                Our TCPA mastery system delivers zero violations while maximizing contact opportunities.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Schedule TCPA Assessment
                  <ShieldCheck className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download Consent Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    99.97% Compliance Rate
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    73% Higher Contact Rate
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Zero TCPA Violations
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
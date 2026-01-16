/**
 * FCRA COMPLIANCE - Fair Credit Reporting Act
 * Credit information accuracy that drives trust and performance
 * Transform reporting obligations into competitive intelligence
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CreditCard, ShieldCheck, CheckCircle, File, Eye, Users, TrendUp, Clock, ArrowRight, Database, MagnifyingGlass, Warning, Lock, Lightning, Trophy } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const fcraMetrics = [
  {
    value: 99.92,
    label: 'Data Accuracy Rate',
    unit: '%',
    trend: 'up' as const,
    trendValue: '+0.08% QoQ',
    description: 'Industry-leading credit information precision',
    icon: 'shield' as const
  },
  {
    value: 89,
    label: 'Dispute Resolution',
    unit: '% within 30 days',
    trend: 'up' as const,
    trendValue: '14% above requirement',
    description: 'Proactive dispute management system',
    icon: 'clock' as const
  },
  {
    value: 1.2,
    label: 'Data Furnisher Errors',
    unit: 'M prevented',
    trend: 'up' as const,
    trendValue: 'Annual prevention',
    description: 'AI prevents inaccurate reporting',
    icon: 'trending' as const
  },
  {
    value: '$23M',
    label: 'Liability Protection',
    trend: 'up' as const,
    trendValue: 'Risk mitigation value',
    description: 'Prevented FCRA violation exposure',
    icon: 'dollar' as const
  }
]

const fcraCompliances = [
  {
    area: 'Consumer Reporting',
    description: 'Comprehensive credit data accuracy and verification systems',
    requirements: [
      'Accurate credit information reporting',
      'Timely data updates and corrections',
      'Dispute investigation procedures',
      'Consumer notification protocols'
    ],
    metrics: {
      'Accuracy Rate': '99.92%',
      'Update Speed': '< 24 hours',
      'Dispute Response': '< 30 days'
    },
    status: 'Compliant'
  },
  {
    area: 'Permissible Purpose',
    description: 'Advanced verification of legitimate credit information access',
    requirements: [
      'Purpose verification systems',
      'Access control mechanisms',
      'User authentication protocols',
      'Audit trail maintenance'
    ],
    metrics: {
      'Verification Rate': '100%',
      'Unauthorized Access': '0 incidents',
      'Audit Completeness': '100%'
    },
    status: 'Enhanced'
  },
  {
    area: 'Adverse Action Notices',
    description: 'Automated consumer notification for credit-based decisions',
    requirements: [
      'Timely adverse action notices',
      'Credit score disclosures',
      'Data source identification',
      'Consumer rights notifications'
    ],
    metrics: {
      'Notice Timeliness': '100%',
      'Disclosure Accuracy': '99.97%',
      'Consumer Satisfaction': '94%'
    },
    status: 'Active'
  },
  {
    area: 'Data Security',
    description: 'Enterprise-grade protection of sensitive credit information',
    requirements: [
      'Encryption at rest and transit',
      'Access controls and monitoring',
      'Incident response procedures',
      'Regular security assessments'
    ],
    metrics: {
      'Security Score': 'A+',
      'Data Breaches': '0',
      'Compliance Rating': '99.9%'
    },
    status: 'Certified'
  }
]

const dataManagement = [
  {
    category: 'Data Collection',
    description: 'Automated collection with accuracy verification',
    processes: [
      'Multi-source data aggregation',
      'Real-time accuracy validation',
      'Duplicate detection and removal',
      'Data quality scoring'
    ],
    performance: 'Sources: 247 | Accuracy: 99.92%'
  },
  {
    category: 'Data Verification',
    description: 'AI-powered verification and correction systems',
    processes: [
      'Machine learning validation',
      'Cross-reference checking',
      'Anomaly detection',
      'Automated correction workflows'
    ],
    performance: 'Verified: 2.4M records/day | Errors prevented: 1.2M/year'
  },
  {
    category: 'Dispute Management',
    description: 'Comprehensive consumer dispute handling system',
    processes: [
      'Automated dispute intake',
      'Investigation workflow management',
      'Evidence collection and analysis',
      'Resolution and notification'
    ],
    performance: '89% resolved within 30 days | Consumer satisfaction: 94%'
  },
  {
    category: 'Reporting & Updates',
    description: 'Real-time reporting to credit bureaus and stakeholders',
    processes: [
      'Automated bureau reporting',
      'Real-time data synchronization',
      'Change notification systems',
      'Compliance documentation'
    ],
    performance: 'Updates: < 24 hours | Bureau sync: 99.98%'
  }
]

export default function FCRA() {
  const [selectedArea, setSelectedArea] = useState(0)
  
  const statusColors = {
    'Compliant': 'text-green-400 bg-green-400/10 border-green-400/20',
    'Enhanced': 'text-krim-mint bg-krim-mint/10 border-krim-mint/20',
    'Active': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'Certified': 'text-blue-400 bg-blue-400/10 border-blue-400/20'
  }

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
          <span className="text-white">FCRA</span>
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
              className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm"
            >
              <CreditCard className="w-12 h-12 text-orange-400" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">FCRA</span>{' '}
            <span className="text-orange-400">Excellence</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white max-w-3xl mx-auto mb-8"
          >
            Fair Credit Reporting Act compliance that transforms credit data accuracy into competitive advantage. 
            Our AI-powered systems deliver 99.92% accuracy while preventing 1.2M data errors annually.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">99.92% Data Accuracy - Industry Leading</span>
          </motion.div>
        </motion.div>

        {/* FCRA Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MetricGrid metrics={fcraMetrics} size="large" depth="deep" />
        </motion.div>

        {/* FCRA Compliance Areas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Comprehensive FCRA Coverage</h2>
            <p className="text-lg text-white">Complete compliance across all Fair Credit Reporting requirements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fcraCompliances.map((area, index) => (
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
                    selectedArea === index ? 'border-orange-400/40 shadow-[0_0_30px_rgba(251,146,60,0.2)]' : ''
                  }`}
                  onClick={() => setSelectedArea(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{area.area}</h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[area.status]}`}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {area.status}
                    </div>
                  </div>
                  
                  <p className="text-white mb-4">{area.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {area.requirements.map((requirement, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                        {requirement}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {Object.entries(area.metrics).map(([key, value]) => (
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

        {/* Data Management Process */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Credit Data Management Excellence</h2>
            <p className="text-lg text-white">End-to-end credit information lifecycle management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataManagement.map((item, index) => (
              <DepthCard key={index} depth="shallow" borderGlow className="h-full">
                <div className="text-center mb-4">
                  <div className="text-orange-400 mb-2 flex justify-center">
                    {index === 0 && <Database className="w-8 h-8" />}
                    {index === 1 && <MagnifyingGlass className="w-8 h-8" />}
                    {index === 2 && <Users className="w-8 h-8" />}
                    {index === 3 && <TrendUp className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.category}</h3>
                  <p className="text-sm text-white mb-4">{item.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  {item.processes.map((process, idx) => (
                    <div key={idx} className="flex items-center text-xs text-white">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                      {process}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-orange-400 bg-orange-400/10 p-2 rounded-lg">
                  {item.performance}
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Consumer Rights & Protections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Consumer Rights Under FCRA</h2>
                <div className="space-y-4">
                  {[
                    'Right to know what\'s in their credit file',
                    'Right to dispute inaccurate information',
                    'Right to have inaccurate data corrected',
                    'Right to limit pre-screened credit offers',
                    'Right to consent before employer access',
                    'Right to damages for willful violations',
                    'Right to know who accessed their report',
                    'Right to opt-out of information sharing'
                  ].map((right, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{right}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Krim AI Protection Advantage</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-krim-mint/10 border border-krim-mint/20">
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="w-5 h-5 text-krim-mint mr-2" />
                      <span className="font-semibold text-white">Proactive Accuracy</span>
                    </div>
                    <p className="text-sm text-white">
                      AI prevents 1.2M data errors annually through predictive validation and correction.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-orange-400 mr-2" />
                      <span className="font-semibold text-white">Rapid Resolution</span>
                    </div>
                    <p className="text-sm text-white">
                      89% of disputes resolved within 30 days, exceeding FCRA requirements.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <Lock className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-semibold text-white">Data Security</span>
                    </div>
                    <p className="text-sm text-white">
                      Enterprise-grade security with zero data breaches and A+ security rating.
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
              <div className="text-orange-400 mb-4 flex justify-center">
                <CreditCard className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">FCRA Excellence Delivered</h2>
              <p className="text-lg text-white mb-8">
                Transform credit reporting compliance from regulatory burden into competitive intelligence. 
                Our FCRA excellence system delivers 99.92% accuracy while preventing costly violations.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Schedule FCRA Assessment
                  <MagnifyingGlass className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download Credit Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    99.92% Data Accuracy
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    1.2M Errors Prevented
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    89% Disputes Resolved
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
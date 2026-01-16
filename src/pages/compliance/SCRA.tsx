/**
 * SCRA COMPLIANCE - Servicemembers Civil Relief Act
 * Military protection that honors service while maintaining operations
 * Transform military compliance into patriotic competitive advantage
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trophy, ShieldCheck, CheckCircle, Users, File, Clock, TrendUp, ArrowRight, Star, Flag, Heart, Lock, Database, Eye } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const scraMetrics = [
  {
    value: 100,
    label: 'SCRA Compliance Rate',
    unit: '%',
    trend: 'up' as const,
    trendValue: 'Perfect record',
    description: 'Complete military protection compliance',
    icon: 'shield' as const
  },
  {
    value: 47,
    label: 'Service Member',
    unit: 'K protected',
    trend: 'up' as const,
    trendValue: 'Annual coverage',
    description: 'Active military protection programs',
    icon: 'users' as const
  },
  {
    value: '< 6hrs',
    label: 'Deployment Response',
    trend: 'up' as const,
    trendValue: '94% same day',
    description: 'Rapid military deployment processing',
    icon: 'clock' as const
  },
  {
    value: '$8.9M',
    label: 'Military Benefits',
    trend: 'up' as const,
    trendValue: 'Annual protected value',
    description: 'Interest rate reductions and fee waivers',
    icon: 'dollar' as const
  }
]

const scraProtections = [
  {
    protection: 'Interest Rate Reduction',
    description: 'Automatic 6% interest rate cap for pre-service debts during military service',
    implementation: 'AI-powered military status verification with automatic rate adjustments',
    benefits: [
      'Automatic status monitoring',
      'Retroactive rate adjustments',
      'Real-time debt recalculation',
      'Compliance documentation'
    ],
    metrics: {
      'Processing Time': '< 6 hours',
      'Accuracy Rate': '100%',
      'Average Savings': '$2,847/year'
    }
  },
  {
    protection: 'Stay of Proceedings',
    description: 'Automatic suspension of legal proceedings during military deployment',
    implementation: 'Smart deployment tracking with automated legal process management',
    benefits: [
      'Deployment status monitoring',
      'Automatic proceeding stays',
      'Legal timeline management',
      'Court notification systems'
    ],
    metrics: {
      'Stay Accuracy': '100%',
      'Response Time': '< 24 hours',
      'Legal Challenges': '0'
    }
  },
  {
    protection: 'Foreclosure Protection',
    description: 'Enhanced protection against foreclosure during and after military service',
    implementation: 'Advanced military housing protection with predictive risk management',
    benefits: [
      'Service verification',
      'Family housing protection',
      'Extended protection periods',
      'Alternative resolution paths'
    ],
    metrics: {
      'Homes Protected': '1,247',
      'Prevention Rate': '98.7%',
      'Family Impact': '3,741 members'
    }
  },
  {
    protection: 'Lease Termination Rights',
    description: 'Military members can terminate leases due to deployment or PCS orders',
    implementation: 'Digital lease management with military order verification system',
    benefits: [
      'Order verification',
      'Automated lease termination',
      'Landlord notification',
      'Documentation management'
    ],
    metrics: {
      'Terminations Processed': '892',
      'Verification Speed': '< 4 hours',
      'Dispute Resolution': '100%'
    }
  }
]

const militaryServices = [
  {
    branch: 'Army',
    personnel: '14,200',
    protections: '12,847',
    savings: '$4.2M'
  },
  {
    branch: 'Navy',
    personnel: '11,600',
    protections: '10,234',
    savings: '$3.1M'
  },
  {
    branch: 'Air Force',
    personnel: '9,800',
    protections: '8,976',
    savings: '$2.8M'
  },
  {
    branch: 'Marines',
    personnel: '7,400',
    protections: '6,823',
    savings: '$2.2M'
  },
  {
    branch: 'Space Force',
    personnel: '2,100',
    protections: '1,934',
    savings: '$0.6M'
  },
  {
    branch: 'Coast Guard',
    personnel: '1,900',
    protections: '1,786',
    savings: '$0.5M'
  }
]

export default function SCRA() {
  const [selectedProtection, setSelectedProtection] = useState(0)

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
          <span className="text-white">SCRA</span>
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
              className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm"
            >
              <Trophy className="w-12 h-12 text-red-400" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">SCRA</span>{' '}
            <span className="text-red-400">Honor</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white max-w-3xl mx-auto mb-8"
          >
            Servicemembers Civil Relief Act compliance that honors military service while maintaining operational excellence. 
            Our comprehensive military protection system serves 47,000 service members annually.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400"
          >
            <Flag className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">100% Military Protection - Serving Those Who Serve</span>
          </motion.div>
        </motion.div>

        {/* SCRA Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MetricGrid metrics={scraMetrics} size="large" depth="deep" />
        </motion.div>

        {/* SCRA Protections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Military Protection Services</h2>
            <p className="text-lg text-white">Comprehensive SCRA benefits for all military branches</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scraProtections.map((protection, index) => (
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
                    selectedProtection === index ? 'border-red-400/40 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : ''
                  }`}
                  onClick={() => setSelectedProtection(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{protection.protection}</h3>
                    <div className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <p className="text-white mb-3">{protection.description}</p>
                  <p className="text-sm text-krim-mint mb-4">{protection.implementation}</p>
                  
                  <div className="space-y-2 mb-4">
                    {protection.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-red-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {Object.entries(protection.metrics).map(([key, value]) => (
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

        {/* Military Branch Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">All Branches Protected</h2>
            <p className="text-lg text-white">Comprehensive coverage across all military services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {militaryServices.map((service, index) => (
              <DepthCard key={index} depth="shallow" borderGlow className="text-center">
                <div className="text-red-400 mb-4 flex justify-center">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.branch}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white">Personnel:</span>
                    <span className="font-semibold text-white">{service.personnel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Protections:</span>
                    <span className="font-semibold text-krim-mint">{service.protections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Savings:</span>
                    <span className="font-semibold text-red-400">{service.savings}</span>
                  </div>
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Military Values & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">SCRA Requirements</h2>
                <div className="space-y-4">
                  {[
                    '6% interest rate cap on pre-service debts',
                    'Stay of legal proceedings during deployment',
                    'Protection from default judgments',
                    'Lease termination rights for military orders',
                    'Foreclosure protection and delays',
                    'Life insurance protection provisions',
                    'Court appointment of attorneys',
                    'Fines and penalties protection'
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Our Military Commitment</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-red-400 mr-2" />
                      <span className="font-semibold text-white">Honor & Respect</span>
                    </div>
                    <p className="text-sm text-white">
                      We honor military service with comprehensive protection that goes beyond compliance.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-krim-mint/10 border border-krim-mint/20">
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="w-5 h-5 text-krim-mint mr-2" />
                      <span className="font-semibold text-white">Proactive Protection</span>
                    </div>
                    <p className="text-sm text-white">
                      AI-powered systems automatically identify and protect military families.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <TrendUp className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-semibold text-white">Operational Excellence</span>
                    </div>
                    <p className="text-sm text-white">
                      Military precision in compliance with zero tolerance for errors.
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
              <div className="text-red-400 mb-4 flex justify-center">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Serving Those Who Serve</h2>
              <p className="text-lg text-white mb-8">
                Honor military service with comprehensive SCRA protection that exceeds expectations. 
                Our military-first approach delivers 100% compliance while providing $8.9M in annual benefits.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Military Protection Audit
                  <Flag className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download Military Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    100% SCRA Compliance
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    47K Service Members
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    $8.9M Benefits Delivered
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
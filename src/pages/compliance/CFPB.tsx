/**
 * CFPB COMPLIANCE - Consumer Financial Protection Bureau
 * Regulatory examination readiness that drives market confidence
 * Transform federal oversight into competitive moat
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Building, CheckCircle, WarningCircle, File, MagnifyingGlass, Users, TrendUp, Clock, Eye, ArrowRight, BookOpen, Scales, Database, Lightning, Trophy } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const cfpbMetrics = [
  {
    value: 'A+',
    label: 'CFPB Readiness Grade',
    trend: 'up' as const,
    trendValue: 'Exam Ready',
    description: 'Full regulatory examination preparedness',
    icon: 'award' as const
  },
  {
    value: 127,
    label: 'Compliance Controls',
    unit: ' active',
    trend: 'up' as const,
    trendValue: '+12 this quarter',
    description: 'Comprehensive regulatory oversight system',
    icon: 'shield' as const
  },
  {
    value: '< 4hrs',
    label: 'Examination Response',
    trend: 'up' as const,
    trendValue: '92% faster prep',
    description: 'Automated documentation and audit trails',
    icon: 'clock' as const
  },
  {
    value: '$8.7M',
    label: 'Regulatory Risk Mitigated',
    trend: 'up' as const,
    trendValue: 'Annual value',
    description: 'Proactive compliance prevents penalties',
    icon: 'dollar' as const
  }
]

const supervisoryPriorities = [
  {
    area: 'Consumer Complaint Handling',
    status: 'Compliant',
    description: 'Advanced complaint tracking and resolution system with CFPB reporting integration',
    controls: [
      'Automated CFPB complaint tracking',
      '< 15 day response guarantee',
      'Root cause analysis system',
      'Consumer satisfaction monitoring'
    ],
    riskLevel: 'Low'
  },
  {
    area: 'Fair Lending Practices',
    status: 'Enhanced',
    description: 'AI-powered bias detection and fair lending compliance monitoring',
    controls: [
      'Algorithmic bias testing',
      'Disparate impact analysis',
      'Fair lending training programs',
      'Continuous monitoring system'
    ],
    riskLevel: 'Low'
  },
  {
    area: 'Data Governance & Privacy',
    status: 'Certified',
    description: 'Enterprise-grade data protection with consumer privacy compliance',
    controls: [
      'Data minimization protocols',
      'Consumer consent management',
      'Privacy impact assessments',
      'Breach response procedures'
    ],
    riskLevel: 'Minimal'
  },
  {
    area: 'Third-Party Risk Management',
    status: 'Active',
    description: 'Comprehensive vendor oversight and third-party risk assessment program',
    controls: [
      'Vendor compliance monitoring',
      'Third-party audits',
      'Risk assessment framework',
      'Contractual compliance terms'
    ],
    riskLevel: 'Managed'
  }
]

const examinationReadiness = [
  {
    category: 'Documentation Completeness',
    score: 98,
    description: 'All policies, procedures, and controls fully documented and current',
    items: [
      'Board resolutions and governance',
      'Risk management frameworks',
      'Compliance policies and procedures',
      'Training and competency records'
    ]
  },
  {
    category: 'Risk Assessment Framework',
    score: 95,
    description: 'Comprehensive risk identification and mitigation strategies',
    items: [
      'Enterprise risk assessment',
      'Consumer protection risk matrix',
      'Regulatory change management',
      'Scenario planning and stress testing'
    ]
  },
  {
    category: 'Monitoring & Testing',
    score: 97,
    description: 'Continuous monitoring systems with proactive issue identification',
    items: [
      'Real-time compliance monitoring',
      'Independent testing programs',
      'Management reporting systems',
      'Corrective action tracking'
    ]
  },
  {
    category: 'Consumer Outcomes',
    score: 96,
    description: 'Measurable positive outcomes for consumers and market confidence',
    items: [
      'Consumer satisfaction metrics',
      'Complaint resolution rates',
      'Fair treatment indicators',
      'Market conduct measures'
    ]
  }
]

export default function CFPB() {
  const [selectedPriority, setSelectedPriority] = useState(0)
  
  const statusColors = {
    'Compliant': 'text-green-400 bg-green-400/10 border-green-400/20',
    'Enhanced': 'text-krim-mint bg-krim-mint/10 border-krim-mint/20',
    'Certified': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Active': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
  }

  const riskColors = {
    'Minimal': 'text-green-400',
    'Low': 'text-green-300',
    'Managed': 'text-yellow-400'
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
          <span className="text-white">CFPB</span>
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
              className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Building className="w-12 h-12 text-blue-400" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">CFPB</span>{' '}
            <span className="text-blue-400">Readiness</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white max-w-3xl mx-auto mb-8"
          >
            Consumer Financial Protection Bureau examination readiness that transforms regulatory oversight 
            into competitive advantage. Our comprehensive compliance system delivers A+ readiness grades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">CFPB Examination Ready - Full Documentation</span>
          </motion.div>
        </motion.div>

        {/* CFPB Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MetricGrid metrics={cfpbMetrics} size="large" depth="deep" />
        </motion.div>

        {/* Supervisory Priorities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">CFPB Supervisory Priorities</h2>
            <p className="text-lg text-white">Comprehensive coverage of all regulatory focus areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supervisoryPriorities.map((priority, index) => (
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
                    selectedPriority === index ? 'border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : ''
                  }`}
                  onClick={() => setSelectedPriority(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{priority.area}</h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[priority.status]}`}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {priority.status}
                    </div>
                  </div>
                  
                  <p className="text-white mb-4">{priority.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {priority.controls.map((control, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white">
                        <CheckCircle className="w-3 h-3 text-blue-400 mr-2 flex-shrink-0" />
                        {control}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">Risk Level:</span>
                    <span className={`font-medium ${riskColors[priority.riskLevel]}`}>
                      {priority.riskLevel}
                    </span>
                  </div>
                </DepthCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Examination Readiness Score */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Examination Readiness Assessment</h2>
            <p className="text-lg text-white">Comprehensive readiness across all examination areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {examinationReadiness.map((area, index) => (
              <DepthCard key={index} depth="shallow" borderGlow className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{area.category}</h3>
                  <div className="text-center md:text-right">
                    <div className="text-2xl font-bold text-blue-400">{area.score}%</div>
                    <div className="text-xs text-white">Ready</div>
                  </div>
                </div>
                
                <p className="text-white mb-4">{area.description}</p>
                
                <div className="space-y-2 mb-4">
                  {area.items.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-white">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${area.score}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* CFPB Regulations Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Key CFPB Regulations</h2>
                <div className="space-y-4">
                  {[
                    { reg: 'Regulation E', desc: 'Electronic Fund Transfers' },
                    { reg: 'Regulation Z', desc: 'Truth in Lending Act' },
                    { reg: 'Regulation F', desc: 'Debt Collection Practices' },
                    { reg: 'Regulation P', desc: 'Privacy of Consumer Information' },
                    { reg: 'FCRA', desc: 'Fair Credit Reporting Act' },
                    { reg: 'ECOA', desc: 'Equal Credit Opportunity Act' },
                    { reg: 'SCRA', desc: 'Servicemembers Civil Relief Act' },
                    { reg: 'FDCPA', desc: 'Fair Debt Collection Practices Act' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <div>
                          <span className="font-semibold text-white">{item.reg}</span>
                          <p className="text-sm text-white">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                        Active
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Examination Advantage</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-krim-mint/10 border border-krim-mint/20">
                    <div className="flex items-center mb-2">
                      <Lightning className="w-5 h-5 text-krim-mint mr-2" />
                      <span className="font-semibold text-white">Real-Time Monitoring</span>
                    </div>
                    <p className="text-sm text-white">
                      Continuous compliance monitoring with instant violation detection and prevention.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <Database className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-semibold text-white">Complete Documentation</span>
                    </div>
                    <p className="text-sm text-white">
                      Automated documentation generation with comprehensive audit trails and evidence.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center mb-2">
                      <TrendUp className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="font-semibold text-white">Performance Excellence</span>
                    </div>
                    <p className="text-sm text-white">
                      Market-leading compliance performance that exceeds regulatory expectations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-green-400 mr-2" />
                      <span className="font-semibold text-white">Rapid Response</span>
                    </div>
                    <p className="text-sm text-white">
                      Under 4-hour response time for examination requests with complete documentation.
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
              <div className="text-blue-400 mb-4 flex justify-center">
                <Building className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">CFPB Examination Ready?</h2>
              <p className="text-lg text-white mb-8">
                Transform regulatory examinations from stress events into competitive showcases. 
                Our CFPB readiness system delivers A+ grades while reducing preparation time by 92%.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Schedule Readiness Assessment
                  <MagnifyingGlass className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download CFPB Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    A+ Readiness Grade
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    127 Active Controls
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    &lt; 4hr Response Time
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
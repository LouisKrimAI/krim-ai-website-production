/**
 * ENTERPRISE TRUST SIGNALS & COMPLIANCE BADGES V2.0
 * Credibility indicators for Fortune 500 decision makers
 * Features: Security certifications, compliance status, customer logos, proof points
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Certificate,
  Buildings,
  TrendUp,
  Users,
  Clock,
  CheckCircle,
  Star,
  Globe,
  Lock,
  Eye,
  ChartBar,
  Warning,
  Info
} from '@phosphor-icons/react'
import Card from '../Card'
import { useClaimsRegistry } from '../../hooks/useClaimsRegistry'
import { validateComponentMetrics } from '../../utils/claimsValidation'

interface TrustBadge {
  id: string
  name: string
  type: 'certification' | 'compliance' | 'security' | 'performance' | 'partnership'
  level: 'critical' | 'high' | 'medium' | 'standard'
  status: 'verified' | 'pending' | 'expired'
  issuer: string
  issueDate: string
  expiryDate?: string
  auditDate?: string
  description: string
  verificationUrl?: string
  badgeUrl?: string
  credibility: number // 1-100 scale
}

interface CustomerProof {
  id: string
  name: string
  industry: string
  size: 'enterprise' | 'mid-market' | 'growing'
  logoUrl?: string
  testimonial?: string
  metrics?: {
    improvement: string
    timeframe: string
    category: string
  }
  confidential: boolean
}

interface SecurityMetric {
  name: string
  value: string
  status: 'excellent' | 'good' | 'standard'
  lastUpdated: string
  benchmark?: string
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'soc2-type2',
    name: 'SOC 2',
    type: 'security',
    level: 'critical',
    status: 'verified',
    issuer: 'AICPA Certified Auditor',
    issueDate: '2024-09-15',
    expiryDate: '2025-09-15',
    auditDate: '2024-Q3',
    description: 'Comprehensive security, availability, and confidentiality controls audited over 12+ months',
    verificationUrl: 'https://verify.aicpa.org/krim-ai-soc2',
    credibility: 95
  },
  {
    id: 'iso27001',
    name: 'ISO 27001:2022',
    type: 'security',
    level: 'critical',
    status: 'verified',
    issuer: 'BSI Global',
    issueDate: '2024-06-01',
    expiryDate: '2027-06-01',
    auditDate: '2024-Q2',
    description: 'International standard for information security management systems',
    verificationUrl: 'https://www.bsigroup.com/en-US/validate-bsi-certificate/?certificateNumber=IS-762845',
    credibility: 90
  },
  {
    id: 'hipaa-ready',
    name: 'HIPAA Ready',
    type: 'compliance',
    level: 'high',
    status: 'verified',
    issuer: 'Third-party Security Assessment',
    issueDate: '2024-08-01',
    auditDate: '2024-Q3',
    description: 'Healthcare data protection compliance with HIPAA Security and Privacy Rules',
    credibility: 88
  },
  {
    id: 'pci-dss',
    name: 'PCI DSS Level 1',
    type: 'compliance',
    level: 'high',
    status: 'verified',
    issuer: 'PCI Security Standards Council',
    issueDate: '2024-10-01',
    expiryDate: '2025-10-01',
    auditDate: '2024-Q4',
    description: 'Highest level of payment card industry data security compliance',
    verificationUrl: 'https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors',
    credibility: 92
  },
  {
    id: 'fdcpa-zero-violations',
    name: 'Zero FDCPA Violations',
    type: 'compliance',
    level: 'critical',
    status: 'verified',
    issuer: 'Internal Audit + External Monitoring',
    issueDate: '2021-01-01',
    description: '200+ million interactions with zero regulatory violations since inception',
    credibility: 98
  },
  {
    id: 'tcpa-compliant',
    name: 'TCPA Compliant',
    type: 'compliance',
    level: 'high',
    status: 'verified',
    issuer: 'Compliance Legal Review',
    issueDate: '2024-01-01',
    description: 'Telephone Consumer Protection Act compliance with consent tracking',
    credibility: 85
  },
  {
    id: '99-99-uptime',
    name: '99.99% Uptime SLA',
    type: 'performance',
    level: 'high',
    status: 'verified',
    issuer: 'Third-party Monitoring (Datadog)',
    issueDate: '2024-01-01',
    description: 'Contractually guaranteed uptime with monitoring compliance',
    credibility: 87
  },
  {
    id: 'nvidia-certified',
    name: 'NVIDIA AI Enterprise',
    type: 'partnership',
    level: 'medium',
    status: 'verified',
    issuer: 'NVIDIA Corporation',
    issueDate: '2024-03-15',
    description: 'Certified for enterprise AI inference and training workloads',
    credibility: 80
  }
]

const CUSTOMER_PROOF: CustomerProof[] = [
  {
    id: 'fortune-500-bank',
    name: 'Fortune 500 Regional Bank',
    industry: 'Financial Services',
    size: 'enterprise',
    testimonial: 'Achieved 35% increase in collection rates while reducing compliance risk to zero',
    metrics: {
      improvement: '35% collection lift',
      timeframe: '6 months',
      category: 'Revenue Impact'
    },
    confidential: true
  },
  {
    id: 'national-credit-union',
    name: 'National Credit Union',
    industry: 'Financial Services',
    size: 'enterprise',
    testimonial: 'Transformed member experience while maintaining 4.8/5 satisfaction scores',
    metrics: {
      improvement: '4.8/5 satisfaction',
      timeframe: '12 months',
      category: 'Member Experience'
    },
    confidential: true
  },
  {
    id: 'auto-finance-leader',
    name: 'Auto Finance Leader',
    industry: 'Auto Lending',
    size: 'enterprise',
    testimonial: 'Processed 10M+ calls in 11 hours during emergency scaling test',
    metrics: {
      improvement: '10M calls/11 hours',
      timeframe: 'Peak load',
      category: 'Scale Validation'
    },
    confidential: true
  },
  {
    id: 'consumer-lender',
    name: 'Consumer Lending Platform',
    industry: 'Fintech',
    size: 'mid-market',
    testimonial: 'Reduced operational costs by $2.4M annually while improving outcomes',
    metrics: {
      improvement: '$2.4M savings',
      timeframe: '12 months',
      category: 'Cost Reduction'
    },
    confidential: false
  }
]

const SECURITY_METRICS: SecurityMetric[] = [
  {
    name: 'Mean Time to Detect (MTTD)',
    value: '<2 minutes',
    status: 'excellent',
    lastUpdated: '2024-12-15',
    benchmark: 'Industry: 24 hours'
  },
  {
    name: 'Mean Time to Respond (MTTR)',
    value: '<15 minutes',
    status: 'excellent',
    lastUpdated: '2024-12-15',
    benchmark: 'Industry: 4 hours'
  },
  {
    name: 'Security Incidents (12mo)',
    value: '0 breaches',
    status: 'excellent',
    lastUpdated: '2024-12-15',
    benchmark: 'Industry: 3.2 incidents'
  },
  {
    name: 'Penetration Test Score',
    value: '98/100',
    status: 'excellent',
    lastUpdated: '2024-11-30',
    benchmark: 'Industry: 67/100'
  }
]

export default function TrustSignals() {
  const [activeCategory, setActiveCategory] = useState<string>('security')
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<{ [key: string]: boolean }>({})

  const categories = [
    { id: 'security', name: 'Security & Compliance', icon: ShieldCheck },
    { id: 'performance', name: 'Performance Metrics', icon: TrendUp },
    { id: 'customers', name: 'Customer Proof', icon: Buildings },
    { id: 'certifications', name: 'Certifications', icon: Certificate }
  ]

  const filteredBadges = TRUST_BADGES.filter(badge => 
    activeCategory === 'security' ? ['security', 'compliance'].includes(badge.type) :
    activeCategory === 'performance' ? badge.type === 'performance' :
    activeCategory === 'certifications' ? badge.type === 'certification' :
    true
  )

  const handleVerification = (badgeId: string, verificationUrl?: string) => {
    if (verificationUrl) {
      window.open(verificationUrl, '_blank')
      setVerificationStatus(prev => ({ ...prev, [badgeId]: true }))
    }
  }

  const getBadgeColor = (level: TrustBadge['level']) => {
    switch (level) {
      case 'critical': return 'border-krim-mint/50 bg-krim-mint/10 text-krim-mint'
      case 'high': return 'border-krim-cyan/50 bg-krim-cyan/10 text-krim-cyan'
      case 'medium': return 'border-krim-purple/50 bg-krim-purple/10 text-krim-purple'
      case 'standard': return 'border-white/30 bg-white/5 text-white'
    }
  }

  const getStatusIcon = (status: TrustBadge['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5 text-krim-mint" />
      case 'pending': return <Clock className="w-5 h-5 text-krim-cyan" />
      case 'expired': return <Warning className="w-5 h-5 text-krim-coral" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Executive Trust Overview */}
      <motion.div
        className="executive-summary"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-krim-mint mb-2">98%</div>
            <div className="text-white">Security Score</div>
            <div className="text-sm text-white mt-1">Third-party validated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-krim-cyan mb-2">200M+</div>
            <div className="text-white">Zero Violations</div>
            <div className="text-sm text-white mt-1">Perfect compliance record</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-krim-mint mb-2">50+</div>
            <div className="text-white">Enterprise Clients</div>
            <div className="text-sm text-white mt-1">Fortune 500 included</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-krim-cyan mb-2">99.99%</div>
            <div className="text-white">Uptime SLA</div>
            <div className="text-sm text-white mt-1">Contractually guaranteed</div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-white mb-6">
            <strong>Enterprise Grade Security:</strong> Bank-level security with zero regulatory violations 
            across 200+ million customer interactions. Trusted by Fortune 500 financial institutions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TRUST_BADGES.filter(b => b.level === 'critical').map(badge => (
              <div key={badge.id} className="trust-badge trust-badge--verified">
                {getStatusIcon(badge.status)}
                {badge.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-krim-mint text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </motion.button>
          )
        })}
      </div>

      {/* Content Based on Active Category */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeCategory === 'customers' ? (
            // Customer Proof Section
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-krim-cyan mb-6 text-center text-white">
                Trusted by Leading Financial Institutions
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {CUSTOMER_PROOF.map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="executive-card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-white text-lg text-white">
                          {customer.confidential ? customer.name : customer.name}
                        </h4>
                        <p className="text-sm text-white">{customer.industry}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            customer.size === 'enterprise' ? 'bg-krim-mint/20 text-krim-mint' :
                            customer.size === 'mid-market' ? 'bg-krim-cyan/20 text-krim-cyan' :
                            'bg-krim-purple/20 text-krim-purple'
                          }`}>
                            {customer.size.replace('-', ' ').toUpperCase()}
                          </div>
                          {customer.confidential && (
                            <div className="flex items-center gap-1 text-xs text-white">
                              <Lock className="w-3 h-3" />
                              Confidential
                            </div>
                          )}
                        </div>
                      </div>
                      <Star className="w-6 h-6 text-krim-mint" />
                    </div>
                    
                    <blockquote className="text-white italic mb-4 text-sm leading-relaxed">
                      "{customer.testimonial}"
                    </blockquote>
                    
                    {customer.metrics && (
                      <div className="bg-krim-mint/10 rounded-lg p-4 border border-krim-mint/20">
                        <div className="text-2xl font-bold text-krim-mint mb-1">
                          {customer.metrics.improvement}
                        </div>
                        <div className="text-sm text-white">
                          {customer.metrics.category} • {customer.metrics.timeframe}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : activeCategory === 'performance' ? (
            // Security Metrics Section  
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-krim-cyan mb-6 text-center text-white">
                Enterprise Security Performance
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {SECURITY_METRICS.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="executive-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-white">{metric.name}</h4>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        metric.status === 'excellent' ? 'bg-krim-mint/20 text-krim-mint' :
                        metric.status === 'good' ? 'bg-krim-cyan/20 text-krim-cyan' :
                        'bg-krim-purple/20 text-krim-purple'
                      }`}>
                        {metric.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="text-3xl font-bold text-krim-mint mb-2">
                      {metric.value}
                    </div>
                    
                    {metric.benchmark && (
                      <div className="text-sm text-white">
                        <span className="text-krim-coral">vs {metric.benchmark}</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-white mt-3">
                      Updated: {metric.lastUpdated}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // Security & Compliance Badges
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-krim-cyan mb-6 text-center text-white">
                {activeCategory === 'security' ? 'Security & Compliance Certifications' : 'Professional Certifications'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`executive-card p-6 relative overflow-hidden ${getBadgeColor(badge.level)} border-2 hover:scale-105 transition-all cursor-pointer`}
                    onClick={() => setShowDetails(showDetails === badge.id ? null : badge.id)}
                  >
                    {/* Credibility Score */}
                    <div className="absolute top-4 right-4">
                      <div className="text-xs font-bold bg-white/20 rounded-full px-2 py-1">
                        {badge.credibility}%
                      </div>
                    </div>
                    
                    {/* Badge Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-white/10">
                        {getStatusIcon(badge.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-white">{badge.name}</h4>
                        <p className="text-sm">{badge.issuer}</p>
                      </div>
                    </div>
                    
                    {/* Badge Description */}
                    <p className="text-sm mb-4 leading-relaxed">
                      {badge.description}
                    </p>
                    
                    {/* Badge Metadata */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span >Issued:</span>
                        <span>{badge.issueDate}</span>
                      </div>
                      {badge.expiryDate && (
                        <div className="flex justify-between">
                          <span >Expires:</span>
                          <span>{badge.expiryDate}</span>
                        </div>
                      )}
                      {badge.auditDate && (
                        <div className="flex justify-between">
                          <span >Audit:</span>
                          <span>{badge.auditDate}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Verification Button */}
                    {badge.verificationUrl && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVerification(badge.id, badge.verificationUrl)
                        }}
                        className="w-full mt-4 px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Verify Certificate
                        {verificationStatus[badge.id] && (
                          <CheckCircle className="w-4 h-4 text-krim-mint" />
                        )}
                      </motion.button>
                    )}
                    
                    {/* Detailed View */}
                    <AnimatePresence>
                      {showDetails === badge.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/20"
                        >
                          <div className="space-y-2 text-xs">
                            <div className="font-semibold">Certification Details:</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span >Type:</span>
                                <span className="ml-2 capitalize">{badge.type}</span>
                              </div>
                              <div>
                                <span >Level:</span>
                                <span className="ml-2 capitalize">{badge.level}</span>
                              </div>
                              <div>
                                <span >Status:</span>
                                <span className="ml-2 capitalize">{badge.status}</span>
                              </div>
                              <div>
                                <span >Trust Score:</span>
                                <span className="ml-2">{badge.credibility}/100</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card className="executive-card p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-krim-mint mb-4 text-white">
            Enterprise Security That Boards Trust
          </h3>
          <p className="text-lg text-white mb-6">
            Join 50+ financial institutions who chose Krim AI for our uncompromising commitment 
            to security, compliance, and performance. Every certification is continuously monitored 
            and renewed ahead of schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-krim-mint text-black font-bold rounded-lg hover:bg-krim-mint/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Security Documentation
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-krim-cyan text-krim-cyan font-bold rounded-lg hover:bg-krim-cyan hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Compliance Review
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
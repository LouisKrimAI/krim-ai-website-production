/**
 * SECURITY & DATA PROTECTION - Enterprise Security Excellence
 * Comprehensive security framework that builds trust and ensures protection
 * Transform security requirements into competitive advantages
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Eye, HardDrives, Warning, CheckCircle, Users, Database, Globe, Clock, Trophy, File, ArrowLeft } from '@phosphor-icons/react'
import DepthCard, { MetricGrid } from '../../components/molecules/DepthCard'
import Button from '../../components/Button'
import { ComplianceBadgePresets } from '../../components/ComplianceBadges'
import { useCursorGlow } from '../../hooks/useCursorGlow'

const securityMetrics = [
  {
    value: 'A+',
    label: 'Security Rating',
    trend: 'up' as const,
    trendValue: 'Industry leading',
    description: 'Comprehensive security posture assessment',
    icon: 'award' as const
  },
  {
    value: 0,
    label: 'Security Breaches',
    unit: ' ever',
    trend: 'up' as const,
    trendValue: 'Perfect record',
    description: 'Zero security incidents since inception',
    icon: 'shield' as const
  },
  {
    value: '< 15min',
    label: 'Threat Response',
    trend: 'up' as const,
    trendValue: '24/7 monitoring',
    description: 'Average security incident response time',
    icon: 'clock' as const
  },
  {
    value: 847,
    label: 'Security Controls',
    unit: ' active',
    trend: 'up' as const,
    trendValue: '+47 this quarter',
    description: 'Comprehensive defense in depth',
    icon: 'target' as const
  }
]

const securityFrameworks = [
  {
    framework: 'SOC 2',
    status: 'Certified',
    description: 'Independent audit of security, availability, and confidentiality controls',
    controls: [
      'Security policies and procedures',
      'Access controls and monitoring',
      'System operations and maintenance',
      'Risk management and incident response'
    ],
    auditDate: 'June 2025',
    nextAudit: 'June 2026'
  },
  {
    framework: 'ISO 27001',
    status: 'Compliant',
    description: 'International standard for information security management systems',
    controls: [
      'Information security policies',
      'Risk assessment and treatment',
      'Asset management and classification',
      'Business continuity management'
    ],
    auditDate: 'May 2025',
    nextAudit: 'May 2026'
  },
  {
    framework: 'GDPR & CCPA',
    status: 'Compliant',
    description: 'Privacy regulations compliance for data protection and consumer rights',
    controls: [
      'Data privacy impact assessments',
      'Consent management systems',
      'Data subject rights automation',
      'Cross-border transfer safeguards'
    ],
    auditDate: 'Ongoing',
    nextAudit: 'Continuous'
  },
  {
    framework: 'PCI DSS',
    status: 'Certified',
    description: 'Payment card industry data security standards compliance',
    controls: [
      'Secure payment processing',
      'Cardholder data protection',
      'Regular security testing',
      'Secure network architecture'
    ],
    auditDate: 'July 2025',
    nextAudit: 'July 2026'
  },
  {
    framework: 'HIPAA',
    status: 'Compliant',
    description: 'Health Insurance Portability and Accountability Act compliance for protected health information',
    controls: [
      'PHI data encryption and protection',
      'Access controls and audit trails',
      'Business associate agreements',
      'Breach notification procedures'
    ],
    auditDate: 'April 2025',
    nextAudit: 'April 2026'
  },
  {
    framework: 'FDCPA',
    status: 'Compliant',
    description: 'Fair Debt Collection Practices Act compliance ensuring ethical collection practices',
    controls: [
      'Communication compliance monitoring',
      'Consumer rights protection',
      'Harassment prevention protocols',
      'Documentation and record keeping'
    ],
    auditDate: 'Ongoing',
    nextAudit: 'Continuous'
  },
  {
    framework: 'CFPB',
    status: 'Compliant',
    description: 'Consumer Financial Protection Bureau regulations for fair lending and consumer protection',
    controls: [
      'Fair lending practices',
      'Consumer complaint handling',
      'Regulatory reporting',
      'Compliance management system'
    ],
    auditDate: 'Ongoing',
    nextAudit: 'Continuous'
  },
  {
    framework: 'TCPA',
    status: 'Compliant',
    description: 'Telephone Consumer Protection Act compliance for automated communications',
    controls: [
      'Prior express consent management',
      'Do Not Call list compliance',
      'Call time restrictions',
      'Opt-out mechanism enforcement'
    ],
    auditDate: 'Ongoing',
    nextAudit: 'Continuous'
  }
]

const securityLayers = [
  {
    layer: 'Network Security',
    description: 'Multi-layered network protection with advanced threat detection',
    technologies: [
      'Next-generation firewalls',
      'Intrusion detection/prevention',
      'DDoS protection and mitigation',
      'Network segmentation and isolation'
    ]
  },
  {
    layer: 'Data Protection',
    description: 'End-to-end data encryption and protection mechanisms',
    technologies: [
      'AES-256 encryption at rest',
      'TLS 1.3 encryption in transit',
      'Field-level encryption for PII',
      'Secure key management (HSM)'
    ]
  },
  {
    layer: 'Access Control',
    description: 'Zero-trust access management with continuous verification',
    technologies: [
      'Multi-factor authentication',
      'Role-based access controls',
      'Privileged access management',
      'Continuous access monitoring'
    ]
  },
  {
    layer: 'Application Security',
    description: 'Secure development lifecycle with continuous testing',
    technologies: [
      'Static code analysis (SAST)',
      'Dynamic application testing',
      'Container security scanning',
      'API security and rate limiting'
    ]
  }
]

export default function Security() {
  const mousePosition = useCursorGlow()
  const navigate = useNavigate()
  const [selectedFramework, setSelectedFramework] = useState(0)

  // SEO optimization - set page title and meta description
  useEffect(() => {
    document.title = 'Security & Data Protection - Krim AI | A+ Security Rating'
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Krim AI Security: A+ rating, zero breaches, SOC 2, ISO 27001, military-grade encryption. Enterprise-grade protection for AI debt collection platform.')
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Security & Data Protection",
      "description": "Krim AI Security - comprehensive enterprise security and data protection framework",
      "url": window.location.href,
      "lastModified": "2025-09-07",
      "publisher": {
        "@type": "Organization",
        "name": "Krim AI",
        "url": "https://krim.ai"
      }
    }
    
    let structuredDataScript = document.getElementById('security-structured-data') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.id = 'security-structured-data'
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
    return () => {
      // Cleanup on unmount
      document.title = 'Krim AI — Infinite Scale. Zero Loss of Humanity.'
    }
  }, [])
  
  const statusColors = {
    'Certified': 'text-green-400 bg-green-400/10 border-green-400/20',
    'Compliant': 'text-krim-mint bg-krim-mint/10 border-krim-mint/20'
  }

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-space-900 via-space-800 to-space-900" />
      <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 left-6 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
        </button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <ShieldCheck className="w-12 h-12 text-red-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white w-full max-w-none text-center mb-6">
            <span className="text-white">Security &</span>{' '}
            <span className="text-red-400">Protection</span>
          </h1>
          
          <p className="text-xl text-white max-w-3xl mx-auto mb-8 text-center">
            Comprehensive security measures designed to protect sensitive data while enabling
            operational efficiency. Our security framework follows industry best practices.
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            <Lock className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Enterprise-Grade Security</span>
          </div>
        </motion.div>


        {/* Security Layers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8">Security Architecture</h2>
            <p className="text-lg text-white text-center w-full max-w-none">Multi-layered approach to data protection and system security</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityLayers.map((layer, index) => (
              <DepthCard key={index} depth="shallow" borderGlow className="h-full">
                <div className="flex items-center mb-4">
                  <div className="text-red-400 mr-3">
                    {index === 0 && <Globe className="w-6 h-6" />}
                    {index === 1 && <Database className="w-6 h-6" />}
                    {index === 2 && <Users className="w-6 h-6" />}
                    {index === 3 && <HardDrives className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{layer.layer}</h3>
                </div>
                
                <p className="text-white mb-4">{layer.description}</p>
                
                <div className="space-y-2">
                  {layer.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center text-sm text-white">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                      {tech}
                    </div>
                  ))}
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Security Operations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">24/7 Security Operations</h3>
                <div className="space-y-3">
                  {[
                    'Continuous threat monitoring',
                    'Real-time incident response',
                    'Automated threat detection',
                    'Security event correlation',
                    'Proactive threat hunting',
                    'Incident forensics and analysis'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Eye className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Vulnerability Management</h3>
                <div className="space-y-3">
                  {[
                    'Continuous vulnerability scanning',
                    'Automated patch management',
                    'Penetration testing quarterly',
                    'Code security reviews',
                    'Third-party security assessments',
                    'Bug bounty program participation'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Warning className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Compliance Monitoring</h3>
                <div className="space-y-3">
                  {[
                    'Continuous compliance assessment',
                    'Regulatory change management',
                    'Audit trail maintenance',
                    'Policy enforcement automation',
                    'Risk assessment updates',
                    'Compliance reporting automation'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DepthCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <DepthCard depth="deep" size="large" borderGlow glow>
            <div className="max-w-2xl mx-auto">
              <div className="text-red-400 mb-4 flex justify-center">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8">Security You Can Trust</h2>
              <p className="text-lg text-white mb-8">
                Comprehensive security measures and robust compliance framework designed to meet 
                enterprise protection requirements and industry standards.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Security Assessment
                  <ShieldCheck className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="secondary" size="lg">
                  Download Security Guide
                  <File className="w-5 h-5 ml-2" />
                </Button>
              </div>

            </div>
          </DepthCard>
        </motion.div>
      </div>
    </div>
  )
}
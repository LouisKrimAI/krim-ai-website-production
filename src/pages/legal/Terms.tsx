/**
 * TERMS OF SERVICE - Enterprise Agreement Framework
 * Comprehensive service terms that protect interests and enable growth
 * Transform legal requirements into business clarity
 */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scales, File, CheckCircle, Warning, Users, ShieldCheck, Clock, Globe, ArrowLeft } from '@phosphor-icons/react'
import DepthCard from '../../components/molecules/DepthCard'
import Button from '../../components/Button'

const serviceTerms = [
  {
    category: 'Service Availability',
    terms: [
      '99.9% uptime guarantee with service level credits',
      'Planned maintenance with 48-hour advance notice',
      'Emergency maintenance as operationally required',
      'Performance monitoring with real-time status updates'
    ]
  },
  {
    category: 'Data and Security',
    terms: [
      'Enterprise-grade security with SOC 2 compliance',
      'Data encryption in transit and at rest',
      'Regular security assessments and vulnerability testing',
      'Incident response with customer notification procedures'
    ]
  },
  {
    category: 'Intellectual Property',
    terms: [
      'Customer data remains customer property',
      'Krim AI retains rights to platform and improvements',
      'Limited license to use platform for business purposes',
      'No reverse engineering or competitive use permitted'
    ]
  },
  {
    category: 'Compliance and Regulations',
    terms: [
      'FDCPA, TCPA, FCRA, and SCRA compliance built-in',
      'Regular regulatory updates included in service',
      'Compliance monitoring and violation prevention',
      'Regulatory examination support and documentation'
    ]
  }
]

const responsibilities = [
  {
    party: 'Krim AI Responsibilities',
    items: [
      'Provide reliable, secure platform access',
      'Maintain regulatory compliance systems',
      'Deliver customer support and training',
      'Protect customer data and privacy',
      'Provide regular platform updates',
      'Maintain service level agreements'
    ]
  },
  {
    party: 'Customer Responsibilities',
    items: [
      'Use platform in accordance with applicable laws',
      'Maintain accurate account and contact information',
      'Protect login credentials and access controls',
      'Report security incidents or violations',
      'Pay fees according to agreed schedule',
      'Comply with acceptable use policies'
    ]
  }
]

export default function Terms() {
  const navigate = useNavigate()

  // SEO optimization - set page title and meta description
  useEffect(() => {
    document.title = 'Terms of Service - Krim AI | Enterprise Service Agreement'
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Krim AI Terms of Service: Enterprise service agreement, 99.9% uptime guarantee, SOC 2 compliance, comprehensive support for AI-powered debt collection.')
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service",
      "description": "Krim AI Terms of Service - comprehensive service terms and conditions",
      "url": window.location.href,
      "lastModified": "2025-09-07",
      "publisher": {
        "@type": "Organization",
        "name": "Krim AI",
        "url": "https://krim.ai"
      }
    }
    
    let structuredDataScript = document.getElementById('terms-structured-data') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.id = 'terms-structured-data'
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
    return () => {
      // Cleanup on unmount
      document.title = 'Krim AI — Infinite Scale. Zero Loss of Humanity.'
    }
  }, [])

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-900/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
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
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Scales className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white w-full max-w-none text-center mb-6">
            <span className="text-white">Terms of</span>{' '}
            <span className="text-blue-400">Service</span>
          </h1>
          
          <p className="text-lg text-white mb-4">
            These terms govern your use of Krim AI services and establish our mutual 
            rights, responsibilities, and expectations.
          </p>
          
          <div className="text-sm text-white">
            Last Updated: September 7, 2025 | Effective: Immediately
          </div>
        </motion.div>

        {/* Service Terms */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8">Service Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceTerms.map((category, index) => (
              <DepthCard key={index} depth="medium" borderGlow className="h-full">
                <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.terms.map((term, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-white text-sm">{term}</span>
                    </div>
                  ))}
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8">Mutual Responsibilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {responsibilities.map((party, index) => (
              <DepthCard key={index} depth="deep" borderGlow>
                <h3 className="text-xl font-semibold text-white mb-4">{party.party}</h3>
                <div className="space-y-3">
                  {party.items.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-krim-mint mr-3 mt-1 flex-shrink-0" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>

        {/* Legal Terms */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mb-16"
        >
          {[
            {
              title: 'Acceptable Use Policy',
              icon: <Users className="w-6 h-6" />,
              content: [
                'Use services only for legitimate business purposes',
                'No unauthorized access or security circumvention',
                'No transmission of malicious code or content',
                'Compliance with all applicable laws and regulations',
                'No interference with platform operations',
                'Respect for other users and their data'
              ]
            },
            {
              title: 'Payment Terms',
              icon: <Clock className="w-6 h-6" />,
              content: [
                'Fees are due according to agreed billing schedule',
                'Late payments subject to suspension of services',
                'All fees are non-refundable except as specified',
                'Price changes with 30-day advance notice',
                'Disputed charges must be reported within 60 days',
                'Termination fees as specified in service agreement'
              ]
            },
            {
              title: 'Limitation of Liability',
              icon: <ShieldCheck className="w-6 h-6" />,
              content: [
                'Liability limited to fees paid in preceding 12 months',
                'No liability for indirect or consequential damages',
                'Force majeure events excuse performance delays',
                'Customer responsible for data backup and recovery',
                'Indemnification for customer\'s unauthorized use',
                'Separate liability terms for enterprise customers'
              ]
            },
            {
              title: 'Termination and Suspension',
              icon: <Warning className="w-6 h-6" />,
              content: [
                'Either party may terminate with 30-day notice',
                'Immediate termination for material breach',
                'Data export period of 90 days post-termination',
                'Survival of confidentiality and IP provisions',
                'Prorated refunds for prepaid unused services',
                'Assistance with platform migration if requested'
              ]
            }
          ].map((section, index) => (
            <DepthCard key={index} depth="shallow" size="large">
              <div className="flex items-center mb-4">
                <div className="text-blue-400 mr-3">{section.icon}</div>
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.content.map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </DepthCard>
          ))}
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <DepthCard depth="deep" size="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Governing Law & Disputes</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Globe className="w-4 h-4 text-blue-400 mr-2 mt-1" />
                    <span className="text-white">Governed by laws of Delaware, United States</span>
                  </div>
                  <div className="flex items-start">
                    <Scales className="w-4 h-4 text-blue-400 mr-2 mt-1" />
                    <span className="text-white">Disputes resolved through binding arbitration</span>
                  </div>
                  <div className="flex items-start">
                    <File className="w-4 h-4 text-blue-400 mr-2 mt-1" />
                    <span className="text-white">Class action waiver for individual claims</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact & Modifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-krim-mint mr-2 mt-1" />
                    <span className="text-white">Terms may be updated with reasonable notice</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-krim-mint mr-2 mt-1" />
                    <span className="text-white">Continued use constitutes acceptance</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-krim-mint mr-2 mt-1" />
                    <span className="text-white">Legal questions directed to hello@krim.ai</span>
                  </div>
                </div>
              </div>
            </div>
          </DepthCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <DepthCard depth="deep" size="large" borderGlow>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8">Questions About These Terms?</h2>
              <p className="text-white mb-6">
                Our legal team is available to clarify any provisions or discuss 
                enterprise-specific terms and conditions.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary">
                  Contact Legal Team
                  <Scales className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="secondary">
                  Enterprise Terms
                  <File className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
            </div>
          </DepthCard>
        </motion.div>
      </div>
    </div>
  )
}
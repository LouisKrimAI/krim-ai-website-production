/**
 * KRIM AI - PRIVACY POLICY
 * Fully optimized, mobile-first privacy policy with enhanced UX
 */
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Eye, Users, Database, Globe, CheckCircle, ArrowLeft } from '@phosphor-icons/react'

const Privacy: React.FC = () => {
  const navigate = useNavigate()

  // SEO optimization - set page title and meta description
  useEffect(() => {
    document.title = 'Privacy Policy - Krim AI | Data Protection & Security'
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Krim AI Privacy Policy: Military-grade data protection, zero breaches, GDPR/CCPA compliant. Your privacy is fundamental to our AI-powered debt collection platform.')
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Krim AI Privacy Policy - comprehensive data protection and privacy commitments",
      "url": window.location.href,
      "lastModified": "2025-06-01",
      "publisher": {
        "@type": "Organization",
        "name": "Krim AI",
        "url": "https://krim.ai"
      }
    }
    
    let structuredDataScript = document.getElementById('privacy-structured-data') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.id = 'privacy-structured-data'
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
    return () => {
      // Cleanup on unmount
      document.title = 'Krim AI — Infinite Scale. Zero Loss of Humanity.'
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="relative min-h-screen pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-900/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 border border-krim-mint/20 backdrop-blur-sm">
              <ShieldCheck className="w-12 h-12 text-krim-mint" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white w-full max-w-none text-center mb-6 text-white">
            <span className="text-white">Privacy</span>{' '}
            <span className="text-gradient">Policy</span>
          </h1>
          
          <p className="text-lg sm:text-xl mb-8 text-white max-w-3xl mx-auto leading-relaxed">
            Your privacy is fundamental to our mission. Krim AI is committed to protecting 
            your personal information with military-grade security and transparent practices.
          </p>
          
        </motion.div>

        {/* Information Collection */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">Information We Collect</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-krim-mint mr-4" />
                <h3 className="text-xl font-bold text-white">Personal Information</h3>
              </div>
              <p className="text-white mb-6">
                We collect personal information that you voluntarily provide when using our services:
              </p>
              <ul className="space-y-3">
                {[
                  'Contact information (name, email, phone number, mailing address)',
                  'Professional information (company name, job title, department)',
                  'Account credentials and authentication data',
                  'Communication preferences and consent records',
                  'Support requests and feedback'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white text-sm">
                    <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-krim-cyan mr-4" />
                <h3 className="text-xl font-bold text-white">Technical Information</h3>
              </div>
              <p className="text-white mb-6">
                We automatically collect certain technical information when you use our platform:
              </p>
              <ul className="space-y-3">
                {[
                  'IP addresses, browser types, and device information',
                  'Usage patterns, feature interactions, and performance metrics',
                  'Log files, cookies, and similar tracking technologies',
                  'Session data and authentication tokens',
                  'Error reports and diagnostic information'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white text-sm">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mt-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-krim-coral mr-4" />
              <h3 className="text-xl font-bold text-white">Financial Services Data</h3>
            </div>
            <p className="text-white mb-6">
              For our credit servicing platform, we process:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Loan account information and payment histories',
                'Credit-related data as permitted by applicable law',
                'Communication records with borrowers',
                'Compliance and regulatory reporting data',
                'Transaction records and audit trails'
              ].map((item, index) => (
                <div key={index} className="flex items-start text-white text-sm">
                  <div className="w-1.5 h-1.5 bg-krim-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How We Use Information */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">How We Use Your Information</h2>
          
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: 'Service Delivery',
                icon: <Globe className="w-6 h-6 text-krim-cyan" />,
                items: [
                  'Provide and maintain our AI-powered services',
                  'Process transactions and manage accounts',
                  'Deliver customer support and technical assistance',
                  'Ensure platform security and prevent fraud'
                ]
              },
              {
                title: 'Compliance & Legal',
                icon: <ShieldCheck className="w-6 h-6 text-krim-mint" />,
                items: [
                  'Comply with FDCPA, CFPB, and other regulations',
                  'Maintain audit trails and documentation',
                  'Respond to legal requests and court orders',
                  'Prevent money laundering and financial crimes'
                ]
              },
              {
                title: 'Platform Improvement',
                icon: <Eye className="w-6 h-6 text-krim-purple" />,
                items: [
                  'Analyze usage patterns to enhance features',
                  'Develop and train AI models',
                  'Optimize performance and reliability',
                  'Conduct research and analytics'
                ]
              },
              {
                title: 'Communications',
                icon: <Users className="w-6 h-6 text-krim-mint" />,
                items: [
                  'Send service updates and notifications',
                  'Provide educational content and resources',
                  'Deliver marketing communications (with consent)',
                  'Facilitate customer feedback and surveys'
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h3 className="text-xl font-bold text-white ml-3">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-white text-sm">
                      <CheckCircle className="w-4 h-4 text-krim-mint mr-3 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Your Rights */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">Your Privacy Rights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6">Access & Control</h3>
              <ul className="space-y-3">
                {[
                  'Right to access your personal information',
                  'Right to correct inaccurate data',
                  'Right to delete or restrict processing',
                  'Right to data portability',
                  'Right to opt-out of marketing communications'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6">State-Specific Rights</h3>
              <ul className="space-y-3">
                {[
                  'California Consumer Privacy Act (CCPA) rights',
                  'Virginia Consumer Data Protection Act rights',
                  'Colorado Privacy Act protections',
                  'Connecticut Data Privacy Act rights',
                  'Other applicable state privacy laws'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-krim-cyan mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mt-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-6">Exercising Your Rights</h3>
            <p className="text-white mb-6">
              To exercise your privacy rights, contact us through any of these methods:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-krim-mint font-semibold">Email</div>
                <div className="text-white text-sm">hello@krim.ai</div>
              </div>
              <div className="text-center">
                <div className="text-krim-mint font-semibold">Phone</div>
                <div className="text-white text-sm">+1 510-345-5686</div>
              </div>
              <div className="text-center">
                <div className="text-krim-mint font-semibold">Online Form</div>
                <Link to="/contact" className="text-krim-cyan hover:text-krim-mint text-sm underline">
                  Contact Us
                </Link>
              </div>
              <div className="text-center">
                <div className="text-krim-mint font-semibold">Response Time</div>
                <div className="text-white text-sm">Within 30 days</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-krim-mint/5 via-krim-cyan/5 to-krim-purple/5 backdrop-blur-[8px] border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheck className="w-16 h-16 text-krim-mint" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
              Privacy-First Approach
            </h2>
            
            <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto">
              We don't sell your data. Ever. Your information is used solely to provide our services 
              and comply with legal obligations. Zero breaches, maximum protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/legal/terms"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-krim-mint hover:bg-krim-mint/80 text-black font-semibold transition-all duration-300 hover:scale-105"
              >
                View Terms of Service
              </Link>
              <Link 
                to="/legal/security"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold transition-all duration-300"
              >
                Security Details
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Privacy
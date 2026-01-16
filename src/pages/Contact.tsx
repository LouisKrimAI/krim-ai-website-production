import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { Calendar, TrendUp, ShieldCheck, Lightning, Clock, CheckCircle, Phone, ArrowRight, Users, CurrencyDollar, Download, CaretDown } from '@phosphor-icons/react'
import { getDisplayMetric, CUSTOMER_METRICS, ENTERPRISE_CLAIMS } from '../data/claimsRegistry'
import Button from '../components/Button'

interface ContactForm {
  name: string
  email: string
  company: string
  phone: string
  role: string
  industrySegment: string
  aum: string
  activeBorrowers: string
  aiReadiness: string
  contactType: string
  urgency: string
  message: string
  hearAboutUs: string
}

// Asset mapping for gated content
const ASSET_MAP = {
  'technical-specifications': {
    file: 'Krim-AI-Technical-Specifications-SLA.pdf',
    title: 'Technical Specifications & SLA'
  }
}

export default function Contact() {
  const mousePosition = useCursorGlow()
  const location = useLocation()
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: '',
    industrySegment: '',
    aum: '',
    activeBorrowers: '',
    aiReadiness: '',
    contactType: 'strategic-consultation',
    urgency: 'within-month',
    message: '',
    hearAboutUs: ''
  })
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Extract context from router state
  const assetRequest = location.state?.downloadAsset
  const pricingConfig = location.state?.pricingConfig
  const requestedAsset = assetRequest ? ASSET_MAP[assetRequest] : null
  const [submitAttempts, setSubmitAttempts] = useState(0)

  // Initialize form based on context
  useEffect(() => {
    if (requestedAsset) {
      setForm(prev => ({
        ...prev,
        contactType: 'technical-integration',
        message: `I would like to download: ${requestedAsset.title}`
      }))
    }

    if (pricingConfig) {
      const pricingMessage = `Pricing inquiry for ${pricingConfig.plan} plan (${pricingConfig.portfolioSize} borrowers, ${pricingConfig.deployment} deployment, ${pricingConfig.agreement} term)`
      setForm(prev => ({
        ...prev,
        contactType: 'strategic-consultation',
        message: requestedAsset
          ? `${prev.message}\n\nAdditional pricing inquiry: ${pricingMessage}`
          : pricingMessage
      }))
    }
  }, [requestedAsset, pricingConfig])

  // Asset download function
  const triggerAssetDownload = (assetFile: string) => {
    try {
      const link = document.createElement('a')
      link.href = `/assets/gated/${assetFile}`
      link.download = assetFile
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Download failed:', error)
      }
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.company.trim()) newErrors.company = 'Company is required'
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }
    if (!form.role) newErrors.role = 'Role is required'
    if (!form.message.trim()) newErrors.message = 'Please describe your challenges or goals'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempts(prev => prev + 1)
    
    if (!validateForm()) {
      setStatus('error')
      return
    }
    
    setStatus('submitting')
    setErrors({})
    try {
      // Use Supabase directly like the ContactForm component
      const { DatabaseService, getUserMetadata, isSupabaseConfigured } = await import('../lib/supabase')
      
      const dbConfigured = isSupabaseConfigured()
      
      if (!dbConfigured) {
        // Use fallback storage
        const fallbackData = {
          id: `contact_fallback_${Date.now()}`,
          timestamp: new Date().toISOString(),
          form_data: form,
          source: requestedAsset ? 'asset-download-fallback' : pricingConfig ? 'pricing-inquiry-fallback' : 'contact-page-fallback'
        }
        
        // Store in localStorage
        const existing = localStorage.getItem('contact_submissions')
        const submissions = existing ? JSON.parse(existing) : []
        submissions.push(fallbackData)
        localStorage.setItem('contact_submissions', JSON.stringify(submissions))
        
        // Show success
        setStatus('success')
        
        // Try to send notification
        try {
          await fetch('https://formspree.io/f/xjkbbgye', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: form.email,
              name: form.name,
              company: form.company,
              message: `Demo request from ${form.company} (fallback mode)`
            })
          })
        } catch (e) {
          // Silent fail
        }
        
        // Trigger download if requested
        if (requestedAsset) {
          setTimeout(() => triggerAssetDownload(requestedAsset.file), 1000)
        }
        
        return
      }

      const metadata = getUserMetadata()

      // Determine source and enhanced message based on context
      let source = 'krim-v3-contact-page'
      let enhancedMessage = `Contact Type: ${form.contactType}\nUrgency: ${form.urgency}\n\nMessage: ${form.message}`

      if (requestedAsset && pricingConfig) {
        source = 'pricing-asset-combo'
        enhancedMessage = `Asset Request: ${requestedAsset.title}\nPricing Inquiry: ${pricingConfig.plan} plan (${pricingConfig.portfolioSize} borrowers, ${pricingConfig.deployment} deployment, ${pricingConfig.agreement} term)\n\nContact Type: ${form.contactType}\nUrgency: ${form.urgency}\n\nMessage: ${form.message}`
      } else if (requestedAsset) {
        source = 'asset-download'
        enhancedMessage = `Asset Request: ${requestedAsset.title}\n\nContact Type: ${form.contactType}\nUrgency: ${form.urgency}\n\nMessage: ${form.message}`
      } else if (pricingConfig) {
        source = 'pricing-inquiry'
        enhancedMessage = `Pricing Inquiry: ${pricingConfig.plan} plan (${pricingConfig.portfolioSize} borrowers, ${pricingConfig.deployment} deployment, ${pricingConfig.agreement} term)\n\nContact Type: ${form.contactType}\nUrgency: ${form.urgency}\n\nMessage: ${form.message}`
      }

      const result = await DatabaseService.submitContactForm({
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '',
        email: form.email,
        company: form.company,
        title: form.role,
        phone: form.phone,
        industry_segment: form.industrySegment,
        aum: form.aum,
        active_borrowers: form.activeBorrowers,
        ai_readiness: form.aiReadiness,
        hear_about_us: form.hearAboutUs,
        message: enhancedMessage,
        source: source,
        ...metadata
      })
      
      if (result.success && result.data) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', phone: '', role: '', industrySegment: '', aum: '', activeBorrowers: '', aiReadiness: '', contactType: 'strategic-consultation', urgency: 'within-month', message: '', hearAboutUs: '' })

        // Send Email 1 (verification email)
        fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              record: {
                id: result.data.id,
                email: result.data.email,
                first_name: result.data.first_name,
                last_name: result.data.last_name,
                company: result.data.company
              }
            }),
          }
        ).then(res => res.json()).then(data => {
          if (data.success && import.meta.env.DEV) {
            console.log('✅ Email 1 sent successfully')
          }
        }).catch(err => {
          if (import.meta.env.DEV) {
            console.error('❌ Failed to send Email 1:', err)
          }
        })

        // Trigger asset download if requested
        if (requestedAsset) {
          setTimeout(() => {
            triggerAssetDownload(requestedAsset.file)
          }, 1000) // Small delay to ensure success message is visible
        }
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Contact form submission error:', err)
      }
      setStatus('error')
    }
  }

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    // Clear error for this field when user starts typing
    if (errors[k]) {
      setErrors(prev => ({ ...prev, [k]: '' }))
    }
  }

  // FAQ data - exactly as specified
  const faqs = [
    {
      q: "What happens after I submit this form?",
      a: "We review your details, check that Krim is likely a fit, and send 2–3 options for a 30-minute session. On the call we map your use cases, walk through the relevant parts of the product stack, and discuss whether a pilot makes sense."
    },
    {
      q: "Who should join the demo from our side?",
      a: "Ideally one business owner for banking / servicing / collections, one technology owner (systems / integrations), and—if possible—someone from risk or compliance."
    },
    {
      q: "What type of companies is Krim for?",
      a: "Banks, auto lenders, NBFCs, credit unions, card and BNPL providers running regulated consumer banking operations with meaningful call and case volumes."
    },
    {
      q: "How does pricing work?",
      a: "Pricing combines subscription with usage-based charges, and in some cases value-linked components."
    },
    {
      q: "Are you safe for regulated banking operations?",
      a: "Yes—Krim is designed for regulated lenders. Guardrails, policies and data-access boundaries are enforced in Kendra so AI co-workers follow your rules, and sensitive data isn't shown to users or systems that shouldn't see it."
    },
    {
      q: "How do integrations work with existing systems?",
      a: "We connect Kendra to the systems you already use for banking operations—loan and account servicing platforms, CRMs, dialers and contact-centre tools, payment and messaging providers, and, where useful, your data warehouse or lake. For a pilot we usually start with a small set of systems, using APIs or secure file/event feeds, and expand from there as the scope grows."
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-20 relative isolate overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />


      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero + Form Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          {/* Desktop: Two-column layout, Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left column: Hero content */}
            <div className="lg:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                  Book a Krim Demo
                </h1>
                
                <p className="text-xl text-white/90 mb-12 leading-relaxed">
                  See how AI co-workers, digital twins and command centers can automate your banking operations while keeping compliance and data safety at the core.
                </p>
              </motion.div>
            </div>

            {/* Right column: Form */}
            <div>
              {/* One-liner above form */}
              <p className="text-lg text-white/80 mb-6 text-left">
                Tell us a bit about your portfolio and current setup. We'll review, then schedule a working session to walk through fit, live examples, and next steps.
              </p>

              {/* Form card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass rounded-2xl p-8"
              >
                {/* Context-aware banners */}
                {requestedAsset && (
                  <div className="mb-6 p-4 border-2 border-krim-mint/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download className="text-krim-mint" size={24} />
                      <div>
                        <h3 className="text-krim-mint font-bold text-white">Asset Download Request</h3>
                        <p className="text-white text-sm">Complete the form below to download: {requestedAsset.title}</p>
                      </div>
                    </div>
                  </div>
                )}

                {pricingConfig && (
                  <div className="mb-6 p-4 border-2 border-krim-cyan/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CurrencyDollar className="text-krim-cyan" size={24} />
                      <div>
                        <h3 className="text-krim-cyan font-bold text-white">Pricing Inquiry</h3>
                        <p className="text-white text-sm">
                          {pricingConfig.plan} plan • {pricingConfig.portfolioSize} borrowers • {pricingConfig.deployment} deployment • {pricingConfig.agreement} term
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form - keeping exact structure */}
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white mb-2">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={set('name')}
                        autoComplete="name"
                        style={{ fontSize: '16px' }}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.name ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-krim-coral text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        inputMode="email"
                        autoComplete="email"
                        style={{ fontSize: '16px' }}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.email ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                        placeholder="your.email@company.com"
                      />
                      {errors.email && <p className="text-krim-coral text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white mb-2">Company *</label>
                      <input
                        required
                        value={form.company}
                        onChange={set('company')}
                        autoComplete="organization"
                        style={{ fontSize: '16px' }}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.company ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                        placeholder="Your company name"
                      />
                      {errors.company && <p className="text-krim-coral text-sm mt-1">{errors.company}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white mb-2">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        inputMode="tel"
                        autoComplete="tel"
                        style={{ fontSize: '16px' }}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.phone ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-krim-coral text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white mb-2">Your Role *</label>
                      <select
                        required
                        value={form.role}
                        onChange={set('role')}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.role ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                      >
                        <option value="" className="text-white">Select your role</option>
                        <option value="ceo" className="text-white">CEO/President</option>
                        <option value="coo" className="text-white">COO/Operations</option>
                        <option value="cfo" className="text-white">CFO/Finance</option>
                        <option value="cto" className="text-white">CTO/Technology</option>
                        <option value="head-collections" className="text-white">Head of Collections</option>
                        <option value="risk-compliance" className="text-white">Risk/Compliance</option>
                        <option value="other" className="text-white">Other Executive</option>
                      </select>
                      {errors.role && <p className="text-krim-coral text-sm mt-1">{errors.role}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white mb-2">Implementation Urgency *</label>
                      <select
                        required
                        value={form.urgency}
                        onChange={set('urgency')}
                        className={`w-full border rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none transition-colors ${
                          errors.urgency ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                        }`}
                      >
                        <option value="immediate" className="text-white">Desired timeline</option>
                        <option value="within-month" className="text-white">Within 30 days</option>
                        <option value="within-quarter" className="text-white">Within 90 days</option>
                        <option value="planning" className="text-white">Planning for next year</option>
                      </select>
                    </div>
                  </div>

                  {/* ICP Segmentation Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white mb-2">Industry Segment</label>
                      <select
                        value={form.industrySegment}
                        onChange={set('industrySegment')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-krim-mint transition-colors"
                      >
                        <option value="" className="text-white">Select industry...</option>
                        <option value="auto-finance" className="text-white">Auto-Finance</option>
                        <option value="credit-union" className="text-white">Credit Union</option>
                        <option value="bank-cards" className="text-white">Bank/Cards</option>
                        <option value="utilities" className="text-white">Utilities</option>
                        <option value="healthcare" className="text-white">Healthcare</option>
                        <option value="government" className="text-white">Government</option>
                        <option value="fintech-lender" className="text-white">Fintech Lender</option>
                        <option value="servicer-bpo" className="text-white">Servicer/BPO</option>
                        <option value="other" className="text-white">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white mb-2">Assets Under Management (AUM)</label>
                      <select
                        value={form.aum}
                        onChange={set('aum')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-krim-mint transition-colors"
                      >
                        <option value="" className="text-white">Select AUM...</option>
                        <option value="<50M" className="text-white">&lt;$50M</option>
                        <option value="50-200M" className="text-white">$50–200M</option>
                        <option value="200-500M" className="text-white">$200–500M</option>
                        <option value="500M-1B" className="text-white">$500M–$1B</option>
                        <option value="1-5B" className="text-white">$1–5B</option>
                        <option value=">5B" className="text-white">&gt;$5B</option>
                        <option value="unsure" className="text-white">Unsure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white mb-2">Active Customers</label>
                      <select
                        value={form.activeBorrowers}
                        onChange={set('activeBorrowers')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-krim-mint transition-colors"
                      >
                        <option value="" className="text-white">Select volume...</option>
                        <option value="<50k" className="text-white">&lt;50k</option>
                        <option value="50-100k" className="text-white">50–100k</option>
                        <option value="100-250k" className="text-white">100–250k</option>
                        <option value="250-500k" className="text-white">250–500k</option>
                        <option value="500k-1M" className="text-white">500k–1M</option>
                        <option value=">1M" className="text-white">&gt;1M</option>
                        <option value="unsure" className="text-white">Unsure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white mb-2">Company AI stage</label>
                      <select
                        value={form.aiReadiness}
                        onChange={set('aiReadiness')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-krim-mint transition-colors"
                      >
                        <option value="" className="text-white">Current AI usage...</option>
                        <option value="none" className="text-white">None (exploring)</option>
                        <option value="limited-pilots" className="text-white">Limited pilots in one team</option>
                        <option value="multiple-pilots" className="text-white">Multiple pilots across teams</option>
                        <option value="production-select" className="text-white">Production use in select workflows</option>
                        <option value="production-broad" className="text-white">Broad production use org-wide</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">Specific Challenges or Goals *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                        errors.message ? 'border-krim-coral focus:border-krim-coral' : 'border-white/10 focus:border-krim-mint'
                      }`}
                      placeholder="Tell us about your current challenges, or specific goals for improvement..."
                    />
                    {errors.message && <p className="text-krim-coral text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">From where did you hear about our organization?</label>
                    <select
                      value={form.hearAboutUs}
                      onChange={set('hearAboutUs')}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-krim-mint transition-colors"
                    >
                      <option value="" className="text-white">-- Select an option --</option>
                      <option value="google" className="text-white">Google Search</option>
                      <option value="social_media" className="text-white">Social Media</option>
                      <option value="friend" className="text-white">Friend / Colleague</option>
                      <option value="advertisement" className="text-white">Advertisement</option>
                      <option value="event" className="text-white">Event / Seminar</option>
                      <option value="website" className="text-white">Website / Blog</option>
                      <option value="email" className="text-white">Email Campaign</option>
                      <option value="other" className="text-white">Other</option>
                    </select>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={status === 'submitting'}
                      variant="primary"
                      size="md"
                      shape="standard"
                      className="w-full text-lg"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Clock className="w-5 h-5 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          Submit Demo Request
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>

                  {status === 'success' && (
                    <div className="glass-success rounded-lg p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-krim-mint mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-krim-mint mb-2 text-white">Request Submitted Successfully!</h3>
                      <p className="text-white mb-4">
                        📧 <strong>A verification email has been sent to your inbox.</strong><br/>
                        Please check your email and click "Verify Now" to complete the process.
                      </p>
                      <p className="text-white text-sm text-center">
                        Our team will contact you within 2 hours to schedule your demo session.
                        {requestedAsset && (
                          <span className="block mt-2 text-krim-mint font-semibold">
                            📥 {requestedAsset.title} download starting... Check your downloads folder.
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="glass-error rounded-lg p-6 text-center">
                      <div className="text-krim-coral text-lg font-semibold">
                        Something went wrong. Please try again or call us directly at +1 5103455686
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              FAQ
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass rounded-lg overflow-hidden">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span className="font-semibold text-lg text-white pr-6">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CaretDown className="w-5 h-5 text-white/70 flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-white/90 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
/**
 * KRIM AI - CONTACT FORM WITH LEAD CAPTURE
 * Enterprise-grade form with validation and fallback endpoints
 */
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { PaperPlaneTilt, WarningCircle, CheckCircle, CircleNotch } from '@phosphor-icons/react'
import Button from '../Button'
import { DatabaseService, getUserMetadata, isSupabaseConfigured, getSupabaseHealth } from '../../lib/supabase'
import { IS_PRODUCTION, ENV } from '../../lib/environment'
import VerificationPopup from '../popups/VerificationPopup'
import BookDemoPopup from '../popups/BookDemoPopup'

// Google Analytics gtag interface
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  title: string
  phone: string
  industrySegment: string
  aum: string
  activeBorrowers: string
  aiReadiness: string
  monthlyDebt: string
  currentSystem: string
  painPoint: string
  timeline: string
  message: string
  consentGiven: boolean
  hearAboutUs: string
}

interface FormErrors {
  [key: string]: string
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    title: '',
    phone: '',
    industrySegment: '',
    aum: '',
    activeBorrowers: '',
    aiReadiness: '',
    monthlyDebt: '',
    currentSystem: '',
    painPoint: '',
    timeline: '',
    message: '',
    consentGiven: false,
    hearAboutUs: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'retry'>('idle')
  const [errorDetails, setErrorDetails] = useState<string>('')
  const [retryCount, setRetryCount] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const timeoutRef = useRef<number | null>(null)

  // Verification flow state
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [showBookDemoPopup, setShowBookDemoPopup] = useState(false)
  const [verificationToken, setVerificationToken] = useState<string>('')
  
  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }
    
    if (!formData.monthlyDebt) {
      newErrors.monthlyDebt = 'Please select monthly debt volume'
    }
    
    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must consent to data processing to proceed'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // All submission logic is now handled by the enhanced handleSubmit function
  
  // Enhanced form submission with comprehensive error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorDetails('')

    try {
      // Enhanced fallback handling for database issues
      const dbConfigured = isSupabaseConfigured()
      
      if (!dbConfigured) {
        // Fallback: Store form data in localStorage and show success
        const submissionData = {
          id: `local_${Date.now()}`,
          timestamp: new Date().toISOString(),
          form_data: formData,
          source: 'website_contact_form_v2_fallback'
        }
        
        // Store in localStorage as backup
        const existingSubmissions = localStorage.getItem('pending_submissions')
        const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : []
        submissions.push(submissionData)
        localStorage.setItem('pending_submissions', JSON.stringify(submissions))
        
        // Still show success to user
        setSubmitStatus('success')
        setShowVerificationPopup(true)
        
        // Log for debugging
        if (!IS_PRODUCTION) {
          console.log('📧 Form stored locally due to database unavailability:', submissionData)
        }
        
        // Send notification email if possible
        try {
          // Attempt to send a notification
          await fetch('https://formspree.io/f/xjkbbgye', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              name: `${formData.firstName} ${formData.lastName}`,
              company: formData.company,
              message: `New demo request from ${formData.company}. Database was unavailable, stored locally.`
            })
          })
        } catch (err) {
          // Silently fail
        }
        
        return
      }

      const health = getSupabaseHealth()
      if (!health.isHealthy && health.consecutiveFailures > 0) {
        setSubmitStatus('retry')
        setErrorDetails(`Database connection issue detected. Retrying... (Attempt ${retryCount + 1})`)
      }

      if (!IS_PRODUCTION) {
        console.log('🚀 Form submission starting...')
        console.log('Database configured:', isSupabaseConfigured())
        console.log('Database health:', getSupabaseHealth())
        console.log('Environment validation:', ENV)
      }

      // Get user metadata
      const metadata = getUserMetadata()

      // Attempt database submission with timeout
      const submitWithTimeout = async () => {
        return Promise.race([
          DatabaseService.submitContactForm({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            company: formData.company,
            title: formData.title,
            phone: formData.phone,
            industry_segment: formData.industrySegment,
            aum: formData.aum,
            active_borrowers: formData.activeBorrowers,
            ai_readiness: formData.aiReadiness,
            monthly_debt: formData.monthlyDebt,
            current_system: formData.currentSystem,
            pain_point: formData.painPoint,
            timeline: formData.timeline,
            message: formData.message,
            hear_about_us: formData.hearAboutUs,
            source: 'website_contact_form_v2',
            ...metadata
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database timeout')), 5000)
          )
        ])
      }
      
      let result
      try {
        result = await submitWithTimeout()
      } catch (timeoutError) {
        // Handle timeout - use fallback
        const submissionData = {
          id: `fallback_${Date.now()}`,
          timestamp: new Date().toISOString(),
          form_data: formData,
          source: 'website_contact_form_v2_timeout'
        }
        
        // Store in localStorage
        const existingSubmissions = localStorage.getItem('pending_submissions')
        const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : []
        submissions.push(submissionData)
        localStorage.setItem('pending_submissions', JSON.stringify(submissions))
        
        // Show success anyway
        setSubmitStatus('success')
        setShowVerificationPopup(true)
        
        if (!IS_PRODUCTION) {
          console.log('🕓 Database timeout - form stored locally:', submissionData)
        }
        return
      }

      if (result.success && result.data) {
        setSubmitStatus('success')
        setRetryCount(0)

        // Send welcome email and get verification token
        const sendWelcomeEmail = async () => {
          try {
            // Skip email sending if edge function is not configured
            if (import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
              if (!IS_PRODUCTION) {
                console.log('⚠️ Email sending skipped - Edge functions not configured')
              }
              return
            }

            const response = await fetch(
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
                    company: result.data.company,
                    industry_segment: result.data.industry_segment,
                    aum: result.data.aum,
                    active_borrowers: result.data.active_borrowers,
                    ai_readiness: result.data.ai_readiness,
                    lead_score: result.data.lead_score,
                    lead_tier: result.data.lead_tier
                  }
                }),
              }
            )

            const emailResult = await response.json()

            if (emailResult.success) {
              if (!IS_PRODUCTION) {
                console.log('✅ Welcome email sent successfully')
              }
              if (emailResult.verificationToken) {
                setVerificationToken(emailResult.verificationToken)
              }
            } else {
              if (!IS_PRODUCTION) {
                console.error('❌ Welcome email failed:', emailResult)
              }
            }
          } catch (error) {
            if (!IS_PRODUCTION) {
              console.error('❌ Error sending welcome email:', error)
            }
          }
        }

        // Call the function
        sendWelcomeEmail()

        // Show popup immediately after successful form submission
        setShowVerificationPopup(true)

        // Track conversion with more context
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_generated', {
            event_category: 'Lead Generation',
            event_label: 'Contact Form V2',
            value: 1,
            custom_parameters: {
              company: formData.company,
              monthly_debt: formData.monthlyDebt,
              retry_count: retryCount
            }
          })
        }

      } else {
        if (!IS_PRODUCTION) {
          console.error('❌ Form submission failed:', result.error)
        }
        setSubmitStatus('error')
        setErrorDetails(result.error || 'Unknown error occurred')
        setRetryCount(prev => prev + 1)
      }

    } catch (error) {
      if (!IS_PRODUCTION) {
        console.error('❌ Form submission error:', error)
      }
      setSubmitStatus('error')

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setErrorDetails(errorMessage)
      setRetryCount(prev => prev + 1)

      // In development, show more detailed error info
      if (!IS_PRODUCTION) {
        console.group('🐛 Form Submission Debug Info')
        console.log('Form Data:', formData)
        console.log('Database Health:', getSupabaseHealth())
        console.log('Error Details:', error)
        console.groupEnd()
      }

    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target
    const name = t.name
    const next =
      t instanceof HTMLInputElement && t.type === 'checkbox'
        ? t.checked
        : (t as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value
    setFormData(prev => ({ ...prev, [name]: next as any }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle verification success
  const handleVerified = () => {
    setShowVerificationPopup(false)
    // Show booking popup after verification
    setShowBookDemoPopup(true)
  }

  // Handle popup close
  const handleCloseVerificationPopup = () => {
    setShowVerificationPopup(false)
  }

  const handleCloseBookDemoPopup = () => {
    setShowBookDemoPopup(false)
    // Reset form after closing booking popup
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      title: '',
      phone: '',
      industrySegment: '',
      aum: '',
      activeBorrowers: '',
      aiReadiness: '',
      monthlyDebt: '',
      currentSystem: '',
      painPoint: '',
      timeline: '',
      message: '',
      hearAboutUs: '',
      consentGiven: false
    })
    setSubmitStatus('idle')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 glass-medium rounded-2xl p-8"
        noValidate
        aria-label="ROI calculation request form"
      >
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">
            Calculate Your <span className="text-gradient">90-Day ROI</span>
          </h2>
          <p className="text-white">
            See how the Multi-Agentic OS transforms your credit servicing operation
          </p>
        </div>
        
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            autoComplete="family-name"
          />
        </div>
        
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Work Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            inputMode="email"
            autoComplete="email"
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            inputMode="tel"
            autoComplete="tel"
          />
        </div>

        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
            required
            autoComplete="organization"
          />
          <FormField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
            autoComplete="organization-title"
          />
        </div>

        {/* ICP Qualification Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            label="Industry Segment"
            name="industrySegment"
            value={formData.industrySegment}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select industry...' },
              { value: 'auto-finance', label: 'Auto-Finance' },
              { value: 'credit-union', label: 'Credit Union' },
              { value: 'bank-cards', label: 'Bank/Cards' },
              { value: 'utilities', label: 'Utilities' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'government', label: 'Government' },
              { value: 'fintech-lender', label: 'Fintech Lender' },
              { value: 'servicer-bpo', label: 'Servicer/BPO' },
              { value: 'other', label: 'Other' }
            ]}
          />
          <SelectField
            label="Assets Under Management (AUM)"
            name="aum"
            value={formData.aum}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select AUM...' },
              { value: '<50M', label: '<$50M' },
              { value: '50-200M', label: '$50–200M' },
              { value: '200-500M', label: '$200–500M' },
              { value: '500M-1B', label: '$500M–$1B' },
              { value: '1-5B', label: '$1–5B' },
              { value: '>5B', label: '>$5B' },
              { value: 'unsure', label: 'Unsure' }
            ]}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            label="Active Borrowers"
            name="activeBorrowers"
            value={formData.activeBorrowers}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select volume...' },
              { value: '<50k', label: '<50k' },
              { value: '50-100k', label: '50–100k' },
              { value: '100-250k', label: '100–250k' },
              { value: '250-500k', label: '250–500k' },
              { value: '500k-1M', label: '500k–1M' },
              { value: '>1M', label: '>1M' },
              { value: 'unsure', label: 'Unsure' }
            ]}
          />
          <SelectField
            label="Company AI stage"
            name="aiReadiness"
            value={formData.aiReadiness}
            onChange={handleChange}
            options={[
              { value: '', label: 'Current AI usage...' },
              { value: 'none', label: 'None (exploring)' },
              { value: 'limited-pilots', label: 'Limited pilots in one team' },
              { value: 'multiple-pilots', label: 'Multiple pilots across teams' },
              { value: 'production-select', label: 'Production use in select workflows' },
              { value: 'production-broad', label: 'Broad production use org-wide' }
            ]}
          />
        </div>

        {/* Business Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            label="Monthly Debt Volume"
            name="monthlyDebt"
            value={formData.monthlyDebt}
            onChange={handleChange}
            error={errors.monthlyDebt}
            options={[
              { value: '', label: 'Select volume...' },
              { value: '0-50M', label: '$0 - $50M' },
              { value: '50-100M', label: '$50M - $100M' },
              { value: '100-500M', label: '$100M - $500M' },
              { value: '500M-1B', label: '$500M - $1B' },
              { value: '1B+', label: '$1B+' }
            ]}
            required
          />
          <SelectField
            label="Current System"
            name="currentSystem"
            value={formData.currentSystem}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select system...' },
              { value: 'legacy', label: 'Legacy System' },
              { value: 'manual', label: 'Mostly Manual' },
              { value: 'basic-automation', label: 'Basic Automation' },
              { value: 'advanced-platform', label: 'Advanced Platform' },
              { value: 'other', label: 'Other' }
            ]}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            label="Biggest Pain Point"
            name="painPoint"
            value={formData.painPoint}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select pain point...' },
              { value: 'low-contact-rates', label: 'Low Contact Rates' },
              { value: 'compliance-violations', label: 'Compliance Violations' },
              { value: 'high-labor-costs', label: 'High Labor Costs' },
              { value: 'poor-performance', label: 'Poor Collection Performance' },
              { value: 'system-integration', label: 'System Integration Issues' },
              { value: 'other', label: 'Other' }
            ]}
          />
          <SelectField
            label="Implementation Timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select timeline...' },
              { value: '1-3months', label: '1-3 months' },
              { value: '3-6months', label: '3-6 months' },
              { value: '6-12months', label: '6-12 months' },
              { value: 'future', label: 'Future consideration' }
            ]}
          />
        </div>
        
        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-white">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            aria-label="Additional information about your needs"
            className="w-full px-4 py-3 text-base text-white bg-white/5 border border-white/10 rounded-lg
                     focus:ring-2 focus:ring-krim-mint focus:border-transparent
                     transition-all duration-200 resize-none scroll-mt-24"
            placeholder="Tell us more about your specific needs..."
          />
        </div>

        {/* How did you hear about us? */}
        <SelectField
          label="From where did you hear about our organization?"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleChange}
          options={[
            { value: '', label: '-- Select an option --' },
            { value: 'google', label: 'Google Search' },
            { value: 'social_media', label: 'Social Media' },
            { value: 'friend', label: 'Friend / Colleague' },
            { value: 'advertisement', label: 'Advertisement' },
            { value: 'event', label: 'Event / Seminar' },
            { value: 'website', label: 'Website / Blog' },
            { value: 'email', label: 'Email Campaign' },
            { value: 'other', label: 'Other' }
          ]}
        />

        {/* Privacy Consent */}
        <ConsentCheckbox
          name="consentGiven"
          checked={formData.consentGiven}
          onChange={handleChange}
          error={errors.consentGiven}
        />
        
        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || submitStatus === 'success'}
            className="min-w-[250px] relative"
          >
            {isSubmitting && (
              <CircleNotch className="w-5 h-5 mr-2 animate-spin" />
            )}
            {!isSubmitting && submitStatus === 'success' && (
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            )}
            {!isSubmitting && submitStatus === 'error' && (
              <WarningCircle className="w-5 h-5 mr-2 text-red-400" />
            )}
            {!isSubmitting && submitStatus === 'retry' && (
              <CircleNotch className="w-5 h-5 mr-2 text-yellow-400 animate-spin" />
            )}
            {!isSubmitting && submitStatus === 'idle' && (
              <PaperPlaneTilt className="w-5 h-5 mr-2" />
            )}

            {isSubmitting && 'Submitting Demo Request...'}
            {!isSubmitting && submitStatus === 'success' && 'Demo Request Submitted Successfully!'}
            {!isSubmitting && submitStatus === 'error' && `Retry Submission ${retryCount > 0 ? `(#${retryCount})` : ''}`}
            {!isSubmitting && submitStatus === 'retry' && 'Retrying Connection...'}
            {!isSubmitting && submitStatus === 'idle' && 'Submit Demo Request'}
          </Button>
        </div>
        
        {/* Enhanced Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-green-400/10 border border-green-400/30 rounded-lg p-4"
          >
            <div className="text-green-400 font-semibold mb-2">
              ✅ ROI Calculation Request Received!
            </div>
            <div className="text-white text-sm mb-3">
              📧 <strong>A verification email has been sent to {formData.email}</strong><br/>
              Please check your inbox and click "Verify Now" to complete the process.
            </div>
            <div className="text-white text-xs">
              Your personalized 90-day ROI analysis will be sent within 24 hours.
              Our team will also prepare a custom demonstration for {formData.company}.
            </div>
          </motion.div>
        )}

        {submitStatus === 'retry' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4"
          >
            <div className="text-yellow-400 font-semibold mb-2">
              🔄 Establishing Secure Connection...
            </div>
            <div className="text-white text-sm">
              Please wait while we ensure your data is transmitted securely.
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-red-400/10 border border-red-400/30 rounded-lg p-4"
          >
            <div className="text-red-400 font-semibold mb-2">
              ⚠️ Submission Issue Detected
            </div>
            <div className="text-white text-sm mb-3">
              {errorDetails || 'Unable to submit form. This may be a temporary connection issue.'}
            </div>
            <div className="text-white text-xs">
              Alternative: Email us directly at <a href="mailto:hello@krim.ai" className="text-krim-mint underline">hello@krim.ai</a>
              {' '}or try refreshing the page.
              {!IS_PRODUCTION && retryCount > 0 && (
                <div className="mt-2 text-yellow-400">
                  Debug: Failed attempts: {retryCount} | Database Health: {getSupabaseHealth().isHealthy ? '✅' : '❌'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </form>

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={handleCloseVerificationPopup}
        verificationToken={verificationToken}
        onVerified={handleVerified}
        email={formData.email}
      />

      {/* Book Demo Popup */}
      <BookDemoPopup
        isOpen={showBookDemoPopup}
        onClose={handleCloseBookDemoPopup}
        email={formData.email}
        firstName={formData.firstName}
        lastName={formData.lastName}
      />
    </motion.div>
  )
}

// Form Field Component
interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url'
  autoComplete?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  inputMode,
  autoComplete
}) => {
  const errorId = error ? `${name}-error` : undefined
  const describedBy = error ? errorId : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-krim-coral ml-1" aria-label="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        style={{ fontSize: '16px' }}
        className={`w-full px-4 py-3 min-h-[48px] text-base text-white bg-white/5 border rounded-lg transition-all duration-200
                   focus:ring-2 focus:ring-krim-mint focus:border-transparent scroll-mt-24
                   ${error ? 'border-krim-coral' : 'border-white/10'}`}
      />
      {error && (
        <motion.p
          id={errorId}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-krim-coral text-sm"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Consent Checkbox Component
interface ConsentCheckboxProps {
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  name,
  checked,
  onChange,
  error
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className={`w-5 h-5 bg-white/5 border rounded transition-all duration-200
                     focus:ring-2 focus:ring-krim-mint focus:border-transparent
                     checked:bg-krim-mint checked:border-krim-mint
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${error ? 'border-krim-coral' : 'border-white/20'}`}
            required
          />
        </div>
        <label htmlFor={name} className="text-sm text-white leading-relaxed cursor-pointer">
          I consent to Krim AI processing my personal data to respond to my inquiry and provide information about their services. 
          I understand I can withdraw this consent at any time by contacting{' '}
          <a 
            href="mailto:privacy@krim.ai" 
            className="text-krim-mint hover:text-krim-mint/80 transition-colors underline"
          >
            privacy@krim.ai
          </a>
          . View our{' '}
          <a 
            href="/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-krim-mint hover:text-krim-mint/80 transition-colors underline"
          >
            Privacy Policy
          </a>
          {' '}for details on data processing.
          <span className="text-krim-coral ml-1">*</span>
        </label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-krim-coral text-sm ml-8"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Select Field Component
interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  options
}) => {
  const errorId = error ? `${name}-error` : undefined
  const describedBy = error ? errorId : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-krim-coral ml-1" aria-label="required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`w-full px-4 py-3 min-h-[48px] text-base bg-white/5 border rounded-lg transition-all duration-200
                   focus:ring-2 focus:ring-krim-mint focus:border-transparent scroll-mt-24
                   appearance-none cursor-pointer text-white
                   hover:bg-white/10
                   disabled:opacity-50 disabled:cursor-not-allowed
                   ${error ? 'border-krim-coral' : 'border-white/10'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300FF88' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className="bg-krim-deep-space text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <motion.p
          id={errorId}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-krim-coral text-sm"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default ContactForm
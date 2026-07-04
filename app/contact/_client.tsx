'use client'

/**
 * /contact client islands — DemoForm + CalendlyScheduler.
 * React-controlled (no raw <form> reload). DemoForm posts JSON to /api/demo,
 * which captures the lead in Supabase and triggers the confirmation + drip emails
 * (Resend). CalendlyScheduler is a single premium CTA that opens Calendly in a
 * new tab — the inline embed was slow and visually heavy. Inputs styled to the
 * dark theme; labels are mono eyebrows; ≥44px targets.
 */

import { useEffect, useRef, useState } from 'react'
import { Eyebrow, GlassCard } from '@/components/ui'
import Reveal from '@/components/Reveal'

// ---------------------------------------------------------------- shared styles

const FIELD =
  'h-11 w-full rounded border border-soft bg-white/[0.03] px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40'
const TEXTAREA =
  'min-h-[120px] w-full resize-y rounded border border-soft bg-white/[0.03] px-3.5 py-3 font-sans text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40'
const LABEL = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3'

// ---------------------------------------------------------------- DemoForm

const DEMO_ENDPOINT = '/api/demo'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ROLES = [
  'Risk / Credit',
  'Lending / Collections',
  'Compliance / Regulatory',
  'Operations',
  'Technology / Engineering',
  'Data / AI',
  'Executive (CEO/COO/Strategy)',
  'Government / Public sector',
  'Other',
]
const USE_CASES = [
  'Collections',
  'Underwriting / credit',
  'Onboarding / KYC',
  'Servicing',
  'Disputes / complaints',
  'Compliance reporting',
  'Other',
]
const SECTORS = [
  'Bank',
  'Non-bank lender / Fintech',
  'MSME / SME lender',
  'Government / Public sector',
  'Enterprise (other regulated)',
  'Other',
]
const REGIONS = ['US', 'UK', 'EU', 'India', 'Middle East', 'Africa', 'APAC', 'Global / multiple']
const TIMELINES = ['Just exploring', 'This quarter', 'Within 6 months', 'This year', 'Not sure yet']
const AI_STAGES = ['Not started', 'Piloting', 'In production', 'Scaling']
const HEARD = ['Search', 'Referral', 'LinkedIn / social', 'Event / conference', 'News / press', 'Other']

const EMPTY = {
  name: '',
  email: '',
  organisation: '',
  role: '',
  message: '',
  automate: '',
  sector: '',
  market: '',
  timeline: '',
  phone: '',
  ai_stage: '',
  heard_about: '',
}

type FieldKey = keyof typeof EMPTY

// ---------------------------------------------------------------- field atoms

function FieldShell({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {required && <span className="text-fail"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 font-sans text-[12px] text-fail">
          {error}
        </p>
      )}
    </div>
  )
}

function TextField(props: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  const { id, label, value, onChange, error, required, type = 'text', placeholder, autoComplete } = props
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD} ${error ? 'border-fail/70 focus:border-fail focus:ring-fail/40' : ''}`}
      />
    </FieldShell>
  )
}

function SelectField(props: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder: string
  error?: string
  required?: boolean
}) {
  const { id, label, value, onChange, options, placeholder, error, required } = props
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${FIELD} appearance-none pr-10 ${value ? 'text-ink' : 'text-ink-3'} ${error ? 'border-fail/70 focus:border-fail focus:ring-fail/40' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-surface text-ink">
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3"
        >
          ▾
        </span>
      </div>
    </FieldShell>
  )
}

export function DemoForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [fields, setFields] = useState(EMPTY)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  // true only when the API confirms the confirmation email actually went out —
  // "check your inbox" must never be a promise we didn't keep
  const [emailSent, setEmailSent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const successRef = useRef<HTMLDivElement | null>(null)

  // On success: notify the parent (which scrolls the form section into view) and
  // focus the success banner for screen readers — preventScroll so the focus
  // call doesn't fight the parent's smooth scroll.
  useEffect(() => {
    if (status !== 'success') return
    onSuccess?.()
    successRef.current?.focus({ preventScroll: true })
  }, [status, onSuccess])

  function update(key: FieldKey) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = e.target
      setFields((f) => ({ ...f, [key]: value }))
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
    }
  }

  function validate(): Partial<Record<FieldKey, string>> {
    const e: Partial<Record<FieldKey, string>> = {}
    if (!fields.name.trim()) e.name = 'Please enter your name.'
    if (!fields.email.trim()) e.email = 'Please enter your work email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) e.email = 'Enter a valid email address.'
    if (!fields.organisation.trim()) e.organisation = 'Please enter your organisation.'
    if (!fields.role) e.role = 'Please select your role.'
    if (!fields.message.trim()) e.message = 'Tell us what you’d like to solve.'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    // honeypot tripped — silently no-op (looks like success to a bot)
    if (honeypot.trim() !== '') {
      setStatus('success')
      return
    }
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      const firstKey = (Object.keys(found) as FieldKey[])[0]
      document.getElementById(`contact-${firstKey}`)?.focus()
      return
    }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _gotcha: honeypot }),
      })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        setEmailSent(!!data.emailSent)
        setStatus('success')
        setFields(EMPTY)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="py-6 text-center outline-none"
      >
        <p className="font-serif text-[1.5rem] leading-snug text-ink">
          {emailSent ? (
            <>
              Thank you. Check your inbox for a link to pick a time. We&rsquo;ll also reply within
              one business day, from <span className="text-mint">sales@krim.ai</span>.
            </>
          ) : (
            <>
              Thank you — we&rsquo;ve got your request. We&rsquo;ll reply within one business day,
              from <span className="text-mint">sales@krim.ai</span>.
            </>
          )}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      {/* honeypot — invisible to humans, catches bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" hidden>
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input
          id="contact-gotcha"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="contact-name" label="Name" required value={fields.name} onChange={update('name')} error={errors.name} placeholder="Your name" autoComplete="name" />
        <TextField id="contact-email" label="Work email" required type="email" value={fields.email} onChange={update('email')} error={errors.email} placeholder="you@company.com" autoComplete="email" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="contact-organisation" label="Organisation" required value={fields.organisation} onChange={update('organisation')} error={errors.organisation} placeholder="Company or institution" autoComplete="organization" />
        <SelectField id="contact-role" label="Role" required value={fields.role} onChange={update('role')} error={errors.role} options={ROLES} placeholder="Select your role…" />
      </div>

      <FieldShell id="contact-message" label="What would you like to solve or explore?" required error={errors.message}>
        <textarea
          id="contact-message"
          value={fields.message}
          onChange={update('message')}
          placeholder="The problem you’re trying to solve, or what you’d like to see."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${TEXTAREA} ${errors.message ? 'border-fail/70 focus:border-fail focus:ring-fail/40' : ''}`}
        />
      </FieldShell>

      {/* optional — helps us tailor the demo */}
      <div className="mt-1 flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Optional, helps us tailor your demo
        </span>
        <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="contact-automate" label="Primary use case" value={fields.automate} onChange={update('automate')} options={USE_CASES} placeholder="Select…" />
        <SelectField id="contact-sector" label="Sector" value={fields.sector} onChange={update('sector')} options={SECTORS} placeholder="Select…" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="contact-market" label="Region / market" value={fields.market} onChange={update('market')} options={REGIONS} placeholder="Select…" />
        <SelectField id="contact-timeline" label="Timeline" value={fields.timeline} onChange={update('timeline')} options={TIMELINES} placeholder="Select…" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="contact-phone" label="Phone" type="tel" value={fields.phone} onChange={update('phone')} placeholder="Optional" autoComplete="tel" />
        <SelectField id="contact-ai_stage" label="Current AI maturity" value={fields.ai_stage} onChange={update('ai_stage')} options={AI_STAGES} placeholder="Select…" />
      </div>

      <SelectField id="contact-heard_about" label="How did you hear about us?" value={fields.heard_about} onChange={update('heard_about')} options={HEARD} placeholder="Select…" />

      {status === 'error' && (
        <p role="alert" className="font-sans text-[14px] text-gold">
          Something went wrong. Email{' '}
          <a href="mailto:sales@krim.ai" className="underline underline-offset-4 hover:text-mint">
            sales@krim.ai
          </a>{' '}
          or call{' '}
          <a href="tel:+15103455686" className="underline underline-offset-4 hover:text-mint">
            +1 510 345 5686
          </a>
          .
        </p>
      )}

      <div className="mt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:hover:translate-y-0"
        >
          {status === 'submitting' ? 'Sending…' : 'Book a demo'}
        </button>
      </div>

      <p className="mt-1 font-sans text-caption leading-relaxed text-ink-3">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline decoration-soft underline-offset-2 transition-colors hover:text-ink-2">
          Privacy Policy
        </a>
        . Please don&rsquo;t include confidential or customer data in your message.
      </p>
    </form>
  )
}

// ---------------------------------------------------------------- ContactFormSection

/**
 * Wraps the heading + form together so the heading can swap on submit. Before
 * submission: "What are you trying to solve?" After: "Look forward to exploring
 * further." On success it smooth-scrolls the section into view so the new
 * heading + thank-you message land together, not stranded at the bottom of the
 * page where the submit button used to be.
 */
export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!submitted) return
    const node = sectionRef.current
    if (!node) return
    const targetY = window.scrollY + node.getBoundingClientRect().top - 40
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
  }, [submitted])

  return (
    <>
      <Reveal>
        <div ref={sectionRef} className="text-center">
          <Eyebrow>Book a demo</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            {submitted ? 'Look forward to exploring further.' : 'What are you trying to solve?'}
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <GlassCard className="mt-10 p-7 md:p-10">
          <DemoForm onSuccess={() => setSubmitted(true)} />
        </GlassCard>
      </Reveal>
    </>
  )
}

// ---------------------------------------------------------------- CalendlyScheduler

const CALENDLY_BASE = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/louis-oliphant-parkinson/krim-demo'

// A single, premium call-to-action that opens Calendly in a new tab. We dropped
// the inline embed: it loaded slowly, dominated the page, and didn't fit the dark
// glass aesthetic. The button is the whole experience — a glass panel with a clear
// invitation, the named slot length, and a confident primary action.
export function CalendlyScheduler() {
  if (!CALENDLY_BASE) {
    return (
      <div className="glass mx-auto max-w-[520px] p-9 text-center md:p-10">
        <p className="font-sans text-body text-ink-2">
          Scheduling is just an email away. Reach us at{' '}
          <a
            href="mailto:sales@krim.ai"
            className="text-mint underline-offset-4 hover:underline"
          >
            sales@krim.ai
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="glass mx-auto max-w-[520px] p-9 text-center md:p-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mint">
        30-minute slot
      </p>
      <a
        href={CALENDLY_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-mint px-8 py-3.5 font-sans text-[15px] font-medium text-on-mint shadow-[0_10px_30px_-12px_rgba(0,255,178,0.55)] transition-all duration-fast ease-standard hover:-translate-y-0.5 hover:bg-mint-bright hover:shadow-[0_14px_40px_-12px_rgba(0,255,178,0.7)] motion-reduce:hover:translate-y-0"
      >
        <span>Open the calendar</span>
        <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">
          →
        </span>
      </a>
      <p className="mt-5 font-sans text-[13px] text-ink-3">Opens in a new tab.</p>
    </div>
  )
}

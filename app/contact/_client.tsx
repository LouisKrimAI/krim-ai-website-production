'use client'

/**
 * /contact client islands — DemoForm + CalendlyScheduler.
 * React-controlled (no raw <form> reload). DemoForm posts JSON to /api/demo,
 * which captures the lead in Supabase and triggers the confirmation + drip emails
 * (Resend). CalendlyScheduler renders the Calendly inline embed, themed to the
 * dark glass palette, with a visible new-tab fallback. Inputs styled to the dark
 * theme; labels are mono eyebrows; ≥44px targets.
 */

import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------- shared styles

const FIELD =
  'h-11 w-full rounded border border-soft bg-white/[0.03] px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40'
const TEXTAREA =
  'min-h-[120px] w-full resize-y rounded border border-soft bg-white/[0.03] px-3.5 py-3 font-sans text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40'
const LABEL = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3'

// ---------------------------------------------------------------- DemoForm

const DEMO_ENDPOINT = '/api/demo'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY = {
  name: '',
  email: '',
  organisation: '',
  role: '',
  market: 'US',
  automate: '',
  message: '',
}

export function DemoForm() {
  const [fields, setFields] = useState(EMPTY)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function update(key: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    // honeypot tripped — silently no-op (looks like success to a bot)
    if (honeypot.trim() !== '') {
      setStatus('success')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _gotcha: honeypot }),
      })
      if (res.ok) {
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
      <div role="status" className="py-6 text-center">
        <p className="font-serif text-[1.5rem] leading-snug text-ink">
          Thank you — check your inbox for a link to pick a time. We&rsquo;ll also reply within one
          business day, from <span className="text-mint">sales@krim.ai</span>.
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
        <div>
          <label htmlFor="contact-name" className={LABEL}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={update('name')}
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={update('email')}
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-organisation" className={LABEL}>
            Organisation
          </label>
          <input
            id="contact-organisation"
            name="organisation"
            type="text"
            required
            autoComplete="organization"
            value={fields.organisation}
            onChange={update('organisation')}
            placeholder="Company or institution"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="contact-role" className={LABEL}>
            Role
          </label>
          <input
            id="contact-role"
            name="role"
            type="text"
            value={fields.role}
            onChange={update('role')}
            placeholder="Your title"
            className={FIELD}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-market" className={LABEL}>
            Market
          </label>
          <select
            id="contact-market"
            name="market"
            value={fields.market}
            onChange={update('market')}
            className={`${FIELD} appearance-none`}
          >
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="India">India</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-automate" className={LABEL}>
            What you&rsquo;d like to automate
          </label>
          <input
            id="contact-automate"
            name="automate"
            type="text"
            value={fields.automate}
            onChange={update('automate')}
            placeholder="e.g. collections, onboarding…"
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={fields.message}
          onChange={update('message')}
          placeholder="Tell us what you're trying to solve."
          className={TEXTAREA}
        />
      </div>

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
    </form>
  )
}

// ---------------------------------------------------------------- CalendlyScheduler

const CALENDLY_BASE = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

// Theme the inline widget to the dark glass palette (hex without '#').
function calendlyUrl(base: string): string {
  if (!base) return ''
  const sep = base.includes('?') ? '&' : '?'
  const params = new URLSearchParams({
    hide_event_type_details: '0',
    hide_gdpr_banner: '1',
    background_color: '09090c',
    text_color: 'f6f6f4',
    primary_color: '00ffb2',
  })
  return `${base}${sep}${params.toString()}`
}

export function CalendlyScheduler() {
  const initialised = useRef(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    CALENDLY_BASE ? 'loading' : 'error',
  )

  const fullUrl = calendlyUrl(CALENDLY_BASE)

  useEffect(() => {
    if (!CALENDLY_BASE || initialised.current) return
    initialised.current = true
    let done = false

    function init() {
      const Calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: object) => void } })
        .Calendly
      const parent = document.getElementById('calendly-inline')
      if (!Calendly || !parent) {
        setStatus('error')
        return
      }
      try {
        Calendly.initInlineWidget({ url: fullUrl, parentElement: parent })
        done = true
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-calendly]')
    if (existing && (window as unknown as { Calendly?: unknown }).Calendly) {
      init()
    } else if (existing) {
      existing.addEventListener('load', init, { once: true })
    } else {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.dataset.calendly = 'true'
      script.onload = init
      script.onerror = () => setStatus('error')
      document.body.appendChild(script)
    }

    // never leave a blank box: if the embed hasn't taken over in time, show the fallback
    const timer = setTimeout(() => {
      if (!done) setStatus((s) => (s === 'ready' ? s : 'error'))
    }, 9000)
    return () => clearTimeout(timer)
  }, [fullUrl])

  return (
    <div>
      <div className="glass overflow-hidden p-2 md:p-3">
        {status !== 'ready' && (
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-5 p-8 text-center">
            {status === 'loading' ? (
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-3">
                Loading the scheduler…
              </p>
            ) : CALENDLY_BASE ? (
              <p className="max-w-[40ch] font-sans text-body text-ink-2">
                Pick a time directly — opens in a new tab.
              </p>
            ) : (
              <p className="max-w-[44ch] font-sans text-body text-ink-2">
                Scheduling is just an email away — reach us at{' '}
                <a
                  href="mailto:sales@krim.ai"
                  className="text-mint underline-offset-4 hover:underline"
                >
                  sales@krim.ai
                </a>
                .
              </p>
            )}
            {CALENDLY_BASE && (
              <a
                href={CALENDLY_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-mint px-6 py-3 font-sans text-[14px] font-medium text-on-mint transition-colors hover:bg-mint-bright"
              >
                Open scheduling →
              </a>
            )}
          </div>
        )}
        <div
          id="calendly-inline"
          style={{ minHeight: status === 'ready' ? 700 : 0, width: '100%' }}
        />
      </div>
      {status === 'ready' && CALENDLY_BASE && (
        <p className="mt-5 text-center font-sans text-[14px]">
          <a
            href={CALENDLY_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1.5 text-ink-2 transition-colors hover:text-mint"
          >
            <span className="underline-offset-4 group-hover:underline">
              Open scheduling in a new tab
            </span>
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </p>
      )}
    </div>
  )
}

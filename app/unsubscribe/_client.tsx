'use client'

/**
 * Unsubscribe confirm island. Renders a button that POSTs to /api/unsubscribe
 * (POST, so link-prefetchers can't trigger it), then shows the done state.
 */

import { useState } from 'react'
import Link from 'next/link'

export function UnsubscribeConfirm({ token }: { token: string }) {
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  async function confirm() {
    if (status === 'working') return
    setStatus('working')
    try {
      const res = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`, { method: 'POST' })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="mt-9">
        <p className="mx-auto max-w-[48ch] font-sans text-body-lg text-ink-2">
          Done. You won&rsquo;t receive demo reminders from us again. If you change your mind, the
          door&rsquo;s always open.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim motion-reduce:hover:translate-y-0"
          >
            Book a demo
          </Link>
        </div>
      </div>
    )
  }

  // No token: the link arrived incomplete (truncated by a mail client). Explain
  // instead of showing a permanently disabled button under "click below".
  if (!token) {
    return (
      <div className="mt-9">
        <p className="mx-auto max-w-[48ch] font-sans text-body-lg text-ink-2">
          This unsubscribe link is incomplete. Open the link from your email again — or just
          write to{' '}
          <a href="mailto:sales@krim.ai" className="underline underline-offset-4 hover:text-mint">
            sales@krim.ai
          </a>{' '}
          and we&rsquo;ll take you off the list ourselves.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-9">
      <p className="mx-auto max-w-[48ch] font-sans text-body-lg text-ink-2">
        Click below and we&rsquo;ll stop sending you reminders about booking a Krim demo.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={confirm}
          disabled={status === 'working' || !token}
          className="inline-block rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:bg-mint-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-mint-dim disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:hover:translate-y-0"
        >
          {status === 'working' ? 'Unsubscribing…' : 'Unsubscribe me'}
        </button>
        {status === 'error' && (
          <p role="alert" className="font-sans text-[14px] text-gold">
            Something went wrong. Email{' '}
            <a href="mailto:sales@krim.ai" className="underline underline-offset-4 hover:text-mint">
              sales@krim.ai
            </a>{' '}
            and we&rsquo;ll take care of it.
          </p>
        )}
      </div>
    </div>
  )
}

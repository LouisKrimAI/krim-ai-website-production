'use client'

import { useEffect, useState } from 'react'

export default function UpdateBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const buildId = (window as any).__NEXT_DATA__?.buildId
    if (!buildId) return

    const check = async () => {
      // don't wake the radio for background tabs — the visibilitychange
      // listener below re-checks the moment the tab is foregrounded
      if (document.hidden) return
      try {
        const res = await fetch(`/_next/static/${buildId}/_buildManifest.js`, {
          cache: 'no-store',
        })
        if (!res.ok) setShow(true)
      } catch {}
    }

    // Check on mount and every 3 minutes
    check()
    const id = setInterval(check, 3 * 60 * 1000)
    const onVisible = () => { if (!document.hidden) check() }
    document.addEventListener('visibilitychange', onVisible)

    // bfcache: Chrome can restore a frozen page without re-mounting React.
    // The pageshow event fires on every restore; e.persisted=true means bfcache.
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) check() }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      clearInterval(id)
      window.removeEventListener('pageshow', onPageShow)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-4 rounded-full px-5 py-3 text-sm shadow-2xl"
      style={{
        background: 'rgba(10,11,15,0.96)',
        backdropFilter: 'blur(16px) saturate(120%)',
        WebkitBackdropFilter: 'blur(16px) saturate(120%)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <span className="font-sans text-[13px] text-ink-2">A newer version is available.</span>
      <button
        onClick={() => window.location.reload()}
        className="rounded-full bg-mint px-4 py-1.5 font-sans text-[12px] font-semibold text-black transition-opacity hover:opacity-85"
      >
        Refresh
      </button>
    </div>
  )
}

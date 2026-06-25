'use client'

/**
 * BackdropGate — holds a cluster's page text until its fixed backdrop has
 * rendered, then reveals it (KrimOS: background → text; Research: background →
 * orb → text).
 *
 * It marks <html data-cluster="…"> for the active route and adds data-bg-ready
 * once the backdrop signals (or a safety timeout fires). globals.css fades the
 * page <main> in off those attributes. The pre-paint inline script in the layout
 * sets the initial data-cluster so there is no flash on first load; this runs the
 * client-side updates (navigation + the ready flag) in a layout effect so an
 * in-site navigation doesn't flash either. Renders nothing.
 */

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isBackdropReady, subscribeBackdropReady, type Cluster } from '@/lib/backdropReady'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function clusterFor(p: string): '' | Cluster {
  if (p.startsWith('/krimos')) return 'platform'
  if (p === '/research' || p.startsWith('/research/') || p === '/epistemic-ai') return 'research'
  return ''
}

export default function BackdropGate() {
  const pathname = usePathname()

  useIso(() => {
    const el = document.documentElement
    const cluster = clusterFor(pathname || '')
    if (cluster) el.setAttribute('data-cluster', cluster)
    else el.removeAttribute('data-cluster')
    el.removeAttribute('data-bg-ready')
    if (!cluster) return

    let done = false
    const reveal = () => { if (!done) { done = true; el.setAttribute('data-bg-ready', '') } }
    if (isBackdropReady(cluster)) { reveal(); return }
    const unsub = subscribeBackdropReady(cluster, reveal)
    const t = window.setTimeout(reveal, 4000) // safety net — never strand the text
    return () => { unsub(); window.clearTimeout(t) }
  }, [pathname])

  return null
}

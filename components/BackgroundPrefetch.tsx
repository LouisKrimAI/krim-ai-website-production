'use client'

/**
 * BackgroundPrefetch — warms the other clusters' backdrop images in the
 * background so moving between sections is instant.
 *
 * Ten seconds after landing on any page (the user has clearly settled), and only
 * when the browser is idle, it quietly fetches the Research lab plate and the
 * KrimOS layers render into cache. By the time someone navigates to those
 * clusters the <img> src is a cache hit and the background is already perfectly
 * rendered — no flash, no orb-before-room. Skipped on data-saver / very slow
 * connections. Renders nothing.
 */

import { useEffect } from 'react'

// The heavy, fixed full-bleed backdrops worth pre-warming (each tiny WebPs).
const BACKDROPS = [
  '/images/research/research-stage.webp',
  '/images/krimos/neural-stack-3.webp',
]

export default function BackgroundPrefetch() {
  useEffect(() => {
    // Respect the user's bandwidth: skip on Save-Data or 2g-class connections.
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return

    const warm = () => {
      const run = () => {
        for (const href of BACKDROPS) {
          const img = new Image()
          img.decoding = 'async'
          img.src = href
        }
      }
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      if (ric) ric(run)
      else run()
    }

    const t = setTimeout(warm, 10000)
    return () => clearTimeout(t)
  }, [])

  return null
}

'use client'

/**
 * ArrivalBoot — closes the one-time arrival window just after the first paint, so
 * the homepage hero and the woven ring play their build-up only on a fresh
 * document load (see lib/arrival). Renders nothing. Mounted once in the root
 * layout; the rAF defer guarantees it runs after every initial-mount arrival read.
 */

import { useEffect } from 'react'
import { markBooted } from '@/lib/arrival'

export default function ArrivalBoot() {
  useEffect(() => {
    const id = requestAnimationFrame(() => markBooted())
    return () => cancelAnimationFrame(id)
  }, [])
  return null
}

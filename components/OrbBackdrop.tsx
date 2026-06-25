'use client'

/**
 * OrbBackdrop — retired in favour of the shared WovenRingBackdrop, which is
 * root-mounted in app/layout.tsx and gated to every route except the /krimos
 * cluster and the research routes. Kept as a no-op so the interior pages that
 * still import it keep compiling; the stray <OrbBackdrop /> tags can be removed
 * in a later cleanup pass.
 */

export default function OrbBackdrop(_props: { opacity?: number } = {}) {
  return null
}

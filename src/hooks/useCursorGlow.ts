/**
 * KRIM AI - CURSOR GLOW HOOK
 * Tracks mouse position for cursor-following glow effect
 */
import { useState, useEffect } from 'react'

export function useCursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}

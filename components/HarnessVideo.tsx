'use client'

/**
 * HarnessVideo — reusable canvas luma-key player.
 *
 * Plays the harness orb video off-screen; each frame is drawn to a canvas
 * with per-pixel alpha = max(R,G,B) × 1.6. Black → transparent. Glowing
 * sphere → fully opaque. No rectangular container visible.
 *
 * Usage: drop anywhere — the video is lazy-loaded via IntersectionObserver
 * and loops with a 1.5 s breath between plays.
 */

import { useRef, useEffect } from 'react'

interface HarnessVideoProps {
  className?: string
  maxWidth?: string
}

export default function HarnessVideo({ className = '', maxWidth = '520px' }: HarnessVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const W = 800
    const H = 450
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let rafId = 0
    let running = false
    let lastTime = -1

    const drawFrame = () => {
      if (!running) return
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime
        ctx.drawImage(video, 0, 0, W, H)
        const frame = ctx.getImageData(0, 0, W, H)
        const d = frame.data
        for (let i = 0; i < d.length; i += 4) {
          const lum = Math.max(d[i], d[i + 1], d[i + 2])
          d[i + 3] = Math.min(255, lum * 1.6)
        }
        ctx.putImageData(frame, 0, 0)
      }
      rafId = requestAnimationFrame(drawFrame)
    }

    const start = () => { running = true; rafId = requestAnimationFrame(drawFrame) }
    const stop  = () => { running = false; cancelAnimationFrame(rafId) }

    video.addEventListener('play', start)
    video.addEventListener('pause', stop)
    video.addEventListener('ended', () => {
      stop()
      setTimeout(() => video.play().catch(() => {}), 1500)
    })

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { video.play().catch(() => {}); observer.disconnect() } },
      { threshold: 0.1 },
    )
    observer.observe(canvas)

    return () => { stop(); observer.disconnect() }
  }, [])

  return (
    <div className={`relative mx-auto w-full ${className}`} style={{ maxWidth }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,255,178,0.08) 0%, rgba(57,214,255,0.04) 40%, transparent 70%)' }}
      />
      <video
        ref={videoRef}
        preload="metadata"
        muted
        playsInline
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
      >
        <source src="/videos/harness/harness-orb.webm" type="video/webm" />
        <source src="/videos/harness/harness-orb.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="relative w-full"
        style={{
          maskImage: 'radial-gradient(ellipse 84% 88% at 50% 50%, black 60%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 84% 88% at 50% 50%, black 60%, transparent 92%)',
        }}
      />
    </div>
  )
}

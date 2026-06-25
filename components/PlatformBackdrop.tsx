'use client'

/**
 * PlatformBackdrop — the KrimOS cluster's living ground.
 *
 * The "neural stack" artwork (public/images/krimos/neural-stack.jpg, 1783×2400),
 * shown as a viewport-cover stage with four soft-masked copies drifting a few px
 * out of phase (a gentle living parallax), and a #fx canvas overlay that adds the
 * rising central beam, the cyan/gold swirl strands, a brain shimmer and the plate
 * junction glints — all additive. Ported from the standalone export
 * (neural-stack-animated-background.html): image extracted to a file (not inlined),
 * DPR capped, paused while the tab is hidden, reduced-motion settles to one still
 * frame, rAF + listeners cleaned up. Held under a scrim so the nav, hero and footer
 * stay legible. Fixed behind every /platform page.
 */

import { useEffect, useRef } from 'react'

const SRC = '/images/krimos/neural-stack.jpg'

export default function PlatformBackdrop() {
  const stageRef = useRef<HTMLDivElement>(null)
  const fxRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const cv = fxRef.current
    if (!stage || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const IW = 1783, IH = 2400, AR = IW / IH
    let SW = 0, SH = 0, DPR = 1
    function layout() {
      const vw = window.innerWidth, vh = window.innerHeight
      const scale = Math.min(vw / IW, vh / IH) // contain — show the whole artwork
      SW = IW * scale; SH = IH * scale
      stage!.style.width = SW + 'px'
      stage!.style.height = SH + 'px'
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      cv!.width = Math.round(SW * DPR)
      cv!.height = Math.round(SH * DPR)
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    window.addEventListener('resize', layout)
    layout()

    const X = (fx: number) => fx * SW
    const Y = (fy: number) => fy * SH

    const BEAM = 0.503
    const J = { brain: 0.13, top: 0.205, cyan: 0.355, gold: 0.54, base: 0.73 }

    type Ring = { cy: number; rx: number; ry: number; hue: string; count: number }
    const ring = (cy: number, rx: number, ry: number, hue: string, count: number): Ring => ({ cy, rx, ry, hue, count })
    const cyanRings = [ring(0.275, 0.30, 0.052, 'cy', 3), ring(0.315, 0.345, 0.060, 'cy', 3), ring(0.350, 0.30, 0.050, 'cy', 2)]
    const goldRings = [ring(0.455, 0.30, 0.050, 'go', 3), ring(0.500, 0.345, 0.058, 'go', 3), ring(0.545, 0.30, 0.048, 'go', 2)]

    const beamN = REDUCED ? 22 : 48
    const beam = Array.from({ length: beamN }, () => ({
      t: Math.random(), v: 0.05 + Math.random() * 0.12, off: (Math.random() - 0.5) * 0.012, s: 0.6 + Math.random() * 1.6,
    }))
    function makeStrand(rings: Ring[]) {
      const arr: { r: Ring; a: number; v: number; s: number }[] = []
      rings.forEach((r, ri) => {
        const n = r.count * (REDUCED ? 2 : 4)
        for (let i = 0; i < n; i++) arr.push({ r, a: Math.random() * Math.PI * 2, v: (0.34 + Math.random() * 0.30) * (ri % 2 ? -1 : 1), s: 0.8 + Math.random() * 1.4 })
      })
      return arr
    }
    const cyanP = makeStrand(cyanRings)
    const goldP = makeStrand(goldRings)

    let t0 = performance.now()
    let raf = 0

    function frame(now: number) {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now
      const T = now / 1000
      ctx!.clearRect(0, 0, SW, SH)
      ctx!.globalCompositeOperation = 'lighter'

      // central beam glow (warm low, cool high)
      const bx = X(BEAM)
      const pulse = 0.5 + 0.5 * Math.sin(T * 1.1)
      const beamTop = Y(0.165), beamBot = Y(0.80)
      const g = ctx!.createLinearGradient(0, beamTop, 0, beamBot)
      g.addColorStop(0, 'rgba(190,232,255,0)')
      g.addColorStop(0.12, `rgba(190,232,255,${0.10 + 0.05 * pulse})`)
      g.addColorStop(0.5, `rgba(255,225,180,${0.12 + 0.06 * pulse})`)
      g.addColorStop(0.85, `rgba(255,180,90,${0.10 + 0.05 * pulse})`)
      g.addColorStop(1, 'rgba(255,170,80,0)')
      const halfW = Math.max(10, SW * 0.014 * (0.85 + 0.3 * pulse))
      ctx!.fillStyle = g
      ctx!.fillRect(bx - halfW, beamTop, halfW * 2, beamBot - beamTop)

      // beam particles rising
      beam.forEach((p) => {
        p.t -= p.v * dt
        if (p.t < 0) { p.t = 1; p.off = (Math.random() - 0.5) * 0.012 }
        const fy = 0.80 - (0.80 - 0.165) * (1 - p.t)
        const px = bx + (p.off + 0.004 * Math.sin((p.t * 6.28 + T) * 1.7)) * SW
        const py = Y(fy)
        const warm = fy > 0.46
        const a = 0.5 * Math.sin(Math.PI * p.t)
        const rad = p.s * SW * 0.0026 * (0.8 + 0.6 * (1 - p.t))
        const rg = ctx!.createRadialGradient(px, py, 0, px, py, rad * 6)
        const c = warm ? '255,205,140' : '200,235,255'
        rg.addColorStop(0, `rgba(${c},${0.55 * a})`)
        rg.addColorStop(1, `rgba(${c},0)`)
        ctx!.fillStyle = rg
        ctx!.beginPath(); ctx!.arc(px, py, rad * 6, 0, 6.2832); ctx!.fill()
      })

      // strand swirls: faint rings + travelling comet light
      function drawRings(rings: Ring[]) {
        rings.forEach((r) => {
          ctx!.strokeStyle = r.hue === 'cy' ? 'rgba(140,224,255,0.08)' : 'rgba(255,190,110,0.08)'
          ctx!.lineWidth = Math.max(1, SW * 0.0014)
          ctx!.beginPath()
          ctx!.ellipse(bx, Y(r.cy), X(r.rx), Y(r.ry * AR), 0, 0, 6.2832)
          ctx!.stroke()
        })
      }
      function drawStrandParticles(arr: { r: Ring; a: number; v: number; s: number }[]) {
        arr.forEach((p) => {
          p.a += p.v * dt
          const r = p.r
          const c = r.hue === 'cy' ? '150,228,255' : '255,196,120'
          const TRAIL = 7, step = 0.10 * Math.sign(p.v)
          for (let k = TRAIL; k >= 0; k--) {
            const ang = p.a - k * step
            const px = bx + Math.cos(ang) * X(r.rx)
            const py = Y(r.cy) + Math.sin(ang) * Y(r.ry * AR)
            const depth = 0.5 + 0.5 * Math.sin(ang)
            const taper = 1 - k / (TRAIL + 1)
            const a = (k === 0 ? 0.55 : 0.30) * depth * taper
            const rad = p.s * SW * 0.0024 * (k === 0 ? 1 : 0.7)
            const rg = ctx!.createRadialGradient(px, py, 0, px, py, rad * 7)
            rg.addColorStop(0, `rgba(${c},${a})`)
            rg.addColorStop(1, `rgba(${c},0)`)
            ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(px, py, rad * 7, 0, 6.2832); ctx!.fill()
          }
        })
      }
      drawRings(cyanRings); drawRings(goldRings)
      drawStrandParticles(cyanP); drawStrandParticles(goldP)

      // fibre region: faint warm light drifting down to the base
      const fN = REDUCED ? 8 : 16
      for (let i = 0; i < fN; i++) {
        const fx = BEAM + (i / (fN - 1) - 0.5) * 0.12
        const phase = (T * 0.35 + i * 0.16) % 1
        const fy = 0.585 + (0.725 - 0.585) * phase
        const px = X(fx), py = Y(fy)
        const a = 0.22 * Math.sin(Math.PI * phase)
        const rad = SW * 0.0022
        const rg = ctx!.createRadialGradient(px, py, 0, px, py, rad * 6)
        rg.addColorStop(0, `rgba(255,225,180,${a})`)
        rg.addColorStop(1, 'rgba(255,225,180,0)')
        ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(px, py, rad * 6, 0, 6.2832); ctx!.fill()
      }

      // brain shimmer (subtle hue drift)
      const bcx = X(0.50), bcy = Y(J.brain), br = SW * 0.20
      const hue = (T * 12) % 360
      const bp = 0.5 + 0.5 * Math.sin(T * 0.8)
      const bg = ctx!.createRadialGradient(bcx, bcy, 0, bcx, bcy, br)
      bg.addColorStop(0, `hsla(${hue},85%,75%,${0.10 + 0.06 * bp})`)
      bg.addColorStop(0.6, `hsla(${(hue + 60) % 360},85%,70%,${0.05 + 0.03 * bp})`)
      bg.addColorStop(1, 'hsla(0,0%,100%,0)')
      ctx!.fillStyle = bg; ctx!.beginPath(); ctx!.arc(bcx, bcy, br, 0, 6.2832); ctx!.fill()

      // plate junction glints
      const glints: [number, string, number][] = [[J.top, '200,235,255', 0], [J.cyan, '150,228,255', 1.2], [J.gold, '255,196,120', 2.1], [J.base, '255,180,100', 3.0]]
      glints.forEach(([fy, c, ph]) => {
        const gp = 0.5 + 0.5 * Math.sin(T * 1.3 + ph)
        const px = bx, py = Y(fy), rad = SW * 0.05 * (0.8 + 0.3 * gp)
        const rg = ctx!.createRadialGradient(px, py, 0, px, py, rad)
        rg.addColorStop(0, `rgba(${c},${0.10 + 0.10 * gp})`)
        rg.addColorStop(1, `rgba(${c},0)`)
        ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(px, py, rad, 0, 6.2832); ctx!.fill()
      })

      ctx!.globalCompositeOperation = 'source-over'
      if (!REDUCED) raf = requestAnimationFrame(frame)
    }

    function onVis() {
      if (REDUCED) return
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0 }
      else if (!raf) { t0 = performance.now(); raf = requestAnimationFrame(frame) }
    }
    document.addEventListener('visibilitychange', onVis)

    if (REDUCED) frame(performance.now()) // one settled frame
    else raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <style dangerouslySetInnerHTML={{ __html: `
        .ns-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);will-change:transform}
        .ns-stage>*{position:absolute;inset:0;width:100%;height:100%}
        .ns-img{background-size:100% 100%;background-position:center;background-repeat:no-repeat}
        .ns-base{z-index:1}
        .ns-layer{z-index:2;opacity:.55;mix-blend-mode:screen;will-change:transform}
        .ns-la{-webkit-mask:linear-gradient(#000 0,#000 22%,transparent 30%);mask:linear-gradient(#000 0,#000 22%,transparent 30%);animation:nsFloatA 11s ease-in-out infinite}
        .ns-lb{-webkit-mask:linear-gradient(transparent 24%,#000 30%,#000 42%,transparent 48%);mask:linear-gradient(transparent 24%,#000 30%,#000 42%,transparent 48%);animation:nsFloatB 13s ease-in-out infinite}
        .ns-lc{-webkit-mask:linear-gradient(transparent 42%,#000 48%,#000 60%,transparent 66%);mask:linear-gradient(transparent 42%,#000 48%,#000 60%,transparent 66%);animation:nsFloatC 12s ease-in-out infinite}
        .ns-ld{-webkit-mask:linear-gradient(transparent 60%,#000 67%,#000 100%);mask:linear-gradient(transparent 60%,#000 67%,#000 100%);animation:nsFloatD 15s ease-in-out infinite}
        .ns-fx{z-index:3;pointer-events:none}
        @keyframes nsFloatA{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}
        @keyframes nsFloatB{0%,100%{transform:translateY(2.5px)}50%{transform:translateY(-3.5px)}}
        @keyframes nsFloatC{0%,100%{transform:translateY(-2px)}50%{transform:translateY(4px)}}
        @keyframes nsFloatD{0%,100%{transform:translateY(2px)}50%{transform:translateY(-2px)}}
        @media (prefers-reduced-motion: reduce){.ns-layer{animation:none;opacity:.4}}
      ` }} />

      {/* the artwork stage + masked parallax layers + fx canvas, held faint */}
      <div ref={stageRef} className="ns-stage" style={{ opacity: 0.6 }}>
        <div className="ns-img ns-base" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-la" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-lb" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-lc" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-ld" style={{ backgroundImage: `url(${SRC})` }} />
        <canvas ref={fxRef} className="ns-fx" />
      </div>

      {/* vertical scrim — keeps the nav, hero and footer legible over the artwork */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.7) 0%, rgba(9,9,12,0.28) 24%, rgba(9,9,12,0.28) 62%, rgba(9,9,12,0.78) 100%)',
        }}
      />
    </div>
  )
}

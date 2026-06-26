'use client'

/**
 * PlatformBackdrop — the KrimOS cluster's living ground.
 *
 * The "neural stack" artwork (public/images/krimos/neural-stack-3.webp, 1783×2400)
 * — a rainbow brain crowning stacked chip-plates, a rising central beam and
 * cyan/gold strand swirls, all on black — shown CONTAIN (the whole stack) so its
 * black ground blends into the page, with the rectangle edges feathered away. Four
 * soft-masked copies drift a few px out of phase for a living parallax, and a #fx
 * canvas adds the rising beam, the spine light, plate-rim neon bars, strand comets,
 * plate sheens, a brain shimmer and junction glints — all additive, with the beam
 * occluded behind each solid plate.
 *
 * Ported from the standalone export (neural-stack-animated-background (3)): image
 * extracted to an optimised WebP (~281KB, prewarmed by BackgroundPrefetch), DPR
 * capped, paused while the tab is hidden, reduced-motion settles to one still
 * frame, rAF + listeners cleaned up. Held under a scrim + edge feather so the nav,
 * hero and footer stay legible. Fixed behind every /krimos page.
 */

import { useEffect, useRef } from 'react'
import { markBackdropReady } from '@/lib/backdropReady'

const SRC = '/images/krimos/neural-stack-3.webp'

type Ring = { cy: number; rx: number; ry: number; hue: 'cy' | 'go'; count: number }
type Pt = { x: number; y: number }
type Plate = { col: string; edge: number; p: number; v: number; c: Pt[] }

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

    // Signal the page text once the artwork has actually loaded. The CSS
    // background-image is discovered late, so probe it directly (covers the
    // cached/prefetched case too) → BackdropGate reveals <main> after this.
    const probe = new Image()
    probe.decoding = 'async'
    probe.onload = () => markBackdropReady('platform')
    probe.src = SRC
    if (probe.complete && probe.naturalWidth > 0) markBackdropReady('platform')

    const IW = 1783, IH = 2400, AR = IW / IH
    let SW = 0, SH = 0, DPR = 1
    function layout() {
      // the stage box is sized in CSS (contain — robust, survives re-renders);
      // read it back to drive the fx-canvas backing store + coordinate mapping.
      const scale = Math.min(window.innerWidth / IW, window.innerHeight / IH)
      SW = stage!.clientWidth || IW * scale
      SH = stage!.clientHeight || IH * scale
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

    const ring = (cy: number, rx: number, ry: number, hue: 'cy' | 'go', count: number): Ring => ({ cy, rx, ry, hue, count })
    const cyanRings = [ring(0.275, 0.30, 0.052, 'cy', 3), ring(0.315, 0.345, 0.060, 'cy', 3), ring(0.350, 0.30, 0.050, 'cy', 2)]
    const goldRings = [ring(0.455, 0.30, 0.050, 'go', 3), ring(0.500, 0.345, 0.058, 'go', 3), ring(0.545, 0.30, 0.048, 'go', 2)]

    // plate rims — neon bars travel one side at a time, parallel to that side
    const plateEdges: Plate[] = [
      { col: '215,225,255', edge: 0, p: 0.10, v: 0.150, c: [{ x: 0.10, y: 0.205 }, { x: 0.42, y: 0.178 }, { x: 0.72, y: 0.195 }, { x: 0.42, y: 0.222 }] },
      { col: '120,225,255', edge: 1, p: 0.60, v: 0.170, c: [{ x: 0.085, y: 0.365 }, { x: 0.45, y: 0.335 }, { x: 0.78, y: 0.350 }, { x: 0.46, y: 0.415 }] },
      { col: '255,190,110', edge: 2, p: 0.30, v: 0.140, c: [{ x: 0.155, y: 0.535 }, { x: 0.45, y: 0.495 }, { x: 0.735, y: 0.520 }, { x: 0.46, y: 0.585 }] },
      { col: '255,205,150', edge: 3, p: 0.78, v: 0.122, c: [{ x: 0.085, y: 0.725 }, { x: 0.45, y: 0.685 }, { x: 0.80, y: 0.715 }, { x: 0.46, y: 0.778 }] },
    ]
    const lerpPt = (a: Pt, b: Pt, t: number): [number, number] => [X(a.x + (b.x - a.x) * t), Y(a.y + (b.y - a.y) * t)]
    function railNeon(A: Pt, B: Pt, p: number, tail: number, c: string, bright: number) {
      const t1 = p, t0 = Math.max(0, p - tail), N = 14
      if (t1 <= 0.001) return
      let prev = lerpPt(A, B, t0)
      for (let i = 1; i <= N; i++) {
        const q = lerpPt(A, B, t0 + (t1 - t0) * (i / N))
        const head = i / N, a = bright * Math.pow(head, 1.8)
        ctx!.strokeStyle = `rgba(${c},${a * 0.40})`; ctx!.lineWidth = Math.max(2, SW * 0.0060 * head)
        ctx!.beginPath(); ctx!.moveTo(prev[0], prev[1]); ctx!.lineTo(q[0], q[1]); ctx!.stroke()
        ctx!.strokeStyle = `rgba(${c},${a})`; ctx!.lineWidth = Math.max(1, SW * 0.0020 * head)
        ctx!.beginPath(); ctx!.moveTo(prev[0], prev[1]); ctx!.lineTo(q[0], q[1]); ctx!.stroke()
        prev = q
      }
      const hp = lerpPt(A, B, t1), r = SW * 0.011
      const rg = ctx!.createRadialGradient(hp[0], hp[1], 0, hp[0], hp[1], r)
      rg.addColorStop(0, `rgba(${c},${bright * 0.65})`); rg.addColorStop(1, `rgba(${c},0)`)
      ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(hp[0], hp[1], r, 0, 6.2832); ctx!.fill()
    }

    // spine light: soft elongated streaks, half rising, half falling
    const spineN = REDUCED ? 7 : 13
    const spine = Array.from({ length: spineN }, (_, i) => ({
      y: Math.random() * 1.2 - 0.1, len: 0.05 + Math.random() * 0.07, w: 0.006 + Math.random() * 0.005,
      dir: i % 2 ? 1 : -1, v: 0.045 + Math.random() * 0.05, a: 0.7 + Math.random() * 0.6,
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

      // spine: soft light flowing both up and down
      spine.forEach((s) => {
        s.y += s.dir * s.v * dt
        if (s.y < -0.12) s.y = 1.12
        if (s.y > 1.12) s.y = -0.12
        const cy = s.y, warm = cy > 0.49
        const c = warm ? '255,206,150' : '202,232,255'
        const rx = X(s.w), ryPix = s.len * SH
        ctx!.save()
        ctx!.translate(bx + Math.sin(cy * 22 + T * 0.7) * X(0.0016), Y(cy))
        ctx!.scale(1, ryPix / rx)
        const rg = ctx!.createRadialGradient(0, 0, 0, 0, 0, rx)
        rg.addColorStop(0, `rgba(${c},${0.13 * s.a})`); rg.addColorStop(1, `rgba(${c},0)`)
        ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(0, 0, rx, 0, 6.2832); ctx!.fill()
        ctx!.restore()
      })

      // occlude the beam behind each plate's front face
      plateEdges.forEach((e) => {
        const c = e.c
        const Lx = X(c[0].x), Ly = Y(c[0].y), Rx = X(c[2].x), Ry = Y(c[2].y), Fx = X(c[3].x), Fy = Y(c[3].y)
        const topY = Math.min(Ly, Ry)
        ctx!.save()
        ctx!.beginPath(); ctx!.moveTo(Lx, Ly); ctx!.lineTo(Rx, Ry); ctx!.lineTo(Fx, Fy); ctx!.closePath(); ctx!.clip()
        const gg = ctx!.createLinearGradient(0, topY, 0, Fy)
        gg.addColorStop(0, 'rgba(0,0,0,0)'); gg.addColorStop(0.4, 'rgba(0,0,0,1)'); gg.addColorStop(1, 'rgba(0,0,0,1)')
        ctx!.globalCompositeOperation = 'destination-out'
        ctx!.fillStyle = gg; ctx!.fillRect(Lx, topY, Rx - Lx, Fy - topY)
        ctx!.restore()
      })

      // slice the beam at the top two plates so it reads as passing behind them
      ctx!.globalCompositeOperation = 'destination-out'
      { const yc = Y(0.272); ctx!.fillStyle = 'rgba(0,0,0,1)'; ctx!.fillRect(0, 0, SW, yc) }
      {
        const y0 = Y(0.335), y1 = Y(0.418), f = Y(0.022)
        ctx!.fillStyle = 'rgba(0,0,0,1)'; ctx!.fillRect(0, y0, SW, y1 - y0)
        const gg = ctx!.createLinearGradient(0, y1, 0, y1 + f)
        gg.addColorStop(0, 'rgba(0,0,0,1)'); gg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = gg; ctx!.fillRect(0, y1, SW, f)
      }
      ctx!.globalCompositeOperation = 'lighter'

      // strand swirls: faint rings + travelling comet streaks
      const rcol = (hue: 'cy' | 'go', a: number) => hue === 'cy' ? `rgba(140,224,255,${a})` : `rgba(255,190,110,${a})`
      function drawRings(rings: Ring[]) {
        rings.forEach((r) => {
          ctx!.strokeStyle = rcol(r.hue, 0.08); ctx!.lineWidth = Math.max(1, SW * 0.0014)
          ctx!.beginPath(); ctx!.ellipse(bx, Y(r.cy), X(r.rx), Y(r.ry * AR), 0, 0, 6.2832); ctx!.stroke()
        })
      }
      function drawStrandParticles(arr: { r: Ring; a: number; v: number; s: number }[]) {
        const lw = Math.max(1, SW * 0.0016)
        ctx!.lineCap = 'round'; ctx!.lineJoin = 'round'
        arr.forEach((p) => {
          p.a += p.v * dt
          const r = p.r
          const c = r.hue === 'cy' ? '150,228,255' : '255,196,120'
          const dir = Math.sign(p.v) || 1
          const SPAN = 0.55, STEPS = 14
          let prev: [number, number] | null = null
          for (let k = STEPS; k >= 0; k--) {
            const ang = p.a - dir * (SPAN * k / STEPS)
            const px = bx + Math.cos(ang) * X(r.rx)
            const py = Y(r.cy) + Math.sin(ang) * Y(r.ry * AR)
            if (prev) {
              const head = 1 - k / STEPS
              const depth = 0.55 + 0.45 * Math.sin(ang)
              const a = 0.18 * head * head * depth
              ctx!.strokeStyle = `rgba(${c},${a})`; ctx!.lineWidth = lw * (0.4 + 0.7 * head)
              ctx!.beginPath(); ctx!.moveTo(prev[0], prev[1]); ctx!.lineTo(px, py); ctx!.stroke()
            }
            prev = [px, py]
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
        rg.addColorStop(0, `rgba(255,225,180,${a})`); rg.addColorStop(1, 'rgba(255,225,180,0)')
        ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(px, py, rad * 6, 0, 6.2832); ctx!.fill()
      }

      // light sheen sweeping across the horizontal plates
      const sheens = [
        { y: 0.205, c: '210,235,255', amp: 0.30, ph: 0.0, rx: 0.20, ry: 0.020 },
        { y: 0.355, c: '160,228,255', amp: 0.34, ph: 1.9, rx: 0.22, ry: 0.022 },
        { y: 0.540, c: '255,222,175', amp: 0.32, ph: 3.6, rx: 0.22, ry: 0.024 },
      ]
      sheens.forEach((s) => {
        const sx = X(0.5 + s.amp * Math.sin(T * 0.42 + s.ph)), sy = Y(s.y), rx = X(s.rx), ry = Y(s.ry)
        ctx!.save(); ctx!.translate(sx, sy); ctx!.scale(1, ry / rx)
        const rg = ctx!.createRadialGradient(0, 0, 0, 0, 0, rx)
        rg.addColorStop(0, `rgba(${s.c},0.065)`); rg.addColorStop(1, `rgba(${s.c},0)`)
        ctx!.fillStyle = rg; ctx!.beginPath(); ctx!.arc(0, 0, rx, 0, 6.2832); ctx!.fill()
        ctx!.restore()
      })

      // neon bars gliding along the plate sides
      ctx!.lineCap = 'round'; ctx!.lineJoin = 'round'
      plateEdges.forEach((e) => {
        e.p += e.v * dt
        while (e.p >= 1) { e.p -= 1; e.edge = (e.edge + 1) % 4 }
        const c = e.c
        ctx!.strokeStyle = `rgba(${e.col},0.028)`; ctx!.lineWidth = Math.max(1, SW * 0.0016)
        ctx!.beginPath(); ctx!.moveTo(X(c[0].x), Y(c[0].y))
        for (let k = 1; k < 4; k++) ctx!.lineTo(X(c[k].x), Y(c[k].y))
        ctx!.closePath(); ctx!.stroke()
        const A = c[e.edge], B = c[(e.edge + 1) % 4]
        const A2 = c[(e.edge + 2) % 4], B2 = c[(e.edge + 3) % 4]
        railNeon(A, B, e.p, 0.6, e.col, 0.46)
        railNeon(A2, B2, e.p, 0.6, e.col, 0.30)
      })

      // brain shimmer (subtle hue drift over the artwork's brain)
      const bcx = X(0.50), bcy = Y(J.brain), br = SW * 0.20
      const hue = (T * 12) % 360
      const bp = 0.5 + 0.5 * Math.sin(T * 0.8)
      const bg = ctx!.createRadialGradient(bcx, bcy, 0, bcx, bcy, br)
      bg.addColorStop(0, `hsla(${hue},85%,75%,${0.045 + 0.03 * bp})`)
      bg.addColorStop(0.6, `hsla(${(hue + 60) % 360},85%,70%,${0.022 + 0.015 * bp})`)
      bg.addColorStop(1, 'hsla(0,0%,100%,0)')
      ctx!.fillStyle = bg; ctx!.beginPath(); ctx!.arc(bcx, bcy, br, 0, 6.2832); ctx!.fill()

      // plate junction glints
      const glints: [number, string, number][] = [[J.cyan, '150,228,255', 1.2], [J.gold, '255,196,120', 2.1], [J.base, '255,180,100', 3.0]]
      glints.forEach(([fy, c, ph]) => {
        const gp = 0.5 + 0.5 * Math.sin(T * 1.3 + ph)
        const px = bx, py = Y(fy), rad = SW * 0.05 * (0.8 + 0.3 * gp)
        const rg = ctx!.createRadialGradient(px, py, 0, px, py, rad)
        rg.addColorStop(0, `rgba(${c},${0.10 + 0.10 * gp})`); rg.addColorStop(1, `rgba(${c},0)`)
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
      {/* fetch the artwork as early as possible (it drives a CSS background-image,
          which the browser would otherwise discover late) */}
      <link rel="preload" as="image" href={SRC} />
      <style dangerouslySetInnerHTML={{ __html: `
        .ns-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100vw,74.292vh);height:min(134.604vw,100vh);will-change:transform}
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
      <div ref={stageRef} className="ns-stage" style={{ opacity: 0.4 }}>
        <div className="ns-img ns-base" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-la" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-lb" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-lc" style={{ backgroundImage: `url(${SRC})` }} />
        <div className="ns-img ns-layer ns-ld" style={{ backgroundImage: `url(${SRC})` }} />
        <canvas ref={fxRef} className="ns-fx" />
      </div>

      {/* edge feather — fades the artwork's rectangle into the page black on every side */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(70% 72% at 50% 47%, transparent 40%, #09090C 90%)' }}
      />

      {/* vertical scrim — keeps the nav, hero and footer legible over the artwork */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.74) 0%, rgba(9,9,12,0.3) 22%, rgba(9,9,12,0.3) 60%, rgba(9,9,12,0.8) 100%)',
        }}
      />
    </div>
  )
}

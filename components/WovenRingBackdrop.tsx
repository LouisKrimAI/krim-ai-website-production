'use client'

/**
 * WovenRingBackdrop — the brand's living ground for the homepage and the general
 * interior pages (everything except the KrimOS /platform cluster and the Research
 * cluster, which keep their own backdrops).
 *
 * A canvas piece: a volume of light that morphs cloud → swirl → sphere → a woven
 * luminous ring, then breathes on a loop, in the brand teal/aqua palette. Ported
 * from the standalone export into a single client component:
 *   - gated by route (renders nothing on /platform* and the research routes),
 *   - DPR capped and strand/segment counts reduced on small/touch screens,
 *   - paused while the tab is hidden (saves battery), rAF + listeners cleaned up,
 *   - reduced-motion settles to a single still frame,
 *   - held under a scrim + slight transparency so copy stays legible.
 * Fixed at z-0 behind all content. GPU-friendly 2D canvas.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const RESEARCH_ROUTES = new Set(['/research', '/research/world-lending-model', '/epistemic-ai'])

export default function WovenRingBackdrop() {
  const pathname = usePathname()
  // KrimOS + Research own their backdrops; everything else gets the woven ring.
  if (!pathname || pathname.startsWith('/platform') || RESEARCH_ROUTES.has(pathname)) return null
  return <WovenRingCanvas />
}

function WovenRingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Lighter on phones / touch so it holds frame-rate; richer on desktop.
    const small =
      Math.min(window.innerWidth, window.innerHeight) < 720 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)

    // ---------- viewport ----------
    let W = 0, H = 0, DPR = 1, U = 1, sized = false
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      if (W === 0 || H === 0) return false
      canvas!.width = Math.round(W * DPR)
      canvas!.height = Math.round(H * DPR)
      canvas!.style.width = W + 'px'; canvas!.style.height = H + 'px'
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx!.lineCap = 'round'; ctx!.lineJoin = 'round'
      U = Math.min(W, H); sized = true
      return true
    }
    window.addEventListener('resize', resize)
    resize()
    let retry: ReturnType<typeof setTimeout> | null = null
    ;(function ensureSized() { if (!sized) { resize(); retry = setTimeout(ensureSized, 100) } })()

    // ---------- math ----------
    const TWO_PI = Math.PI * 2
    function lerp(a: number, b: number, m: number) { return a + (b - a) * m }
    function mix(c1: number[], c2: number[], m: number) { return [lerp(c1[0], c2[0], m), lerp(c1[1], c2[1], m), lerp(c1[2], c2[2], m)] }
    function rand(a: number, b: number) { return a + Math.random() * (b - a) }
    function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5 }
    function clamp01(x: number) { return x < 0 ? 0 : (x > 1 ? 1 : x) }
    function smooth(x: number) { x = clamp01(x); return x * x * x * (x * (x * 6 - 15) + 10) }
    function seg(q: number, a: number, b: number) { return smooth((q - a) / (b - a)) }

    // ---------- palette (luminous teal -> aqua, white-hot cores) ----------
    const emerald = [16, 255, 168], aqua = [74, 206, 255]

    // ---------- timeline + density ----------
    const T_END = 11.0
    const N = small ? 24 : 38, SEG = small ? 84 : 120

    // ---------- strands ----------
    const WINDINGS = [2, 3, 3, 4]
    const strands: any[] = []
    for (let i = 0; i < N; i++) {
      const c0 = (i % 2 === 0 ? i / N : 1 - i / N) * 0.82 + 0.09
      const glints: any[] = []
      const gc = 3 + ((Math.random() * 3) | 0)
      for (let g = 0; g < gc; g++) glints.push({
        pos: Math.random(), speed: rand(0.045, 0.10) * (Math.random() < 0.5 ? 1 : -1),
        len: rand(0.10, 0.22), flarePhase: rand(0, TWO_PI), flareRate: rand(0.4, 0.9),
      })
      const start: any[] = []
      for (let s = 0; s < SEG; s++) {
        const dir = rand(0, TWO_PI), elev = Math.asin(rand(-1, 1))
        const rr = Math.pow(Math.random(), 0.62) * 2.15 + 0.15
        const clump = gauss() * 0.22
        start.push({
          rad: rr + clump, az: dir + gauss() * 0.5, el: elev + gauss() * 0.35,
          drift: rand(0, TWO_PI), driftRate: rand(0.5, 1.3), tw: rand(0, TWO_PI),
        })
      }
      strands.push({
        W: WINDINGS[(Math.random() * WINDINGS.length) | 0],
        arm: i * TWO_PI / N,
        thetaOff: (i * 2.399963) % TWO_PI,
        poloDrift: rand(0, TWO_PI), poloRate: rand(0.09, 0.19) * (Math.random() < 0.5 ? 1 : -1),
        tubeFreq: 2 + ((Math.random() * 3) | 0), tubePhase: rand(0, TWO_PI), tubeAmp: rand(0.08, 0.17),
        majAmp: rand(0.012, 0.03), majPhase: rand(0, TWO_PI),
        c0, color: mix(emerald, aqua, c0),
        hueFreq: 1 + ((Math.random() * 3) | 0), huePhase: rand(0, TWO_PI), hueAmp: rand(0.26, 0.46),
        glints,
        lumPhase: rand(0, TWO_PI), lumRate: rand(0.7, 1.4), lumPhase2: rand(0, TWO_PI),
        fF1: 2 + ((Math.random() * 4) | 0), fF2: 1 + ((Math.random() * 3) | 0), fF3: 3 + ((Math.random() * 5) | 0),
        fS1: rand(0.5, 1.5), fS2: rand(0.5, 1.5), fS3: rand(0.4, 1.2),
        fD1: Math.random() < 0.5 ? 1 : -1, fD2: Math.random() < 0.5 ? 1 : -1, fD3: Math.random() < 0.5 ? 1 : -1,
        fP1: rand(0, TWO_PI), fP2: rand(0, TWO_PI), fP3: rand(0, TWO_PI),
        spinTurns: rand(2.0, 3.2), sphWind: 5 + ((Math.random() * 4) | 0), latOff: rand(-0.1, 0.1),
        start,
      })
    }

    // ---------- buffers ----------
    const buf: any[] = []
    for (let b2 = 0; b2 < N * SEG; b2++) buf.push({ x: 0, y: 0, z: 0, ang: 0, t: 0, si: 0, tw: 0 })
    const order: any[] = []
    for (let oi = 0; oi < N; oi++) order.push({ i: oi, z: 0 })

    // ---------- pointer parallax ----------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    function onPointer(e: PointerEvent) { pointer.tx = e.clientX / W - 0.5; pointer.ty = e.clientY / H - 0.5 }
    window.addEventListener('pointermove', onPointer)

    // ---------- starfield ----------
    const stars: any[] = []
    for (let st = 0; st < (small ? 70 : 110); st++) stars.push({ x: Math.random(), y: Math.random(), sz: rand(0.4, 1.4), tw: rand(0, TWO_PI), tws: rand(0.4, 1.2) })

    function drawBackground(time: number, cloudGlow: number, ringPhase: number, cx: number, cy: number) {
      ctx!.fillStyle = '#02060a'; ctx!.fillRect(0, 0, W, H)
      const vg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.72)
      vg.addColorStop(0, 'rgba(8,32,36,0.55)'); vg.addColorStop(1, 'rgba(2,6,10,0)')
      ctx!.fillStyle = vg; ctx!.fillRect(0, 0, W, H)

      for (let s = 0; s < stars.length; s++) {
        const sp = stars[s]
        const a = 0.14 + 0.16 * Math.sin(time * sp.tws + sp.tw)
        ctx!.fillStyle = 'rgba(180,235,225,' + a.toFixed(3) + ')'
        ctx!.beginPath(); ctx!.arc(sp.x * W, sp.y * H, sp.sz, 0, TWO_PI); ctx!.fill()
      }

      const glow = Math.max(cloudGlow * 0.5, ringPhase)
      if (glow > 0.001) {
        ctx!.save(); ctx!.globalCompositeOperation = 'lighter'
        const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, U * (0.5 + 0.18 * ringPhase))
        cg.addColorStop(0, 'rgba(10,70,66,' + (0.20 * glow).toFixed(3) + ')')
        cg.addColorStop(0.55, 'rgba(6,40,50,' + (0.07 * glow).toFixed(3) + ')')
        cg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = cg; ctx!.fillRect(0, 0, W, H); ctx!.restore()
      }
    }

    function computeFrame(time: number) {
      const cx = W / 2, cy = H / 2
      const R = U * 0.30, r = R * 0.082
      const q = clamp01(time / T_END)
      const done = time >= T_END

      const wSwirl = seg(q, 0.05, 0.30)
      const wSphere = seg(q, 0.24, 0.54)
      const wRing = done ? 1 : seg(q, 0.48, 0.96)

      const cloudSpin = time * 0.10
      const swirlSpin = time * 0.55
      const ballSpin = time * 0.50
      const globalRot = time * 0.085
      const breathe = 1 + 0.022 * Math.sin(time * 0.4)

      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      const px = pointer.x, py = pointer.y
      const tlt = (24 * Math.PI / 180) + py * 0.16, ct = Math.cos(tlt), stt = Math.sin(tlt)
      const yaw = px * 0.18, cyw = Math.cos(yaw), syw = Math.sin(yaw)

      let k = 0
      for (let i = 0; i < N; i++) {
        const sd = strands[i]
        const poloPh = sd.poloDrift + sd.poloRate * time
        let zsum = 0
        for (let s = 0; s < SEG; s++) {
          const tt = s / SEG
          const t = tt * TWO_PI

          const theta = sd.thetaOff + t + globalRot
          const phi = t * sd.W + sd.arm + poloPh
          const rr = r * (1 + sd.tubeAmp * Math.sin(t * sd.tubeFreq + sd.tubePhase + time * 0.45) + 0.08 * Math.sin(t * 2 + poloPh + time * 0.3))
          const RR = R * breathe * (1 + sd.majAmp * Math.sin(theta * 2 - time * 0.45 + sd.majPhase))
          const ringRr = RR + rr * Math.cos(phi)
          const rX = ringRr * Math.cos(theta) + R * 0.010 * Math.sin(time * 0.6 + t * 3 + sd.tubePhase)
          const rY = ringRr * Math.sin(theta) + R * 0.010 * Math.cos(time * 0.55 + t * 3 + sd.majPhase)
          const rZ = rr * Math.sin(phi)

          let X, Y, Z
          if (done) {
            X = rX; Y = rY; Z = rZ
          } else {
            const stp = sd.start[s]
            const dphi = stp.drift + time * 0.4 * stp.driftRate
            const bil = 1 + 0.10 * Math.sin(dphi) + 0.05 * Math.sin(time * 0.27 + stp.tw)
            const cRad = stp.rad * R * bil
            const az = stp.az + cloudSpin
            const el = stp.el + 0.10 * Math.sin(time * 0.33 + stp.tw)
            const cel = Math.cos(el)
            const cX = cRad * cel * Math.cos(az)
            const cY = cRad * Math.sin(el) * 1.05
            const cZ = cRad * cel * Math.sin(az)

            const sAng = sd.arm + tt * sd.spinTurns * TWO_PI + swirlSpin
            const sRad = R * (1.62 - 1.24 * tt)
            const sX = sRad * Math.cos(sAng)
            const sZ = sRad * Math.sin(sAng)
            const sY = R * 0.52 * (0.5 - tt) + R * 0.10 * Math.sin(sAng * 1.5 + time * 0.6)

            const ballR = R * 0.46
            const lat = Math.PI * (tt - 0.5 + sd.latOff)
            const lon = sd.arm + tt * sd.sphWind * TWO_PI + ballSpin
            const clat = Math.cos(lat)
            const bX = ballR * clat * Math.cos(lon)
            const bY = ballR * Math.sin(lat)
            const bZ = ballR * clat * Math.sin(lon)

            X = cX; Y = cY; Z = cZ
            X += (sX - X) * wSwirl; Y += (sY - Y) * wSwirl; Z += (sZ - Z) * wSwirl
            X += (bX - X) * wSphere; Y += (bY - Y) * wSphere; Z += (bZ - Z) * wSphere
            X += (rX - X) * wRing; Y += (rY - Y) * wRing; Z += (rZ - Z) * wRing
          }

          const yt = Y * ct - Z * stt
          const zt = Y * stt + Z * ct
          const xt = X * cyw - zt * syw
          const zt2 = X * syw + zt * cyw

          const p = buf[k++]
          p.x = cx + xt + px * 16
          p.y = cy + yt + py * 16
          p.z = zt2
          p.ang = theta; p.t = tt; p.si = i; p.tw = sd.start[s].tw
          zsum += zt2
        }
        order[i].i = i; order[i].z = zsum / SEG
      }
      return { cx, cy, R, r, q, wRing, done }
    }

    function strandPath(base: number, n: number) {
      const p0 = buf[base]
      ctx!.beginPath(); ctx!.moveTo(p0.x, p0.y)
      for (let s = 1; s < n - 1; s++) {
        const a = buf[base + s], b = buf[base + s + 1]
        ctx!.quadraticCurveTo(a.x, a.y, (a.x + b.x) * 0.5, (a.y + b.y) * 0.5)
      }
      const last = buf[base + n - 1]
      ctx!.lineTo(last.x, last.y)
    }

    function rgba(c: number[], a: number) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a.toFixed(3) + ')' }

    function render(time: number) {
      const q = clamp01(time / T_END)
      const done = time >= T_END

      const cloudGlow = done ? 0 : (1 - seg(q, 0.12, 0.40))
      const grainVis = done ? 0 : (1 - seg(q, 0.20, 0.42))
      const lineReveal = done ? 1 : seg(q, 0.18, 0.40)
      const ringPhase = done ? 1 : seg(q, 0.62, 1.0)

      const geom = computeFrame(time)
      const R = geom.R, cx = geom.cx, cy = geom.cy
      drawBackground(time, cloudGlow, ringPhase, cx, cy)

      const zN = R * 1.5
      const breath = 0.88 + 0.12 * Math.sin(time * 0.22)

      function lum(sd: any) {
        const w1 = 0.5 + 0.5 * Math.sin(time * 0.5 * sd.lumRate + sd.lumPhase)
        const w2 = 0.5 + 0.5 * Math.sin(time * 0.31 * sd.lumRate + sd.lumPhase2 + 1.3)
        return (0.4 + 0.6 * (0.6 * w1 + 0.4 * w2)) * breath
      }

      if (grainVis > 0.002) {
        ctx!.globalCompositeOperation = 'lighter'
        for (let pi = 0; pi < buf.length; pi++) {
          const pp = buf[pi]
          const col = strands[pp.si].color
          const dep = clamp01(0.5 + pp.z / (R * 2.6))
          const sz = lerp(0.7, 1.7, dep)
          const tw = 0.7 + 0.3 * Math.sin(time * 1.2 + pp.tw * 6.0)
          const br = grainVis * lerp(0.55, 1.1, dep) * tw
          ctx!.fillStyle = rgba(col, 0.11 * br)
          ctx!.beginPath(); ctx!.arc(pp.x, pp.y, 4.2 * sz, 0, TWO_PI); ctx!.fill()
          ctx!.fillStyle = rgba([Math.min(255, col[0] + 90), Math.min(255, col[1] + 50), Math.min(255, col[2] + 50)], 0.5 * br)
          ctx!.beginPath(); ctx!.arc(pp.x, pp.y, 1.0 * sz, 0, TWO_PI); ctx!.fill()
        }
        ctx!.globalCompositeOperation = 'source-over'
      }

      function flux(sd: any, tt: number) {
        const a = Math.sin(tt * TWO_PI * sd.fF1 - time * sd.fS1 * sd.fD1 + sd.fP1)
        const b = Math.sin(tt * TWO_PI * sd.fF2 - time * sd.fS2 * sd.fD2 + sd.fP2)
        const c = Math.sin(tt * TWO_PI * sd.fF3 - time * sd.fS3 * sd.fD3 + sd.fP3)
        const v = 0.5 + 0.5 * (0.44 * a + 0.34 * b + 0.22 * c)
        return clamp01(v)
      }

      if (lineReveal > 0.002) {
        order.sort((a, b) => a.z - b.z)
        const formed = 0.45 + 0.55 * ringPhase

        for (let oi = 0; oi < N; oi++) {
          const i = order[oi].i, sd = strands[i], base = i * SEG
          const dep = clamp01(0.5 + order[oi].z / zN)
          const hm = clamp01(sd.c0 + 0.18 * Math.sin(time * 0.3 + sd.huePhase))
          const col = mix(emerald, aqua, hm)
          const hot = [Math.min(255, col[0] + 155), Math.min(255, col[1] + 80), Math.min(255, col[2] + 55)]
          const ul = lum(sd)

          ctx!.globalCompositeOperation = 'lighter'
          strandPath(base, SEG)
          ctx!.strokeStyle = rgba(col, 0.042 * lerp(0.7, 1.1, dep) * lerp(ul, 0.9, ringPhase) * lineReveal)
          ctx!.lineWidth = lerp(7, 13, dep) * formed; ctx!.stroke()

          for (let s = 0; s < SEG - 1; s++) {
            const a2 = buf[base + s], b2 = buf[base + s + 1]
            const tt = (s + 0.5) / SEG
            const fl = flux(sd, tt)
            const sharp = 0.08 + 0.92 * Math.pow(fl, 2.3)
            const br = lerp(ul, sharp, ringPhase) * lineReveal
            const dseg = clamp01(0.5 + (a2.z + b2.z) * 0.5 / zN)
            const dfac = lerp(0.75, 1.18, dseg)

            ctx!.strokeStyle = rgba(col, 0.17 * br * dfac)
            ctx!.lineWidth = lerp(1.7, 3.4, dseg) * formed
            ctx!.beginPath(); ctx!.moveTo(a2.x, a2.y); ctx!.lineTo(b2.x, b2.y); ctx!.stroke()

            if (br > 0.4) {
              const hotA = (br - 0.4) / 0.6
              ctx!.strokeStyle = rgba(hot, 0.42 * hotA * hotA * dfac)
              ctx!.lineWidth = lerp(0.6, 1.5, dseg)
              ctx!.beginPath(); ctx!.moveTo(a2.x, a2.y); ctx!.lineTo(b2.x, b2.y); ctx!.stroke()
            }
          }
        }
        ctx!.globalCompositeOperation = 'source-over'
      }
    }

    // ---------- loop (paused while tab hidden) ----------
    let raf = 0
    let startTime: number | null = null
    function frame(now: number) {
      if (!sized) { if (!resize()) { raf = requestAnimationFrame(frame); return } startTime = null }
      if (startTime === null) startTime = now
      render((now - startTime) / 1000)
      raf = requestAnimationFrame(frame)
    }
    function onVisibility() {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0 }
      else if (!reduceMotion && !raf) { startTime = null; raf = requestAnimationFrame(frame) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (reduceMotion) {
      ;(function still() { if (!sized && !resize()) { raf = requestAnimationFrame(still); return } render(40.0) })()
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (retry) clearTimeout(retry)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ opacity: 0.6 }} />
      {/* scrim — keeps the nav, hero copy and footer legible over the ring */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.55) 0%, rgba(9,9,12,0.12) 26%, rgba(9,9,12,0.12) 64%, rgba(9,9,12,0.62) 100%)',
        }}
      />
    </div>
  )
}

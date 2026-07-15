'use client'

/**
 * WovenRingBackdrop — brand living ground for the homepage and general interior
 * pages (everything except /krimos* and Research routes, which keep their own
 * backdrops). Canvas piece: cloud → grand spiral → temari orb → woven ring.
 *
 * Ported from "Woven Ring (4).html" (v4). What changed from v2:
 *   - T_END = 7.5 s (was 15): the whole morph runs twice as fast; T_EARLY = 7.0
 *     paces the pre-ring phases and the spare 0.5 s all goes to the final bloom
 *   - swirl: one grand, wide spiral galaxy (2.2 turns, R×1.67 reach) replacing
 *     the tighter log-spiral vortex; the spiral draws itself from centre
 *     outward, each dot carried AROUND the vortex as it is drawn in
 *   - sphere: two mirror-chirality thread families (sd.sphDir) weave a temari
 *     lattice with even diamond crossings; the orb precesses slowly
 *   - every transition is staggered per-point (tt-offset seg windows), so
 *     arrival and departure are one unbroken current — no rests, no seams
 *   - a slow roll passes through the figure as it unfurls (zero at both ends)
 *   - spherePeak warms the threads at the orb's zenith (~3.6 s) — the beat the
 *     hero logo appears on
 *   - dropped fields the v4 render never reads: glints, hueFreq/hueAmp,
 *     spinTurns, and all v2 sphere fields (sphWob*, sphWeave, sphP/Q, …)
 *
 * React wrapper unchanged:
 *   - route-gated (null on /krimos* + Research routes)
 *   - isFreshArrival() — morph plays only on fresh homepage load
 *   - RING_OFFSET — in-site navigation skips to the settled ring instantly
 *   - DPR capped at 2, small-device strand reduction, tab-pause, 30 fps once
 *     settled, reduced-motion still frame
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { isFreshArrival } from '@/lib/arrival'

export default function WovenRingBackdrop() {
  const pathname = usePathname()
  const isResearch = !!pathname && (pathname === '/epistemic-ai' || pathname === '/research' || pathname.startsWith('/research/'))
  if (!pathname || pathname.startsWith('/krimos') || isResearch) return null
  return <WovenRingCanvas />
}

function WovenRingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    // desynchronized: decorative backdrop needs no input-pipeline sync — lets the
    // compositor present frames without blocking on the main thread.
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small =
      Math.min(window.innerWidth, window.innerHeight) < 720 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)

    const playMorph = isFreshArrival() && window.location.pathname === '/'

    // ---------- viewport ----------
    let W = 0, H = 0, DPR = 1, U = 1, sized = false
    function resize() {
      // Cap at 2 (matches PlatformBackdrop) — this glow-soft image gains nothing
      // above 2x, and 2.25 cost ~21% extra fill-rate on DPR-3 phones.
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
    // re-measure on tab return too (v4 source) — a hidden tab can miss resizes
    document.addEventListener('visibilitychange', resize)
    resize()
    let retry: ReturnType<typeof setTimeout> | null = null
    ;(function ensureSized() { if (!sized) { resize(); retry = setTimeout(ensureSized, 100) } })()

    // ---------- math ----------
    const TWO_PI = Math.PI * 2
    function lerp(a: number, b: number, m: number) { return a + (b - a) * m }
    function mix(c1: number[], c2: number[], m: number) {
      return [lerp(c1[0], c2[0], m), lerp(c1[1], c2[1], m), lerp(c1[2], c2[2], m)]
    }
    function rand(a: number, b: number) { return a + Math.random() * (b - a) }
    function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5 }
    function clamp01(x: number) { return x < 0 ? 0 : x > 1 ? 1 : x }
    function smooth(x: number) { x = clamp01(x); return x * x * x * (x * (x * 6 - 15) + 10) }
    function seg(q: number, a: number, b: number) { return smooth((q - a) / (b - a)) }

    // ---------- palette (luminous teal → aqua, white-hot cores) ----------
    const emerald = [16, 255, 168], aqua = [74, 206, 255]

    // ---------- timeline + density ----------
    const T_END = 7.5    // morph completes here, then the ring loops
    const T_EARLY = 7.0  // pre-ring phases keep their pace; the extra 0.5 s all goes to the final bloom
    const N = small ? 42 : 84, SEG = small ? 84 : 120

    // ---------- strands ----------
    const WINDINGS = [2, 3, 3, 4]
    const strands: any[] = []
    for (let i = 0; i < N; i++) {
      const c0 = (i % 2 === 0 ? i / N : 1 - i / N) * 0.82 + 0.09
      // cloud start position per point (fragmented volumetric cloud)
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
      // temari weave: two interlacing mirror-chirality families (fam → sphDir)
      const fam = i % 2
      strands.push({
        W: WINDINGS[(Math.random() * WINDINGS.length) | 0],
        arm: i * TWO_PI / N,
        thetaOff: (i * 2.399963) % TWO_PI, // golden-angle toroidal start → seams + coverage spread
        poloDrift: rand(0, TWO_PI), poloRate: rand(0.09, 0.19) * (Math.random() < 0.5 ? 1 : -1),
        tubeFreq: 2 + ((Math.random() * 3) | 0), tubePhase: rand(0, TWO_PI), tubeAmp: rand(0.08, 0.17),
        majAmp: rand(0.012, 0.03), majPhase: rand(0, TWO_PI),
        c0, color: mix(emerald, aqua, c0),
        huePhase: rand(0, TWO_PI),
        lumPhase: rand(0, TWO_PI), lumRate: rand(0.7, 1.4), lumPhase2: rand(0, TWO_PI),
        // chaotic luminosity field: bright lengths drifting both ways, no order
        fF1: 2 + ((Math.random() * 4) | 0), fF2: 1 + ((Math.random() * 3) | 0), fF3: 3 + ((Math.random() * 5) | 0),
        fS1: rand(0.5, 1.5), fS2: rand(0.5, 1.5), fS3: rand(0.4, 1.2),
        fD1: Math.random() < 0.5 ? 1 : -1, fD2: Math.random() < 0.5 ? 1 : -1, fD3: Math.random() < 0.5 ? 1 : -1,
        fP1: rand(0, TWO_PI), fP2: rand(0, TWO_PI), fP3: rand(0, TWO_PI),
        sphDir: fam ? -1 : 1, // mirrored winding → regular diamond crossings
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
    function onPointer(e: PointerEvent) {
      pointer.tx = e.clientX / W - 0.5; pointer.ty = e.clientY / H - 0.5
    }
    window.addEventListener('pointermove', onPointer)

    // ---------- starfield ----------
    const stars: any[] = []
    for (let st = 0; st < (small ? 70 : 110); st++)
      stars.push({ x: Math.random(), y: Math.random(), sz: rand(0.4, 1.4), tw: rand(0, TWO_PI), tws: rand(0.4, 1.2) })

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

    // ---------- geometry / morph ----------
    function computeFrame(time: number) {
      const cx = W / 2, cy = H / 2
      const R = U * 0.30, r = R * 0.082
      // final-ring enlargement: pull the projected top & bottom halfway to the screen edges
      const ct0 = Math.cos(24 * Math.PI / 180)
      const vr0 = R * ct0
      const ringScale = (H / 4 + vr0 / 2) / vr0
      const q = clamp01(time / T_END)
      const qE = clamp01(time / T_EARLY) // clock for the pre-ring phases
      const done = time >= T_END

      // one continuous breath: spiral gathers → folds into a complete orb → the orb
      // opens into the ring. Windows overlap so each phase is already arriving as the
      // last departs — no rests, no seams. (Per-point windows are computed below.)
      const wRing = done ? 1 : smooth(seg(q, 0.448, 1.0)) // global unfurl (for the roll)

      const cloudSpin = time * 0.09
      // a slow, graceful roll passes through the figure as it unfurls — zero at
      // both ends, a passing wave of motion, never a pose
      const roll = 0.11 * Math.sin(Math.PI * wRing)
      const rollC = Math.cos(roll), rollS = Math.sin(roll)
      const globalRot = time * 0.08
      const breathe = 1 + 0.022 * Math.sin(time * 0.4)

      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      const px = pointer.x, py = pointer.y
      const tlt = (24 * Math.PI / 180) + py * 0.16 + 0.045 * Math.sin(time * 0.21)
      const ct = Math.cos(tlt), stt = Math.sin(tlt)
      const yaw = px * 0.18, cyw = Math.cos(yaw), syw = Math.sin(yaw)

      let k = 0
      for (let i = 0; i < N; i++) {
        const sd = strands[i]
        const poloPh = sd.poloDrift + sd.poloRate * time
        let zsum = 0
        for (let s = 0; s < SEG; s++) {
          const tt = s / SEG
          const t = tt * TWO_PI

          // ---- RING (woven luminous torus) ----
          const theta = sd.thetaOff + t + globalRot
          const phi = t * sd.W + sd.arm + poloPh
          const rr = r * (1 + sd.tubeAmp * Math.sin(t * sd.tubeFreq + sd.tubePhase + time * 0.45)
                            + 0.08 * Math.sin(t * 2 + poloPh + time * 0.3))
          const RR = R * breathe * (1 + sd.majAmp * Math.sin(theta * 2 - time * 0.45 + sd.majPhase))
          const ringRr = RR + rr * Math.cos(phi)
          let rX = ringRr * Math.cos(theta) + R * 0.010 * Math.sin(time * 0.6 + t * 3 + sd.tubePhase)
          let rY = ringRr * Math.sin(theta) + R * 0.010 * Math.cos(time * 0.55 + t * 3 + sd.majPhase)
          let rZ = rr * Math.sin(phi)
          rX *= ringScale; rY *= ringScale; rZ *= ringScale

          let X, Y, Z
          if (done) {
            X = rX; Y = rY; Z = rZ
          } else {
            // ---- CLOUD (fragmented drifting volume) ----
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

            // ---- SWIRL: a grand, wide spiral galaxy — serene, simple, luminous ----
            const swSpin = time * 0.32                            // slow, stately rotation
            const swTurns = 2.2                                   // one graceful sweep
            const swAng = sd.arm + tt * swTurns * TWO_PI + swSpin // parallel arms, never crossing
            const swRad = R * (0.12 + 1.55 * Math.pow(tt, 0.85))  // LARGE: commands the whole stage
            const sX = swRad * Math.cos(swAng)
            const sZ = swRad * Math.sin(swAng)
            const sY = R * 0.36 * (0.45 - tt)                     // pure, still bowl

            // ---- SPHERE: two mirrored thread families weave a complete lattice,
            //      pole to pole; the whole orb precesses slowly, like attention
            //      turning; the faintest breath keeps it alive. ----
            const ballR = R * 0.52 * (1 + 0.005 * Math.sin(time * 0.35 + (2 * tt - 1) * 2.0))
            const le = 2 * tt - 1
            const slat = 1.5697 * le * (1.06 - 0.06 * le * le)    // near-uniform latitude, soft crowns
            const bAng = sd.arm + sd.sphDir * tt * 3.8 * TWO_PI + swSpin * 0.7
            const sclat = Math.cos(slat)
            const bX0 = ballR * sclat * Math.cos(bAng)
            const bZ0 = ballR * sclat * Math.sin(bAng)
            const bY0 = ballR * Math.sin(slat)
            // slow precession of the axis — the orb contemplates, never static
            const prc = 0.15 * Math.sin(time * 0.26)
            const pc = Math.cos(prc), ps = Math.sin(prc)
            const bX = bX0, bY = bY0 * pc - bZ0 * ps, bZ = bY0 * ps + bZ0 * pc

            X = cX; Y = cY; Z = cZ
            // the spiral draws itself from centre outward; each dot is carried AROUND
            // the vortex as it is drawn in → curved whirlpool paths, never straight lines
            const wSw = seg(qE, 0.07 + 0.16 * tt, 0.32 + 0.16 * tt)
            const curl = wSw * 1.5
            const cc2 = Math.cos(curl), sc2 = Math.sin(curl)
            const Xr = X * cc2 - Z * sc2; Z = X * sc2 + Z * cc2; X = Xr
            X += (sX - X) * wSw; Y += (sY - Y) * wSw; Z += (sZ - Z) * wSw

            // THE COLLAPSE: the spiral pours into the orb from its heart outward —
            // each point starts its descent the instant it finishes arriving
            const wSp = seg(qE, 0.33 + 0.15 * tt, 0.60 + 0.08 * tt)
            if (wSp > 0.0001) {
              const cl = 0.7 * Math.sin(Math.PI * wSp) // controlled, stately descent
              const cc3 = Math.cos(cl), sc3 = Math.sin(cl)
              const Xr2 = X * cc3 - Z * sc3; Z = X * sc3 + Z * cc3; X = Xr2
              X += (bX - X) * wSp; Y += (bY - Y) * wSp; Z += (bZ - Z) * wSp
            }

            // THE UNRAVELLING: one shared radial bloom — the whole orb expands
            // outward from its centre as one, the ring completing equally all around
            const wRg = smooth(seg(q, 0.448, 1.0))
            if (wRg > 0.0001) {
              const ul2 = -0.16 * Math.sin(Math.PI * wRg) // a whisper of counter-rotation
              const cc4 = Math.cos(ul2), sc4 = Math.sin(ul2)
              const Xr3 = X * cc4 - Z * sc4; Z = X * sc4 + Z * cc4; X = Xr3
              X += (rX - X) * wRg; Y += (rY - Y) * wRg; Z += (rZ - Z) * wRg
              // mid-flight bloom: the path arcs gently outward and lifts
              let bloom = Math.sin(Math.PI * wRg); bloom *= bloom
              const bs = 1 + 0.04 * bloom
              X *= bs; Z *= bs; Y = Y * bs - R * 0.04 * bloom
            }
          }

          // ---- project (tilt + yaw + roll + parallax) ----
          const yt = Y * ct - Z * stt
          const zt = Y * stt + Z * ct
          const xt = X * cyw - zt * syw
          const zt2 = X * syw + zt * cyw

          const p = buf[k++]
          p.x = cx + xt * rollC - yt * rollS + px * 16
          p.y = cy + xt * rollS + yt * rollC + py * 16
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

    function rgba(c: number[], a: number) {
      return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a.toFixed(3) + ')'
    }

    function render(time: number) {
      const q = clamp01(time / T_END)
      const qE = clamp01(time / T_EARLY)
      const done = time >= T_END

      const cloudGlow = done ? 0 : (1 - seg(qE, 0.18, 0.44))
      // dots breathe in from darkness, then dissolve into the collapse
      const grainVis = done ? 0 : seg(qE, 0.0, 0.05) * (1 - seg(qE, 0.36, 0.60))
      // threads ignite through the collapse → one continuous handoff
      const lineReveal = done ? 1 : seg(qE, 0.32, 0.60)
      // luminance & sharpening grow across the whole unfurl → no pop
      const ringPhase = done ? 1 : seg(q, 0.50, 1.0)

      const geom = computeFrame(time)
      const R = geom.R, cx = geom.cx, cy = geom.cy
      drawBackground(time, cloudGlow, ringPhase, cx, cy)

      // luminous core: swells into a pure orb of light as the weave completes,
      // then eases out into the ring (zenith ≈ 3.6–3.8 s — the logo's beat)
      const sphereGlow = done ? 0 : 0.45 * seg(qE, 0.40, 0.52) * (1 - seg(qE, 0.54, 0.74))
      const spherePeak = done ? 0 : seg(qE, 0.42, 0.54) * (1 - seg(qE, 0.54, 0.72))
      if (sphereGlow > 0.002) {
        ctx!.save(); ctx!.globalCompositeOperation = 'lighter'
        const sg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 0.68)
        sg.addColorStop(0, rgba([120, 245, 220], 0.15 * sphereGlow))
        sg.addColorStop(0.32, rgba([28, 200, 178], 0.10 * sphereGlow))
        sg.addColorStop(0.7, rgba([14, 130, 158], 0.05 * sphereGlow))
        sg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = sg; ctx!.fillRect(0, 0, W, H); ctx!.restore()
      }

      const zN = R * 1.5
      const breath = 0.88 + 0.12 * Math.sin(time * 0.22)

      function lum(sd: any) {
        const w1 = 0.5 + 0.5 * Math.sin(time * 0.5 * sd.lumRate + sd.lumPhase)
        const w2 = 0.5 + 0.5 * Math.sin(time * 0.31 * sd.lumRate + sd.lumPhase2 + 1.3)
        return (0.4 + 0.6 * (0.6 * w1 + 0.4 * w2)) * breath
      }

      // cloud dots
      if (grainVis > 0.002) {
        ctx!.globalCompositeOperation = 'lighter'
        for (let pi = 0; pi < buf.length; pi++) {
          const pp = buf[pi]
          const col = strands[pp.si].color
          const dep = clamp01(0.5 + pp.z / (R * 2.6))
          const sz = lerp(0.7, 1.7, dep)
          const tw = 0.7 + 0.3 * Math.sin(time * 1.2 + pp.tw * 6.0)
          const br = grainVis * lerp(0.55, 1.1, dep) * tw
          ctx!.fillStyle = rgba(col, 0.085 * br)
          ctx!.beginPath(); ctx!.arc(pp.x, pp.y, 4.2 * sz, 0, TWO_PI); ctx!.fill()
          ctx!.fillStyle = rgba([Math.min(255, col[0] + 90), Math.min(255, col[1] + 50), Math.min(255, col[2] + 50)], 0.38 * br)
          ctx!.beginPath(); ctx!.arc(pp.x, pp.y, 1.0 * sz, 0, TWO_PI); ctx!.fill()
        }
        ctx!.globalCompositeOperation = 'source-over'
      }

      function flux(sd: any, tt: number) {
        const a = Math.sin(tt * TWO_PI * sd.fF1 - time * sd.fS1 * sd.fD1 + sd.fP1)
        const b = Math.sin(tt * TWO_PI * sd.fF2 - time * sd.fS2 * sd.fD2 + sd.fP2)
        const c = Math.sin(tt * TWO_PI * sd.fF3 - time * sd.fS3 * sd.fD3 + sd.fP3)
        return clamp01(0.5 + 0.5 * (0.44 * a + 0.34 * b + 0.22 * c))
      }

      // strands: soft halo + per-segment body with roaming hot cores
      if (lineReveal > 0.002) {
        order.sort((a, b) => a.z - b.z)
        const formed = 0.45 + 0.55 * ringPhase

        for (let oi = 0; oi < N; oi++) {
          const i = order[oi].i, sd = strands[i], base = i * SEG
          const dep = clamp01(0.5 + order[oi].z / zN)
          const hm = clamp01(sd.c0 + 0.18 * Math.sin(time * 0.3 + sd.huePhase))
          let col = mix(emerald, aqua, hm)
          // a gentle brightening at the orb's zenith — threads stay resolvable
          if (spherePeak > 0.001) col = mix(col, [205, 255, 244], 0.12 * spherePeak)
          const hot = [Math.min(255, col[0] + 155), Math.min(255, col[1] + 80), Math.min(255, col[2] + 55)]
          const ul = lum(sd)

          ctx!.globalCompositeOperation = 'lighter'
          strandPath(base, SEG)
          ctx!.strokeStyle = rgba(col, 0.042 * lerp(0.7, 1.1, dep) * lerp(ul, 0.9, ringPhase) * lineReveal * (1 - 0.45 * spherePeak))
          ctx!.lineWidth = lerp(7, 13, dep) * formed; ctx!.stroke()

          for (let s = 0; s < SEG - 1; s++) {
            const a2 = buf[base + s], b2 = buf[base + s + 1]
            const tt = (s + 0.5) / SEG
            const fl = flux(sd, tt)
            const sharp = 0.08 + 0.92 * Math.pow(fl, 2.3)
            const br = lerp(ul, sharp, ringPhase) * lineReveal
            const dseg = clamp01(0.5 + (a2.z + b2.z) * 0.5 / zN)
            const dfac = lerp(0.75, 1.18, dseg)

            ctx!.strokeStyle = rgba(col, 0.17 * br * dfac * (1 - 0.35 * spherePeak))
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
    let skipBeat = false
    const RING_OFFSET = (T_END + 2) * 1000
    function frame(now: number) {
      if (!sized) { if (!resize()) { raf = requestAnimationFrame(frame); return } startTime = null }
      if (startTime === null) startTime = playMorph ? now : now - RING_OFFSET
      const t = (now - startTime) / 1000
      // Once the ring has settled it only breathes — render at 30fps instead of
      // 60 (skip alternate frames). Imperceptible for slow motion, halves the
      // permanent CPU/GPU cost on every page that carries the ring.
      if (t >= T_END) {
        skipBeat = !skipBeat
        if (skipBeat) { raf = requestAnimationFrame(frame); return }
      }
      render(t)
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
      document.removeEventListener('visibilitychange', resize)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ opacity: 0.6 }} />
      {/* scrim — keeps nav, hero copy and footer legible over the ring */}
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

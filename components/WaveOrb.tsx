'use client'

/**
 * WaveOrb — the faithful port of docs/krim-wave-orb.html (extracted from the
 * bundler payload, not the homage). Many layers of frequency-wave rings woven
 * in every orientation; each ring vibrates on two axes (radial + out-of-plane)
 * at independent frequencies; every line tinted from a cool palette so the
 * sphere shimmers. Pure React + SVG. Transparent background. Loops.
 *
 * Changes from the asset (port only — no creative drift):
 *   - 'use client', typed props, hooks imported from react
 *   - draws its first frame synchronously (content before rAF — LCP-safe,
 *     and correct in backgrounded tabs)
 *   - reduced-motion renders one settled frame, no loop
 */

import { useEffect, useMemo, useRef } from 'react'

// Cool luminous family, cyan-led ("thinking"), with mint ("validated") and a
// soft violet/indigo accent so the sphere reads colourful and dimensional
// against the deep canvas — never flat monochrome, never a garish rainbow.
const PALETTE: Array<[number, number]> = [
  [196, 92], // azure   — spine
  [188, 95], // cyan    — spine (brightest)
  [202, 88], // sky     — spine
  [172, 82], // teal
  [162, 90], // mint-teal (brand mint leans in here)
  [212, 80], // blue
  [250, 70], // indigo  — accent
  [268, 60], // violet  — accent
]
const P = PALETTE.length

function makeShell(
  axesN: number, heights: number[], samplesN: number,
  radius: number, ampScale: number, dir: number, harmBase: number,
) {
  const rings = axesN * heights.length
  const ux = new Float32Array(rings), uy = new Float32Array(rings), uz = new Float32Array(rings)
  const vx = new Float32Array(rings), vy = new Float32Array(rings), vz = new Float32Array(rings)
  const nx = new Float32Array(rings), ny = new Float32Array(rings), nz = new Float32Array(rings)
  const cx = new Float32Array(rings), cy = new Float32Array(rings), cz = new Float32Array(rings)
  const rr = new Float32Array(rings)
  const harm = new Int8Array(rings)
  const phase = new Float32Array(rings)
  const pal = new Int8Array(rings)
  const GOLD = Math.PI * (3 - Math.sqrt(5))
  let idx = 0
  for (let a = 0; a < axesN; a++) {
    const y = axesN === 1 ? 0 : 1 - (a / (axesN - 1)) * 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const th = a * GOLD
    const axx = Math.cos(th) * rad, axy = y, axz = Math.sin(th) * rad
    let upx = 0, upy = 1, upz = 0
    if (Math.abs(axy) > 0.95) { upx = 1; upy = 0; upz = 0 }
    let cux = upy * axz - upz * axy, cuy = upz * axx - upx * axz, cuz = upx * axy - upy * axx
    const ul = Math.hypot(cux, cuy, cuz) || 1; cux /= ul; cuy /= ul; cuz /= ul
    const vXX = axy * cuz - axz * cuy, vYY = axz * cux - axx * cuz, vZZ = axx * cuy - axy * cux
    for (let hI = 0; hI < heights.length; hI++) {
      const h = heights[hI]
      ux[idx] = cux; uy[idx] = cuy; uz[idx] = cuz
      vx[idx] = vXX; vy[idx] = vYY; vz[idx] = vZZ
      nx[idx] = axx; ny[idx] = axy; nz[idx] = axz
      cx[idx] = axx * h; cy[idx] = axy * h; cz[idx] = axz * h
      rr[idx] = Math.sqrt(Math.max(0, 1 - h * h))
      harm[idx] = harmBase + (idx % 7)
      phase[idx] = idx * 0.7
      pal[idx] = (idx * 3 + a) % P
      idx++
    }
  }
  const cosT = new Float32Array(samplesN), sinT = new Float32Array(samplesN), theta = new Float32Array(samplesN)
  for (let s = 0; s < samplesN; s++) {
    const a = (2 * Math.PI * s) / (samplesN - 1)
    cosT[s] = Math.cos(a); sinT[s] = Math.sin(a); theta[s] = a
  }
  return { rings, samples: samplesN, ux, uy, uz, vx, vy, vz, nx, ny, nz, cx, cy, cz, rr, harm, phase, pal, cosT, sinT, theta, radius, ampScale, dir }
}
type Shell = ReturnType<typeof makeShell>

export default function WaveOrb({
  size = '100%',
  hue = 210,
  speed = 1,
  amp = 1,
  density = 1,
  className = '',
}: {
  size?: string | number
  hue?: number
  speed?: number
  amp?: number
  density?: number
  className?: string
}) {
  const shells = useMemo<Shell[]>(() => {
    const R = (n: number) => Math.max(3, Math.round(n * density))
    return [
      makeShell(R(20), [-0.7, -0.42, -0.14, 0.14, 0.42, 0.7], R(104), 1.0, 0.74, 1, 5),
      makeShell(R(15), [-0.56, -0.18, 0.18, 0.56], R(92), 0.85, 0.66, -1, 6),
      makeShell(R(13), [-0.5, -0.16, 0.16, 0.5], R(82), 0.7, 0.58, 1, 7),
      makeShell(R(11), [-0.42, 0, 0.42], R(74), 0.55, 0.5, -1, 8),
    ]
  }, [density])

  const layerWeight = [1.0, 0.84, 0.68, 0.54]
  const shellEls = useRef<Array<Array<Array<SVGPathElement | null>>>>(
    shells.map(() => Array.from({ length: P }, () => [null, null, null])),
  )
  const glowEls = useRef<Array<SVGPathElement | null>>([])
  const coreRef = useRef<SVGGElement>(null)

  // Travelling light pulses — signals passing along the strands. A small, fixed
  // pool, each bound to one (shell, ring), advancing along that ring's sample
  // arc. Positions are read from the same per-frame buffers the rings already
  // fill, so this adds only a handful of attribute writes — no path strings, no
  // per-frame allocations. Built once; deterministic so the first frame is right.
  const PULSE_N = 9
  const pulses = useMemo(() => {
    const arr: Array<{ shell: number; ring: number; speed: number; phase: number }> = []
    let seed = 1
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    for (let i = 0; i < PULSE_N; i++) {
      // Favour the two densest, brightest shells so signals read on the spine.
      const shell = rnd() < 0.62 ? (rnd() < 0.5 ? 0 : 1) : (rnd() < 0.5 ? 2 : 3)
      const ring = Math.floor(rnd() * shells[shell].rings)
      arr.push({
        shell,
        ring,
        speed: 0.06 + rnd() * 0.05, // fraction of the arc per second — slow
        phase: rnd(),               // staggered starts
      })
    }
    return arr
  }, [shells])
  const pulseEls = useRef<Array<SVGCircleElement | null>>([])

  useEffect(() => {
    const CX = 500, CY = 500, RAD = 300, PERSP = 0.36, TILT = 0.46
    const cosTilt = Math.cos(TILT), sinTilt = Math.sin(TILT)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let maxS = 0
    for (const sh of shells) maxS = Math.max(maxS, sh.samples)
    const bx = new Float32Array(maxS), by = new Float32Array(maxS), bd = new Float32Array(maxS)

    // Group pulses by host shell once, so the per-ring check stays a tiny scan.
    const pulseByShell: number[][] = shells.map(() => [])
    for (let i = 0; i < pulses.length; i++) pulseByShell[pulses[i].shell].push(i)

    function draw(time: number) {
      const t = time / 1000
      for (let si = 0; si < shells.length; si++) {
        const sh = shells[si]
        const ay = t * 0.11 * speed * sh.dir
        const cosY = Math.cos(ay), sinY = Math.sin(ay)
        const env = (0.9 + 0.16 * Math.sin(t * 0.6 + si)) * amp * sh.ampScale
        const w = t * 1.6 * speed, w2 = t * 1.05 * speed
        const seg: string[][] = []
        for (let p = 0; p < P; p++) seg.push(['', '', ''])
        let glow = ''

        for (let ri = 0; ri < sh.rings; ri++) {
          const uX = sh.ux[ri], uY = sh.uy[ri], uZ = sh.uz[ri]
          const vX = sh.vx[ri], vY = sh.vy[ri], vZ = sh.vz[ri]
          const nX = sh.nx[ri], nY = sh.ny[ri], nZ = sh.nz[ri]
          const cX = sh.cx[ri], cY = sh.cy[ri], cZ = sh.cz[ri]
          const rr0 = sh.rr[ri], hN = sh.harm[ri], ph = sh.phase[ri]
          const pidx = sh.pal[ri]

          for (let s = 0; s < sh.samples; s++) {
            const ct = sh.cosT[s], st = sh.sinT[s], th = sh.theta[s]
            const pxu = cX + rr0 * (ct * uX + st * vX)
            const pyu = cY + rr0 * (ct * uY + st * vY)
            const pzu = cZ + rr0 * (ct * uZ + st * vZ)
            const dispR =
              0.034 * Math.sin(hN * th + w + ph) +
              0.019 * Math.sin(16 * th + t * 5.4 * speed + ri) +
              0.012 * Math.sin(27 * th - t * 4.0 * speed + ph)
            const dispN =
              0.030 * Math.sin((hN + 3) * th - w2 + ph * 1.4) +
              0.016 * Math.sin(21 * th + t * 4.7 * speed + ri * 1.7)
            const Rr = sh.radius * (1 + env * dispR)
            const wob = sh.radius * env * dispN
            const x0 = pxu * Rr + nX * wob
            const y0 = pyu * Rr + nY * wob
            const z0 = pzu * Rr + nZ * wob
            const x1 = x0 * cosY + z0 * sinY
            const z1 = -x0 * sinY + z0 * cosY
            const y2 = y0 * cosTilt - z1 * sinTilt
            const z2 = y0 * sinTilt + z1 * cosTilt
            const persp = 1 / (1 - z2 * PERSP)
            bx[s] = CX + x1 * RAD * persp
            by[s] = CY + y2 * RAD * persp
            bd[s] = (z2 + 1) * 0.5
          }
          const tgt = seg[pidx]
          for (let s = 0; s < sh.samples - 1; s++) {
            const d = (bd[s] + bd[s + 1]) * 0.5
            const bk = d < 0.4 ? 0 : d < 0.68 ? 1 : 2
            const m =
              'M' + bx[s].toFixed(1) + ' ' + by[s].toFixed(1) +
              'L' + bx[s + 1].toFixed(1) + ' ' + by[s + 1].toFixed(1)
            tgt[bk] += m
            if (d > 0.58) glow += m
          }

          // Park any pulse riding this ring at its current point on the arc.
          const here = pulseByShell[si]
          for (let k = 0; k < here.length; k++) {
            const pi = here[k]
            const pu = pulses[pi]
            if (pu.ring !== ri) continue
            const el = pulseEls.current[pi]
            if (!el) continue
            const last = sh.samples - 1
            // Looping head position along the arc, in [0, last).
            const frac = (pu.phase + t * pu.speed) % 1
            const fpos = frac * last
            const s0 = Math.floor(fpos)
            const s1 = s0 + 1 <= last ? s0 + 1 : last
            const f = fpos - s0
            const hx = bx[s0] + (bx[s1] - bx[s0]) * f
            const hy = by[s0] + (by[s1] - by[s0]) * f
            const hd = bd[s0] + (bd[s1] - bd[s0]) * f
            // Visible only on the front-facing arc; gentle fade in/out at the rim.
            const vis = hd <= 0.5 ? 0 : Math.min(1, (hd - 0.5) / 0.18)
            el.setAttribute('cx', hx.toFixed(1))
            el.setAttribute('cy', hy.toFixed(1))
            el.setAttribute('opacity', (vis * (0.85 - si * 0.12)).toFixed(3))
          }
        }
        const grp = shellEls.current[si]
        for (let p = 0; p < P; p++) {
          grp[p][0]?.setAttribute('d', seg[p][0])
          grp[p][1]?.setAttribute('d', seg[p][1])
          grp[p][2]?.setAttribute('d', seg[p][2])
        }
        glowEls.current[si]?.setAttribute('d', glow)
      }

      if (coreRef.current) {
        const s = 1 + Math.sin(t * 1.5) * 0.06
        coreRef.current.setAttribute('transform', `translate(${CX} ${CY}) scale(${s.toFixed(3)})`)
      }
    }

    let raf = 0
    const t0 = performance.now()
    // first frame synchronously — content before rAF ever fires
    draw(reduce ? 1600 : 0)
    if (!reduce) {
      const loop = (now: number) => {
        draw(now - t0)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    return () => cancelAnimationFrame(raf)
  }, [shells, pulses, speed, amp])

  const col = (p: number, L: number) => `hsl(${PALETTE[p][0]} ${PALETTE[p][1]}% ${L}%)`

  return (
    <div className={className} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="wo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="wo-pulse" x="-220%" y="-220%" width="540%" height="540%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          {/* signal dot — cyan core fading to a mint halo */}
          <radialGradient id="wo-pulse-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eafffb" />
            <stop offset="32%" stopColor="hsl(176 100% 78%)" />
            <stop offset="66%" stopColor="hsl(162 95% 60% / 0.55)" />
            <stop offset="100%" stopColor="hsl(188 95% 60% / 0)" />
          </radialGradient>
          <radialGradient id="wo-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor={`hsl(${hue} 70% 95%)`} />
            <stop offset="38%" stopColor={`hsl(${hue} 78% 80% / 0.42)`} />
            <stop offset="62%" stopColor={`hsl(${hue + 18} 80% 70% / 0.16)`} />
            <stop offset="100%" stopColor={`hsl(${hue} 60% 78% / 0)`} />
          </radialGradient>
        </defs>
        {shells.map((_, si) => {
          const w = layerWeight[si]
          return (
            <g key={si} style={{ mixBlendMode: 'screen' }}>
              <path
                ref={(el) => { glowEls.current[si] = el }}
                fill="none" stroke="hsl(190 82% 70%)" strokeWidth={2.3 - si * 0.2}
                opacity={(0.13 * w).toFixed(3)} filter="url(#wo-glow)"
              />
              {PALETTE.map((__, p) => (
                <g key={p}>
                  <path ref={(el) => { shellEls.current[si][p][0] = el }} fill="none" stroke={col(p, 50)} strokeWidth="0.55" opacity={(0.16 * w).toFixed(3)} />
                  <path ref={(el) => { shellEls.current[si][p][1] = el }} fill="none" stroke={col(p, 60)} strokeWidth="0.8" opacity={(0.30 * w).toFixed(3)} />
                  <path ref={(el) => { shellEls.current[si][p][2] = el }} fill="none" stroke={col(p, 70)} strokeWidth="1.1" opacity={(0.52 * w).toFixed(3)} />
                </g>
              ))}
            </g>
          )
        })}
        {/* travelling signals — positioned each frame in the draw loop */}
        <g style={{ mixBlendMode: 'screen' }} filter="url(#wo-pulse)">
          {pulses.map((pu, i) => (
            <circle
              key={i}
              ref={(el) => { pulseEls.current[i] = el }}
              cx="500" cy="500" r={(3.4 - pu.shell * 0.5).toFixed(2)}
              fill="url(#wo-pulse-grad)" opacity="0"
            />
          ))}
        </g>
        <g ref={coreRef} style={{ mixBlendMode: 'screen' }}>
          <circle r="58" fill="url(#wo-core)" />
        </g>
      </svg>
    </div>
  )
}

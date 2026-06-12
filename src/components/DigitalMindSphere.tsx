/**
 * DigitalMindSphere — a geodesic "hive mind" rendered as an animated SVG.
 *
 * Pure React + SVG (no WebGL, no canvas). Lightweight, retina-crisp, loops
 * forever. Ported from the canonical Krim Hero design reference and adapted
 * to TypeScript. Algorithm preserved verbatim:
 *   • subdivided icosahedron geometry
 *   • 3D Y-axis rotation with a fixed X-tilt + perspective projection
 *   • three depth-sorted surface-edge layers (additive screen blend)
 *   • interior neuron chords + a drifting hive swarm with constellation links
 *   • a pulse pool of travelling signals that propagate along edges and fire
 *     the receiving nodes (with branching and occasional die-off)
 *   • a luminous core that breathes
 *
 * Respects prefers-reduced-motion (paints one static frame, no RAF loop).
 * Mounted lazily by the hero so it never blocks initial paint.
 */
import React, { useRef, useEffect, useMemo } from 'react'

interface Vertex { x: number; y: number; z: number }
interface IcosphereResult { vertices: Vertex[]; edges: [number, number][] }

function buildIcosphere(level: number): IcosphereResult {
  const t = (1 + Math.sqrt(5)) / 2
  let verts: number[][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map((v) => {
    const l = Math.hypot(v[0], v[1], v[2])
    return [v[0] / l, v[1] / l, v[2] / l]
  })
  let faces: number[][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  for (let s = 0; s < level; s++) {
    const mid = new Map<string, number>()
    const getMid = (a: number, b: number): number => {
      const key = a < b ? a + '_' + b : b + '_' + a
      const cached = mid.get(key)
      if (cached !== undefined) return cached
      const va = verts[a], vb = verts[b]
      const m = [va[0] + vb[0], va[1] + vb[1], va[2] + vb[2]]
      const l = Math.hypot(m[0], m[1], m[2])
      m[0] /= l; m[1] /= l; m[2] /= l
      const idx = verts.push(m) - 1
      mid.set(key, idx)
      return idx
    }
    const next: number[][] = []
    for (const [a, b, c] of faces) {
      const ab = getMid(a, b), bc = getMid(b, c), ca = getMid(c, a)
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca])
    }
    faces = next
  }

  const edgeSet = new Set<string>()
  const edges: [number, number][] = []
  const addEdge = (a: number, b: number) => {
    const key = a < b ? a + '_' + b : b + '_' + a
    if (edgeSet.has(key)) return
    edgeSet.add(key)
    edges.push([a, b])
  }
  for (const [a, b, c] of faces) { addEdge(a, b); addEdge(b, c); addEdge(c, a) }

  return {
    vertices: verts.map((v) => ({ x: v[0], y: v[1], z: v[2] })),
    edges,
  }
}

interface DigitalMindProps {
  /** CSS size string applied to the wrapper. Defaults to 100% (fills parent). */
  size?: string
  /** Base hue (HSL degrees). 200–210 = cool blue (default reference). */
  hue?: number
  /** Rotation speed multiplier. */
  speed?: number
  /** Icosphere subdivisions. 1 ≈ 42 nodes, 2 ≈ 162, 3 ≈ 642. */
  level?: number
  className?: string
}

export default function DigitalMindSphere({
  size = '100%',
  hue = 202,
  speed = 1,
  level = 2,
  className = '',
}: DigitalMindProps) {
  const { vertices, edges } = useMemo(() => buildIcosphere(level), [level])

  const svgRef = useRef<SVGSVGElement>(null)
  const nodeEls = useRef<(SVGCircleElement | null)[]>([])
  const bucketEls = useRef<(SVGPathElement | null)[]>([])      // 3 depth-sorted surface-edge layers
  const innerEls = useRef<(SVGPathElement | null)[]>([])       // 2 depth layers for interior chords
  const hiveEls = useRef<(SVGPathElement | null)[]>([])        // 2 depth layers for drifting hive links
  const pulseEls = useRef<(SVGCircleElement | null)[]>([])
  const swarmEls = useRef<(SVGCircleElement | null)[]>([])     // drifting interior swarm nodes
  const coreRef = useRef<SVGGElement>(null)

  const POOL = 130   // max simultaneous travelling signals
  const SWARM = 220  // drifting interior nodes (the "hive")

  // Interior neuron wiring: chords through the sphere + full adjacency graph
  const { internalEdges, adj } = useMemo(() => {
    const N = vertices.length
    const adj: number[][] = Array.from({ length: N }, () => [])
    const seen = new Set<string>()
    const key = (a: number, b: number) => (a < b ? a + '_' + b : b + '_' + a)
    for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); seen.add(key(a, b)) }
    const internal: [number, number][] = []
    const perNode = 4
    for (let i = 0; i < N; i++) {
      let added = 0, tries = 0
      while (added < perNode && tries < 60) {
        tries++
        const j = (Math.random() * N) | 0
        if (j === i || seen.has(key(i, j))) continue
        const dx = vertices[i].x - vertices[j].x
        const dy = vertices[i].y - vertices[j].y
        const dz = vertices[i].z - vertices[j].z
        const d = Math.hypot(dx, dy, dz)
        if (d < 0.85 || d > 1.92) continue   // mid-range chords cross the interior
        seen.add(key(i, j))
        internal.push([i, j])
        adj[i].push(j); adj[j].push(i)
        added++
      }
    }
    return { internalEdges: internal, adj }
  }, [vertices, edges])

  // Drifting interior swarm — many small nodes wandering inside the sphere volume
  const swarm = useMemo(() => {
    const M = SWARM
    const sx = new Float32Array(M), sy = new Float32Array(M), sz = new Float32Array(M)
    const vx = new Float32Array(M), vy = new Float32Array(M), vz = new Float32Array(M)
    const ph = new Float32Array(M)
    for (let i = 0; i < M; i++) {
      let x = 0, y = 0, z = 0, r2 = 0
      do {
        x = Math.random() * 2 - 1; y = Math.random() * 2 - 1; z = Math.random() * 2 - 1
        r2 = x * x + y * y + z * z
      } while (r2 > 1 || r2 < 1e-4)
      const rad = 0.12 + Math.pow(Math.random(), 0.5) * 0.74
      const inv = rad / Math.sqrt(r2)
      sx[i] = x * inv; sy[i] = y * inv; sz[i] = z * inv
      const s = 0.0011
      vx[i] = (Math.random() * 2 - 1) * s
      vy[i] = (Math.random() * 2 - 1) * s
      vz[i] = (Math.random() * 2 - 1) * s
      ph[i] = Math.random() * 6.283
    }
    return { M, sx, sy, sz, vx, vy, vz, ph }
  }, [level])

  useEffect(() => {
    const CX = 500, CY = 500, RAD = 332, PERSP = 0.34, TILT = 0.42
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT)
    const reduce = typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const N = vertices.length
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pd = new Float32Array(N) // depth 0(back)..1(front)
    const M = swarm.M
    const spx = new Float32Array(M), spy = new Float32Array(M), spd = new Float32Array(M)

    function project(ay: number) {
      const cosY = Math.cos(ay), sinY = Math.sin(ay)
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i]
        const x1 = v.x * cosY + v.z * sinY
        const z1 = -v.x * sinY + v.z * cosY
        const y1 = v.y
        const y2 = y1 * cosT - z1 * sinT
        const z2 = y1 * sinT + z1 * cosT
        const persp = 1 / (1 - z2 * PERSP)
        px[i] = CX + x1 * RAD * persp
        py[i] = CY + y2 * RAD * persp
        pd[i] = (z2 + 1) * 0.5
      }
    }

    function projectSwarm(ay: number) {
      const cosY = Math.cos(ay), sinY = Math.sin(ay)
      const { sx, sy, sz } = swarm
      for (let i = 0; i < M; i++) {
        const x1 = sx[i] * cosY + sz[i] * sinY
        const z1 = -sx[i] * sinY + sz[i] * cosY
        const y1 = sy[i]
        const y2 = y1 * cosT - z1 * sinT
        const z2 = y1 * sinT + z1 * cosT
        const persp = 1 / (1 - z2 * PERSP)
        spx[i] = CX + x1 * RAD * persp
        spy[i] = CY + y2 * RAD * persp
        spd[i] = (z2 + 1) * 0.5
      }
    }

    function updateSwarm(t: number) {
      const { sx, sy, sz, vx, vy, vz } = swarm
      for (let i = 0; i < M; i++) {
        vx[i] += Math.sin(sy[i] * 4 + t * 0.6) * 0.00003
        vy[i] += Math.sin(sz[i] * 4 + t * 0.5) * 0.00003
        vz[i] += Math.sin(sx[i] * 4 + t * 0.7) * 0.00003
        vx[i] *= 0.992; vy[i] *= 0.992; vz[i] *= 0.992
        sx[i] += vx[i]; sy[i] += vy[i]; sz[i] += vz[i]
        const r = Math.hypot(sx[i], sy[i], sz[i])
        if (r > 0.9) {
          const nx = sx[i] / r, ny = sy[i] / r, nz = sz[i] / r
          sx[i] = nx * 0.9; sy[i] = ny * 0.9; sz[i] = nz * 0.9
          const dot = vx[i] * nx + vy[i] * ny + vz[i] * nz
          vx[i] -= 2 * dot * nx; vy[i] -= 2 * dot * ny; vz[i] -= 2 * dot * nz
        }
      }
    }

    // Signal propagation: pulses ride edges; on arrival a node fires & re-emits
    interface Signal { a: number; b: number; t: number; spd: number }
    const sig: Signal[] = []
    function emit(a: number, b: number) {
      if (sig.length < POOL) sig.push({ a, b, t: 0, spd: 0.26 + Math.random() * 0.4 })
    }
    function seed(k: number) {
      for (let i = 0; i < k; i++) {
        const a = (Math.random() * N) | 0
        const nb = adj[a]
        if (nb.length) emit(a, nb[(Math.random() * nb.length) | 0])
      }
    }
    seed(34)
    function stepSignals() {
      for (let i = sig.length - 1; i >= 0; i--) {
        const s = sig[i]
        s.t += s.spd * 0.02
        if (s.t >= 1) {
          const b = s.b
          const nb = adj[b]
          let next = nb[(Math.random() * nb.length) | 0]
          if (nb.length > 1) {
            let g = 0
            while (next === s.a && g++ < 4) next = nb[(Math.random() * nb.length) | 0]
          }
          if (sig.length < 95 && Math.random() < 0.5) emit(b, nb[(Math.random() * nb.length) | 0])
          if (Math.random() < 0.06 && sig.length > 26) { sig.splice(i, 1); continue }
          s.a = b; s.b = next; s.t = 0; s.spd = 0.26 + Math.random() * 0.4
        }
      }
      if (sig.length < 22) seed(10)
    }

    function draw(time: number) {
      // Surface edges → 3 depth buckets
      const seg = ['', '', '']
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i]
        const d = (pd[a] + pd[b]) * 0.5
        const bk = d < 0.4 ? 0 : d < 0.68 ? 1 : 2
        seg[bk] += 'M' + px[a].toFixed(1) + ' ' + py[a].toFixed(1) +
                   'L' + px[b].toFixed(1) + ' ' + py[b].toFixed(1)
      }
      for (let k = 0; k < 3; k++) bucketEls.current[k]?.setAttribute('d', seg[k])

      // Interior chords → 2 depth buckets
      const ins = ['', '']
      for (let i = 0; i < internalEdges.length; i++) {
        const [a, b] = internalEdges[i]
        const d = (pd[a] + pd[b]) * 0.5
        const bk = d < 0.5 ? 0 : 1
        ins[bk] += 'M' + px[a].toFixed(1) + ' ' + py[a].toFixed(1) +
                   'L' + px[b].toFixed(1) + ' ' + py[b].toFixed(1)
      }
      innerEls.current[0]?.setAttribute('d', ins[0])
      innerEls.current[1]?.setAttribute('d', ins[1])

      // Constellation mesh among drifting interior nodes (re-formed each frame)
      let hl0 = '', hl1 = ''
      const TH2 = 0.54 * 0.54, NEAR2 = 0.33 * 0.33
      const sx = swarm.sx, sy = swarm.sy, sz = swarm.sz
      for (let i = 0; i < M; i++) {
        for (let j = i + 1; j < M; j++) {
          const dx = sx[i] - sx[j], dy = sy[i] - sy[j], dz = sz[i] - sz[j]
          const dd = dx * dx + dy * dy + dz * dz
          if (dd < TH2) {
            const s = 'M' + spx[i].toFixed(1) + ' ' + spy[i].toFixed(1) +
                      'L' + spx[j].toFixed(1) + ' ' + spy[j].toFixed(1)
            if (dd < NEAR2) hl0 += s; else hl1 += s
          }
        }
      }
      hiveEls.current[0]?.setAttribute('d', hl0)
      hiveEls.current[1]?.setAttribute('d', hl1)

      // Nodes (steady points — no neuron-firing flash in v2)
      for (let i = 0; i < N; i++) {
        const el = nodeEls.current[i]; if (!el) continue
        const d = pd[i]
        el.setAttribute('cx', px[i].toFixed(1))
        el.setAttribute('cy', py[i].toFixed(1))
        el.setAttribute('r', (2.6 + d * 3.6).toFixed(2))
        el.setAttribute('opacity', (0.22 + d * 0.6).toFixed(3))
      }

      // Drifting interior swarm
      for (let k = 0; k < M; k++) {
        const el = swarmEls.current[k]; if (!el) continue
        const d = spd[k]
        const tw = 0.6 + 0.4 * Math.sin(time * 0.004 + swarm.ph[k])
        el.setAttribute('cx', spx[k].toFixed(1))
        el.setAttribute('cy', spy[k].toFixed(1))
        el.setAttribute('r', ((2.0 + d * 2.9) * tw).toFixed(2))
        el.setAttribute('opacity', (0.3 + d * 0.6).toFixed(3))
      }

      // Travelling signals
      for (let k = 0; k < POOL; k++) {
        const el = pulseEls.current[k]; if (!el) continue
        if (k < sig.length) {
          const s = sig[k]
          const x = px[s.a] + (px[s.b] - px[s.a]) * s.t
          const y = py[s.a] + (py[s.b] - py[s.a]) * s.t
          const d = pd[s.a] + (pd[s.b] - pd[s.a]) * s.t
          el.setAttribute('cx', x.toFixed(1))
          el.setAttribute('cy', y.toFixed(1))
          el.setAttribute('r', (1.8 + d * 3.2).toFixed(2))
          el.setAttribute('opacity', (0.32 + d * 0.68).toFixed(3))
        } else {
          el.setAttribute('opacity', '0')
        }
      }

      if (coreRef.current) {
        const s = 1 + Math.sin(time * 0.0016) * 0.06
        coreRef.current.setAttribute('transform', `translate(${CX} ${CY}) scale(${s.toFixed(3)})`)
      }
    }

    let raf = 0
    const t0 = performance.now()
    // Paint one frame synchronously so something shows even if rAF is throttled
    try { project(-0.6); projectSwarm(-0.6); if (!reduce) stepSignals(); draw(0) } catch (_e) { /* swallow */ }
    if (!reduce) {
      const loop = (now: number) => {
        try {
          const t = (now - t0) / 1000
          const ay = t * 0.16 * speed
          project(ay)
          updateSwarm(t)
          projectSwarm(ay)
          stepSignals()
          draw(now)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('DigitalMind loop error:', e)
          return
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [vertices, edges, internalEdges, adj, swarm, speed])

  const stroke = `hsl(${hue} 90% 62%)`
  const nodeMid = `hsla(${hue} 95% 70%, 0.55)`
  const innerStroke = `hsl(${(hue + 40) % 360} 82% 62%)`

  return (
    <div className={'dm-root ' + className} style={{ width: size, height: size }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="dm-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2ffff" />
            <stop offset="20%" stopColor={`hsl(${hue} 100% 85%)`} />
            <stop offset="48%" stopColor={nodeMid} />
            <stop offset="100%" stopColor={`hsla(${hue} 95% 60%, 0)`} />
          </radialGradient>
          <radialGradient id="dm-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor={`hsl(${hue} 100% 88%)`} />
            <stop offset="100%" stopColor={`hsla(${hue} 100% 75%, 0)`} />
          </radialGradient>
          <radialGradient id="dm-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor={`hsl(${hue} 100% 95%)`} />
            <stop offset="42%" stopColor={`hsla(${hue} 100% 90%, 0.42)`} />
            <stop offset="72%" stopColor={`hsla(${hue} 100% 86%, 0.12)`} />
            <stop offset="100%" stopColor={`hsla(${hue} 100% 86%, 0)`} />
          </radialGradient>
        </defs>

        {/* No ambient halo — only the motion graphic itself paints. */}

        {/* interior neuron chords — wired across the sphere, additive */}
        <g style={{ mixBlendMode: 'screen' }}>
          <path ref={(el) => { innerEls.current[0] = el }} fill="none" stroke={innerStroke} strokeWidth="0.55" opacity="0.09" />
          <path ref={(el) => { innerEls.current[1] = el }} fill="none" stroke={innerStroke} strokeWidth="0.8" opacity="0.2" />
        </g>

        {/* drifting hive links — re-formed each frame as the swarm moves */}
        <g style={{ mixBlendMode: 'screen' }}>
          <path ref={(el) => { hiveEls.current[0] = el }} fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.34" />
          <path ref={(el) => { hiveEls.current[1] = el }} fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.14" />
        </g>

        {/* edges — three depth layers, additive via screen blend (calmer v2 values) */}
        <g style={{ mixBlendMode: 'screen' }}>
          <path ref={(el) => { bucketEls.current[0] = el }} fill="none" stroke={stroke} strokeWidth="0.55" opacity="0.12" />
          <path ref={(el) => { bucketEls.current[1] = el }} fill="none" stroke={stroke} strokeWidth="0.85" opacity="0.24" />
          <path ref={(el) => { bucketEls.current[2] = el }} fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.46" />
        </g>

        {/* nodes */}
        <g style={{ mixBlendMode: 'screen' }}>
          {vertices.map((_, i) => (
            <circle key={i} ref={(el) => { nodeEls.current[i] = el }} r="8" fill="url(#dm-node)" />
          ))}
        </g>

        {/* drifting interior swarm */}
        <g style={{ mixBlendMode: 'screen' }}>
          {Array.from({ length: SWARM }).map((_, i) => (
            <circle key={i} ref={(el) => { swarmEls.current[i] = el }} r="2" fill="url(#dm-node)" opacity="0" />
          ))}
        </g>

        {/* travelling signals — neurons firing */}
        <g style={{ mixBlendMode: 'screen' }}>
          {Array.from({ length: POOL }).map((_, i) => (
            <circle key={i} ref={(el) => { pulseEls.current[i] = el }} r="3" fill="url(#dm-pulse)" opacity="0" />
          ))}
        </g>

        {/* luminous hive core */}
        <g ref={coreRef} style={{ mixBlendMode: 'screen' }}>
          <circle r="58" fill="url(#dm-core)" />
        </g>
      </svg>
    </div>
  )
}

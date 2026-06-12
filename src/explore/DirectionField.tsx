/**
 * PHASE 1 EXPLORATION — DIRECTION C · "THE FIELD"
 *
 * Concept: the runtime as a living field. The orb (the system thinking, in
 * cyan) emits proposed actions as particles; they stream toward a vertical
 * MEMBRANE — the validation gate. On crossing, they ignite mint. A few go
 * amber and are deflected to the exception queue. The orb asset's cyan→mint
 * pinhead handoff becomes the site's entire colour grammar:
 * cyan = proposed / in flight · mint = validated · gold = held.
 *
 * Type:   Space Grotesk (display) · Inter (body) · JetBrains Mono (data)
 * Motion: requestAnimationFrame canvas field (GPU-cheap 2D, ~90 particles,
 *         DPR-aware) · HUD pulses · reduced-motion renders one static frame.
 *
 * Facts: docs/krim-content.md (33 validators in three families · KWU).
 * The orb drawing is a lightweight homage to docs/krim-wave-orb.html —
 * Phase 2 swaps in the faithful extracted asset for the winning direction.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const inView = { once: true, amount: 0.25 } as const

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// The field — orb · particles · membrane (2D canvas)
// ---------------------------------------------------------------------------
type P = { x: number; y: number; vx: number; vy: number; state: 'cyan' | 'mint' | 'amber'; age: number; flash: number }

function FieldCanvas({ onValidate }: { onValidate: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0, t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ps: P[] = []

    const size = () => {
      const r = cv.getBoundingClientRect()
      w = r.width; h = r.height
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)

    const orb = () => ({ x: w * 0.26, y: h * 0.52, r: Math.min(w, h) * 0.21 })
    const memX = () => w * 0.66

    const spawn = () => {
      const o = orb()
      const a = (Math.random() - 0.5) * 1.1
      ps.push({
        x: o.x + Math.cos(a) * o.r, y: o.y + Math.sin(a) * o.r,
        vx: 0.55 + Math.random() * 0.5, vy: (Math.random() - 0.5) * 0.34,
        state: 'cyan', age: 0, flash: 0,
      })
    }

    const drawOrb = (o: { x: number; y: number; r: number }) => {
      ctx.save()
      ctx.translate(o.x, o.y)
      // outer ring
      ctx.strokeStyle = 'rgba(57,214,255,0.5)'
      ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.ellipse(0, 0, o.r, o.r, 0, 0, Math.PI * 2); ctx.stroke()
      // breathing inner ring
      const br = o.r * (0.86 + Math.sin(t * 0.011) * 0.025)
      ctx.strokeStyle = 'rgba(57,214,255,0.16)'
      ctx.beginPath(); ctx.ellipse(0, 0, br, br, 0, 0, Math.PI * 2); ctx.stroke()
      // three wave lines (the asset's language)
      for (let k = 0; k < 3; k++) {
        const yo = (k - 1) * o.r * 0.42
        const amp = o.r * (0.16 - Math.abs(k - 1) * 0.05)
        ctx.strokeStyle = `rgba(57,214,255,${0.55 - Math.abs(k - 1) * 0.18})`
        ctx.lineWidth = k === 1 ? 1.4 : 1
        ctx.beginPath()
        for (let px = -o.r; px <= o.r; px += 4) {
          const lim = Math.sqrt(Math.max(0, 1 - (px / o.r) ** 2))
          const py = yo * lim + Math.sin(px * 0.02 + t * 0.02 + k * 1.7) * amp * lim
          px === -o.r ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.stroke()
      }
      // pale core
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, o.r * 0.5)
      g.addColorStop(0, 'rgba(191,239,255,0.14)'); g.addColorStop(1, 'rgba(191,239,255,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.ellipse(0, 0, o.r * 0.5, o.r * 0.5, 0, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    const drawMembrane = (mx: number) => {
      const grad = ctx.createLinearGradient(mx, 0, mx, h)
      grad.addColorStop(0, 'rgba(0,255,178,0)')
      grad.addColorStop(0.5, 'rgba(0,255,178,0.75)')
      grad.addColorStop(1, 'rgba(0,255,178,0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.4
      ctx.setLineDash([7, 5])
      ctx.lineDashOffset = -t * 0.18
      ctx.beginPath(); ctx.moveTo(mx, h * 0.08); ctx.lineTo(mx, h * 0.92); ctx.stroke()
      ctx.setLineDash([])
    }

    const frame = () => {
      t++
      ctx.clearRect(0, 0, w, h)
      const o = orb(); const mx = memX()
      drawOrb(o); drawMembrane(mx)

      if (!reduced && t % 14 === 0 && ps.length < 90) spawn()

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.age++
        p.x += p.vx; p.y += p.vy + Math.sin(p.age * 0.04 + i) * 0.12
        // the crossing
        if (p.state === 'cyan' && p.x >= mx) {
          if (Math.random() < 0.07) { p.state = 'amber'; p.vx *= -0.35; p.vy = -0.5 }
          else { p.state = 'mint'; p.flash = 14; onValidate() }
        }
        if (p.flash > 0) p.flash--
        const dead = p.x > w + 12 || p.x < -12 || p.age > 1300
        if (dead) { ps.splice(i, 1); continue }
        const col = p.state === 'cyan' ? '57,214,255' : p.state === 'mint' ? '0,255,178' : '200,161,74'
        const alpha = p.state === 'amber' ? Math.max(0, 0.8 - p.age * 0.004) : 0.85
        if (p.flash > 0) {
          ctx.fillStyle = `rgba(${col},${0.16 * (p.flash / 14)})`
          ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fill()
        }
        ctx.fillStyle = `rgba(${col},${alpha})`
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill()
        // faint trail
        ctx.strokeStyle = `rgba(${col},0.18)`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(p.x - p.vx * 7, p.y - p.vy * 7); ctx.lineTo(p.x, p.y); ctx.stroke()
      }

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    if (reduced) {
      // one composed static frame: orb, membrane, a handful of settled particles
      for (let i = 0; i < 26; i++) { spawn(); const p = ps[i]; p.x += Math.random() * w * 0.55; if (p.x >= memX()) p.state = 'mint' }
      frame()
    } else {
      // seed a few in-flight particles, then draw the first frame
      // SYNCHRONOUSLY — content at first paint, before rAF ever fires.
      for (let i = 0; i < 14; i++) { spawn(); ps[i].x += Math.random() * w * 0.5; if (ps[i].x >= memX()) ps[i].state = 'mint' }
      frame() // draws once and schedules the rAF loop
    }
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [onValidate])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />
}

// ---------------------------------------------------------------------------
// 33 validators — three families, eleven cells each, lighting in sequence
// ---------------------------------------------------------------------------
function ValidatorGrid() {
  const [lit, setLit] = useState(reduced ? 33 : 0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      let n = 0
      const t = setInterval(() => { n++; setLit(n); if (n >= 33) clearInterval(t) }, 38)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const fams = [
    ['Pramāṇa', 'sources of knowledge'],
    ['Doṣa', 'classes of error'],
    ['Yogyatā', 'fitness for action'],
  ] as const

  return (
    <div ref={ref} className="grid sm:grid-cols-3 gap-8">
      {fams.map(([name, sub], fi) => (
        <div key={name} className="p-6" style={{ border: '1px solid var(--f-line)' }}>
          <div className="flex gap-1.5 mb-5" aria-hidden>
            {Array.from({ length: 11 }).map((_, ci) => {
              const idx = fi * 11 + ci
              const on = idx < lit
              return (
                <span
                  key={ci}
                  className="h-[18px] flex-1 transition-colors duration-300"
                  style={{ background: on ? 'var(--f-mint)' : 'rgba(57,214,255,0.10)', opacity: on ? 0.9 : 1 }}
                />
              )
            })}
          </div>
          <p className="f-display text-[1.15rem] mb-0.5" style={{ color: 'var(--f-text)' }}>{name}</p>
          <p className="f-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--f-text-3)' }}>{sub} · 11</p>
        </div>
      ))}
    </div>
  )
}

// ===========================================================================
export default function DirectionField() {
  const counter = useRef<HTMLSpanElement>(null)
  const count = useRef(84205113)
  const onValidate = () => {
    count.current++
    if (counter.current) counter.current.textContent = count.current.toLocaleString('en-US')
  }

  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          background: 'var(--f-bg)',
          color: 'var(--f-text-2)',
          '--f-bg': '#04060C',
          '--f-panel': 'rgba(57,214,255,0.03)',
          '--f-line': 'rgba(57,214,255,0.16)',
          '--f-line-dim': 'rgba(57,214,255,0.08)',
          '--f-text': '#F6F6F4',
          '--f-text-2': '#A9ADB6',
          '--f-text-3': '#6B7078',
          '--f-cyan': '#39D6FF',
          '--f-pale': '#BFEFFF',
          '--f-mint': '#00FFB2',
          '--f-gold': '#C8A14A',
        } as React.CSSProperties
      }
    >
      <style>{`
        .f-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
        .f-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .f-sans    { font-family: 'Inter', system-ui, sans-serif; }
        .f-corner  { position: relative; }
        .f-corner::before, .f-corner::after {
          content: ''; position: absolute; width: 14px; height: 14px; pointer-events: none;
          border-color: var(--f-line); border-style: solid;
        }
        .f-corner::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .f-corner::after  { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
      `}</style>

      {/* HUD chrome */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5">
        <a href="/explore" className="f-display text-[15px] tracking-[0.28em] font-semibold uppercase" style={{ color: 'var(--f-mint)' }}>Krim</a>
        <p className="f-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--f-text-3)' }}>Direction C · The Field</p>
      </header>

      {/* ============ HERO — the living field ============ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
        <FieldCanvas onValidate={onValidate} />
        {/* legibility wash behind the copy */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(4,6,12,0.25) 0%, rgba(4,6,12,0) 35%, rgba(4,6,12,0.82) 86%)' }} aria-hidden />

        <div className="relative z-10 px-6 md:px-10 pb-10 md:pb-14">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[1280px] mx-auto">
            <motion.p variants={rise} className="f-mono text-[11px] tracking-[0.26em] uppercase mb-6" style={{ color: 'var(--f-cyan)' }}>
              Proposed in cyan <span style={{ color: 'var(--f-text-3)' }}>·</span> validated in mint <span style={{ color: 'var(--f-text-3)' }}>·</span> nothing executes unchecked
            </motion.p>
            <motion.h1
              variants={rise}
              className="f-display font-medium text-[clamp(2.6rem,6.2vw,5.25rem)] leading-[0.98] tracking-[-0.03em] max-w-[14ch] mb-7"
              style={{ color: 'var(--f-text)' }}
            >
              The AI your regulator can read.
            </motion.h1>
            <motion.p variants={rise} className="f-sans text-[1.1rem] leading-[1.6] max-w-[48ch] mb-9">
              The agent-native operating system for end-to-end lending operations.
              Every action crosses the validation membrane before it executes — or it never does.
            </motion.p>
            <motion.div variants={rise} className="flex flex-wrap items-center gap-5 mb-12">
              <a href="#runtime" className="f-display text-[15px] font-medium px-7 py-3.5 transition-transform hover:-translate-y-0.5" style={{ background: 'var(--f-mint)', color: '#04130D' }}>
                Request a pilot
              </a>
              <a href="#runtime" className="f-mono text-[12px] tracking-[0.16em] uppercase hover:underline underline-offset-4" style={{ color: 'var(--f-text-2)' }}>
                Enter the runtime ↓
              </a>
            </motion.div>

            {/* HUD strip */}
            <motion.div variants={rise} className="f-corner grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'var(--f-line-dim)', border: '1px solid var(--f-line-dim)' }}>
              {[
                ['Actions validated', <span key="c" ref={counter}>84,205,113</span>, 'var(--f-mint)'],
                ['Validators per action', '33 · three families', 'var(--f-text)'],
                ['Jurisdictions', 'US · UK · IN', 'var(--f-text)'],
                ['Metering', 'Krim Work Units', 'var(--f-text)'],
              ].map(([k, v, c], i) => (
                <div key={i} className="px-5 py-4" style={{ background: 'var(--f-bg)' }}>
                  <p className="f-mono text-[9.5px] tracking-[0.18em] uppercase mb-1.5" style={{ color: 'var(--f-text-3)' }}>{k as string}</p>
                  <p className="f-mono text-[14px]" style={{ color: c as string }}>{v as React.ReactNode}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ THE RUNTIME — pipeline + validator grid ============ */}
      <section id="runtime" className="px-6 md:px-10 py-24 md:py-36">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="mb-14">
            <motion.p variants={rise} className="f-mono text-[11px] tracking-[0.26em] uppercase mb-6" style={{ color: 'var(--f-mint)' }}>
              The runtime
            </motion.p>
            <motion.h2 variants={rise} className="f-display font-medium text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.025em] max-w-[22ch] mb-6" style={{ color: 'var(--f-text)' }}>
              Perceive. Reason. Plan. <span style={{ color: 'var(--f-mint)' }}>Validate.</span> Act.
            </motion.h2>
            <motion.p variants={rise} className="f-sans text-[1.05rem] leading-[1.65] max-w-[60ch]">
              Krim-Nyāya gates every proposed action with 33 validators derived from Mithila's
              Navya-Nyāya formal logic. Pass executes. Amber holds for a human. Fail never fires.
              Pre-execution, not post-audit.
            </motion.p>
          </motion.div>

          {/* pipeline rail */}
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={rise} className="hidden md:flex items-center mb-14">
            {['Perceive', 'Reason', 'Plan', 'Validate', 'Act'].map((s, i) => (
              <div key={s} className="flex items-center" style={{ flex: s === 'Validate' ? '0 0 auto' : '1 1 0' }}>
                <span
                  className={`f-mono text-[12px] tracking-[0.18em] uppercase whitespace-nowrap ${s === 'Validate' ? 'px-5 py-3' : ''}`}
                  style={
                    s === 'Validate'
                      ? { border: '1px solid var(--f-mint)', color: 'var(--f-mint)', background: 'rgba(0,255,178,0.05)' }
                      : { color: 'var(--f-text-2)' }
                  }
                >
                  {s}
                </span>
                {i < 4 && <span className="flex-1 h-px mx-4" style={{ background: i === 2 ? 'var(--f-cyan)' : 'var(--f-line)', opacity: i === 2 ? 0.5 : 1 }} aria-hidden />}
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={rise}>
            <ValidatorGrid />
          </motion.div>
        </div>
      </section>

      {/* ============ ONE STACK ============ */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ borderTop: '1px solid var(--f-line-dim)' }}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="lg:col-span-5">
            <motion.p variants={rise} className="f-mono text-[11px] tracking-[0.26em] uppercase mb-6" style={{ color: 'var(--f-mint)' }}>
              The solution
            </motion.p>
            <motion.h2 variants={rise} className="f-display font-medium text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.025em] mb-6" style={{ color: 'var(--f-text)' }}>
              One stack. Both sides of the wall.
            </motion.h2>
            <motion.p variants={rise} className="f-sans text-[1.02rem] leading-[1.65] max-w-[44ch]">
              KrimOS runs customer-facing and back-office work as one AI workforce,
              on one audit trail, one source of truth.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="lg:col-span-7 space-y-px" style={{}}>
            {[
              ['01 · One workforce', 'The same runtime operates across both sides; every action lands on one audit trail.'],
              ['02 · Compliance as physics', 'Every action is validated against law, policy, consent and context before it executes. Compliance becomes a property of the runtime, not a department’s vigilance.'],
              ['03 · Sovereign by architecture', 'Customer data, model weights, orchestration and telemetry stay inside the institution’s perimeter. No mode requires data to leave.'],
            ].map(([k, v]) => (
              <motion.div key={k} variants={rise} className="f-corner p-6 md:p-7 mb-4" style={{ border: '1px solid var(--f-line-dim)', background: 'var(--f-panel)' }}>
                <p className="f-mono text-[11px] tracking-[0.18em] uppercase mb-2.5" style={{ color: 'var(--f-mint)' }}>{k}</p>
                <p className="f-sans text-[15px] leading-[1.65]" style={{ color: 'var(--f-text-2)' }}>{v}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CLOSE ============ */}
      <section className="relative px-6 md:px-10 py-28 md:py-44 text-center overflow-hidden" style={{ borderTop: '1px solid var(--f-line-dim)' }}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,255,178,0.06) 0%, rgba(57,214,255,0.03) 40%, transparent 70%)' }}
          aria-hidden
        />
        <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger} className="relative max-w-[840px] mx-auto">
          <motion.h2 variants={rise} className="f-display font-medium text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.04] tracking-[-0.025em] mb-7" style={{ color: 'var(--f-text)' }}>
            The operating system for the operations that cannot afford to be wrong.
          </motion.h2>
          <motion.p variants={rise} className="f-sans text-[1.05rem] leading-[1.65] mb-11 max-w-[54ch] mx-auto">
            The runtime is the product. Validation is the architecture, not an add-on.
            Sovereignty is a commitment, not a deployment option.
          </motion.p>
          <motion.div variants={rise}>
            <a href="#" className="f-display inline-block text-[15px] font-medium px-8 py-4 transition-transform hover:-translate-y-0.5" style={{ background: 'var(--f-mint)', color: '#04130D' }}>
              Let's run a pilot
            </a>
            <p className="f-mono text-[10.5px] tracking-[0.14em] uppercase mt-5" style={{ color: 'var(--f-text-3)' }}>
              Free 30-minute consult · automation potential + a 90-day plan
            </p>
          </motion.div>
        </motion.div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--f-line-dim)' }}>
        <p className="f-mono text-[11px] tracking-[0.1em]" style={{ color: 'var(--f-text-3)' }}>Intelligence by policy.</p>
        <p className="f-mono text-[11px] tracking-[0.1em]" style={{ color: 'var(--f-text-3)' }}>© Krim · US · UK · India</p>
      </footer>
    </div>
  )
}

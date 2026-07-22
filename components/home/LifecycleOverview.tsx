'use client'

/**
 * LifecycleOverview — homepage §2: the glanceable lending lifecycle.
 *
 * One current, eight named stages, three outcomes — no console, no tabs, no
 * chips. This section makes the scope legible in five seconds; the full
 * instrument (LoanMeridian, §9 #who) carries the depth for readers who have
 * scrolled far enough to want it, and the pill below hands them there.
 * Stage data is imported from LoanMeridian — one source of truth.
 */

import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { STAGES } from './LoanMeridian'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const


// What it adds up to — the three institutional outcomes (rendered here, above
// the fold, where the claim earns the scroll; the deep section proves it).
const OUTCOMES = [
  { impact: 'Scale without the headcount.', hi: 'Scale', tag: 'Acquisition to closure.' },
  { impact: 'Audit evidence in minutes.', hi: 'minutes', tag: 'Assembled on demand.' },
  // "The world model" not "Kovida": §2 renders before §4 introduces the name.
  { impact: 'Sharper with every loan.', hi: 'Sharper', tag: 'The world model learns.' },
] as const

export default function LifecycleOverview() {
  const reduce = useReducedMotion()
  return (
    <Section hairline id="lifecycle">
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>The lending lifecycle</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            One operating system, from first enquiry to final payoff.
          </h2>
          <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
            AI co-workers carry every loan as{' '}
            <span className="text-mint">one connected current of work</span> — each action
            validated before it fires, risk and compliance under every step.
          </p>
        </div>
      </Reveal>

      {/* ---- THE LENDING HORIZON (desktop) — the lifecycle as a dawn scene,
              not a diagram. Eight glass steles stand along the limb of a
              world (a shallow arc of a circle whose centre sits far below);
              the current runs cyan (first enquiry, west) → mint (validated,
              east) and crests into a dawn bloom at Closure, from which a
              faint dashed return sweeps back overhead — the cycle, told as
              first light. One comet runs the horizon and dissolves into the
              dawn. The vantage + directional light are what lift this out of
              "diagram": a scene has a camera and a sun. Also quietly seeds
              §4's world model — the curved limb reads as the edge of a
              world, one section before Kovida names it. ---- */}
      <Reveal delay={0.12}>
        <div
          className="relative mx-auto mt-6 hidden aspect-[1040/300] w-full max-w-[960px] lg:block"
          role="group"
          aria-label="The eight lifecycle stages, one continuous current from first enquiry to final payoff"
        >
          {/* layer 0 — the night behind the scene: a soft vignette dims the
              woven-ring backdrop so the horizon owns its own light. Without
              this the arc and chips fight the threads behind them. */}
          <div
            aria-hidden
            className="absolute -inset-x-10 -inset-y-8"
            style={{
              background:
                'radial-gradient(64% 66% at 50% 52%, rgba(4,6,12,0.84) 0%, rgba(4,6,12,0.56) 52%, rgba(4,6,12,0.2) 74%, transparent 90%)',
            }}
          />

          {/* layer 1 — the current and the dawn (SVG scene): ONE arc, one
              light. overflow-visible lets the dawn's glow fade past the frame
              instead of clipping into a hard edge. */}
          <svg aria-hidden viewBox="0 30 1040 300" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="lc-current" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39D6FF" />
                <stop offset="1" stopColor="#00FFB2" />
              </linearGradient>
              {/* the halo gains energy west→east: a murmur at enquiry, a surge at the dawn */}
              <linearGradient id="lc-current-glow" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39D6FF" stopOpacity="0.16" />
                <stop offset="0.55" stopColor="#12E9CE" stopOpacity="0.42" />
                <stop offset="1" stopColor="#00FFB2" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="lc-dawn-glow">
                <stop offset="0" stopColor="#00FFB2" stopOpacity="0.55" />
                <stop offset="0.35" stopColor="#00FFB2" stopOpacity="0.22" />
                <stop offset="1" stopColor="#00FFB2" stopOpacity="0" />
              </radialGradient>
              {/* the sun: a warm heart inside mint — sunlight, kept to a whisper */}
              <radialGradient id="lc-sun">
                <stop offset="0" stopColor="#FFE9B0" stopOpacity="0.82" />
                <stop offset="0.18" stopColor="#00FFB2" stopOpacity="0.9" />
                <stop offset="0.6" stopColor="#00FFB2" stopOpacity="0.24" />
                <stop offset="1" stopColor="#00FFB2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lc-west-glow">
                <stop offset="0" stopColor="#39D6FF" stopOpacity="0.3" />
                <stop offset="0.4" stopColor="#39D6FF" stopOpacity="0.1" />
                <stop offset="1" stopColor="#39D6FF" stopOpacity="0" />
              </radialGradient>
              <filter id="lc-soft">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* the dawn at Closure — a real sunrise, not a hotspot: sky-glow
                biased ABOVE the horizon, a wide band of first light raking
                west along the arc, and a soft sun disc whose warm heart says
                sunlight. Back → front. */}
            {/* breathe lives on the UN-blurred shapes only — scaling a
                filtered node re-rasters the blur every frame */}
            <g>
              <ellipse className="dawn-bloom" cx="949" cy="204" rx="150" ry="168" fill="url(#lc-dawn-glow)" style={{ mixBlendMode: 'screen' }} />
              <ellipse cx="934" cy="230" rx="238" ry="9" fill="url(#lc-dawn-glow)" opacity="0.85" style={{ mixBlendMode: 'screen', filter: 'blur(6px)' }} />
              <circle className="dawn-core" cx="949" cy="230" r="30" fill="url(#lc-sun)" style={{ mixBlendMode: 'screen' }} />
            </g>

            {/* cold first light in the west — the dawn's counterweight: a
                glimmer only, never a disc. Cyan = enquiry, at the exact point
                the loan enters. */}
            <ellipse cx="91" cy="214" rx="78" ry="86" fill="url(#lc-west-glow)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="104" cy="230" rx="122" ry="7" fill="url(#lc-west-glow)" opacity="0.7" style={{ mixBlendMode: 'screen', filter: 'blur(6px)' }} />

            {/* the current — bed · glow · core (the §9 rail grammar, on a
                horizon). The core stays crisp end to end; only the halo
                swells and brightens as the loan validates toward the dawn. */}
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="1" opacity="0.18" fill="none" />
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current-glow)" strokeWidth="3.5" filter="url(#lc-soft)" fill="none" />
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="1.5" opacity="0.95" fill="none" />

            {/* the comet — halo under, bright head over: ONE loan sets out
                from the western glimmer, cruises, decelerates and dissolves
                INTO the dawn, then the horizon rests a beat. The group
                carries the fade envelope; the paths carry the eased travel. */}
            <g className="horizon-comet">
              <path
                className="horizon-glint"
                d="M91 230 A1072 1072 0 0 1 949 230"
                stroke="#BFEFFF"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="44 886"
                opacity="0.5"
                fill="none"
                style={{ mixBlendMode: 'screen', filter: 'blur(4px)' }}
              />
              <path
                className="horizon-glint"
                d="M91 230 A1072 1072 0 0 1 949 230"
                stroke="#F6F6F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="44 886"
                opacity="0.8"
                fill="none"
                style={{ mixBlendMode: 'screen', filter: 'blur(0.5px)' }}
              />
            </g>
          </svg>

          {/* layer 2 — the steles: jewel on the horizon, hairline stem, glass chip */}
          {[
            { x: 91, y: 230 }, { x: 204, y: 188 }, { x: 337, y: 155 }, { x: 457, y: 142 },
            { x: 583, y: 142 }, { x: 708, y: 156 }, { x: 831, y: 186 }, { x: 949, y: 230 },
          ].map((p, i) => {
            const st = STAGES[i]
            // one calm row: every chip rides the arc at the same height, so
            // the chips themselves draw a second gentle parallel of the
            // current. §2 shows the short stage name; §9 carries the full one.
            const lift = 56
            const label = st.area === 'Underwriting support' ? 'Underwriting' : st.area
            return (
              // west→east stagger on first scroll-in: the lifecycle writes
              // itself on, left to right, then rests. One-time; not a loop.
              <motion.div
                key={st.n}
                className="absolute"
                style={{ left: `${(p.x / 1040) * 100}%`, top: `${((p.y - 30) / 300) * 100}%` }}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.52, delay: 0.1 + i * 0.07, ease: OUT_SOFT }}
              >
                {/* jewel — where the stele meets the current, welded to it by
                    a small kiss of its own light on the line */}
                <span className="absolute grid h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span
                    aria-hidden
                    className="absolute bottom-[1px] h-[3px] w-[10px] rounded-full"
                    style={{ background: `rgba(${st.rgb},0.65)`, filter: 'blur(1px)' }}
                  />
                  <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.4)` }} />
                  <span
                    aria-hidden
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.65), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.95)`,
                      boxShadow: `0 0 18px rgba(${st.rgb},0.65)`,
                    }}
                  />
                </span>
                {/* stem — a hairline of the stage's light, rising from the horizon */}
                <span
                  aria-hidden
                  className="absolute left-0 w-px -translate-x-1/2"
                  style={{ top: `-${lift}px`, height: `${lift}px`, background: `linear-gradient(to top, rgba(${st.rgb},0.72), rgba(${st.rgb},0))` }}
                />
                {/* glass chip — the stage name, nothing else */}
                <div
                  className="lc-chip absolute whitespace-nowrap px-3 py-2.5 text-center"
                  style={{ transform: `translate(-50%, calc(-100% - ${lift}px))`, ['--rgb' as string]: st.rgb } as React.CSSProperties}
                >
                  <span className="font-serif text-[0.95rem] leading-tight text-ink">{label}</span>
                </div>
              </motion.div>
            )
          })}

          {/* layer 3 — the compounding tag: a small glass pill beneath the dawn */}
          <div
            className="lc-chip absolute left-[88%] top-[82%] flex -translate-x-1/2 items-center gap-2 px-3.5 py-2"
            style={{ ['--rgb' as string]: '0,255,178' } as React.CSSProperties}
          >
            <span aria-hidden className="text-[12px] leading-none text-mint/90">↺</span>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-mint/90">the cycle compounds</span>
          </div>
        </div>
      </Reveal>

      {/* ---- mobile — the vertical dawn: the horizon turned 90°. The current
              runs down the left (cyan → mint), the stages branch right as
              glass chips, and the line resolves into the dawn bloom at its
              base. A picture, not a control (§9's mobile rail is the tabs). ---- */}
      <Reveal delay={0.12}>
        <div className="relative mx-auto mt-10 max-w-[440px] pl-1 lg:hidden">
          {/* the night behind the scene — dims the ring backdrop for legibility */}
          <div
            aria-hidden
            className="absolute -inset-x-6 -inset-y-6"
            style={{
              background:
                'radial-gradient(70% 60% at 50% 50%, rgba(4,6,12,0.78) 0%, rgba(4,6,12,0.42) 60%, transparent 88%)',
            }}
          />
          {/* the current — bed · glow · core, vertical */}
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-px opacity-[0.18]" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-[3px] -translate-x-[1px] opacity-40 blur-[5px]" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-px opacity-90" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div className="flex flex-col gap-2.5">
            {STAGES.map((st) => (
              <div key={st.n} className="relative flex items-center pl-10">
                {/* jewel on the line */}
                <span aria-hidden className="absolute left-[18px] grid h-[14px] w-[14px] -translate-x-1/2 place-items-center">
                  <span className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.35)` }} />
                  <span
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.9)`,
                      boxShadow: `0 0 8px rgba(${st.rgb},0.5)`,
                    }}
                  />
                </span>
                {/* glass chip branching right — the stage name, nothing else */}
                <div
                  className="lc-chip relative px-3.5 py-2"
                  style={{ ['--rgb' as string]: st.rgb } as React.CSSProperties}
                >
                  <span className="font-serif text-[0.95rem] leading-tight text-ink">
                    {st.area === 'Underwriting support' ? 'Underwriting' : st.area}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* the dawn at the line's base + the compounding tag */}
          <div className="relative mt-2 h-14 pl-10">
            <span
              aria-hidden
              className="absolute left-[18px] top-1 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/3 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(0,255,178,0.5), rgba(0,255,178,0.14) 45%, transparent 75%)', mixBlendMode: 'screen' }}
            />
            <div className="flex items-center gap-2 pt-3">
              <span aria-hidden className="text-[12px] leading-none text-mint/90">↺</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mint/90">the cycle compounds</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- what it adds up to — three outcomes, each on the house glass so
              the words hold against the ring ---- */}
      <Reveal delay={0.18}>
        <div className="mx-auto mt-8 grid max-w-[960px] gap-4 text-center md:grid-cols-3 lg:gap-5">
          {OUTCOMES.map(({ impact, hi, tag }) => {
            const [pre, post] = impact.split(hi)
            return (
              <GlassCard key={impact} className="flex h-full flex-col justify-center px-6 py-5">
                <h3 className="font-serif text-display-2 text-ink">
                  {pre}
                  <span className="text-mint">{hi}</span>
                  {post}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">{tag}</p>
              </GlassCard>
            )
          })}
        </div>
      </Reveal>

      {/* ---- hand-off to the full instrument, deeper in the page ---- */}
      <Reveal delay={0.22}>
        <div className="mt-6 flex justify-center">
          <a
            href="#who"
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.04] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90 transition-all duration-300 hover:border-mint/55 hover:bg-mint/[0.10] hover:text-mint hover:shadow-[0_0_26px_-8px_rgba(0,255,178,0.55)]"
          >
            Explore every stage
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

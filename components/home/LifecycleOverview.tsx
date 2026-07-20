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

import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'
import { STAGES } from './LoanMeridian'


// What it adds up to — the three institutional outcomes (rendered here, above
// the fold, where the claim earns the scroll; the deep section proves it).
const OUTCOMES = [
  { impact: 'Scale without the headcount.', hi: 'Scale', tag: 'Acquisition to closure.' },
  { impact: 'Audit evidence in minutes.', hi: 'minutes', tag: 'Assembled on demand.' },
  // "The world model" not "Kovida": §2 renders before §4 introduces the name.
  { impact: 'Sharper with every loan.', hi: 'Sharper', tag: 'The world model learns.' },
] as const

export default function LifecycleOverview() {
  return (
    <Section hairline id="lifecycle">
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>The lending lifecycle</Eyebrow>
          <h2 className="mt-4 font-serif text-display-1 text-ink">
            One runtime, from first enquiry to final payoff.
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
          className="relative mx-auto mt-10 hidden aspect-[2/1] w-full max-w-[1040px] lg:block"
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
                'radial-gradient(64% 66% at 50% 52%, rgba(2,6,10,0.84) 0%, rgba(2,6,10,0.56) 52%, rgba(2,6,10,0.2) 74%, transparent 90%)',
            }}
          />

          {/* layer 1 — the current, the dawn, the reflection, the return (SVG scene) */}
          <svg aria-hidden viewBox="0 0 1040 520" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="lc-current" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39D6FF" />
                <stop offset="1" stopColor="#00FFB2" />
              </linearGradient>
              <radialGradient id="lc-dawn">
                <stop offset="0" stopColor="#00FFB2" stopOpacity="0.85" />
                <stop offset="0.4" stopColor="#00FFB2" stopOpacity="0.28" />
                <stop offset="1" stopColor="#00FFB2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lc-west">
                <stop offset="0" stopColor="#39D6FF" stopOpacity="0.32" />
                <stop offset="1" stopColor="#39D6FF" stopOpacity="0" />
              </radialGradient>
              <filter id="lc-soft">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              {/* the water: reflected light fades with distance from the shore */}
              <linearGradient id="lc-fade" x1="0" y1="230" x2="0" y2="340" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fff" stopOpacity="0.65" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="lc-mirror">
                <rect x="0" y="230" width="1040" height="140" fill="url(#lc-fade)" />
              </mask>
            </defs>

            {/* the reflection — the whole scene mirrored on still water below
                the horizon: blurred, faded with depth. This is what turns the
                figure from diagram into landscape. */}
            <g mask="url(#lc-mirror)">
              <g transform="matrix(1 0 0 -1 0 460)">
                <circle cx="949" cy="230" r="120" fill="url(#lc-dawn)" opacity="0.75" style={{ mixBlendMode: 'screen' }} />
                <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="3.5" opacity="0.5" filter="url(#lc-soft)" fill="none" />
                <path
                  d="M91 230 A1072 1072 0 0 1 949 230"
                  stroke="url(#lc-current)"
                  strokeWidth="1.5"
                  opacity="0.65"
                  fill="none"
                  style={{ filter: 'blur(1.5px)' }}
                />
                {/* the comet's shimmer on the water */}
                <path
                  className="horizon-glint"
                  d="M91 230 A1072 1072 0 0 1 949 230"
                  stroke="#EAFFFA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="30 900"
                  opacity="0.5"
                  fill="none"
                  style={{ mixBlendMode: 'screen', filter: 'blur(2px)' }}
                />
              </g>
            </g>

            {/* dawn at Closure — the sunrise the whole current runs toward,
                with its light bleeding along the horizon line */}
            <circle cx="949" cy="230" r="185" fill="url(#lc-dawn)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="949" cy="230" rx="150" ry="13" fill="url(#lc-dawn)" opacity="0.6" style={{ mixBlendMode: 'screen', filter: 'blur(5px)' }} />
            <circle cx="949" cy="230" r="26" fill="url(#lc-dawn)" style={{ mixBlendMode: 'screen' }} />

            {/* first light in the west — the cool glimmer where enquiry begins */}
            <circle cx="91" cy="230" r="64" fill="url(#lc-west)" style={{ mixBlendMode: 'screen' }} />

            {/* the return — a faint dashed sweep back over the sky: and again */}
            <path
              d="M949 230 C 820 24, 220 24, 91 230"
              stroke="url(#lc-current)"
              strokeWidth="1"
              strokeDasharray="2 9"
              opacity="0.22"
              fill="none"
            />

            {/* the current — bed · glow · core (the §9 rail grammar, on a horizon) */}
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="1" opacity="0.18" fill="none" />
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="3.5" opacity="0.45" filter="url(#lc-soft)" fill="none" />
            <path d="M91 230 A1072 1072 0 0 1 949 230" stroke="url(#lc-current)" strokeWidth="1.5" opacity="0.95" fill="none" />

            {/* the comet — halo under, bright head over: one loan running
                west→east and dissolving into the dawn */}
            <path
              className="horizon-glint"
              d="M91 230 A1072 1072 0 0 1 949 230"
              stroke="#BFFFE9"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="30 900"
              opacity="0.5"
              fill="none"
              style={{ mixBlendMode: 'screen', filter: 'blur(4px)' }}
            />
            <path
              className="horizon-glint"
              d="M91 230 A1072 1072 0 0 1 949 230"
              stroke="#EAFFFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="30 900"
              opacity="0.9"
              fill="none"
              style={{ mixBlendMode: 'screen', filter: 'blur(0.5px)' }}
            />
          </svg>

          {/* layer 2 — the steles: jewel on the horizon, hairline stem, glass chip */}
          {[
            { x: 91, y: 230 }, { x: 209, y: 186 }, { x: 332, y: 156 }, { x: 457, y: 142 },
            { x: 583, y: 142 }, { x: 708, y: 156 }, { x: 831, y: 186 }, { x: 949, y: 230 },
          ].map((p, i) => {
            const st = STAGES[i]
            // stele heights — a skyline rhythm along the horizon, tuned so no
            // neighbouring chips collide. Underwriting stands tallest: the one
            // stage where the decision stays with a human.
            const lift = [46, 58, 110, 46, 58, 46, 58, 46][i]
            return (
              <div
                key={st.n}
                className="absolute"
                style={{ left: `${(p.x / 1040) * 100}%`, top: `${(p.y / 520) * 100}%` }}
              >
                {/* jewel — where the stele meets the current */}
                <span className="absolute grid h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.4)` }} />
                  <span
                    aria-hidden
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.65), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.95)`,
                      boxShadow: `0 0 14px rgba(${st.rgb},0.65)`,
                    }}
                  />
                </span>
                {/* stem — a hairline of the stage's light, rising from the horizon */}
                <span
                  aria-hidden
                  className="absolute left-0 w-px -translate-x-1/2"
                  style={{ top: `-${lift}px`, height: `${lift}px`, background: `linear-gradient(to top, rgba(${st.rgb},0.72), rgba(${st.rgb},0))` }}
                />
                {/* glass chip — the stage, standing above its stem */}
                <div
                  className="lc-chip absolute flex flex-col items-center gap-1 whitespace-nowrap px-4 py-2.5 text-center"
                  style={{ transform: `translate(-50%, calc(-100% - ${lift}px))`, ['--rgb' as string]: st.rgb } as React.CSSProperties}
                >
                  <span aria-hidden className="font-mono text-[9px] leading-none tracking-[0.24em]" style={{ color: `rgba(${st.rgb},0.85)` }}>
                    {st.n}
                  </span>
                  <span className="font-serif text-[1rem] leading-tight text-ink">{st.area}</span>
                </div>
              </div>
            )
          })}

          {/* layer 3 — the compounding tag: a small glass pill floating on the
              water beneath the dawn */}
          <div
            className="lc-chip absolute left-[88%] top-[70%] flex -translate-x-1/2 items-center gap-2 px-3.5 py-2"
            style={{ ['--rgb' as string]: '0,255,178' } as React.CSSProperties}
          >
            <span aria-hidden className="text-[12px] leading-none text-mint/90">↺</span>
            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-mint/80">the cycle compounds</span>
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
                'radial-gradient(70% 60% at 50% 50%, rgba(2,6,10,0.78) 0%, rgba(2,6,10,0.42) 60%, transparent 88%)',
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
                {/* glass chip branching right */}
                <div
                  className="lc-chip relative flex items-baseline gap-2.5 px-3.5 py-2"
                  style={{ ['--rgb' as string]: st.rgb } as React.CSSProperties}
                >
                  <span aria-hidden className="font-mono text-[8px] leading-none tracking-[0.24em]" style={{ color: `rgba(${st.rgb},0.72)` }}>
                    {st.n}
                  </span>
                  <span className="font-serif text-[1rem] leading-tight text-ink">{st.area}</span>
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
              <span aria-hidden className="text-[12px] leading-none text-mint/80">↺</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-mint/70">the cycle compounds</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- what it adds up to — three outcomes, open air, no box ---- */}
      <Reveal delay={0.18}>
        <div className="mx-auto mt-14 grid max-w-[880px] gap-x-8 gap-y-8 text-center md:grid-cols-3">
          {OUTCOMES.map(({ impact, hi, tag }) => {
            const [pre, post] = impact.split(hi)
            return (
              <div key={impact}>
                <h3 className="font-serif text-display-2 text-ink">
                  {pre}
                  <span className="text-mint">{hi}</span>
                  {post}
                </h3>
                <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{tag}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* ---- hand-off to the full instrument, deeper in the page ---- */}
      <Reveal delay={0.22}>
        <div className="mt-12 flex justify-center">
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

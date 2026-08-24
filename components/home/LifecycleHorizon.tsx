'use client'

/**
 * LifecycleHorizon — the signature "dawn horizon" scene, extracted so the
 * homepage (§2 LifecycleOverview) and the KrimOS hub share ONE visual instead
 * of duplicating it. Eight glass steles stand along the limb of a world; the
 * current runs cyan (first enquiry, west) → mint (validated, east) and crests
 * into a dawn bloom at Closure; one comet surges the arc and dissolves into the
 * dawn, and a fainter return carries what was learned home. Just the scene —
 * the surrounding copy lives with each caller. Stage data from LoanMeridian
 * (one source of truth). CSS animation classes live in globals.css.
 */

import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { STAGES } from './LoanMeridian'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const

export default function LifecycleHorizon() {
  const reduce = useReducedMotion()
  return (
    <>
      {/* ---- desktop — the dawn scene ---- */}
      <Reveal delay={0.12}>
        <div
          className="relative mx-auto mt-6 hidden aspect-[1040/300] w-full max-w-[960px] lg:block"
          role="group"
          aria-label="The eight lifecycle stages, one continuous current from first enquiry to final payoff"
        >
          <div
            aria-hidden
            className="absolute -inset-x-10 -inset-y-8"
            style={{
              background:
                'radial-gradient(64% 66% at 50% 52%, rgba(4,6,12,0.84) 0%, rgba(4,6,12,0.56) 52%, rgba(4,6,12,0.2) 74%, transparent 90%)',
            }}
          />

          <svg aria-hidden viewBox="0 30 1040 300" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="lc-current" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39D6FF" />
                <stop offset="1" stopColor="#00FFB2" />
              </linearGradient>
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
              <linearGradient id="lc-haze" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39D6FF" stopOpacity="0.05" />
                <stop offset="0.6" stopColor="#12E9CE" stopOpacity="0.07" />
                <stop offset="1" stopColor="#00FFB2" stopOpacity="0.1" />
              </linearGradient>
              <filter id="lc-soft">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* the dawn at Closure */}
            <g>
              <ellipse className="dawn-bloom" cx="980" cy="204" rx="150" ry="168" fill="url(#lc-dawn-glow)" style={{ mixBlendMode: 'screen' }} />
              <ellipse className="dawn-band" cx="966" cy="230" rx="238" ry="9" fill="url(#lc-dawn-glow)" opacity="0.85" style={{ mixBlendMode: 'screen', filter: 'blur(6px)' }} />
              <circle className="dawn-core" cx="980" cy="230" r="30" fill="url(#lc-sun)" style={{ mixBlendMode: 'screen' }} />
            </g>

            {/* cold first light in the west */}
            <ellipse cx="60" cy="214" rx="78" ry="86" fill="url(#lc-west-glow)" style={{ mixBlendMode: 'screen' }} />
            <ellipse cx="74" cy="230" rx="122" ry="7" fill="url(#lc-west-glow)" opacity="0.7" style={{ mixBlendMode: 'screen', filter: 'blur(6px)' }} />

            {/* atmospheric haze in the basin */}
            <ellipse cx="520" cy="234" rx="420" ry="46" fill="url(#lc-haze)" opacity="0.55" style={{ mixBlendMode: 'screen', filter: 'blur(8px)' }} />

            {/* the return curve + its pulse */}
            <path d="M980 230 A1246 1246 0 0 1 60 230" stroke="url(#lc-current)" strokeWidth="2.5" opacity="0.14" filter="url(#lc-soft)" fill="none" />
            <path d="M980 230 A1246 1246 0 0 1 60 230" stroke="url(#lc-current)" strokeWidth="1" opacity="0.3" fill="none" />
            <g className="horizon-return">
              <path
                className="horizon-return-glint"
                d="M980 230 A1246 1246 0 0 1 60 230"
                stroke="url(#lc-current)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="36 908"
                opacity="0.7"
                fill="none"
                style={{ mixBlendMode: 'screen', filter: 'blur(0.5px)' }}
              />
            </g>

            {/* the current — bed · glow · core */}
            <path d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current)" strokeWidth="1" opacity="0.18" fill="none" />
            <path d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current-glow)" strokeWidth="3.5" filter="url(#lc-soft)" fill="none" />
            <path d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current)" strokeWidth="1.5" opacity="0.95" fill="none" />

            {/* the comet — three layers of line-light surging into the dawn */}
            <g className="horizon-comet">
              <path className="horizon-glint-tail" d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current)" strokeWidth="7" strokeLinecap="round" strokeDasharray="64 880" opacity="0.2" fill="none" style={{ mixBlendMode: 'screen', filter: 'blur(3px)' }} />
              <path className="horizon-glint-mid" d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="52 892" opacity="0.55" fill="none" style={{ mixBlendMode: 'screen', filter: 'blur(1.8px)' }} />
              <path className="horizon-glint" d="M60 230 A1246 1246 0 0 1 980 230" stroke="url(#lc-current)" strokeWidth="3" strokeLinecap="round" strokeDasharray="44 900" opacity="1" fill="none" style={{ mixBlendMode: 'screen', filter: 'blur(0.4px)' }} />
            </g>
          </svg>

          {/* the steles */}
          {[
            { x: 60, y: 230 }, { x: 191, y: 186 }, { x: 323, y: 158 }, { x: 454, y: 144 },
            { x: 586, y: 144 }, { x: 717, y: 158 }, { x: 849, y: 186 }, { x: 980, y: 230 },
          ].map((p, i) => {
            const st = STAGES[i]
            const lift = 56
            const label = st.area === 'Underwriting support' ? 'Underwriting' : st.area
            return (
              <motion.div
                key={st.n}
                className="absolute"
                style={{ left: `${(p.x / 1040) * 100}%`, top: `${((p.y - 30) / 300) * 100}%` }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={reduce ? { duration: 0 } : { duration: 0.52, delay: 0.1 + i * 0.07, ease: OUT_SOFT }}
              >
                <span className="absolute grid h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span aria-hidden className="absolute bottom-[1px] h-[3px] w-[10px] rounded-full" style={{ background: `rgba(${st.rgb},0.65)`, filter: 'blur(1px)' }} />
                  <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.4)` }} />
                  <span aria-hidden className="block h-[7px] w-[7px] rounded-full" style={{ background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.65), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.95)`, boxShadow: `0 0 18px rgba(${st.rgb},0.65)` }} />
                </span>
                <span aria-hidden className="absolute left-0 w-px -translate-x-1/2" style={{ top: `-${lift}px`, height: `${lift}px`, background: `linear-gradient(to top, rgba(${st.rgb},0.72), rgba(${st.rgb},0))` }} />
                <div className="lc-chip absolute flex h-[42px] w-[116px] items-center justify-center whitespace-nowrap text-center" style={{ transform: `translate(-50%, calc(-100% - ${lift}px))`, ['--rgb' as string]: st.rgb } as React.CSSProperties}>
                  <span className="font-serif text-[0.95rem] leading-tight text-ink">{label}</span>
                </div>
              </motion.div>
            )
          })}

          {/* the compounding tag */}
          <div className="lc-chip absolute left-1/2 top-[96%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 px-4 py-2.5" style={{ ['--rgb' as string]: '0,255,178' } as React.CSSProperties}>
            <span aria-hidden className="text-[12px] leading-none text-mint/90">↺</span>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-mint/90">every loan teaches the next</span>
          </div>
        </div>
      </Reveal>

      {/* ---- mobile — the vertical dawn ---- */}
      <Reveal delay={0.12}>
        <div className="relative mx-auto mt-10 max-w-[440px] pl-1 lg:hidden">
          <div
            aria-hidden
            className="absolute -inset-x-6 -inset-y-6"
            style={{ background: 'radial-gradient(70% 60% at 50% 50%, rgba(4,6,12,0.78) 0%, rgba(4,6,12,0.42) 60%, transparent 88%)' }}
          />
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-px opacity-[0.18]" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-[3px] -translate-x-[1px] opacity-40 blur-[5px]" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div aria-hidden className="absolute bottom-16 left-[18px] top-1 w-px opacity-90" style={{ background: 'linear-gradient(180deg, #39D6FF, #00FFB2)' }} />
          <div className="flex flex-col gap-2.5">
            {STAGES.map((st) => (
              <div key={st.n} className="relative flex items-center pl-10">
                <span aria-hidden className="absolute left-[18px] grid h-[14px] w-[14px] -translate-x-1/2 place-items-center">
                  <span className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.35)` }} />
                  <span className="block h-[7px] w-[7px] rounded-full" style={{ background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6), rgba(255,255,255,0) 42%), rgba(${st.rgb},0.9)`, boxShadow: `0 0 8px rgba(${st.rgb},0.5)` }} />
                </span>
                <div className="lc-chip relative flex h-[40px] w-[190px] items-center justify-center" style={{ ['--rgb' as string]: st.rgb } as React.CSSProperties}>
                  <span className="font-serif text-[0.95rem] leading-tight text-ink">
                    {st.area === 'Underwriting support' ? 'Underwriting' : st.area}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2 h-14 pl-10">
            <span aria-hidden className="absolute left-[18px] top-1 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/3 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(0,255,178,0.5), rgba(0,255,178,0.14) 45%, transparent 75%)', mixBlendMode: 'screen' }} />
            <div className="flex items-center gap-2 pt-3">
              <span aria-hidden className="text-[12px] leading-none text-mint/90">↺</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mint/90">every loan teaches the next</span>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  )
}

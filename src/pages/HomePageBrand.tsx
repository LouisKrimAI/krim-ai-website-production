/**
 * HomePageBrand.tsx — the canonical Krim homepage (V3).
 *
 * Built from docs/FOUNDATION.md v1.1 + a four-discipline pressure test
 * (brand-system audit · implementation feasibility · information design ·
 * cold first-time read).
 *
 * Structure (9 sections):
 *   1 Hero          — arrival sequence: the digital mind resolves, the Krim
 *                     logo emerges from its core, the page settles
 *   2 Thesis + Gap  — three failure modes on a hairline ledger
 *   3 World Model   — Innovation 1 · the branch diagram (ordinal, no decimals)
 *   4 Adjudicator   — Innovation 2 · the gate as typography
 *   5 The Loop      — seven-phase ribbon · validation gate node · Receipt
 *   6 Modules       — the colonnade (English leads, mono numerals 01–05)
 *   7 Where it runs — the page's breath (96px interstitial)
 *   8 Integrations  — three labelled strata marquees; incumbents named
 *   9 Close         — ochre arc · vision · three CTAs
 *
 * System discipline:
 *   - No eyebrows anywhere. Mono margin numerals (01–09) are the only
 *     section instrumentation.
 *   - Hairlines only above claim-making sections: 2, 4, 5, 6, 8.
 *   - Italic ochre on ONE noun phrase per headline.
 *   - Surfaces only on the Action Receipt. Everything else is flat
 *     typography + hairlines.
 *   - The 1px hairline language is the system's connective tissue.
 *     Never alter a hairline weight without explicit justification.
 */

import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import React, { Suspense, lazy, type ReactNode, type ComponentType } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { KrimAnimatedLogo } from '../components/KrimLogo'
import { darkBackgroundLogos } from '../components/logos/DarkBackgroundLogos'
import ActionReceipt from '../components/brand/ActionReceipt'
import FilmGrain from '../components/brand/FilmGrain'
import ScrollProgressRail from '../components/brand/ScrollProgressRail'

const DigitalMindSphere = lazy(() => import('../components/DigitalMindSphere'))

class DigitalMindBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { /* decorative — silently degrade */ }
  render() { return this.state.failed ? null : this.props.children }
}

// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
}
const blurFade: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
}
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const viewportOnce = { once: true, amount: 0.2 } as const

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// SHARED PRIMITIVES
// ---------------------------------------------------------------------------

/** Mono margin numeral — the page's only section instrumentation. */
function SectionNum({ n }: { n: string }) {
  return (
    <p className="brand-mono text-[11px] tracking-[0.1em] text-krim-ochre/45 mb-10 select-none" aria-hidden>
      {n}
    </p>
  )
}

/** Section headline — Source Serif at weight 360 (lighter reads larger at scale). */
function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`brand-serif text-krim-off-white text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.022em] [hyphens:none] ${className}`}
      style={{ fontWeight: 360 }}
    >
      {children}
    </h2>
  )
}

/** The italic ochre noun phrase — exactly one per headline. */
function Em({ children }: { children: ReactNode }) {
  return <span className="italic text-krim-ochre">{children}</span>
}

/** Full grid-width hairline. Only above sections that make a verifiable claim. */
function ClaimHairline() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="h-px bg-white/[0.06]" aria-hidden />
    </div>
  )
}

/** Hard-structure line (not a pull-quote): mono ↳ mark + serif sentence. */
function HardLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="brand-mono text-krim-ochre/70 text-sm leading-[1.6] shrink-0 select-none" aria-hidden>↳</span>
      <p className="brand-serif text-krim-off-white text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.4] tracking-[-0.01em]">
        {children}
      </p>
    </div>
  )
}

// ===========================================================================
// 1 · HERO — the arrival. "The mind becomes the name."
//
//     One composed gesture (~2.6s desktop / ~2.2s mobile), per motion spec:
//       0–900     headline paints early (LCP-safe, independent track)
//       150–1150  the sphere arrives — big, luminous, slightly overscaled,
//                 settling (the protagonist)
//       900–1500  the BLOOM gathers light at the core (a CSS radial-gradient
//                 div in the main bundle — ZERO dependency on the lazy sphere
//                 chunk, so the emergence always completes)
//       1300–1500 the sphere inhales (scale 1.04→1.07 — it tenses to speak)
//       1500–1700 the bloom releases outward
//       1500–2200 the logo materialises out of the bloom (inward settle
//                 1.06→1.00: pulled out of the core, not pasted on top)
//       1500–2600 the sphere recedes to backdrop (0.85→0.25)
//       1750–2350 the tagline confirms
//
//     Late sphere chunk: bloom + logo carry the emergence regardless; the
//     sphere self-fades in via its inner wrapper whenever it mounts — it
//     arrives as depth, never as breakage. No scroll-jack anywhere.
// ===========================================================================
const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768

// Sphere wrapper keyframe times over a 2.45s span (delay 0.15s):
//   entrance ends 0.408 · hold to 0.469 · inhale to 0.551 · settle to 1
const SPHERE_TIMES = [0, 0.408, 0.469, 0.551, 1]
const SPHERE_PEAK = isMobileViewport ? 0.7 : 0.85
const SPHERE_REST = isMobileViewport ? 0.18 : 0.25

const T = prefersReducedMotion
  ? { head: 0, bloom: 0, logo: 0, sub: 0, ground: 0, caption: 0 }
  : isMobileViewport
    ? { head: 0.25, bloom: 0.7, logo: 1.15, sub: 1.5, ground: 1.7, caption: 2.0 }
    : { head: 0.25, bloom: 0.9, logo: 1.5, sub: 1.75, ground: 2.0, caption: 2.3 }

function Hero() {
  return (
    <section className="relative px-6 min-h-[100svh] flex flex-col items-center justify-center pt-28 pb-24 text-center overflow-hidden">
      {/* The sphere — protagonist of the first second, backdrop thereafter.
          Centred via calc margins, NOT translate classes: Framer owns the
          transform channel for the scale keyframes and would overwrite a
          class-based translate. */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: SPHERE_REST, scale: 1 } : { opacity: 0, scale: 1.18 }}
        animate={prefersReducedMotion
          ? { opacity: SPHERE_REST, scale: 1, transition: { duration: 0.4 } }
          : {
              opacity: [0, SPHERE_PEAK, SPHERE_PEAK, SPHERE_PEAK, SPHERE_REST],
              scale: [1.18, 1.04, 1.04, 1.07, 1.0],
              // blur is the costliest filter on mobile GPUs — desktop only
              filter: isMobileViewport ? undefined : ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
              transition: { duration: 2.45, delay: 0.15, times: SPHERE_TIMES, ease: EASE },
            }}
        className="absolute pointer-events-none"
        style={{
          width: 'min(110vh, 110vw)',
          height: 'min(110vh, 110vw)',
          left: 'calc(50% - min(55vh, 55vw))',
          top: 'calc(50% - min(55vh, 55vw))',
        }}
        aria-hidden
      >
        <DigitalMindBoundary>
          <Suspense fallback={null}>
            {/* Inner self-fade: whenever the lazy chunk mounts, the sphere
                eases in over 500ms — no pop, regardless of arrival time. */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full h-full">
              <DigitalMindSphere hue={202} level={3} speed={0.3} />
            </motion.div>
          </Suspense>
        </DigitalMindBoundary>
      </motion.div>

      {/* The bloom — the core gathers light, then releases the logo out of it.
          Plain CSS gradient in the main bundle: paints at 0ms, never waits
          for the sphere chunk. Not rendered under reduced motion. */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0, scale: isMobileViewport ? 0.5 : 0.4 }}
          animate={{
            opacity: [0, 1, 0],
            scale: isMobileViewport ? [0.5, 1.0, 1.15] : [0.4, 1.0, 1.25],
            transition: { duration: 0.8, delay: T.bloom, times: [0, 0.75, 1], ease: EASE },
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 42%, rgba(200,151,59,0.55) 0%, rgba(200,151,59,0.12) 22%, transparent 48%)',
            mixBlendMode: 'screen',
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-col items-center max-w-[980px]">
        {/* The emergence — logo materialises out of the bloom with an inward
            settle (1.06 → 1.00): pulled out of the core, not pasted on top. */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.06, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.7, ease: EASE, delay: T.logo }}
          className="relative mb-12 md:mb-14"
        >
          {/* Arbitrary px heights — the project's legacy --space-* variable
              overrides make h-24/h-32 resolve to 0. Do not use scale classes here. */}
          <KrimAnimatedLogo treatment="mint" animated={!prefersReducedMotion} size="custom" className="relative h-[96px] md:h-[128px] lg:h-[144px] w-auto" />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: T.head }}
          className="brand-serif text-krim-off-white text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.12] tracking-[-0.022em] mb-7 [hyphens:none]"
          style={{ fontWeight: 360 }}
        >
          Cognition that understands the <Em>work</Em>.
          <br className="hidden md:block" />
          {' '}Safety that consents to every <Em>action</Em>.
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: T.sub }}
          className="brand-serif italic text-krim-off-white/75 text-lg md:text-[1.45rem] tracking-wide mb-8"
        >
          KrimOS is the runtime underneath.
        </motion.p>

        {/* The grounding line — buyer, function, mechanism, in one breath. */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: T.ground }}
          className="brand-sans text-krim-off-white/55 text-[15px] md:text-base leading-relaxed max-w-[52ch]"
        >
          AI agents for end-to-end lending operations — with a separate model
          that approves every action before it fires.
        </motion.p>
      </div>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: T.caption }}
        className="absolute bottom-8 left-6 md:left-10 brand-mono text-[11px] tracking-[0.1em] text-krim-ochre/45 select-none"
        aria-hidden
      >
        01
      </motion.p>
    </section>
  )
}

// ===========================================================================
// 2 · THESIS + GAP — the argument. Three failure modes on a hairline ledger.
// ===========================================================================
const FAILURES = [
  {
    num: 'i',
    title: 'Cognition without safety.',
    body: 'Capable models deployed against regulated work with no separate adjudication layer. They work in pilots. They invent a settlement offer in production. Model risk closes the door.',
  },
  {
    num: 'ii',
    title: 'Safety without cognition.',
    body: 'Rule engines and policy chatbots that cannot reason about the long tail. Auditable — and useless on anything the script did not anticipate.',
  },
  {
    num: 'iii',
    title: 'Neither, with confidence.',
    body: 'LLM wrappers around workflow tools, sold as autonomy. No model of the domain. No adjudicator. No defensible answer when something goes wrong.',
  },
]

function ThesisGap() {
  return (
    <>
      <ClaimHairline />
      <section className="relative px-6 pt-32 md:pt-[200px] pb-24 md:pb-[160px]">
        <div className="max-w-[1200px] mx-auto">
          <SectionNum n="02" />
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-[820px] mb-20 md:mb-28">
            <motion.div variants={blurFade}>
              <H2 className="mb-10">
                The cognition was the <Em>easy</Em> part.
              </H2>
            </motion.div>
            <motion.p
              variants={blurFade}
              className="brand-serif text-krim-off-white/85 text-[clamp(1.3rem,2vw,1.65rem)] leading-[1.5] tracking-[-0.008em] max-w-[58ch]"
            >
              Regulated work has resisted automation because the cost of one wrong
              action is catastrophic. Three things have been tried, and three
              things have failed.
            </motion.p>
          </motion.div>

          {/* The failure ledger — numbered prose on hairlines, not cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-krim-ochre/20 border-y border-krim-ochre/20"
          >
            {FAILURES.map((f) => (
              <motion.div key={f.num} variants={blurFade} className="py-10 lg:py-12 lg:px-10 first:lg:pl-0 last:lg:pr-0">
                <p className="brand-serif text-krim-ochre/80 text-sm mb-5 select-none" aria-hidden>{f.num}</p>
                <h3 className="brand-serif text-krim-off-white text-[1.35rem] leading-snug mb-4" style={{ fontWeight: 480 }}>
                  {f.title}
                </h3>
                <p className="brand-sans text-krim-off-white/60 text-[15px] leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={blurFade}
            className="brand-serif italic text-krim-off-white/80 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed mt-16 md:mt-20"
          >
            KrimOS is the first runtime built with both layers as primitives.
          </motion.p>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// 3 · THE LENDING WORLD MODEL — Innovation 1 · the cognition.
//     Branch diagram: one proposed action, four predicted next states,
//     ordered top→bottom by likelihood. Ordinal weight only — no decimal
//     probabilities on a homepage (false-calibration claim).
//     No hairline above: the world model is hypothesis, not verified claim.
// ===========================================================================
const BRANCHES = [
  { state: 'self-cure', weight: 'most likely', emphasis: 'text-krim-off-white' },
  { state: 'roll forward', weight: 'likely', emphasis: 'text-krim-off-white/75' },
  { state: 'partial payment', weight: 'possible', emphasis: 'text-krim-off-white/55' },
  { state: 'escalate', weight: 'tail', emphasis: 'text-krim-off-white/40' },
]

function BranchDiagram() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">
      {/* The proposed action — explicitly pending validation: the diagram
          must visibly want the gate in the next section. */}
      <div className="shrink-0 max-w-[300px] rounded-[3px] border border-krim-ochre/40 px-6 py-5">
        <p className="brand-serif text-krim-off-white text-[1.05rem] leading-snug mb-2">
          Collections call · day 47 past due
        </p>
        <p className="brand-mono text-[11px] tracking-[0.08em] uppercase text-krim-slate">
          proposed — pending validation
        </p>
      </div>

      {/* Connector into the branch rule */}
      <div className="hidden md:block w-14 h-px bg-krim-ochre/40 shrink-0" aria-hidden />

      {/* The branch rule — a single vertical hairline; four perpendicular
          stubs to four predicted next states. Ordinal weight is carried by
          position (top = most likely) and type colour, nothing else. */}
      <div className="border-l border-krim-ochre/40 pl-0">
        {BRANCHES.map((b) => (
          <div key={b.state} className="flex items-center gap-4 py-3">
            <span className="w-8 h-px bg-krim-ochre/40 shrink-0" aria-hidden />
            <span className={`brand-mono text-[13px] tracking-[0.02em] ${b.emphasis}`}>{b.state}</span>
            <span className="brand-mono text-[11px] tracking-[0.06em] uppercase text-krim-slate/70">· {b.weight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorldModel() {
  return (
    <section className="relative px-6 pt-24 md:pt-[160px] pb-32 md:pb-[200px]">
      <div className="max-w-[1200px] mx-auto">
        <SectionNum n="03" />
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="col-span-12 lg:col-span-8"
          >
            <motion.div variants={blurFade}>
              <H2 className="mb-8">
                A learned model of how lending <Em>actually behaves</Em>.
              </H2>
            </motion.div>
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch] mb-5">
              The Lending World Model is a quantitative representation of borrowers,
              accounts, products, channels, regulations and outcomes. It maintains
              internal state. It conditions action on that state. It evaluates
              counterfactual rollouts before an agent commits.
            </motion.p>
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch]">
              This is what lets a Karta co-worker reason about a 47-day-delinquent
              auto loan the way your best collector would — by predicting what the
              borrower is likely to do next, not by following a static decision tree.
            </motion.p>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade} className="mb-16 md:mb-20">
          <BranchDiagram />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade} className="max-w-[760px]">
          <HardLine>
            A world model architecture, instantiated on your portfolio, governed
            by your model risk framework.
          </HardLine>
          <p className="brand-mono text-[12px] tracking-[0.02em] text-krim-slate/80 leading-relaxed mt-8 pl-8">
            Foundation weights are frozen in production. Improvement happens through
            governed memory updates — never unconstrained online learning.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ===========================================================================
// 4 · THE ADJUDICATOR — Innovation 2 · the safety. The gate as typography:
//     the rule IS the adjudicator.
// ===========================================================================
function Gate() {
  return (
    <div className="max-w-[720px] mx-auto text-center py-6 md:py-10">
      <motion.p
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
        className="brand-serif text-krim-off-white/90 text-[clamp(1.7rem,3vw,2.5rem)] leading-tight tracking-[-0.015em]"
        style={{ fontWeight: 380 }}
      >
        A plan, proposed.
      </motion.p>

      {/* The rule IS the adjudicator. */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
        className="relative my-12 md:my-14 mx-auto h-px bg-krim-ochre"
        style={{ width: 'min(640px, 90%)' }}
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-krim-indigo px-4 brand-mono text-[11px] tracking-[0.18em] uppercase text-krim-ochre select-none">
          Validate
        </span>
        <span className="absolute right-0 top-3 brand-mono text-[10px] tracking-[0.06em] text-krim-slate/70 select-none">
          adjudicator · 4 checks
        </span>
      </motion.div>

      <motion.p
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
        className="brand-serif text-krim-off-white text-[clamp(1.7rem,3vw,2.5rem)] leading-tight tracking-[-0.015em]"
        style={{ fontWeight: 380 }}
      >
        A plan, <span className="text-krim-ochre">cleared</span>.
      </motion.p>

      {/* The gate sometimes refuses — showing only the cleared path lies by omission. */}
      <motion.p
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
        className="brand-serif italic text-krim-off-white/35 text-[1.05rem] leading-tight mt-6"
      >
        — or returned, with reasoning.
      </motion.p>
    </div>
  )
}

function Adjudicator() {
  return (
    <>
      <ClaimHairline />
      <section className="relative px-6 pt-32 md:pt-[200px] pb-24 md:pb-[160px]">
        <div className="max-w-[1200px] mx-auto">
          <SectionNum n="04" />
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade} className="max-w-[820px] mb-12 md:mb-16">
            <H2>
              A separate model decides whether an action <Em>fires</Em>.
            </H2>
          </motion.div>

          <Gate />

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-[760px] mt-12 md:mt-16">
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch] mb-10">
              Every action a Karta co-worker proposes — every call, message, payment
              plan, hardship classification, dispute response — is reviewed before it
              executes by a separately-trained model whose only job is adjudication.
              It does not run after the fact. It runs before. Nothing reaches a
              system of record without it.
            </motion.p>
            <motion.div variants={blurFade}>
              <HardLine>
                Adjudication over predicted downstream state — not over output tokens.
              </HardLine>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// 5 · THE LOOP — seven phases, one boundary. The ribbon's Plan→Validate
//     join carries a filled ochre node: the validation gate.
//
//     DISCIPLINE NOTE: every other join is exactly 1px ochre/30. The
//     Plan→Validate join is 2px ochre + a filled node. This difference
//     carries the entire safety argument. It is not a styling choice.
// ===========================================================================
const PHASES = ['Perceive', 'Review', 'Plan', 'Validate', 'Action', 'Observation', 'Reflection']

function PhaseRibbon() {
  return (
    <div>
      {/* Desktop ribbon — connectors flex to fill the container; the
          Plan→Validate join is 2px + a filled node + a caption BELOW the
          ribbon so it never collides with the phase names. */}
      <div className="hidden lg:flex items-center justify-between pb-10">
        {PHASES.map((p, i) => {
          const isValidate = p === 'Validate'
          const joinBefore = i > 0
          const gateJoin = p === 'Validate' // the join between Plan and Validate
          return (
            <React.Fragment key={p}>
              {joinBefore && (
                gateJoin ? (
                  <span className="relative flex-1 flex items-center mx-2" aria-hidden>
                    <span className="w-full h-[2px] bg-krim-ochre" />
                    <span className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-krim-ochre" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-8 brand-mono text-[10px] tracking-[0.08em] uppercase text-krim-ochre/80 whitespace-nowrap">
                      the validation gate
                    </span>
                  </span>
                ) : (
                  <span className="flex-1 h-px bg-krim-ochre/30 mx-2" aria-hidden />
                )
              )}
              <span className="flex flex-col items-center shrink-0 px-1">
                <span className="brand-mono text-[10px] tracking-[0.1em] text-krim-ochre/50 mb-2 select-none" aria-hidden>
                  {`0${i + 1}`}
                </span>
                <span
                  className={`brand-serif text-[1.05rem] xl:text-[1.2rem] whitespace-nowrap ${isValidate ? 'text-krim-off-white' : 'text-krim-off-white/75'}`}
                  style={{ fontWeight: isValidate ? 560 : 420 }}
                >
                  {p}
                </span>
              </span>
            </React.Fragment>
          )
        })}
      </div>

      {/* Mobile / tablet ribbon — vertical */}
      <div className="lg:hidden border-l border-krim-ochre/30 pl-6 space-y-5">
        {PHASES.map((p, i) => {
          const isValidate = p === 'Validate'
          return (
            <div key={p} className="relative">
              {isValidate && (
                <span className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-krim-ochre" aria-hidden />
              )}
              <span className="brand-mono text-[10px] tracking-[0.1em] text-krim-ochre/50 mr-3 select-none" aria-hidden>{`0${i + 1}`}</span>
              <span
                className={`brand-serif text-[1.1rem] ${isValidate ? 'text-krim-off-white' : 'text-krim-off-white/75'}`}
                style={{ fontWeight: isValidate ? 560 : 420 }}
              >
                {p}
              </span>
              {isValidate && (
                <span className="ml-3 brand-mono text-[10px] tracking-[0.08em] uppercase text-krim-ochre/80">· the validation gate</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Loop() {
  return (
    <>
      <ClaimHairline />
      <section className="relative px-6 pt-24 md:pt-[160px] pb-32 md:pb-[200px]">
        <div className="max-w-[1200px] mx-auto">
          <SectionNum n="05" />
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-[820px] mb-16 md:mb-24">
            <motion.div variants={blurFade}>
              <H2 className="mb-8">
                Seven phases. One <Em>boundary</Em>.
              </H2>
            </motion.div>
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch]">
              Every unit of work in KrimOS moves through the same sequence —
              observable end to end. An auditor can reconstruct the reasoning behind
              any action taken in production, in full, after the fact.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade} className="mb-12 md:mb-16">
            <PhaseRibbon />
          </motion.div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
            className="brand-serif italic text-krim-off-white/60 text-[1.05rem] md:text-[1.15rem] leading-relaxed text-center mb-16 md:mb-20"
          >
            Sense the work. Read the rules. Decide the action. Get it cleared.
            Do it. Watch what happens. Learn from it.
          </motion.p>

          {/* The dashed riser descends from the ribbon into the evidence. */}
          <div className="flex justify-center mb-2" aria-hidden>
            <svg width="2" height="28" viewBox="0 0 2 28">
              <line x1="1" y1="0" x2="1" y2="28" stroke="#C8973B" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
            </svg>
          </div>

          <ActionReceipt />
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// 6 · KRIMOS — FIVE MODULES — the colonnade. English role leads; Sanskrit
//     name in mono beneath; mono numerals 01–05 carry the rhythm.
// ===========================================================================
const MODULES = [
  {
    num: '01', role: 'The Core Runtime', name: 'KENDRA', to: '/kendra',
    body: 'The substrate the loop runs on. Where the world model lives and every agent’s reasoning is observable.',
  },
  {
    num: '02', role: 'The AI Co-Workers', name: 'KARTA', to: '/karta',
    body: 'The agents that do the work — origination, servicing, collections, disputes, reconciliation.',
  },
  {
    num: '03', role: 'The Adjudicator', name: 'KRIYA', to: '/kriya',
    body: 'The safety layer. Every action passes through it before leaving the runtime.',
  },
  {
    num: '04', role: 'The Command Centres', name: 'KUPA', to: '/kupa',
    body: 'The operator surface. Live queues, exceptions, and policy — across every portfolio.',
  },
  {
    num: '05', role: 'The Operator Copilot', name: 'KULA', to: '/kula',
    body: 'Where a human queries the runtime, asks why a decision was made, and overrides.',
  },
]

function Modules() {
  return (
    <>
      <ClaimHairline />
      <section className="relative px-6 pt-32 md:pt-[200px] pb-24 md:pb-[160px]">
        <div className="max-w-[1200px] mx-auto">
          <SectionNum n="06" />
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-[820px] mb-16 md:mb-20">
            <motion.div variants={blurFade}>
              <H2 className="mb-8">
                One product. <Em>Five modules</Em>.
              </H2>
            </motion.div>
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch]">
              The two innovations live inside KrimOS. The five modules carry the
              work — across origination, servicing, collections, and compliance.
            </motion.p>
          </motion.div>

          {/* The colonnade — hairline-separated columns, not cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-krim-ochre/15 border-y border-krim-ochre/15"
          >
            {MODULES.map((m) => (
              <motion.div key={m.name} variants={blurFade} className="py-9 lg:py-12 lg:px-7 first:lg:pl-0 last:lg:pr-0">
                <p className="brand-mono text-[11px] tracking-[0.1em] text-krim-ochre/60 mb-6 select-none" aria-hidden>{m.num}</p>
                <h3 className="brand-serif text-krim-off-white text-[1.3rem] leading-snug mb-2" style={{ fontWeight: 480 }}>
                  {m.role}
                </h3>
                <p className="brand-mono text-[11px] tracking-[0.14em] text-krim-slate mb-5">{m.name}</p>
                <p className="brand-sans text-krim-off-white/60 text-[14px] leading-relaxed">{m.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
            className="flex flex-wrap items-baseline justify-between gap-6 mt-14 md:mt-16"
          >
            <p className="brand-serif italic text-krim-off-white/75 text-[1.1rem]">
              Two innovations. One loop. Five modules. One product.
            </p>
            <p className="brand-mono text-[12px] tracking-[0.04em] text-krim-slate">
              {MODULES.map((m, i) => (
                <React.Fragment key={m.name}>
                  <Link to={m.to} className="hover:text-krim-ochre transition-colors">{m.name.charAt(0) + m.name.slice(1).toLowerCase()}</Link>
                  {i < MODULES.length - 1 && <span className="text-krim-ochre/40 mx-2" aria-hidden>·</span>}
                </React.Fragment>
              ))}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// 7 · WHERE IT RUNS — the page's breath. One paragraph in air.
// ===========================================================================
function WhereItRuns() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="relative max-w-[1200px] mx-auto">
        <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 brand-mono text-[11px] tracking-[0.08em] text-krim-slate/70 select-none" aria-hidden>
          ↳ lending
        </span>
        <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 brand-mono text-[11px] tracking-[0.08em] text-krim-slate/70 select-none" aria-hidden>
          ↳ regulated work
        </span>

        <motion.p
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={blurFade}
          className="brand-serif italic text-krim-off-white/85 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.5] tracking-[-0.008em] text-center max-w-[640px] mx-auto"
        >
          Lending is the proving ground. The same architecture moves to every
          operation <span className="text-krim-ochre">shaped like it</span> —
          claims, prior authorisation, benefits, tax.
        </motion.p>
      </div>
    </section>
  )
}

// ===========================================================================
// 8 · INTEGRATIONS — three labelled strata. Incumbents named: the
//     wait-and-see deferral is defused before procurement raises it.
// ===========================================================================
const LOGOS = darkBackgroundLogos as Record<string, ComponentType<{ className?: string }>>
const INTEGRATION_GROUPS = [
  { label: 'Systems of record', names: ['Temenos', 'Oracle', 'FIS', 'Fiserv', 'Jack Henry', 'Razorpay', 'Stripe', 'Signzy'], reverse: false },
  { label: 'Cloud & AI infrastructure', names: ['AWS', 'Azure', 'Microsoft', 'Snowflake', 'Databricks', 'NVIDIA'], reverse: true },
  { label: 'Channels & engagement', names: ['Salesforce', 'HubSpot', 'Zoom', 'Slack', 'Teams', 'LiveKit', 'Discord'], reverse: false },
]
const EDGE_MASK = 'linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)'

function LogoRow({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const seq = [...names, ...names]
  return (
    <div className="group relative overflow-hidden" style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}>
      <div
        className={`flex w-max items-center py-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {seq.map((name, i) => {
          const Logo = LOGOS[name]
          if (!Logo) return null
          return (
            <div key={`${name}-${i}`} className="shrink-0 mr-14 md:mr-20 opacity-50 hover:opacity-100 transition-opacity duration-300">
              <Logo className="h-6 md:h-7 w-auto" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Integrations() {
  return (
    <>
      <ClaimHairline />
      <section className="relative px-6 pt-24 md:pt-[160px] pb-24 md:pb-[160px]">
        <div className="max-w-[1200px] mx-auto">
          <SectionNum n="08" />
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-[820px] mb-14 md:mb-16">
            <motion.div variants={blurFade}>
              <H2 className="mb-8">
                Sits on top of the stack you <Em>already run</Em>.
              </H2>
            </motion.div>
            <motion.p variants={blurFade} className="brand-sans text-krim-off-white/70 text-[1.05rem] leading-relaxed max-w-[58ch]">
              Above FIS, Fiserv, Jack Henry, Temenos, Oracle — not in place of them.
              KrimOS is the decision layer your systems of record report into.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="space-y-10">
            {INTEGRATION_GROUPS.map((g) => (
              <motion.div key={g.label} variants={fadeUp}>
                <div className="flex items-center gap-4 mb-4">
                  <p className="brand-mono text-[11px] tracking-[0.14em] uppercase text-krim-ochre/70 shrink-0">{g.label}</p>
                  <div className="h-px flex-1 bg-white/[0.06]" aria-hidden />
                </div>
                <LogoRow names={g.names} reverse={g.reverse} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// 9 · CLOSE — the ochre arc, the vision, three restrained CTAs.
// ===========================================================================
function Close() {
  return (
    <section className="relative px-6 py-32 md:py-[220px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger}
        className="max-w-[820px] mx-auto text-center"
      >
        {/* The arc — the loop returning to its start. 96px, 1px stroke, silent. */}
        <motion.div variants={blurFade} className="flex justify-center mb-14" aria-hidden>
          <svg width="96" height="48" viewBox="0 0 96 48" fill="none">
            <path d="M0 48 A48 48 0 0 1 96 48" stroke="#C8973B" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.p
          variants={blurFade}
          className="brand-serif text-krim-off-white/85 text-[clamp(1.3rem,2vw,1.65rem)] leading-[1.5] tracking-[-0.008em] mb-8"
        >
          Today, KrimOS runs lending operations end to end — application to
          closure, enterprise and customer alike — work that has resisted
          automation because it is non-stationary, conditional, and unforgiving.
          The world model reasons about it. The Adjudicator clears every action
          before it fires.
        </motion.p>

        <motion.p
          variants={blurFade}
          className="brand-serif text-krim-off-white text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.2] tracking-[-0.02em] mb-16"
          style={{ fontWeight: 360 }}
        >
          Tomorrow, every regulated operation that has to be <Em>right</Em>.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-[6px] bg-krim-ochre text-krim-indigo font-semibold transition-transform hover:-translate-y-0.5"
          >
            Talk to the team
            <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" size={18} />
          </Link>
          <Link
            to="/contact?topic=architecture"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[6px] border border-krim-ochre/45 text-krim-off-white font-medium hover:bg-krim-ochre/10 transition-colors"
          >
            Read the architecture brief
          </Link>
        </motion.div>

        <motion.p variants={fadeUp}>
          <Link
            to="/contact?topic=sr-26-2"
            className="brand-mono text-[12px] tracking-[0.06em] text-krim-slate hover:text-krim-ochre transition-colors underline underline-offset-4 decoration-krim-slate/40 hover:decoration-krim-ochre"
          >
            Request the SR 26-2 mapping
          </Link>
        </motion.p>
      </motion.div>

      <p className="absolute bottom-8 left-6 md:left-10 brand-mono text-[11px] tracking-[0.1em] text-krim-ochre/45 select-none" aria-hidden>
        09
      </p>
    </section>
  )
}

// ===========================================================================
export default function HomePageBrand() {
  return (
    <div className="relative text-krim-off-white">
      <FilmGrain />
      <ScrollProgressRail />

      <Hero />
      <ThesisGap />
      <WorldModel />
      <Adjudicator />
      <Loop />
      <Modules />
      <WhereItRuns />
      <Integrations />
      <Close />
    </div>
  )
}

'use client'

/**
 * OperatingModeDial — signature graphic 2 for /platform/karta. ONE CANVAS (v3).
 * The four operating modes as one continuous control: autonomous ↔ human-in-the-loop.
 * Says, physically, what the copy claims — "the mode is a runtime parameter,"
 * set per workflow / segment / risk band, and slid toward autonomy as confidence grows.
 *
 * Grammar: mint = the validated/selected setting; cyan = the live read-out the
 * institution is proposing. Gold is reserved for the boundary panel — not here.
 *
 * A11y: a real <input type="range"> drives state, so arrow keys, Home/End and
 * screen readers all work for free. It sits as an invisible, full-width overlay
 * across the bespoke track + ticks — the ONLY visible control is the styled track;
 * keyboard focus surfaces a visible ring via `peer-focus-visible`. Reduced motion:
 * transitions collapse to none.
 */

import { useId, useState } from 'react'

type Mode = {
  key: string
  label: string
  // who holds the pen at this setting — kept faithful to the source, not embellished
  gloss: string
  // the institution's posture, left (machine) → right (human)
  autonomy: number // 0..3, index along the dial
}

const MODES: Mode[] = [
  {
    key: 'autonomous',
    label: 'Autonomous',
    gloss: 'The co-worker acts within policy; humans watch the aggregate, not each action.',
    autonomy: 0,
  },
  {
    key: 'oversight',
    label: 'Oversight',
    gloss: 'It acts, but flagged cases surface for review — exceptions, not the routine.',
    autonomy: 1,
  },
  {
    key: 'copilot',
    label: 'Copilot',
    gloss: 'It drafts and proposes; a person decides and commits each step.',
    autonomy: 2,
  },
  {
    key: 'hitl',
    label: 'Human-in-the-loop',
    gloss: 'Nothing executes without explicit sign-off from the responsible human.',
    autonomy: 3,
  },
]

export default function OperatingModeDial() {
  const [i, setI] = useState(1) // default to Oversight — a credible production posture
  const id = useId()
  const active = MODES[i]
  const pct = (i / (MODES.length - 1)) * 100

  return (
    <div className="glass overflow-hidden">
      {/* header strip — what this control is */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rline-soft px-6 py-4 md:px-8">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-rtext-3">
          Operating mode · runtime parameter
        </p>
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-rtext-3">
          per workflow · per segment · per risk band
        </p>
      </div>

      <div className="px-6 py-9 md:px-10 md:py-11">
        {/* the dial */}
        <div className="relative">
          {/* poles */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3">
              Machine acts
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3">
              Human holds the pen
            </span>
          </div>

          {/*
            The interactive zone: the real <input type="range"> is an invisible,
            focusable overlay (`peer`) stretched across the full hit area. The
            bespoke hairline track + ticks underneath are the only VISIBLE control;
            keyboard focus lights the ring via `peer-focus-visible`.
          */}
          <div className="relative">
            {/* real control — invisible but present; drives everything */}
            <label htmlFor={id} className="sr-only">
              Operating mode, from autonomous to human-in-the-loop
            </label>
            <input
              id={id}
              type="range"
              min={0}
              max={MODES.length - 1}
              step={1}
              value={i}
              onChange={(e) => setI(Number(e.target.value))}
              aria-valuetext={active.label}
              className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
            />

            {/* bespoke track + filled portion, mirrored from the input value */}
            <div
              aria-hidden
              className="relative h-px w-full bg-rline-soft rounded-full ring-mint/70 ring-offset-4 ring-offset-transparent peer-focus-visible:ring-2"
            >
              <div
                className="absolute left-0 top-0 h-px bg-mint motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out-soft"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* the four stops, as labelled ticks under the track */}
            <div className="mt-3 grid grid-cols-4">
              {MODES.map((m, idx) => {
                const on = idx === i
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-pressed={on}
                    tabIndex={-1}
                    className={`group relative z-20 flex flex-col items-start gap-2 pt-1 text-left ${
                      idx === MODES.length - 1 ? 'items-end text-right' : ''
                    } ${idx === 1 || idx === 2 ? 'items-center text-center' : ''}`}
                  >
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 rounded-full border motion-safe:transition-colors ${
                        on
                          ? 'border-mint bg-mint'
                          : 'border-rline-soft bg-white/5 group-hover:border-rtext-3'
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] tracking-[0.12em] uppercase motion-safe:transition-colors ${
                        on ? 'text-mint' : 'text-rtext-3 group-hover:text-rtext-2'
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* live read-out — what this setting means in operation */}
        <div className="mt-7 border-t border-rline-soft pt-6">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-cyan">
            Selected · {active.label}
          </p>
          <p className="mt-3 max-w-[48ch] font-serif text-[1.15rem] leading-[1.55] text-rtext-2">
            {active.gloss}
          </p>
        </div>
      </div>

      {/* the line that the whole control exists to make true */}
      <div className="border-t border-rline-soft px-6 py-4 md:px-8">
        <p className="font-sans text-[13px] leading-relaxed text-rtext-3">
          Slide it. As confidence grows through measured outcomes, a workflow can move left
          toward autonomy — but the risk profile stays under the institution&rsquo;s control.
        </p>
      </div>
    </div>
  )
}

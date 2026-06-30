/**
 * HarnessGraphic — the signature visual for the Safe Agent Harness.
 *
 * Reads left → right: an AI agent (left) is bounded by its constrained action
 * space; every action it proposes travels to a luminous validation gate.
 * Cleared actions pass through and continue in mint; one is stopped at the
 * gate. A human-command node sits above the gate. It encodes "validated
 * before it acts" in one iconic image — a sibling to the flywheel.
 *
 * Float it like the flywheel cutout with a soft ground glow behind. Static,
 * on-brand. Colours are the design-token values (mint #00FFB2, cyan #39D6FF,
 * fail #E5484D) used directly because SVG gradients can't take Tailwind
 * utilities — keep them in sync with docs/design-tokens.md.
 *
 * Swap-ready: a Gemini render can replace this with a raster at
 * /images/krimos/harness-clear.png — prompt in docs/IMAGE-PROMPTS.md.
 */
export default function HarnessGraphic({ className = '' }: { className?: string }) {
  const lanes = [192, 238, 288, 334]
  const blocked = 288
  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The safe agent harness: an AI agent, bounded by its constrained action space, sends each proposed action through a validation gate. Cleared actions pass through and continue; one is stopped at the gate. A human-command node sits above it."
    >
      <defs>
        <radialGradient id="hg-agentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#39D6FF" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#39D6FF" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#39D6FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hg-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#39D6FF" stopOpacity="0.10" />
          <stop offset="48%" stopColor="#00FFB2" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00FFB2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hg-beamIn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#39D6FF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#39D6FF" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="hg-beamOut" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00FFB2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00FFB2" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="hg-nodeMint" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00FFB2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00FFB2" stopOpacity="0" />
        </radialGradient>
        <filter id="hg-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ground glow */}
      <ellipse cx="288" cy="262" rx="258" ry="198" fill="url(#hg-ground)" />

      {/* constrained action space — the boundary the agent acts within */}
      <rect x="58" y="142" width="226" height="240" rx="52" stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="1.5" />
      <path d="M58 196 V178 a36 36 0 0 1 36 -36 H112" stroke="#39D6FF" strokeOpacity="0.35" strokeWidth="1.75" fill="none" />
      <path d="M284 328 V346 a36 36 0 0 1 -36 36 H230" stroke="#39D6FF" strokeOpacity="0.35" strokeWidth="1.75" fill="none" />

      {/* agent core */}
      <circle cx="168" cy="262" r="94" fill="url(#hg-agentGlow)" />
      <circle cx="168" cy="262" r="43" fill="#39D6FF" fillOpacity="0.05" stroke="#39D6FF" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M168 262 L149 243 M168 262 L189 277 M168 262 L186 243 M168 262 L150 281" stroke="#39D6FF" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="168" cy="262" r="6" fill="#39D6FF" />
      <circle cx="149" cy="243" r="3.5" fill="#39D6FF" fillOpacity="0.8" />
      <circle cx="189" cy="277" r="3.5" fill="#39D6FF" fillOpacity="0.8" />
      <circle cx="186" cy="243" r="2.5" fill="#39D6FF" fillOpacity="0.55" />
      <circle cx="150" cy="281" r="2.5" fill="#39D6FF" fillOpacity="0.55" />

      {/* action beams: agent → gate (fan-in) */}
      {lanes.map((y) => (
        <line key={`in-${y}`} x1="212" y1="262" x2={y === blocked ? 296 : 300} y2={y} stroke="url(#hg-beamIn)" strokeWidth="2" />
      ))}
      {/* travelling tokens on the fan-in beams */}
      <circle cx="252" cy="232" r="3.5" fill="#39D6FF" />
      <circle cx="258" cy="250" r="3" fill="#39D6FF" fillOpacity="0.85" />
      <circle cx="256" cy="312" r="3" fill="#39D6FF" fillOpacity="0.85" />

      {/* the gate */}
      <rect x="300" y="130" width="36" height="264" rx="18" fill="#FFFFFF" fillOpacity="0.05" stroke="#00FFB2" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="316" y="140" width="4" height="244" rx="2" fill="#00FFB2" fillOpacity="0.5" filter="url(#hg-soft)" />
      <g stroke="#00FFB2" strokeOpacity="0.45" strokeWidth="1.5">
        <line x1="306" y1="166" x2="330" y2="166" />
        <line x1="306" y1="200" x2="330" y2="200" />
        <line x1="306" y1="234" x2="330" y2="234" />
        <line x1="306" y1="268" x2="330" y2="268" />
        <line x1="306" y1="302" x2="330" y2="302" />
        <line x1="306" y1="336" x2="330" y2="336" />
      </g>

      {/* cleared actions: gate → right */}
      {lanes.filter((y) => y !== blocked).map((y) => (
        <g key={`out-${y}`}>
          <line x1="336" y1={y} x2="496" y2={y} stroke="url(#hg-beamOut)" strokeWidth="2" />
          <circle cx="500" cy={y} r="11" fill="url(#hg-nodeMint)" />
          <circle cx="500" cy={y} r="4" fill="#00FFB2" />
        </g>
      ))}
      {/* travelling tokens on the cleared beams */}
      <circle cx="392" cy="192" r="3.5" fill="#00FFB2" />
      <circle cx="430" cy="238" r="3" fill="#00FFB2" fillOpacity="0.85" />
      <circle cx="410" cy="334" r="3" fill="#00FFB2" fillOpacity="0.85" />

      {/* blocked action: stopped at the gate */}
      <circle cx="290" cy={blocked} r="7" fill="#E5484D" fillOpacity="0.14" stroke="#E5484D" strokeOpacity="0.85" strokeWidth="1.5" />
      <line x1="286.5" y1={blocked - 3.5} x2="293.5" y2={blocked + 3.5} stroke="#E5484D" strokeWidth="1.5" />
      <line x1="293.5" y1={blocked - 3.5} x2="286.5" y2={blocked + 3.5} stroke="#E5484D" strokeWidth="1.5" />

      {/* human in command — node above the gate */}
      <line x1="318" y1="108" x2="318" y2="130" stroke="#39D6FF" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx="318" cy="94" r="15" fill="#39D6FF" fillOpacity="0.06" stroke="#39D6FF" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx="318" cy="94" r="4.5" fill="#39D6FF" />
    </svg>
  )
}

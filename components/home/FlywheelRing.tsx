/**
 * FlywheelRing — homepage §4: one quiet ring, slowly turning.
 * Validate → Act → Record → Learn; a comet orbits, each node lights
 * cyan as it arrives and settles mint as it passes. CSS-only,
 * reduced-motion renders the settled (all-mint) state.
 */

const NODES = [
  { label: 'Validate', x: 160, y: 28, delay: '0s' },
  { label: 'Act', x: 292, y: 160, delay: '3s' },
  { label: 'Record', x: 160, y: 292, delay: '6s' },
  { label: 'Learn', x: 28, y: 160, delay: '9s' },
]

export default function FlywheelRing() {
  return (
    <svg viewBox="0 0 320 320" className="mx-auto w-[260px] md:w-[300px]" role="img" aria-label="The flywheel: validate, act, record, learn — repeating">
      {/* a faint well behind the ring, so it holds its column */}
      <defs>
        <radialGradient id="fw-well" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(57,214,255,0.05)" />
          <stop offset="70%" stopColor="rgba(57,214,255,0.015)" />
          <stop offset="100%" stopColor="rgba(57,214,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="150" fill="url(#fw-well)" />

      {/* the ring */}
      <circle cx="160" cy="160" r="132" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <circle cx="160" cy="160" r="124" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* the comet — a short luminous arc orbiting clockwise */}
      <g className="ring-comet">
        <circle
          cx="160" cy="160" r="132" fill="none"
          stroke="rgba(57,214,255,0.8)" strokeWidth="1.8" strokeLinecap="round"
          strokeDasharray="40 789" strokeDashoffset="-621"
        />
        <circle cx="160" cy="28" r="2.8" fill="#39D6FF" />
      </g>

      {/* nodes + labels (static, upright) */}
      {NODES.map((n) => (
        <g key={n.label}>
          <circle className="ring-node" cx={n.x} cy={n.y} r="8" strokeWidth="1.3" style={{ animationDelay: n.delay }} />
          <text
            x={n.x + (n.x === 160 ? 0 : n.x > 160 ? 17 : -17)}
            y={n.y === 160 ? n.y + 4 : n.y > 160 ? n.y + 26 : n.y - 17}
            textAnchor={n.x === 160 ? 'middle' : n.x > 160 ? 'start' : 'end'}
            fontSize="12"
            fontFamily="var(--font-mono)"
            letterSpacing="0.14em"
            fill="var(--text-2)"
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}

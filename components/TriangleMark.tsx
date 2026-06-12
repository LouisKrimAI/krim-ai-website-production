/**
 * TriangleMark — the Krim mark: an open triangle, three strokes with
 * breathing gaps at the vertices, in brand mint. Inline SVG so it always
 * matches the token palette (the legacy asset files carry an off-brand green).
 */

export default function TriangleMark({
  size = 22,
  className = '',
  stroke = 'var(--mint)',
}: {
  size?: number
  className?: string
  stroke?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
    >
      <g stroke={stroke} strokeWidth={7} strokeLinecap="round">
        {/* left side */}
        <line x1="44.3" y1="25.9" x2="17.7" y2="72.1" />
        {/* right side */}
        <line x1="55.7" y1="25.9" x2="82.3" y2="72.1" />
        {/* base */}
        <line x1="23.4" y1="82" x2="76.6" y2="82" />
      </g>
    </svg>
  )
}

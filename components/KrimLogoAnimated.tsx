/**
 * KrimLogoAnimated — the REAL committed animated Krim wordmark
 * (public/brand/krim-wordmark-animated.svg), inlined verbatim as JSX so its
 * SMIL animation runs and it can be sized/faded in the hero. Not a redraw:
 * geometry, colours (#00FF88), dots and timings are exactly the asset's.
 * The hero reveal owns the fade; this just renders + animates the mark.
 */

export default function KrimLogoAnimated({
  className = '',
  title = 'Krim AI',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Logo icon on the left */}
      <g transform="translate(20, 5) scale(0.35)">
        <line x1="200" y1="100" x2="160" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="203.9" x2="100" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="100" x2="240" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="260" y1="203.9" x2="300" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="273.2" x2="180" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="220" y1="273.2" x2="300" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />

        {/* Red dot from left portal */}
        <circle r="4" fill="#FF0040">
          <animate attributeName="cx" values="106.7;150;200;150;106.7" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="161.6;186.6;215.5;186.6;161.6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Blue dot from right portal */}
        <circle r="4" fill="#00BBFF">
          <animate attributeName="cx" values="293.3;250;200;250;293.3" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="161.6;186.6;215.5;186.6;161.6" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>

        {/* Green dot from bottom portal */}
        <circle r="4" fill="#00FF88">
          <animate attributeName="cx" values="200;200;200;200;200" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="323.2;273.2;215.5;273.2;323.2" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
        </circle>

        {/* Central convergence flash */}
        <circle cx="200" cy="215.5" r="2" fill="#FFFFFF" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;10;2" dur="1s" begin="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      <text x="150" y="90" fontFamily="Montserrat, var(--font-body), sans-serif" fontSize="56" fontWeight="bold" fill="#00FF88">
        KRIM AI
      </text>
    </svg>
  )
}

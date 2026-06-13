/**
 * KrimLogoAnimated — the hero wordmark. Composed per the brand owner's
 * direction from the REAL Krim elements: the INVERTED triangle mark
 * (geometry from public/brand/krim-mark.svg) + the signature converging-dot
 * animation (from the committed animated asset) + the "KRIM" wordmark
 * (no "AI"), harmonised to the canonical brand mint (#00FFB2).
 *
 * The same artwork is saved as public/brand/krim-logo-animated.svg. Inlined
 * here as JSX so the hero can fade it in. Three signal dots travel from the
 * triangle's edges to its centroid and flash — information converging.
 */

export default function KrimLogoAnimated({
  className = '',
  title = 'Krim',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg viewBox="0 0 780 320" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <title>{title}</title>

      {/* icon — inverted triangle + converging signal dots (own 0–400 space) */}
      <svg x="0" y="20" width="280" height="280" viewBox="0 0 400 400" overflow="visible">
        <g stroke="#00FFB2" strokeWidth="10" strokeLinecap="round" fill="none">
          {/* left side, with gap */}
          <line x1="100" y1="100" x2="140" y2="169.3" />
          <line x1="160" y1="203.9" x2="200" y2="273.2" />
          {/* right side, with gap */}
          <line x1="300" y1="100" x2="260" y2="169.3" />
          <line x1="240" y1="203.9" x2="200" y2="273.2" />
          {/* top side, with gap */}
          <line x1="100" y1="100" x2="180" y2="100" />
          <line x1="220" y1="100" x2="300" y2="100" />
        </g>

        {/* signal dots converge to the centroid (200, 157.7) */}
        <circle r="12" fill="#FF0040">
          <animate attributeName="cy" values="100;128;157.7;128;100" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="200;200;200;200;200" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="12" fill="#00BBFF">
          <animate attributeName="cx" values="150;175;200;175;150" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="186.6;172;157.7;172;186.6" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle r="12" fill="#5CFFCB">
          <animate attributeName="cx" values="250;225;200;225;250" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="186.6;172;157.7;172;186.6" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="157.7" r="5" fill="#FFFFFF" opacity="0">
          <animate attributeName="opacity" values="0;0.85;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="5;22;5" dur="1s" begin="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* wordmark — "KRIM" only, brand mint */}
      <text
        x="298"
        y="214"
        fontFamily="var(--font-body), system-ui, sans-serif"
        fontSize="176"
        fontWeight="700"
        letterSpacing="1"
        fill="#00FFB2"
      >
        KRIM
      </text>
    </svg>
  )
}

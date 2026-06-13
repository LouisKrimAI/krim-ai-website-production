/**
 * KrimLogoAnimated — the REAL committed animated Krim logo, inverted.
 *
 * This is the original asset (public/brand/krim-wordmark-animated.svg) with
 * two faithful changes the brand owner asked for: (1) the icon is the exact
 * original geometry, vertically INVERTED (every y mirrored about the icon's
 * centre, y' = 373.2 − y — apex now points down); (2) the wordmark reads
 * "KRIM", not "KRIM AI". Nothing else is altered: the original #00FF88, the
 * stroke weights, and the red/blue/green converging-dot animation with the
 * white convergence flash are all preserved exactly.
 *
 * Saved as assets too: public/brand/krim-icon-inverted-animated.svg (icon),
 * krim-text.svg (wordmark), krim-logo-inverted-animated.svg (combined).
 * Inlined here as JSX so it animates and picks up the Montserrat webfont.
 */

export default function KrimLogoAnimated({
  className = '',
  title = 'Krim',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg viewBox="0 0 310 120" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <title>{title}</title>

      {/* icon — original artwork at its original placement, inverted (y' = 373.2 − y) */}
      <g transform="translate(20, 5) scale(0.35)">
        {/* inverted triangle, original #00FF88 / stroke-width 4 */}
        <line x1="200" y1="273.2" x2="160" y2="203.9" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="169.3" x2="100" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="273.2" x2="240" y2="203.9" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="260" y1="169.3" x2="300" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="180" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />
        <line x1="220" y1="100" x2="300" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" />

        {/* converging dots → inverted centroid (200, 157.7) */}
        <circle r="4" fill="#FF0040">
          <animate attributeName="cx" values="106.7;150;200;150;106.7" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="211.6;186.6;157.7;186.6;211.6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="#00BBFF">
          <animate attributeName="cx" values="293.3;250;200;250;293.3" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="211.6;186.6;157.7;186.6;211.6" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="#00FF88">
          <animate attributeName="cx" values="200;200;200;200;200" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="50;100;157.7;100;50" dur="3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="157.7" r="2" fill="#FFFFFF" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;10;2" dur="1s" begin="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* wordmark — "KRIM", original Montserrat / 56 / bold / #00FF88 */}
      <text
        x="150"
        y="90"
        fontFamily="var(--font-logo), Montserrat, sans-serif"
        fontSize="56"
        fontWeight="700"
        fill="#00FF88"
      >
        KRIM
      </text>
    </svg>
  )
}

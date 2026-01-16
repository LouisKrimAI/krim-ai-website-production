/**
 * KRIM AI - KRIMOS PILLAR GLYPHS
 * Inline SVG micro-diagrams for the 4 Kendra pillars
 * All glyphs are <2KB, retina-crisp, with subtle hover transitions
 */

type GlyphProps = {
  className?: string;
};

/**
 * Expert AI Co-Workers - Network of connected nodes
 */
export function ExpertCoWorkersGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Central node */}
      <circle cx="16" cy="16" r="3" className="stroke-white/60 group-hover:stroke-krim-mint/70 transition-colors duration-300" strokeWidth="1.5" />
      {/* Surrounding nodes */}
      <circle cx="8" cy="8" r="2.5" className="stroke-white/50 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      <circle cx="24" cy="8" r="2.5" className="stroke-white/50 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      <circle cx="8" cy="24" r="2.5" className="stroke-white/50 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" className="stroke-white/50 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      {/* Connecting edges */}
      <line x1="10" y1="9.5" x2="13.5" y2="14" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="22" y1="9.5" x2="18.5" y2="14" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="10" y1="22.5" x2="13.5" y2="18" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="22" y1="22.5" x2="18.5" y2="18" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
    </svg>
  );
}

/**
 * Unified Intelligence - Concentric rings
 */
export function UnifiedIntelligenceGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="13" className="stroke-white/40 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="9" className="stroke-white/50 group-hover:stroke-krim-mint/70 transition-colors duration-300" strokeWidth="1.5" />
      {/* Inner ring */}
      <circle cx="16" cy="16" r="5" className="stroke-white/60 group-hover:stroke-krim-mint/80 transition-colors duration-300" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.5" className="fill-white/70 group-hover:fill-krim-mint transition-colors duration-300" />
      {/* Radial lines connecting rings */}
      <line x1="16" y1="3" x2="16" y2="7" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="16" y1="25" x2="16" y2="29" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="3" y1="16" x2="7" y2="16" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
      <line x1="25" y1="16" x2="29" y2="16" className="stroke-white/30 group-hover:stroke-krim-mint/50 transition-colors duration-300" strokeWidth="1" />
    </svg>
  );
}

/**
 * Continuous Learning - Ascending bars with circular arrow
 */
export function ContinuousLearningGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Ascending bars */}
      <rect x="8" y="22" width="3" height="6" rx="0.5" className="stroke-white/50 group-hover:stroke-krim-mint/60 transition-colors duration-300" strokeWidth="1.5" />
      <rect x="14" y="18" width="3" height="10" rx="0.5" className="stroke-white/55 group-hover:stroke-krim-mint/70 transition-colors duration-300" strokeWidth="1.5" />
      <rect x="20" y="14" width="3" height="14" rx="0.5" className="stroke-white/60 group-hover:stroke-krim-mint/80 transition-colors duration-300" strokeWidth="1.5" />
      {/* Circular loop arrow */}
      <path
        d="M 24 8 A 8 8 0 1 1 16 4"
        className="stroke-white/60 group-hover:stroke-krim-mint/70 transition-colors duration-300"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Arrow head */}
      <path
        d="M 16 4 L 18 6 M 16 4 L 14 6"
        className="stroke-white/60 group-hover:stroke-krim-mint/70 transition-colors duration-300"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Compliant-by-Design - Shield with checkmark and grid
 */
export function CompliantByDesignGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Shield outline */}
      <path
        d="M 16 4 L 26 8 L 26 16 Q 26 24 16 28 Q 6 24 6 16 L 6 8 Z"
        className="stroke-white/60 group-hover:stroke-krim-mint/70 transition-colors duration-300"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Internal grid */}
      <line x1="16" y1="8" x2="16" y2="26" className="stroke-white/20 group-hover:stroke-krim-mint/30 transition-colors duration-300" strokeWidth="1" />
      <line x1="10" y1="14" x2="22" y2="14" className="stroke-white/20 group-hover:stroke-krim-mint/30 transition-colors duration-300" strokeWidth="1" />
      <line x1="10" y1="20" x2="22" y2="20" className="stroke-white/20 group-hover:stroke-krim-mint/30 transition-colors duration-300" strokeWidth="1" />
      {/* Checkmark */}
      <path
        d="M 12 16 L 15 19 L 21 13"
        className="stroke-white/70 group-hover:stroke-krim-mint transition-colors duration-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * INTEGRATIONS CAROUSEL
 * Futuristic horizontal-sliding integration showcase
 * Smooth drag/swipe navigation with auto-advancing categories
 *
 * IMPROVEMENTS:
 * - Responsive card widths (300px mobile, 380px desktop)
 * - Optimized drag constraints with natural elastic feel
 * - Always-on edge fades (no motion value dependency issues)
 * - Hover lift effect for non-active cards
 * - Enhanced accessibility (aria-labels, keyboard navigation)
 * - Improved visual polish and readability
 * - Simplified noise texture (removed overly complex SVG)
 * - Fixed auto-advance cleanup and closure issues
 */
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { darkBackgroundLogos } from '../logos/DarkBackgroundLogos';

// ─── Integration Categories ────────────────────────────────────────────────────
// Optimized for regulated industries with IAM, contact center, and consolidated banking

const categories = [
  {
    id: 'llm-foundation',
    name: 'LLM & Foundation Models',
    description: 'Multi-model orchestration for autonomous agent reasoning',
    gradient: 'from-violet-500/20 to-purple-600/20',
    borderGlow: 'violet',
    logos: [
      { name: 'OpenAI', component: null },
      { name: 'Anthropic', component: null },
      { name: 'Google Gemini', component: null },
      { name: 'Meta Llama', component: null },
      { name: 'Mistral', component: null },
      { name: 'Cohere', component: null },
    ]
  },
  {
    id: 'identity-access',
    name: 'Identity & Access Management',
    description: 'Zero-trust governance with regulated identity verification',
    gradient: 'from-indigo-500/20 to-blue-600/20',
    borderGlow: 'blue',
    logos: [
      { name: 'Okta', component: null },
      { name: 'Auth0', component: null },
      { name: 'Ping', component: null },
      { name: 'Azure', component: 'Azure' },
    ]
  },
  {
    id: 'banking-payments',
    name: 'Banking, Payments & Fintech',
    description: 'Core banking systems, payment rails, and fintech with audit trails',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    borderGlow: 'cyan',
    logos: [
      { name: 'Jack Henry', component: 'Jack Henry' },
      { name: 'Fiserv', component: 'Fiserv' },
      { name: 'FIS', component: 'FIS' },
      { name: 'Temenos', component: 'Temenos' },
      { name: 'Stripe', component: 'Stripe' },
    ]
  },
  {
    id: 'contact-center',
    name: 'Contact Center & Telephony',
    description: 'Omnichannel contact centers and voice/video for autonomous agents',
    gradient: 'from-emerald-500/20 to-green-600/20',
    borderGlow: 'emerald',
    logos: [
      { name: 'Twilio', component: null },
      { name: 'Genesys', component: null },
      { name: 'NICE', component: null },
      { name: 'Zoom', component: 'Zoom' },
    ]
  },
  {
    id: 'cloud-data',
    name: 'Cloud & Data Infrastructure',
    description: 'Secure cloud, data lakes, and analytics with compliance controls',
    gradient: 'from-cyan-500/20 to-sky-600/20',
    borderGlow: 'cyan',
    logos: [
      { name: 'AWS', component: 'AWS' },
      { name: 'Microsoft', component: 'Microsoft' },
      { name: 'Snowflake', component: 'Snowflake' },
      { name: 'Databricks', component: 'Databricks' },
    ]
  },
  {
    id: 'enterprise-software',
    name: 'Enterprise & AI Software',
    description: 'CRM, ERP, GPU compute, and real-time communications',
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderGlow: 'amber',
    logos: [
      { name: 'Salesforce', component: 'Salesforce' },
      { name: 'Oracle', component: 'Oracle' },
      { name: 'NVIDIA', component: 'NVIDIA' },
      { name: 'LiveKit', component: 'LiveKit' },
    ]
  },
  {
    id: 'grc-compliance',
    name: 'Governance, Risk & Compliance',
    description: 'Audit-ready compliance, risk frameworks, and policy management',
    gradient: 'from-red-500/20 to-rose-600/20',
    borderGlow: 'red',
    logos: [
      { name: 'ServiceNow', component: null },
      { name: 'OneTrust', component: null },
      { name: 'Archer', component: null },
      { name: 'LogicGate', component: null },
    ]
  },
  {
    id: 'document-knowledge',
    name: 'Document & Knowledge Management',
    description: 'Enterprise content, knowledge bases, and document intelligence',
    gradient: 'from-teal-500/20 to-emerald-600/20',
    borderGlow: 'teal',
    logos: [
      { name: 'SharePoint', component: null },
      { name: 'Google Drive', component: null },
      { name: 'Box', component: null },
      { name: 'Confluence', component: null },
    ]
  },
];

// ─── Border glow colors ────────────────────────────────────────────────────────
const glowColors: Record<string, string> = {
  violet: 'rgba(139, 92, 246, 0.4)',
  blue: 'rgba(59, 130, 246, 0.4)',
  emerald: 'rgba(16, 185, 129, 0.4)',
  cyan: 'rgba(6, 182, 212, 0.4)',
  purple: 'rgba(168, 85, 247, 0.4)',
  amber: 'rgba(245, 158, 11, 0.4)',
  red: 'rgba(239, 68, 68, 0.4)',
  teal: 'rgba(20, 184, 166, 0.4)',
};

const borderColors: Record<string, string> = {
  violet: 'border-violet-500/30',
  blue: 'border-blue-500/30',
  emerald: 'border-emerald-500/30',
  cyan: 'border-cyan-500/30',
  purple: 'border-purple-500/30',
  amber: 'border-amber-500/30',
  red: 'border-red-500/30',
  teal: 'border-teal-500/30',
};

const textColors: Record<string, string> = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  teal: 'text-teal-400',
};

// ─── Logo Renderer ─────────────────────────────────────────────────────────────
const LogoItem = React.memo(({ logo }: { logo: { name: string; component: string | null } }) => {
  if (logo.component) {
    const LogoComponent = darkBackgroundLogos[logo.component as keyof typeof darkBackgroundLogos];
    if (LogoComponent) {
      return (
        <div className="flex items-center justify-center h-12 px-4 group/logo">
          <LogoComponent
            width={90}
            height={28}
            className="transition-all duration-500 opacity-70 group-hover/logo:opacity-100 group-hover/logo:scale-110"
          />
        </div>
      );
    }
  }
  // Text fallback for logos without images
  return (
    <div className="flex items-center justify-center h-12 px-4 group/logo">
      <span className="text-sm font-medium text-white/50 tracking-wide transition-all duration-500 group-hover/logo:text-white/90 group-hover/logo:scale-105">
        {logo.name}
      </span>
    </div>
  );
}, (prevProps, nextProps) => prevProps.logo.name === nextProps.logo.name);

LogoItem.displayName = 'LogoItem';

// ─── Single Category Card ──────────────────────────────────────────────────────
const CategoryCard = React.memo(({ category, isActive }: {
  category: typeof categories[0];
  isActive: boolean;
}) => {
  const glow = glowColors[category.borderGlow] || glowColors.cyan;
  const border = borderColors[category.borderGlow] || borderColors.cyan;
  const accent = textColors[category.borderGlow] || textColors.cyan;

  return (
    <motion.div
      className={`
        relative flex-shrink-0 w-[300px] sm:w-[380px] h-[320px]
        rounded-2xl border ${border}
        bg-gradient-to-br ${category.gradient}
        backdrop-blur-xl overflow-hidden
        transition-all duration-700 ease-out
        cursor-pointer
        group
        ${isActive ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-60 hover:scale-[0.98] hover:opacity-75'}
      `}
      style={{
        boxShadow: isActive
          ? `0 0 40px ${glow}, 0 0 80px ${glow.replace('0.4', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : `inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
      whileHover={!isActive ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Top glowing accent line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] transition-opacity duration-700"
        style={{
          background: `linear-gradient(90deg, transparent, ${glow}, transparent)`,
          opacity: isActive ? 1 : 0.3,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-white leading-tight">
            {category.name}
          </h3>
          <p className={`text-sm mt-2 ${accent} opacity-75 leading-relaxed`}>
            {category.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-[1px] my-3"
          style={{
            background: `linear-gradient(90deg, ${glow}, transparent)`,
          }}
        />

        {/* Logo grid */}
        <div className="flex-1 grid grid-cols-2 gap-1 content-center">
          {category.logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.category.id === nextProps.category.id &&
    prevProps.isActive === nextProps.isActive
  );
});

CategoryCard.displayName = 'CategoryCard';

// ─── Carousel Navigation Dot ──────────────────────────────────────────────────
const NavDot = React.memo(({ isActive, color, onClick, index, total }: {
  isActive: boolean;
  color: string;
  onClick: () => void;
  index: number;
  total: number;
}) => {
  const glow = glowColors[color] || glowColors.cyan;
  return (
    <button
      onClick={onClick}
      className={`
        relative h-2 rounded-full transition-all duration-500 ease-out
        focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${isActive ? 'w-8' : 'w-2 hover:w-3'}
      `}
      style={{
        background: isActive ? glow.replace('0.4', '1') : 'rgba(255,255,255,0.2)',
        boxShadow: isActive ? `0 0 12px ${glow}` : 'none',
      }}
      aria-label={`Category ${index + 1} of ${total}: ${color}`}
      aria-current={isActive ? 'true' : 'false'}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.color === nextProps.color &&
    prevProps.index === nextProps.index
  );
});

NavDot.displayName = 'NavDot';

// ─── Main Carousel Component ───────────────────────────────────────────────────
export default function IntegrationsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_WIDTH_DESKTOP = 380;
  const CARD_WIDTH_MOBILE = 300;
  const GAP = 24;
  const TOTAL = categories.length;
  const AUTO_ADVANCE_DELAY = 5000;

  // Responsive card width
  const CARD_WIDTH = isSmallScreen ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the offset to center the active card
  const getTargetX = useCallback((index: number) => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const cardCenter = index * (CARD_WIDTH + GAP) + CARD_WIDTH / 2;
    return containerWidth / 2 - cardCenter;
  }, [CARD_WIDTH]);

  // Animate to a specific index - uses stable reference to avoid closure issues
  const animateToIndex = useCallback((index: number) => {
    const target = getTargetX(index);
    animate(x, target, {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    });
  }, [getTargetX, x]);

  // Go to specific index
  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, index));
    setActiveIndex(clamped);
    animateToIndex(clamped);
  }, [TOTAL, animateToIndex]);

  // Initialize position on mount
  useEffect(() => {
    const target = getTargetX(0);
    x.set(target);
  }, []);

  // Create stable auto-advance function that captures current dependencies
  const setupAutoPlay = useCallback(() => {
    // Clear existing timer
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    // Set up new timer
    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current) {
        setActiveIndex(prev => {
          const next = (prev + 1) % TOTAL;
          return next;
        });
      }
    }, AUTO_ADVANCE_DELAY);
  }, [TOTAL]);

  // Auto-advance effect
  useEffect(() => {
    setupAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [setupAutoPlay]);

  // Handle index changes from auto-advance
  useEffect(() => {
    animateToIndex(activeIndex);
  }, [activeIndex, animateToIndex]);

  // Reset auto-play on manual interaction
  const resetAutoPlay = useCallback(() => {
    setupAutoPlay();
  }, [setupAutoPlay]);

  // Drag handlers
  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    isDragging.current = false;
    const threshold = 60;
    if (info.offset.x < -threshold) {
      goTo(activeIndex + 1);
    } else if (info.offset.x > threshold) {
      goTo(activeIndex - 1);
    } else {
      goTo(activeIndex);
    }
    resetAutoPlay();
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(activeIndex + 1);
      resetAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(activeIndex - 1);
      resetAutoPlay();
    }
  }, [activeIndex, goTo, resetAutoPlay]);

  // Arrow button handlers
  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1);
    resetAutoPlay();
  }, [activeIndex, goTo, resetAutoPlay]);

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1);
    resetAutoPlay();
  }, [activeIndex, goTo, resetAutoPlay]);

  // Calculate drag constraints with proper centering
  const dragConstraints = useMemo(() => ({
    left: getTargetX(TOTAL - 1) - 100,
    right: getTargetX(0) + 100,
  }), [getTargetX, TOTAL]);

  return (
    <section
      className="py-24 relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Integration ecosystem carousel"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-krim-mint" />
            <span className="text-krim-mint font-semibold tracking-widest uppercase text-xs">
              Integration Ecosystem
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-krim-mint" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Connected Ecosystem
          </h2>

          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Native connectivity across your entire technology stack
          </p>
        </motion.div>
      </div>

      {/* Carousel Track */}
      <div className="relative" ref={containerRef}>
        {/* Left fade edge - always visible for deep-space background blending */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10, 8, 27, 0.95), transparent)',
            opacity: activeIndex === 0 ? 0.5 : 1,
          }}
        />

        {/* Right fade edge - always visible for deep-space background blending */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(10, 8, 27, 0.95), transparent)',
            opacity: activeIndex === TOTAL - 1 ? 0.5 : 1,
          }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`
            absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full
            border border-white/10 bg-white/5 backdrop-blur-md
            flex items-center justify-center
            transition-all duration-300
            ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white/10 hover:border-white/20'}
          `}
          aria-label="Previous category"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/80">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === TOTAL - 1}
          className={`
            absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full
            border border-white/10 bg-white/5 backdrop-blur-md
            flex items-center justify-center
            transition-all duration-300
            ${activeIndex === TOTAL - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white/10 hover:border-white/20'}
          `}
          aria-label="Next category"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/80">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Draggable card track */}
        <motion.div
          className="flex cursor-grab active:cursor-grabbing py-4"
          style={{
            x,
            gap: `${GAP}px`,
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.15}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => { goTo(index); resetAutoPlay(); }}
              className="flex-shrink-0"
              role="button"
              tabIndex={0}
              aria-label={`View ${category.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goTo(index);
                  resetAutoPlay();
                }
              }}
            >
              <CategoryCard category={category} isActive={index === activeIndex} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Category navigation">
        {categories.map((cat, i) => (
          <NavDot
            key={cat.id}
            index={i}
            total={TOTAL}
            isActive={i === activeIndex}
            color={cat.borderGlow}
            onClick={() => { goTo(i); resetAutoPlay(); }}
          />
        ))}
      </div>

      {/* Category counter - more visible */}
      <div className="text-center mt-6">
        <span className="text-sm text-white/50 tracking-widest font-mono font-medium">
          {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

/**
 * INTEGRATIONS CAROUSEL — v2
 *
 * Premium physics-driven carousel with:
 * - Continuous distance-based card transforms (scale, opacity, y, rotateY)
 * - Velocity-aware snap with custom spring physics
 * - Ambient glow orb with 0.6x parallax tracking
 * - Mouse-follow tilt on active card
 * - Auto-advance with dot progress indicator
 * - Reduced-motion support
 *
 * Performance:
 * - All per-frame transforms via MotionValue (off React render cycle)
 * - No backdrop-blur (faked with semi-opaque bg)
 * - ResizeObserver for container width, matchMedia for breakpoint
 * - will-change: transform on GPU-composited layers
 * - Scoped transition-[box-shadow] only
 */
import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import {
  motion,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  animate,
  type PanInfo,
  type MotionValue,
} from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { darkBackgroundLogos } from '../logos/DarkBackgroundLogos';

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_WIDTH_DESKTOP = 380;
const CARD_WIDTH_MOBILE = 300;
const GAP = 24;
const AUTO_ADVANCE_MS = 6000;
const VELOCITY_THRESHOLD = 250; // px/s — snap in velocity direction
const DRAG_ELASTIC = 0.08;

// Unified krim-cyan accent — no per-category colors
const CYAN = '#00D4FF';
const CYAN_RGB = '0, 212, 255';
const ACTIVE_GLOW = `0 0 40px rgba(${CYAN_RGB}, 0.3), 0 0 80px rgba(${CYAN_RGB}, 0.12)`;
const IDLE_SHADOW = 'inset 0 1px 0 rgba(255,255,255,0.04)';

// Spring for main snap animation
const SNAP_SPRING = { type: 'spring' as const, stiffness: 220, damping: 28, mass: 0.9 };

// Section entry stagger helpers
const ENTRY_EASE = [0.22, 1, 0.36, 1] as const;
const sectionEntry = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: ENTRY_EASE, delay },
});

// ─── Integration Categories ──────────────────────────────────────────────────
// Same 8 categories, same data — only visual treatment changed.

const categories = [
  {
    id: 'llm-foundation',
    name: 'LLM & Foundation Models',
    description: 'Multi-model orchestration for autonomous agent reasoning',
    logos: [
      { name: 'OpenAI', component: null },
      { name: 'Anthropic', component: null },
      { name: 'Google Gemini', component: null },
      { name: 'Meta Llama', component: null },
      { name: 'Mistral', component: null },
      { name: 'Cohere', component: null },
    ],
  },
  {
    id: 'identity-access',
    name: 'Identity & Access Management',
    description: 'Zero-trust governance with regulated identity verification',
    logos: [
      { name: 'Okta', component: null },
      { name: 'Auth0', component: null },
      { name: 'Ping', component: null },
      { name: 'Azure', component: 'Azure' },
    ],
  },
  {
    id: 'banking-payments',
    name: 'Banking, Payments & Fintech',
    description: 'Core banking systems, payment rails, and fintech with audit trails',
    logos: [
      { name: 'Jack Henry', component: 'Jack Henry' },
      { name: 'Fiserv', component: 'Fiserv' },
      { name: 'FIS', component: 'FIS' },
      { name: 'Temenos', component: 'Temenos' },
      { name: 'Stripe', component: 'Stripe' },
    ],
  },
  {
    id: 'contact-center',
    name: 'Contact Center & Telephony',
    description: 'Omnichannel contact centers and voice/video for autonomous agents',
    logos: [
      { name: 'Twilio', component: null },
      { name: 'Genesys', component: null },
      { name: 'NICE', component: null },
      { name: 'Zoom', component: 'Zoom' },
    ],
  },
  {
    id: 'cloud-data',
    name: 'Cloud & Data Infrastructure',
    description: 'Secure cloud, data lakes, and analytics with compliance controls',
    logos: [
      { name: 'AWS', component: 'AWS' },
      { name: 'Microsoft', component: 'Microsoft' },
      { name: 'Snowflake', component: 'Snowflake' },
      { name: 'Databricks', component: 'Databricks' },
    ],
  },
  {
    id: 'enterprise-software',
    name: 'Enterprise & AI Software',
    description: 'CRM, ERP, GPU compute, and real-time communications',
    logos: [
      { name: 'Salesforce', component: 'Salesforce' },
      { name: 'Oracle', component: 'Oracle' },
      { name: 'NVIDIA', component: 'NVIDIA' },
      { name: 'LiveKit', component: 'LiveKit' },
    ],
  },
  {
    id: 'grc-compliance',
    name: 'Governance, Risk & Compliance',
    description: 'Audit-ready compliance, risk frameworks, and policy management',
    logos: [
      { name: 'ServiceNow', component: null },
      { name: 'OneTrust', component: null },
      { name: 'Archer', component: null },
      { name: 'LogicGate', component: null },
    ],
  },
  {
    id: 'document-knowledge',
    name: 'Document & Knowledge Management',
    description: 'Enterprise content, knowledge bases, and document intelligence',
    logos: [
      { name: 'SharePoint', component: null },
      { name: 'Google Drive', component: null },
      { name: 'Box', component: null },
      { name: 'Confluence', component: null },
    ],
  },
];

const TOTAL = categories.length;

// ─── Per-card motion value sets ──────────────────────────────────────────────
// Created once at module scope using motionValue() factory (NOT the hook).
// Mutated every frame from useMotionValueEvent — zero React re-renders.

interface CardMV {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  rotateY: MotionValue<number>;
  shadow: MotionValue<string>;
}

const cardMVs: CardMV[] = categories.map(() => ({
  scale: motionValue(1),
  opacity: motionValue(1),
  y: motionValue(0),
  rotateY: motionValue(0),
  shadow: motionValue(IDLE_SHADOW),
}));

// ─── Reduced-motion hook ─────────────────────────────────────────────────────

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── Logo Item ───────────────────────────────────────────────────────────────

const LogoItem = React.memo(
  ({ logo }: { logo: { name: string; component: string | null } }) => {
    if (logo.component) {
      const LogoComponent =
        darkBackgroundLogos[logo.component as keyof typeof darkBackgroundLogos];
      if (LogoComponent) {
        return (
          <div className="flex items-center justify-center h-12 px-4 group/logo">
            <LogoComponent
              width={90}
              height={28}
              className="opacity-70 transition-all duration-[250ms] ease-out group-hover/logo:opacity-100 group-hover/logo:scale-[1.06] group-hover/logo:-translate-y-0.5"
            />
          </div>
        );
      }
    }
    return (
      <div className="flex items-center justify-center h-12 px-4 group/logo">
        <span className="text-sm font-medium text-white/50 tracking-wide transition-all duration-[250ms] ease-out group-hover/logo:text-white/90 group-hover/logo:scale-[1.06] group-hover/logo:-translate-y-0.5">
          {logo.name}
        </span>
      </div>
    );
  },
  (prev, next) => prev.logo.name === next.logo.name,
);
LogoItem.displayName = 'LogoItem';

// ─── Category Card ───────────────────────────────────────────────────────────

interface CardProps {
  category: (typeof categories)[0];
  mv: CardMV;
  isActive: boolean;
  reducedMotion: boolean;
  onClick: () => void;
}

const CategoryCard = React.memo(
  ({ category, mv, isActive, reducedMotion, onClick }: CardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse-follow tilt for active card (desktop only, respects reduced motion)
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive || reducedMotion) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (e.clientY - cy) / (rect.height / 2);
        animate(tiltY, nx * 3, { duration: 0.15, ease: 'easeOut' });
        animate(tiltX, -ny * 2, { duration: 0.15, ease: 'easeOut' });
      },
      [isActive, reducedMotion, tiltX, tiltY],
    );

    const handleMouseLeave = useCallback(() => {
      animate(tiltX, 0, { type: 'spring', stiffness: 200, damping: 20 });
      animate(tiltY, 0, { type: 'spring', stiffness: 200, damping: 20 });
    }, [tiltX, tiltY]);

    return (
      <motion.div
        ref={cardRef}
        className="relative flex-shrink-0 w-[300px] sm:w-[380px] h-[320px] rounded-2xl border border-cyan-500/20 overflow-hidden cursor-pointer group transition-[box-shadow] duration-700 ease-out"
        style={{
          scale: mv.scale,
          opacity: mv.opacity,
          y: mv.y,
          rotateY: reducedMotion ? 0 : mv.rotateY,
          rotateX: reducedMotion ? 0 : tiltX,
          boxShadow: mv.shadow,
          background:
            'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
          backgroundColor: 'rgba(10, 8, 27, 0.85)',
          willChange: 'transform',
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`View ${category.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {category.name}
            </h3>
            <p className="text-sm mt-2 text-white/50 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-full h-[1px] my-3"
            style={{
              background: `linear-gradient(90deg, rgba(${CYAN_RGB}, 0.4), transparent)`,
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
  },
  (prev, next) =>
    prev.category.id === next.category.id &&
    prev.isActive === next.isActive &&
    prev.reducedMotion === next.reducedMotion,
);
CategoryCard.displayName = 'CategoryCard';

// ─── Nav Dot with auto-advance progress bar ─────────────────────────────────

const NavDot = React.memo(
  ({
    isActive,
    onClick,
    index,
    total,
    categoryName,
    progressKey,
  }: {
    isActive: boolean;
    onClick: () => void;
    index: number;
    total: number;
    categoryName: string;
    progressKey: number;
  }) => (
    <button
      onClick={onClick}
      className={`
        relative h-2 rounded-full overflow-hidden
        transition-all duration-500 ease-out
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${isActive ? 'w-8' : 'w-2 hover:w-3'}
      `}
      style={{
        background: isActive ? 'transparent' : 'rgba(255,255,255,0.2)',
      }}
      aria-label={`Category ${index + 1} of ${total}: ${categoryName}`}
      aria-current={isActive ? 'true' : 'false'}
    >
      {/* Base fill behind progress sweep */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: `rgba(${CYAN_RGB}, 0.3)` }}
        />
      )}
      {/* Animated progress fill — resets via key change */}
      {isActive && (
        <span
          key={progressKey}
          className="absolute inset-0 rounded-full origin-left"
          style={{
            background: CYAN,
            animation: `dot-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
            boxShadow: `0 0 12px rgba(${CYAN_RGB}, 0.6)`,
          }}
        />
      )}
    </button>
  ),
  (prev, next) =>
    prev.isActive === next.isActive &&
    prev.index === next.index &&
    prev.progressKey === next.progressKey,
);
NavDot.displayName = 'NavDot';

// ─── Main Carousel Component ─────────────────────────────────────────────────

export default function IntegrationsCarousel() {
  const reducedMotion = usePrefersReducedMotion();

  // Active index — tracked in both state (for re-render) and ref (for setInterval closure)
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Bumped to reset dot progress animation
  const [progressKey, setProgressKey] = useState(0);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const CARD_WIDTH = isSmallScreen ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const CARD_STEP = CARD_WIDTH + GAP;
  const OFFSET_THRESHOLD = CARD_WIDTH * 0.25;

  // Single motion value driving the whole track
  const x = useMotionValue(0);
  // Ambient glow orb — 0.6x parallax
  const glowX = useMotionValue(0);

  // ─── Responsive breakpoint via matchMedia (fires only on threshold cross) ─

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    setIsSmallScreen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // ─── Container width via ResizeObserver ───────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    containerWidthRef.current = el.offsetWidth;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidthRef.current = entry.contentRect.width;
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ─── Position helpers ─────────────────────────────────────────────────────

  const getTargetX = useCallback(
    (index: number) => {
      const cw =
        containerWidthRef.current ||
        (typeof window !== 'undefined' ? window.innerWidth : 1280);
      const cardCenter = index * CARD_STEP + CARD_WIDTH / 2;
      return cw / 2 - cardCenter;
    },
    [CARD_STEP, CARD_WIDTH],
  );

  const animateToIndex = useCallback(
    (index: number) => {
      const target = getTargetX(index);
      if (reducedMotion) {
        x.set(target);
      } else {
        animate(x, target, SNAP_SPRING);
      }
    },
    [getTargetX, x, reducedMotion],
  );

  // ─── Per-frame card transforms ────────────────────────────────────────────
  // Runs on every animation/drag frame via the x motion value.
  // Computes continuous distance-based scale, opacity, y, rotateY, boxShadow.

  const updateCardTransforms = useCallback(
    (xVal: number) => {
      const cw = containerWidthRef.current || window.innerWidth;
      const viewportCenter = cw / 2;

      for (let i = 0; i < TOTAL; i++) {
        const cardCenter = i * CARD_STEP + CARD_WIDTH / 2 + xVal;
        const dist = Math.abs(cardCenter - viewportCenter);
        const t = Math.min(dist / CARD_STEP, 2); // 0=centered, 1=one card away, 2=two away

        // Continuous interpolations
        const scale = Math.max(1 - t * 0.12, 0.76); // 1.0 → 0.88 → 0.76
        const opacity = Math.max(1 - t * 0.6, 0.25); // 1.0 → 0.4 → 0.25
        const yShift = Math.min(t * 8, 16); // 0 → 8px → 16px
        const side = cardCenter < viewportCenter ? 1 : -1;
        const rotateY = side * 4 * Math.min(t, 1); // 0 → +/-4deg
        const isCenter = t < 0.3;

        const mv = cardMVs[i];
        mv.scale.set(scale);
        mv.opacity.set(opacity);
        mv.y.set(yShift);
        if (!reducedMotion) mv.rotateY.set(rotateY);
        mv.shadow.set(isCenter ? ACTIVE_GLOW : IDLE_SHADOW);
      }

      // Parallax glow orb
      glowX.set(xVal * 0.6);
    },
    [CARD_STEP, CARD_WIDTH, glowX, reducedMotion],
  );

  // Subscribe to x changes — fires every frame during drag/animation
  useMotionValueEvent(x, 'change', updateCardTransforms);

  // ─── Go-to (sets state, ref, animates, resets dot progress) ───────────────

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, index));
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      animateToIndex(clamped);
      setProgressKey((k) => k + 1);
    },
    [animateToIndex],
  );

  // ─── Initialize position on mount ─────────────────────────────────────────

  useEffect(() => {
    requestAnimationFrame(() => {
      const target = getTargetX(0);
      x.set(target);
      updateCardTransforms(target);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Auto-advance ─────────────────────────────────────────────────────────
  // Uses ref for current index to avoid closure issues.
  // Pauses on hover and when dragging.

  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        const next = (activeIndexRef.current + 1) % TOTAL;
        goTo(next);
      }
    };
    autoPlayRef.current = setInterval(tick, AUTO_ADVANCE_MS);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goTo]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setProgressKey((k) => k + 1);
    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current && !isHovered.current) {
        const next = (activeIndexRef.current + 1) % TOTAL;
        goTo(next);
      }
    }, AUTO_ADVANCE_MS);
  }, [goTo]);

  // ─── Drag handlers ────────────────────────────────────────────────────────

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      isDragging.current = false;
      const vx = info.velocity.x;
      const ox = info.offset.x;
      let next = activeIndexRef.current;

      // Velocity-based snap: if fast swipe, snap in that direction
      if (Math.abs(vx) > VELOCITY_THRESHOLD) {
        next += vx < 0 ? 1 : -1;
      } else if (Math.abs(ox) > OFFSET_THRESHOLD) {
        // Offset-based snap: if dragged far enough
        next += ox < 0 ? 1 : -1;
      }
      // else snap back to current

      goTo(Math.max(0, Math.min(TOTAL - 1, next)));
      resetAutoPlay();
    },
    [goTo, resetAutoPlay, OFFSET_THRESHOLD],
  );

  // ─── Arrow & keyboard ────────────────────────────────────────────────────

  const handlePrev = useCallback(() => {
    goTo(activeIndexRef.current - 1);
    resetAutoPlay();
  }, [goTo, resetAutoPlay]);

  const handleNext = useCallback(() => {
    goTo(activeIndexRef.current + 1);
    resetAutoPlay();
  }, [goTo, resetAutoPlay]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev],
  );

  // ─── Hover pause for auto-advance ─────────────────────────────────────────

  const handleSectionEnter = useCallback(() => {
    isHovered.current = true;
  }, []);
  const handleSectionLeave = useCallback(() => {
    isHovered.current = false;
  }, []);

  // ─── Drag constraints ─────────────────────────────────────────────────────

  const dragConstraints = useMemo(
    () => ({
      left: getTargetX(TOTAL - 1) - 100,
      right: getTargetX(0) + 100,
    }),
    [getTargetX],
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section
      className="py-24 relative overflow-hidden"
      onKeyDown={handleKeyDown}
      onMouseEnter={handleSectionEnter}
      onMouseLeave={handleSectionLeave}
      tabIndex={0}
      role="region"
      aria-label="Integration ecosystem carousel"
    >
      {/* Dot progress keyframe — injected once */}
      <style>{`
        @keyframes dot-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="text-center flex flex-col items-center">
          <motion.div
            className="inline-flex items-center justify-center gap-4 mb-5"
            {...sectionEntry(0)}
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-krim-mint" />
            <span className="text-krim-mint font-semibold tracking-widest uppercase text-xs">
              Integration Ecosystem
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-krim-mint" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            {...sectionEntry(0.08)}
          >
            Connected Ecosystem
          </motion.h2>

          <motion.p
            className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
            {...sectionEntry(0.16)}
          >
            Native connectivity across your entire technology stack
          </motion.p>
        </div>
      </div>

      {/* ── Carousel Track ── */}
      <motion.div className="relative" ref={containerRef} {...sectionEntry(0.3)}>
        {/* Ambient glow orb — large blurred blob behind cards, parallax-tracked */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            x: glowX,
            width: 500,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, rgba(${CYAN_RGB}, 0.08) 0%, transparent 70%)`,
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10, 8, 27, 0.95), transparent)',
            opacity: activeIndex === 0 ? 0.5 : 1,
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(10, 8, 27, 0.95), transparent)',
            opacity: activeIndex === TOTAL - 1 ? 0.5 : 1,
          }}
        />

        {/* Arrow — prev */}
        <motion.button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`
            absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full
            border border-white/10 bg-white/5
            flex items-center justify-center
            transition-colors duration-200
            ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
          whileHover={
            activeIndex !== 0
              ? { scale: 1.08, backgroundColor: 'rgba(255,255,255,0.12)' }
              : undefined
          }
          whileTap={activeIndex !== 0 ? { scale: 0.95 } : undefined}
          aria-label="Previous category"
        >
          <CaretLeft size={18} weight="bold" className="text-white/80" />
        </motion.button>

        {/* Arrow — next */}
        <motion.button
          onClick={handleNext}
          disabled={activeIndex === TOTAL - 1}
          className={`
            absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full
            border border-white/10 bg-white/5
            flex items-center justify-center
            transition-colors duration-200
            ${activeIndex === TOTAL - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
          whileHover={
            activeIndex !== TOTAL - 1
              ? { scale: 1.08, backgroundColor: 'rgba(255,255,255,0.12)' }
              : undefined
          }
          whileTap={activeIndex !== TOTAL - 1 ? { scale: 0.95 } : undefined}
          aria-label="Next category"
        >
          <CaretRight size={18} weight="bold" className="text-white/80" />
        </motion.button>

        {/* Draggable card track */}
        <motion.div
          className="flex cursor-grab active:cursor-grabbing py-4 relative z-10"
          style={{
            x,
            gap: `${GAP}px`,
            paddingLeft: '24px',
            paddingRight: '24px',
            perspective: 1200,
            willChange: 'transform',
          }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={DRAG_ELASTIC}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {categories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              mv={cardMVs[i]}
              isActive={i === activeIndex}
              reducedMotion={reducedMotion}
              onClick={() => {
                goTo(i);
                resetAutoPlay();
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Navigation dots ── */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-8"
        role="tablist"
        aria-label="Category navigation"
        {...sectionEntry(0.5)}
      >
        {categories.map((cat, i) => (
          <NavDot
            key={cat.id}
            index={i}
            total={TOTAL}
            isActive={i === activeIndex}
            categoryName={cat.name}
            progressKey={progressKey}
            onClick={() => {
              goTo(i);
              resetAutoPlay();
            }}
          />
        ))}
      </motion.div>

      {/* Category counter */}
      <motion.div className="text-center mt-6" {...sectionEntry(0.55)}>
        <span className="text-sm text-white/50 tracking-widest font-mono font-medium">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(TOTAL).padStart(2, '0')}
        </span>
      </motion.div>
    </section>
  );
}

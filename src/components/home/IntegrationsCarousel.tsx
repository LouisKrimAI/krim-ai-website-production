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
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { darkBackgroundLogos } from '../logos/DarkBackgroundLogos';

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_WIDTH_DESKTOP = 380;
const CARD_WIDTH_MOBILE = 300;
const GAP = 24;
const AUTO_ADVANCE_MS = 6000;
const VELOCITY_THRESHOLD = 250; // px/s — snap in velocity direction
const DRAG_ELASTIC = 0.18;

// Unified krim-cyan accent — no per-category colors
const CYAN = '#00D4FF';
const CYAN_RGB = '0, 212, 255';
const ACTIVE_GLOW = `0 0 40px rgba(${CYAN_RGB}, 0.3), 0 0 80px rgba(${CYAN_RGB}, 0.12)`;
const IDLE_SHADOW = 'inset 0 1px 0 rgba(255,255,255,0.04)';

// Spring hierarchy
const ARROW_SPRING = { type: 'spring' as const, stiffness: 220, damping: 26, mass: 0.85 };
const WHEEL_SPRING = { type: 'spring' as const, stiffness: 200, damping: 28, mass: 0.8 };
const SNAP_SPRING = { type: 'spring' as const, stiffness: 150, damping: 24, mass: 1.0 };
const AUTO_SPRING = { type: 'spring' as const, stiffness: 110, damping: 22, mass: 1.1 };

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
        className={`
          relative flex-shrink-0 w-[300px] sm:w-[380px] h-[320px] rounded-2xl
          border overflow-hidden cursor-pointer group
          transition-[box-shadow,border-color] duration-700 ease-out
          ${isActive ? 'border-cyan-500/20' : 'border-white/[0.06] hover:border-cyan-500/30'}
        `}
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
    (index: number, spring = SNAP_SPRING) => {
      const target = getTargetX(index);
      if (reducedMotion) {
        x.set(target);
      } else {
        animate(x, target, spring);
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
        const scale = Math.max(1 - Math.pow(Math.min(t, 1), 1.4) * 0.12, 0.76); // power curve for softer falloff
        const opacity = Math.max(0.55, 1 - t * 0.45); // 1.0 → 0.55 (softer fade)
        const yShift = Math.min(t * 14, 28); // 0 → 14px → 28px (more depth)
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
    (index: number, spring = SNAP_SPRING, userInitiated = true) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, index));
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      animateToIndex(clamped, spring);
      setProgressKey((k) => k + 1);

      // Magnetic snap glow pulse — only on user-initiated navigation
      if (userInitiated && !reducedMotion) {
        const mv = cardMVs[clamped];
        setTimeout(() => {
          animate(mv.shadow, [
            ACTIVE_GLOW,
            `0 0 50px rgba(${CYAN_RGB}, 0.38), 0 0 100px rgba(${CYAN_RGB}, 0.16)`,
            ACTIVE_GLOW,
          ], { duration: 0.6, ease: [0.32, 0, 0.24, 1] });
        }, 200);
      }
    },
    [animateToIndex, reducedMotion],
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
  // Pauses on hover and when dragging. Stops at last card.

  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        const current = activeIndexRef.current;
        if (current < TOTAL - 1) {
          goTo(current + 1, AUTO_SPRING, false);
        }
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
        const current = activeIndexRef.current;
        if (current < TOTAL - 1) {
          goTo(current + 1, AUTO_SPRING, false);
        }
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
    goTo(activeIndexRef.current - 1, ARROW_SPRING);
    resetAutoPlay();
  }, [goTo, resetAutoPlay]);

  const handleNext = useCallback(() => {
    goTo(activeIndexRef.current + 1, ARROW_SPRING);
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

  // ─── Wheel navigation (mouse wheel + trackpad, both axes) ──────────────

  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelCooldown = useRef(false);
  const edgeScrollCount = useRef(0);
  const edgeScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Classify gesture axis — must have clear dominance
      const isHorizontal = absX > absY * 1.5 && absX > 3;
      const isVertical = absY > absX * 1.5 && absY > 3;
      if (!isHorizontal && !isVertical) return;

      // Effective delta: horizontal uses deltaX, vertical uses deltaY
      const effectiveDelta = isHorizontal ? e.deltaX : e.deltaY;

      // Edge passthrough — prevent scroll hijacking at boundaries
      const atStart = activeIndexRef.current === 0;
      const atEnd = activeIndexRef.current === TOTAL - 1;
      const scrollingBackward = effectiveDelta < 0;
      const scrollingForward = effectiveDelta > 0;

      if ((atStart && scrollingBackward) || (atEnd && scrollingForward)) {
        edgeScrollCount.current += 1;
        if (edgeScrollTimeout.current) clearTimeout(edgeScrollTimeout.current);
        edgeScrollTimeout.current = setTimeout(() => {
          edgeScrollCount.current = 0;
        }, 300);

        // First 2 events at edge: consume silently (prevents jarring page scroll after snap)
        if (edgeScrollCount.current <= 2) {
          e.preventDefault();
          return;
        }
        // After 2+ attempts: let page scroll through
        wheelAccumulator.current = 0;
        return;
      }

      // Consume this event — we're navigating the carousel
      e.preventDefault();
      edgeScrollCount.current = 0;

      // Accumulate delta
      wheelAccumulator.current += effectiveDelta;
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 200);

      // Threshold check with cooldown to prevent double-snap
      const threshold = isHorizontal ? 50 : 80;
      if (Math.abs(wheelAccumulator.current) > threshold && !wheelCooldown.current) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        goTo(activeIndexRef.current + direction, WHEEL_SPRING);
        resetAutoPlay();
        wheelAccumulator.current = 0;

        // 400ms cooldown matches WHEEL_SPRING settle time
        wheelCooldown.current = true;
        setTimeout(() => {
          wheelCooldown.current = false;
        }, 400);
      }
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [goTo, resetAutoPlay]);

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
      <motion.div className="relative" ref={containerRef} style={{ overflow: 'hidden' }} {...sectionEntry(0.3)}>
        {/* Ambient glow orb — large blurred blob behind cards, parallax-tracked */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            x: glowX,
            width: 500,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, rgba(${CYAN_RGB}, 0.15) 0%, transparent 70%)`,
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Inner glow core — tighter, brighter */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            x: glowX,
            width: 220,
            height: 140,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, rgba(${CYAN_RGB}, 0.12) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Left edge fade */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10, 8, 27, 0.95), transparent)',
          }}
          animate={{ opacity: activeIndex === 0 ? 0.4 : 1 }}
          transition={{ duration: 0.4, ease: [0.32, 0, 0.24, 1] }}
        />
        {/* Right edge fade */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(10, 8, 27, 0.95), transparent)',
          }}
          animate={{ opacity: activeIndex === TOTAL - 1 ? 0.4 : 1 }}
          transition={{ duration: 0.4, ease: [0.32, 0, 0.24, 1] }}
        />

        {/* Arrow — prev */}
        <motion.button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`
            group absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30
            w-12 h-12 sm:w-14 sm:h-14 rounded-full
            flex items-center justify-center
            border backdrop-blur-sm
            transition-all duration-200 ease-out
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF] focus-visible:outline-offset-[3px]
            ${activeIndex === 0
              ? 'bg-white/[0.03] border-white/[0.08] shadow-none pointer-events-none cursor-not-allowed'
              : 'bg-[rgba(0,212,255,0.12)] border-[rgba(0,212,255,0.35)] shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:bg-[rgba(0,212,255,0.22)] hover:border-[rgba(0,212,255,0.6)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3),0_0_60px_rgba(0,212,255,0.1)] hover:scale-[1.08] active:bg-[rgba(0,212,255,0.35)] active:scale-95 active:shadow-[0_0_15px_rgba(0,212,255,0.4)]'}
          `}
          aria-label="Previous category"
        >
          <ArrowLeft
            size={24}
            weight="bold"
            className={`transition-colors duration-200 ${
              activeIndex === 0 ? 'text-white/[0.15]' : 'text-[#00D4FF] group-hover:text-white'
            }`}
          />
        </motion.button>

        {/* Arrow — next */}
        <motion.button
          onClick={handleNext}
          disabled={activeIndex === TOTAL - 1}
          className={`
            group absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30
            w-12 h-12 sm:w-14 sm:h-14 rounded-full
            flex items-center justify-center
            border backdrop-blur-sm
            transition-all duration-200 ease-out
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF] focus-visible:outline-offset-[3px]
            ${activeIndex === TOTAL - 1
              ? 'bg-white/[0.03] border-white/[0.08] shadow-none pointer-events-none cursor-not-allowed'
              : 'bg-[rgba(0,212,255,0.12)] border-[rgba(0,212,255,0.35)] shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:bg-[rgba(0,212,255,0.22)] hover:border-[rgba(0,212,255,0.6)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3),0_0_60px_rgba(0,212,255,0.1)] hover:scale-[1.08] active:bg-[rgba(0,212,255,0.35)] active:scale-95 active:shadow-[0_0_15px_rgba(0,212,255,0.4)]'}
          `}
          aria-label="Next category"
        >
          <ArrowRight
            size={24}
            weight="bold"
            className={`transition-colors duration-200 ${
              activeIndex === TOTAL - 1 ? 'text-white/[0.15]' : 'text-[#00D4FF] group-hover:text-white'
            }`}
          />
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
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30, power: 0.3, timeConstant: 200 }}
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
    </section>
  );
}

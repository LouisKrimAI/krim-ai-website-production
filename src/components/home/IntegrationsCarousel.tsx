/**
 * INTEGRATIONS CAROUSEL
 * Futuristic horizontal-sliding integration showcase
 * Smooth drag/swipe navigation with auto-advancing categories
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { darkBackgroundLogos } from '../logos/DarkBackgroundLogos';

// ─── Integration Categories ────────────────────────────────────────────────────
// Expanded to cover the full KrimOS integration surface

const categories = [
  {
    id: 'llm-foundation',
    name: 'LLM & Foundation Models',
    description: 'Multi-model orchestration across leading providers',
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
    id: 'core-banking',
    name: 'Core Banking & Financial',
    description: 'Deep integrations with core banking infrastructure',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    borderGlow: 'blue',
    logos: [
      { name: 'Jack Henry', component: 'Jack Henry' },
      { name: 'Fiserv', component: 'Fiserv' },
      { name: 'Oracle', component: 'Oracle' },
      { name: 'FIS', component: 'FIS' },
      { name: 'Temenos', component: 'Temenos' },
    ]
  },
  {
    id: 'fintech-payments',
    name: 'Fintech & Payments',
    description: 'Payment rails and fintech platform connectivity',
    gradient: 'from-emerald-500/20 to-green-600/20',
    borderGlow: 'emerald',
    logos: [
      { name: 'Razorpay', component: 'Razorpay' },
      { name: 'Stripe', component: 'Stripe' },
      { name: 'Signzy', component: 'Signzy' },
      { name: 'HubSpot', component: 'HubSpot' },
    ]
  },
  {
    id: 'cloud-data',
    name: 'Cloud & Data Platforms',
    description: 'Enterprise cloud and data infrastructure',
    gradient: 'from-cyan-500/20 to-sky-600/20',
    borderGlow: 'cyan',
    logos: [
      { name: 'AWS', component: 'AWS' },
      { name: 'Microsoft', component: 'Microsoft' },
      { name: 'Azure', component: 'Azure' },
      { name: 'Snowflake', component: 'Snowflake' },
      { name: 'Databricks', component: 'Databricks' },
    ]
  },
  {
    id: 'communication',
    name: 'Communication & Collaboration',
    description: 'Unified messaging and real-time collaboration',
    gradient: 'from-purple-500/20 to-fuchsia-600/20',
    borderGlow: 'purple',
    logos: [
      { name: 'Slack', component: 'Slack' },
      { name: 'Zoom', component: 'Zoom' },
      { name: 'Teams', component: 'Teams' },
      { name: 'Discord', component: 'Discord' },
    ]
  },
  {
    id: 'enterprise-ai',
    name: 'Enterprise & AI Software',
    description: 'CRM, GPU compute, and AI infrastructure',
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderGlow: 'amber',
    logos: [
      { name: 'Salesforce', component: 'Salesforce' },
      { name: 'NVIDIA', component: 'NVIDIA' },
      { name: 'LiveKit', component: 'LiveKit' },
    ]
  },
  {
    id: 'grc-compliance',
    name: 'Governance, Risk & Compliance',
    description: 'Regulatory compliance and risk management platforms',
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
    name: 'Document & Knowledge',
    description: 'Enterprise content and knowledge management',
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
});

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
        relative flex-shrink-0 w-[340px] sm:w-[380px] h-[320px]
        rounded-2xl border ${border}
        bg-gradient-to-br ${category.gradient}
        backdrop-blur-xl overflow-hidden
        transition-all duration-700 ease-out
        ${isActive ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-60'}
      `}
      style={{
        boxShadow: isActive
          ? `0 0 40px ${glow}, 0 0 80px ${glow.replace('0.4', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : `inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
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
          <p className={`text-xs mt-1 ${accent} opacity-80`}>
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

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]" />
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

// ─── Carousel Navigation Dot ──────────────────────────────────────────────────
const NavDot = ({ isActive, color, onClick }: { isActive: boolean; color: string; onClick: () => void }) => {
  const glow = glowColors[color] || glowColors.cyan;
  return (
    <button
      onClick={onClick}
      className={`
        relative h-2 rounded-full transition-all duration-500 ease-out
        ${isActive ? 'w-8' : 'w-2 hover:w-3'}
      `}
      style={{
        background: isActive ? glow.replace('0.4', '1') : 'rgba(255,255,255,0.2)',
        boxShadow: isActive ? `0 0 12px ${glow}` : 'none',
      }}
    />
  );
};

// ─── Main Carousel Component ───────────────────────────────────────────────────
export default function IntegrationsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_WIDTH = 380;
  const GAP = 24;
  const TOTAL = categories.length;

  // Calculate the offset to center the active card
  const getTargetX = useCallback((index: number) => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const cardCenter = index * (CARD_WIDTH + GAP) + CARD_WIDTH / 2;
    return containerWidth / 2 - cardCenter;
  }, []);

  // Animate to a specific index
  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, index));
    setActiveIndex(clamped);
    const target = getTargetX(clamped);
    animate(x, target, {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    });
  }, [getTargetX, x, TOTAL]);

  // Initialize position
  useEffect(() => {
    const target = getTargetX(0);
    x.set(target);
  }, [getTargetX, x]);

  // Auto-advance
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current) {
        setActiveIndex(prev => {
          const next = (prev + 1) % TOTAL;
          goTo(next);
          return next;
        });
      }
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goTo, TOTAL]);

  // Reset auto-play on manual interaction
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current) {
        setActiveIndex(prev => {
          const next = (prev + 1) % TOTAL;
          goTo(next);
          return next;
        });
      }
    }, 5000);
  }, [goTo, TOTAL]);

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
      goTo(activeIndex + 1);
      resetAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      goTo(activeIndex - 1);
      resetAutoPlay();
    }
  }, [activeIndex, goTo, resetAutoPlay]);

  // Arrow button handlers
  const handlePrev = () => { goTo(activeIndex - 1); resetAutoPlay(); };
  const handleNext = () => { goTo(activeIndex + 1); resetAutoPlay(); };

  // Opacity fade on edges
  const leftFadeOpacity = useTransform(
    x,
    [getTargetX(0), getTargetX(0) - 100],
    [0, 1]
  );
  const rightFadeOpacity = useTransform(
    x,
    [getTargetX(TOTAL - 1), getTargetX(TOTAL - 1) + 100],
    [0, 1]
  );

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
        {/* Left fade edge */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10, 8, 27, 0.95), transparent)',
            opacity: leftFadeOpacity,
          }}
        />

        {/* Right fade edge */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(10, 8, 27, 0.95), transparent)',
            opacity: rightFadeOpacity,
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
          dragConstraints={{
            left: getTargetX(TOTAL - 1) - 100,
            right: getTargetX(0) + 100,
          }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => { goTo(index); resetAutoPlay(); }}
              className="flex-shrink-0"
            >
              <CategoryCard category={category} isActive={index === activeIndex} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {categories.map((cat, i) => (
          <NavDot
            key={cat.id}
            isActive={i === activeIndex}
            color={cat.borderGlow}
            onClick={() => { goTo(i); resetAutoPlay(); }}
          />
        ))}
      </div>

      {/* Category counter */}
      <div className="text-center mt-4">
        <span className="text-xs text-white/30 tracking-widest font-mono">
          {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

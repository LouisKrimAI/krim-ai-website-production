import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { getHomeCopy } from "../../content/homepage";
import { KrimAnimatedLogo } from "../KrimLogo";
import EnhancedCTA from "../atoms/EnhancedCTA";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { reduced } from "../../utils/motionPresets";
import HighlightText from "../atoms/HighlightText";
import { getHighlights } from "../../utils/highlights";

const copy = getHomeCopy().hero;
const highlightTerms = getHighlights();

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="hero-container relative min-h-screen flex items-center overflow-hidden">
      {/* BACK LAYER: Intelligence substrate overlay - Enhanced */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/[0.03] via-transparent to-krim-cyan/[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 relative z-10 mobile-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
          }}
        >
          {/* Logo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
            }}
            className="flex justify-center mb-8"
          >
            <KrimAnimatedLogo size="xl" />
          </motion.div>

          {/* HERO HEADLINE with enhanced depth glow */}
          <div className="relative mb-6">
            {/* Enhanced depth glow pseudo-element with dual layers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[140%] pointer-events-none -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-krim-mint/30 via-krim-cyan/15 to-transparent blur-[100px] opacity-30" />
              <div className="absolute inset-0 bg-gradient-radial from-krim-cyan/20 via-krim-mint/10 to-transparent blur-[100px] opacity-20" />
            </div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } }
              }}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black w-full max-w-none text-center leading-[1.15] tracking-tight mobile-h1"
              style={{ filter: 'drop-shadow(0 0 40px rgba(0,255,136,0.3))' }}
            >
              <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-mint bg-clip-text text-transparent">
                <HighlightText text={copy.headline} terms={highlightTerms} />
                <br />
                <HighlightText text={copy.headlineBreak} terms={highlightTerms} />
              </span>
            </motion.h1>
          </div>

          {/* Subheadline - Enhanced */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="text-white/85 text-base md:text-lg lg:text-xl font-medium text-center mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            <HighlightText text={copy.subline} terms={highlightTerms} />
          </motion.p>

          {/* Dual CTAs - Enhanced with Magnetic & Ripple Effects */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
            }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <Link to={copy.primaryCta.href} className="krim-cta" data-krim-cta="hero-primary">
              <EnhancedCTA
                variant="primary"
                size="lg"
                magneticEffect={true}
                glowEffect={true}
                icon={<CaretRight className="w-5 h-5" weight="bold" />}
              >
                {copy.primaryCta.label}
              </EnhancedCTA>
            </Link>
            <Link to={copy.secondaryCta.href} className="krim-cta" data-krim-cta="hero-secondary">
              <EnhancedCTA
                variant="outline"
                size="lg"
                magneticEffect={true}
                glowEffect={true}
              >
                {copy.secondaryCta.label}
              </EnhancedCTA>
            </Link>
          </motion.div>

          {/* Trusted Partnerships - Enhanced */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }
            }}
            className="w-full flex flex-col items-center"
          >
            {/* Gradient separator line */}
            <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-krim-mint/40 to-transparent mb-12" />

            <p className="text-xl md:text-2xl font-semibold text-white/70 mb-8 text-center">
              Trusted partnerships
            </p>
            <div className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-16">
              <img
                src="/partnerships/nvidia-inception.png"
                alt="NVIDIA Inception Partner"
                className="h-10 md:h-12 lg:h-14 w-auto max-w-[120px] md:max-w-[160px] object-contain transition-opacity duration-300 hover:opacity-100 opacity-90"
                loading="lazy"
              />
              <img
                src="/partnerships/aws-activate.png"
                alt="AWS Activate Partner"
                className="h-8 md:h-10 lg:h-12 w-auto max-w-[120px] md:max-w-[160px] object-contain transition-opacity duration-300 hover:opacity-100 opacity-90"
                style={{ aspectRatio: 'auto' }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

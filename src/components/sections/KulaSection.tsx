import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, getMotionVariant, reduced } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().kula;
const highlightTerms = getSectionHighlights('kula');

export default function KulaSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section id="kula" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
      </div>

      {/* 2-column layout */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={motionVariant}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white/95 mb-4">
            <HighlightText text={copy.headline} terms={highlightTerms} />
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/80 mb-8 max-w-[68ch]">
            <HighlightText text={copy.subline} terms={highlightTerms} />
          </p>

          {/* 3 bullets as inline chips */}
          <div className="flex flex-wrap gap-3">
            {copy.bullets.map((bullet) => (
              <div
                key={bullet}
                className="bg-white/[0.04] backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-sm text-white/90"
              >
                <HighlightText text={bullet} terms={highlightTerms} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Glass OS panel with typing dots animation */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={motionVariant}
        >
          {/* Glass panel */}
          <div className="relative h-[300px] md:h-[400px] rounded-[var(--krim-radius-xl)] bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] flex items-center justify-center">
            {/* Corner accent dots */}
            <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
            <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />
            <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
            <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />

            {/* Typing dots animation (3 circles) */}
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-krim-mint/70"
                animate={reduced(prefersReducedMotion, {
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }, {})}
                transition={reduced(prefersReducedMotion, {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }, {})}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-krim-mint/70"
                animate={reduced(prefersReducedMotion, {
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }, {})}
                transition={reduced(prefersReducedMotion, {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }, {})}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-krim-mint/70"
                animate={reduced(prefersReducedMotion, {
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }, {})}
                transition={reduced(prefersReducedMotion, {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }, {})}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

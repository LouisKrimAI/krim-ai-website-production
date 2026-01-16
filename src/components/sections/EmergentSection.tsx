import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().emergent;
const highlightTerms = getSectionHighlights('emergent');

export default function EmergentSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="emergent"
      title={<HighlightText text={copy.headline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background with neural mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
        {/* Neural mesh overlay - reduced opacity (10-15%) - disabled on reduced motion via CSS */}
        <div
          className="absolute inset-0 opacity-[0.12] motion-reduce:opacity-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 255, 136, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(0, 255, 136, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 70%)`,
            backgroundSize: '80% 80%',
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%'
          }}
        />
      </div>

      {/* Body lines with stagger */}
      <motion.div
        className="flex flex-col gap-6 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.06)}
      >
        {copy.body.map((line) => (
          <motion.p
            key={line}
            variants={motionVariant}
            className="text-base md:text-lg leading-relaxed text-white/85 text-center"
          >
            <HighlightText text={line} terms={highlightTerms} />
          </motion.p>
        ))}
      </motion.div>
    </Section>
  );
}

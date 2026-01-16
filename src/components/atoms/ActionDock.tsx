/**
 * KRIM AI - ACTION DOCK
 * Mobile conversion dock with Book Demo + Explore Kendra CTAs
 * Appears after 600px scroll, hides when reaching Closing section
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ActionDock() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const [isClosingSectionVisible, setIsClosingSectionVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll position detection (600px threshold)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolledEnough(scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Closing section
  useEffect(() => {
    const closingSection = document.querySelector('[data-closing-section]');
    if (!closingSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsClosingSectionVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    observer.observe(closingSection);
    return () => observer.disconnect();
  }, []);

  // Show dock when scrolled enough AND closing section is not visible
  useEffect(() => {
    setIsVisible(hasScrolledEnough && !isClosingSectionVisible);
  }, [hasScrolledEnough, isClosingSectionVisible]);

  // Animation variants (respect reduced-motion)
  const dockVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : 100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      y: prefersReducedMotion ? 0 : 100,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: 'easeIn'
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={dockVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <div className="bg-krim-deep-space/95 border-t border-white/10 shadow-xl shadow-black/50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3">
              {/* Book Demo - Primary CTA */}
              <Link to="/book-demo" className="flex-1">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-krim-mint/40 active:scale-95">
                  Book Demo
                </button>
              </Link>

              {/* Explore Kendra - Secondary CTA */}
              <a href="#krimos" className="flex-1">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-krim-cyan to-krim-purple text-white font-bold text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-krim-cyan/40 active:scale-95">
                  Explore Kendra
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

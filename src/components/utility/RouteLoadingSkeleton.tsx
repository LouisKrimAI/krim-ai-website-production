/**
 * KRIM AI - ROUTE LOADING SKELETON
 * Fade placeholder shown for <=300ms if route chunks are delayed
 */

import { motion } from 'framer-motion';

export default function RouteLoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-krim-deep-space px-6 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero skeleton */}
        <div className="mb-16 animate-pulse">
          {/* Kicker */}
          <div className="h-4 w-32 bg-white/5 rounded mb-4 mx-auto" />
          {/* Headline */}
          <div className="h-12 w-3/4 bg-white/10 rounded-lg mb-6 mx-auto" />
          <div className="h-12 w-2/3 bg-white/10 rounded-lg mb-6 mx-auto" />
          {/* Subtitle */}
          <div className="h-6 w-96 bg-white/5 rounded mx-auto mb-8" />
          {/* CTA buttons */}
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-36 bg-white/10 rounded-lg" />
            <div className="h-12 w-36 bg-white/5 rounded-lg" />
          </div>
        </div>

        {/* Content sections skeleton */}
        <div className="space-y-16 animate-pulse">
          {/* Section 1 */}
          <div>
            <div className="h-8 w-64 bg-white/10 rounded mb-4" />
            <div className="h-4 w-96 bg-white/5 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-white/5 rounded-xl" />
              <div className="h-48 bg-white/5 rounded-xl" />
              <div className="h-48 bg-white/5 rounded-xl" />
              <div className="h-48 bg-white/5 rounded-xl" />
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <div className="h-8 w-48 bg-white/10 rounded mb-4" />
            <div className="h-4 w-80 bg-white/5 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-white/5 rounded-xl" />
              <div className="h-40 bg-white/5 rounded-xl" />
              <div className="h-40 bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

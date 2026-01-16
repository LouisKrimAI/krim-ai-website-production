import React, { lazy, Suspense } from 'react';
import { ThreeJSErrorBoundary } from '../utils/safeThreeJS';

// Lazy load the heavy Three.js components
const LazyParticleField = lazy(() => 
  import('./ParticleField')
);

const LazyParticleField3D = lazy(() => 
  import('./ParticleField3D')
);

const LazyParticleUniverse = lazy(() => 
  import('./ParticleUniverse')
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5 animate-pulse" />
);

// Export lazy-loaded components with error boundaries
export const ParticleField = (props: any) => (
  <ThreeJSErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <LazyParticleField {...props} />
    </Suspense>
  </ThreeJSErrorBoundary>
);

export const ParticleField3D = (props: any) => (
  <ThreeJSErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <LazyParticleField3D {...props} />
    </Suspense>
  </ThreeJSErrorBoundary>
);

export const ParticleUniverse = (props: any) => (
  <ThreeJSErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <LazyParticleUniverse {...props} />
    </Suspense>
  </ThreeJSErrorBoundary>
);

// Preload function for critical paths
export const preloadThreeComponents = () => {
  // Only preload on desktop with good connection
  if (window.innerWidth > 1024 && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === '4g') {
      import('./ParticleField');
      import('./ParticleField3D');
      import('./ParticleUniverse');
    }
  }
};
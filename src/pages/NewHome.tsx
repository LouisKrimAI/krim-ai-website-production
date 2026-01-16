/**
 * NEW HOMEPAGE - REFACTORED FOR CHATGPT SPECIFICATIONS
 * Safe Superintelligence for Credit Operations
 * Preserves existing 3D background and performance optimizations
 */
import React, { useState, useEffect, useRef, ComponentType } from 'react'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'
import ParticleBackground from '../components/atoms/ParticleBackground'

// New Homepage Components
import HeroSection from '../components/home/HeroSection'
import PlatformSection from '../components/home/PlatformSection'
import ProblemSection from '../components/home/ProblemSection'
import ImpactSection from '../components/home/ImpactSection'
import IntegrationsSection from '../components/home/IntegrationsSection'
import SecuritySection from '../components/home/SecuritySection'
import DeploymentSection from '../components/home/DeploymentSection'
import FinalCTASection from '../components/home/FinalCTASection'

// Feature flag for layering fix (preserving existing optimization)
const KRIM_FIX_WHITEFLASH_V1 = true

// Preserved: Effect-driven 3D loader for Home page (prevents eager R3F loading)
function Dynamic3DBackground() {
  const [Wrapper, setWrapper] = useState<ComponentType<{ adaptive: boolean }> | null>(null);
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Gate 1: only after first commit
  useEffect(() => { setMounted(true); }, []);

  // Gate 2: only when in viewport, then load during idle
  useEffect(() => {
    if (!mounted || !hostRef.current) return;

    let seen = false;
    const el = hostRef.current;

    const start = () =>
      import('../components/Heavy3DWrapper')
        .then(m => setWrapper(() => m.default))
        .catch(() => { /* keep empty on failure */ });

    const load = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(start);
      } else {
        setTimeout(start, 0);
      }
    };

    const io = new IntersectionObserver((entries) => {
      if (seen) return;
      if (entries.some(e => e.isIntersecting)) {
        seen = true;
        io.disconnect();
        load();
      }
    }, {
      rootMargin: '200px',
      root: null
    });

    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`absolute inset-0 pointer-events-none ${KRIM_FIX_WHITEFLASH_V1 ? '-z-10' : ''}`}
      style={{ minHeight: 200 }}
    >
      {Wrapper ? <Wrapper adaptive /> : null}
    </div>
  );
}

export default function NewHome() {
  const mousePosition = useCursorGlow()
  const prefersReducedMotion = useReducedMotion()
  const [deviceCapability] = useState(() => getDeviceCapability())

  // SEO: Update document title and meta tags
  useEffect(() => {
    document.title = 'Krim AI – Safe Superintelligence & AI Co-Workers for Credit Operations'
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Krim AI is a governed multi-agent OS for credit operations. Automate contact center and back-office workflows across sales, retention, collections, servicing and support with safe, explainable AI co-workers.')
  }, [])

  return (
    <>

      <div className={`relative bg-krim-deep-space overflow-x-hidden ${KRIM_FIX_WHITEFLASH_V1 ? 'isolate' : ''}`}>
        
        {/* Preserved: Cursor glow effect */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
          }}
        />

        {/* Preserved: Dynamic 3D Background */}
        <Dynamic3DBackground />

        {/* Preserved: Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <ParticleBackground density="low" color="#00FF88" opacity={0.2} speed="slow" />
          <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
        </div>

        {/* Content wrapper with proper z-index layering */}
        <main id="main-content" className={KRIM_FIX_WHITEFLASH_V1 ? 'relative z-10' : ''}>
          
          {/* Hero Section */}
          <HeroSection />
          
          {/* Platform Section - 5 Tabs */}
          <PlatformSection />
          
          {/* Problem Section */}
          <ProblemSection />
          
          {/* Impact Section */}
          <ImpactSection />
          
          {/* Integrations Section */}
          <IntegrationsSection />
          
          {/* Security Section */}
          <SecuritySection />
          
          {/* Deployment Section */}
          <DeploymentSection />
          
          {/* Final CTA Section */}
          <FinalCTASection />
          
        </main>
      </div>
    </>
  )
}
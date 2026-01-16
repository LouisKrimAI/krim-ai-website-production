/**
 * Heavy3DWrapper - Effect-driven 3D loader (no React.lazy in render)
 * Only loads 3D after first mount + viewport intersection
 */
import { useEffect, useRef, useState, type ComponentType } from 'react';

interface Heavy3DWrapperProps {
  adaptive?: boolean;
}

export default function Heavy3DWrapper({ adaptive = false }: Heavy3DWrapperProps) {
  const [Mod, setMod] = useState<ComponentType<Heavy3DWrapperProps> | null>(null);
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Gate 1: only after first commit
  useEffect(() => { setMounted(true); }, []);

  // Gate 2: only when the wrapper is (near) viewport, then load during idle
  useEffect(() => {
    if (!mounted || !hostRef.current) return;

    let seen = false;
    const el = hostRef.current;

    const start = () =>
      import(/* chunkName: "particle-universe" */ './ParticleUniverse')
        .then(m => setMod(() => m.default))
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
    }, { rootMargin: '200px' });

    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <div ref={hostRef} aria-label="Interactive 3D" className="absolute inset-0" style={{ minHeight: 200 }}>
      {Mod ? <Mod adaptive={adaptive} /> : (
        // Lightweight poster/placeholder until 3D mounts
        <div className="absolute inset-0">
          <picture>
            <source srcSet="/agent-workforce-grid.avif" type="image/avif" />
            <source srcSet="/agent-workforce-grid.webp" type="image/webp" />
            <img
              src="/agent-workforce-grid-optimized.jpg"
              alt="Krim AI agent workforce visualization background"
              width={1536}
              height={1024}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.05,
                pointerEvents: 'none'
              }}
            />
          </picture>
        </div>
      )}
    </div>
  );
}
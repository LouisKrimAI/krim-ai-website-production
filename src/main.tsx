import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import './styles/globals.css'
import './styles/fonts.css'
import './styles/mobile-typography.css'
import './styles/starfield-integration.css'

// CRITICAL: Suppress ALL console output in production before any other imports
import { suppressConsoleInProduction } from './utils/consoleSuppression'
import HomePage from './pages/HomePage'
import HomePageBrand from './pages/HomePageBrand'
import NotFound from './pages/NotFound'
import VerifyEmail from './pages/VerifyEmail'

// Core navigation pages - Direct imports for instant loading
import Platform from './pages/Platform'
import Contact from './pages/Contact'
import Kula from './pages/Kula'
import Karta from './pages/Karta'
import Kriya from './pages/Kriya'
import Kupa from './pages/Kupa'
import SafeSuperintelligence from './pages/SafeSuperintelligence'
import Banking from './pages/domains/Banking'
import Government from './pages/domains/Government'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Lazy load ParticleUniverse for global background
import { lazy, Suspense } from 'react'
const ParticleUniverse = lazy(() => import('./components/ParticleUniverse'))

// Import Cookie Consent System
import { CookieConsentProvider } from './contexts/CookieConsentContext'
import ConditionalAnalytics from './components/ConditionalAnalytics'
import CookieConsent from './components/CookieConsent'
import CookiePreferencesModal from './components/CookiePreferences'


// Import new performance monitoring and lazy loading
import { LazyComponents, useRoutePreloading } from './components/Performance/LazyComponents'
import WebVitalsReporter from './components/Performance/WebVitalsReporter'
// NOTE: performance utilities lazy loaded below to reduce main bundle size
// import { initializeCriticalResourceLoading } from './utils/criticalResourceLoader' // Disabled due to missing files

function Layout() {
  // Initialize route preloading
  useRoutePreloading()
  const { pathname } = useLocation()
  // /homepage-alt keeps the legacy futuristic chassis (particle universe, mint).
  // The rest of the site uses the canonical brand chassis (flat indigo).
  const isAlt = pathname === '/homepage-alt'

  return (
    <div className={`min-h-screen flex flex-col relative bg-krim-indigo ${isAlt ? '' : 'brand-canon'}`}>
      {/* Legacy starfield background — only retained on the alternative homepage */}
      {isAlt && (
        <Suspense fallback={<div className="fixed inset-0" style={{ zIndex: -1 }} />}>
          <ParticleUniverse adaptive />
        </Suspense>
      )}

      {/* Content wrapper with proper z-index */}
      <div className="flex flex-col min-h-screen relative" style={{ zIndex: 10 }}>
        <a
          href="#main-content"
          className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-lg font-semibold focus:shadow-lg focus:outline-none transition-all ${
            isAlt
              ? 'focus:bg-krim-mint focus:text-krim-deep-space focus:ring-2 focus:ring-krim-cyan'
              : 'focus:bg-krim-ochre focus:text-krim-indigo focus:ring-2 focus:ring-krim-ochre'
          }`}
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        <ScrollToTop />

        <Header/>
        <main id="main-content" className="flex-1 bg-transparent" role="main">
          <Outlet />
        </main>
        <Footer/>

        {/* Cookie Consent System */}
        <CookieConsent />
        <CookiePreferencesModal />

        {/* Conditional Analytics - only loads with consent */}
        <ConditionalAnalytics />

        {/* Web Vitals Performance Monitoring */}
        <WebVitalsReporter />
      </div>
    </div>
  )
}

// Use lazy loaded components for better performance
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // New canonical brand homepage (Mithila, 4 pillars, Krim-Nyaya, AI Co-Workers)
      { path: '/', element: <HomePageBrand/> },
      // Alternative — legacy mint visual identity preserved for side-by-side comparison
      { path: '/homepage-alt', element: <HomePage/> },

      // Core navigation pages - Instant loading (no lazy loading)
      { path: '/kendra', element: <Platform /> },
      { path: '/contact', element: <Contact /> },
      { path: '/kula', element: <Kula /> },
      { path: '/karta', element: <Karta /> },
      { path: '/kriya', element: <Kriya /> },
      { path: '/kupa', element: <Kupa /> },
      { path: '/safe-superintelligence', element: <SafeSuperintelligence /> },
      { path: '/banking', element: <Banking /> },
      { path: '/government', element: <Government /> },
      
      // Legal pages - Keep lazy loading with seamless fallbacks
      { path: '/legal', element: <LazyComponents.PrivacyPage /> }, // Default legal page
      { path: '/legal/privacy', element: <LazyComponents.PrivacyPage /> },
      { path: '/legal/terms', element: <LazyComponents.TermsPage /> },
      { path: '/legal/security', element: <LazyComponents.SecurityPage /> },
      { path: '/verify-email', element: <VerifyEmail /> },
      { path: '*', element: <NotFound /> } // 404 catch-all route
    ]
  }
])

// Performance initialization
if (typeof window !== 'undefined') {
  // Start performance monitoring
  performance.mark('app-start')

  // Preload secondary routes for improved performance
  // Core nav pages are now directly imported, only preload secondary pages
  const preloadSecondaryRoutes = () => {
    setTimeout(() => {
      // Only preload pages that are still lazy-loaded
      import('./pages/legal/Privacy').catch(() => {})
    }, 2000) // Wait longer since these are lower priority
  }
  
  // Call preload after initial render
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadSecondaryRoutes)
  } else {
    setTimeout(preloadSecondaryRoutes, 3000)
  }

  // LCP Element Probe - Development Only
  if (import.meta.env.DEV && 'PerformanceObserver' in window) {
    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcpEntry = entry as PerformanceEventTiming & { element?: Element; url?: string };
          const el = lcpEntry.element;
          if (el && import.meta.env.DEV) {
            // Helpful breadcrumbs for development
            // eslint-disable-next-line no-console
            console.log('[LCP]', {
              tag: el.tagName,
              id: el.id,
              class: el.className,
              text: el.textContent?.slice(0, 80),
              url: lcpEntry.url
            });
          }
        }
      });
      // Largest Contentful Paint entries
      po.observe({ type: 'largest-contentful-paint', buffered: true } as PerformanceObserverInit);
    } catch {
      // LCP probe setup failed - continue silently
    }
  }

  // Lazy load performance utilities to reduce main bundle size
  const loadPerformanceUtils = async () => {
    const { prefetchCriticalResources, trackWebVitals, checkBundleSize } = await import('./utils/performance')

    // Initialize performance utilities
    prefetchCriticalResources()

    // Defer non-critical analytics until idle
    const idleFn = 'requestIdleCallback' in window
      ? window.requestIdleCallback
      : (cb: IdleRequestCallback) => setTimeout(cb, 800)

    idleFn(async () => {
      trackWebVitals()

      // Lazy load service worker - DISABLED IN DEV TO FIX RELOAD ISSUE
      if (import.meta.env.PROD) {
        const { registerServiceWorker } = await import('./utils/serviceWorker')
        registerServiceWorker()
      }
    })

    // Check bundle size in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(checkBundleSize, 1000)
    }
  }

  // Load performance utilities after initial render
  loadPerformanceUtils()
}

// Initialize global console suppression for production
suppressConsoleInProduction()

const root = createRoot(document.getElementById('root')!)
root.render(
  <CookieConsentProvider>
    <RouterProvider router={router} />
  </CookieConsentProvider>
)

// Mark app as rendered
if (typeof window !== 'undefined') {
  performance.mark('app-rendered')
  performance.measure('app-initialization', 'app-start', 'app-rendered')
}

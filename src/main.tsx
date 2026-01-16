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
import HookProbe from './pages/HookProbe'
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

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Z0: Particle Universe Background - 3D GPU-accelerated particles */}
      <Suspense fallback={<div className="fixed inset-0" style={{ zIndex: -1 }} />}>
        <ParticleUniverse adaptive />
      </Suspense>

      {/* Content wrapper with proper z-index */}
      <div className="flex flex-col min-h-screen relative" style={{ zIndex: 10 }}>
        {/* Skip to main content link - accessibility enhancement for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-krim-mint focus:text-krim-deep-space focus:rounded-lg font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-krim-cyan transition-all"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* Scroll to top on route change */}
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
      { path: '/', element: <HomePage/> },
      { path: '/homepage-new', element: <LazyComponents.HomePageNew /> },
      { path: '/homepage-fixed', element: <LazyComponents.HomePageNewFixed /> },
      
      // Core navigation pages - Instant loading (no lazy loading)
      { path: '/kendra', element: <Platform /> },
      { path: '/contact', element: <Contact /> },
      { path: '/kula', element: <Kula /> },
      { path: '/karta', element: <Karta /> },
      { path: '/kriya', element: <Kriya /> },
      { path: '/kupa', element: <Kupa /> },
      { path: '/safe-superintelligence', element: <SafeSuperintelligence /> },
      
      // Secondary pages - Keep lazy loading with seamless fallbacks
      { path: '/agents', element: <LazyComponents.AgentsPage /> },
      { path: '/agents/:id', element: <LazyComponents.AgentDetailPage /> },
      { path: '/case-studies', element: <LazyComponents.CaseStudiesPage /> },
      { path: '/news', element: <LazyComponents.NewsPage /> },
      { path: '/pricing', element: <LazyComponents.PricingPage /> },
      { path: '/legal', element: <LazyComponents.PrivacyPage /> }, // Default legal page
      { path: '/legal/privacy', element: <LazyComponents.PrivacyPage /> },
      { path: '/legal/terms', element: <LazyComponents.TermsPage /> },
      { path: '/legal/security', element: <LazyComponents.SecurityPage /> },
      { path: '/verify-email', element: <VerifyEmail /> },
      { path: '/hookprobe', element: <HookProbe /> },
      { path: '/text-readability-test', element: <LazyComponents.TextReadabilityTestPage /> },
      // { path: '/about', element: <LazyComponents.AboutPage /> }, // Hidden for now
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
      import('./pages/Agents').catch(() => {})
      import('./pages/Pricing').catch(() => {})
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

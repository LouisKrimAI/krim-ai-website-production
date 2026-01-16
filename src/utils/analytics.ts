/**
 * KRIM AI - MINIMAL PRIVACY-SAFE ANALYTICS
 * Tracks core user interactions without external libraries
 */

export function track(event: string, payload: Record<string, any> = {}) {
  try {
    const body = JSON.stringify({
      event,
      payload,
      path: location.pathname,
      ts: Date.now()
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/analytics', new Blob([body], { type: 'application/json' }));
    } else {
      console.info('[analytics]', event, payload);
    }
  } catch (e) {
    console.warn('[analytics-failed]', e);
  }
}

// Helper for CTA click tracking
export function trackCtaClick(element: HTMLElement) {
  const id = element.getAttribute('data-krim-cta') || 'unknown';
  track('cta_click', { id });
}

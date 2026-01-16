/**
 * Runtime error logger - sends errors via beacon or console
 * Used by ErrorBoundary to track application errors
 */
export function rlog(error: unknown, info?: any) {
  try {
    const payload = {
      error: String(error),
      info,
      path: location.pathname,
      ts: Date.now()
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/analytics',
        new Blob([JSON.stringify({ event: 'app_error', payload })], { type: 'application/json' })
      );
    } else {
      console.error('[app_error]', payload);
    }
  } catch (e) {
    /* swallow */
  }
}

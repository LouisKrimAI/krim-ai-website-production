/**
 * Ensures canonical URL and meta description are present in <head>
 * Safe to call on every route change
 */
export function ensureCanonicalAndDescription(desc?: string) {
  try {
    const head = document.head;

    // Canonical
    let canon = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      head.appendChild(canon);
    }
    const url = location.origin + location.pathname;
    canon.setAttribute('href', url);

    // Description (fallback safe)
    let metaDesc = head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc?.slice(0, 300) || 'Kendra — Emergent Intelligence for Credit Operations.');
  } catch (e) {
    /* no-op */
  }
}

/**
 * backdropReady — a tiny cross-tree signal so a cluster's page text can wait for
 * its fixed background to actually render.
 *
 * The backdrop components (PlatformBackdrop, ResearchBackdrop) live in a different
 * part of the tree from the page <main>. When a backdrop's image has loaded they
 * call markBackdropReady(cluster); BackdropGate listens and reveals the text. A
 * full page load re-initialises this module (re-gates); in-site navigation keeps
 * it (a cached backdrop reveals text instantly).
 */

export type Cluster = 'platform' | 'research'

const ready: Record<string, boolean> = {}
const subs: Record<string, Set<() => void>> = {}

export function markBackdropReady(cluster: Cluster): void {
  if (ready[cluster]) return
  ready[cluster] = true
  subs[cluster]?.forEach((fn) => fn())
}

export function isBackdropReady(cluster: Cluster): boolean {
  return !!ready[cluster]
}

export function subscribeBackdropReady(cluster: Cluster, fn: () => void): () => void {
  let set = subs[cluster]
  if (!set) { set = new Set(); subs[cluster] = set }
  set.add(fn)
  return () => { set!.delete(fn) }
}

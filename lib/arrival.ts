/**
 * Arrival gate — shared by the homepage hero choreography (HomeHero) and the
 * woven ring backdrop (WovenRingBackdrop) so the two can never fall out of sync.
 *
 * The full arrival motion (ring morph → logo → typed headline → CTAs) plays only
 * on a FRESH document load — a cold visit or a refresh — and only when the page
 * being loaded is the homepage. Any in-site navigation to the homepage shows the
 * settled hero and ring already in place, with no replay.
 *
 * Mechanism: a module-level flag. A full page load re-initialises this module, so
 * `booted` starts false again (→ the motion plays). It is flipped to true once,
 * just after the first paint (see components/ArrivalBoot), so it is only ever
 * `false` during the initial render pass of the first page loaded. In-site
 * navigation does not reload the module, so subsequent mounts read `true`.
 */

let booted = false

/** True only during the initial document load, before any in-site navigation. */
export function isFreshArrival(): boolean {
  return !booted
}

/** Closes the arrival window. Called once, just after the first paint. */
export function markBooted(): void {
  booted = true
}

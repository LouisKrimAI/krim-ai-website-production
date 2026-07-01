/**
 * Legacy import path for insight image metadata.
 *
 * The single generated source of truth is now lib/image-manifest.ts (produced by
 * scripts/optimize_images.py, covering every optimised site image — cinematic art
 * AND the pre-shrunk harness heroes). This file just re-exports it so existing
 * `@/lib/cinematic-images` imports keep working.
 */

export { IMAGE_MANIFEST, CINEMATIC } from './image-manifest'
export type { ImageMeta, ImageMeta as CinematicMeta } from './image-manifest'

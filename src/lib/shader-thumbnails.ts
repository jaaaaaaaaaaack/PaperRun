import type { ShaderKey } from '../shaders'

/**
 * Shader keys that have thumbnail images available
 */
export const SHADERS_WITH_THUMBNAILS: ShaderKey[] = [
  'mesh-gradient',
  'static-mesh-gradient',
  'static-radial-gradient',
  'grain-gradient',
  'color-panels',
  'simplex-noise',
  'perlin-noise',
  'neuro-noise',
  'voronoi',
  'metaballs',
  'warp',
  'swirl',
  'dot-orbit',
  'dot-grid',
  'waves',
  'spiral',
  'smoke-ring',
  'god-rays',
  'water',
  'liquid-metal',
  'image-dithering',
  'halftone-dots',
  'halftone-cmyk',
  'paper-texture',
  'fluted-glass',
  'pulsing-border',
  'heatmap',
  'dithering',
]

/**
 * Shader keys that have animated thumbnails (videos)
 * These will show a video on hover
 */
export const ANIMATED_SHADERS: ShaderKey[] = [
  // Currently no animated thumbnails available
  // Add shader keys here when video thumbnails are added
]

/**
 * Shaders without thumbnails (will need fallback)
 * Currently all shaders have thumbnails available
 */
export const SHADERS_WITHOUT_THUMBNAILS: ShaderKey[] = []

/**
 * Check if a shader has a thumbnail available
 */
export function hasThumbnail(shaderKey: ShaderKey): boolean {
  return SHADERS_WITH_THUMBNAILS.includes(shaderKey)
}

/**
 * Check if a shader has an animated thumbnail
 */
export function hasAnimation(shaderKey: ShaderKey): boolean {
  return ANIMATED_SHADERS.includes(shaderKey)
}

/**
 * Get the thumbnail URL for a shader
 * Returns null if no thumbnail is available
 */
export function getThumbnailUrl(shaderKey: ShaderKey): string | null {
  if (!hasThumbnail(shaderKey)) {
    return null
  }
  return `/shader-thumbnails/${shaderKey}.webp`
}

/**
 * Get the video thumbnail URL for a shader
 * Returns null if no animated thumbnail is available
 */
export function getVideoUrl(shaderKey: ShaderKey): string | null {
  if (!hasAnimation(shaderKey)) {
    return null
  }
  return `/shader-thumbnails/${shaderKey}.mp4`
}

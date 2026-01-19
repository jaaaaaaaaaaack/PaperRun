import type { ShaderKey } from '../shaders'

const shaderNames: Record<ShaderKey, string> = {
    'mesh-gradient': 'MeshGradient',
    'static-mesh-gradient': 'StaticMeshGradient',
    'static-radial-gradient': 'StaticRadialGradient',
    'grain-gradient': 'GrainGradient',
    'color-panels': 'ColorPanels',
    'simplex-noise': 'SimplexNoise',
    'perlin-noise': 'PerlinNoise',
    'neuro-noise': 'NeuroNoise',
    'voronoi': 'Voronoi',
    'metaballs': 'Metaballs',
    'warp': 'Warp',
    'swirl': 'Swirl',
    'dot-orbit': 'DotOrbit',
    'dot-grid': 'DotGrid',
    'waves': 'Waves',
    'spiral': 'Spiral',
    'smoke-ring': 'SmokeRing',
    'god-rays': 'GodRays',
    'water': 'Water',
    'liquid-metal': 'LiquidMetal',
    'image-dithering': 'ImageDithering',
    'halftone-dots': 'HalftoneDots',
    'halftone-cmyk': 'HalftoneCMYK',
    'paper-texture': 'PaperTexture',
    'fluted-glass': 'FlutedGlass',
    'pulsing-border': 'PulsingBorder',
    'heatmap': 'Heatmap',
    'dithering': 'Dithering',
}

export function generateReactCode(shader: ShaderKey, values: Record<string, unknown>): string {
    const name = shaderNames[shader]
    const props = Object.entries(values)
        .map(([key, val]) => {
            if (val === undefined || val === null) return ''
            if (Array.isArray(val) || typeof val === 'object') {
                return `  ${key}={${JSON.stringify(val)}}`
            }
            if (typeof val === 'string') {
                // Use braces and JSON.stringify to handle quotes and escaping safely
                return `  ${key}={${JSON.stringify(val)}}`
            }
            return `  ${key}={${val}}`
        })
        .filter(Boolean)
        .join('\n')

    return `<${name}\n${props}\n/>`
}

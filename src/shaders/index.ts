import { meshGradientConfig } from './mesh-gradient'
import { heatmapConfig } from './heatmap'
import { ditheringConfig } from './dithering'
import { staticMeshGradientConfig } from './static-mesh-gradient'
import { staticRadialGradientConfig } from './static-radial-gradient'
import { grainGradientConfig } from './grain-gradient'
import { colorPanelsConfig } from './color-panels'
import { simplexNoiseConfig } from './simplex-noise'
import { perlinNoiseConfig } from './perlin-noise'
import { neuroNoiseConfig } from './neuro-noise'
import { voronoiConfig } from './voronoi'
import { metaballsConfig } from './metaballs'
import { warpConfig } from './warp'
import { swirlConfig } from './swirl'
import { dotOrbitConfig } from './dot-orbit'
import { dotGridConfig } from './dot-grid'
import { wavesConfig } from './waves'
import { spiralConfig } from './spiral'
import { smokeRingConfig } from './smoke-ring'
import { godRaysConfig } from './god-rays'
import { waterConfig } from './water'
import { liquidMetalConfig } from './liquid-metal'
import { imageDitheringConfig } from './image-dithering'
import { halftoneDotsConfig } from './halftone-dots'
import { halftoneCMYKConfig } from './halftone-cmyk'
import { paperTextureConfig } from './paper-texture'
import { flutedGlassConfig } from './fluted-glass'
import { pulsingBorderConfig } from './pulsing-border'

export const shaders = {
    'mesh-gradient': meshGradientConfig,
    'static-mesh-gradient': staticMeshGradientConfig,
    'static-radial-gradient': staticRadialGradientConfig,
    'grain-gradient': grainGradientConfig,
    'color-panels': colorPanelsConfig,
    'simplex-noise': simplexNoiseConfig,
    'perlin-noise': perlinNoiseConfig,
    'neuro-noise': neuroNoiseConfig,
    'voronoi': voronoiConfig,
    'metaballs': metaballsConfig,
    'warp': warpConfig,
    'swirl': swirlConfig,
    'dot-orbit': dotOrbitConfig,
    'dot-grid': dotGridConfig,
    'waves': wavesConfig,
    'spiral': spiralConfig,
    'smoke-ring': smokeRingConfig,
    'god-rays': godRaysConfig,
    'water': waterConfig,
    'liquid-metal': liquidMetalConfig,
    'image-dithering': imageDitheringConfig,
    'halftone-dots': halftoneDotsConfig,
    'halftone-cmyk': halftoneCMYKConfig,
    'paper-texture': paperTextureConfig,
    'fluted-glass': flutedGlassConfig,
    'pulsing-border': pulsingBorderConfig,
    'heatmap': heatmapConfig,
    'dithering': ditheringConfig,
} as const

export type ShaderKey = keyof typeof shaders

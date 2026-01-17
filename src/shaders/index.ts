import { meshGradientConfig } from './mesh-gradient'
import { heatmapConfig } from './heatmap'
import { ditheringConfig } from './dithering'

export const shaders = {
    'mesh-gradient': meshGradientConfig,
    'heatmap': heatmapConfig,
    'dithering': ditheringConfig,
} as const

export type ShaderKey = keyof typeof shaders

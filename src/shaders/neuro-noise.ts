import { NeuroNoise } from '@paper-design/shaders-react'

export const neuroNoiseConfig = {
    component: NeuroNoise,
    schema: {
        colorFront: { value: '#ffffff' },
        colorMid: { value: '#47a6ff' },
        colorBack: { value: '#000000' },
        brightness: { value: 0.05, min: 0, max: 1, step: 0.01 },
        contrast: { value: 0.3, min: 0, max: 1, step: 0.01 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
    },
}

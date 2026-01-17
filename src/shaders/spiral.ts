import { Spiral } from '@paper-design/shaders-react'

export const spiralConfig = {
    component: Spiral,
    schema: {
        colorBack: { value: '#001429' },
        colorFront: { value: '#7ad1ff' },
        density: { value: 1, min: 0, max: 5, step: 0.1 },
        distortion: { value: 0, min: 0, max: 2, step: 0.01 },
        strokeWidth: { value: 0.5, min: 0, max: 5, step: 0.01 },
        strokeTaper: { value: 0, min: 0, max: 2, step: 0.01 },
        strokeCap: { value: 0, min: 0, max: 1, step: 0.01 },
        noise: { value: 0, min: 0, max: 1, step: 0.01 },
        noiseFrequency: { value: 0, min: 0, max: 1, step: 0.01 },
        softness: { value: 0, min: 0, max: 1, step: 0.01 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
    },
}

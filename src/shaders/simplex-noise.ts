import { SimplexNoise } from '@paper-design/shaders-react'

export const simplexNoiseConfig = {
    component: SimplexNoise,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#FFC391", "#E491FF", "#6270C8", "#133B94"],
        },
        stepsPerColor: { value: 2, min: 1, max: 10, step: 1 },
        softness: { value: 0, min: 0, max: 1, step: 0.01 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
    },
}

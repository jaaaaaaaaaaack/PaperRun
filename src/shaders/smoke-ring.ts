import { SmokeRing } from '@paper-design/shaders-react'

export const smokeRingConfig = {
    component: SmokeRing,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333"],
        },
        colorBack: { value: '#000000' },
        noiseScale: { value: 3, min: 0, max: 10, step: 0.1 },
        noiseIterations: { value: 8, min: 1, max: 10, step: 1 },
        radius: { value: 0.25, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0.65, min: 0, max: 1, step: 0.01 },
        innerShape: { value: 0.7, min: 0, max: 2, step: 0.01 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
    },
}

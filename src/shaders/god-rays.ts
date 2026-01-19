import { GodRays } from '@paper-design/shaders-react'

export const godRaysConfig = {
    component: GodRays,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#FFC391", "#E491FF", "#6270C8", "#133B94"],
        },
        colorBack: { value: '#000000' },
        colorBloom: { value: '#0000ff' },
        bloom: { value: 0.4, min: 0, max: 1, step: 0.01 },
        intensity: { value: 0.8, min: 0, max: 1, step: 0.01 },
        density: { value: 0.3, min: 0, max: 1, step: 0.01 },
        spotty: { value: 0.3, min: 0, max: 1, step: 0.01 },
        midSize: { value: 0.2, min: 0, max: 1, step: 0.01 },
        midIntensity: { value: 0.4, min: 0, max: 1, step: 0.01 },
        speed: { value: 0.75, min: 0, max: 5, step: 0.1 },
        offsetY: { value: -0.55, min: -1, max: 1, step: 0.01 },
    },
}

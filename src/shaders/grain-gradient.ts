import { GrainGradient } from '@paper-design/shaders-react'

export const grainGradientConfig = {
    component: GrainGradient,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#FFC391", "#E491FF", "#6270C8", "#133B94"],
        },
        colorBack: { value: '#000000' },
        softness: { value: 0.5, min: 0, max: 1, step: 0.01 },
        intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
        noise: { value: 0.25, min: 0, max: 1, step: 0.01 },
        shape: { value: 'corners', options: ['wave', 'dots', 'truchet', 'corners', 'ripple', 'blob', 'sphere'] },
        speed: { value: 1, min: 0, max: 10, step: 0.1 },
    },
}

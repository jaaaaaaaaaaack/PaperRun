import { Swirl } from '@paper-design/shaders-react'

export const swirlConfig = {
    component: Swirl,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33"],
        },
        colorBack: { value: '#330000' },
        bandCount: { value: 4, min: 1, max: 20, step: 1 },
        twist: { value: 0.1, min: 0, max: 1, step: 0.01 },
        center: { value: 0.2, min: 0, max: 1, step: 0.01 },
        proportion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        softness: { value: 0, min: 0, max: 1, step: 0.01 },
        noise: { value: 0.2, min: 0, max: 1, step: 0.01 },
        noiseFrequency: { value: 0.4, min: 0, max: 1, step: 0.01 },
        speed: { value: 0.32, min: 0, max: 5, step: 0.01 },
    },
}

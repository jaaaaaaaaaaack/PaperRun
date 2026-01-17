import { StaticRadialGradient } from '@paper-design/shaders-react'

export const staticRadialGradientConfig = {
    component: StaticRadialGradient,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33"],
        },
        colorBack: { value: '#000000' },
        radius: { value: 0.8, min: 0, max: 2, step: 0.01 },
        focalDistance: { value: 0.99, min: 0, max: 2, step: 0.01 },
        focalAngle: { value: 0, min: 0, max: 360, step: 1 },
        falloff: { value: 0.24, min: 0, max: 1, step: 0.01 },
        mixing: { value: 0.5, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0, min: 0, max: 1, step: 0.01 },
        distortionShift: { value: 0, min: 0, max: 1, step: 0.01 },
        distortionFreq: { value: 12, min: 0, max: 20, step: 0.1 },
        grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
    },
}

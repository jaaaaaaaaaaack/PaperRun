import { StaticMeshGradient } from '@paper-design/shaders-react'

export const staticMeshGradientConfig = {
    component: StaticMeshGradient,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33", "#33cc33"],
        },
        positions: { value: 2, min: 1, max: 10, step: 0.1 },
        waveX: { value: 1, min: 0, max: 2, step: 0.01 },
        waveXShift: { value: 0.6, min: 0, max: 1, step: 0.01 },
        waveY: { value: 1, min: 0, max: 2, step: 0.01 },
        waveYShift: { value: 0.21, min: 0, max: 1, step: 0.01 },
        mixing: { value: 0.93, min: 0, max: 1, step: 0.01 },
        grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
        rotation: { value: 270, min: 0, max: 360, step: 1 },
    },
}

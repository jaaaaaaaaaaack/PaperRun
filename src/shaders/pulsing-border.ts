import { PulsingBorder } from '@paper-design/shaders-react'

export const pulsingBorderConfig = {
    component: PulsingBorder,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33"],
        },
        colorBack: { value: '#000000' },
        roundness: { value: 0.25, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        softness: { value: 0.75, min: 0, max: 1, step: 0.01 },
        aspectRatio: { value: 'auto', options: ['auto', 'square'] },
        intensity: { value: 0.2, min: 0, max: 1, step: 0.01 },
        bloom: { value: 0.25, min: 0, max: 1, step: 0.01 },
        spots: { value: 4, min: 1, max: 10, step: 1 },
        spotSize: { value: 0.5, min: 0, max: 2, step: 0.01 },
        pulse: { value: 0.25, min: 0, max: 1, step: 0.01 },
        smoke: { value: 0.3, min: 0, max: 1, step: 0.01 },
        smokeSize: { value: 0.6, min: 0, max: 2, step: 0.01 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
        marginLeft: { value: 0, min: 0, max: 1, step: 0.01 },
        marginRight: { value: 0, min: 0, max: 1, step: 0.01 },
        marginTop: { value: 0, min: 0, max: 1, step: 0.01 },
        marginBottom: { value: 0, min: 0, max: 1, step: 0.01 },
    },
}

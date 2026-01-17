import { MeshGradient } from '@paper-design/shaders-react'

export const meshGradientConfig = {
    component: MeshGradient,
    schema: {
        colors: {
            value: ['#cc3333', '#cc9933', '#99cc33', '#33cc33'],
        },
        distortion: { value: 0.8, min: 0, max: 1, step: 0.01 },
        swirl: { value: 0.1, min: 0, max: 1, step: 0.01 },
        speed: { value: 1, min: 0, max: 2, step: 0.1 },
        grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
    },
}

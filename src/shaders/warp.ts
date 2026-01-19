import { Warp } from '@paper-design/shaders-react'

export const warpConfig = {
    component: Warp,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#FFC391", "#E491FF", "#6270C8", "#133B94"],
        },
        proportion: { value: 0.45, min: 0, max: 1, step: 0.01 },
        softness: { value: 1, min: 0, max: 2, step: 0.01 }, // range assumption, usually 0-1 but example says 1
        distortion: { value: 0.25, min: 0, max: 1, step: 0.01 },
        swirl: { value: 0.8, min: 0, max: 1, step: 0.01 },
        swirlIterations: { value: 10, min: 0, max: 20, step: 1 },
        shape: { value: 'checks', options: ['checks', 'stripes', 'edge'] },
        shapeScale: { value: 0.1, min: 0, max: 1, step: 0.01 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
    },
}

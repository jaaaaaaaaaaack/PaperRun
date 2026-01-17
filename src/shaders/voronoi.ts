import { Voronoi } from '@paper-design/shaders-react'

export const voronoiConfig = {
    component: Voronoi,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933"],
        },
        colorGlow: { value: '#ffffff' },
        colorGap: { value: '#2e0000' },
        stepsPerColor: { value: 3, min: 1, max: 10, step: 1 },
        distortion: { value: 0.4, min: 0, max: 1, step: 0.01 },
        gap: { value: 0.04, min: 0, max: 0.2, step: 0.001 },
        glow: { value: 0, min: 0, max: 1, step: 0.01 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.5, min: 0, max: 2, step: 0.01 },
    },
}

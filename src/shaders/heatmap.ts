import { Heatmap } from '@paper-design/shaders-react'

export const heatmapConfig = {
    component: Heatmap,
    schema: {
        image: { value: 'https://shaders.paper.design/images/logos/diamond.svg' },
        colors: {
            value: ['#FFC391', '#E491FF', '#6270C8', '#133B94'],
        },
        colorBack: { value: '#000000' },
        contour: { value: 0.5, min: 0, max: 1, step: 0.01 },
        angle: { value: 0, min: 0, max: 360, step: 1 },
        noise: { value: 0, min: 0, max: 1, step: 0.01 },
        innerGlow: { value: 0.5, min: 0, max: 1, step: 0.01 },
        outerGlow: { value: 0.5, min: 0, max: 1, step: 0.01 },
        speed: { value: 1, min: 0, max: 2, step: 0.1 },
        scale: { value: 0.75, min: 0.1, max: 2, step: 0.05 },
    },
}

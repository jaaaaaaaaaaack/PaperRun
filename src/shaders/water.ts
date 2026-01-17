import { Water } from '@paper-design/shaders-react'

export const waterConfig = {
    component: Water,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#8f8f8f' },
        colorHighlight: { value: '#ffffff' },
        highlights: { value: 0.07, min: 0, max: 1, step: 0.01 },
        layering: { value: 0.5, min: 0, max: 1, step: 0.01 },
        edges: { value: 0.8, min: 0, max: 1, step: 0.01 },
        waves: { value: 0.3, min: 0, max: 1, step: 0.01 },
        caustic: { value: 0.1, min: 0, max: 1, step: 0.01 },
        size: { value: 1, min: 0, max: 5, step: 0.1 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.8, min: 0, max: 2, step: 0.01 },
    },
}

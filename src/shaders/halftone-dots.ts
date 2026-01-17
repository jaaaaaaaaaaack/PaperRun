import { HalftoneDots } from '@paper-design/shaders-react'

export const halftoneDotsConfig = {
    component: HalftoneDots,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#f2f1e8' },
        colorFront: { value: '#2b2b2b' },
        originalColors: { value: false },
        type: { value: 'gooey', options: ['classic', 'gooey', 'holes', 'soft'] },
        grid: { value: 'hex', options: ['square', 'hex'] },
        inverted: { value: false },
        size: { value: 0.5, min: 0, max: 2, step: 0.01 },
        radius: { value: 1.25, min: 0, max: 5, step: 0.01 },
        contrast: { value: 0.4, min: 0, max: 1, step: 0.01 },
        grainMixer: { value: 0.2, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0.2, min: 0, max: 1, step: 0.01 },
        grainSize: { value: 0.5, min: 0, max: 2, step: 0.01 },
    },
}

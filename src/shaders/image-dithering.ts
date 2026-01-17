import { ImageDithering } from '@paper-design/shaders-react'

export const imageDitheringConfig = {
    component: ImageDithering,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#000c38' },
        colorFront: { value: '#94ffaf' },
        colorHighlight: { value: '#eaff94' },
        originalColors: { value: false },
        type: { value: '8x8', options: ['random', '2x2', '4x4', '8x8'] },
        size: { value: 2, min: 1, max: 10, step: 0.1 },
        colorSteps: { value: 2, min: 1, max: 10, step: 1 },
    },
}

import { DotGrid } from '@paper-design/shaders-react'

export const dotGridConfig = {
    component: DotGrid,
    schema: {
        colorBack: { value: '#000000' },
        colorFill: { value: '#ffffff' },
        colorStroke: { value: '#ffaa00' },
        size: { value: 2, min: 1, max: 20, step: 1 },
        gapX: { value: 32, min: 4, max: 100, step: 1 },
        gapY: { value: 32, min: 4, max: 100, step: 1 },
        strokeWidth: { value: 0, min: 0, max: 10, step: 0.1 },
        sizeRange: { value: 0, min: 0, max: 10, step: 0.1 },
        opacityRange: { value: 0, min: 0, max: 1, step: 0.01 },
        shape: { value: 'circle', options: ['circle', 'diamond', 'square', 'triangle'] },
    },
}

import { Dithering } from '@paper-design/shaders-react'

export const ditheringConfig = {
    component: Dithering,
    schema: {
        colorBack: { value: '#000000' },
        colorFront: { value: '#00b3ff' },
        shape: {
            value: 'sphere',
            options: ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere'],
        },
        type: {
            value: '4x4',
            options: ['random', '2x2', '4x4', '8x8'],
        },
        size: { value: 2, min: 1, max: 8, step: 1 },
        speed: { value: 1, min: 0, max: 2, step: 0.1 },
        scale: { value: 0.6, min: 0.1, max: 2, step: 0.05 },
    },
}

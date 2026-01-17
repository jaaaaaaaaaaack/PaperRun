import { Waves } from '@paper-design/shaders-react'

export const wavesConfig = {
    component: Waves,
    schema: {
        colorBack: { value: '#000000' },
        colorFront: { value: '#ffbb00' },
        frequency: { value: 0.5, min: 0, max: 2, step: 0.01 },
        amplitude: { value: 0.5, min: 0, max: 2, step: 0.01 },
        spacing: { value: 1.2, min: 0, max: 5, step: 0.01 },
        proportion: { value: 0.1, min: 0, max: 1, step: 0.01 },
        softness: { value: 0, min: 0, max: 1, step: 0.01 },
        shape: { value: 0, min: 0, max: 3, step: 1 }, // Assuming shape index/enum
        scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
    },
}

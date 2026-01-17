import { HalftoneCmyk } from '@paper-design/shaders-react'

export const halftoneCMYKConfig = {
    component: HalftoneCmyk,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#fbfaf4' },
        colorC: { value: '#00b3ff' },
        colorM: { value: '#fc4f9d' },
        colorY: { value: '#ffd900' },
        colorK: { value: '#231f20' },
        size: { value: 0.2, min: 0, max: 1, step: 0.01 },
        gridNoise: { value: 0.2, min: 0, max: 1, step: 0.01 },
        type: { value: 'ink', options: ['dots', 'ink', 'sharp'] },
        softness: { value: 1, min: 0, max: 5, step: 0.01 },
        contrast: { value: 1, min: 0, max: 2, step: 0.01 },
        floodC: { value: 0.15, min: 0, max: 1, step: 0.01 },
        floodM: { value: 0, min: 0, max: 1, step: 0.01 },
        floodY: { value: 0, min: 0, max: 1, step: 0.01 },
        floodK: { value: 0, min: 0, max: 1, step: 0.01 },
        gainC: { value: 0.3, min: 0, max: 1, step: 0.01 },
        gainM: { value: 0, min: 0, max: 1, step: 0.01 },
        gainY: { value: 0.2, min: 0, max: 1, step: 0.01 },
        gainK: { value: 0, min: 0, max: 1, step: 0.01 },
        grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
        grainSize: { value: 0.5, min: 0, max: 2, step: 0.01 },
    },
}

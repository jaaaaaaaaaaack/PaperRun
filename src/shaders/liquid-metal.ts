import { LiquidMetal } from '@paper-design/shaders-react'

export const liquidMetalConfig = {
    component: LiquidMetal,
    schema: {
        image: { value: 'https://shaders.paper.design/images/logos/diamond.svg' },
        colorBack: { value: '#aaaaac' },
        colorTint: { value: '#ffffff' },
        shape: { value: 'diamond', options: ['none', 'circle', 'daisy', 'metaballs', 'diamond'] },
        repetition: { value: 2, min: 1, max: 10, step: 1 },
        softness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        shiftRed: { value: 0.3, min: 0, max: 1, step: 0.01 },
        shiftBlue: { value: 0.3, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.07, min: 0, max: 1, step: 0.01 },
        contour: { value: 0.4, min: 0, max: 1, step: 0.01 },
        angle: { value: 70, min: 0, max: 360, step: 1 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
    },
}

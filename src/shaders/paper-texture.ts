import { PaperTexture } from '@paper-design/shaders-react'

export const paperTextureConfig = {
    component: PaperTexture,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#ffffff' },
        colorFront: { value: '#9fadbc' },
        contrast: { value: 0.3, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.4, min: 0, max: 1, step: 0.01 },
        fiber: { value: 0.3, min: 0, max: 1, step: 0.01 },
        fiberSize: { value: 0.2, min: 0, max: 2, step: 0.01 },
        crumples: { value: 0.3, min: 0, max: 1, step: 0.01 },
        crumpleSize: { value: 0.35, min: 0, max: 2, step: 0.01 },
        folds: { value: 0.65, min: 0, max: 1, step: 0.01 },
        foldCount: { value: 5, min: 0, max: 10, step: 1 },
        drops: { value: 0.2, min: 0, max: 1, step: 0.01 },
        fade: { value: 0, min: 0, max: 1, step: 0.01 },
        seed: { value: 5.8, min: 0, max: 10, step: 0.1 },
        scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
    },
}

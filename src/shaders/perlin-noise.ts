import { PerlinNoise } from '@paper-design/shaders-react'

export const perlinNoiseConfig = {
    component: PerlinNoise,
    schema: {
        colorBack: { value: '#632ad5' },
        colorFront: { value: '#fccff7' },
        proportion: { value: 0.35, min: 0, max: 1, step: 0.01 },
        softness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        octaveCount: { value: 1, min: 1, max: 10, step: 1 },
        persistence: { value: 1, min: 0, max: 2, step: 0.01 },
        lacunarity: { value: 1.5, min: 0, max: 4, step: 0.1 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
    },
}

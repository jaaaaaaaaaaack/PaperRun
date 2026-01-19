import { Metaballs } from '@paper-design/shaders-react'

export const metaballsConfig = {
    component: Metaballs,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#FFC391", "#E491FF", "#6270C8", "#133B94"],
        },
        colorBack: { value: '#000000' },
        count: { value: 10, min: 1, max: 20, step: 1 },
        size: { value: 0.83, min: 0, max: 2, step: 0.01 },
        speed: { value: 1, min: 0, max: 5, step: 0.1 },
    },
}

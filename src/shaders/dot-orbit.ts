import { DotOrbit } from '@paper-design/shaders-react'

export const dotOrbitConfig = {
    component: DotOrbit,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33", "#33cc33", "#33cc99"],
        },
        colorBack: { value: '#000000' },
        stepsPerColor: { value: 4, min: 1, max: 10, step: 1 },
        size: { value: 1, min: 0, max: 5, step: 0.1 },
        sizeRange: { value: 0, min: 0, max: 2, step: 0.1 },
        spreading: { value: 1, min: 0, max: 2, step: 0.1 },
        speed: { value: 1.5, min: 0, max: 5, step: 0.1 },
    },
}

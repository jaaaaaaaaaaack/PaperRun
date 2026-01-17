import { ColorPanels } from '@paper-design/shaders-react'

export const colorPanelsConfig = {
    component: ColorPanels,
    automations: {
        feature: 'gradient'
    },
    schema: {
        colors: {
            value: ["#cc3333", "#cc9933", "#99cc33", "#33cc33", "#33cc99", "#3399cc", "#3333cc"],
        },
        colorBack: { value: '#000000' },
        density: { value: 3, min: 1, max: 10, step: 1 },
        angle1: { value: 0, min: 0, max: 360, step: 1 },
        angle2: { value: 0, min: 0, max: 360, step: 1 },
        length: { value: 1.1, min: 0, max: 2, step: 0.01 },
        edges: { value: false },
        blur: { value: 0, min: 0, max: 1, step: 0.01 },
        fadeIn: { value: 1, min: 0, max: 2, step: 0.01 },
        fadeOut: { value: 0.3, min: 0, max: 2, step: 0.01 },
        gradient: { value: 0, min: 0, max: 1, step: 0.01 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
        scale: { value: 0.8, min: 0, max: 2, step: 0.01 },
    },
}

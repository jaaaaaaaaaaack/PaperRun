import { FlutedGlass } from '@paper-design/shaders-react'

export const flutedGlassConfig = {
    component: FlutedGlass,
    schema: {
        image: { value: 'https://paper.design/flowers.webp' },
        colorBack: { value: '#00000000' },
        colorShadow: { value: '#000000' },
        colorHighlight: { value: '#ffffff' },
        size: { value: 0.5, min: 0, max: 2, step: 0.01 },
        shadows: { value: 0.25, min: 0, max: 1, step: 0.01 },
        highlights: { value: 0.1, min: 0, max: 1, step: 0.01 },
        shape: { value: 'lines', options: ['pattern', 'wave', 'lines', 'linesIrregular', 'zigzag'] },
        angle: { value: 0, min: 0, max: 360, step: 1 },
        distortionShape: { value: 'prism', options: ['prism', 'lens', 'contour', 'cascade', 'facete'] },
        distortion: { value: 0.5, min: 0, max: 2, step: 0.01 },
        shift: { value: 0, min: 0, max: 1, step: 0.01 },
        stretch: { value: 0, min: 0, max: 2, step: 0.01 },
        blur: { value: 0, min: 0, max: 1, step: 0.01 },
        edges: { value: 0.25, min: 0, max: 1, step: 0.01 },
        margin: { value: 0, min: 0, max: 1, step: 0.01 },
        grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
        grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
    },
}

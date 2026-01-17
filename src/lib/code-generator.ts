import type { ShaderKey } from '../shaders'

const shaderNames: Record<ShaderKey, string> = {
    'mesh-gradient': 'MeshGradient',
    'heatmap': 'Heatmap',
    'dithering': 'Dithering',
}

export function generateReactCode(shader: ShaderKey, values: Record<string, unknown>): string {
    const name = shaderNames[shader]
    const props = Object.entries(values)
        .map(([key, val]) => {
            if (Array.isArray(val)) {
                return `  ${key}={${JSON.stringify(val)}}`
            }
            if (typeof val === 'string') {
                return `  ${key}="${val}"`
            }
            return `  ${key}={${val}}`
        })
        .join('\n')

    return `<${name}\n${props}\n/>`
}

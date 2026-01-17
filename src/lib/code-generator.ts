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
            if (val === undefined || val === null) return ''
            if (Array.isArray(val) || typeof val === 'object') {
                return `  ${key}={${JSON.stringify(val)}}`
            }
            if (typeof val === 'string') {
                // Use braces and JSON.stringify to handle quotes and escaping safely
                return `  ${key}={${JSON.stringify(val)}}`
            }
            return `  ${key}={${val}}`
        })
        .filter(Boolean)
        .join('\n')

    return `<${name}\n${props}\n/>`
}

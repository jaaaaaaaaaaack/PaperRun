import type { ShaderKey } from '../shaders'

interface ParsedResult {
    componentName: string | null
    props: Record<string, unknown>
}

// Reverse mapping from component name to shader key
const componentNameToShaderKey: Record<string, ShaderKey> = {
    'MeshGradient': 'mesh-gradient',
    'StaticMeshGradient': 'static-mesh-gradient',
    'StaticRadialGradient': 'static-radial-gradient',
    'GrainGradient': 'grain-gradient',
    'ColorPanels': 'color-panels',
    'SimplexNoise': 'simplex-noise',
    'PerlinNoise': 'perlin-noise',
    'NeuroNoise': 'neuro-noise',
    'Voronoi': 'voronoi',
    'Metaballs': 'metaballs',
    'Warp': 'warp',
    'Swirl': 'swirl',
    'DotOrbit': 'dot-orbit',
    'DotGrid': 'dot-grid',
    'Waves': 'waves',
    'Spiral': 'spiral',
    'SmokeRing': 'smoke-ring',
    'GodRays': 'god-rays',
    'Water': 'water',
    'LiquidMetal': 'liquid-metal',
    'ImageDithering': 'image-dithering',
    'HalftoneDots': 'halftone-dots',
    'HalftoneCMYK': 'halftone-cmyk',
    'PaperTexture': 'paper-texture',
    'FlutedGlass': 'fluted-glass',
    'PulsingBorder': 'pulsing-border',
    'Heatmap': 'heatmap',
    'Dithering': 'dithering',
}

export interface ParsedShaderCode {
    shader: ShaderKey
    values: Record<string, unknown>
}

/**
 * Parse JSX shader code and extract shader key and values
 */
export function parseShaderCode(code: string): ParsedShaderCode | null {
    const parsed = parseReactComponent(code)

    if (!parsed.componentName) {
        return null
    }

    const shaderKey = componentNameToShaderKey[parsed.componentName]
    if (!shaderKey) {
        return null
    }

    return {
        shader: shaderKey,
        values: parsed.props
    }
}

export function parseReactComponent(code: string): ParsedResult {
    const result: ParsedResult = {
        componentName: null,
        props: {}
    }

    // 1. Extract Component Name
    // Matches <ComponentName ...
    const nameMatch = code.match(/<([A-Z][a-zA-Z0-9]+)/)
    if (nameMatch) {
        result.componentName = nameMatch[1]
    }

    // 2. Extract Props
    // We regex for key="value" OR key={value} OR key={JSON}
    // This is simple regex parsing, not a full AST parser, but accurate enough for our generated code

    // Regex explanation:
    // ([a-zA-Z0-9_]+)   => capture prop name
    // \s*=\s*           => equals with optional whitespace
    // (?:               => start value group
    //   "([^"]*)"       => double quoted string (capture group 2)
    //   |               => OR
    //   '([^']*)'       => single quoted string (capture group 3)
    //   |               => OR
    //   {(              => start brace (capture group 4 is content)
    //     [\s\S]*?      => non-greedy match for content (careful with nested braces, simple assumption here)
    //   )}              => end brace
    // )

    // Note: The simple regex '{(.*?)}' fails on nested braces objects like colors={["#fff"]}.
    // We will use a simpler key-value scan loop to handle braces manually if needed, 
    // or a more robust regex for JSON arrays/objects.

    // Let's use a robust tokenizing approach for the props string

    // Isolate the props string: content between <Name ... />
    const propsStringMatch = code.match(/<[A-Z][a-zA-Z0-9]+\s+([\s\S]*?)\s*\/?>/)
    if (!propsStringMatch) return result

    const propsContent = propsStringMatch[1]

    // Helper to add prop
    const addProp = (key: string, value: any) => {
        result.props[key] = value
    }

    // A simple parser loop
    let remaining = propsContent

    while (remaining.length > 0) {
        // Skip whitespace
        remaining = remaining.trim()
        if (remaining.length === 0) break

        // Match Key
        const keyMatch = remaining.match(/^([a-zA-Z0-9_]+)=/)
        if (!keyMatch) {
            // Probably hit end or invalid syntax, skip char
            remaining = remaining.slice(1)
            continue
        }

        const key = keyMatch[1]
        remaining = remaining.slice(keyMatch[0].length).trim()

        // Match Value
        if (remaining.startsWith('"')) {
            // Double quoted string
            const endQuote = remaining.indexOf('"', 1)
            if (endQuote > -1) {
                const val = remaining.slice(1, endQuote)
                addProp(key, val)
                remaining = remaining.slice(endQuote + 1)
            }
        } else if (remaining.startsWith("'")) {
            // Single quoted string
            const endQuote = remaining.indexOf("'", 1)
            if (endQuote > -1) {
                const val = remaining.slice(1, endQuote)
                addProp(key, val)
                remaining = remaining.slice(endQuote + 1)
            }
        } else if (remaining.startsWith('{')) {
            // Expression / JSON
            // We need to find the matching closing brace.
            let balance = 1
            let i = 1
            while (i < remaining.length && balance > 0) {
                const char = remaining[i]

                // Skip strings inside braces
                if (char === '"' || char === "'") {
                    const quote = char
                    i++
                    while (i < remaining.length && remaining[i] !== quote) {
                        if (remaining[i] === '\\') i++ // Skip escaped char
                        i++
                    }
                } else if (char === '{') {
                    balance++
                } else if (char === '}') {
                    balance--
                }
                i++
            }

            if (balance === 0) {
                const rawVal = remaining.slice(1, i - 1) // Content inside {}
                // Try JSON parse, else strings/number
                // For simplified playground, we mostly expect primitives or arrays of strings

                try {
                    // Check if it's a number
                    if (!isNaN(Number(rawVal)) && !rawVal.includes('[')) {
                        addProp(key, Number(rawVal))
                    }
                    // Check if it's a generic JSON (arrays, objects)
                    else {
                        // Some generated code might be unquoted keys? 
                        // Our code generator produces valid JSON for arrays: {["#f00", "#0f0"]}
                        // Numbers are simple: {0.5}
                        addProp(key, JSON.parse(rawVal)) // Strict JSON requirement
                    }
                } catch (e) {
                    // Fallback, maybe string?
                    addProp(key, rawVal)
                }
                remaining = remaining.slice(i)
            } else {
                // Braces didn't balance?
                break
            }
        } else {
            // Maybe unquoted value? skip
            remaining = remaining.slice(1)
        }
    }

    return result
}

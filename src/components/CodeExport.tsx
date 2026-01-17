import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Button } from '@/components/ui/button'
import { useShaderStore } from '../store'
import { generateReactCode } from '../lib/code-generator'
import type { ShaderKey } from '../shaders'
import { shaders } from '../shaders'

// Helper to determine shader key from component name
const componentToShaderKey = (componentName: string): ShaderKey | null => {
    // Basic heuristic: Convert PascalCase to kebab-case
    // This covers most cases like MeshGradient -> mesh-gradient
    const heuristic = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    if (Object.prototype.hasOwnProperty.call(shaders, heuristic)) {
        return heuristic as ShaderKey
    }

    // Manual overrides if needed (e.g. if names don't match pattern)
    const mapping: Record<string, ShaderKey> = {
        'Heatmap': 'heatmap', // matches heuristic but explicit is safe
    }
    return mapping[componentName] || (heuristic as ShaderKey)
}

export function CodeExport() {
    const [copiedAll, setCopiedAll] = useState(false)
    const [copiedSettings, setCopiedSettings] = useState(false)
    const [pasteError, setPasteError] = useState<string | null>(null)

    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const values = useShaderStore((s) => s.values)
    const setValues = useShaderStore((s) => s.setValues)
    const setActiveShader = useShaderStore((s) => s.setActiveShader)

    const code = generateReactCode(activeShader, values)

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(code)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    const handleCopySettings = async () => {
        const settings = JSON.stringify(values, null, 2)
        await navigator.clipboard.writeText(settings)
        setCopiedSettings(true)
        setTimeout(() => setCopiedSettings(false), 2000)
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setPasteError(null)

            // 1. Try JSON
            try {
                const json = JSON.parse(text)
                if (typeof json === 'object' && json !== null) {
                    setValues(json)
                    return
                }
            } catch (e) { /* continue */ }

            // 2. Try Image/SVG (Simple string check)
            const trimmed = text.trim()
            if (
                trimmed.startsWith('<svg') ||
                trimmed.startsWith('data:image') ||
                trimmed.startsWith('http') ||
                /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(trimmed)
            ) {
                const schema = shaders[activeShader].schema as any
                if ('image' in schema) {
                    setValues({ ...values, image: trimmed })
                    return
                }
            }

            // 3. Fallback: Parse React Component (Deterministic)
            // No Gemini dependency for standard paste operations
            try {
                const { parseReactComponent } = await import('../lib/code-parser')
                const { componentName, props } = parseReactComponent(text)

                // If no component name or props found, we might have failed
                if (!componentName && Object.keys(props).length === 0) {
                    setPasteError("Invalid format")
                    setTimeout(() => setPasteError(null), 3000)
                    return
                }

                // If component name found, try to switch shader
                if (componentName) {
                    const detectedKey = componentToShaderKey(componentName)
                    if (detectedKey && detectedKey !== activeShader) {
                        // Atomic update: Switch shader AND set values at once to prevents render cycles with invalid props
                        setActiveShader(detectedKey, props)
                        return
                    }
                }

                if (Object.keys(props).length > 0) {
                    setValues(props)
                    return
                }

            } catch (err) {
                console.error("Parser failed", err)
            }

            setPasteError("Invalid format")
            setTimeout(() => setPasteError(null), 3000)

        } catch (err) {
            console.error('Paste failed:', err)
            setPasteError("Failed to access clipboard")
            setTimeout(() => setPasteError(null), 3000)
        }
    }

    return (
        <div className="h-48 border-t border-neutral-800 bg-neutral-950 p-4 overflow-auto flex flex-col">
            <div className="flex justify-between items-center mb-2 shrink-0">
                <span className="text-sm text-neutral-400">React JSX</span>
                <div className="flex gap-2 items-center">
                    {pasteError && <span className="text-red-400 text-xs mr-2">{pasteError}</span>}
                    <Button
                        size="sm"
                        onClick={handlePaste}
                        className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border-none"
                    >
                        Paste
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleCopySettings}
                        className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border-none"
                    >
                        {copiedSettings ? 'Copied!' : 'Copy Settings'}
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleCopyAll}
                        className="bg-white text-black hover:bg-neutral-200 border-none font-medium"
                    >
                        {copiedAll ? 'Copied!' : 'Copy All'}
                    </Button>
                </div>
            </div>
            <Highlight theme={themes.nightOwl} code={code} language="tsx">
                {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre style={style} className="text-sm rounded p-2 overflow-x-auto flex-1 font-mono">
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    )
}

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Button } from '@/components/ui/button'
import { useShaderStore } from '../store'
import { generateReactCode } from '../lib/code-generator'
import type { ShaderKey } from '../shaders'

export function CodeExport() {
    const [copied, setCopied] = useState(false)
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const values = useShaderStore((s) => s.values)

    const code = generateReactCode(activeShader, values)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="h-48 border-t border-neutral-800 bg-neutral-950 p-4 overflow-auto">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-neutral-400">React JSX</span>
                <Button size="sm" variant="outline" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
            <Highlight theme={themes.nightOwl} code={code} language="tsx">
                {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre style={style} className="text-sm rounded p-2 overflow-x-auto">
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

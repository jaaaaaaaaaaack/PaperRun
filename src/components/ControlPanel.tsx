import { useControls, Leva } from 'leva'
import { useEffect, useMemo } from 'react'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'
import { useShaderStore } from '../store'

export function ControlPanel() {
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const setValues = useShaderStore((s) => s.setValues)

    const schema = useMemo(() => shaders[activeShader].schema, [activeShader])

    const values = useControls(activeShader, schema, [activeShader])

    useEffect(() => {
        setValues(values)
    }, [values, setValues])

    return (
        <aside className="w-80 border-l border-neutral-800 bg-neutral-950 overflow-auto">
            <Leva flat fill titleBar={false} />
        </aside>
    )
}

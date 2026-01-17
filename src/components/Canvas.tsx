import { useShaderStore } from '../store'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'

export function Canvas() {
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const values = useShaderStore((s) => s.values)

    const ShaderComponent = shaders[activeShader].component

    return (
        <div className="flex-1 bg-neutral-900 relative">
            <ShaderComponent
                style={{ width: '100%', height: '100%' }}
                {...values}
            />
        </div>
    )
}

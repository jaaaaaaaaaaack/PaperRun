import { useShaderStore } from '../store'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'

export function Canvas() {
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const values = useShaderStore((s) => s.values)
    const canvasSize = useShaderStore((s) => s.canvasSize)
    const canvasBg = useShaderStore((s) => s.canvasBg)

    const ShaderComponent = shaders[activeShader].component

    const bgStyles: Record<string, string> = {
        checkered: 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23333\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23333\'/%3E%3C/svg%3E")]',
        black: 'bg-black',
        white: 'bg-white',
    }

    return (
        <div className={`flex-1 flex items-center justify-center overflow-auto ${bgStyles[canvasBg]}`}>
            <div
                style={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                className="relative flex-shrink-0"
            >
                <ShaderComponent
                    style={{ width: '100%', height: '100%' }}
                    {...values}
                />
            </div>
        </div>
    )
}

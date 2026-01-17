import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useShaderStore, sizePresets } from '../store'
import type { CanvasBg } from '../store'

const shaderOptions = [
    { value: 'mesh-gradient', label: 'Mesh Gradient' },
    { value: 'heatmap', label: 'Heatmap' },
    { value: 'dithering', label: 'Dithering' },
]

const bgOptions: { value: CanvasBg; label: string }[] = [
    { value: 'checkered', label: '⬛ Checkered' },
    { value: 'black', label: '⬛ Black' },
    { value: 'white', label: '⬜ White' },
]

interface HeaderProps {
    activeShader: string
    onShaderChange: (value: string) => void
}

export function Header({ activeShader, onShaderChange }: HeaderProps) {
    const canvasSize = useShaderStore((s) => s.canvasSize)
    const setCanvasSize = useShaderStore((s) => s.setCanvasSize)
    const canvasBg = useShaderStore((s) => s.canvasBg)
    const setCanvasBg = useShaderStore((s) => s.setCanvasBg)

    return (
        <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-950">
            <h1 className="font-semibold text-lg">Paper Shaders Playground</h1>
            <div className="flex items-center gap-2">
                <Select
                    value={canvasSize.label}
                    onValueChange={(label) => {
                        const preset = sizePresets.find(p => p.label === label)
                        if (preset) setCanvasSize(preset)
                    }}
                >
                    <SelectTrigger className="w-28">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        {sizePresets.map((p) => (
                            <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={canvasBg} onValueChange={(v) => setCanvasBg(v as CanvasBg)}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Background" />
                    </SelectTrigger>
                    <SelectContent>
                        {bgOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={activeShader} onValueChange={onShaderChange}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select shader" />
                    </SelectTrigger>
                    <SelectContent>
                        {shaderOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </header>
    )
}

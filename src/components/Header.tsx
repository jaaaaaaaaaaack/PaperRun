import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const shaderOptions = [
    { value: 'mesh-gradient', label: 'Mesh Gradient' },
    { value: 'heatmap', label: 'Heatmap' },
    { value: 'dithering', label: 'Dithering' },
]

interface HeaderProps {
    activeShader: string
    onShaderChange: (value: string) => void
}

export function Header({ activeShader, onShaderChange }: HeaderProps) {
    return (
        <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-950">
            <h1 className="font-semibold text-lg">Paper Shaders Playground</h1>
            <Select value={activeShader} onValueChange={onShaderChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select shader" />
                </SelectTrigger>
                <SelectContent>
                    {shaderOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </header>
    )
}

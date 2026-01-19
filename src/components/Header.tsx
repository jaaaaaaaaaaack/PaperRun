import { useShaderStore, sizePresets } from '../store'
import type { CanvasBg } from '../store'

const bgOptions: { value: CanvasBg; label: string }[] = [
    { value: 'checkered', label: 'Checkered' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
]

export function Header() {
    const canvasSize = useShaderStore((s) => s.canvasSize)
    const setCanvasSize = useShaderStore((s) => s.setCanvasSize)
    const canvasBg = useShaderStore((s) => s.canvasBg)
    const setCanvasBg = useShaderStore((s) => s.setCanvasBg)
    const view = useShaderStore((s) => s.view)
    const setView = useShaderStore((s) => s.setView)

    return (
        <header className="h-14 flex items-center justify-between px-3 relative z-50">
            <div className="flex items-center gap-2">
                {/* View toggle tabs */}
                <div role="tablist" className="tabs tabs-box bg-surface-alt">
                    <button
                        role="tab"
                        className={`tab tab-sm ${view === 'playground' ? 'tab-active' : ''}`}
                        onClick={() => setView('playground')}
                    >
                        Playground
                    </button>
                    <button
                        role="tab"
                        className={`tab tab-sm ${view === 'experiments' ? 'tab-active' : ''}`}
                        onClick={() => setView('experiments')}
                    >
                        Experiments
                    </button>
                </div>
            </div>

            {view === 'playground' && (
                <div className="flex items-center gap-2">
                    {/* Canvas size */}
                    <select
                        value={canvasSize.label}
                        onChange={(e) => {
                            const preset = sizePresets.find(p => p.label === e.target.value)
                            if (preset) setCanvasSize(preset)
                        }}
                        className="select select-sm bg-surface-alt border-none text-text-secondary text-sm min-h-0 h-8"
                    >
                        {sizePresets.map((p) => (
                            <option key={p.label} value={p.label}>{p.label}</option>
                        ))}
                    </select>

                    {/* Canvas background */}
                    <select
                        value={canvasBg}
                        onChange={(e) => setCanvasBg(e.target.value as CanvasBg)}
                        className="select select-sm bg-surface-alt border-none text-text-secondary text-sm min-h-0 h-8"
                    >
                        {bgOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            )}
        </header>
    )
}

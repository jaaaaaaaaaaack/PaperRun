import { Plus } from 'lucide-react'
import { useShaderStore } from '../store'

interface PresetsCarouselProps {
    onSavePreset: () => void
    isSaving?: boolean
}

export function PresetsCarousel({ onSavePreset, isSaving }: PresetsCarouselProps) {
    const presets = useShaderStore((s) => s.presets)
    const applyPreset = useShaderStore((s) => s.applyPreset)

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-[13px] font-bold text-text-primary uppercase tracking-wide">
                Presets
            </h3>
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-1 px-1 -my-1 py-1">
                <div className="flex gap-2">
                    {/* Save New Preset Button */}
                    <button
                        onClick={onSavePreset}
                        disabled={isSaving}
                        className="snap-start shrink-0 w-[80px] h-[60px] rounded-lg border-2 border-dashed border-border-subtle bg-surface-alt/50 hover:border-text-secondary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-info flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
                        title="Save current settings as preset"
                    >
                        <Plus className="w-6 h-6 text-text-secondary" />
                    </button>

                    {/* Existing Presets */}
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => applyPreset(preset)}
                            className="snap-start shrink-0 w-[80px] h-[60px] rounded-lg overflow-hidden bg-surface-alt border border-border-subtle hover:border-text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-info"
                            title={preset.name}
                        >
                            <img
                                src={preset.thumbnail}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

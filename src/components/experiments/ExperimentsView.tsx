
import { useShaderStore } from '../../store'
import { HeatmapInteract } from './HeatmapInteract'

export function ExperimentsView() {
    const activeExperiment = useShaderStore((s) => s.activeExperiment)

    return (
        <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
            {activeExperiment === 'heatmap-interact' && <HeatmapInteract />}
        </div>
    )
}

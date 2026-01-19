import { useRef, useState } from 'react'
import { Heatmap } from '@paper-design/shaders-react'

const INITIAL_SETTINGS = {
    colorBack: 'transparent',
    contour: 0.47,
    angle: 248,
    noise: 0,
    innerGlow: 0.62,
    outerGlow: 0.25,
    speed: 0,
    scale: 0.35, // Adjust scale if needed, or keep as prompt
    imageFit: 'contain', // Try adding this if supported, or rely on default
    colors: [
        '#ffc2fd',
        '#ff85fb',
        '#edf019',
        '#99ffa0',
        '#00a89d'
    ]
}

export function HeatmapInteract() {
    const [offsetY, setOffsetY] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handlePointerDown = () => {
        setIsDragging(true)
    }

    const handlePointerUp = () => {
        setIsDragging(false)
        setOffsetY(0) // Reset on release? Or keep? Let's reset for "spring back" feel if desired, or keep. Plan didn't specify. resetting feels more "interactive" like a momentary ripple. 
        // Actually, let's just track position relative to center.
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!containerRef.current) return

        // Always track relative position for "hover" or "drag" feel. 
        // If we only want drag:
        if (!isDragging) return;

        const rect = containerRef.current.getBoundingClientRect()
        const y = e.clientY - rect.top
        const height = rect.height

        // Normalize -1 to 1 (center is 0)
        const normalizedY = ((y / height) * 2 - 1) * -1

        // Clamp
        const clamped = Math.max(-1, Math.min(1, normalizedY))

        // Map clamped Y (-1 to 1) to speed modifier.
        // Dragging down (negative Y in this coord system? wait.
        // y=0 is top. y=height is bottom.
        // normalizedY: top = (0 - 1) * -1 = 1. Bottom = (2 - 1) * -1 = -1.
        // So dragging UP is positive, DOWN is negative.

        // Let's make dragging DOWN increase speed (flow down?).
        // If flow is standard, speed 1.
        // Let's add the drag value to speed.
        setOffsetY(clamped * 5) // Use "offsetY" state var to store the speed modifier for now, simpler than renaming everything yet.
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center cursor-ns-resize touch-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            <div className="relative pointer-events-none">
                <Heatmap
                    {...INITIAL_SETTINGS}
                    width={500}
                    height={300} // Diamond needs more height/aspect
                    image="https://shaders.paper.design/images/logos/diamond.svg"
                    speed={INITIAL_SETTINGS.speed + offsetY} // Modulate speed
                />
            </div>

            <div className="absolute top-4 left-4 text-white/50 text-sm font-mono pointer-events-none select-none">
                Drag up/down to change speed<br />
                Speed Mod: {offsetY.toFixed(2)}
            </div>
        </div>
    )
}

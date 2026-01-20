import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ColorPicker } from 'antd'
import type { ColorPickerProps } from 'antd'

interface GradientBarProps {
    colors: string[]
    onChange: (colors: string[]) => void
}

type AntGradientStop = { color: string; percent: number }

// Convert hex colors array to CSS gradient string for preview
function colorsToGradient(colors: string[]): string {
    if (colors.length === 0) return 'linear-gradient(90deg, #000000 0%, #ffffff 100%)'
    if (colors.length === 1) return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[0]} 100%)`

    const stops = colors.map((color, index) => {
        const position = Math.round((index / (colors.length - 1)) * 100)
        return `${color} ${position}%`
    })
    return `linear-gradient(90deg, ${stops.join(', ')})`
}

// Convert hex colors array to Ant Design gradient format
function colorsToAntGradient(colors: string[]): AntGradientStop[] {
    if (colors.length === 0) {
        return [
            { color: '#000000', percent: 0 },
            { color: '#ffffff', percent: 100 }
        ]
    }
    if (colors.length === 1) {
        return [
            { color: colors[0], percent: 0 },
            { color: colors[0], percent: 100 }
        ]
    }
    return colors.map((color, index) => ({
        color,
        percent: Math.round((index / (colors.length - 1)) * 100)
    }))
}

// Convert internal gradient state to CSS for preview
function gradientStopsToCSS(stops: AntGradientStop[]): string {
    if (stops.length === 0) return 'linear-gradient(90deg, #000000 0%, #ffffff 100%)'
    if (stops.length === 1) return `linear-gradient(90deg, ${stops[0].color} 0%, ${stops[0].color} 100%)`

    const cssStops = stops
        .slice()
        .sort((a, b) => a.percent - b.percent)
        .map(stop => `${stop.color} ${stop.percent}%`)
    return `linear-gradient(90deg, ${cssStops.join(', ')})`
}

// Normalize colors for comparison (lowercase, sorted)
function normalizeColorsForComparison(colors: string[]): string {
    return colors.map(c => c.toLowerCase()).sort().join(',')
}

export function GradientBar({ colors, onChange }: GradientBarProps) {
    // Internal state preserves full gradient structure (colors + positions)
    const [internalGradient, setInternalGradient] = useState<AntGradientStop[]>(() =>
        colorsToAntGradient(colors)
    )

    // Track if we're currently making internal changes
    const isInternalChange = useRef(false)
    // Track the last colors we synced from props
    const lastExternalColors = useRef(normalizeColorsForComparison(colors))

    // Sync internal state when parent colors change EXTERNALLY (e.g., AI extraction)
    useEffect(() => {
        const normalizedProps = normalizeColorsForComparison(colors)

        // Only reset if this is a genuinely external change (not from our own onChange)
        if (!isInternalChange.current && normalizedProps !== lastExternalColors.current) {
            setInternalGradient(colorsToAntGradient(colors))
            lastExternalColors.current = normalizedProps
        }
        isInternalChange.current = false
    }, [colors])

    const handleGradientChange: ColorPickerProps['onChange'] = useCallback((value) => {
        const gradientColors = (value as any).colors
        if (Array.isArray(gradientColors) && gradientColors.length > 0) {
            // Extract full gradient state (color + percent)
            const newGradient: AntGradientStop[] = gradientColors.map((stop: any) => {
                const colorObj = stop.color
                let hex = typeof colorObj === 'string' ? colorObj : colorObj?.toHexString?.() || '#000000'
                if (typeof hex === 'string' && hex.length === 9) {
                    hex = hex.slice(0, 7)
                }
                return { color: hex, percent: stop.percent }
            })

            // Update internal state (preserves positions)
            setInternalGradient(newGradient)

            // Mark that the next prop change is from us
            isInternalChange.current = true

            // Notify parent with just hex colors (sorted by position)
            const sortedColors = newGradient
                .slice()
                .sort((a, b) => a.percent - b.percent)
                .map(s => s.color)

            // Update our tracking ref
            lastExternalColors.current = normalizeColorsForComparison(sortedColors)

            onChange(sortedColors)
        }
    }, [onChange])

    // Use internal gradient for the picker value
    const gradientPreview = useMemo(() => gradientStopsToCSS(internalGradient), [internalGradient])

    return (
        <ColorPicker
            value={internalGradient}
            onChange={handleGradientChange}
            mode="gradient"
            disabledAlpha
        >
            <button
                className="w-full h-10 rounded-xl cursor-pointer transition-all hover:ring-2 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-info"
                style={{ background: gradientPreview }}
            />
        </ColorPicker>
    )
}

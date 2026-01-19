import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import ReactGPicker from 'react-gcolor-picker'

interface GradientBarProps {
    colors: string[]
    onChange: (colors: string[]) => void
}

// Convert hex colors array to CSS gradient string with positions
function colorsToGradient(colors: string[]): string {
    if (colors.length === 0) return 'linear-gradient(90deg, #000000 0%, #ffffff 100%)'
    if (colors.length === 1) return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[0]} 100%)`

    const stops = colors.map((color, index) => {
        const position = Math.round((index / (colors.length - 1)) * 100)
        return `${color} ${position}%`
    })
    return `linear-gradient(90deg, ${stops.join(', ')})`
}

// Parse CSS gradient string to extract hex colors
function gradientToColors(gradient: string): string[] {
    const hexRegex = /#[0-9a-fA-F]{6}/g
    const hexMatches = gradient.match(hexRegex)
    if (hexMatches && hexMatches.length >= 1) {
        return hexMatches
    }

    const rgbaRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g
    const colors: string[] = []
    let match
    while ((match = rgbaRegex.exec(gradient)) !== null) {
        const r = parseInt(match[1])
        const g = parseInt(match[2])
        const b = parseInt(match[3])
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        colors.push(hex)
    }

    return colors.length > 0 ? colors : ['#000000', '#ffffff']
}

export function GradientBar({ colors, onChange }: GradientBarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLButtonElement>(null)

    const gradientValue = useMemo(() => colorsToGradient(colors), [colors])

    const handleGradientChange = useCallback((newValue: string) => {
        if (newValue.includes('gradient')) {
            const newColors = gradientToColors(newValue)
            if (newColors.length > 0 && JSON.stringify(newColors) !== JSON.stringify(colors)) {
                onChange(newColors)
            }
        }
    }, [colors, onChange])

    // Close popover when clicking outside
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                barRef.current &&
                !barRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <div className="relative">
            {/* Gradient Bar Preview */}
            <button
                ref={barRef}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-10 rounded-xl cursor-pointer transition-all hover:ring-2 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-info"
                style={{ background: gradientValue }}
            />

            {/* Popover */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute top-full left-0 mt-2 z-50 gradient-popover"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-200">
                        <ReactGPicker
                            value={gradientValue}
                            onChange={handleGradientChange}
                            format="hex"
                            gradient={true}
                            solid={false}
                            showAlpha={true}
                            debounce={true}
                            debounceMS={50}
                            popupWidth={320}
                            colorBoardHeight={180}
                            showGradientResult={false}
                            showGradientMode={false}
                            showGradientAngle={false}
                            showGradientPosition={false}
                            allowAddGradientStops={true}
                            showInputs={true}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

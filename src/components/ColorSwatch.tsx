import { useState, useRef, useEffect, useCallback } from 'react'
import ReactGPicker from 'react-gcolor-picker'

interface ColorSwatchProps {
    color: string
    onChange: (color: string) => void
}

export function ColorSwatch({ color, onChange }: ColorSwatchProps) {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const swatchRef = useRef<HTMLButtonElement>(null)

    // Extract hex for display (remove # prefix)
    const hexDisplay = color.replace('#', '').toUpperCase()

    const handleColorChange = useCallback((newValue: string) => {
        // Extract hex color from the value
        const hexMatch = newValue.match(/#[0-9a-fA-F]{6}/)
        if (hexMatch && hexMatch[0] !== color) {
            onChange(hexMatch[0])
        } else if (!hexMatch) {
            // Try to parse rgb
            const rgbMatch = newValue.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1])
                const g = parseInt(rgbMatch[2])
                const b = parseInt(rgbMatch[3])
                const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
                if (hex !== color) {
                    onChange(hex)
                }
            }
        }
    }, [color, onChange])

    // Close popover when clicking outside
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                swatchRef.current &&
                !swatchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <div className="relative">
            {/* Swatch + Hex Display */}
            <button
                ref={swatchRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 cursor-pointer group"
            >
                {/* Color Swatch Pill */}
                <div
                    className="w-12 h-6 rounded-full border-2 border-slate-600 group-hover:border-slate-400 transition-colors"
                    style={{ backgroundColor: color }}
                />
                {/* Hex Code */}
                <span className="text-sm font-mono text-text-secondary bg-surface-alt px-2 py-1 rounded group-hover:bg-slate-600 transition-colors">
                    {hexDisplay}
                </span>
            </button>

            {/* Popover */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute top-full right-0 mt-2 z-50 color-popover"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-200">
                        <ReactGPicker
                            value={color}
                            onChange={handleColorChange}
                            format="hex"
                            gradient={false}
                            solid={true}
                            showAlpha={true}
                            debounce={true}
                            debounceMS={50}
                            popupWidth={280}
                            colorBoardHeight={160}
                            showInputs={true}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

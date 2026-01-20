import { ColorPicker } from 'antd'
import type { Color } from 'antd/es/color-picker'

interface ColorSwatchProps {
    color: string
    onChange: (color: string) => void
}

export function ColorSwatch({ color, onChange }: ColorSwatchProps) {
    // Extract hex for display (remove # prefix)
    const hexDisplay = color.replace('#', '').toUpperCase()

    const handleColorChange = (value: Color) => {
        // Ant Design may return 8-char hex (with alpha), trim to 6-char
        let hex = value.toHexString()
        if (hex.length === 9) {
            hex = hex.slice(0, 7)
        }
        if (hex !== color) {
            onChange(hex)
        }
    }

    return (
        <ColorPicker
            value={color}
            onChangeComplete={handleColorChange}
            disabledAlpha
            format="hex"
        >
            <button className="flex items-center gap-2 cursor-pointer group">
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
        </ColorPicker>
    )
}

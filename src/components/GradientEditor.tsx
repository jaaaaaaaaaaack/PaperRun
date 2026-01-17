import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { extractGradientFromImage, isGeminiConfigured } from '../lib/gemini'

interface GradientEditorProps {
    colors: string[]
    onChange: (colors: string[]) => void
}

export function GradientEditor({ colors, onChange }: GradientEditorProps) {
    const [isExtracting, setIsExtracting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleColorChange = (index: number, newColor: string) => {
        const newColors = [...colors]
        newColors[index] = newColor
        onChange(newColors)
    }

    const addColor = () => {
        if (colors.length >= 7) return
        // Add a color between the last two, or a default if less than 2
        const lastColor = colors[colors.length - 1] || '#ffffff'
        onChange([...colors, lastColor])
    }

    const removeColor = (index: number) => {
        if (colors.length <= 2) return // Minimum 2 colors
        onChange(colors.filter((_, i) => i !== index))
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (!file) return

        setError(null)
        setIsExtracting(true)

        try {
            const reader = new FileReader()
            reader.onload = async () => {
                try {
                    const base64 = reader.result as string
                    const extractedColors = await extractGradientFromImage(base64)
                    onChange(extractedColors)
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to extract colors')
                } finally {
                    setIsExtracting(false)
                }
            }
            reader.readAsDataURL(file)
        } catch {
            setIsExtracting(false)
            setError('Failed to read image file')
        }
    }, [onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        disabled: isExtracting,
        noClick: false,
    })

    const gradientStyle = {
        background: `linear-gradient(to right, ${colors.join(', ')})`,
    }

    return (
        <div className="space-y-3">
            {/* Gradient Preview */}
            <div
                className="h-8 rounded-md border border-neutral-700"
                style={gradientStyle}
            />

            {/* Color Stops */}
            <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                    <div key={index} className="relative group">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border border-neutral-700"
                        />
                        {colors.length > 2 && (
                            <button
                                onClick={() => removeColor(index)}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
                {colors.length < 7 && (
                    <button
                        onClick={addColor}
                        className="w-8 h-8 rounded border-2 border-dashed border-neutral-600 text-neutral-500 hover:border-neutral-400 hover:text-neutral-300 transition-colors flex items-center justify-center"
                    >
                        +
                    </button>
                )}
            </div>

            {/* AI Extraction */}
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-md p-3 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-neutral-700 hover:border-neutral-500'}
          ${isExtracting ? 'opacity-50 cursor-wait' : ''}
        `}
            >
                <input {...getInputProps()} />
                <p className="text-xs text-neutral-400">
                    {isExtracting
                        ? '✨ Extracting colors with AI...'
                        : isDragActive
                            ? 'Drop image to extract colors...'
                            : '🎨 Drop image to extract gradient with AI'
                    }
                </p>
                {!isGeminiConfigured() && (
                    <p className="text-xs text-amber-500 mt-1">
                        Add VITE_GEMINI_API_KEY to .env to enable
                    </p>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}

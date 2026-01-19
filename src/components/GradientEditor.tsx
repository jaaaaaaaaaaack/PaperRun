import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageDown } from 'lucide-react'
import { GradientBar } from './GradientBar'
import { extractGradientFromImage, isGeminiConfigured } from '../lib/gemini'

interface GradientEditorProps {
    colors: string[]
    onChange: (colors: string[]) => void
}

export function GradientEditor({ colors, onChange }: GradientEditorProps) {
    const [isExtracting, setIsExtracting] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

    return (
        <div className="flex flex-col gap-3">
            {/* Gradient Bar - clickable to open picker popover */}
            <GradientBar colors={colors} onChange={onChange} />

            {/* AI Extraction Drop Zone */}
            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-colors flex items-center justify-center gap-2
                    ${isDragActive ? 'border-info bg-info/10' : 'border-border-subtle hover:border-text-secondary bg-surface-alt/50'}
                    ${isExtracting ? 'opacity-50 cursor-wait' : ''}
                `}
            >
                <input {...getInputProps()} />
                <ImageDown className="w-4 h-4 text-text-secondary" />
                <p className="text-xs text-text-secondary">
                    {isExtracting
                        ? 'Extracting colors with AI...'
                        : isDragActive
                            ? 'Drop image to extract colors...'
                            : 'Drop image to extract gradient'
                    }
                </p>
                {!isGeminiConfigured() && (
                    <p className="text-xs text-warning ml-1">
                        (API key required)
                    </p>
                )}
            </div>

            {error && (
                <p className="text-xs text-error">{error}</p>
            )}
        </div>
    )
}

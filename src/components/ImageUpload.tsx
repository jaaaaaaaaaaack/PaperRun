import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
    value: string
    onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                onChange(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }, [onChange])

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'],
            'video/*': ['.mp4', '.webm'],
        },
        noClick: true,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
        onDropAccepted: () => setIsDragging(false),
        onDropRejected: () => setIsDragging(false),
    })

    const isDataUrl = value.startsWith('data:')
    const displayValue = isDataUrl ? '(uploaded file)' : value

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-md p-3 text-center cursor-pointer transition-colors
          ${isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-neutral-700 hover:border-neutral-500'
                    }
        `}
                onClick={open}
            >
                <input {...getInputProps()} />
                <p className="text-xs text-neutral-400">
                    {isDragging ? 'Drop image here...' : 'Drop image/video or click to browse'}
                </p>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={displayValue}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Or paste URL..."
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder:text-neutral-500"
                    disabled={isDataUrl}
                />
                {isDataUrl && (
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onChange('')}
                        className="text-xs h-7 px-2"
                    >
                        Clear
                    </Button>
                )}
            </div>

            {value && (
                <div className="mt-2 rounded overflow-hidden bg-neutral-800 max-h-20">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-contain max-h-20"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                </div>
            )}
        </div>
    )
}

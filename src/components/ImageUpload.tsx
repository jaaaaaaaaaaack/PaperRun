import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { CloudUpload } from 'lucide-react'
import { useShaderStore } from '../store'
import { LibraryButton } from './LibraryButton'

interface ImageUploadProps {
    value: string
    onChange: (value: string) => void
    onOpenLibrary: () => void
}

export function ImageUpload({ value, onChange, onOpenLibrary }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isCurrentHovered, setIsCurrentHovered] = useState(false)
    const addLibraryImage = useShaderStore((s) => s.addLibraryImage)

    const isSvg = value.includes('image/svg')

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = async () => {
                    const data = reader.result as string
                    onChange(data)
                    // Save to library
                    await addLibraryImage(data, file.name)
                }
                reader.readAsDataURL(file)
            }
        },
        [onChange, addLibraryImage]
    )

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

    const handleSaveToLibrary = async () => {
        if (value) {
            await addLibraryImage(value, 'saved-image')
        }
    }

    // Spring animation config
    const springConfig = {
        stiffness: 432,
        damping: 24,
        mass: 1,
    }

    // Icon component for the current image tile
    const CurrentImageIcon = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="6" fill="currentColor" />
            <circle cx="28" cy="12" r="6" fill="currentColor" />
            <circle cx="12" cy="28" r="6" fill="currentColor" />
            <circle cx="28" cy="28" r="6" fill="currentColor" />
        </svg>
    )

    return (
        <div className="flex gap-2 h-[84px]">
            {/* Panel 1: Current Image Tile */}
            <div
                className="w-[96px] h-full rounded-lg overflow-hidden shrink-0 relative cursor-pointer group"
                style={{ backgroundColor: '#E0F2FE' }}
                onMouseEnter={() => setIsCurrentHovered(true)}
                onMouseLeave={() => setIsCurrentHovered(false)}
                onClick={handleSaveToLibrary}
            >
                {value ? (
                    <>
                        {isSvg ? (
                            <div className="w-full h-full flex items-center justify-center p-3">
                                <img
                                    src={value}
                                    alt="Current"
                                    className="w-full h-full object-contain"
                                    style={{ filter: 'brightness(0) saturate(100%)' }}
                                />
                            </div>
                        ) : (
                            <img
                                src={value}
                                alt="Current"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <CurrentImageIcon />
                    </div>
                )}

                {/* Hover state - "Save to library" */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCurrentHovered ? 1 : 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#E0F2FE]"
                >
                    <div className="text-slate-700">
                        <CurrentImageIcon />
                    </div>
                    <span className="text-[10px] text-slate-700 mt-1 font-medium">
                        Save to library
                    </span>
                </motion.div>
            </div>

            {/* Panel 2: Dropzone */}
            <div {...getRootProps()} className="flex-1 h-full">
                <motion.div
                    animate={{
                        scale: isDragging ? 1.02 : 1,
                        borderColor: isDragging ? '#60a5fa' : '#475569',
                    }}
                    transition={springConfig}
                    className="w-full h-full bg-surface-alt hover:bg-slate-600 border border-dashed border-border-subtle rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
                    onClick={open}
                >
                    <input {...getInputProps()} />
                    <motion.div
                        animate={{
                            y: isDragging ? -4 : 0,
                            scale: isDragging ? 1.1 : 1,
                        }}
                        transition={springConfig}
                    >
                        <CloudUpload className="w-5 h-5 text-text-secondary" />
                    </motion.div>
                    <p className="text-xs text-text-secondary text-center mt-1 whitespace-pre-line">
                        {isDragging ? 'Drop here...' : 'Drop image or\nclick to browse'}
                    </p>
                </motion.div>
            </div>

            {/* Panel 3: Library Button */}
            <LibraryButton onClick={onOpenLibrary} />
        </div>
    )
}

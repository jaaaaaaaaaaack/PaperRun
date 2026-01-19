import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useShaderStore, type LibraryImage } from '../store'

interface ImageLibraryPanelProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (data: string) => void
}

const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 }

export function ImageLibraryPanel({ isOpen, onSelect }: ImageLibraryPanelProps) {
    const libraryImages = useShaderStore((s) => s.libraryImages)
    const deleteLibraryImage = useShaderStore((s) => s.deleteLibraryImage)

    const handleSelect = (image: LibraryImage) => {
        onSelect(image.data)
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        await deleteLibraryImage(id)
    }

    return (
        <motion.div
            initial={false}
            animate={{ width: isOpen ? 216 : 0 }}
            transition={springConfig}
            className="h-full shrink-0 overflow-hidden"
        >
            <motion.aside
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={springConfig}
                className="h-full bg-surface rounded-2xl overflow-hidden flex flex-col w-[216px]"
            >
                    {/* Content */}
                    <div className="flex-1 overflow-auto p-3">
                        {libraryImages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
                                <p className="text-xs text-center">No images saved yet</p>
                                <p className="text-[10px] mt-1 text-center opacity-70">
                                    Upload images to save them here
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {libraryImages.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => handleSelect(image)}
                                        className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-info border border-border-subtle hover:border-slate-200 transition-colors"
                                    >
                                        {image.type === 'svg' ? (
                                            <div className="w-full h-full bg-surface flex items-center justify-center p-2">
                                                <img
                                                    src={image.data}
                                                    alt={image.name}
                                                    className="w-full h-full object-contain"
                                                    style={{ filter: 'brightness(0) invert(1)' }}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                src={image.data}
                                                alt={image.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {/* Delete button on hover - bottom right corner */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                                            <button
                                                onClick={(e) => handleDelete(e, image.id)}
                                                className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 w-6 h-6 bg-error rounded-full flex items-center justify-center transition-opacity"
                                            >
                                                <Trash2 className="w-3 h-3 text-white" />
                                            </button>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.aside>
        </motion.div>
    )
}

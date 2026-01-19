import { X, Trash2 } from 'lucide-react'
import { useShaderStore, type LibraryImage } from '../store'

interface ImageLibraryProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (data: string) => void
}

export function ImageLibrary({ isOpen, onClose, onSelect }: ImageLibraryProps) {
    const libraryImages = useShaderStore((s) => s.libraryImages)
    const deleteLibraryImage = useShaderStore((s) => s.deleteLibraryImage)

    if (!isOpen) return null

    const handleSelect = (image: LibraryImage) => {
        onSelect(image.data)
        onClose()
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        await deleteLibraryImage(id)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-surface rounded-xl w-[480px] max-h-[80vh] flex flex-col shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                    <h2 className="text-lg font-semibold text-text-primary">Image Library</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-alt transition-colors"
                    >
                        <X className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {libraryImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
                            <p className="text-sm">No images saved yet</p>
                            <p className="text-xs mt-1">Upload images to save them here</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-3">
                            {libraryImages.map((image) => (
                                <button
                                    key={image.id}
                                    onClick={() => handleSelect(image)}
                                    className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-info"
                                >
                                    {image.type === 'svg' ? (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center p-2">
                                            <img
                                                src={image.data}
                                                alt={image.name}
                                                className="w-full h-full object-contain [&>*]:stroke-slate-500 [&>*]:fill-slate-500 group-hover:[&>*]:stroke-slate-200"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={image.data}
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <button
                                            onClick={(e) => handleDelete(e, image.id)}
                                            className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-error rounded-full flex items-center justify-center transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    {/* Border */}
                                    <div className="absolute inset-0 rounded-lg border border-slate-500 group-hover:border-slate-200 pointer-events-none transition-colors" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

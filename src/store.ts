import { create } from 'zustand'
import {
    type Preset,
    type LibraryImage,
    getPresets,
    savePreset as dbSavePreset,
    deletePreset as dbDeletePreset,
    getImages,
    saveImage as dbSaveImage,
    deleteImage as dbDeleteImage,
} from './lib/db'
import { captureCanvas } from './lib/canvas-capture'
import { parseShaderCode } from './lib/code-parser'

export type CanvasBg = 'checkered' | 'black' | 'white'
export type ViewMode = 'playground' | 'experiments'

export type { Preset, LibraryImage }

export interface CanvasSize {
    width: number
    height: number
    label: string
}

export const sizePresets = [
    { label: 'FHD', width: 1920, height: 1080 },
    { label: 'HD', width: 1280, height: 720 },
    { label: 'Square', width: 1080, height: 1080 },
    { label: 'Portrait', width: 1080, height: 1920 },
    { label: 'Banner', width: 1920, height: 400 },
]

interface ShaderStore {
    activeShader: string
    values: Record<string, unknown>
    setActiveShader: (shader: string) => void
    setValues: (values: Record<string, unknown>) => void
    canvasSize: { width: number; height: number; label: string }
    setCanvasSize: (size: { width: number; height: number; label: string }) => void
    canvasBg: CanvasBg
    setCanvasBg: (bg: CanvasBg) => void
    view: ViewMode
    setView: (view: ViewMode) => void
    activeExperiment: string
    setActiveExperiment: (experiment: string) => void
    // Sidebar state
    isShaderSidebarOpen: boolean
    isLibrarySidebarOpen: boolean
    toggleShaderSidebar: () => void
    toggleLibrarySidebar: () => void
    closeAllSidebars: () => void
    // Presets
    presets: Preset[]
    loadPresets: () => Promise<void>
    addPreset: (name: string) => Promise<Preset | null>
    deletePreset: (id: string) => Promise<void>
    applyPreset: (preset: Preset) => void
    applyPastedCode: (code: string) => boolean
    // Library images
    libraryImages: LibraryImage[]
    loadLibraryImages: () => Promise<void>
    addLibraryImage: (data: string, name: string) => Promise<LibraryImage>
    deleteLibraryImage: (id: string) => Promise<void>
}

export const useShaderStore = create<ShaderStore>((set, get) => ({
    activeShader: 'mesh-gradient',
    values: {},
    setActiveShader: (activeShader) => set({ activeShader, values: {} }),
    setValues: (values) => set({ values }),
    canvasSize: sizePresets[0],
    setCanvasSize: (canvasSize) => set({ canvasSize }),
    canvasBg: 'checkered',
    setCanvasBg: (canvasBg) => set({ canvasBg }),
    view: 'playground',
    setView: (view) => set({ view }),
    activeExperiment: 'heatmap-interact',
    setActiveExperiment: (activeExperiment) => set({ activeExperiment }),

    // Sidebar state
    isShaderSidebarOpen: false,
    isLibrarySidebarOpen: false,
    toggleShaderSidebar: () => set((state) => ({
        isShaderSidebarOpen: !state.isShaderSidebarOpen,
        isLibrarySidebarOpen: false
    })),
    toggleLibrarySidebar: () => set((state) => ({
        isLibrarySidebarOpen: !state.isLibrarySidebarOpen,
        isShaderSidebarOpen: false
    })),
    closeAllSidebars: () => set({ isShaderSidebarOpen: false, isLibrarySidebarOpen: false }),

    // Presets
    presets: [],
    loadPresets: async () => {
        const presets = await getPresets()
        set({ presets })
    },
    addPreset: async (name: string) => {
        const { activeShader, values } = get()
        const thumbnail = await captureCanvas()
        if (!thumbnail) {
            console.warn('Failed to capture canvas for preset')
            return null
        }
        const preset = await dbSavePreset(name, activeShader, values, thumbnail)
        set((state) => ({ presets: [preset, ...state.presets] }))
        return preset
    },
    deletePreset: async (id: string) => {
        await dbDeletePreset(id)
        set((state) => ({ presets: state.presets.filter((p) => p.id !== id) }))
    },
    applyPreset: (preset: Preset) => {
        set({ activeShader: preset.shader, values: preset.values })
    },
    applyPastedCode: (code: string) => {
        const parsed = parseShaderCode(code)
        if (!parsed) return false
        set({ activeShader: parsed.shader, values: parsed.values })
        return true
    },

    // Library images
    libraryImages: [],
    loadLibraryImages: async () => {
        const libraryImages = await getImages()
        set({ libraryImages })
    },
    addLibraryImage: async (data: string, name: string) => {
        const image = await dbSaveImage(data, name)
        set((state) => ({ libraryImages: [image, ...state.libraryImages] }))
        return image
    },
    deleteLibraryImage: async (id: string) => {
        await dbDeleteImage(id)
        set((state) => ({ libraryImages: state.libraryImages.filter((i) => i.id !== id) }))
    },
}))

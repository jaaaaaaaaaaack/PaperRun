import { create } from 'zustand'

export type CanvasBg = 'checkered' | 'black' | 'white'

export interface CanvasSize {
    width: number
    height: number
    label: string
}

export const sizePresets: CanvasSize[] = [
    { width: 375, height: 667, label: 'Mobile' },
    { width: 768, height: 1024, label: 'Tablet' },
    { width: 1280, height: 720, label: 'Desktop' },
    { width: 800, height: 800, label: 'Square' },
]

interface ShaderState {
    activeShader: string
    values: Record<string, unknown>
    canvasSize: CanvasSize
    canvasBg: CanvasBg
    setActiveShader: (shader: string, initialValues?: Record<string, unknown>) => void
    setValues: (values: Record<string, unknown>) => void
    setCanvasSize: (size: CanvasSize) => void
    setCanvasBg: (bg: CanvasBg) => void
}

export const useShaderStore = create<ShaderState>((set) => ({
    activeShader: 'mesh-gradient',
    values: {},
    canvasSize: sizePresets[2], // Desktop default
    canvasBg: 'checkered',
    setActiveShader: (shader, initialValues = {}) => set({ activeShader: shader, values: initialValues }),
    setValues: (values) => set({ values }),
    setCanvasSize: (size) => set({ canvasSize: size }),
    setCanvasBg: (bg) => set({ canvasBg: bg }),
}))

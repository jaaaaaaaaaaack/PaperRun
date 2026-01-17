import { create } from 'zustand'

interface ShaderState {
    activeShader: string
    values: Record<string, unknown>
    setActiveShader: (shader: string) => void
    setValues: (values: Record<string, unknown>) => void
}

export const useShaderStore = create<ShaderState>((set) => ({
    activeShader: 'mesh-gradient',
    values: {},
    setActiveShader: (shader) => set({ activeShader: shader, values: {} }),
    setValues: (values) => set({ values }),
}))

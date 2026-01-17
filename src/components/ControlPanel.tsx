import { useControls, Leva } from 'leva'
import { useEffect, useMemo } from 'react'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'
import { useShaderStore } from '../store'
import { ImageUpload } from './ImageUpload'
import { GradientEditor } from './GradientEditor'

export function ControlPanel() {
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const setValues = useShaderStore((s) => s.setValues)
    const currentValues = useShaderStore((s) => s.values)

    const schema = useMemo(() => {
        const baseSchema = { ...shaders[activeShader].schema }
        // Remove custom-handled props from Leva schema
        if ('image' in baseSchema) {
            delete (baseSchema as Record<string, unknown>).image
        }
        if ('colors' in baseSchema) {
            delete (baseSchema as Record<string, unknown>).colors
        }
        return baseSchema
    }, [activeShader])

    const levaValues = useControls(activeShader, schema, [activeShader])

    useEffect(() => {
        // Merge Leva values with custom values (image, colors)
        setValues({ ...currentValues, ...levaValues })
    }, [levaValues, setValues])

    // Check for image prop
    const hasImageProp = 'image' in shaders[activeShader].schema
    const imageValue = (currentValues.image as string) ||
        (shaders[activeShader].schema as Record<string, { value?: string }>).image?.value || ''

    // Check for colors prop
    const hasColorsProp = 'colors' in shaders[activeShader].schema
    const colorsValue = (currentValues.colors as string[]) ||
        (shaders[activeShader].schema as Record<string, { value?: string[] }>).colors?.value || []

    const handleImageChange = (newImage: string) => {
        setValues({ ...currentValues, ...levaValues, image: newImage })
    }

    const handleColorsChange = (newColors: string[]) => {
        setValues({ ...currentValues, ...levaValues, colors: newColors })
    }

    return (
        <aside className="w-80 border-l border-neutral-800 bg-neutral-950 overflow-auto">
            {hasImageProp && (
                <div className="p-3 border-b border-neutral-800">
                    <label className="text-xs text-neutral-400 mb-2 block">Image / Video</label>
                    <ImageUpload value={imageValue} onChange={handleImageChange} />
                </div>
            )}
            {hasColorsProp && (
                <div className="p-3 border-b border-neutral-800">
                    <label className="text-xs text-neutral-400 mb-2 block">Gradient Colors</label>
                    <GradientEditor colors={colorsValue} onChange={handleColorsChange} />
                </div>
            )}
            <Leva flat fill titleBar={false} />
        </aside>
    )
}

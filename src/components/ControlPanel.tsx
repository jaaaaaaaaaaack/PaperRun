import { useControls, Leva } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'
import { useShaderStore } from '../store'
import { ImageUpload } from './ImageUpload'
import { GradientEditor } from './GradientEditor'

export function ControlPanel() {
    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const setValues = useShaderStore((s) => s.setValues)
    const currentValues = useShaderStore((s) => s.values)

    const config = shaders[activeShader] || shaders['mesh-gradient']

    const schema = useMemo(() => {
        // Hydrate schema with current values from store (which might be pasted values)
        // We need a deep clone/merge to avoid mutating the static config and to ensure Leva picks up the new 'value'
        const baseSchema: Record<string, any> = { ...config.schema }

        // Create a new schema object where values are updated from the store
        const hydratedSchema: Record<string, any> = {}

        Object.keys(baseSchema).forEach(key => {
            // Skip image and colors as they are custom handled
            if (key === 'image' || key === 'colors') return

            const item = baseSchema[key]
            // If the store has a value for this prop, use it as the default for this fresh mount
            if (currentValues[key] !== undefined) {
                hydratedSchema[key] = { ...item, value: currentValues[key] }
            } else {
                hydratedSchema[key] = item
            }
        })

        return hydratedSchema
    }, [activeShader, config]) // eslint-disable-line react-hooks/exhaustive-deps

    const levaValues = useControls(activeShader, schema, [activeShader])

    // Check for image prop
    const hasImageProp = 'image' in config.schema
    const defaultImage = (config.schema as Record<string, { value?: string }>).image?.value || ''
    const imageValue = (currentValues.image as string) ?? defaultImage

    // Check for colors prop
    const hasColorsProp = 'colors' in config.schema
    const defaultColors = (config.schema as Record<string, { value?: string[] }>).colors?.value || []
    const colorsValue = (currentValues.colors as string[]) ?? defaultColors

    // Keep track of latest custom values to avoid stale closures in useEffect
    // without causing infinite loops by adding currentValues to dependency array
    const customValuesRef = useRef({ image: imageValue, colors: colorsValue })
    customValuesRef.current = { image: imageValue, colors: colorsValue }

    useEffect(() => {
        // Merge Leva values with latest custom values
        setValues({
            ...levaValues,
            image: customValuesRef.current.image,
            colors: customValuesRef.current.colors
        })
    }, [levaValues, setValues])

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

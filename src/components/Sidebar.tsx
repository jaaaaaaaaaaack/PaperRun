import { useEffect, useMemo, useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { shaders } from '../shaders'
import type { ShaderKey } from '../shaders'
import { useShaderStore } from '../store'
import { ImageUpload } from './ImageUpload'
import { ImageLibraryPanel } from './ImageLibraryPanel'
import { GradientEditor } from './GradientEditor'
import { PresetsCarousel } from './PresetsCarousel'
import { ShaderRange, ShaderColorPicker } from './controls'
import { ShaderSelector } from './ShaderSelector'
import { ShaderSidebar } from './ShaderSidebar'
import { generateReactCode } from '../lib/code-generator'

interface SchemaItem {
    value: unknown
    min?: number
    max?: number
    step?: number
}

function formatLabel(key: string): string {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
}

function formatShaderName(key: string): string {
    return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export function Sidebar() {
    const [copiedAll, setCopiedAll] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
    const setActiveShader = useShaderStore((s) => s.setActiveShader)
    const setValues = useShaderStore((s) => s.setValues)
    const currentValues = useShaderStore((s) => s.values)
    const addPreset = useShaderStore((s) => s.addPreset)
    const applyPastedCode = useShaderStore((s) => s.applyPastedCode)
    const isShaderSidebarOpen = useShaderStore((s) => s.isShaderSidebarOpen)
    const isLibraryOpen = useShaderStore((s) => s.isLibrarySidebarOpen)
    const toggleShaderSidebar = useShaderStore((s) => s.toggleShaderSidebar)
    const toggleLibrarySidebar = useShaderStore((s) => s.toggleLibrarySidebar)
    const closeAllSidebars = useShaderStore((s) => s.closeAllSidebars)

    const config = shaders[activeShader] || shaders['mesh-gradient']
    const schema = config.schema as Record<string, SchemaItem>

    // Check for image prop
    const hasImageProp = 'image' in schema
    const defaultImage = (schema.image?.value as string) || ''
    const imageValue = (currentValues.image as string) ?? defaultImage

    // Check for colors prop
    const hasColorsProp = 'colors' in schema
    const defaultColors = (schema.colors?.value as string[]) || []
    const colorsValue = (currentValues.colors as string[]) ?? defaultColors

    // Get numeric and color properties (excluding image and colors)
    const controlProps = useMemo(() => {
        return Object.entries(schema).filter(
            ([key]) => key !== 'image' && key !== 'colors'
        )
    }, [schema])

    // Initialize values from schema defaults when shader changes
    useEffect(() => {
        const initialValues: Record<string, unknown> = {}
        Object.entries(schema).forEach(([key, item]) => {
            if (currentValues[key] === undefined) {
                initialValues[key] = item.value
            }
        })
        if (Object.keys(initialValues).length > 0) {
            setValues({ ...currentValues, ...initialValues })
        }
    }, [activeShader]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleValueChange = (key: string, value: unknown) => {
        setValues({ ...currentValues, [key]: value })
    }

    const handleImageChange = (newImage: string) => {
        setValues({ ...currentValues, image: newImage })
    }

    const handleColorsChange = (newColors: string[]) => {
        setValues({ ...currentValues, colors: newColors })
    }

    const code = generateReactCode(activeShader, currentValues)

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(code)
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
    }

    const handleSavePreset = async () => {
        setIsSaving(true)
        const name = `${formatShaderName(activeShader)} Preset`
        await addPreset(name)
        setIsSaving(false)
    }

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            const success = applyPastedCode(clipboardText)
            if (!success) {
                console.warn('Failed to parse clipboard content as shader code')
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err)
        }
    }

    const renderControl = (key: string, item: SchemaItem) => {
        const currentValue = currentValues[key] ?? item.value

        // Check if it's a color (hex string starting with #)
        if (
            typeof item.value === 'string' &&
            item.value.startsWith('#') &&
            item.min === undefined
        ) {
            return (
                <ShaderColorPicker
                    key={key}
                    label={formatLabel(key)}
                    value={currentValue as string}
                    onChange={(v) => handleValueChange(key, v)}
                />
            )
        }

        // Check if it's a number with range
        if (
            typeof item.value === 'number' &&
            item.min !== undefined &&
            item.max !== undefined
        ) {
            const suffix = key.toLowerCase().includes('angle') ? '°' : ''
            return (
                <ShaderRange
                    key={key}
                    label={formatLabel(key)}
                    value={currentValue as number}
                    min={item.min}
                    max={item.max}
                    step={item.step || 0.01}
                    onChange={(v) => handleValueChange(key, v)}
                    suffix={suffix}
                />
            )
        }

        return null
    }

    const handleLibrarySelect = (data: string) => {
        handleImageChange(data)
        closeAllSidebars()
    }

    return (
        <div className="flex gap-1 h-full">
        <aside className="w-[375px] h-full bg-surface rounded-2xl overflow-auto flex flex-col gap-6 p-4">
            {/* Shader Selector Button */}
            <ShaderSelector
                shaderKey={activeShader}
                onClick={toggleShaderSidebar}
            />

            {/* Presets Carousel */}
            <PresetsCarousel onSavePreset={handleSavePreset} isSaving={isSaving} />

            {/* Image Source Section */}
            {hasImageProp && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-[13px] font-bold text-text-primary uppercase tracking-wide">
                        Image Source
                    </h3>
                    <ImageUpload
                        value={imageValue}
                        onChange={handleImageChange}
                        onOpenLibrary={toggleLibrarySidebar}
                    />
                </div>
            )}

            {/* Gradient Section */}
            {hasColorsProp && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-[13px] font-bold text-text-primary uppercase tracking-wide">
                        Gradient
                    </h3>
                    <GradientEditor colors={colorsValue} onChange={handleColorsChange} />
                </div>
            )}

            {/* Properties Section */}
            {controlProps.length > 0 && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-[13px] font-bold text-text-primary uppercase tracking-wide">
                        Properties
                    </h3>
                    <div className="flex flex-col gap-3">
                        {controlProps.map(([key, item]) => renderControl(key, item))}
                    </div>
                </div>
            )}

            {/* Code Section */}
            <div className="flex flex-col gap-2">
                <h3 className="text-[13px] font-bold text-text-primary uppercase tracking-wide">
                    Code
                </h3>
                <div className="bg-surface-alt rounded-xl p-2 overflow-auto max-h-[200px]">
                    <Highlight theme={themes.nightOwl} code={code} language="tsx">
                        {({ tokens, getLineProps, getTokenProps }) => (
                            <pre className="text-[13px] font-mono text-text-secondary whitespace-pre-wrap break-all">
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">
                <button
                    onClick={handleCopyAll}
                    className="flex-1 bg-surface-alt hover:bg-slate-600 transition-colors rounded-lg px-4 py-3.5"
                >
                    <span className="text-sm text-text-muted">
                        {copiedAll ? 'Copied!' : 'Copy code'}
                    </span>
                </button>
                <button
                    onClick={handlePaste}
                    className="bg-surface-alt hover:bg-slate-600 transition-colors rounded-lg px-4 py-3.5"
                >
                    <span className="text-sm text-text-muted">Paste</span>
                </button>
            </div>
        </aside>

        {/* Shader Selection Panel */}
        <ShaderSidebar
            isOpen={isShaderSidebarOpen}
            onClose={closeAllSidebars}
            onSelect={setActiveShader}
            currentShader={activeShader}
        />

        {/* Library Panel - Sidebar extension, not modal */}
        <ImageLibraryPanel
            isOpen={isLibraryOpen}
            onClose={closeAllSidebars}
            onSelect={handleLibrarySelect}
        />
        </div>
    )
}

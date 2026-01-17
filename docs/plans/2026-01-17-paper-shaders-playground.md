# Paper Shaders Playground Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a visual configurator for exploring Paper Shaders with real-time Leva controls and code export.

**Architecture:** React + Vite app with 3-panel layout. Leva generates controls from per-shader schemas. Zustand manages active shader state.

**Tech Stack:** Vite, React 18, ShadCN/UI, Leva, Zustand, @paper-design/shaders-react, Prism (syntax highlighting)

---

## Task 1: Project Scaffold

**Files:**
- Create: `src/`, `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`

**Step 1: Initialize Vite + React project**

```bash
cd /Users/jack.howard/Projects/PaperRun
npm create vite@latest . -- --template react-ts --force
```

**Step 2: Install dependencies**

```bash
npm install @paper-design/shaders-react leva zustand prism-react-renderer
npx shadcn@latest init -d
npx shadcn@latest add button select dropdown-menu
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server running at localhost, default Vite page loads.

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold vite + react + deps"
```

---

## Task 2: Layout Shell

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Canvas.tsx`
- Create: `src/components/ControlPanel.tsx`
- Create: `src/components/CodeExport.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Step 1: Create Header component**

```tsx
// src/components/Header.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const shaderOptions = [
  { value: 'mesh-gradient', label: 'Mesh Gradient' },
  { value: 'heatmap', label: 'Heatmap' },
  { value: 'dithering', label: 'Dithering' },
]

interface HeaderProps {
  activeShader: string
  onShaderChange: (value: string) => void
}

export function Header({ activeShader, onShaderChange }: HeaderProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <h1 className="font-semibold">Paper Shaders Playground</h1>
      <Select value={activeShader} onValueChange={onShaderChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select shader" />
        </SelectTrigger>
        <SelectContent>
          {shaderOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}
```

**Step 2: Create placeholder Canvas component**

```tsx
// src/components/Canvas.tsx
export function Canvas() {
  return (
    <div className="flex-1 bg-neutral-900 flex items-center justify-center">
      <p className="text-neutral-500">Shader canvas placeholder</p>
    </div>
  )
}
```

**Step 3: Create placeholder ControlPanel component**

```tsx
// src/components/ControlPanel.tsx
export function ControlPanel() {
  return (
    <aside className="w-80 border-l bg-neutral-950 p-4">
      <p className="text-neutral-500">Leva controls will appear here</p>
    </aside>
  )
}
```

**Step 4: Create placeholder CodeExport component**

```tsx
// src/components/CodeExport.tsx
export function CodeExport() {
  return (
    <div className="h-48 border-t bg-neutral-950 p-4">
      <p className="text-neutral-500">Code export panel placeholder</p>
    </div>
  )
}
```

**Step 5: Wire up App.tsx with layout**

```tsx
// src/App.tsx
import { useState } from 'react'
import { Header } from './components/Header'
import { Canvas } from './components/Canvas'
import { ControlPanel } from './components/ControlPanel'
import { CodeExport } from './components/CodeExport'

export default function App() {
  const [activeShader, setActiveShader] = useState('mesh-gradient')

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Header activeShader={activeShader} onShaderChange={setActiveShader} />
      <div className="flex-1 flex overflow-hidden">
        <Canvas />
        <ControlPanel />
      </div>
      <CodeExport />
    </div>
  )
}
```

**Step 6: Add base styles to index.css**

```css
/* src/index.css - add after tailwind directives */
html, body, #root {
  height: 100%;
}
```

**Step 7: Verify layout renders**

```bash
npm run dev
```

Expected: 3-panel layout visible with header, canvas area, control sidebar, and code export panel.

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: add layout shell with header and panels"
```

---

## Task 3: Zustand Store + Shader Registry

**Files:**
- Create: `src/store.ts`
- Create: `src/shaders/index.ts`
- Create: `src/shaders/mesh-gradient.ts`
- Create: `src/shaders/heatmap.ts`
- Create: `src/shaders/dithering.ts`

**Step 1: Create Zustand store**

```tsx
// src/store.ts
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
```

**Step 2: Create MeshGradient schema**

```tsx
// src/shaders/mesh-gradient.ts
import { MeshGradient } from '@paper-design/shaders-react'

export const meshGradientConfig = {
  component: MeshGradient,
  schema: {
    colors: {
      value: ['#cc3333', '#cc9933', '#99cc33', '#33cc33'],
    },
    distortion: { value: 0.8, min: 0, max: 1, step: 0.01 },
    swirl: { value: 0.1, min: 0, max: 1, step: 0.01 },
    speed: { value: 1, min: 0, max: 2, step: 0.1 },
    grainMixer: { value: 0, min: 0, max: 1, step: 0.01 },
    grainOverlay: { value: 0, min: 0, max: 1, step: 0.01 },
  },
}
```

**Step 3: Create Heatmap schema**

```tsx
// src/shaders/heatmap.ts
import { Heatmap } from '@paper-design/shaders-react'

export const heatmapConfig = {
  component: Heatmap,
  schema: {
    image: { value: 'https://shaders.paper.design/images/logos/diamond.svg' },
    colors: {
      value: ['#cc3333', '#cc9933', '#99cc33', '#33cc33', '#33cc99', '#3399cc', '#3333cc'],
    },
    colorBack: { value: '#000000' },
    contour: { value: 0.5, min: 0, max: 1, step: 0.01 },
    angle: { value: 0, min: 0, max: 360, step: 1 },
    noise: { value: 0, min: 0, max: 1, step: 0.01 },
    innerGlow: { value: 0.5, min: 0, max: 1, step: 0.01 },
    outerGlow: { value: 0.5, min: 0, max: 1, step: 0.01 },
    speed: { value: 1, min: 0, max: 2, step: 0.1 },
    scale: { value: 0.75, min: 0.1, max: 2, step: 0.05 },
  },
}
```

**Step 4: Create Dithering schema**

```tsx
// src/shaders/dithering.ts
import { Dithering } from '@paper-design/shaders-react'

export const ditheringConfig = {
  component: Dithering,
  schema: {
    colorBack: { value: '#000000' },
    colorFront: { value: '#00b3ff' },
    shape: {
      value: 'sphere',
      options: ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere'],
    },
    type: {
      value: '4x4',
      options: ['random', '2x2', '4x4', '8x8'],
    },
    size: { value: 2, min: 1, max: 8, step: 1 },
    speed: { value: 1, min: 0, max: 2, step: 0.1 },
    scale: { value: 0.6, min: 0.1, max: 2, step: 0.05 },
  },
}
```

**Step 5: Create shader registry**

```tsx
// src/shaders/index.ts
import { meshGradientConfig } from './mesh-gradient'
import { heatmapConfig } from './heatmap'
import { ditheringConfig } from './dithering'

export const shaders = {
  'mesh-gradient': meshGradientConfig,
  'heatmap': heatmapConfig,
  'dithering': ditheringConfig,
} as const

export type ShaderKey = keyof typeof shaders
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add zustand store and shader registry"
```

---

## Task 4: Leva Integration

**Files:**
- Modify: `src/components/ControlPanel.tsx`
- Modify: `src/components/Canvas.tsx`
- Modify: `src/App.tsx`

**Step 1: Wire Leva controls to shader schema**

```tsx
// src/components/ControlPanel.tsx
import { useControls, Leva } from 'leva'
import { useEffect, useMemo } from 'react'
import { shaders, ShaderKey } from '../shaders'
import { useShaderStore } from '../store'

export function ControlPanel() {
  const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
  const setValues = useShaderStore((s) => s.setValues)
  
  const schema = useMemo(() => shaders[activeShader].schema, [activeShader])
  
  const values = useControls(activeShader, schema, [activeShader])
  
  useEffect(() => {
    setValues(values)
  }, [values, setValues])

  return (
    <aside className="w-80 border-l bg-neutral-950">
      <Leva flat fill titleBar={false} />
    </aside>
  )
}
```

**Step 2: Render shader component in Canvas**

```tsx
// src/components/Canvas.tsx
import { useShaderStore } from '../store'
import { shaders, ShaderKey } from '../shaders'

export function Canvas() {
  const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
  const values = useShaderStore((s) => s.values)
  
  const ShaderComponent = shaders[activeShader].component

  return (
    <div className="flex-1 bg-neutral-900 relative">
      <ShaderComponent
        style={{ width: '100%', height: '100%' }}
        {...values}
      />
    </div>
  )
}
```

**Step 3: Update App to use store**

```tsx
// src/App.tsx
import { Header } from './components/Header'
import { Canvas } from './components/Canvas'
import { ControlPanel } from './components/ControlPanel'
import { CodeExport } from './components/CodeExport'
import { useShaderStore } from './store'

export default function App() {
  const activeShader = useShaderStore((s) => s.activeShader)
  const setActiveShader = useShaderStore((s) => s.setActiveShader)

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Header activeShader={activeShader} onShaderChange={setActiveShader} />
      <div className="flex-1 flex overflow-hidden">
        <Canvas />
        <ControlPanel />
      </div>
      <CodeExport />
    </div>
  )
}
```

**Step 4: Verify shader renders with working controls**

```bash
npm run dev
```

Expected: MeshGradient renders. Tweaking Leva sliders updates shader in real-time. Switching shaders in dropdown loads correct schema.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: integrate leva controls with shader rendering"
```

---

## Task 5: Code Export Panel

**Files:**
- Modify: `src/components/CodeExport.tsx`
- Create: `src/lib/code-generator.ts`

**Step 1: Create code generator utility**

```tsx
// src/lib/code-generator.ts
import { ShaderKey } from '../shaders'

const shaderNames: Record<ShaderKey, string> = {
  'mesh-gradient': 'MeshGradient',
  'heatmap': 'Heatmap',
  'dithering': 'Dithering',
}

export function generateReactCode(shader: ShaderKey, values: Record<string, unknown>): string {
  const name = shaderNames[shader]
  const props = Object.entries(values)
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return `  ${key}={${JSON.stringify(val)}}`
      }
      if (typeof val === 'string') {
        return `  ${key}="${val}"`
      }
      return `  ${key}={${val}}`
    })
    .join('\n')

  return `<${name}\n${props}\n/>`
}
```

**Step 2: Wire up CodeExport component**

```tsx
// src/components/CodeExport.tsx
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Button } from '@/components/ui/button'
import { useShaderStore } from '../store'
import { generateReactCode } from '../lib/code-generator'
import { ShaderKey } from '../shaders'

export function CodeExport() {
  const [copied, setCopied] = useState(false)
  const activeShader = useShaderStore((s) => s.activeShader) as ShaderKey
  const values = useShaderStore((s) => s.values)

  const code = generateReactCode(activeShader, values)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-48 border-t bg-neutral-950 p-4 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-neutral-400">React JSX</span>
        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <Highlight theme={themes.nightOwl} code={code} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="text-sm rounded p-2 overflow-x-auto">
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
  )
}
```

**Step 3: Verify code export updates live**

```bash
npm run dev
```

Expected: Code panel shows React JSX for current shader. Moving Leva sliders updates code in real-time. Copy button works.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add live code export with syntax highlighting"
```

---

## Task 6: Canvas Size Presets & Background Toggle

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Canvas.tsx`
- Modify: `src/store.ts`

**Step 1: Extend store with canvas settings**

```tsx
// src/store.ts - add to interface and store
canvasSize: { width: number; height: number }
canvasBg: 'checkered' | 'black' | 'white'
setCanvasSize: (size: { width: number; height: number }) => void
setCanvasBg: (bg: 'checkered' | 'black' | 'white') => void

// In create():
canvasSize: { width: 1280, height: 720 },
canvasBg: 'checkered',
setCanvasSize: (size) => set({ canvasSize: size }),
setCanvasBg: (bg) => set({ canvasBg: bg }),
```

**Step 2: Add presets to Header**

Add dropdown for size presets: Mobile (375×667), Tablet (768×1024), Desktop (1280×720), Square (800×800)

Add toggle for background: Checkered, Black, White

**Step 3: Update Canvas to use settings**

Apply size constraints and background pattern based on store values.

**Step 4: Verify presets work**

```bash
npm run dev
```

Expected: Changing size preset resizes canvas. Background toggle changes canvas backdrop.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add canvas size presets and background toggle"
```

---

## Verification Plan

### Automated Tests

This is a visual/interactive tool, so primary verification is manual browser testing.

### Manual Verification

1. **Dev server**: Run `npm run dev`, confirm app loads at localhost
2. **Shader switching**: Use dropdown to switch between MeshGradient, Heatmap, Dithering — each should render
3. **Leva controls**: Adjust sliders/colors for each shader — canvas updates in real-time at 60fps
4. **Code export**: Verify JSX updates as controls change, copy button works
5. **Canvas presets**: Test size presets (Mobile, Desktop, etc.) and background toggles
6. **Image input (Heatmap)**: Confirm Heatmap image URL prop works

### Build Verification

```bash
npm run build
npm run preview
```

Expected: Production build succeeds, preview serves correctly.

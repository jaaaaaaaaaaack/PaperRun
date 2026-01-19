# UI Overhaul Design Document

**Date**: 2026-01-19
**Status**: Ready for Implementation

## Overview

This document details the UI changes required to align the PaperRun shader playground with the Figma design specifications. The changes involve six main components: Library button, Shader selector, Range sliders, Bottom buttons, and Shader thumbnails.

---

## 1. Library Button

### Current State
Simple button with icon that opens the image library sidebar.

### Target State
An animated button featuring 3 overlapping mini-images that fan out on hover, revealing a "Library" label.

### Specifications

**Container**:
- Size: 96×84px
- Background: `bg-slate-700` (#334155)
- Border radius: 8px
- Overflow: hidden (clips the "Library" text in default state)

**Three Image Cards**:

| Image | Asset | Default | Hover |
|-------|-------|---------|-------|
| Abstract | `/public/Abstract.png` | left: 7px, top: 14px, size: 35px, rotate: -4° | left: -10px, top: 2px, size: 41px, rotate: -6° |
| Landscape | `/public/Landscape.png` | left: 40px, top: 20px, 47×34px, rotate: 4° | left: 53px, top: 8px, 50×36px, rotate: 11° |
| Flower | `/public/Flower.png` | left: 29px, top: 44px, size: 26px, rotate: 3° | left: 25px, top: 20px, size: 33px, rotate: -12° |

**Card Styling**:
- Abstract: White background, rounded corners, subtle shadow
- Landscape: Border (`border-slate-400`), rounded corners, shadow
- Flower: Dark background (`bg-slate-600`), white flower icon, rounded corners

**"Library" Text**:
- Default: `top: 79px` (hidden below container due to overflow-hidden)
- Hover: `top: 57px` (visible)
- Font: 10.945px, `text-slate-200`, centered

**Animation**:
- Type: Spring
- Stiffness: 300
- Damping: 20
- Mass: 1
- Duration: ~500ms
- All elements animate simultaneously

### Implementation Notes
```tsx
// Use Framer Motion for spring animation
import { motion } from 'framer-motion'

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 1
}

// Apply to each animated element
<motion.div
  animate={hovered ? hoverState : defaultState}
  transition={springConfig}
/>
```

---

## 2. Shader Selector

### Current State
Dropdown menu using `<details>` element.

### Target State
A button that opens a sidebar panel for shader selection.

### Selector Button Specifications

**Layout**:
- Full width of sidebar content (343px)
- Height: 54px
- Background: `bg-surface-alt`
- Border radius: rounded-lg
- Padding: 16px

**Content**:
- Left: Shader thumbnail icon (56×42px, rounded)
- Center: Shader name text (e.g., "Heatmap"), font-semibold
- Right: Chevron icon (`>` or `ChevronRight`)

**Interaction**:
- Click opens shader selection sidebar
- Hover: subtle background lighten

### Shader Selection Sidebar Specifications

**Panel**:
- Width: 375px (same as library panel)
- Slides in from left
- Animation: same as library panel (Framer Motion)
- Background: `bg-surface`

**Header**:
- Back arrow button (closes sidebar)
- Title: "Shaders"
- Height: ~54px

**Content Grid**:
- 2 columns
- Gap: 16px (gap-4)
- Padding: 16px

**Grid Item**:
- Thumbnail: 163.5×93px, rounded-lg, overflow-hidden
- Label: Below thumbnail, 24px height, `text-slate-200`
- Hover: Play animation if available
- Click: Select shader, close sidebar

---

## 3. Shader Thumbnails

### Source
Scrape from https://shaders.paper.design/

### Storage Location
`/public/shader-thumbnails/`

### File Naming Convention
- Static: `{shader-key}.png` (e.g., `mesh-gradient.png`)
- Animated: `{shader-key}.mp4` or `{shader-key}.webm`

### Shaders to Scrape
```
mesh-gradient
static-mesh-gradient
static-radial-gradient
grain-gradient
color-panels
simplex-noise
perlin-noise
neuro-noise
voronoi
metaballs
warp
swirl
dot-orbit
dot-grid
waves
spiral
smoke-ring
god-rays
water
liquid-metal
image-dithering
halftone-dots
halftone-cmyk
paper-texture
fluted-glass
pulsing-border
heatmap
dithering
```

### Component Behavior
```tsx
function ShaderThumbnail({ shaderKey }: { shaderKey: string }) {
  const [hovered, setHovered] = useState(false)
  const hasAnimation = ANIMATED_SHADERS.includes(shaderKey)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-lg overflow-hidden"
    >
      {hovered && hasAnimation ? (
        <video
          src={`/shader-thumbnails/${shaderKey}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={`/shader-thumbnails/${shaderKey}.png`}
          alt={shaderKey}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
```

---

## 4. Range Sliders

### Current State
Custom styled range inputs.

### Target State
DaisyUI range component with custom colors matching Figma design.

### Specifications

**DaisyUI Classes**:
```html
<input type="range" class="range range-md" />
```

**Custom CSS Variables**:
```css
.range {
  --range-bg: theme('colors.slate.600');      /* Track background */
  --range-thumb: theme('colors.slate.400');   /* Thumb color */
  /* --range-fill is enabled by default for filled portion */
}
```

**Layout per Property Row**:
- Total width: 343px
- Label: left-aligned, ~91px width
- Range input: middle, 190px width
- Value display: right-aligned, 46px width, monospace font

**Property Row Structure**:
```tsx
<div className="flex items-center gap-2">
  <label className="w-[91px] text-sm text-text-secondary">{label}</label>
  <input
    type="range"
    className="range range-md flex-1"
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={onChange}
  />
  <span className="w-[46px] text-right text-sm font-mono text-text-secondary">
    {formattedValue}
  </span>
</div>
```

---

## 5. Bottom Buttons

### Current State
- 2 buttons: "Copy code", "Save preset"
- Sticky positioning (overlapping code area)

### Target State
- 3 buttons: "Save preset", "Copy code", "Paste"
- Normal flow (not sticky) - at natural bottom of sidebar scroll

### Specifications

**Layout**:
- 3 buttons in a row with gap
- Container padding: 16px
- Button height: 48px

**Button Styling**:
```html
<button class="btn btn-ghost bg-surface-alt border border-border-subtle hover:bg-slate-600">
  <Icon /> Label
</button>
```

**Buttons**:
| Button | Icon | Width | Action |
|--------|------|-------|--------|
| Save preset | Star | 138px | Save current settings as preset |
| Copy code | Copy | 103px | Copy JSX code to clipboard |
| Paste | Clipboard | 69px | Parse clipboard, apply settings |

**Hover Effect**:
- Subtle background lighten
- Transition: 150ms

### Paste Functionality

**Input Format** (from Copy):
```jsx
<MeshGradient
  colors={["#cc3333","#cc9933"]}
  distortion={0.8}
  swirl={0.1}
/>
```

**Parser Logic**:
```typescript
function parseShaderCode(code: string): { shader: ShaderKey, values: Record<string, unknown> } | null {
  // 1. Extract component name: <ComponentName
  const nameMatch = code.match(/<(\w+)/)
  if (!nameMatch) return null

  // 2. Map component name to shader key
  const shaderKey = componentNameToShaderKey(nameMatch[1])
  if (!shaderKey) return null

  // 3. Extract props using regex
  const props: Record<string, unknown> = {}
  const propRegex = /(\w+)=\{([^}]+)\}/g
  let match
  while ((match = propRegex.exec(code)) !== null) {
    const [, key, value] = match
    try {
      props[key] = JSON.parse(value)
    } catch {
      props[key] = value
    }
  }

  return { shader: shaderKey, values: props }
}
```

---

## 6. Sidebar Structure Changes

### Current Structure
```
Sidebar (sticky buttons)
├── Shader Dropdown
├── Presets Carousel
├── Image Source (3-panel)
├── Properties (sliders)
├── Code Display
└── Buttons (sticky at bottom)
```

### Target Structure
```
Sidebar (scrollable, buttons in flow)
├── Shader Selector Button → opens ShaderSidebar
├── Presets Carousel
├── Image Source (3-panel with new Library button)
├── Gradient (if applicable)
├── Properties (DaisyUI range sliders)
├── Code Display
└── Buttons (in normal flow, not sticky)

ShaderSidebar (overlay panel)
├── Header (back button + title)
└── 2-column grid of shader thumbnails

LibrarySidebar (existing, unchanged)
├── Header
└── 2-column grid of user images
```

---

## Implementation Order

1. **Scrape shader thumbnails** - Get all assets first
2. **Range sliders** - Switch to DaisyUI, quick win
3. **Bottom buttons** - Remove sticky, add Paste, restyle
4. **Shader selector + sidebar** - Replace dropdown with new components
5. **Library button** - Complex animation, do last

---

## Files to Modify/Create

### Modify
- `/src/components/Sidebar.tsx` - Main sidebar restructure
- `/src/components/ImageLibraryPanel.tsx` - May need adjustment
- `/src/index.css` - DaisyUI range customization
- `/src/store.ts` - Add paste action

### Create
- `/src/components/LibraryButton.tsx` - Animated library button
- `/src/components/ShaderSelector.tsx` - Button that opens sidebar
- `/src/components/ShaderSidebar.tsx` - Shader selection panel
- `/src/components/ShaderThumbnail.tsx` - Thumbnail with hover video
- `/src/lib/code-parser.ts` - Parse JSX for paste functionality
- `/public/shader-thumbnails/` - Scraped assets directory

---

## Design Tokens Reference

```css
/* Colors used throughout */
--color-surface: #1e293b;        /* slate-800 */
--color-surface-alt: #334155;    /* slate-700 */
--color-border-subtle: #475569;  /* slate-600 */
--color-text-primary: #f1f5f9;   /* slate-100 */
--color-text-secondary: #94a3b8; /* slate-400 */

/* Spacing */
--sidebar-width: 375px;
--sidebar-padding: 16px;
--content-width: 343px;          /* 375 - 32 padding */
```

---

## Acceptance Criteria

- [ ] Library button shows 3 images with spring hover animation
- [ ] "Library" text slides up from bottom on hover
- [ ] Shader selector button opens sidebar (not dropdown)
- [ ] Shader sidebar shows 2-column grid with thumbnails
- [ ] Thumbnails play video on hover (where available)
- [ ] Range sliders use DaisyUI styling with custom colors
- [ ] Bottom buttons are not sticky, include Paste button
- [ ] Paste correctly parses JSX and applies settings
- [ ] All hover states have subtle transitions

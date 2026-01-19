# UI Overhaul Implementation Tasks

**Related Design Doc**: `2026-01-19-ui-overhaul-design.md`

---

## Phase 1: Scrape Shader Thumbnails

### Task 1.1: Extract thumbnails from Paper Shaders website
- [ ] Visit https://shaders.paper.design/
- [ ] For each shader, extract:
  - Static thumbnail (PNG/JPG)
  - Hover animation video (MP4/WebM) if available
- [ ] Save to `/public/shader-thumbnails/{shader-key}.png` and `.mp4`

### Shader Keys to Scrape
```
mesh-gradient, static-mesh-gradient, static-radial-gradient, grain-gradient,
color-panels, simplex-noise, perlin-noise, neuro-noise, voronoi, metaballs,
warp, swirl, dot-orbit, dot-grid, waves, spiral, smoke-ring, god-rays,
water, liquid-metal, image-dithering, halftone-dots, halftone-cmyk,
paper-texture, fluted-glass, pulsing-border, heatmap, dithering
```

### Task 1.2: Create shader thumbnail manifest
- [ ] Create `/src/lib/shader-thumbnails.ts`
- [ ] Export list of which shaders have animations
- [ ] Export helper to get thumbnail/video URLs

---

## Phase 2: Range Sliders

### Task 2.1: Add DaisyUI range CSS customization
- [ ] Edit `/src/index.css`
- [ ] Add custom CSS variables for range component:
```css
.range {
  --range-bg: theme('colors.slate.600');
  --range-thumb: theme('colors.slate.400');
}
```

### Task 2.2: Update Sidebar.tsx slider rendering
- [ ] Find current slider implementation in Sidebar.tsx
- [ ] Replace with DaisyUI `range range-md` class
- [ ] Update layout: label (91px) | range (flex-1) | value (46px)
- [ ] Ensure value displays are right-aligned, monospace

---

## Phase 3: Bottom Buttons

### Task 3.1: Remove sticky positioning
- [ ] In Sidebar.tsx, find the buttons container
- [ ] Remove `sticky`, `bottom-0`, or any fixed positioning
- [ ] Ensure buttons are in normal document flow at bottom of scroll

### Task 3.2: Add Paste button
- [ ] Add third button: "Paste" with Clipboard icon
- [ ] Layout: Save preset | Copy code | Paste

### Task 3.3: Restyle buttons to DaisyUI
- [ ] Apply classes: `btn btn-ghost bg-surface-alt border border-border-subtle`
- [ ] Add hover effect: `hover:bg-slate-600 transition-colors`
- [ ] Icons: Star (save), Copy (copy), ClipboardPaste (paste)

### Task 3.4: Implement paste functionality
- [ ] Create `/src/lib/code-parser.ts`
- [ ] Implement `parseShaderCode(code: string)` function:
  - Extract component name from `<ComponentName`
  - Map to shader key using reverse of `shaderNames` from code-generator.ts
  - Extract props with regex: `(\w+)=\{([^}]+)\}`
  - Parse values with JSON.parse, handle strings
  - Return `{ shader: ShaderKey, values: Record<string, unknown> }` or null
- [ ] Add `applyPastedCode` action to store.ts
- [ ] Wire up Paste button click handler

---

## Phase 4: Shader Selector + Sidebar

### Task 4.1: Create ShaderThumbnail component
- [ ] Create `/src/components/ShaderThumbnail.tsx`
- [ ] Props: `shaderKey: string`, `onClick?: () => void`
- [ ] State: `hovered` boolean
- [ ] Render: img by default, video on hover if animation available
- [ ] Video attributes: `autoPlay loop muted playsInline`

### Task 4.2: Create ShaderSidebar component
- [ ] Create `/src/components/ShaderSidebar.tsx`
- [ ] Props: `isOpen: boolean`, `onClose: () => void`, `onSelect: (shader: ShaderKey) => void`
- [ ] Animation: Framer Motion slide from left (same as ImageLibraryPanel)
- [ ] Header: Back arrow + "Shaders" title
- [ ] Content: 2-column grid (`grid grid-cols-2 gap-4`)
- [ ] Each item: ShaderThumbnail + label below
- [ ] Click item: call `onSelect(shaderKey)` and `onClose()`

### Task 4.3: Create ShaderSelector component
- [ ] Create `/src/components/ShaderSelector.tsx`
- [ ] Replaces the current dropdown in Sidebar
- [ ] Layout: thumbnail (56×42) | shader name | chevron
- [ ] Click: opens ShaderSidebar
- [ ] Needs to manage `isShaderSidebarOpen` state (or lift to parent)

### Task 4.4: Integrate into Sidebar.tsx
- [ ] Remove old `<details>` dropdown
- [ ] Add ShaderSelector component
- [ ] Add ShaderSidebar component (rendered alongside LibrarySidebar)
- [ ] Wire up state and handlers

---

## Phase 5: Library Button

### Task 5.1: Create LibraryButton component
- [ ] Create `/src/components/LibraryButton.tsx`
- [ ] Props: `onClick: () => void`
- [ ] State: `hovered` boolean

### Task 5.2: Implement container
- [ ] Size: 96×84px
- [ ] Classes: `bg-slate-700 rounded-lg overflow-hidden relative`

### Task 5.3: Implement the 3 image cards
- [ ] Abstract card (white bg, shadow):
  - Image: `/Abstract.png`
  - Default: `left: 7, top: 14, size: 35, rotate: -4deg`
  - Hover: `left: -10, top: 2, size: 41, rotate: -6deg`
- [ ] Landscape card (bordered):
  - Image: `/Landscape.png`
  - Default: `left: 40, top: 20, w: 47, h: 34, rotate: 4deg`
  - Hover: `left: 53, top: 8, w: 50, h: 36, rotate: 11deg`
- [ ] Flower card (dark bg):
  - Image: `/Flower.png`
  - Default: `left: 29, top: 44, size: 26, rotate: 3deg`
  - Hover: `left: 25, top: 20, size: 33, rotate: -12deg`

### Task 5.4: Implement "Library" text
- [ ] Position: centered horizontally
- [ ] Default: `top: 79px` (hidden below container)
- [ ] Hover: `top: 57px` (visible)
- [ ] Style: `text-[10.945px] text-slate-200`

### Task 5.5: Implement spring animation
- [ ] Use Framer Motion `<motion.div>`
- [ ] Spring config: `{ type: 'spring', stiffness: 300, damping: 20, mass: 1 }`
- [ ] Animate all 4 elements (3 cards + text) with same transition

### Task 5.6: Replace old library button in Sidebar
- [ ] Find current library button in Image Source section
- [ ] Replace with new LibraryButton component
- [ ] Ensure onClick still opens ImageLibraryPanel

---

## Phase 6: Final Polish

### Task 6.1: Test all interactions
- [ ] Library button hover animation smooth
- [ ] Shader selector opens sidebar
- [ ] Shader thumbnails play video on hover
- [ ] Shader selection works and closes sidebar
- [ ] Range sliders have correct styling
- [ ] Paste button parses and applies code
- [ ] Buttons not overlapping code area

### Task 6.2: Fix any visual bugs
- [ ] Check all hover states
- [ ] Verify spacing matches Figma
- [ ] Ensure no z-index conflicts between sidebars

### Task 6.3: Clean up
- [ ] Remove any unused code from old dropdown
- [ ] Remove any test/debug code
- [ ] Verify no console errors

---

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| `/src/components/Sidebar.tsx` | Main sidebar, integrate all components |
| `/src/components/LibraryButton.tsx` | NEW: Animated library button |
| `/src/components/ShaderSelector.tsx` | NEW: Button to open shader sidebar |
| `/src/components/ShaderSidebar.tsx` | NEW: Shader selection panel |
| `/src/components/ShaderThumbnail.tsx` | NEW: Thumbnail with hover video |
| `/src/lib/code-parser.ts` | NEW: Parse JSX for paste |
| `/src/lib/shader-thumbnails.ts` | NEW: Thumbnail URLs + animation list |
| `/src/index.css` | Range slider customization |
| `/src/store.ts` | Add paste action |
| `/public/shader-thumbnails/` | NEW: Scraped thumbnail assets |

---

## Estimated Effort

| Phase | Tasks | Complexity |
|-------|-------|------------|
| Phase 1: Thumbnails | 2 | Medium (scraping) |
| Phase 2: Sliders | 2 | Easy |
| Phase 3: Buttons | 4 | Easy-Medium |
| Phase 4: Shader Sidebar | 4 | Medium |
| Phase 5: Library Button | 6 | Medium-Hard (animation) |
| Phase 6: Polish | 3 | Easy |

Total: ~21 subtasks

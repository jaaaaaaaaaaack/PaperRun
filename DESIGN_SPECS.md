# PaperRun Design Specifications

Extracted from Figma: https://www.figma.com/design/bbKIMFUqEmiInVcPQx5IDM/

## Sidebar Layout (Top to Bottom)

1. **Shader Selector Dropdown**
2. **PRESETS** - Horizontal carousel of thumbnails
3. **IMAGE SOURCE** - 3-panel horizontal layout
4. **GRADIENT** - Gradient bar + dropzone + Browse Coolors
5. **PROPERTIES** - Sliders with labels
6. **CODE** - Code preview
7. **Action Buttons** - Copy code, Save preset

---

## Component Specifications

### Current Image Tile (Panel 1 of Image Source)

**Container:**
- Width: ~96px (based on proportion)
- Height: 84px
- Border-radius: 8px
- Background: Light cyan/blue (#E0F2FE or similar - NOT slate-200)

**Default State:**
- Icon centered (dark, ~40px)
- No text visible

**Hover State:**
- Show "Save to library" text below icon
- Same background color

---

### Dropzone (Panel 2 of Image Source)

**Container:**
- Flex: 1 (fills remaining space)
- Height: 84px
- Border-radius: 8px
- Background: #334155 (surface-alt)
- Border: 1px dashed #475569 (border-subtle)

**Default State:**
- Upload cloud icon centered
- No text

**Hover State:**
- Text: "Drop image or click to browse"
- Same background

---

### Library Tile (Panel 3 of Image Source)

**Container:**
- Width: ~48-60px
- Height: 84px
- Border-radius: 8px
- Overflow: hidden

**Content:**
- Shows preview of last uploaded/selected library image
- Object-fit: cover

**Click Action:**
- Opens Library sidebar panel (NOT a modal)

---

### Library Panel (Sidebar Extension)

**NOT a modal - opens as additional sidebar panel**

**Container:**
- Same styling as main sidebar
- Background: #1e293b (surface)

**Content:**
- Grid of image tiles (4 columns based on design)
- Each tile:
  - Aspect ratio: square or slightly taller
  - Border-radius: 8px
  - For SVG content: Dark background (#1e293b), white/light icon
  - For images: Object-fit cover, full bleed
  - Border: 1px solid #475569 (border-subtle)
  - Hover: Border becomes lighter (#e2e8f0 / slate-200)

---

### Preset Thumbnails

**Container:**
- Width: 80px
- Height: 60px
- Border-radius: 8px
- Overflow: hidden

**Content:**
- Canvas screenshot
- Object-fit: cover

**Hover:**
- Border highlight

---

### Property Sliders

**Layout:**
- Label on left
- Slider in center
- Value on right

**Label:**
- Font: 13px
- Color: text-secondary (#94a3b8)

**Value:**
- Numeric with unit (°, px, etc.) OR hex code
- Right aligned

**Slider Track:**
- Height: 4px
- Background (unfilled): #475569
- Background (filled): #94a3b8

**Slider Thumb:**
- 16px diameter
- Background: #1e293b
- Border: 2px solid #94a3b8

---

### Shader Dropdown

**Current Implementation Issue:** Horizontal scrolling, looks bad

**Fix:** 2-column grid layout
- Each item full width of column
- Max height with scroll
- No horizontal overflow

---

## Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| surface | #1e293b | Main backgrounds |
| surface-alt | #334155 | Card/panel backgrounds |
| border-subtle | #475569 | Default borders |
| border-muted | #64748b | Secondary borders |
| text-primary | #e2e8f0 | Primary text |
| text-secondary | #94a3b8 | Secondary text, icons |
| text-muted | #cbd5e1 | Muted text |
| info | #60a5fa | Focus, links |
| slate-200 | #e2e8f0 | Hover states, light bg |
| cyan-100 | #E0F2FE | Current image tile bg (approx) |

---

## UI Changes Completed

### High Priority (All Complete)
1. [x] Fix Image Source 3-panel layout
2. [x] Fix current image tile (light bg, hover state)
3. [x] Convert Image Library from modal to sidebar
4. [x] Fix shader dropdown to 2-column grid

### Medium Priority (All Complete)
5. [x] Fix preset thumbnail capture (WebGL preserveDrawingBuffer)
6. [x] Add missing shader properties
7. [x] Hide Playground/Experiments top bar

### Lower Priority (All Complete)
8. [x] Improve color picker (popover-based, solid color picker)
9. [x] Improve gradient editor (popover-based, gradient picker)

### Additional Improvements
- [x] Save preset button moved to presets carousel (+ icon)
- [x] Sidebar headers removed for cleaner look
- [x] Click-outside-to-close for sidebars
- [x] Canvas click closes open sidebars
- [x] Toggle behavior for sidebar openers

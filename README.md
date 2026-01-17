# Paper Shaders Playground

A visual configurator for exploring [Paper Shaders](https://shaders.paper.design/) with real-time Leva controls and instant code export.

## Features

- **🎨 Live Shader Preview** — MeshGradient, Heatmap, Dithering with WebGL rendering
- **🎛️ Leva Controls** — Adjust colors, distortion, speed, and more in real-time
- **📋 Code Export** — Auto-generated React JSX with syntax highlighting
- **📐 Canvas Presets** — Mobile, Tablet, Desktop, and Square size options
- **🎭 Background Toggle** — Checkered, black, or white backdrop

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- ShadCN/UI components
- Leva control panel
- Zustand state management
- @paper-design/shaders-react

## Project Structure

```
src/
├── components/     # UI components (Header, Canvas, ControlPanel, CodeExport)
├── shaders/        # Shader configs with Leva schemas
├── lib/            # Utilities (code-generator)
├── store.ts        # Zustand store
└── App.tsx         # Main layout
```

## Adding Shaders

1. Create `src/shaders/[name].ts` with component + Leva schema
2. Register in `src/shaders/index.ts`
3. Add dropdown option in `Header.tsx`
4. Add name mapping in `lib/code-generator.ts`

## License

MIT

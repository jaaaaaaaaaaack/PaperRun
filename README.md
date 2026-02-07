# PaperRun

A personal project.

A visual playground for exploring and customizing [paper-shaders](https://www.npmjs.com/package/paper-shaders) - beautiful WebGL shader components for React.

## Features

- **14+ Shader Effects** - Mesh gradients, metaballs, noise patterns, and more
- **Real-time Preview** - See changes instantly as you adjust parameters
- **Preset System** - Save and load custom shader configurations
- **Image Library** - Upload and manage images for image-based shaders
- **AI Gradient Extraction** - Drop an image to extract gradient colors using Gemini AI
- **Code Export** - Copy React component code with your customizations
- **Code Import** - Paste shader code to load configurations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/PaperRun.git
cd PaperRun

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the project root:

```env
# Optional: Gemini API Key for AI gradient extraction
# Get your key from https://aistudio.google.com/apikey
VITE_GEMINI_API_KEY=your-api-key-here
```

The Gemini API key is optional - the app works without it, but AI gradient extraction from images will be disabled.

## Available Shaders

| Shader | Description |
|--------|-------------|
| Mesh Gradient | Animated flowing mesh gradient |
| Static Mesh Gradient | Non-animated mesh gradient |
| Static Radial Gradient | Radial gradient with customizable colors |
| Grain Gradient | Gradient with film grain texture |
| Color Panels | Animated color panel transitions |
| Simplex Noise | Organic noise patterns |
| Perlin Noise | Classic Perlin noise visualization |
| Neuro Noise | Neural network-inspired patterns |
| Voronoi | Voronoi cell patterns |
| Metaballs | Animated blob-like shapes |
| Warp | Image warping effect |
| Swirl | Swirling animation effect |
| Dot Orbit | Orbiting dot patterns |
| God Rays | Volumetric light rays |
| Heatmap | Heat map visualization |
| Liquid Metal | Metallic reflection effect |

## Usage

### Adjusting Shaders

1. **Select a Shader** - Click the shader selector at the top to browse available shaders
2. **Customize Properties** - Use the sliders to adjust shader parameters
3. **Change Colors** - Click color swatches to open the color picker
4. **Edit Gradients** - Click the gradient bar to modify gradient colors

### Working with Images

Some shaders (Warp, Swirl, Liquid Metal, etc.) accept images:

1. **Upload Image** - Click the dropzone or drag & drop an image
2. **Use Library** - Click the library tile to select from saved images
3. **Save to Library** - Uploaded images are automatically saved

### Presets

- **Save Preset** - Click the `+` button in the presets carousel
- **Load Preset** - Click any preset thumbnail to apply it
- **Presets persist** - Saved using IndexedDB in your browser

### Code Export

The CODE section shows the React component code for your current configuration:

```tsx
<MeshGradient
  colors={["#FFC391", "#E491FF", "#6270C8", "#133B94"]}
  distortion={0.8}
  swirl={0.1}
  speed={1}
/>
```

- **Copy code** - Click "Copy code" to copy to clipboard
- **Paste** - Click "Paste" to import shader code from clipboard

## Development

### Project Structure

```
src/
├── components/         # React components
│   ├── Canvas.tsx     # Main shader preview
│   ├── Sidebar.tsx    # Control panel
│   ├── controls/      # Slider, color picker components
│   └── ...
├── shaders/           # Shader configurations
├── lib/               # Utilities
│   ├── db.ts          # IndexedDB for persistence
│   ├── gemini.ts      # AI gradient extraction
│   └── ...
└── store.ts           # Zustand state management
```

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **DaisyUI** - UI components
- **Zustand** - State management
- **Framer Motion** - Animations
- **paper-shaders** - WebGL shader components

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables if using AI features
4. Deploy

### Manual Build

```bash
npm run build
# Output in dist/ folder
```

## License

MIT

import { useEffect } from 'react'
import { Canvas } from './components/Canvas'
import { Sidebar } from './components/Sidebar'
import { useShaderStore } from './store'

export default function App() {
  const loadPresets = useShaderStore((s) => s.loadPresets)
  const loadLibraryImages = useShaderStore((s) => s.loadLibraryImages)

  useEffect(() => {
    loadPresets()
    loadLibraryImages()
  }, [loadPresets, loadLibraryImages])

  return (
    <div className="h-screen flex bg-base-100 text-base-content p-3 gap-3">
      <Sidebar />
      <Canvas />
    </div>
  )
}

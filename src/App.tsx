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

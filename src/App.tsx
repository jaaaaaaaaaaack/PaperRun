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

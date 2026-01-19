import { motion } from 'framer-motion'
import { shaders, type ShaderKey } from '../shaders'
import { ShaderThumbnail } from './ShaderThumbnail'

interface ShaderSidebarProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (shader: ShaderKey) => void
  currentShader: ShaderKey
}

function formatShaderName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const shaderKeys = Object.keys(shaders) as ShaderKey[]

const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 }

export function ShaderSidebar({ isOpen, onSelect, currentShader }: ShaderSidebarProps) {
  const handleSelect = (shader: ShaderKey) => {
    onSelect(shader)
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 375 : 0 }}
      transition={springConfig}
      className="h-full shrink-0 overflow-hidden"
    >
      <motion.aside
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
        transition={springConfig}
        className="h-full bg-surface rounded-2xl overflow-hidden flex flex-col w-[375px]"
      >
          {/* Content Grid */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-2 gap-4">
              {shaderKeys.map((shaderKey) => (
                <button
                  key={shaderKey}
                  onClick={() => handleSelect(shaderKey)}
                  className={`flex flex-col gap-2 text-left focus:outline-none focus:ring-2 focus:ring-info rounded-lg ${
                    shaderKey === currentShader ? 'ring-2 ring-slate-400' : ''
                  }`}
                >
                  <ShaderThumbnail
                    shaderKey={shaderKey}
                    className="w-full h-[93px]"
                  />
                  <span className="text-sm text-slate-200 h-6 truncate">
                    {formatShaderName(shaderKey)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.aside>
    </motion.div>
  )
}

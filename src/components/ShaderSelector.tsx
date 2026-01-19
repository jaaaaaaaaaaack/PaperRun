import { ChevronRight } from 'lucide-react'
import type { ShaderKey } from '../shaders'
import { ShaderThumbnail } from './ShaderThumbnail'

interface ShaderSelectorProps {
  shaderKey: ShaderKey
  onClick: () => void
}

function formatShaderName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function ShaderSelector({ shaderKey, onClick }: ShaderSelectorProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-surface-alt rounded-xl p-1.5 flex items-center gap-2 hover:bg-slate-600 transition-colors border-0 outline-none focus:outline-none"
    >
      <ShaderThumbnail
        shaderKey={shaderKey}
        className="w-[56px] h-[42px] rounded shrink-0"
      />
      <span className="flex-1 text-left font-semibold text-text-primary">
        {formatShaderName(shaderKey)}
      </span>
      <ChevronRight className="w-5 h-5 text-text-secondary shrink-0" />
    </button>
  )
}

import { useState } from 'react'
import type { ShaderKey } from '../shaders'
import { getThumbnailUrl, getVideoUrl, hasAnimation } from '../lib/shader-thumbnails'

interface ShaderThumbnailProps {
  shaderKey: ShaderKey
  onClick?: () => void
  className?: string
}

export function ShaderThumbnail({ shaderKey, onClick, className = '' }: ShaderThumbnailProps) {
  const [hovered, setHovered] = useState(false)
  const thumbnailUrl = getThumbnailUrl(shaderKey)
  const videoUrl = getVideoUrl(shaderKey)
  const hasVideo = hasAnimation(shaderKey)

  if (!thumbnailUrl) {
    return (
      <div
        onClick={onClick}
        className={`bg-surface-alt rounded-lg flex items-center justify-center ${className}`}
      >
        <span className="text-text-secondary text-xs">No preview</span>
      </div>
    )
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden cursor-pointer ${className}`}
    >
      {hovered && hasVideo && videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={thumbnailUrl}
          alt={shaderKey}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

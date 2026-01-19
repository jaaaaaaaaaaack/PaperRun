import { useState } from 'react'
import { motion } from 'framer-motion'

interface LibraryButtonProps {
  onClick: () => void
}

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
  mass: 1,
}

export function LibraryButton({ onClick }: LibraryButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-[96px] h-[84px] rounded-lg overflow-hidden relative cursor-pointer transition-colors ${
        hovered ? 'bg-slate-600' : 'bg-slate-700'
      }`}
    >
      {/* Abstract card - white bg, soft shadow */}
      <motion.div
        animate={hovered ? {
          left: -10,
          top: 2,
          width: 41,
          height: 41,
          rotate: -6,
        } : {
          left: 7,
          top: 14,
          width: 35,
          height: 35,
          rotate: -4,
        }}
        transition={springConfig}
        className="absolute bg-white rounded-[3.5px] overflow-hidden"
        style={{
          zIndex: 1,
          boxShadow: '0px 8px 12px -2px rgba(0,0,0,0.15), 0px 3px 5px -3px rgba(0,0,0,0.1)'
        }}
      >
        <img
          src="/Abstract.png"
          alt="Abstract"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Landscape card - soft shadow */}
      <motion.div
        animate={hovered ? {
          left: 53,
          top: 8,
          width: 50,
          height: 36,
          rotate: 11,
        } : {
          left: 40,
          top: 20,
          width: 47,
          height: 34,
          rotate: 4,
        }}
        transition={springConfig}
        className="absolute border border-slate-400 rounded overflow-hidden"
        style={{
          zIndex: 2,
          boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.15), 0px 4px 6px -4px rgba(0,0,0,0.1)'
        }}
      >
        <img
          src="/Landscape.png"
          alt="Landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Flower card - dark bg, soft shadow */}
      <motion.div
        animate={hovered ? {
          left: 25,
          top: 20,
          width: 33,
          height: 33,
          rotate: -12,
        } : {
          left: 29,
          top: 44,
          width: 26,
          height: 26,
          rotate: 3,
        }}
        transition={springConfig}
        className="absolute bg-slate-600 rounded overflow-hidden flex items-center justify-center p-1"
        style={{
          zIndex: 3,
          boxShadow: '0px 8px 12px -2px rgba(0,0,0,0.2), 0px 3px 5px -3px rgba(0,0,0,0.1)'
        }}
      >
        <img
          src="/Flower.png"
          alt="Flower"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* "Library" text */}
      <motion.span
        animate={hovered ? { top: 62 } : { top: 90 }}
        transition={springConfig}
        className="absolute left-0 right-0 text-center text-slate-200 text-xs font-medium"
      >
        Library
      </motion.span>
    </button>
  )
}

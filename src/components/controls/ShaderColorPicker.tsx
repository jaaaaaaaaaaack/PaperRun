import { ColorSwatch } from '../ColorSwatch'

interface ShaderColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ShaderColorPicker({
  label,
  value,
  onChange,
}: ShaderColorPickerProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-mono text-[13px] text-text-secondary w-[91px] shrink-0">
        {label}
      </span>
      <div className="flex-1" />
      <ColorSwatch color={value} onChange={onChange} />
    </div>
  )
}

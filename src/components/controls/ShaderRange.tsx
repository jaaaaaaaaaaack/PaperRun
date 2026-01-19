interface ShaderRangeProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  suffix?: string
}

export function ShaderRange({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = '',
}: ShaderRangeProps) {
  const percent = ((value - min) / (max - min)) * 100

  const formatValue = (val: number) => {
    if (suffix === '°') {
      return `${Math.round(val)}°`
    }
    if (step >= 1) {
      return Math.round(val).toString()
    }
    return val.toFixed(2)
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <label className="w-[91px] font-mono text-[13px] text-text-secondary shrink-0">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="range range-md flex-1 pr-2"
        style={{ '--value-percent': `${percent}%` } as React.CSSProperties}
      />
      <div className="w-[46px] bg-surface-alt border border-border-subtle rounded px-1 py-0.5 shrink-0">
        <span className="font-mono text-[13px] text-text-secondary block text-center">
          {formatValue(value)}
        </span>
      </div>
    </div>
  )
}

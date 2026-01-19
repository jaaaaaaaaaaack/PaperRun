interface ShaderSelectProps {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function ShaderSelect({
  label,
  value,
  options,
  onChange,
}: ShaderSelectProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-mono text-[13px] text-text-secondary w-[91px] shrink-0">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-sm flex-1 bg-surface-alt border-border-subtle text-text-secondary font-mono text-[13px] h-[28px] min-h-[28px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

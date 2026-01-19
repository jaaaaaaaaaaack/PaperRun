interface ShaderToggleProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export function ShaderToggle({ label, value, onChange }: ShaderToggleProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-mono text-[13px] text-text-secondary w-[91px] shrink-0">
        {label}
      </span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle toggle-sm bg-border-subtle border-border-subtle [--tglbg:#1e293b] checked:bg-text-secondary checked:border-text-secondary"
      />
    </div>
  )
}

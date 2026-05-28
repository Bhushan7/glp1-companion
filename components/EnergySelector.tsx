'use client'

interface EnergySelectorProps {
  value: number | null
  onChange: (value: number) => void
}

export default function EnergySelector({ value, onChange }: EnergySelectorProps) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors border-2 ${
            value === level
              ? 'bg-[#1D9E75] border-[#1D9E75] text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-[#1D9E75] hover:text-[#1D9E75]'
          }`}
          aria-label={`Energy level ${level}`}
        >
          {level}
        </button>
      ))}
    </div>
  )
}

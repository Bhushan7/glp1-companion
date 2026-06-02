'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EnergySelector from './EnergySelector'

const SIDE_EFFECT_OPTIONS = [
  'Nausea', 'Fatigue', 'Headache', 'Constipation', 'Diarrhea',
  'Vomiting', 'Stomach pain', 'Loss of appetite',
]

export default function LogForm() {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    log_date: today,
    weight_kg: '',
    dose_mg: '',
    side_effects: [] as string[],
    protein_grams: '',
    water_oz: '',
    energy_level: null as number | null,
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function set(field: string, value: string | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSideEffect(effect: string) {
    setForm((prev) => ({
      ...prev,
      side_effects: prev.side_effects.includes(effect)
        ? prev.side_effects.filter((e) => e !== effect)
        : [...prev.side_effects, effect],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const payload = {
      log_date: form.log_date,
      weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
      dose_mg: form.dose_mg ? parseFloat(form.dose_mg) : null,
      side_effects: form.side_effects.length > 0 ? form.side_effects.join(', ') : null,
      protein_grams: form.protein_grams ? parseInt(form.protein_grams) : null,
      water_oz: form.water_oz ? parseInt(form.water_oz) : null,
      energy_level: form.energy_level,
      notes: form.notes || null,
    }

    const res = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (res.ok) {
      setToast('Log saved!')
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 900)
    } else {
      const data = await res.json()
      setToast(`Error: ${data.error ?? 'Something went wrong'}`)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

  return (
    <div className="max-w-lg mx-auto pb-24 md:pb-8">
      <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-5">Log Today&apos;s Health</h1>

        {toast && (
          <div
            className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
              toast.startsWith('Error')
                ? 'bg-red-50 text-red-700'
                : 'bg-[#E3F5EE] text-[#1D9E75]'
            }`}
          >
            {toast}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Date */}
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={form.log_date}
              onChange={(e) => set('log_date', e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Weight + Dose — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="82.5"
                value={form.weight_kg}
                onChange={(e) => set('weight_kg', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dose (mg)</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.25"
                placeholder="0.5"
                value={form.dose_mg}
                onChange={(e) => set('dose_mg', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Protein + Water — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Protein (g)</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="120"
                value={form.protein_grams}
                onChange={(e) => set('protein_grams', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Water (oz)</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="64"
                value={form.water_oz}
                onChange={(e) => set('water_oz', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Energy */}
          <div>
            <label className={labelClass}>Energy Level</label>
            <EnergySelector
              value={form.energy_level}
              onChange={(v) => set('energy_level', v)}
            />
          </div>

          {/* Side effects — tap chips instead of textarea */}
          <div>
            <label className={labelClass}>Side Effects</label>
            <div className="flex flex-wrap gap-2">
              {SIDE_EFFECT_OPTIONS.map((effect) => (
                <button
                  key={effect}
                  type="button"
                  onClick={() => toggleSideEffect(effect)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    form.side_effects.includes(effect)
                      ? 'bg-[#1D9E75] border-[#1D9E75] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#1D9E75]'
                  }`}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="Anything else to note?"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={2}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#1D9E75] text-white py-3.5 text-sm font-bold hover:bg-[#178a64] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Saving…' : 'Save Log'}
          </button>
        </form>
      </div>
    </div>
  )
}

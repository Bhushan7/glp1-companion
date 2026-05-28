'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EnergySelector from './EnergySelector'

export default function LogForm() {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    log_date: today,
    weight_kg: '',
    dose_mg: '',
    side_effects: '',
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const payload = {
      log_date: form.log_date,
      weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
      dose_mg: form.dose_mg ? parseFloat(form.dose_mg) : null,
      side_effects: form.side_effects || null,
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
      }, 1000)
    } else {
      const data = await res.json()
      setToast(`Error: ${data.error ?? 'Something went wrong'}`)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Log Today&apos;s Health</h1>

        {toast && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${
              toast.startsWith('Error')
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-[#1D9E75]'
            }`}
          >
            {toast}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 82.5"
                value={form.weight_kg}
                onChange={(e) => set('weight_kg', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dose (mg)</label>
              <input
                type="number"
                step="0.25"
                placeholder="e.g. 0.5"
                value={form.dose_mg}
                onChange={(e) => set('dose_mg', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Protein (g)</label>
              <input
                type="number"
                placeholder="e.g. 120"
                value={form.protein_grams}
                onChange={(e) => set('protein_grams', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Water (oz)</label>
              <input
                type="number"
                placeholder="e.g. 64"
                value={form.water_oz}
                onChange={(e) => set('water_oz', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Energy Level</label>
            <EnergySelector
              value={form.energy_level}
              onChange={(v) => set('energy_level', v)}
            />
          </div>

          <div>
            <label className={labelClass}>Side Effects</label>
            <textarea
              placeholder="Any nausea, fatigue, or other symptoms?"
              value={form.side_effects}
              onChange={(e) => set('side_effects', e.target.value)}
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Notes</label>
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
            className="w-full rounded-lg bg-[#1D9E75] text-white py-2.5 text-sm font-semibold hover:bg-[#178a64] transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save Log'}
          </button>
        </form>
      </div>
    </div>
  )
}

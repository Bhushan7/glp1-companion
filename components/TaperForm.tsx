'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface MaintenanceGoals {
  target_weight_kg?: number | null
  taper_start_date?: string | null
  current_dose_mg?: number | null
  target_dose_mg?: number | null
  notes?: string | null
}

const DOSE_OPTIONS = [0, 0.25, 0.5, 1, 1.7, 2]

export default function TaperForm({ existing }: { existing: MaintenanceGoals | null }) {
  const router = useRouter()
  const [targetWeight, setTargetWeight] = useState(existing?.target_weight_kg?.toString() ?? '')
  const [taperStart, setTaperStart] = useState(existing?.taper_start_date ?? '')
  const [currentDose, setCurrentDose] = useState<number | null>(existing?.current_dose_mg ?? null)
  const [targetDose, setTargetDose] = useState<number | null>(existing?.target_dose_mg ?? null)
  const [notes, setNotes] = useState(existing?.notes ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSaved(false)
    try {
      const res = await fetch('/api/taper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_weight_kg: targetWeight ? parseFloat(targetWeight) : null,
          taper_start_date: taperStart || null,
          current_dose_mg: currentDose,
          target_dose_mg: targetDose,
          notes: notes.trim() || null,
        }),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Failed to save')
      }
      setSaved(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Target weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target weight (kg)</label>
        <input
          type="number"
          step="0.1"
          min="30"
          max="300"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          placeholder="e.g. 75"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Taper start date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Taper start date</label>
        <input
          type="date"
          value={taperStart}
          onChange={(e) => setTaperStart(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Current dose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current dose (mg)</label>
        <div className="flex flex-wrap gap-2">
          {[0.25, 0.5, 1, 1.7, 2].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setCurrentDose(d)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                currentDose === d
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
              }`}
            >
              {d} mg
            </button>
          ))}
        </div>
      </div>

      {/* Target dose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target dose (mg) <span className="text-xs text-gray-400 font-normal">— 0 for full stop</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DOSE_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setTargetDose(d)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                targetDose === d
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
              }`}
            >
              {d === 0 ? 'Stop (0)' : `${d} mg`}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Any context for your taper…"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-indigo-600 font-medium">Goals saved — plan updated below.</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving…' : 'Save & Generate Plan'}
      </button>
    </form>
  )
}

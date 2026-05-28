'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MEDICATIONS = ['Wegovy', 'Ozempic', 'Mounjaro', 'Zepbound', 'Other']

export default function OnboardingPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    medication: '',
    current_dose: '',
    start_date: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        medication: form.medication,
        current_dose: form.current_dose ? parseFloat(form.current_dose) : null,
        start_date: form.start_date || null,
      }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome! Let&apos;s get set up</h1>
        <p className="text-sm text-gray-500 mb-6">
          Tell us a little about your GLP-1 journey so we can personalise your experience.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Your name</label>
            <input
              type="text"
              placeholder="Alex"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Medication</label>
            <select
              value={form.medication}
              onChange={(e) => set('medication', e.target.value)}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Select your medication
              </option>
              {MEDICATIONS.map((med) => (
                <option key={med} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Current dose (mg)</label>
            <input
              type="number"
              step="0.25"
              placeholder="e.g. 0.5"
              value={form.current_dose}
              onChange={(e) => set('current_dose', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>When did you start? (optional)</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => set('start_date', e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1D9E75] text-white py-2.5 text-sm font-semibold hover:bg-[#178a64] transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Get started'}
          </button>
        </form>
      </div>
    </main>
  )
}

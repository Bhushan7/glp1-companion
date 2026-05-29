'use client'

import { useState } from 'react'

const MEDICATIONS = ['Wegovy', 'Mounjaro', 'Ozempic', 'Zepbound', 'Other']

export default function WaitlistForm() {
  const [form, setForm] = useState({ first_name: '', email: '', medication: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong. Please try again.')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'

  if (submitted) {
    return (
      <div className="bg-white/10 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
        <p className="text-white/70">
          We&apos;ll reach out to <span className="text-white font-medium">{form.email}</span> within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 rounded-2xl p-8">
      {error && (
        <div className="mb-5 rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-white">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">First name</label>
            <input
              type="text"
              placeholder="Alex"
              value={form.first_name}
              onChange={(e) => set('first_name', e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="alex@email.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Which medication are you on?</label>
          <select
            value={form.medication}
            onChange={(e) => set('medication', e.target.value)}
            required
            className={inputClass + ' appearance-none cursor-pointer'}
          >
            <option value="" disabled className="bg-[#0d6b4f] text-white">
              Select your medication
            </option>
            {MEDICATIONS.map((med) => (
              <option key={med} value={med} className="bg-[#0d6b4f] text-white">
                {med}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-[#1D9E75] font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60 text-base mt-2"
        >
          {loading ? 'Joining…' : 'Join the waitlist →'}
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import InsightCard from './InsightCard'
import type { WeeklyInsight } from '@/types/database'

export default function GenerateInsightButton() {
  const [loading, setLoading] = useState(false)
  const [insight, setInsight] = useState<WeeklyInsight | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/insights', { method: 'POST' })
    const data = await res.json()

    setLoading(false)

    if (res.ok) {
      setInsight(data.insight)
    } else {
      setError(data.error ?? 'Something went wrong. Try again.')
    }
  }

  if (insight) {
    return (
      <div>
        <p className="text-xs font-semibold text-[#1D9E75] uppercase tracking-wide mb-3">
          ✓ Insight generated
        </p>
        <InsightCard insight={insight} />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#E3F5EE] to-[#f0faf6] rounded-2xl p-4 md:p-5 border border-[#1D9E75]/10">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#1D9E75] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">Weekly AI Insight</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Analyse your last 7 days and get personalised suggestions.
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-[#1D9E75] text-white py-3 text-sm font-bold hover:bg-[#178a64] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating… (~5s)
          </>
        ) : (
          'Generate My Weekly Insight'
        )}
      </button>
    </div>
  )
}

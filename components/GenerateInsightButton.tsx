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
      setError(data.error ?? 'Something went wrong')
    }
  }

  if (insight) {
    return (
      <div className="mt-4">
        <p className="text-sm font-medium text-[#1D9E75] mb-3">✓ Insight generated</p>
        <InsightCard insight={insight} />
      </div>
    )
  }

  return (
    <div>
      {error && (
        <p className="mb-3 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
      )}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="rounded-lg border border-[#1D9E75] text-[#1D9E75] px-6 py-2.5 text-sm font-semibold hover:bg-[#1D9E75] hover:text-white transition-colors disabled:opacity-60"
      >
        {loading ? 'Generating insight…' : '✨ Generate Weekly Insight'}
      </button>
      {loading && (
        <p className="mt-2 text-xs text-gray-400">This takes about 5 seconds…</p>
      )}
    </div>
  )
}

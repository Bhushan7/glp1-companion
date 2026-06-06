'use client'

import { useState } from 'react'
import InsightCard from './InsightCard'

function addSevenDays(from: Date): string {
  return new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function GenerateInsightButton({
  lastInsightDate,
  nextAvailableDate: nextAvailableProp,
}: {
  lastInsightDate: string | null
  nextAvailableDate: string | null
}) {
  const [loading, setLoading] = useState(false)
  const [insight, setInsight] = useState<string | null>(null)
  const [journeyInsight, setJourneyInsight] = useState<string | null>(null)
  const [upgradeRequired, setUpgradeRequired] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextAvailableDate, setNextAvailableDate] = useState<string | null>(
    nextAvailableProp ?? (lastInsightDate ? addSevenDays(new Date(lastInsightDate)) : null)
  )

  const isAllowed = !nextAvailableDate || new Date(nextAvailableDate) <= new Date()

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    setUpgradeRequired(false)

    const res = await fetch('/api/insights', { method: 'POST' })
    const data = await res.json()

    setLoading(false)

    if (res.ok) {
      setInsight(data.insight)
      setJourneyInsight(data.journeyInsight ?? null)
      setNextAvailableDate(addSevenDays(new Date()))
    } else if (data.error === 'upgrade_required') {
      setInsight(data.insight)
      setJourneyInsight(data.journeyInsight ?? null)
      setUpgradeRequired(true)
    } else if (res.status === 429) {
      setNextAvailableDate(data.next_available)
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
        <InsightCard
          insight={insight}
          journeyInsight={journeyInsight}
          upgradeRequired={upgradeRequired}
        />
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
        onClick={isAllowed ? handleGenerate : undefined}
        disabled={loading || !isAllowed}
        className={`mt-4 w-full rounded-xl py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
          isAllowed
            ? 'bg-[#1D9E75] text-white hover:bg-[#178a64] disabled:opacity-60'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
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
      {!isAllowed && nextAvailableDate && (
        <p className="mt-2 text-xs text-center text-gray-400">
          Next insight available on {formatDate(nextAvailableDate)}
        </p>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import UpgradePaywall from './UpgradePaywall'
import { IS_FREE_PERIOD } from '@/lib/config'

interface InsightCardProps {
  insight: string | null
  journeyInsight: string | null
  isLoading?: boolean
  error?: string | null
  upgradeRequired?: boolean
}

export default function InsightCard({
  insight,
  journeyInsight,
  isLoading = false,
  error,
  upgradeRequired = false,
}: InsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Parse the combined insight text (if it contains the separator)
  const parts = insight ? insight.split('---OVERALL JOURNEY---') : []
  const weeklyText = parts[0]?.trim() || insight
  const journeyText = journeyInsight || (parts[1]?.trim() || '')

  // ── Upgrade required: show paywall over dimmed insight ──────────────────
  if (upgradeRequired && insight && !IS_FREE_PERIOD) {
    return (
      <>
        {/* Dimmed insight in background */}
        <div className="opacity-40 pointer-events-none">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              Weekly Insight
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{weeklyText}</p>
          </div>
        </div>

        {/* Paywall overlay */}
        <UpgradePaywall />
      </>
    )
  }

  // ── Loading state ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  // ── Error state ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  // ── No insight yet ─────────────────────────────────────────────────────
  if (!insight) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-sm text-gray-500">
          Log some health data, then click "Generate Insight" to see your personalized coaching.
        </p>
      </div>
    )
  }

  // ── Normal insight display ──────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Weekly insight */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
          Weekly Insight
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{weeklyText}</p>
      </div>

      {/* Journey insight (if available) */}
      {journeyText && (
        <div className="bg-indigo-50 rounded-xl border border-indigo-200/40 p-6 md:p-8">
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Your Journey So Far
            </p>
            <p className={`text-indigo-900 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {journeyText}
            </p>
            {!isExpanded && (
              <p className="text-xs text-indigo-600 font-semibold mt-2 hover:text-indigo-700">
                Read more →
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

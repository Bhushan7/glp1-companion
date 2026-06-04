'use client'

import { useState } from 'react'
import type { WeeklyInsight } from '@/types/database'

const JOURNEY_SEPARATOR = '---OVERALL JOURNEY---'

interface InsightCardProps {
  insight: WeeklyInsight
}

export default function InsightCard({ insight }: InsightCardProps) {
  const [expanded, setExpanded] = useState(false)

  const weekLabel = new Date(insight.week_ending).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const fullText = insight.insight_text ?? 'No insight text available.'

  const separatorIndex = fullText.indexOf(JOURNEY_SEPARATOR)
  const hasJourney = separatorIndex !== -1

  const weeklyText = hasJourney ? fullText.slice(0, separatorIndex).trim() : fullText
  const journeyText = hasJourney
    ? fullText.slice(separatorIndex + JOURNEY_SEPARATOR.length).trim()
    : null

  const weeklyParagraphs = weeklyText.split(/\n\n+/).filter(Boolean)
  const isLong = weeklyText.length > 200
  const preview = isLong ? weeklyText.slice(0, 200).trimEnd() + '…' : weeklyText

  const showToggle = isLong || hasJourney

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
      <p className="text-xs font-semibold text-[#1D9E75] uppercase tracking-wide mb-3">
        Week ending {weekLabel}
      </p>

      {expanded ? (
        <div className="space-y-3">
          {weeklyParagraphs.map((para, i) => (
            <p key={i} className="text-gray-700 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed">{preview}</p>
      )}

      {expanded && journeyText && (
        <div className="mt-5 rounded-xl bg-indigo-50 border border-indigo-200 p-4">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
            Your Journey So Far
          </p>
          <p className="text-sm text-indigo-900 leading-relaxed">{journeyText}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        {showToggle && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-sm font-medium text-[#1D9E75] hover:underline"
          >
            {expanded ? 'Show less' : 'Read full insight'}
          </button>
        )}

        {insight.pdf_url && (
          <a
            href={insight.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm font-medium text-gray-400 hover:text-[#1D9E75] transition-colors"
          >
            Download PDF →
          </a>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { WeeklyInsight } from '@/types/database'

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

  const text = insight.insight_text ?? 'No insight text available.'
  const isLong = text.length > 200
  const preview = isLong ? text.slice(0, 200).trimEnd() + '…' : text

  // Split into paragraphs for proper display
  const paragraphs = text.split(/\n\n+/).filter(Boolean)

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
      <p className="text-xs font-semibold text-[#1D9E75] uppercase tracking-wide mb-3">
        Week ending {weekLabel}
      </p>

      {expanded ? (
        <div className="space-y-3">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-gray-700 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed">{preview}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        {isLong && (
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

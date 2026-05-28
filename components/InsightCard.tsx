import type { WeeklyInsight } from '@/types/database'

interface InsightCardProps {
  insight: WeeklyInsight
}

export default function InsightCard({ insight }: InsightCardProps) {
  const weekLabel = new Date(insight.week_ending).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const excerpt = insight.insight_text
    ? insight.insight_text.slice(0, 180) + (insight.insight_text.length > 180 ? '…' : '')
    : 'No insight text available.'

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#1D9E75] uppercase tracking-wide">
            Week ending {weekLabel}
          </p>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">{excerpt}</p>
        </div>
        {insight.pdf_url && (
          <a
            href={insight.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-[#1D9E75] hover:underline"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  )
}

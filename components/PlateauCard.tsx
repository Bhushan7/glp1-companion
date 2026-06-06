type Props = {
  isOnPlateau: boolean
  plateauDays: number
  avgProteinTrend: string
  avgEnergyTrend: string
}

export default function PlateauCard({ isOnPlateau, plateauDays, avgProteinTrend, avgEnergyTrend }: Props) {
  if (!isOnPlateau) return null

  const wins: string[] = []
  if (avgProteinTrend === 'improving') wins.push('Protein intake up')
  if (avgEnergyTrend === 'stable' || avgEnergyTrend === 'improving') wins.push('Energy holding steady')
  wins.push('Staying consistent with logging')

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">📊</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-blue-900">
            Your weight has been stable for {plateauDays} days
          </h3>
          <p className="text-sm text-blue-700 mt-1 leading-relaxed">
            This is normal on GLP-1s — especially during dose escalation weeks. Your body is still changing even when the scale isn&apos;t.
          </p>
          <div className="mt-3">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2">
              Non-scale wins this week
            </p>
            <div className="flex flex-wrap gap-2">
              {wins.map((win) => (
                <span
                  key={win}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"
                >
                  {win}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

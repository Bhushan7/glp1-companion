const CHECKOUT_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL ?? '#'

interface Pillar {
  name: string
  points: number
  note?: string
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'Ready to plan your off-ramp'
  if (score >= 70) return 'Almost ready'
  if (score >= 40) return 'Good progress — keep going'
  return 'Keep building habits'
}

export default function OffRampScoreCard({
  logs,
  isPro,
}: {
  logs: any[]
  isPro: boolean
}) {
  // Derive pillar scores from the last 14 days of logs
  const weightKg: number = logs.find((l) => l.weight_kg != null)?.weight_kg ?? 80
  const proteinTarget = Math.round(weightKg * 1.2)

  // --- Protein consistency ---
  const proteinLogs = logs.filter((l) => l.protein_grams != null)
  let proteinPoints = 0
  let proteinNote: string | undefined
  if (proteinLogs.length > 0) {
    const avg = proteinLogs.reduce((s: number, l: any) => s + l.protein_grams, 0) / proteinLogs.length
    const pct = avg / proteinTarget
    proteinPoints = pct >= 0.8 ? 25 : pct >= 0.6 ? 15 : 0
  }

  // --- Food noise ---
  const noiseLogs = logs.filter((l) => l.food_noise_level != null)
  let noisePoints = 0
  let noiseNote: string | undefined
  if (noiseLogs.length === 0) {
    noiseNote = 'Start logging food noise to unlock this score'
  } else {
    const avg = noiseLogs.reduce((s: number, l: any) => s + l.food_noise_level, 0) / noiseLogs.length
    noisePoints = avg <= 4 ? 25 : avg <= 6 ? 15 : 0
  }

  // --- Weight stability ---
  const weightLogs = logs.filter((l) => l.weight_kg != null)
  let weightPoints = 0
  if (weightLogs.length >= 2) {
    const weights = weightLogs.map((l: any) => l.weight_kg as number)
    const variance = Math.max(...weights) - Math.min(...weights)
    weightPoints = variance < 1 ? 25 : variance < 2 ? 15 : 0
  }

  // --- Logging consistency ---
  const logCount = logs.length
  const consistencyPoints = logCount >= 12 ? 25 : logCount >= 8 ? 15 : 0

  const score = proteinPoints + noisePoints + weightPoints + consistencyPoints

  const pillars: Pillar[] = [
    { name: 'Protein consistency', points: proteinPoints, note: proteinNote },
    { name: 'Food noise control', points: noisePoints, note: noiseNote },
    { name: 'Weight stability', points: weightPoints },
    { name: 'Logging consistency', points: consistencyPoints },
  ]

  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-5 shadow-sm">
      {/* Score header */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-indigo-900">
          {score}/100
          <span className="ml-2 text-base font-semibold text-indigo-700">Off-Ramp Readiness</span>
        </p>
        <p className="text-sm text-indigo-600 mt-0.5">{scoreLabel(score)}</p>
      </div>

      {/* Pillar rows */}
      <div className="space-y-3 mb-5">
        {pillars.map((p) => (
          <div key={p.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">{p.name}</span>
              <span className="text-xs font-semibold text-indigo-700">{p.points}/25</span>
            </div>
            <div className="h-1.5 rounded-full bg-indigo-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${(p.points / 25) * 100}%` }}
              />
            </div>
            {p.note && (
              <p className="text-[11px] text-gray-500 mt-0.5">{p.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      {score >= 70 && !isPro && (
        <div className="rounded-xl border border-indigo-300 bg-white/70 p-4 text-center">
          <p className="text-sm font-semibold text-indigo-900 mb-0.5">
            Unlock your personalised taper plan
          </p>
          <p className="text-xs text-indigo-600 mb-3">GLP-1 Companion Pro — $9.99/month</p>
          <a
            href={CHECKOUT_URL}
            className="inline-block rounded-lg bg-indigo-600 text-white px-5 py-2 text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      )}

      {score >= 70 && isPro && (
        <div className="text-center">
          <a
            href="/taper"
            className="inline-block rounded-lg bg-indigo-600 text-white px-5 py-2 text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            View Your Taper Plan
          </a>
        </div>
      )}
    </div>
  )
}

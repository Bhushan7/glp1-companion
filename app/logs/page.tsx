export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import StatCard from '@/components/StatCard'
import type { HealthLog } from '@/types/database'

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function LogsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: logs } = await supabase
    .from('health_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('log_date', { ascending: false })

  const healthLogs = (logs ?? []) as HealthLog[]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">
          Log History
        </h1>

        {healthLogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            No logs yet. Start logging from the dashboard.
          </div>
        ) : (
          <div className="space-y-4 md:space-y-5">
            {healthLogs.map((log) => {
              const sideEffects = log.side_effects
                ? log.side_effects.split(',').map((s) => s.trim()).filter(Boolean)
                : []
              const foodTags = log.food_tags ?? []

              return (
                <div key={log.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Date header */}
                  <div className="px-5 py-3 md:px-6 md:py-4 border-b border-gray-100">
                    <h2 className="text-sm md:text-base font-semibold text-gray-900">
                      {formatDate(log.log_date)}
                    </h2>
                  </div>

                  {/* Stats 2×2 grid */}
                  <div className="p-4 md:p-5 grid grid-cols-2 gap-3">
                    <StatCard
                      label="Weight"
                      value={log.weight_kg != null ? `${log.weight_kg} kg` : '—'}
                    />
                    <StatCard
                      label="Dose"
                      value={log.dose_mg != null ? `${log.dose_mg} mg` : '—'}
                    />
                    <StatCard
                      label="Energy"
                      value={log.energy_level != null ? `${log.energy_level} / 5` : '—'}
                    />
                    <StatCard
                      label="Water"
                      value={log.water_oz != null ? `${log.water_oz} oz` : '—'}
                    />
                  </div>

                  {sideEffects.length > 0 && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Side Effects
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sideEffects.map((effect) => (
                          <span
                            key={effect}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1D9E75] border border-[#1D9E75] text-white"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {foodTags.length > 0 && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Food Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {foodTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 border border-blue-200 text-blue-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {log.food_noise_level != null && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Food Noise
                      </p>
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                          log.food_noise_level <= 3
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : log.food_noise_level <= 6
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        Food noise: {log.food_noise_level}/10
                      </span>
                    </div>
                  )}

                  {log.injection_time && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Injection Time
                      </p>
                      <p className="text-sm text-gray-700">{log.injection_time}</p>
                    </div>
                  )}

                  {log.notes && log.notes.trim() && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Notes
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{log.notes}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      <div className="h-20 md:hidden" />
    </div>
  )
}

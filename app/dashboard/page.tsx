import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import StatCard from '@/components/StatCard'
import InsightCard from '@/components/InsightCard'
import SubscribeButton from './SubscribeButton'
import type { HealthLog, WeeklyInsight } from '@/types/database'

function calculateStreak(logs: HealthLog[]): number {
  if (!logs.length) return 0
  const logDates = new Set(logs.map((l) => l.log_date))
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (true) {
    const dateStr = cursor.toISOString().split('T')[0]
    if (logDates.has(dateStr)) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Check profile completeness
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.name) {
    redirect('/onboarding')
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const [{ data: logs }, { data: insights }] = await Promise.all([
    supabase
      .from('health_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('log_date', sevenDaysAgo)
      .order('log_date', { ascending: false }),
    supabase
      .from('weekly_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('week_ending', { ascending: false })
      .limit(4),
  ])

  const healthLogs = (logs ?? []) as HealthLog[]
  const weeklyInsights = (insights ?? []) as WeeklyInsight[]

  const streak = calculateStreak(healthLogs)
  const latestWeight = healthLogs.find((l) => l.weight_kg != null)?.weight_kg
  const oldestWeight = [...healthLogs].reverse().find((l) => l.weight_kg != null)?.weight_kg
  const weightDelta =
    latestWeight != null && oldestWeight != null
      ? +(latestWeight - oldestWeight).toFixed(1)
      : null

  const currentDose = profile.current_dose

  const subscribed = profile.subscription_status === 'active'

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s your progress this week.</p>
        </div>

        {!subscribed && (
          <div className="mb-6 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/20 p-4 flex items-center justify-between">
            <p className="text-sm font-medium text-[#1D9E75]">
              Subscribe to unlock weekly AI insights delivered every Friday.
            </p>
            <SubscribeButton />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Log streak" value={`${streak} day${streak !== 1 ? 's' : ''}`} />
          <StatCard
            label="Current weight"
            value={latestWeight != null ? `${latestWeight} kg` : '—'}
            trend={
              weightDelta != null
                ? `${weightDelta > 0 ? '+' : ''}${weightDelta} kg this week`
                : undefined
            }
            trendPositive={weightDelta != null && weightDelta <= 0}
          />
          <StatCard
            label="Current dose"
            value={currentDose != null ? `${currentDose} mg` : '—'}
          />
          <StatCard
            label="Medication"
            value={profile.medication ?? '—'}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Insights</h2>
          <Link href="/report" className="text-sm text-[#1D9E75] font-medium hover:underline">
            View all →
          </Link>
        </div>

        {weeklyInsights.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            Your first insight will appear after you&apos;ve logged at least 2 days and your
            Friday report runs.
          </div>
        ) : (
          <div className="space-y-4">
            {weeklyInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href="/log"
            className="rounded-lg bg-[#1D9E75] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#178a64] transition-colors"
          >
            Log Today
          </Link>
          <Link
            href="/report"
            className="rounded-lg border border-gray-200 bg-white text-gray-700 px-6 py-2.5 text-sm font-semibold hover:border-[#1D9E75] transition-colors"
          >
            All Reports
          </Link>
        </div>
      </main>
    </div>
  )
}

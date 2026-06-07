import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import StatCard from '@/components/StatCard'
import InsightCard from '@/components/InsightCard'
import GenerateInsightButton from '@/components/GenerateInsightButton'
import ProteinAlertCard from '@/components/ProteinAlertCard'
import PlateauCard from '@/components/PlateauCard'
import OffRampScoreCard from '@/components/OffRampScoreCard'
import BuyMeCoffeeBanner from '@/components/BuyMeCoffeeBanner'
import FeedbackWidget from '@/components/FeedbackWidget'
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

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.name) {
    redirect('/onboarding')
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const [{ data: logs }, { data: insights }] = await Promise.all([
    supabase
      .from('health_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('log_date', thirtyDaysAgo)
      .order('log_date', { ascending: false }),
    supabase
      .from('weekly_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('week_ending', { ascending: false })
      .limit(4),
  ])

  const allLogs = (logs ?? []) as HealthLog[]
  const weeklyInsights = (insights ?? []) as WeeklyInsight[]

  const recentLogs = allLogs.filter((l) => l.log_date >= sevenDaysAgo)
  const prevWeekLogs = allLogs.filter(
    (l) => l.log_date >= fourteenDaysAgo && l.log_date < sevenDaysAgo
  )

  const streak = calculateStreak(allLogs)
  const latestWeight = allLogs.find((l) => l.weight_kg != null)?.weight_kg
  const oldestWeight = [...allLogs].reverse().find((l) => l.weight_kg != null)?.weight_kg
  const weightDelta =
    latestWeight != null && oldestWeight != null
      ? +(latestWeight - oldestWeight).toFixed(1)
      : null

  const proteinLogs = recentLogs.filter((l) => l.protein_grams != null)
  const avgProtein =
    proteinLogs.length > 0
      ? Math.round(
          proteinLogs.reduce((sum, l) => sum + (l.protein_grams as number), 0) /
            proteinLogs.length
        )
      : null

  const weightKg = profile?.current_weight_kg ?? profile?.starting_weight_kg ?? 80

  // Plateau detection: 14+ calendar-day span of weight logs with < 0.5kg variance
  const weightLogs = [...allLogs]
    .filter((l) => l.weight_kg != null)
    .sort((a, b) => a.log_date.localeCompare(b.log_date))

  let isOnPlateau = false
  let plateauDays = 0

  if (weightLogs.length >= 14) {
    const weights = weightLogs.map((l) => l.weight_kg as number)
    const maxW = Math.max(...weights)
    const minW = Math.min(...weights)
    const firstDate = new Date(weightLogs[0].log_date)
    const lastDate = new Date(weightLogs[weightLogs.length - 1].log_date)
    const span = Math.round(
      (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (maxW - minW < 0.5 && span >= 14) {
      isOnPlateau = true
      plateauDays = span
    }
  }

  function calcAvg(arr: HealthLog[], field: 'protein_grams' | 'energy_level'): number | null {
    const valid = arr.filter((l) => l[field] != null)
    if (!valid.length) return null
    return valid.reduce((s, l) => s + (l[field] as number), 0) / valid.length
  }

  const recentProtein = calcAvg(recentLogs, 'protein_grams')
  const prevProtein = calcAvg(prevWeekLogs, 'protein_grams')
  const avgProteinTrend =
    recentProtein == null || prevProtein == null
      ? 'stable'
      : recentProtein > prevProtein + 5
      ? 'improving'
      : recentProtein < prevProtein - 5
      ? 'declining'
      : 'stable'

  const recentEnergy = calcAvg(recentLogs, 'energy_level')
  const prevEnergy = calcAvg(prevWeekLogs, 'energy_level')
  const avgEnergyTrend =
    recentEnergy == null || prevEnergy == null
      ? 'stable'
      : recentEnergy > prevEnergy + 0.3
      ? 'improving'
      : recentEnergy < prevEnergy - 0.3
      ? 'declining'
      : 'stable'

  const firstName = profile.name?.split(' ')[0]
  const fourteenDayLogs = allLogs.filter((l) => l.log_date >= fourteenDaysAgo)
  const isPro = profile?.subscription_status === 'pro'

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">

        {/* Header */}
        <div className="mb-5 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Here&apos;s your progress this week.</p>
        </div>

        {/* Buy Me a Coffee Banner */}
        <div className="mb-6">
          <BuyMeCoffeeBanner />
        </div>

        {/* Stats — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <StatCard label="Streak" value={`${streak}d`} />
          <StatCard
            label="Weight"
            value={latestWeight != null ? `${latestWeight} kg` : '—'}
            trend={
              weightDelta != null
                ? `${weightDelta > 0 ? '+' : ''}${weightDelta} kg`
                : undefined
            }
            trendPositive={weightDelta != null && weightDelta <= 0}
          />
          <StatCard
            label="Dose"
            value={profile.current_dose != null ? `${profile.current_dose} mg` : '—'}
          />
          <StatCard
            label="Medication"
            value={profile.medication ?? '—'}
          />
        </div>

        {/* Quick actions — sticky on mobile */}
        <div className="flex gap-3 mb-6 md:mb-8">
          <Link
            href="/log"
            className="flex-1 md:flex-none rounded-xl bg-[#1D9E75] text-white px-5 py-3 text-sm font-semibold hover:bg-[#178a64] transition-colors text-center"
          >
            + Log Today
          </Link>
          <Link
            href="/report"
            className="flex-1 md:flex-none rounded-xl border border-gray-200 bg-white text-gray-700 px-5 py-3 text-sm font-semibold hover:border-[#1D9E75] transition-colors text-center"
          >
            All Reports
          </Link>
        </div>

        {/* Plateau Card */}
        <div className="mb-4">
          <PlateauCard
            isOnPlateau={isOnPlateau}
            plateauDays={plateauDays}
            avgProteinTrend={avgProteinTrend}
            avgEnergyTrend={avgEnergyTrend}
          />
        </div>

        {/* Protein Alert */}
        <div className="mb-4">
          <ProteinAlertCard
            weightKg={weightKg}
            avgProteinG={avgProtein}
            daysLogged={recentLogs.length}
          />
        </div>

        {/* Generate Insight */}
        <div className="mb-6 md:mb-8">
          <GenerateInsightButton
            lastInsightDate={weeklyInsights[0]?.created_at ?? null}
            nextAvailableDate={null}
          />
        </div>

        {/* Recent Insights */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Insights</h2>
          <Link href="/report" className="text-sm text-[#1D9E75] font-medium hover:underline">
            View all →
          </Link>
        </div>

        {weeklyInsights.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            Generate your first insight above after logging at least 2 days.
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {weeklyInsights.map((wi) => {
              const parts = wi.insight_text ? wi.insight_text.split('---OVERALL JOURNEY---') : []
              const weeklyText = parts[0]?.trim() || wi.insight_text
              const journeyText = parts[1]?.trim() || null
              return (
                <InsightCard
                  key={wi.id}
                  insight={weeklyText}
                  journeyInsight={journeyText}
                />
              )
            })}
          </div>
        )}

        {/* Off-Ramp Readiness Score */}
        <div className="mt-6 md:mt-8">
          <OffRampScoreCard logs={fourteenDayLogs} isPro={isPro} />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-safe">
        <div className="flex items-center justify-around h-16">
          <Link href="/dashboard" className="flex flex-col items-center gap-0.5 px-4 py-2 text-[#1D9E75]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/log" className="flex flex-col items-center gap-0.5 px-4 py-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-[10px] font-medium">Log</span>
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-0.5 px-4 py-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            <span className="text-[10px] font-medium">Reports</span>
          </Link>
        </div>
      </nav>

      {/* Spacer so content isn't hidden behind bottom nav on mobile */}
      <div className="h-20 md:hidden" />

      <FeedbackWidget />
    </div>
  )
}

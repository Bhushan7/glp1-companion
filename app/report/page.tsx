export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import InsightCard from '@/components/InsightCard'
import type { WeeklyInsight } from '@/types/database'

export default async function ReportPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: insights } = await supabase
    .from('weekly_insights')
    .select('*')
    .eq('user_id', user.id)
    .order('week_ending', { ascending: false })

  const weeklyInsights = (insights ?? []) as WeeklyInsight[]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">
          Weekly Reports
        </h1>

        {weeklyInsights.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            No reports yet. Log at least 2 days then generate an insight from the dashboard.
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {weeklyInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile bottom nav spacer */}
      <div className="h-20 md:hidden" />
    </div>
  )
}

import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { generateWeeklyInsight } from '@/lib/claude'
import { sendWeeklyEmail } from '@/lib/loops'
import type { UserProfile, HealthLog } from '@/types/database'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createServiceRoleClient()

  const { data: users, error: usersError } = await admin
    .from('users_profile')
    .select('*')
    .eq('subscription_status', 'active')

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 })
  }

  const weekEnding = new Date().toISOString().split('T')[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  let processed = 0

  for (const user of (users as UserProfile[])) {
    const { data: logs } = await admin
      .from('health_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('log_date', sevenDaysAgo)
      .order('log_date', { ascending: true })

    if (!logs || logs.length < 2) continue

    try {
      const { data: priorRows } = await admin
        .from('weekly_insights')
        .select('insight_text')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      const priorInsights = (priorRows ?? [])
        .map((r) => r.insight_text)
        .filter((t): t is string => !!t)

      const { weeklyInsight, journeyInsight } = await generateWeeklyInsight(
        logs as HealthLog[],
        user,
        priorInsights
      )

      const insightText = `${weeklyInsight}\n\n---OVERALL JOURNEY---\n\n${journeyInsight}`

      const { data: insight } = await admin
        .from('weekly_insights')
        .insert({
          user_id: user.id,
          week_ending: weekEnding,
          insight_text: insightText,
          sent_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (user.email) {
        await sendWeeklyEmail(
          user.email,
          user.name ?? 'there',
          user.start_date
            ? Math.floor((Date.now() - new Date(user.start_date).getTime()) / (7 * 24 * 60 * 60 * 1000))
            : 0,
          weeklyInsight,
          insight?.pdf_url ?? undefined
        )
      }

      processed++
    } catch (err) {
      console.error(`Failed to process user ${user.id}:`, err)
    }
  }

  return NextResponse.json({ processed })
}

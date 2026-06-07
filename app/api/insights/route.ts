import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { generateWeeklyInsight } from '@/lib/claude'
import type { HealthLog } from '@/types/database'
import { IS_FREE_PERIOD } from '@/lib/config'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createServiceRoleClient()

  // ── Fetch user profile ────────────────────────────────────────────────────
  const { data: profile } = await admin
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
  }

  // ── Check rate limit (7 days) ─────────────────────────────────────────────
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const { data: recentInsights } = await admin
    .from('weekly_insights')
    .select('created_at')
    .eq('user_id', user.id)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(1)

  if (recentInsights && recentInsights.length > 0) {
    const lastInsightDate = new Date(recentInsights[0].created_at)
    const nextAvailable = new Date(lastInsightDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    return NextResponse.json(
      {
        error: 'too_soon',
        next_available: nextAvailable.toISOString(),
      },
      { status: 429 }
    )
  }

  // ── Fetch recent logs ─────────────────────────────────────────────────────
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const { data: logs } = await admin
    .from('health_logs')
    .select('*')
    .eq('user_id', user.id)
    .gte('log_date', fourteenDaysAgo.toISOString().split('T')[0])
    .order('log_date', { ascending: false })

  if (!logs || logs.length === 0) {
    return NextResponse.json(
      { error: 'No logs found. Please log at least one entry before generating an insight.' },
      { status: 400 }
    )
  }

  const healthLogs = logs as HealthLog[]

  // ── Fetch prior insights for journey context ──────────────────────────────
  const { data: allPriorInsights } = await admin
    .from('weekly_insights')
    .select('insight_text')
    .eq('user_id', user.id)
    .not('insight_text', 'is', null)
    .order('created_at', { ascending: true })

  const priorInsightTexts = allPriorInsights
    ?.map((i) => {
      const fullText = i.insight_text || ''
      const parts = fullText.split('---OVERALL JOURNEY---')
      return parts[0].trim() // Weekly insight only, not the journey summary
    })
    .filter(Boolean) || []

  // ── Fetch recent injections for side-effect correlation ───────────────────
  const { data: recentInjections } = await admin
    .from('injections')
    .select('*')
    .eq('user_id', user.id)
    .order('injected_at', { ascending: false })
    .limit(4)

  // ── Generate the insights (Opus for quality) ──────────────────────────────
  const { weeklyInsight, journeyInsight } = await generateWeeklyInsight(
    healthLogs,
    profile,
    priorInsightTexts,
    recentInjections || undefined
  )

  const fullInsight = `${weeklyInsight}\n\n---OVERALL JOURNEY---\n\n${journeyInsight}`

  // ── Upgrade paywall check (SKIP during IS_FREE_PERIOD) ───────────────────
  if (!IS_FREE_PERIOD) {
    const isFreeUser = !profile.subscription_status || profile.subscription_status === 'free'
    if (isFreeUser) {
      const { count: totalInsights } = await admin
        .from('weekly_insights')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      const isSecondInsightOrMore = (totalInsights || 0) >= 1
      if (isSecondInsightOrMore) {
        return NextResponse.json({
          error: 'upgrade_required',
          insight: weeklyInsight,
          journeyInsight: journeyInsight,
          message: 'Upgrade to Pro to unlock unlimited weekly insights.',
        })
      }
    }
  }

  // ── Save the insight to the database ──────────────────────────────────────
  const { error: saveError } = await admin
    .from('weekly_insights')
    .insert({
      user_id: user.id,
      week_ending: new Date().toISOString().split('T')[0],
      insight_text: fullInsight,
    })

  if (saveError) {
    return NextResponse.json({ error: saveError.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    insight: weeklyInsight,
    journeyInsight: journeyInsight,
  })
}

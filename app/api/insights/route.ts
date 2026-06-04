import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { generateWeeklyInsight } from '@/lib/claude'
import type { HealthLog } from '@/types/database'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createServiceRoleClient()

  // Get user profile
  const { data: profile } = await admin
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  // Get last 7 days of logs
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0]

  const { data: logs } = await admin
    .from('health_logs')
    .select('*')
    .eq('user_id', user.id)
    .gte('log_date', sevenDaysAgo)
    .order('log_date', { ascending: true })

  if (!logs || logs.length < 2) {
    return NextResponse.json(
      { error: 'You need at least 2 days of logs to generate an insight.' },
      { status: 400 }
    )
  }

  // Rate-limit: once every 7 days
  const { data: lastInsight } = await admin
    .from('weekly_insights')
    .select('created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (lastInsight) {
    const nextAvailable = new Date(
      new Date(lastInsight.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
    )
    if (nextAvailable > new Date()) {
      return NextResponse.json(
        { error: 'too_soon', next_available: nextAvailable.toISOString() },
        { status: 429 }
      )
    }
  }

  const insightText = await generateWeeklyInsight(logs as HealthLog[], profile)

  const weekEnding = new Date().toISOString().split('T')[0]

  const { data: insight, error } = await admin
    .from('weekly_insights')
    .insert({
      user_id: user.id,
      week_ending: weekEnding,
      insight_text: insightText,
      sent_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ insight })
}

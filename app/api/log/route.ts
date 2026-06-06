import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { generateDailyInsight } from '@/lib/claude'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const {
    log_date,
    weight_kg,
    dose_mg,
    injection_time,
    side_effects,
    food_tags,
    protein_grams,
    water_oz,
    energy_level,
    food_noise_level,
    notes,
  } = body

  if (!log_date) {
    return NextResponse.json({ error: 'log_date is required' }, { status: 400 })
  }

  if (energy_level != null && (energy_level < 1 || energy_level > 5)) {
    return NextResponse.json({ error: 'energy_level must be between 1 and 5' }, { status: 400 })
  }

  const admin = createServiceRoleClient()

  // ── 1. Save the log ───────────────────────────────────────────────────────
  const { data: savedLog, error } = await admin
    .from('health_logs')
    .upsert(
      {
        user_id: user.id,
        log_date,
        weight_kg: weight_kg ?? null,
        dose_mg: dose_mg ?? null,
        injection_time: injection_time ?? null,
        side_effects: side_effects ?? null,
        food_tags: food_tags ?? [],
        protein_grams: protein_grams ?? null,
        water_oz: water_oz ?? null,
        energy_level: energy_level ?? null,
        food_noise_level: food_noise_level ?? null,
        notes: notes ?? null,
      },
      { onConflict: 'user_id,log_date' }
    )
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // ── 2. Generate the daily Haiku insight (non-blocking) ────────────────────
  // A failure here never breaks the log save — the note simply won't show.
  let daily_insight_text: string | null = null
  try {
    daily_insight_text = await generateDailyInsight({
      log_date,
      weight_kg,
      dose_mg,
      injection_time,
      side_effects,
      food_tags: food_tags ?? [],
      protein_grams,
      water_oz,
      energy_level,
      food_noise_level,
      notes,
    })

    if (savedLog?.id && daily_insight_text) {
      await admin
        .from('health_logs')
        .update({ daily_insight_text })
        .eq('id', savedLog.id)
    }
  } catch (insightError) {
    // Log silently — insight is a nice-to-have, not a critical path
    console.error('[daily-insight] generation failed:', insightError)
  }

  return NextResponse.json({ success: true, daily_insight: daily_insight_text })
}

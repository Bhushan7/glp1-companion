import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'

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
    side_effects,
    protein_grams,
    water_oz,
    energy_level,
    notes,
  } = body

  if (!log_date) {
    return NextResponse.json({ error: 'log_date is required' }, { status: 400 })
  }

  if (energy_level != null && (energy_level < 1 || energy_level > 5)) {
    return NextResponse.json({ error: 'energy_level must be between 1 and 5' }, { status: 400 })
  }

  const admin = createServiceRoleClient()
  const { error } = await admin.from('health_logs').upsert(
    {
      user_id: user.id,
      log_date,
      weight_kg: weight_kg ?? null,
      dose_mg: dose_mg ?? null,
      side_effects: side_effects ?? null,
      protein_grams: protein_grams ?? null,
      water_oz: water_oz ?? null,
      energy_level: energy_level ?? null,
      notes: notes ?? null,
    },
    { onConflict: 'user_id,log_date' }
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

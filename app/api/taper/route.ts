/*
 * DB migration:
 * CREATE TABLE IF NOT EXISTS public.maintenance_goals (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
 *   target_weight_kg numeric,
 *   taper_start_date date,
 *   current_dose_mg numeric,
 *   target_dose_mg numeric,
 *   notes text,
 *   created_at timestamptz DEFAULT now(),
 *   updated_at timestamptz DEFAULT now()
 * );
 * ALTER TABLE public.maintenance_goals ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can manage own maintenance goals" ON public.maintenance_goals
 *   FOR ALL USING (auth.uid() = user_id);
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { target_weight_kg, taper_start_date, current_dose_mg, target_dose_mg, notes } = body

  const { data, error } = await supabase
    .from('maintenance_goals')
    .upsert(
      {
        user_id: user.id,
        target_weight_kg: target_weight_kg ?? null,
        taper_start_date: taper_start_date ?? null,
        current_dose_mg: current_dose_mg ?? null,
        target_dose_mg: target_dose_mg ?? null,
        notes: notes ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

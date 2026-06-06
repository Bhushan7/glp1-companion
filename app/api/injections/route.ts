/*
 * DB migration:
 * CREATE TABLE IF NOT EXISTS public.injections (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
 *   injected_at timestamptz NOT NULL,
 *   dose_mg numeric NOT NULL,
 *   site text NOT NULL,
 *   notes text,
 *   created_at timestamptz DEFAULT now()
 * );
 * ALTER TABLE public.injections ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can manage own injections" ON public.injections
 *   FOR ALL USING (auth.uid() = user_id);
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('injections')
    .select('*')
    .eq('user_id', user.id)
    .order('injected_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { injected_at, dose_mg, site, notes } = body

  if (!injected_at || !dose_mg || !site) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('injections')
    .insert({ user_id: user.id, injected_at, dose_mg, site, notes: notes ?? null })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

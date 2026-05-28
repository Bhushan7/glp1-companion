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
  const { name, medication, current_dose, start_date } = body

  if (!name || !medication) {
    return NextResponse.json({ error: 'name and medication are required' }, { status: 400 })
  }

  const admin = createServiceRoleClient()
  const { error } = await admin.from('users_profile').upsert(
    {
      id: user.id,
      email: user.email,
      name,
      medication,
      current_dose: current_dose ?? null,
      start_date: start_date ?? null,
    },
    { onConflict: 'id' }
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

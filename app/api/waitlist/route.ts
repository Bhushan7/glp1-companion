import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { first_name, email, medication } = body

  if (!first_name?.trim() || !email?.trim() || !medication?.trim()) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const admin = createServiceRoleClient()
  const { error } = await admin.from('waitlist_signups').insert({
    first_name: first_name.trim(),
    email: email.trim().toLowerCase(),
    medication,
  })

  if (error) {
    if (error.code === '23505') {
      // Duplicate email — return success silently to avoid enumeration
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { category, message, rating, page } = body
  if (!message?.trim() || !category) return NextResponse.json({ error: 'message and category are required' }, { status: 400 })

  const { error } = await supabase.from('feedback').insert({
    user_id: user.id,
    category,
    message: message.trim(),
    rating: rating ?? null,
    page: page ?? null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

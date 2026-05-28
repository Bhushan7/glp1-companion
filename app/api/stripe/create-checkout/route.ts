import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, getOrCreateStripeCustomer } from '@/lib/stripe'

export async function POST() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const customerId = await getOrCreateStripeCustomer(user.id, user.email!)

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return NextResponse.json({ url: session.url })
}

import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceRoleClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 })
  }

  const admin = createServiceRoleClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string

    await admin
      .from('users_profile')
      .update({
        stripe_subscription_id: subscriptionId,
        subscription_status: 'active',
      })
      .eq('stripe_customer_id', customerId)
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer as string

    await admin
      .from('users_profile')
      .update({ subscription_status: 'inactive' })
      .eq('stripe_customer_id', customerId)
  }

  return NextResponse.json({ received: true })
}

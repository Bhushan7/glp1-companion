import Stripe from 'stripe'
import { createServiceRoleClient } from './supabase/server'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
})

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const supabase = createServiceRoleClient()

  const { data: profile } = await supabase
    .from('users_profile')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single()

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { supabase_user_id: userId },
  })

  await supabase
    .from('users_profile')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId)

  return customer.id
}

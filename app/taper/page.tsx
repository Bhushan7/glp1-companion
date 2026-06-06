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
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import TaperForm from '@/components/TaperForm'
import { generateTaperPlan } from '@/lib/claude'
import type { HealthLog } from '@/types/database'

export default async function TaperPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.subscription_status !== 'pro') {
    redirect('/dashboard')
  }

  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const [{ data: goalsData }, { data: logsData }] = await Promise.all([
    supabase.from('maintenance_goals').select('*').eq('user_id', user.id).maybeSingle(),
    supabase
      .from('health_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('log_date', fourteenDaysAgo)
      .order('log_date', { ascending: false }),
  ])

  const goals = goalsData ?? null
  const recentLogs = (logsData ?? []) as HealthLog[]

  let taperPlan: string | null = null
  if (goals?.current_dose_mg != null && goals?.target_dose_mg != null) {
    try {
      taperPlan = await generateTaperPlan(profile, goals, recentLogs)
    } catch {
      taperPlan = null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Taper Plan</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Plan your off-ramp from {profile.medication ?? 'your medication'}.
          </p>
        </div>

        {/* Taper planning form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Your goals</h2>
          <TaperForm existing={goals} />
        </div>

        {/* AI-generated taper schedule */}
        {taperPlan ? (
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Your personalised taper plan</h2>
              <button
                disabled
                className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-400 cursor-not-allowed"
              >
                Download PDF — coming soon
              </button>
            </div>
            <div className="space-y-4">
              {taperPlan.split('\n\n').filter(Boolean).map((para, idx) => (
                <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ) : (
          goals?.current_dose_mg == null && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <p className="text-sm text-gray-500">
                Fill in your current and target dose above to generate your AI-guided taper plan.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  )
}

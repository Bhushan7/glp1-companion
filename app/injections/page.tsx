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
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NavBar from '@/components/NavBar'
import InjectionLogForm from '@/components/InjectionLogForm'

const SITE_LABELS: Record<string, string> = {
  'left-abdomen': 'Left Abdomen',
  'right-abdomen': 'Right Abdomen',
  'left-thigh': 'Left Thigh',
  'right-thigh': 'Right Thigh',
  'left-arm': 'Left Arm',
  'right-arm': 'Right Arm',
}

const SITE_COLORS: Record<string, string> = {
  'left-abdomen': 'bg-blue-100 text-blue-700',
  'right-abdomen': 'bg-purple-100 text-purple-700',
  'left-thigh': 'bg-amber-100 text-amber-700',
  'right-thigh': 'bg-orange-100 text-orange-700',
  'left-arm': 'bg-pink-100 text-pink-700',
  'right-arm': 'bg-teal-100 text-teal-700',
}

const ESCALATION_STEPS = [
  { label: 'Weeks 1–4', dose: '0.25 mg', startWeek: 1, endWeek: 4 },
  { label: 'Weeks 5–8', dose: '0.5 mg', startWeek: 5, endWeek: 8 },
  { label: 'Weeks 9–12', dose: '1 mg', startWeek: 9, endWeek: 12 },
  { label: 'Weeks 13+', dose: '2 mg', startWeek: 13, endWeek: Infinity },
]

function getCurrentStepIndex(startDate: string | null): number {
  if (!startDate) return 0
  const start = new Date(startDate)
  const today = new Date()
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum = Math.floor((today.getTime() - start.getTime()) / msPerWeek) + 1
  if (weekNum <= 4) return 0
  if (weekNum <= 8) return 1
  if (weekNum <= 12) return 2
  return 3
}

function formatDueDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `Due ${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}

function formatHistoryDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function InjectionsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: injections }] = await Promise.all([
    supabase.from('users_profile').select('start_date').eq('id', user.id).single(),
    supabase
      .from('injections')
      .select('*')
      .eq('user_id', user.id)
      .order('injected_at', { ascending: false }),
  ])

  const allInjections = injections ?? []
  const latest = allInjections[0] ?? null

  // Next dose due card
  const nextDue = latest ? new Date(new Date(latest.injected_at).getTime() + 7 * 24 * 60 * 60 * 1000) : null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let dueStatus: 'overdue' | 'today' | 'upcoming' = 'upcoming'
  if (nextDue) {
    const dueDay = new Date(nextDue)
    dueDay.setHours(0, 0, 0, 0)
    if (dueDay < today) dueStatus = 'overdue'
    else if (dueDay.getTime() === today.getTime()) dueStatus = 'today'
  }

  const dueColors = {
    overdue: 'bg-red-50 border-red-200 text-red-700',
    today: 'bg-amber-50 border-amber-200 text-amber-700',
    upcoming: 'bg-blue-50 border-blue-200 text-blue-700',
  }

  const currentStepIndex = getCurrentStepIndex(profile?.start_date ?? null)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Injections</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your doses and injection sites.</p>
        </div>

        {/* Next dose due */}
        {nextDue ? (
          <div className={`rounded-xl border p-4 ${dueColors[dueStatus]}`}>
            <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-0.5">Next dose</p>
            <p className="text-lg font-bold">{formatDueDate(nextDue)}</p>
            {dueStatus === 'overdue' && (
              <p className="text-sm mt-1">Your dose is overdue — consider logging today's injection.</p>
            )}
            {dueStatus === 'today' && (
              <p className="text-sm mt-1">Your dose is due today.</p>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Log your first injection below to start tracking.</p>
          </div>
        )}

        {/* Escalation schedule */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Semaglutide escalation schedule</h2>
          <div className="flex items-start gap-0">
            {ESCALATION_STEPS.map((step, idx) => {
              const isCurrent = idx === currentStepIndex
              const isDone = idx < currentStepIndex
              return (
                <div key={step.label} className="flex-1 flex flex-col items-center">
                  {/* Connector line + circle */}
                  <div className="flex items-center w-full">
                    {/* Left line */}
                    <div className={`h-0.5 flex-1 ${idx === 0 ? 'opacity-0' : isDone || isCurrent ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                    {/* Circle */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-200 ring-offset-1'
                          : isDone
                          ? 'bg-emerald-200 text-emerald-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    {/* Right line */}
                    <div className={`h-0.5 flex-1 ${idx === ESCALATION_STEPS.length - 1 ? 'opacity-0' : isDone ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                  </div>
                  {/* Label */}
                  <div className="mt-2 text-center px-0.5">
                    <p className={`text-[10px] font-semibold ${isCurrent ? 'text-emerald-700' : 'text-gray-500'}`}>
                      {step.dose}
                    </p>
                    <p className={`text-[9px] mt-0.5 ${isCurrent ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-700 rounded-full px-1.5 py-0.5 font-medium mt-1 inline-block">
                        current
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Log injection form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Log Injection</h2>
          <InjectionLogForm lastUsedSite={latest?.site ?? null} />
        </div>

        {/* Injection history */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">History</h2>
          {allInjections.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-sm text-gray-400">
              No injections logged yet.
            </div>
          ) : (
            <div className="space-y-2">
              {allInjections.map((inj: any) => (
                <div
                  key={inj.id}
                  className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{formatHistoryDate(inj.injected_at)}</p>
                    {inj.notes && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{inj.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-700">{inj.dose_mg} mg</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        SITE_COLORS[inj.site] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {SITE_LABELS[inj.site] ?? inj.site}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

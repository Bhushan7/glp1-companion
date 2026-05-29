import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import WaitlistForm from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'GLP-1 Companion — Finally understand your weight loss',
  description:
    'AI-powered health tracking for GLP-1 medication users. Find patterns in your data, generate doctor reports, and get weekly personalised insights.',
}

export default async function LandingPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white">
      {/* ─── NAV ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold text-[#1D9E75] tracking-tight">GLP-1 Companion</span>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-[#1D9E75] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#edfbf4] via-[#f5fdf9] to-white pt-20 pb-28 px-6 overflow-hidden">
        {/* Decorative blurred circles */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #1D9E75 0%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1D9E75 0%, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-[#E3F5EE] text-[#1D9E75] text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
            For Ozempic · Wegovy · Mounjaro · Zepbound
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6">
            Finally understand{' '}
            <br className="hidden sm:block" />
            <span className="text-[#1D9E75]">why your weight loss slowed down</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            GLP-1 Companion tracks your doses, symptoms, and habits — then uses AI to find the
            patterns your doctor doesn't have time to look for.
          </p>

          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-[#1D9E75] text-white text-base font-bold px-9 py-4 rounded-xl hover:bg-[#178a64] transition-colors shadow-xl shadow-[#1D9E75]/25"
          >
            Join the waitlist
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <p className="mt-4 text-sm text-gray-400">First 50 users · Hands-on onboarding · No credit card required</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─────────────────────────────────────── */}
      <section className="bg-[#1D9E75] py-5 px-6">
        <p className="text-center text-white font-medium text-sm md:text-base">
          Built for the{' '}
          <strong className="underline underline-offset-2 decoration-white/40">
            12 million Americans
          </strong>{' '}
          using GLP-1 medications for weight loss
        </p>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay on track
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Three tools that work together to give you real clarity about your GLP-1 journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <rect x="3" y="12" width="4" height="8" rx="1" strokeLinejoin="round" />
                  <rect x="10" y="8" width="4" height="12" rx="1" strokeLinejoin="round" />
                  <rect x="17" y="4" width="4" height="16" rx="1" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">AI Pattern Insights</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                See correlations between your food, hydration, energy, and weight loss. Know what&apos;s working.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Doctor Visit PDF Report</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                One tap generates a summary of your last 4 weeks. Bring it to every appointment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 8l10 6 10-6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Weekly Insight Report</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Every Friday, get a personalised email with one thing you did well and one thing to try next week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when you&apos;re ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Free</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <p className="text-sm text-gray-400 mb-8">Get started at no cost</p>

              <ul className="space-y-3 mb-10 flex-1">
                <PricingItem included>7-day log history</PricingItem>
                <PricingItem included>Basic dose reminders</PricingItem>
                <PricingItem>AI weekly insights</PricingItem>
                <PricingItem>Doctor PDF report</PricingItem>
                <PricingItem>Full history</PricingItem>
              </ul>

              <a
                href="#waitlist"
                className="block text-center border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors"
              >
                Join waitlist
              </a>
            </div>

            {/* Pro */}
            <div className="bg-[#1D9E75] rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                POPULAR
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">$9.99</span>
                <span className="text-white/60 text-sm">/month</span>
              </div>
              <p className="text-sm text-white/60 mb-8">Everything you need</p>

              <ul className="space-y-3 mb-10 flex-1">
                <PricingItemWhite>AI weekly insights every Friday</PricingItemWhite>
                <PricingItemWhite>Doctor visit PDF report</PricingItemWhite>
                <PricingItemWhite>Unlimited log history</PricingItemWhite>
                <PricingItemWhite>Pattern correlation analysis</PricingItemWhite>
                <PricingItemWhite>Cancel anytime</PricingItemWhite>
              </ul>

              <a
                href="#waitlist"
                className="block text-center bg-white text-[#1D9E75] font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Join waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ─────────────────────────────────────────── */}
      <section
        id="waitlist"
        className="py-24 px-6"
        style={{ background: 'linear-gradient(135deg, #0a5e42 0%, #1D9E75 60%, #24b585 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Limited spots available
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Get early access
          </h2>
          <p className="text-lg text-white/75 mb-10 leading-relaxed">
            We&apos;re onboarding our first 50 users manually. Join the waitlist and we&apos;ll
            reach out within 24 hours.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-[#1D9E75] mb-3">GLP-1 Companion</p>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            GLP-1 Companion is a personal wellness journal, not a medical device. Always follow
            your doctor&apos;s guidance.
          </p>
          <p className="mt-4 text-xs text-gray-300">© 2025 GLP-1 Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// ─── Small pricing helpers ───────────────────────────────────────────────────

function CheckGreen() {
  return (
    <svg className="w-5 h-5 text-[#1D9E75] shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  )
}

function CrossGray() {
  return (
    <svg className="w-5 h-5 text-gray-300 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  )
}

function CheckWhite() {
  return (
    <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  )
}

function PricingItem({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className={`flex items-center gap-3 text-sm ${included ? 'text-gray-700' : 'text-gray-300'}`}>
      {included ? <CheckGreen /> : <CrossGray />}
      {children}
    </li>
  )
}

function PricingItemWhite({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm text-white">
      <CheckWhite />
      {children}
    </li>
  )
}

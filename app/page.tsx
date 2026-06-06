import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import InsightCarousel from '@/components/InsightCarousel'

export const metadata: Metadata = {
  title: 'GLP Coach — The AI coach for your GLP-1 journey',
  description:
    'Every other app tracks your shots. GLP Coach tells you what to do about them — protein and muscle coaching, side-effect patterns, plateau reframes, and a personalised weekly AI insight.',
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
          <span className="text-lg font-bold text-[#1D9E75] tracking-tight">GLP Coach</span>
          <div className="flex items-center gap-5">
            <a href="#pricing" className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-[#1D9E75] transition-colors">
              Pricing
            </a>
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-[#1D9E75] px-4 py-2 rounded-lg hover:bg-[#178a64] transition-colors"
            >
              Start free
            </Link>
          </div>
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
            Every app tracks your shots.{' '}
            <br className="hidden sm:block" />
            <span className="text-[#1D9E75]">This one tells you what to do about them.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            GLP Coach reads your doses, symptoms, protein, and weight — then uses AI to spot the
            patterns that protect your muscle, ease side effects, and keep you from quitting.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#1D9E75] text-white text-base font-bold px-9 py-4 rounded-xl hover:bg-[#178a64] transition-colors shadow-xl shadow-[#1D9E75]/25"
          >
            Start free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <p className="mt-4 text-sm text-gray-400">Free to start · No credit card required · Your first AI insight is on us</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─────────────────────────────────────── */}
      <section className="bg-[#1D9E75] py-5 px-6">
        <p className="text-center text-white font-medium text-sm md:text-base">
          Built for the{' '}
          <strong className="underline underline-offset-2 decoration-white/40">
            millions of people
          </strong>{' '}
          on GLP-1 medications for weight loss
        </p>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The coaching layer no tracker has
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Most apps show you charts. GLP Coach interprets them — like a coach who actually reads your data.
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">Muscle &amp; protein coaching</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Up to half the weight you lose on a GLP-1 can be muscle. We track your protein against your target and warn you before it&apos;s a problem.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Side-effect &amp; plateau patterns</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                We connect your injection timing and food to your nausea and fatigue — and reframe plateaus so you don&apos;t quit when the scale stalls.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Personalised weekly AI insight</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Every week, a plain-English report on what worked, what to fix, and the one change worth making next — built from your own data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSIGHT CAROUSEL ─────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InsightCarousel />
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when the insights prove their worth.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Free</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-400 text-sm">forever</span>
              </div>
              <p className="text-sm text-gray-400 mb-8">Everything you need to start</p>

              <ul className="space-y-3 mb-10 flex-1">
                <PricingItem included>Daily health logging</PricingItem>
                <PricingItem included>Injection &amp; dose reminders</PricingItem>
                <PricingItem included>14-day log history</PricingItem>
                <PricingItem included>1 AI insight to try</PricingItem>
                <PricingItem>Unlimited weekly AI insights</PricingItem>
              </ul>

              <Link
                href="/login"
                className="block text-center border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors"
              >
                Start free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#1D9E75] rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                BEST VALUE
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">$59.99</span>
                <span className="text-white/60 text-sm">/year</span>
              </div>
              <p className="text-sm text-white/70 mb-8">Just $5/mo, billed annually · or $8.99/mo</p>

              <ul className="space-y-3 mb-10 flex-1">
                <PricingItemWhite>Unlimited weekly AI insights</PricingItemWhite>
                <PricingItemWhite>Muscle &amp; protein deficit coaching</PricingItemWhite>
                <PricingItemWhite>Side-effect &amp; plateau analysis</PricingItemWhite>
                <PricingItemWhite>Food-noise &amp; psychology tracking</PricingItemWhite>
                <PricingItemWhite>Unlimited history &amp; doctor PDF</PricingItemWhite>
              </ul>

              <Link
                href="/login"
                className="block text-center bg-white text-[#1D9E75] font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Start 7-day free trial
              </Link>
              <p className="mt-3 text-center text-xs text-white/60">7-day free trial · cancel anytime</p>
            </div>
          </div>

          {/* Maintenance add-on note */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Approaching your goal weight?{' '}
            <span className="font-semibold text-gray-700">Maintenance &amp; off-ramp planning</span>{' '}
            is available as an add-on for Pro members.
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(135deg, #0a5e42 0%, #1D9E75 60%, #24b585 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Understand your journey this week
          </h2>
          <p className="text-lg text-white/75 mb-10 leading-relaxed">
            Sign up free, log a few days, and get a personalised AI insight that actually tells you
            what to do next. No credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-[#1D9E75] text-base font-bold px-9 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-xl"
          >
            Start free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-[#1D9E75] mb-3">GLP Coach</p>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            GLP Coach is a personal wellness journal, not a medical device. Always follow
            your doctor&apos;s guidance.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
              Refund Policy
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-300">© 2026 GLP Coach. All rights reserved.</p>
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

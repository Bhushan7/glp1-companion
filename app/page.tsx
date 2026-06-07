// app/page.tsx
import Link from 'next/link'
import InsightCarousel from '@/components/InsightCarousel'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-gray-900 text-lg">GLP Coach</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="bg-[#1D9E75] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#178a64] transition-colors">
              Get free access →
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-20 pb-16 px-6 text-center bg-gradient-to-b from-[#f0fdf8] to-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm">☕</span>
            <span className="text-xs font-semibold text-amber-800">Free access during early launch — no credit card needed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Your GLP-1 journey,{' '}
            <span className="text-[#1D9E75]">finally understood</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Track your weight, energy, side effects, and protein intake. Get weekly AI insights
            that explain what's actually happening — and what to do next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-[#1D9E75] text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-[#178a64] transition-colors shadow-lg shadow-[#1D9E75]/20">
              Start tracking for free →
            </Link>
            <a href="#how-it-works" className="text-gray-600 font-medium px-8 py-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors text-base">
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">Free during early launch · No credit card · Sign in with Google</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for how GLP-1s actually work</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Not just a weight tracker. A companion that understands the full picture — muscle, side effects, food noise, and the psychology of the journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Daily health logging</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Weight, dose, side effects, protein, energy, food noise — all in one 60-second daily log. Designed for real life, not a lab.</p>
            </div>
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Muscle & protein alerts</h3>
              <p className="text-gray-500 leading-relaxed text-sm">GLP-1s can cause muscle loss if protein is too low. We track your intake and warn you before it becomes a problem — something no other app does.</p>
            </div>
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1D9E75]/20 transition-all">
              <div className="w-12 h-12 bg-[#E3F5EE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Weekly AI insight</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Every week, a plain-English report on what worked, what to fix, and the one change worth making next — built from your own data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHT CAROUSEL */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InsightCarousel />
        </div>
      </section>

      {/* WHY FREE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-6">
            <span className="text-2xl">🌱</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why is it free right now?</h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            GLP Coach is in early launch. Before we charge anyone, we want real people on real medications to use it, break it, and tell us what's missing. Your experience shapes the product. In return, you get full access — for free during this period.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left space-y-3">
            {['Full AI-powered weekly insights — no limit', 'Muscle & protein loss alerts', 'Side effect & GI pattern detection', 'Complete log history', 'Journey progress summary'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-[#1D9E75] font-bold text-lg">✓</span>
                <span className="text-sm text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/login" className="inline-block bg-[#1D9E75] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#178a64] transition-colors shadow-lg shadow-[#1D9E75]/20">
              Get free access →
            </Link>
            <p className="mt-3 text-xs text-gray-400">No credit card · Sign in with Google</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-white text-lg">GLP Coach</span>
          </div>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            GLP Coach is a wellness journal and tracking tool. It is not a medical device and does not provide medical advice. Always follow your doctor's guidance.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">Terms of Service</Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">© 2026 GLP Coach. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

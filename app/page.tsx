import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your weekly{' '}
          <span style={{ color: '#1D9E75' }}>GLP-1 companion</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your weight, nutrition, energy, and side effects. Get a personalized
          AI insight report every Friday — built for Ozempic, Wegovy, Mounjaro, and
          Zepbound users.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-[#1D9E75] text-white px-8 py-3 text-base font-semibold hover:bg-[#178a64] transition-colors"
        >
          Get started — $9.99/month
        </Link>
      </div>
    </main>
  )
}

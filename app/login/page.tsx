'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-sm text-gray-500 mb-6">
          We&apos;ll send you a magic link — no password needed.
        </p>

        {sent ? (
          <div className="rounded-lg bg-green-50 p-4 text-sm text-[#1D9E75] font-medium">
            Check your email! A sign-in link is on its way to <strong>{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1D9E75] text-white py-2.5 text-sm font-semibold hover:bg-[#178a64] transition-colors disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

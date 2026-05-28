'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NavBar() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold" style={{ color: '#1D9E75' }}>
            GLP-1 Companion
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm text-gray-700 hover:text-[#1D9E75] font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/log"
            className="text-sm text-gray-700 hover:text-[#1D9E75] font-medium transition-colors"
          >
            Log Today
          </Link>
          <Link
            href="/report"
            className="text-sm text-gray-700 hover:text-[#1D9E75] font-medium transition-colors"
          >
            Reports
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

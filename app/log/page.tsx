'use client'

export const dynamic = 'force-dynamic'

import NavBar from '@/components/NavBar'
import LogForm from '@/components/LogForm'

export default function LogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <LogForm />
      </main>
    </div>
  )
}

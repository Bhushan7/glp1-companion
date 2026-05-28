'use client'

import { useState } from 'react'

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    const res = await fetch('/api/stripe/create-checkout', { method: 'POST' })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="shrink-0 rounded-lg bg-[#1D9E75] text-white px-4 py-1.5 text-sm font-semibold hover:bg-[#178a64] transition-colors disabled:opacity-60"
    >
      {loading ? 'Loading…' : 'Subscribe'}
    </button>
  )
}

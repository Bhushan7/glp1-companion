'use client'

import { BUY_ME_A_COFFEE_URL } from '@/lib/config'
import { useState } from 'react'

export default function BuyMeCoffeeBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl shrink-0">☕</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900">GLP Coach is free right now</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">If it's helping your journey, a coffee keeps the lights on and the AI running 🙏</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={BUY_ME_A_COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Buy me a coffee
        </a>
        <button onClick={() => setDismissed(true)} className="text-amber-400 hover:text-amber-600 text-lg leading-none p-1">×</button>
      </div>
    </div>
  )
}

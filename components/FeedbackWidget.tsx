'use client'

import { useState } from 'react'

type Category = 'love_it' | 'feature_request' | 'bug' | 'general'

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'love_it', label: 'Love it!', emoji: '❤️' },
  { value: 'feature_request', label: 'Feature idea', emoji: '💡' },
  { value: 'bug', label: 'Something broken', emoji: '🐛' },
  { value: 'general', label: 'General feedback', emoji: '💬' },
]

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<Category | null>(null)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!message.trim() || !category) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          message: message.trim(),
          rating,
          page: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      setTimeout(() => {
        setOpen(false)
        setSubmitted(false)
        setCategory(null)
        setMessage('')
        setRating(null)
      }, 2500)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#1D9E75] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-[#178a64] transition-all hover:scale-105 active:scale-95"
      >
        <span>💬</span>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Share your thoughts</h2>
                <p className="text-xs text-gray-500 mt-0.5">Your feedback shapes the product</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="text-4xl mb-3">🙏</div>
                <p className="text-base font-semibold text-gray-900">Thank you!</p>
                <p className="text-sm text-gray-500 mt-1">Your feedback means a lot.</p>
              </div>
            ) : (
              <div className="px-6 py-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What's this about?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setCategory(c.value)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          category === c.value
                            ? 'border-[#1D9E75] bg-[#edfbf4] text-[#1D9E75]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span>{c.emoji}</span><span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">How's your experience so far?</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating(star)} className={`text-2xl transition-transform hover:scale-110 ${rating !== null && star <= rating ? 'opacity-100' : 'opacity-30'}`}>⭐</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tell us more</p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind? Be as specific as you like…"
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30 focus:border-[#1D9E75] resize-none"
                  />
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || !category || submitting}
                  className="w-full bg-[#1D9E75] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#178a64] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Send Feedback'}
                </button>
                <p className="text-center text-xs text-gray-400 -mt-2">You're using GLP Coach for free. Thank you for helping us improve! 🌱</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

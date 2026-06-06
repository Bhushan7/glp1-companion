'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DOSE_OPTIONS = [0.25, 0.5, 1, 1.7, 2]

const SITE_LABELS: Record<string, string> = {
  'left-abdomen': 'L. Abd.',
  'right-abdomen': 'R. Abd.',
  'left-thigh': 'L. Thigh',
  'right-thigh': 'R. Thigh',
  'left-arm': 'L. Arm',
  'right-arm': 'R. Arm',
}

// Zones from patient's own perspective (mirror view: patient's left = screen left)
const SVG_ZONES: Record<string, { x: number; y: number; w: number; h: number }> = {
  'left-arm':      { x: 32,  y: 62,  w: 28, h: 60 },
  'right-arm':     { x: 140, y: 62,  w: 28, h: 60 },
  'left-abdomen':  { x: 70,  y: 80,  w: 27, h: 48 },
  'right-abdomen': { x: 103, y: 80,  w: 27, h: 48 },
  'left-thigh':    { x: 68,  y: 165, w: 26, h: 62 },
  'right-thigh':   { x: 106, y: 165, w: 26, h: 62 },
}

function zoneLabelLines(siteId: string): [string, string] {
  const parts = SITE_LABELS[siteId].split(' ')
  return [parts[0], parts[1] ?? '']
}

export default function InjectionLogForm({ lastUsedSite }: { lastUsedSite: string | null }) {
  const router = useRouter()

  const [injectedAt, setInjectedAt] = useState(() => {
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const local = new Date(now.getTime() - offset * 60 * 1000)
    return local.toISOString().slice(0, 16)
  })
  const [doseMg, setDoseMg] = useState<number | null>(null)
  const [site, setSite] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!doseMg || !site) {
      setError('Please select a dose and injection site.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/injections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          injected_at: new Date(injectedAt).toISOString(),
          dose_mg: doseMg,
          site,
          notes: notes.trim() || null,
        }),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Failed to save injection')
      }
      setSuccess(true)
      setDoseMg(null)
      setSite(null)
      setNotes('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Date & Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date &amp; Time</label>
        <input
          type="datetime-local"
          value={injectedAt}
          onChange={(e) => setInjectedAt(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Dose selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dose</label>
        <div className="flex flex-wrap gap-2">
          {DOSE_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDoseMg(d)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                doseMg === d
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-400'
              }`}
            >
              {d} mg
            </button>
          ))}
        </div>
      </div>

      {/* SVG body map */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Injection Site <span className="text-xs text-gray-400 font-normal">(your perspective)</span>
        </label>
        <div className="flex justify-center">
          <svg
            viewBox="0 0 200 260"
            className="w-44 h-56 cursor-pointer select-none"
            aria-label="Body map for injection site selection"
          >
            {/* Head */}
            <circle cx="100" cy="22" r="17" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Neck */}
            <rect x="89" y="39" width="22" height="14" fill="#f3f4f6" />
            {/* Torso */}
            <rect x="66" y="51" width="68" height="96" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Left arm background */}
            <rect x="28" y="55" width="34" height="74" rx="6" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Right arm background */}
            <rect x="138" y="55" width="34" height="74" rx="6" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Left leg background */}
            <rect x="66" y="158" width="30" height="82" rx="6" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Right leg background */}
            <rect x="104" y="158" width="30" height="82" rx="6" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />

            {/* Clickable zones */}
            {Object.entries(SVG_ZONES).map(([siteId, zone]) => {
              const isSelected = site === siteId
              const isLastUsed = lastUsedSite === siteId && !isSelected
              const cx = zone.x + zone.w / 2
              const cy = zone.y + zone.h / 2
              const [line1, line2] = zoneLabelLines(siteId)
              return (
                <g key={siteId} onClick={() => setSite(siteId)} aria-label={SITE_LABELS[siteId]}>
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx="4"
                    fill={isSelected ? '#10b981' : isLastUsed ? '#d1fae5' : '#e5e7eb'}
                    stroke={isSelected ? '#059669' : isLastUsed ? '#6ee7b7' : '#d1d5db'}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text x={cx} y={cy - 3} textAnchor="middle" fontSize="5.5" fill={isSelected ? 'white' : '#374151'} style={{ pointerEvents: 'none' }}>
                    {line1}
                  </text>
                  <text x={cx} y={cy + 5} textAnchor="middle" fontSize="5.5" fill={isSelected ? 'white' : '#374151'} style={{ pointerEvents: 'none' }}>
                    {line2}
                  </text>
                  {isLastUsed && (
                    <text x={cx} y={cy + 14} textAnchor="middle" fontSize="4.5" fill="#059669" style={{ pointerEvents: 'none' }}>
                      last
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        {site ? (
          <p className="text-center text-sm text-emerald-700 font-medium mt-1">{SITE_LABELS[site]} selected</p>
        ) : (
          <p className="text-center text-xs text-gray-400 mt-1">Tap a zone to select</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="e.g. slight redness, nausea after…"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-emerald-600 font-medium">Injection logged successfully!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 text-white px-5 py-3 text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving…' : 'Log Injection'}
      </button>
    </form>
  )
}

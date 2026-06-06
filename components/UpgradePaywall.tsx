// components/UpgradePaywall.tsx
'use client'

export default function UpgradePaywall() {
  const paddleAnnualUrl = 'https://checkout.paddle.com/glpcoach-pro-annual' // Placeholder — swap in real URL from Paddle
  const paddleMonthlyUrl = 'https://checkout.paddle.com/glpcoach-pro-monthly' // Placeholder

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1D9E75] to-[#178a64] px-8 py-10 text-center">
          <div className="text-4xl mb-3">✨</div>
          <h2 className="text-2xl font-bold text-white mb-2">You've unlocked a preview</h2>
          <p className="text-white/90 text-sm">
            Upgrade to Pro to unlock unlimited insights and deeper coaching
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* What they get */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              With Pro, you get:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#1D9E75] text-lg mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Unlimited weekly insights</p>
                  <p className="text-xs text-gray-500">Every week, not just once</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#1D9E75] text-lg mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Your journey summary</p>
                  <p className="text-xs text-gray-500">See your full progress arc</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#1D9E75] text-lg mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Personalized coaching</p>
                  <p className="text-xs text-gray-500">Protein, muscle, plateau, psychology</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#1D9E75] text-lg mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Full health history</p>
                  <p className="text-xs text-gray-500">Access all your logs forever</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8 p-4 bg-[#edfbf4] rounded-lg border border-[#1D9E75]/20">
            <p className="text-xs text-gray-600 mb-2">CHOOSE YOUR PLAN</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-left">
                <p className="text-lg font-bold text-[#1D9E75]">$59.99</p>
                <p className="text-xs text-gray-600">per year</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1D9E75]">$8.99</p>
                <p className="text-xs text-gray-600">per month</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <a
              href={paddleAnnualUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#1D9E75] text-white font-bold py-3 rounded-xl hover:bg-[#178a64] transition-colors"
            >
              Upgrade — $59.99/year
            </a>
            <a
              href={paddleMonthlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-center text-center border-2 border-[#1D9E75] text-[#1D9E75] font-semibold py-3 rounded-xl hover:bg-[#edfbf4] transition-colors"
            >
              Upgrade — $8.99/month
            </a>
          </div>

          {/* Fine print */}
          <p className="mt-6 text-xs text-gray-400 text-center">
            7-day free trial · Cancel anytime · No hidden fees
          </p>
        </div>
      </div>
    </div>
  )
}

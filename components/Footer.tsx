import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} GLP Coach. Not a medical device.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
            Terms of Service
          </Link>
          <Link href="/refund-policy" className="text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
            Refund Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

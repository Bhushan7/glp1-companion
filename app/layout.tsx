import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GLP-1 Companion',
  description: 'Weekly AI-powered health tracking for GLP-1 medication users',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-700 antialiased">{children}</body>
    </html>
  )
}

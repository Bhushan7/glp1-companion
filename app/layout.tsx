import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GLP-1 Companion',
  description: 'Weekly AI-powered health tracking for GLP-1 medication users',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-700 antialiased flex flex-col min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  )
}

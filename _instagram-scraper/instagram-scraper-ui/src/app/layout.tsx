import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram Hashtag Scraper',
  description: 'Scrape Instagram user data by hashtag',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

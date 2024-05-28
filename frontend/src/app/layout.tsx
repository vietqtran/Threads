import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ReduxProvider from '@/providers/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcomMERN',
  icons: [
    {
      url: '/assets/images/logo.svg',
      href: '/assets/images/logo.svg'
    }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}

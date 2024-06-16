import './globals.css'

import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads',
  icons: {
    icon: '/images/logo.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={robotoFlex.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" key={'theme'}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

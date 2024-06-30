import './globals.css'
import 'simplebar-react/dist/simplebar.min.css'

import type { Metadata } from 'next'
import Modal from '@/components/Common/Modal'
import { Roboto_Flex } from 'next/font/google'
import { StoresProvider } from '@/providers/StoresProvider'
import TanstackQueryProvider from '@/providers/TanstackQueryProvider'
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
        <TanstackQueryProvider>
          <StoresProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" key={'theme'}>
              {children}
              <Modal />
            </ThemeProvider>
          </StoresProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}

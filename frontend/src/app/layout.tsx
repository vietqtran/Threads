import 'simplebar-react/dist/simplebar.min.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import './globals.css'

import Modal from '@/components/Common/Modal'
import { StoresProvider } from '@/providers/StoresProvider'
import TanstackQueryProvider from '@/providers/TanstackQueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import { Toaster } from 'sonner'

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
              <Toaster position="bottom-center" duration={2000} />
              <Modal />
            </ThemeProvider>
          </StoresProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}

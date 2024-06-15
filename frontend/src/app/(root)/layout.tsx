import MainLayout from '@/components/Common/Layout/MainLayout'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>
}

export default RootLayout

import Header from '@/components/common/Header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full min-h-screen min-w-full">
      <Header />
      <main className="relative top-16">{children}</main>
    </div>
  )
}

export default Layout

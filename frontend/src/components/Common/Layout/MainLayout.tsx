import Header from '../Header'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen">
      <div className="size-full">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default MainLayout

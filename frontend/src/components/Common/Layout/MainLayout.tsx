import Header from '../Header'
import React from 'react'
import AddThreadButton from './AddThreadButton'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen">
      <div className="size-full">
        <Header />
        {children}
      </div>
      <AddThreadButton />
    </div>
  )
}

export default MainLayout

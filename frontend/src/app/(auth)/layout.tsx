import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid min-h-screen place-items-center">
      <div className="gradient-background__wrapper">
        <div className="gradient-background">
          <div className="gradient-background__shape gradient-background__shape--1"></div>
          <div className="gradient-background__shape gradient-background__shape--2"></div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="grid size-full place-items-center">{children}</div>
      </div>
    </div>
  )
}

export default Layout

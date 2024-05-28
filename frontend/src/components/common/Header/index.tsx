'use client'

import Address from './Address'
import Controls from './Controls'
import Logo from './Logo'
import React from 'react'
import SearchBar from './SearchBar'
import SelectCategoryContent from './SearchBar/SelectCategoryContent'

const Header = () => {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 h-16 w-full border-b bg-background">
        <div className="flex size-full items-center justify-between gap-2 px-4 sm:gap-4">
          <Logo />
          <Address />
          <SearchBar />
          <Controls />
        </div>
      </header>
      <SelectCategoryContent />
    </>
  )
}

export default Header

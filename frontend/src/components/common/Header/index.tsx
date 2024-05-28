'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Controls from './Controls'
import Logo from './Logo'
import SearchBar from './SearchBar'
import SelectCategoryContent from './SelectCategoryContent'

const Header = () => {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 h-16 w-full border-b bg-background">
        <div className="flex size-full items-center justify-between gap-4 px-4">
          <Logo />
          <SearchBar />
          <Controls />
        </div>
      </header>

      <SelectCategoryContent />
    </>
  )
}

export default Header

'use client'

import Icon from '@/components/Common/Icon'
import Link from 'next/link'
import Menu from './Menu'
import NavBar from './NavBar'
import Pin from './Pin'
import React from 'react'

const Header = () => {
  return (
    <header className="bg- fixed inset-y-0 left-0 flex h-screen w-19 flex-col bg-background/85 backdrop-blur-lg">
      <div className="flex flex-shrink-0 justify-center py-15px">
        <Link href="/" className="block duration-200 ease-linear hover:scale-105 active:scale-90">
          <Icon className="hidden dark:block" size={34} name="threads_white" />
          <Icon className="dark:hidden" size={34} name="threads_black" />
        </Link>
      </div>

      <NavBar />

      <div className="flex h-[130px] w-full flex-shrink-0 justify-center">
        <ul className="mb-5.5">
          <Pin />
          <Menu />
        </ul>
      </div>
    </header>
  )
}

export default Header

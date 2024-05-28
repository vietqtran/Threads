'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className="aspect-square h-9 w-9 min-w-9">
      <Link href={'/'} className="block size-full">
        <Image src="/assets/images/logo.svg" className="h-full w-full" alt="logo" width={40} height={40} priority />
      </Link>
    </div>
  )
}

export default Logo

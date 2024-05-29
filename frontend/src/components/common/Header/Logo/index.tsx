'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className="aspect-square h-9 min-w-9 sm:min-w-36">
      <Link href={'/'} className="block size-full">
        <div className="hidden size-full sm:block">
          <Image
            src="/assets/images/logo-tagline-black.svg"
            className="block size-full dark:hidden"
            alt=""
            width={40}
            height={40}
            priority
          />
          <Image
            src="/assets/images/logo-tagline-white.svg"
            className="hidden size-full dark:block"
            alt=""
            width={40}
            height={40}
            priority
          />
        </div>
        <Image src="/assets/images/logo.svg" className="h-full sm:hidden" alt="" width={40} height={40} priority />
      </Link>
    </div>
  )
}

export default Logo

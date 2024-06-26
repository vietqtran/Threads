import Image from 'next/image'
import React from 'react'
import Icon from '../Icon'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative bg-white dark:bg-black w-screen">
      <div className="h-1/2 sm:block hidden z-0 absolute w-full top-0 inset-x-0">
        <Image
          src="/images/auth-bg.webp"
          className="h-full w-full object-cover"
          alt=""
          priority
          width={5000}
          height={5000}
        />
      </div>
      <div className="z-10 absolute mb-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[418px] ">
        <div className='w-full sm:hidden flex justify-center'>
          <Icon name='logo_transparent_white' size={60} className='dark:block hidden' />
          <Icon name='logo_transparent_black' size={60} className='dark:hidden' />
        </div>
        <div className='size-full md:p-6 p-4'>
          <div className="size-full">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

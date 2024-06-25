import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative w-screen">
      <div className='h-1/2 z-0 absolute w-full top-0 inset-x-0'>
        <Image src="/images/auth-bg.webp" className='h-full w-full object-cover' alt="" priority width={5000} height={5000} />
      </div>
      <div className='z-10 absolute mb-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[418px] md:p-6 px-4'>
        <div className='size-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

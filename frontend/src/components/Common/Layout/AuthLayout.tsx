'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import Icon from '../Icon'
import { useModalStore } from '@/providers/StoresProvider'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { closeModal } = useModalStore(state => state)
    useEffect(() => {
        closeModal()
    }, [])

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
                <div className="w-full sm:hidden flex justify-center">
                    <Icon name="logo_transparent_white" size={60} className="dark:block hidden" />
                    <Icon name="logo_transparent_black" size={60} className="dark:hidden" />
                </div>
                <div className="size-full md:p-6 p-4">
                    <div className="size-full">{children}</div>
                </div>
            </div>

            <div className="absolute inset-x-0 h-[70px] py-3 leading-[21px] bottom-0 flex items-center justify-center gap-x-3 gap-y-0 flex-wrap text-secondary text-xs">
                <span className="h-[21px]">© 2024</span>
                <span className="h-[21px]">Threads Terms</span>
                <span className="h-[21px]">Privacy Policy</span>
                <span className="h-[21px]">Cookies Policy</span>
                <span className="h-[21px]">Report a problem</span>
            </div>
        </div>
    )
}

export default AuthLayout

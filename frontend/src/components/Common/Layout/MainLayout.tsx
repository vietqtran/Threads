'use client'

import Header from '../Header'
import React from 'react'
import AddThreadButton from './AddThreadButton'
import { useUserStore } from '@/providers/StoresProvider'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserStore(state => state)
    return (
        <div className="h-screen w-screen">
            <div className="size-full">
                <Header />
                {children}
            </div>
            {!!user && <AddThreadButton />}
        </div>
    )
}

export default MainLayout

'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/providers/StoresProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const WithAuth = (Component: React.FunctionComponent, isAuthPage = false) => {
  return function WithAuthComponent(props: any) {
    const { push } = useRouter()
    const { authenticate } = useAuth()
    const { user, setUser } = useUserStore(state => state)

    useEffect(() => {
      const checkUser = async () => {
        const authResponse = await authenticate()
        if (authResponse) {
          if (!user && !isAuthPage) {
            push('/login')
            return
          }
          if (user && isAuthPage) {
            push('/')
            return
          }
        } else {
          push('/login')
          return
        }
      }
      checkUser()
    }, [])

    return <Component {...props} />
  }
}

export default WithAuth

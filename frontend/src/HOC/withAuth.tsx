'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const WithAuth = (Component: React.FunctionComponent, isAuthPage = false) => {
  return function WithAuthComponent(props: any) {
    const { push } = useRouter()
    const { authenticate } = useAuth()

    useEffect(() => {
      const checkUser = async () => {
        const isAuthenticated = await authenticate()
        console.log(isAuthenticated)
        if (!isAuthenticated && !isAuthPage) {
          push('/login')
          return
        }
        if (isAuthenticated && isAuthPage) {
          push('/')
          return
        }
      }
      checkUser()
    }, [])

    return <Component {...props} />
  }
}

export default WithAuth

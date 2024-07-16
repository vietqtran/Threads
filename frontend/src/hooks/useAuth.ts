import { LoginCredential, SignUpCredential } from '@/types/auth'
import { Response } from '@/types'
import instance from '@/utils/axios/axios.instance'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const login = async ({ credential, password }: LoginCredential) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const response = (await instance.post('/auth/login', {
        credential,
        password
      })) as Response
      if (!response.isError) {
        push('/')
        console.log(response)
      }
    } catch (error: any) {
      console.log(error.response.data)
      if (error.response.data) {
        toast(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async ({ credential, password, username }: SignUpCredential) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const response = (await instance.post('/auth/register', {
        credential,
        password,
        username
      })) as Response
      if (!response.isError) {
        push('/login')
        console.log(response)
      }
    } catch (error: any) {
      console.log(error.response.data)
      if (error.response.data) {
        toast(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    login,
    signup
  }
}

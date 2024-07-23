import { LoginCredential, SignUpCredential } from '@/types/auth'
import { Response } from '@/types'
import instance from '@/utils/axios/axios.instance'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/providers/StoresProvider'

export const useAuth = () => {
  const { push } = useRouter()
  const { setUser } = useUserStore(state => state)
  const [isLoading, setIsLoading] = useState(false)

  const authenticate = async () => {
    try {
      const response = (await instance.get('/auth/authenticate', { withCredentials: true })) as Response
      if (response && !!response.data) {
        setUser(response.data)
        return true
      }
      return false
    } catch (error: any) {
      setUser(null)
      console.log(error)
      return false
    }
  }

  const login = async (loginCredential: LoginCredential) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const response = (await instance.post('/auth/login', loginCredential)) as Response
      if (!response.isError) {
        setUser(response.data)
        push('/')
      }
    } catch (error: any) {
      console.log(error)
      if (error) {
        toast(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (signUpCredential: SignUpCredential) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const response = (await instance.post('/auth/register', signUpCredential)) as Response
      if (!response.isError) {
        push('/login')
      }
    } catch (error: any) {
      console.log(error)
      if (error) {
        toast(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const response = (await instance.post('/auth/logout', {}, {withCredentials: true}))
      if(response) {
        setUser(null)
        push('/login')
      }
    } catch (err: any) {
      console.log(err)
      if(err.message) {
        toast(err.message)
      }
    }
  }

  return {
    isLoading,
    authenticate,
    login,
    signup,
    logout
  }
}

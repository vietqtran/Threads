import { LoginCredential, SignUpCredential } from '@/types/auth'
import { Response } from '@/types'
import instance from '@/utils/axios/axios.instance'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/providers/StoresProvider'
import { User } from '@/types/user'

export const useAuth = () => {
    const { push } = useRouter()
    const { setUser } = useUserStore(state => state)
    const [isLoading, setIsLoading] = useState(false)

    const authenticate = async () => {
        try {
            const { data } = await instance.get<Response<User>>('/auth/authenticate', { withCredentials: true })
            if (data.data) {
                setUser(data.data)
                return true
            }
            setUser(null)
            return false
        } catch (error) {
            setUser(null)
            console.error('Authentication error:', error)
            return false
        }
    }

    const login = async (loginCredential: LoginCredential) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<User>>('/auth/login', loginCredential)
            if (data.data) {
                setUser(data.data)
                push('/')
            }
        } catch (error) {
            console.error('Login error:', error)
            if (error instanceof Error) {
                toast(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (signUpCredential: SignUpCredential) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<User>('/auth/register', signUpCredential)
            if (data) {
                toast('Sign up success! Please login.')
                push('/login')
            }
        } catch (error) {
            console.error('Signup error:', error)
            if (error instanceof Error) {
                toast(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            const { data } = await instance.post<User>('/auth/logout', {}, { withCredentials: true })
            if (data) {
                setUser(null)
                push('/login')
            }
        } catch (error) {
            console.error('Logout error:', error)
            if (error instanceof Error) {
                toast(error.message)
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

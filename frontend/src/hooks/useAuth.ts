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
            const response = await instance.get<Response>('/auth/authenticate', { withCredentials: true })
            if (response.data) {
                setUser(response.data.data)
                return true
            }
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
            const response = await instance.post<Response>('/auth/login', loginCredential)
            if (!response.data.isError) {
                setUser(response.data.data)
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
            const response = await instance.post<Response>('/auth/register', signUpCredential)
            if (!response.data.isError) {
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
            const response = await instance.post<Response>('/auth/logout', {}, { withCredentials: true })
            if (response.data) {
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

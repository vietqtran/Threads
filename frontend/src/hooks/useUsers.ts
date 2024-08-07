import { Response } from '@/types'
import { User } from '@/types/user'
import instance from '@/utils/axios/axios.instance'
import { useState } from 'react'

export const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false)

    const getAllUsers = async () => {
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<User[]>>('/users', { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return []
        } catch (err: any) {
            console.log('Get users error: ', err)
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const getUserByUsername = async (username: string) => {
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<User>>(`/users/${username}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (err: any) {
            console.log('Get user by username error: ', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const updateUser = async (id: string, updateFields: Partial<User>) => {
        setIsLoading(true)
        try {
            const { data } = await instance.put<Response<User>>(`/users/${id}`, updateFields, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (err: any) {
            console.log('Update user error: ', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const requestFollow = async (from: string, to: string, isAccepted: boolean) => {
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<User>>(
                `/users/follow`,
                { from, to, isAccepted },
                { withCredentials: true }
            )
            if (data.data) {
                return data.data
            }
            return null
        } catch (err: any) {
            console.log('Request follow error: ', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const acceptFollow = async (from: string, to: string) => {
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<User>>(
                `/users/accept-follow`,
                { from, to },
                { withCredentials: true }
            )
            if (data.data) {
                return data.data
            }
            return null
        } catch (err: any) {
            console.log('Accept follow error: ', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getFollowing = async (id: string) => {
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<User[]>>(`/users/${id}/following`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return []
        } catch (err: any) {
            console.log('Get following error: ', err)
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const getFollowers = async (id: string) => {
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<User[]>>(`/users/${id}/followers`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (err: any) {
            console.log('Get followers error: ', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        getAllUsers,
        getUserByUsername,
        updateUser,
        requestFollow,
        acceptFollow,
        getFollowing,
        getFollowers
    }
}

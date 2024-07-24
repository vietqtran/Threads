import { Response } from '@/types'
import { Thread } from '@/types/thread'
import instance from '@/utils/axios/axios.instance'
import { useState } from 'react'
import { toast } from 'sonner'

export const useThreads = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addThread = async (thread: Thread) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<Thread>>('/threads', thread, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error: any) {
            console.log('Add thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getThreads = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Thread[]>>('/threads', { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return []
        } catch (error: any) {
            console.log('Get threads error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const getThread = async (id: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Thread>>(`/threads/${id}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error: any) {
            console.log('Get thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getUserThreads = async (userId: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Thread[]>>(`/threads/${userId}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return []
        } catch (error: any) {
            console.log('Get user threads error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const searchThread = async (searchTerm: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Thread[]>>(`/threads/search/${searchTerm}`, {
                withCredentials: true
            })
            if (data.data) {
                return data.data
            }
            return []
        } catch (error: any) {
            console.log('Search thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const updateThread = async (updateObject: Partial<Thread>) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.put<Response<Thread>>('/threads', updateObject, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error: any) {
            console.log('Update thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const deleteThread = async (id: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.delete<Response<Thread>>(`/threads/${id}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error: any) {
            console.log('Delete thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const likeThread = async (threadId: string, userId: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<Thread>>(
                `/threads/like-thread`,
                { threadId, userId },
                { withCredentials: true }
            )
            if (data.data) {
                return data.data
            }
            return null
        } catch (error: any) {
            console.log('Like thread error: ', error)
            if (error.message) {
                toast(error.message)
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return {
        addThread,
        getThreads,
        getThread,
        getUserThreads,
        searchThread,
        updateThread,
        deleteThread,
        likeThread
    }
}

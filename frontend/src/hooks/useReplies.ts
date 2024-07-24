import { Response } from '@/types'
import { Reply } from '@/types/thread'
import instance from '@/utils/axios/axios.instance'
import { useState } from 'react'
import { toast } from 'sonner'

export const useReplies = () => {
    const [isLoading, setIsLoading] = useState(false)
    const addReply = async (reply: Reply) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<Reply>>('/replies', reply, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error) {
            console.log('Add reply error: ', error)
            toast('Add reply error')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getAllReplies = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Reply[]>>('/replies', { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return []
        } catch (error) {
            console.log('Get all replies error: ', error)
            toast('Get all replies error')
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const getReply = async (id: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.get<Response<Reply>>(`/replies/${id}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error) {
            console.log('Get reply error: ', error)
            toast('Get reply error')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const updateReply = async (updateObject: Partial<Reply>) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.put<Response<Reply>>('/replies', updateObject, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error) {
            console.log('Update reply error: ', error)
            toast('Update reply error')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const deleteReply = async (id: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.delete<Response<Reply>>(`/replies/${id}`, { withCredentials: true })
            if (data.data) {
                return data.data
            }
            return null
        } catch (error) {
            console.log('Delete reply error: ', error)
            toast('Delete reply error')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const likeReply = async (replyId: string, userId: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const { data } = await instance.post<Response<Reply>>(
                `/replies/like-reply`,
                { replyId, userId },
                { withCredentials: true }
            )
            if (data.data) {
                return data.data
            }
            return null
        } catch (error) {
            console.log('Like reply error: ', error)
            toast('Like reply error')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        addReply,
        getAllReplies,
        getReply,
        updateReply,
        deleteReply,
        likeReply
    }
}

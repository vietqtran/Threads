import { Thread } from '@/types/thread'
import instance from '@/utils/axios/axios.instance'
import { toast } from 'sonner'

export const useThreads = () => {
    const addThread = async (thread: Thread) => {
        try {
            const { data } = await instance.post('/threads', thread, { withCredentials: true })
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
        }
    }

    const getThreads = async () => {
        try {
            const { data } = await instance.get('/threads', { withCredentials: true })
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
        }
    }

    const getThread = async (id: string) => {
        try {
            const { data } = await instance.get(`/threads/${id}`, { withCredentials: true })
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
        }
    }

    const getUserThreads = async (userId: string) => {
        try {
            const { data } = await instance.get(`/threads/${userId}`, { withCredentials: true })
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
        }
    }

    const searchThread = async (searchTerm: string) => {
        try {
            const { data } = await instance.get(`/threads/search/${searchTerm}`, { withCredentials: true })
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
        }
    }

    const updateThread = async (updateObject: any) => {
        try {
            const { data } = await instance.put('/threads', updateObject, { withCredentials: true })
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
        }
    }

    const deleteThread = async (id: string) => {
        try {
            const { data } = await instance.delete(`/threads/${id}`, { withCredentials: true })
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
        }
    }

    const likeThread = async (threadId: string, userId: string) => {
        try {
            const { data } = await instance.post(
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

import Profile from '@/components/Profile'
import { Response } from '@/types'
import { User } from '@/types/user'
import instance from '@/utils/axios/axios.instance'
import { notFound } from 'next/navigation'

async function getUserProfile(username: string) {
    try {
        const { data } = await instance.get<Response<User>>(`/users/${username}`, { withCredentials: true })
        if (data.data) {
            console.log(data)
            return data.data
        }
        return null
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default async function Page({ params }: { params: { username: string } }) {
    try {
        const user = await getUserProfile(params.username)
        if (!user) return notFound()
        return <Profile user={user as User} />
    } catch (error) {
        return notFound()
    }
}

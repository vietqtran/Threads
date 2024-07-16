import Profile from '@/components/Profile'
import instance from '@/utils/axios/axios.instance'
import { notFound } from 'next/navigation'

async function getUserProfile(username: string) {
  try {
    const res = await instance.get(`/users/${username}`, {withCredentials: true})
    if(res.data) {
      console.log(res.data)
      return res.data
    }
  } catch (error) {
    console.log(error)
    throw error 
  }
}

export default async function Page({ params }: { params: { username: string } }) {
  try {
    const user = await getUserProfile(params.username)
    console.log(user)
    return <Profile user={user} />
  } catch (error) {
    return notFound()
  }
}
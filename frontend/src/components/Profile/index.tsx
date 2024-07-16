'use client'

import React from 'react'
import ProfileContent from './ProfileContent'
import { User } from '@/types/user'
import { useUserStore } from '@/providers/StoresProvider'

interface Props {
  user: User
}

const Profile = ({user}: Props) => {
  const store = useUserStore(state => state)
  return (
    <ProfileContent user={user} isCurrentUser={store.user?.username === user?.username} />
  )
}

export default Profile

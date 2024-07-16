export interface User {
  _id: string
  username: string
  name: string
  email: string
  provider: string
  following: string[]
  followers: string[]
  createdAt: Date
  updatedAt: Date
  avatar: string | null
}

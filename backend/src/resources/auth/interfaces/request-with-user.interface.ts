import { User } from '@/resources/users/entities/user.entity'
import { Request } from 'express'

interface RequestWithUser extends Request {
  user: User
}

export default RequestWithUser

import ky from 'ky'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const users = await ky('http://localhost:4000/api/v1/users').json()
  return users
}

const getUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  })
  return users
}

export { getUsers, fetchUsers }

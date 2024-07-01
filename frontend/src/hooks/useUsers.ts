import instance from '@/utils/axios/axios.instance'
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const fetchUsers = async () => {
    const response = await instance.get('https://pokeapi.co/api/v2/pokemon/ditto')
    return response.data
  }

  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  return { users, isLoading, error, fetchUsers }
}

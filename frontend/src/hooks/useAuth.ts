import { LoginCredential } from '@/types/auth'
import { Response } from '@/types'
import instance from '@/utils/axios/axios.instance'

export const useAuth = () => {
  const login = async (loginCredential: LoginCredential) => {
    try {
      const response = (await instance.post('/auth/login', {
        email: loginCredential.credential,
        password: loginCredential.password
      })) as Response
      if (!response.isError) {
        console.log(response)
      }
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  return {
    login
  }
}

import { LoginCredential } from '@/types/auth'
import instance from '@/utils/axios/axios.instance'

export const useAuth = () => {
  const login = async (loginCredential: LoginCredential) => {
    const response = await instance.post('/auth/login', {
      email: loginCredential.credential,
      pasword: loginCredential.password
    })
    console.log(response)
  }

  return {
    login
  }
}

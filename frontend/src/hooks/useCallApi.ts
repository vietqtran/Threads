import { API_METHOD } from '@/constants/api-methods'
import { useAxios } from '.'

export const useCallApi = <T>(method: API_METHOD, url: string, data?: any) => {
  const axios = useAxios()

  const get = async (): Promise<T | null> => {
    try {
      const res = await axios.get(url, {
        withCredentials: true
      })
      return res as T
    } catch (error) {
      return null
    }
  }

  const post = async (): Promise<T | null> => {
    try {
      const res = await axios.post(url, data, {
        withCredentials: true
      })
      return res as T
    } catch (error) {
      return null
    }
  }

  const put = async (): Promise<T | null> => {
    try {
      const res = await axios.put(url, data, {
        withCredentials: true
      })
      return res as T
    } catch (error) {
      return null
    }
  }

  const del = async (): Promise<T | null> => {
    try {
      const res = await axios.delete(url, {
        withCredentials: true
      })
      return res as T
    } catch (error) {
      return null
    }
  }

  const patch = async (): Promise<T | null> => {
    try {
      const res = await axios.patch(url, data, {
        withCredentials: true
      })
      return res as T
    } catch (error) {
      return null
    }
  }

  switch (method) {
    case 'GET':
      return get()
    case 'POST':
      return post()
    case 'PUT':
      return put()
    case 'DELETE':
      return del()
    case 'PATCH':
      return patch()
  }
}

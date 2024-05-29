import { useAxios } from "."

export const useCallApi = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', url: string, data?: any) => {
  const axios = useAxios()
  
  const get = async () => {
    const res = await axios.get(url, {
      withCredentials: true
    })
    return res
  }

  const post = async () => {
    const res = await axios.post(url, data, {
      withCredentials: true
    })
    return res
  }

  const put = async () => {
    const res = await axios.put(url, data, {
      withCredentials: true
    })
    return res
  }

  const del = async () => {
    const res = await axios.delete(url, {
      withCredentials: true
    })
    return res
  }

  const patch = async () => {
    const res = await axios.patch(url, data, {
      withCredentials: true
    })
    return res
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

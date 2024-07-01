import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  response => {
    return {
      isError: false,
      ...response
    }
  },
  error => {
    return {
      isError: true,
      ...error
    }
  }
)

export default instance

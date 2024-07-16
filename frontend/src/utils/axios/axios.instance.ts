import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000
})

instance.interceptors.response.use(
  response => response.data,
  error => console.log(error)
)

export default instance

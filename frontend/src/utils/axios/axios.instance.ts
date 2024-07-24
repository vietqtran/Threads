import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response?.data)
)

export default instance

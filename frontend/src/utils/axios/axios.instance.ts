import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: unknown) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig
        if (!originalRequest) {
            return Promise.reject(error)
        }

        const preventRetryRoutes = ['/login', '/register']
        const currentRoute = originalRequest.url

        if (
            error.response?.status === 401 &&
            !preventRetryRoutes.includes(currentRoute as string) &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(() => {
                        return instance(originalRequest)
                    })
                    .catch(err => {
                        return Promise.reject(err.response?.data || err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            return new Promise((resolve, reject) => {
                instance
                    .get('/auth/refresh', { withCredentials: true })
                    .then(() => {
                        processQueue(null)
                        resolve(instance(originalRequest))
                    })
                    .catch(err => {
                        processQueue(err)
                        window.location.href = '/login'
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        }

        return Promise.reject(error.response?.data || error)
    }
)

export default instance

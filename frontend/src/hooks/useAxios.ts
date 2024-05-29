import axios from 'axios'

export const useAxios = () => {
  let isRetried = false

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`SUCCESS: Success when call API use Axios with ststus: ${response.status} `, response)
      return response.data || response
    },
    async (error) => {
      console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRR')
      if (!error.response) return Promise.reject(error)
      console.log('--- ERROR with status: ' + error.response.status)
      if (error.response.status === 401 && !isRetried) {
        console.log('--- Handle 401 error')
        isRetried = true
        try {
          console.log('--- Refreshing token...')
          // TODO: Replace with your refresh logic

          // TODO: Update the Authorization header with the new token

          // Retry the original request with the updated token
          // Retry using the original config
          return axiosInstance(error.config)
        } catch (refreshError) {
          console.log('--- Refresh token failed:', refreshError)
          // router.push('/login')
          return Promise.reject(error)
        }
      }

      isRetried = false
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

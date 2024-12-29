
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  email: string
  exp: number
  isArtist?: boolean
}

export const getUserEmailFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const currentTime = Math.floor(Date.now() / 1000)
    
    if (decoded.exp < currentTime) {
      return null
    }
    
    return decoded.email
  } catch {
    return null
  }
}

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post('/api/refreshToken', {}, {
      withCredentials: true
    })
    return response.data.token
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw new Error('Failed to refresh token')
  }
}

// Axios interceptors for automatic token handling
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add Firebase retry logic
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle Firebase specific errors
    if (error?.code === 'ECONNABORTED' || error?.message?.includes('WebChannelConnection')) {
      let retries = 0
      while (retries < MAX_RETRIES) {
        try {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)))
          return await axios(error.config)
        } catch (retryError) {
          retries++
          if (retries === MAX_RETRIES) throw retryError
        }
      }
    }
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const token = await refreshAccessToken()
        localStorage.setItem('token', token)
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('isArtist')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token && !!getUserEmailFromToken(token)
}

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  email: string
  exp: number
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
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/refresh`, {}, {
      withCredentials: true
    })
    return response.data.token
  } catch (error) {
    throw new Error('Failed to refresh token')
  }
}

// Set up axios interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
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
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)


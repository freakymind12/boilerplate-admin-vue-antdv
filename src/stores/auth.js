import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { message } from 'ant-design-vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('isLoggedIn'),
    accessToken: !!localStorage.getItem('accessToken'),
  }),

  actions: {
    // Login user
    async login(email, password) {
      try {
        const response = await axios.post(
          'http://localhost:5010/api/auth/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )

        this.user = response.data.data
        this.isAuthenticated = true
        this.accessToken = response.data?.access_token

        // Simpan data di localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('accessToken', this.accessToken)

        router.push('/dashboard')
      } catch (error) {
        message.error(error.response.data.message)
        console.error('Login failed:', error)
      }
    },

    // Logout user
    async logout() {
      try {
        this.user = null
        this.isAuthenticated = false

        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')

        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },

    // async refreshAccessToken() {
    //   try {
    //     const response = await axios.post(
    //       'http://localhost:5010/api/auth/refresh',
    //       {},
    //       { withCredentials: true },
    //     )
    //     localStorage.setItem('accessToken', response.data?.access_token)
    //   } catch (error) {
    //     if (error.response.status == 403) {
    //       this.isAuthenticated = false
    //       localStorage.removeItem('isLoggedIn')
    //       message.info('Your session is expired, please login again')
    //     }
    //   }
    // },
    setIsAuthenticated(value) {
      this.isAuthenticated = value
    },
  },
})

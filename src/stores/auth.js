import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { message } from 'ant-design-vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('isLoggedIn'),
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

        // Simpan data di localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(this.user))

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

        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
  },
})

import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import api from '@/axios/interceptor'

export const useUserStore = defineStore('user', {
  state: () => ({
    usersList: [],
    totalUsers: {
      admin: 0,
      viewer: 0,
      staff: 0,
      total: 0,
    },
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await api.get('/users')
        this.usersList = response.data?.data.users
        const totalByRole = response.data?.data.total
        this.totalUsers = {
          admin:
            totalByRole.find(role => role.roles === 'admin')?.total_users || 0,
          viewer:
            totalByRole.find(role => role.roles === 'viewer')?.total_users || 0,
          staff:
            totalByRole.find(role => role.roles === 'staff')?.total_users || 0,
          total: this.usersList.length,
        }
      } catch (error) {
        console.error('Fetching user data failed', error)
      }
    },
    async updateRole(id, role) {
      try {
        await api.patch('/users/roles', {
          id_user: id,
          roles: role,
        })
        message.success('Success update role')
        this.fetchUsers()
      } catch (error) {
        message.error(error.response.data.message)
        console.error('Fetching user data failed', error)
      }
    },
    async deleteUser(id) {
      try {
        await api.delete(`/users/${id}`)
        message.success('Success delete user')
        this.fetchUsers()
      } catch (error) {
        message.error(error.response.data.message)
        console.error('Delete user data failed', error)
      }
    },
  },
})

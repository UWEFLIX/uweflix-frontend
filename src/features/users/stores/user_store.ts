import { defineStore } from 'pinia'
import UserRepository from '../repositories/user_repository'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import type Role from '@/features/users/models/role';

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    userRepository: new UserRepository(),
    roles: [] as Role[],
  }),

  actions: {
    async getUsers() {
      const authStore = useAuthStore()
      return await this.userRepository.getUsers(authStore.token!)
    },

    async getUser(email: string) {
      const authStore = useAuthStore()
      return this.userRepository.getUser(authStore.token!, email)
    },

    async getRoles() {
      const authStore = useAuthStore()
      this.roles = await this.userRepository.getRoles(authStore.token!)
      return this.roles
    },

    async createUser(form: any) {
      const authStore = useAuthStore()
      return await this.userRepository.createUser(authStore.token!, form)
    },

    async updateUser(form: any) {
      const authStore = useAuthStore()
      return await this.userRepository.updateUser(authStore.token!, form)
    },

    // async deleteUser(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteUser(authStore.token!, form)
    // }
  }
})

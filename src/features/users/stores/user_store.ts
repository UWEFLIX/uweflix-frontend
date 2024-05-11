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

    async getRoles() {
      const authStore = useAuthStore()
      this.roles = await this.userRepository.getRoles(authStore.token!)
      return this.roles
    },

    async createUser(form: any) {
      const authStore = useAuthStore()
      return await this.userRepository.createUser(authStore.token!, form)
    },

    // async updateCity(city: City) {
    //   const authStore = useAuthStore()
    //   return await this.cityRepository.updateCity(authStore.token!, city)
    // },
    //
    // async deleteCity(city: City) {
    //   const authStore = useAuthStore()
    //   return await this.cityRepository.deleteCity(authStore.token!, city)
    // }
  }
})

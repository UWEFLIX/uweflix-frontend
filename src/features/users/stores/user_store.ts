import { defineStore } from 'pinia'
import UserRepository from '../repositories/user_repository'
import { useAuthStore } from '@/features/auth/stores/auth_store'

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    userRepository: new UserRepository(),
  }),

  actions: {
    async getUsers() {
      const authStore = useAuthStore()
      return await this.userRepository.getUsers(authStore.token!)
    },

    // async createCity(city: City) {
    //   const authStore = useAuthStore()
    //   return await this.cityRepository.createCity(authStore.token!, city)
    // },
    //
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

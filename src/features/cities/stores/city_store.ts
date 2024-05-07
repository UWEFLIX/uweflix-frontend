import { defineStore } from 'pinia'
import CityRepository from '../repositories/city_repository'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import type City from '@/features/cities/models/city'

export const useCityStore = defineStore({
  id: 'cityStore',

  state: () => ({
    cityRepository: new CityRepository(),
  }),

  actions: {
    async getCities() {
      const authStore = useAuthStore()
      return await this.cityRepository.getCities(authStore.token!)
    },

    async createCity(city: City) {
      const authStore = useAuthStore()
      return await this.cityRepository.createCity(authStore.token!, city)
    }
  }
})

import { defineStore } from 'pinia'
import CityRepository from '../repositories/city_repository'
import { useAuthStore } from '@/features/auth/stores/auth_store'

export const useCityStore = defineStore({
  id: 'cityStore',

  state: () => ({
    cityRepository: new CityRepository(),
  }),

  actions: {
    async getCities() {
      const authStore = useAuthStore()
      return await this.cityRepository.getCities(authStore.token!)
    }
  }
})

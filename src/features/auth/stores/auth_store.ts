import { defineStore } from 'pinia'
import AuthRepository from '../repositories/auth_repository'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore({
  id: 'authStore',

  state: () => ({
    authRepository: new AuthRepository(),
    token: useStorage<string | undefined>('token', undefined)
  }),

  actions: {
    async login(email: string, password: string) {
      this.token = await this.authRepository.getToken(email, password)
    }
  }
})

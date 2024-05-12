import { defineStore } from 'pinia'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import ClubRepository from '@/features/clubs/repositories/club_repository';

export const useClubStore = defineStore({
  id: 'clubStore',

  state: () => ({
    clubRepository: new ClubRepository(),
  }),

  actions: {
    async getClubs() {
      const authStore = useAuthStore()
      return await this.clubRepository.getClubs(authStore.token!)
    },

    async getClub(name: string) {
      const authStore = useAuthStore()
      return this.clubRepository.getClub(authStore.token!, name)
    },

    async createClub(form: any) {
      const authStore = useAuthStore()
      return await this.clubRepository.createClub(authStore.token!, form)
    },

    async updateClub(form: any) {
      const authStore = useAuthStore()
      return await this.clubRepository.updateClub(authStore.token!, form)
    },

    // async deleteUser(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteUser(authStore.token!, form)
    // }
  }
})

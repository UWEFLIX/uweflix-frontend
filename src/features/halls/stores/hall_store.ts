import { defineStore } from 'pinia';
import HallRepository from '../repositories/hall_repository';
import { useAuthStore } from '@/features/auth/stores/auth_store';

export const useHallStore = defineStore({
  id: 'HallStore',

  state: () => ({
    hallRepository: new HallRepository()
  }),

  actions: {
    async getHalls() {
      const authStore = useAuthStore();
      return await this.hallRepository.getHalls(authStore.token!);
    },

    async createHall(form: any) {
      const authStore = useAuthStore();
      return await this.hallRepository.createHall(authStore.token!, form);
    },

    async updateHall(form: any) {
      const authStore = useAuthStore();
      return await this.hallRepository.updateHall(authStore.token!, form);
    }

    // async deleteHall(form: any) {
    //   const authStore = useAuthStore();
    //   return await this.hallRepository.deleteHall(authStore.token!, form);
    // }
  }
});

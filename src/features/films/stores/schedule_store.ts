import { defineStore } from 'pinia';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import ScheduleRepository from '@/features/films/repositories/schedule_repository';

export const useScheduleStore = defineStore({
  id: 'ScheduleStore',

  state: () => ({
    scheduleRepository: new ScheduleRepository()
  }),

  actions: {
    async getSchedules(filmId: number) {
      const authStore = useAuthStore();
      return await this.scheduleRepository.getSchedules(authStore.token!, filmId);
    },

    async getSchedule(id: string) {
      const authStore = useAuthStore();
      return this.scheduleRepository.getSchedule(authStore.token!, id);
    },

    async createSchedule(form: any) {
      const authStore = useAuthStore();
      return await this.scheduleRepository.createSchedule(authStore.token!, form);
    },

    async updateSchedule(form: any) {
      const authStore = useAuthStore();
      return await this.scheduleRepository.updateSchedule(authStore.token!, form);
    }

    // async deleteUser(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteUser(authStore.token!, form)
    // }
  }
});

import { defineStore } from 'pinia';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import BookingRepository from '@/features/films/repositories/booking_repository';

export const useBookingStore = defineStore({
  id: 'BookingStore',

  state: () => ({
    bookingRepository: new BookingRepository()
  }),

  actions: {
    async getBookedSeats(scheduleId: number) {
      const authStore = useAuthStore();
      return await this.bookingRepository.getBookedSeats(authStore.token!, scheduleId);
    },

    async bookSeats(scheduleId: number, data: Object) {
      const authStore = useAuthStore();
      await this.bookingRepository.bookSeats(authStore.token!, scheduleId, data);
    }
  }
});

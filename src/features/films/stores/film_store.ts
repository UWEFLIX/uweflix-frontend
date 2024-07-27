import { defineStore } from 'pinia';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import FilmRepository from '@/features/films/repositories/film_repository';

export const useFilmStore = defineStore({
  id: 'FilmStore',

  state: () => ({
    filmRepository: new FilmRepository()
  }),

  actions: {
    async getFilms() {
      const authStore = useAuthStore();
      return await this.filmRepository.getFilms(authStore.token!);
    },

    async getFilm(id: string) {
      const authStore = useAuthStore();
      return this.filmRepository.getFilm(authStore.token!, id);
    },

    async createFilm(form: any) {
      const authStore = useAuthStore();
      return await this.filmRepository.createFilm(authStore.token!, form);
    },

    async updateFilmPoster(filmId: number, file: File | undefined) {
      const authStore = useAuthStore();
      return await this.filmRepository.updateFilmPoster(authStore.token!, filmId, file);
    },

    async updateFilm(form: any) {
      const authStore = useAuthStore();
      return await this.filmRepository.updateFilm(authStore.token!, form);
    }

    // async deleteUser(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteUser(authStore.token!, form)
    // }
  }
});

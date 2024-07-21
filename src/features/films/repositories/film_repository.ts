import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Film from '@/features/films/models/film';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IFilmRepository {
  getFilms(token: string): Promise<Film[]>;
  getFilm(token: string, id: string): Promise<Film>;
  createFilm(token: string, form: any): Promise<Film>;
  updateFilm(token: string, form: any): Promise<Film>;
  // deleteUser(token: string, form: any): Promise<void>
}

export default class FilmRepository implements IFilmRepository {
  async getFilms(token: string) {
    const res = await axios.get(`${baseURL}/films/films?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Film[];
  }

  async getFilm(token: string, id: string) {
    const res = await axios.get(`${baseURL}/films/film/${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as Film;
  }

  async createFilm(token: string, form: any) {
    const res = await axios.post(`${baseURL}/films/film`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Film;
  }

  async updateFilm(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/films/film`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Film;
  }

  // async deleteUser(token: string, form: any) {
  //   await axios.delete(
  //     `${baseURL}/users/user?email=${form.email}`,
  //     {
  //       headers: getApiHeaders(token)
  //     }
  //   )
  // }
}

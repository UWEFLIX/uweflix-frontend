import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Film from '@/features/films/models/film';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IFilmRepository {
  getFilms(token: string): Promise<Film[]>;
  getFilm(token: string, id: string): Promise<Film>;
  createFilm(token: string, form: any): Promise<Film>;
  updateFilmPoster(token: string, filmId: number, file: File): Promise<string>;
  updateFilm(token: string, form: any): Promise<Film>;
  uploadImages(token: string, filmId: number, files: FileList | null): Promise<void>;
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

    const images = res.data.images.map((image: any) => {
      return {
        id: image.id,
        url: `${baseURL}/films/images/image/${image.filename}`
      };
    });

    const film = res.data as Film;
    film.images = images;

    return film;
  }

  async createFilm(token: string, form: any) {
    const res = await axios.post(`${baseURL}/films/film`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Film;
  }

  async updateFilmPoster(token: string, filmId: number, file: File | undefined): Promise<string> {
    const res = await axios.patch(
      `${baseURL}/films/images/poster/${filmId}`,
      {
        file: file
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data as string;
  }

  async updateFilm(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/films/film`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Film;
  }

  async uploadImages(token: string, filmId: number, files: FileList | null): Promise<void> {
    await axios.patch(
      `${baseURL}/films/images/posters/${filmId}`,
      {
        files: files
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
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

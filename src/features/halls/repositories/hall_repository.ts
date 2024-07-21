import axios from 'axios';
import type Hall from '@/features/halls/models/hall';
import getApiHeaders from '@/constants/api_headers';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IHallRepository {
  getHalls(token: string): Promise<Hall[]>;
  createHall(token: string, form: any): Promise<Hall>;
  updateHall(token: string, form: any): Promise<Hall>;
  // deleteHall(token: string, form: any): Promise<void>;
}

export default class HallRepository implements IHallRepository {
  async getHalls(token: string) {
    const res = await axios.get(`${baseURL}/films/halls/halls?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Hall[];
  }

  async createHall(token: string, form: any): Promise<Hall> {
    const res = await axios.post(`${baseURL}/films/hall/hall`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Hall;
  }

  async updateHall(token: string, form: any): Promise<Hall> {
    const res = await axios.patch(`${baseURL}/films/hall/hall`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Hall;
  }

  // async deleteHall(token: string, form: any): Promise<void> {
  //   await axios.delete(`${baseURL}/films/hall/hall`, {
  //     headers: getApiHeaders(token)
  //   });
  // }
}

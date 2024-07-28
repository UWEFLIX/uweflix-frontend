import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Schedule from '@/features/films/models/schedule';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IScheduleRepository {
  getSchedules(token: string, filmId: number): Promise<Schedule[]>;
  getSchedule(token: string, id: string): Promise<Schedule>;
  createSchedule(token: string, form: any): Promise<Schedule>;
  updateSchedule(token: string, form: any): Promise<Schedule>;
  // deleteUser(token: string, form: any): Promise<void>
}

export default class ScheduleRepository implements IScheduleRepository {
  async getSchedules(token: string, filmId: number) {
    const res = await axios.get(`${baseURL}/films/film/schedules/id/${filmId}?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Schedule[];
  }

  async getSchedule(token: string, id: string) {
    const res = await axios.get(`${baseURL}/films/schedules/schedule/${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as Schedule;
  }

  async createSchedule(token: string, form: any) {
    const res = await axios.post(`${baseURL}/films/schedules/schedule`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Schedule;
  }

  async updateSchedule(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/films/schedules/schedule`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Schedule;
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

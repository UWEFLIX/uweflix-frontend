import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Club from '@/features/clubs/models/club';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IClubRepository {
  getClubs(token: string): Promise<Club[]>;
  getClub(token: string, id: string): Promise<Club>;
  createClub(token: string, form: any): Promise<Club>;
  updateClub(token: string, form: any): Promise<Club>;
  // deleteUser(token: string, form: any): Promise<void>
}

export default class ClubRepository implements IClubRepository {
  async getClubs(token: string) {
    const res = await axios.get(`${baseURL}/clubs/clubs?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Club[];
  }

  async getClub(token: string, id: string) {
    const res = await axios.get(`${baseURL}/clubs/club/id/${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as Club;
  }

  async createClub(token: string, form: any) {
    const res = await axios.post(`${baseURL}/clubs/club`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Club;
  }

  async updateClub(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/clubs/club`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Club;
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

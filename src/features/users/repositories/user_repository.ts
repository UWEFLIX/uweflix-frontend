import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type User from '@/features/users/models/user';

const baseURL = import.meta.env.VITE_API_ENDPOINT

interface IUserRepository {
  getUsers(token: string): Promise<User[]>
  // createCity(token: string, city: City): Promise<City>
  // updateCity(token: string, city: City): Promise<City>
  // deleteCity(token: string, city: City): Promise<void>
}

export default class UserRepository implements IUserRepository {
  async getUsers(token: string) {
    const res = await axios.get(
      `${baseURL}/users/users?start=1&limit=9999`,
      {
        headers: getApiHeaders(token)
      }
    )

    return res.data as User[]
  }
}

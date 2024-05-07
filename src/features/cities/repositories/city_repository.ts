import axios from 'axios'
import type City from '@/features/cities/models/city'

const baseURL = import.meta.env.VITE_API_ENDPOINT

interface ICityRepository {
  getCities(token: string): Promise<City[]>
}

export default class CityRepository implements ICityRepository {
  async getCities(token: string) {
    const res = await axios.get(
      `${baseURL}/clubs/cities/cities?start=1&limit=9999`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    return res.data as City[]
  }
}

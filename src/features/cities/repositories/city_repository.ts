import axios from 'axios'
import type City from '@/features/cities/models/city'
import getApiHeaders from '@/constants/api_headers'

const baseURL = import.meta.env.VITE_API_ENDPOINT

interface ICityRepository {
  getCities(token: string): Promise<City[]>
  createCity(token: string, city: City): Promise<City>
}

export default class CityRepository implements ICityRepository {
  async getCities(token: string) {
    const res = await axios.get(
      `${baseURL}/clubs/cities/cities?start=1&limit=9999`,
      {
        headers: getApiHeaders(token)
      }
    )

    return res.data as City[]
  }

  async createCity(token: string, city: City): Promise<City> {
    const res = await axios.post(
      `${baseURL}/clubs/cities/city?city_name=${city.name}`,
      {},
      {
        headers: getApiHeaders(token)
      }
    )

    return res.data as City
  }
}

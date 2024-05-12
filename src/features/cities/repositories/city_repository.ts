import axios from 'axios'
import type City from '@/features/cities/models/city'
import getApiHeaders from '@/constants/api_headers'

const baseURL = import.meta.env.VITE_API_ENDPOINT

interface ICityRepository {
  getCities(token: string): Promise<City[]>
  createCity(token: string, form: any): Promise<City>
  updateCity(token: string, form: any): Promise<City>
  deleteCity(token: string, form: any): Promise<void>
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

  async createCity(token: string, form: any): Promise<City> {
    const res = await axios.post(
      `${baseURL}/clubs/cities/city?city_name=${form.name}`,
      {},
      {
        headers: getApiHeaders(token)
      }
    )

    return res.data as City
  }

  async updateCity(token: string, form: any): Promise<City> {
    const res = await axios.patch(
      `${baseURL}/clubs/cities/city`,
      form,
      {
        headers: getApiHeaders(token)
      }
    )

    return res.data as City
  }

  async deleteCity(token: string, form: any): Promise<void> {
    await axios.delete(
      `${baseURL}/clubs/cities/city?city_name=${form.name}`,
      {
        headers: getApiHeaders(token)
      }
    )
  }
}

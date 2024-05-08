import axios from 'axios'

const baseURL = import.meta.env.VITE_API_ENDPOINT

interface IAuthRepository {
  getToken(username: string, password: string): Promise<string>
}

export default class AuthRepository implements IAuthRepository {
  async getToken(username: string, password: string): Promise<string> {
    const res = await axios.post(
      `${baseURL}/token`,
      {
        username: username,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    )

    return res.data['access_token']
  }
}

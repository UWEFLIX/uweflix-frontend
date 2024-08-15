import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type User from '@/features/users/models/user';
import type Role from '@/features/users/models/role';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IUserRepository {
  getUsers(token: string): Promise<User[]>;
  getUser(token: string, id: string): Promise<User>;
  searchUser(token: string, name: string): Promise<User[]>;
  getRoles(token: string): Promise<Role[]>;
  createUser(token: string, form: any): Promise<User>;
  updateUser(token: string, form: any): Promise<User>;
  // deleteUser(token: string, form: any): Promise<void>
}

export default class UserRepository implements IUserRepository {
  async getUsers(token: string) {
    const res = await axios.get(`${baseURL}/users/users?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as User[];
  }

  async getUser(token: string, id: string) {
    const res = await axios.get(`${baseURL}/users/user/id/${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as User;
  }

  async searchUser(token: string, name: string) {
    const res = await axios.get(`${baseURL}/users/users/${name}`, {
      headers: getApiHeaders(token)
    });

    return res.data as User[];
  }

  async getRoles(token: string) {
    const res = await axios.get(`${baseURL}/users/roles/roles?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Role[];
  }

  async createUser(token: string, form: any): Promise<User> {
    const res = await axios.post(`${baseURL}/users/user`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as User;
  }

  async updateUser(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/users/user`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as User;
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

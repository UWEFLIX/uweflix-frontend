import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Account from '@/features/users/models/user';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IAccountRepository {
  getAccounts(token: string): Promise<Account[]>;
  getAccount(token: string, id: number): Promise<Account>;
  createAccount(token: string, form: any): Promise<Account>;
  updateAccount(token: string, form: any): Promise<Account>;
  // deleteAccount(token: string, form: any): Promise<void>
}

export default class AccountRepository implements IAccountRepository {
  async getAccounts(token: string) {
    const res = await axios.get(`${baseURL}/accounts/accounts?start=1&limit=9999`, {
      headers: getApiHeaders(token)
    });

    return res.data as Account[];
  }

  async getAccount(token: string, id: number) {
    const res = await axios.get(`${baseURL}/accounts/account?account_id=${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as Account;
  }

  async createAccount(token: string, form: any): Promise<Account> {
    const res = await axios.post(`${baseURL}/accounts/account`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Account;
  }

  async updateAccount(token: string, form: any) {
    const res = await axios.patch(`${baseURL}/accounts/account`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Account;
  }

  // async deleteAccount(token: string, form: any) {
  //   await axios.delete(
  //     `${baseURL}/accounts/account?account_id=${form.id}`,
  //     {
  //       headers: getApiHeaders(token)
  //     }
  //   )
  // }
}

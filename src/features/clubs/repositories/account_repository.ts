import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';
import type Account from '../models/account';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IAccountRepository {
  getClubAccounts(token: string, club_id: number): Promise<Account[]>;
  getAccount(token: string, id: string): Promise<Account>;
  createAccount(token: string, form: any): Promise<Account>;
  updateAccount(token: string, form: any): Promise<Account>;
  // deleteAccount(token: string, form: any): Promise<void>
}

export default class AccountRepository implements IAccountRepository {
  async getClubAccounts(token: string, club_id: number): Promise<Account[]> {
    const res = await axios.get(
      `${baseURL}/accounts/club/accounts?club_id=${club_id}&start=1&limit=9999`,
      {
        headers: getApiHeaders(token)
      }
    );

    return res.data as Account[];
  }

  async getAccount(token: string, id: string): Promise<Account> {
    const res = await axios.get(`${baseURL}/accounts/club/account/${id}`, {
      headers: getApiHeaders(token)
    });

    return res.data as Account;
  }

  async createAccount(token: string, form: any): Promise<Account> {
    const res = await axios.post(`${baseURL}/accounts/club/account`, form, {
      headers: getApiHeaders(token)
    });

    return res.data as Account;
  }

  async updateAccount(token: string, form: any): Promise<Account> {
    const res = await axios.patch(`${baseURL}/accounts/club/account`, form, {
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

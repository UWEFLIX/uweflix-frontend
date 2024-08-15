import { defineStore } from 'pinia';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import AccountRepository from '../repositories/account_repository';
import type Account from '@/features/clubs/models/account';

export const useAccountStore = defineStore({
  id: 'accountStore',

  state: () => ({
    accountRepository: new AccountRepository()
  }),

  actions: {
    async getClubAccounts(club_id: number): Promise<Account[]> {
      const authStore = useAuthStore();
      return await this.accountRepository.getClubAccounts(authStore.token!, club_id);
    },

    async getClubAccount(id: string): Promise<Account> {
      const authStore = useAuthStore();
      return this.accountRepository.geClubAccount(authStore.token!, id);
    },

    async getUserAccount(id: number): Promise<Account> {
      const authStore = useAuthStore();
      return this.accountRepository.getUserAccount(authStore.token!, id);
    },

    async createAccount(form: any): Promise<Account> {
      const authStore = useAuthStore();
      return await this.accountRepository.createAccount(authStore.token!, form);
    },

    async updateAccount(form: any): Promise<Account> {
      const authStore = useAuthStore();
      return await this.accountRepository.updateAccount(authStore.token!, form);
    }

    // async deleteAccount(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteAccount(authStore.token!, form)
    // }
  }
});

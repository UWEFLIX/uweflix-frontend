import { defineStore } from 'pinia';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import AccountRepository from '../repositories/account_repository';

export const useAccountStore = defineStore({
  id: 'accountStore',

  state: () => ({
    accountRepository: new AccountRepository()
  }),

  actions: {
    async getClubAccounts(club_id: number) {
      const authStore = useAuthStore();
      return await this.accountRepository.getClubAccounts(authStore.token!, club_id);
    },

    async getAccount(id: number) {
      const authStore = useAuthStore();
      return this.accountRepository.getAccount(authStore.token!, id);
    },

    async createAccount(form: any) {
      const authStore = useAuthStore();
      return await this.accountRepository.createAccount(authStore.token!, form);
    },

    async updateAccount(form: any) {
      const authStore = useAuthStore();
      return await this.accountRepository.updateAccount(authStore.token!, form);
    }

    // async deleteAccount(form: any) {
    //   const authStore = useAuthStore()
    //   return await this.userRepository.deleteAccount(authStore.token!, form)
    // }
  }
});

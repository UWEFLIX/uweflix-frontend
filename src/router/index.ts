import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/features/home/views/HomeView.vue';
import LoginView from '@/features/auth/views/LoginView.vue';
import { useAuthStore } from '@/features/auth/stores/auth_store';
import CitiesIndexView from '@/features/cities/views/CitiesIndexView.vue';
import UsersIndexView from '@/features/users/views/UsersIndexView.vue';
import UserFormView from '@/features/users/views/UserFormView.vue';
import ClubIndexView from '@/features/clubs/views/ClubIndexView.vue';
import ClubFormView from '@/features/clubs/views/ClubFormView.vue';
import ClubAccountsView from '@/features/clubs/views/ClubAccountsView.vue';
import AccountDetailsView from '@/features/clubs/views/AccountDetailsView.vue';
import AccountFormView from '@/features/clubs/views/AccountFormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home.index',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cities',
      name: 'cities.index',
      component: CitiesIndexView
    },
    {
      path: '/users',
      name: 'users.index',
      component: UsersIndexView
    },
    {
      path: '/users/new',
      name: 'users.new',
      component: UserFormView
    },
    {
      path: '/users/edit/:id',
      name: 'users.edit',
      component: UserFormView
    },
    {
      path: '/clubs',
      name: 'clubs.index',
      component: ClubIndexView
    },
    {
      path: '/clubs/new',
      name: 'clubs.new',
      component: ClubFormView
    },
    {
      path: '/clubs/edit/:id',
      name: 'clubs.edit',
      component: ClubFormView
    },
    {
      path: '/clubs/:id/accounts',
      name: 'clubs.accounts',
      component: ClubAccountsView
    },
    {
      path: '/accounts/:id/details',
      name: 'accounts.details',
      component: AccountDetailsView
    },
    {
      path: '/clubs/:clubId/accounts/new',
      name: 'accounts.new',
      component: AccountFormView
    }
  ]
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (
    // make sure the user is authenticated
    !authStore.token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' };
  }
});

export default router;

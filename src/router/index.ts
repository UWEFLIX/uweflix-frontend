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
import HallsIndexView from '@/features/halls/views/HallsIndexView.vue';
import FilmsIndexView from '@/features/films/views/FilmsIndexView.vue';
import FilmFormView from '@/features/films/views/FilmFormView.vue';
import FilmSchedulesView from '@/features/films/views/FilmSchedulesView.vue';
import ScheduleBookingsView from '@/features/films/views/ScheduleBookingsView.vue';

function hasRoles(roles: string[]) {
  const authStore = useAuthStore();
  const tokenContent = authStore.tokenContent;

  console.log(tokenContent);

  if (!tokenContent) {
    return false;
  }

  return roles.some((role) => tokenContent.roles.includes(role));
}

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
      component: CitiesIndexView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/users',
      name: 'users.index',
      component: UsersIndexView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/users/new',
      name: 'users.new',
      component: UserFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/users/edit/:id',
      name: 'users.edit',
      component: UserFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/clubs',
      name: 'clubs.index',
      component: ClubIndexView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager', 'Account Manager'])
    },
    {
      path: '/clubs/new',
      name: 'clubs.new',
      component: ClubFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/clubs/edit/:id',
      name: 'clubs.edit',
      component: ClubFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/clubs/:id/accounts',
      name: 'clubs.accounts',
      component: ClubAccountsView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Account Manager'])
    },
    {
      path: '/accounts/:id/details',
      name: 'accounts.details',
      component: AccountDetailsView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Account Manager'])
    },
    {
      path: '/clubs/:clubId/accounts/new',
      name: 'accounts.new',
      component: AccountFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Account Manager'])
    },
    {
      path: '/clubs/:clubId/accounts/:accountId/edit',
      name: 'accounts.edit',
      component: AccountFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Account Manager'])
    },
    {
      path: '/halls',
      name: 'halls.index',
      component: HallsIndexView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/films',
      name: 'films.index',
      component: FilmsIndexView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager', 'Cashier'])
    },
    {
      path: '/films/new',
      name: 'films.new',
      component: FilmFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/films/edit/:id',
      name: 'films.edit',
      component: FilmFormView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager'])
    },
    {
      path: '/films/schedules/:id',
      name: 'films.schedules',
      component: FilmSchedulesView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager', 'Cashier'])
    },
    {
      path: '/films/:filmId/schedules/:scheduleId',
      name: 'schedule.bookings',
      component: ScheduleBookingsView,
      beforeEnter: (to, from) => hasRoles(['Admin', 'Cinema Manager', 'Cashier'])
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

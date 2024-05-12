import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/features/home/views/HomeView.vue'
import LoginView from '@/features/auth/views/LoginView.vue'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import CitiesIndexView from '@/features/cities/views/CitiesIndexView.vue'
import UsersIndexView from '@/features/users/views/UsersIndexView.vue'
import UserFormView from '@/features/users/views/UserFormView.vue';
import ClubIndexView from '@/features/clubs/views/ClubIndexView.vue';

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
      path: '/users/edit',
      name: 'users.edit',
      component: UserFormView
    },
    {
      path: '/clubs',
      name: 'clubs.index',
      component: ClubIndexView
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (
    // make sure the user is authenticated
    !authStore.token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/features/home/views/HomeView.vue'
import LoginView from '@/features/auth/views/LoginView.vue'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import CitiesIndexView from '@/features/cities/views/CitiesIndexView.vue'
import CityFormView from '@/features/cities/views/CityFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/cities',
      name: 'Cities',
      component: CitiesIndexView
    },
    {
      path: '/cities/new',
      name: 'New City',
      component: CityFormView
    },
    {
      path: '/cities/:name',
      name: 'Edit City',
      component: CityFormView,
      props: true
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (
    // make sure the user is authenticated
    !authStore.token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router

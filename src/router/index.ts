import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/features/home/views/HomeView.vue'
import LoginView from '@/features/auth/views/LoginView.vue'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import CitiesIndexView from '@/features/cities/views/CitiesIndexView.vue'

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

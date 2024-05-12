<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import SidebarDropdown from '@/components/SidebarDropdown.vue'
import SidebarLink from '@/components/SidebarLink.vue'
import Dropdown from '@/components/Dropdown.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth_store'
import DropdownLink from '@/components/DropdownLink.vue'

const authStore = useAuthStore()

const showingSidebar = ref(false)

const routeGroups: { [key: string]: string[] } = {
  home: ['home.index'],
  users: ['users.index', 'users.new', 'users.edit'],
  cities: ['cities.index'],
}

function combineRoutes(keys: string[]): string[] {
  return keys.reduce((combinedRoutes: string[], key: string) => {
    const routes = routeGroups[key] || [];
    return combinedRoutes.concat(routes);
  }, []);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar :show="showingSidebar" @close-sidebar="showingSidebar = false">
      <RouterLink :to="{ name: 'home.index' }" class="block w-10">
        <img src="/logo.jpg" class="object-cover rounded-lg" alt="Logo" />
      </RouterLink>

      <ul class="mt-6 space-y-2">
        <SidebarLink :to="{ name: 'home.index' }" :route-group="routeGroups.home">
          <i class="bi bi-house text-lg me-3"></i>
          <span>Home</span>
        </SidebarLink>

        <SidebarDropdown :route-group="combineRoutes(['users', 'cities'])">
          <template #button-content>
            <i class="bi bi-people text-lg me-3"></i>
            <span>Club Management</span>
          </template>

          <template #dropdown-content>
            <SidebarLink :to="{ name: 'users.index' }" :route-group="routeGroups.users">
              <i class="bi bi-person text-lg me-3"></i>
              <span>Users</span>
            </SidebarLink>

            <SidebarLink :to="{ name: 'cities.index' }" :route-group="routeGroups.cities">
              <i class="bi bi-building text-lg me-3"></i>
              <span>Cities</span>
            </SidebarLink>
          </template>
        </SidebarDropdown>
      </ul>
    </Sidebar>

    <!-- Page Content -->
    <main class="lg:ml-64 transition-all duration-300">
      <nav class="bg-white border-b border-gray-100">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <!-- Hamburger -->
              <div class="me-2 flex items-center lg:hidden">
                <button
                  @click="showingSidebar = !showingSidebar"
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <span
                    class="flex h-6 w-6 items-center justify-center"
                  >
                    <i class="bi bi-list text-2xl"></i>
                  </span>
                </button>
              </div>

              <!-- Breadcrumbs -->
              <div
                class="hidden space-x-8 sm:-my-px ms-10 sm:ms-0 sm:flex"
              >
                <ol
                  class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
                >
                  <slot name="breadcrumbs" />
                </ol>
              </div>
            </div>

            <div class="flex items-center ms-6">
              <!-- Settings Dropdown -->
              <div class="ms-3 relative">
                <Dropdown align="right" width="64">
                  <template #trigger>
                    <div class="cursor-pointer">
                      <img
                        class="w-9 h-9 rounded-full"
                        src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Peanut"
                        alt="Profile img"
                      />
                    </div>
                  </template>

                  <template #content>
                    <div
                      class="px-4 py-2 text-start text-sm"
                    >
                      <div
                        class="font-medium text-sm text-gray-800"
                      >
                        {{ authStore?.tokenContent!['full_name'] }}
                      </div>
                      <div
                        class="font-medium text-xs text-gray-500"
                      >
                        {{ authStore?.tokenContent!['sub'] }}
                      </div>
                    </div>

                    <hr
                      class="h-px mt-2 bg-gray-200 border-0"
                    />
                    <DropdownLink
                      as="button"
                      @click="authStore.logout()"
                    >
                      Log Out
                    </DropdownLink>
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <slot />
    </main>
  </div>
</template>

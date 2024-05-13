<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useUserStore } from '@/features/users/stores/user_store';
import type User from '@/features/users/models/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const isLoading = ref(false);
const users: Ref<User[]> = ref([]);

onMounted(async () => {
  isLoading.value = true;
  users.value = await userStore.getUsers();
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Users" icon="bi-person" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">Users</div>

            <div class="flex items-center gap-4">
              <PrimaryButton @click="router.push({ name: 'users.new' })"> New User </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left uppercase">
                <tr>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">ID</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Name</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Email</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Status</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>

              <tbody v-if="users.length === 0" class="divide-y divide-gray-200">
                <tr>
                  <td
                    colspan="5"
                    class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                  >
                    <!-- Loading indicator -->
                    <div v-if="isLoading" class="p-2">
                      <LoadingIndicator />
                    </div>

                    <div v-else>No cities found</div>
                  </td>
                </tr>
              </tbody>

              <tbody v-else class="divide-y divide-gray-200">
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {{ user.id }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ user.name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ user.status }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <SecondaryButton
                      @click="router.push({ name: 'users.edit', query: { email: user.email } })"
                    >
                      Edit
                    </SecondaryButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

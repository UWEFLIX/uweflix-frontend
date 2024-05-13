<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useRouter } from 'vue-router';
import { useClubStore } from '@/features/clubs/stores/club_store';
import type Club from '@/features/clubs/models/club';

const router = useRouter();
const clubStore = useClubStore();

const isLoading = ref(false);
const clubs: Ref<Club[]> = ref([]);

onMounted(async () => {
  isLoading.value = true;
  clubs.value = await clubStore.getClubs();
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Clubs" icon="bi-people" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">Clubs</div>

            <div class="flex items-center gap-4">
              <PrimaryButton @click="router.push({ name: 'clubs.new' })"> New Club </PrimaryButton>
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
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Leader</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Email</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Status</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>

              <tbody v-if="clubs.length === 0" class="divide-y divide-gray-200">
                <tr>
                  <td
                    colspan="5"
                    class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                  >
                    <!-- Loading indicator -->
                    <div v-if="isLoading" class="p-2">
                      <LoadingIndicator />
                    </div>

                    <div v-else>No clubs found</div>
                  </td>
                </tr>
              </tbody>

              <tbody v-else class="divide-y divide-gray-200">
                <tr
                  v-for="club in clubs"
                  :key="club.id"
                  class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {{ club.id }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ club.club_name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ club.leader?.name ?? '-' }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ club.email }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ club.status }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <SecondaryButton
                      @click="router.push({ name: 'clubs.edit', query: { name: club.club_name } })"
                      class="mr-3"
                    >
                      Edit
                    </SecondaryButton>

                    <SecondaryButton
                      @click="
                        router.push({
                          name: 'clubs.accounts',
                          query: { club_name: club.club_name }
                        })
                      "
                    >
                      Accounts
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

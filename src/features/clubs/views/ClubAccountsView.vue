<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref, computed } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useRouter } from 'vue-router';
import type Account from '../models/account';
import { useAccountStore } from '../stores/account_store';
import type Club from '../models/club';
import { useClubStore } from '../stores/club_store';

const router = useRouter();
const clubStore = useClubStore();
const accountStore = useAccountStore();

const isLoading = ref(false);
const club: Ref<Club | undefined> = ref(undefined);
const accounts: Ref<Account[]> = ref([]);

const clubAccounts = computed(() => {
  return accounts.value.filter((account) => account.entity_type === 'CLUB');
});

onMounted(async () => {
  isLoading.value = true;
  const clubId = router.currentRoute.value.params.id as string;

  if (clubId) {
    const existingClub = await clubStore.getClub(clubId);
    club.value = existingClub;
    accounts.value = await accountStore.getClubAccounts(existingClub.id);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Clubs" icon="bi-people" :to="{ name: 'clubs.index' }" />
      <Breadcrumb :title="club ? club.club_name : 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb title="Accounts" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{ club ? `${club.club_name}'s Accounts` : 'Undefined' }}
            </div>

            <div class="flex items-center gap-4">
              <PrimaryButton v-if="club" @click="router.push({ name: 'accounts.new' })">
                New Account
              </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left uppercase">
                <tr>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">ID</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">UID</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Name</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Status</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>

              <tbody v-if="accounts.length === 0" class="divide-y divide-gray-200">
                <tr>
                  <td
                    colspan="5"
                    class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                  >
                    <!-- Loading indicator -->
                    <div v-if="isLoading" class="p-2">
                      <LoadingIndicator />
                    </div>

                    <div v-else>No accounts found</div>
                  </td>
                </tr>
              </tbody>

              <tbody v-else class="divide-y divide-gray-200">
                <tr
                  v-for="account in clubAccounts"
                  :key="account.id"
                  class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {{ account.id }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ account.uid }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ account.name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ account.status }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <SecondaryButton
                      @click="
                        router.push({
                          name: 'accounts.details',
                          params: {
                            id: account.id
                          }
                        })
                      "
                    >
                      Details
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

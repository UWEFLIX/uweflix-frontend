<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import router from '@/router';
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/features/clubs/stores/account_store';
import type Account from '@/features/clubs/models/account';
import type Club from '../models/club';
import { useClubStore } from '../stores/club_store';

const accountStore = useAccountStore();
const clubStore = useClubStore();

const isLoading = ref(false);
const error = ref('');
const club: Ref<Club | undefined> = ref(undefined);
const account: Ref<Account | undefined> = ref(undefined);

onMounted(async () => {
  isLoading.value = true;
  const accountId = router.currentRoute.value.params.id as string;

  if (accountId) {
    account.value = await accountStore.getAccount(accountId);
    club.value = await clubStore.getClub(String(account.value.entity_id));
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Clubs" icon="bi-people" :to="{ name: 'clubs.index' }" />
      <Breadcrumb :title="club?.club_name || 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb title="Accounts" icon="bi-chevron-right" />
      <Breadcrumb :title="account ? account.name : 'Undefined'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{ account ? account.name : 'Undefined' }}
            </div>

            <div class="flex items-center gap-4">
              <PrimaryButton v-if="account" @click="router.push({ name: 'accounts.edit' })">
                Edit
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

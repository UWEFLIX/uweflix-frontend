<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onBeforeMount, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import DangerButton from '@/components/DangerButton.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import VueMultiselect from 'vue-multiselect';
import NumberInput from '@/components/NumberInput.vue';
import type Account from '../models/account';
import { useAccountStore } from '../stores/account_store';
import type Club from '../models/club';
import { useClubStore } from '../stores/club_store';

const router = useRouter();
const toast = useToast();
const accountStore = useAccountStore();
const clubStore = useClubStore();

const isLoading = ref(false);
const account: Ref<Account | undefined> = ref(undefined);
const club: Ref<Club | undefined> = ref(undefined);
const action = ref('post');

const form: Ref<any> = ref({
  id: 0,
  uid: '',
  name: '',
  cards: null,
  entity_type: 'CLUB',
  entity_id: null,
  discount_rate: 0.0,
  status: 'ENABLED',
  balance: 0.0,
  class_name: 'ACCOUNT'
});

async function submit() {
  try {
    switch (action.value) {
      case 'post':
        await accountStore.createAccount(form.value);
        break;
      case 'patch':
        await accountStore.updateAccount(form.value);
        break;
      case 'delete':
        // await accountStore.deleteAccount(form.value);
        break;
    }

    await router.push({ name: 'clubs.accounts', params: { id: club.value?.id } });
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
}

onBeforeMount(async () => {
  isLoading.value = true;
  const clubId = router.currentRoute.value.params.clubId as string;
  const accountId = router.currentRoute.value.params.accountId as string;

  if (clubId) {
    club.value = await clubStore.getClub(clubId);
    form.value = { ...form.value, entity_id: Number(clubId) };
  }

  if (accountId) {
    const existingAccount = await accountStore.getClubAccount(accountId);
    account.value = existingAccount;
    form.value = {
      id: existingAccount.id,
      uid: existingAccount.uid,
      name: existingAccount.name,
      cards: existingAccount.cards,
      entity_id: Number(clubId),
      discount_rate: existingAccount.discount_rate,
      status: existingAccount.status,
      balance: existingAccount.balance
    };
  }

  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs v-if="!isLoading">
      <Breadcrumb title="Clubs" icon="bi-people" :to="{ name: 'clubs.index' }" />
      <Breadcrumb :title="club?.club_name || 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb
        title="Accounts"
        icon="bi-chevron-right"
        :to="{ name: 'clubs.accounts', params: { id: club?.id } }"
      />
      <Breadcrumb :title="account ? `Edit ${account.uid}` : 'New'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{ account ? 'Edit Account' : 'New Account' }}
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Form -->
          <form @submit.prevent="submit">
            <div class="p-6">
              <section id="general-info" class="space-y-4">
                <h3 class="text-lg text-gray-500">General</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                  <div class="flex-1">
                    <InputLabel for="name" value="Name" class="mb-1" />
                    <TextInput v-model="form.name" id="name" class="w-full" required />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="dicount_rate" value="Discount Rate" class="mb-1" />
                    <NumberInput
                      v-model="form.discount_rate"
                      id="discount_rate"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="status" value="Status" class="mb-1" />
                    <VueMultiselect v-model="form.status" :options="['ENABLED', 'DISABLED']" />
                    <InputError class="mt-2" message="" />
                  </div>
                </div>
              </section>

              <hr class="h-px bg-gray-200 border-0 my-6 sm:my-8" />

              <section id="address-details" class="space-y-4">
                <h3 class="text-lg text-gray-500">Cards</h3>
              </section>
            </div>

            <div class="flex items-center justify-end p-6 gap-4 border-t">
              <DangerButton v-if="account" @click="action = 'delete'"> Delete </DangerButton>

              <SecondaryButton @click="$emit('close')"> Cancel </SecondaryButton>

              <PrimaryButton @click="action = account ? 'patch' : 'post'">
                {{ account ? 'Update' : 'Add' }}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

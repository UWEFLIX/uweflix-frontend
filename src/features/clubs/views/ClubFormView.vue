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
import type Club from '@/features/clubs/models/club';
import { useClubStore } from '@/features/clubs/stores/club_store';
import type User from '@/features/users/models/user';
import { useUserStore } from '@/features/users/stores/user_store';
import { useCityStore } from '@/features/cities/stores/city_store';
import type City from '@/features/cities/models/city';
import VueMultiselect from 'vue-multiselect';
import NumberInput from '@/components/NumberInput.vue';

const router = useRouter();
const toast = useToast();
const clubStore = useClubStore();
const userStore = useUserStore();
const cityStore = useCityStore();

const isLoading = ref(false);
const club: Ref<Club | undefined> = ref(undefined);
const action = ref('post');
const userOptions: Ref<User[]> = ref([]);
const cityOptions: Ref<City[]> = ref([]);

const form: Ref<any> = ref({
  id: 0,
  leader: null,
  club_name: '',
  addr_street_number: '',
  addr_street_name: '',
  email: '',
  contact_number: '',
  landline_number: '',
  post_code: '',
  city: null,
  status: '',
  members: null
});

async function submit() {
  try {
    switch (action.value) {
      case 'post':
        await clubStore.createClub(form.value);
        break;
      case 'patch':
        await clubStore.updateClub(form.value);
        break;
      case 'delete':
        // await userStore.deleteUser(form.value);
        break;
    }

    await router.push({ name: 'clubs.index' });
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
}

onBeforeMount(async () => {
  isLoading.value = true;

  if (router.currentRoute.value.query.name) {
    const existingClub = await clubStore.getClub(router.currentRoute.value.query.name as string);
    club.value = existingClub
    form.value = {
      id: existingClub.id,
      leader: existingClub.leader,
      club_name: existingClub.club_name,
      addr_street_number: existingClub.addr_street_number,
      addr_street_name: existingClub.addr_street_name,
      email: existingClub.email,
      contact_number: existingClub.contact_number,
      landline_number: existingClub.landline_number,
      post_code: existingClub.post_code,
      city: existingClub.city,
      status: existingClub.status,
      members: existingClub.members ?? null
    }
  }

  userOptions.value = await userStore.getUsers();
  cityOptions.value = await cityStore.getCities();

  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Clubs" icon="bi-people" :to="{ name: 'clubs.index' }" />
      <Breadcrumb :title="club ? `Edit #${club.id}` : 'New'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div
              class="font-semibold text-lg sm:text-xl text-gray-900"
            >
              {{ club ? 'Edit Club' : 'New Club' }}
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Form -->
          <form @submit.prevent="submit">
            <div class="p-6">
              <section id="general-info" class="space-y-4">
                <h3 class="text-lg text-gray-500">General Information</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                  <div class="flex-1">
                    <InputLabel for="club_name" value="Name" class="mb-1" />
                    <TextInput
                      v-model="form.club_name"
                      id="club_name"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="leader" value="Club Representative" class="mb-1" />
                    <VueMultiselect
                      v-model="form.leader"
                      :options="userOptions"
                      label="name"
                      track-by="id" />
                    <InputError class="mt-2" message="" />
                  </div>
                </div>
              </section>

              <hr class="h-px bg-gray-200 border-0 my-6 sm:my-8" />

              <section id="address-details" class="space-y-4">
                <h3 class="text-lg text-gray-500">Address Details</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                  <div class="flex-1">
                    <InputLabel for="addr_street_number" value="Street Number" class="mb-1" />
                    <TextInput
                      v-model="form.addr_street_number"
                      id="addr_street_number"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="addr_street_name" value="Street Name" class="mb-1" />
                    <TextInput
                      v-model="form.addr_street_name"
                      id="addr_street_name"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="post_code" value="Post Code" class="mb-1" />
                    <NumberInput
                      v-model="form.post_code"
                      id="post_code"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="city" value="City" class="mb-1" />
                    <VueMultiselect
                      v-model="form.city"
                      :options="cityOptions"
                      label="name"
                      track-by="id" />
                    <InputError class="mt-2" message="" />
                  </div>
                </div>
              </section>

              <hr class="h-px bg-gray-200 border-0 my-6 sm:my-8" />

              <section id="contact-info" class="space-y-4">
                <h3 class="text-lg text-gray-500">Contact Information</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                  <div class="flex-1">
                    <InputLabel for="email" value="Email" class="mb-1" />
                    <TextInput
                      v-model="form.email"
                      type="email"
                      id="email"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="contact_number" value="Mobile No." class="mb-1" />
                    <TextInput
                      v-model="form.contact_number"
                      id="contact_number"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>

                  <div class="flex-1">
                    <InputLabel for="landline_number" value="Landline No." class="mb-1" />
                    <TextInput
                      v-model="form.landline_number"
                      id="landline_number"
                      class="w-full"
                      required
                    />
                    <InputError class="mt-2" message="" />
                  </div>
                </div>
              </section>
            </div>

            <div class="flex items-center justify-end p-6 gap-4 border-t">
              <DangerButton v-if="club" @click="action = 'delete'">
                Delete
              </DangerButton>

              <SecondaryButton @click="$emit('close')">
                Cancel
              </SecondaryButton>

              <PrimaryButton @click="action = club ? 'patch' : 'post'">
                {{ club ? 'Update' : 'Add' }}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
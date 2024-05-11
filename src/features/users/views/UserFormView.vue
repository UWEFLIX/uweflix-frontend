<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onBeforeMount, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useUserStore } from '@/features/users/stores/user_store';
import type User from '@/features/users/models/user';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import DangerButton from '@/components/DangerButton.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import type Role from '@/features/users/models/role';

const userStore = useUserStore();

const isLoading = ref(false);
const user: Ref<User | undefined> = ref(undefined);
const action = ref('post');

const form: Ref<User> = ref({
  id: undefined,
  name: '',
  email: '',
  password: '',
  roles: [],
  status: undefined
});

function handleToggle(role: Role) {
  if (form.value.roles?.includes(role)) {
    const index = form.value.roles.indexOf(role);
    form.value.roles.splice(index, 1);
  } else {
    form.value.roles?.push(role);
  }
}

onBeforeMount(() => {
  isLoading.value = true;
  userStore.getRoles();
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Users" icon="bi-person" />
      <Breadcrumb :title="user ? `Edit #${user.id}` : 'New'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div
              class="font-semibold text-lg sm:text-xl text-gray-900"
            >
              {{ user ? 'Edit User' : 'New User' }}
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Form -->
          <form @submit.prevent="">
            <div class="p-6">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                <div class="flex-1">
                  <InputLabel for="name" value="Name" class="mb-1" />
                  <TextInput
                    v-model="form.name"
                    id="name"
                    class="w-full"
                    required
                  />
                  <InputError class="mt-2" message="" />
                </div>

                <div class="flex-1">
                  <InputLabel for="email" value="Email" class="mb-1" />
                  <TextInput
                    v-model="form.email"
                    id="email"
                    class="w-full"
                    required
                  />
                  <InputError class="mt-2" message="" />
                </div>

                <div v-if="!user" class="flex-1">
                  <InputLabel for="password" value="Password" class="mb-1" />
                  <TextInput
                    v-model="form.password"
                    id="password"
                    class="w-full"
                    required
                  />
                  <InputError class="mt-2" message="" />
                </div>
              </div>

              <div class="mb-4">
                <InputLabel for="roles" value="Roles" class="mb-1" />

                <div class="flex flex-wrap gap-3">
                  <ToggleButton
                    v-for="role in userStore.roles"
                    :key="role.id"
                    button-type="outline"
                    inactive-icon="bi-plus-lg"
                    active-icon="bi-check-lg"
                    :is-active="form.roles?.includes(role)"
                    @toggle-action="handleToggle(role)"
                  >
                    <span class="font-medium mr-1">
                        {{ role.name }}
                    </span>
                  </ToggleButton>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end p-6 gap-4 border-t">
              <DangerButton v-if="user" @click="action = 'delete'">
                Delete
              </DangerButton>

              <SecondaryButton @click="$emit('close')">
                Cancel
              </SecondaryButton>

              <PrimaryButton @click="action = user ? 'patch' : 'post'">
                {{ user ? 'Update' : 'Add' }}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
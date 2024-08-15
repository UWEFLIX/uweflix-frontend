<script setup lang="ts">
import SecondaryButton from '@/components/SecondaryButton.vue';
import Modal from '@/components/Modal.vue';
import { computed, type Ref, ref } from 'vue';
import TextInput from '@/components/TextInput.vue';
import { useDebounceFn } from '@vueuse/core';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/features/users/stores/user_store';
import type User from '@/features/users/models/user';
import { useAccountStore } from '@/features/clubs/stores/account_store';

const emit = defineEmits(['update:selected-customer']);
const props = defineProps<{
  selectedCustomer: {
    id: number;
    name: string;
    email: string;
    discountRate: number;
  } | undefined
}>();

const proxySelectedCustomer = computed({
    get() {
      return props.selectedCustomer
    },

    set(val) {
      emit('update:selected-customer', val)
    }
  }
)

const toast = useToast();
const userStore = useUserStore();
const accountStore = useAccountStore();

const isShowing = ref(false);
const customerName = ref('');
const customers: Ref<User[]> = ref([]);

const onInput = useDebounceFn(async (e: Event) => {
  try {
    customers.value = await userStore.searchUser(
      (e.target instanceof HTMLInputElement && e.target.value) || ''
    )
  } catch (e: any) {
    toast.error(e.message)
  }
}, 500)

async function onClick(customer: User) {
  const account = await accountStore.getUserAccount(customer.id)
  proxySelectedCustomer.value = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    discountRate: account.discount_rate
  }
  isShowing.value = false
}
</script>

<template>
  <SecondaryButton
    @click="isShowing = true"
    class="py-2.5"
  >
    <div class="w-full text-center">
      Select Customer
    </div>
  </SecondaryButton>

  <Modal :show="isShowing" @close="isShowing = false">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div class="flex items-center justify-between p-6 border-b">
        <h1 class="font-bold text-lg sm:text-xl text-gray-900">Select Customer</h1>
      </div>

      <form @submit.prevent="">
        <div class="p-6">
          <TextInput
            v-model="customerName"
            id="name"
            class="w-full mb-4"
            placeholder="Search customer by name"
            @input="onInput"
            required
          />

          <div
            v-for="customer in customers"
            :key="customer.id"
            @click="onClick(customer)"
            class="border rounded-lg p-3 mb-3 cursor-pointer hover:bg-red-50 hover:border-red-300 text-sm transition-all group"
          >
            <div class="flex flex-row border-dashed border-b group-hover:border-red-300 pb-1 mb-1">
              {{ customer.name }}
            </div>

            <div class="flex flex-row mb-1">
              <div class="w-1/4 font-semibold text-gray-700 mr-2">Email</div>
              <div class="flex-grow text-gray-700 mr-2">{{ customer.email ?? '-' }}</div>
            </div>

            <div class="flex flex-row mb-1">
              <div class="w-1/4 font-semibold text-gray-700 mr-2">Status</div>
              <div class="flex-grow text-gray-700 mr-2">{{ customer.status ?? '-' }}</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <SecondaryButton @click="isShowing = false">
            Close
          </SecondaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>
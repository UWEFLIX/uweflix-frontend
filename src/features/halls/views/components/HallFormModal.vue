<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import InputError from '@/components/InputError.vue';
import DangerButton from '@/components/DangerButton.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { type Ref, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import type Hall from '../../models/hall';
import { useHallStore } from '../../stores/hall_store';
import NumberInput from '@/components/NumberInput.vue';

const emit = defineEmits(['close', 'list-changed']);
const props = defineProps<{
  open: boolean;
  hall: Hall | undefined;
}>();

const toast = useToast();
const hallStore = useHallStore();
const action = ref('post');

const form: Ref<any> = ref({
  id: 0,
  hall_name: '',
  seats_per_row: 0,
  no_of_rows: 0,
  class_name: 'HALL'
});

watch(
  () => props.open,
  () => {
    if (props.open) {
      form.value = props.hall
        ? { ...props.hall }
        : {
            id: 0,
            hall_name: '',
            seats_per_row: 0,
            no_of_rows: 0,
            class_name: 'HALL'
          };
    }
  },
  { immediate: true }
);

async function submit() {
  try {
    switch (action.value) {
      case 'post':
        await hallStore.createHall(form.value);
        break;
      case 'patch':
        await hallStore.updateHall(form.value);
        break;
      case 'delete':
        // await hallStore.deleteHall(form.value);
        break;
    }

    emit('list-changed');
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
}
</script>

<template>
  <Modal :show="open" max-width="3xl" @close="$emit('close')">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div class="flex items-center justify-between p-6 border-b">
        <h1 class="font-bold text-lg sm:text-xl text-gray-900">
          {{ hall ? 'Edit Hall' : 'New Hall' }}
        </h1>
      </div>

      <form @submit.prevent="submit">
        <div class="p-6">
          <div class="mb-4">
            <InputLabel for="hall-name" value="Name" class="mb-1" />
            <TextInput v-model="form.hall_name" id="hall-name" class="w-full" required />
            <InputError class="mt-2" message="" />
          </div>

          <div class="mb-4">
            <InputLabel for="seats-per-row" value="Seats/Row" class="mb-1" />
            <NumberInput v-model="form.seats_per_row" id="seats-per-row" class="w-full" required />
            <InputError class="mt-2" message="" />
          </div>

          <div class="mb-4">
            <InputLabel for="no-of-rows" value="No. Rows" class="mb-1" />
            <NumberInput v-model="form.no_of_rows" id="no-of-rows" class="w-full" required />
            <InputError class="mt-2" message="" />
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <DangerButton v-if="hall" @click="action = 'delete'"> Delete </DangerButton>

          <SecondaryButton @click="$emit('close')"> Cancel </SecondaryButton>

          <PrimaryButton @click="action = hall ? 'patch' : 'post'">
            {{ hall ? 'Update' : 'Add' }}
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>

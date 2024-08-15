<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import InputError from '@/components/InputError.vue';
import DangerButton from '@/components/DangerButton.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { type Ref, ref, watch } from 'vue';
import type City from '@/features/cities/models/city';
import { useToast } from 'vue-toastification';
import { useCityStore } from '@/features/cities/stores/city_store';

const emit = defineEmits(['close', 'list-changed']);
const props = defineProps<{
  open: boolean,
  city: City | undefined
}>();

const toast = useToast();
const cityStore = useCityStore();
const action = ref('post');

const form: Ref<any> = ref({
  id: 0,
  name: ''
});

watch(
  () => props.open,
  () => {
    if (props.open) {
      form.value = props.schedule ? { ...props.schedule } : { id: undefined, name: '' };
    }
  },
  { immediate: true }
);

async function submit() {
  try {
    switch (action.value) {
      case 'post':
        await cityStore.createCity(form.value);
        break;
      case 'patch':
        await cityStore.updateCity(form.value);
        break;
      case 'delete':
        await cityStore.deleteCity(form.value);
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
        <h1 class="font-bold text-lg sm:text-xl text-gray-900">{{ city ? 'Edit City' : 'New City' }}</h1>
      </div>

      <form @submit.prevent="submit">
        <div class="p-6">

          <div class="mb-4">
            <InputLabel for="name" value="Name" class="mb-1" />
            <TextInput
              v-model="form.name"
              id="name"
              class="w-full"
              required
            />
            <InputError class="mt-2" message="" />
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <DangerButton v-if="city" @click="action = 'delete'">
            Delete
          </DangerButton>

          <SecondaryButton @click="$emit('close')">
            Cancel
          </SecondaryButton>

          <PrimaryButton @click="action = city ? 'patch' : 'post'">
            {{ city ? 'Update' : 'Add' }}
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import InputError from '@/components/InputError.vue'
import DangerButton from '@/components/DangerButton.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { ref } from 'vue'

defineEmits(['close'])
defineProps<{
  open: boolean,
  city: Object
}>()

const form = ref({
  name: ''
})
</script>

<template>
  <Modal :show="open" max-width="3xl" @close="$emit('close')">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div class="flex items-center justify-between p-6 border-b">
        <h1 class="font-bold text-2xl text-gray-900">{{ city ? 'Edit City' : 'New City' }}</h1>
      </div>

      <form @submit.prevent="">
        <div class="p-6">

          <div class="mb-4">
            <InputLabel for="name" value="Name" class="mb-1" />
            <TextInput
              v-model="form.name"
              id="name"
              class="w-full"
            />
            <InputError class="mt-2" message="" />
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <DangerButton v-if="city">
            Delete
          </DangerButton>
          <SecondaryButton @click="$emit('close')">
            Cancel
          </SecondaryButton>
          <PrimaryButton>
            {{ city ? "Update" : "Add" }}
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import TextInput from '@/components/TextInput.vue'
import { ref } from 'vue'

const form = ref({
  email: '',
  password: ''
})
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100 items-center justify-center">
    <form
      action="#"
      class="bg-white w-full max-w-xl space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p class="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <InputLabel for="email" value="Email" class="mb-1" />

        <TextInput v-model="form.email" type="email" placeholder="Enter email" class="w-full" />
      </div>

      <div>
        <InputLabel for="password" value="Password" class="mb-1" />

        <TextInput
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          class="w-full"
        />
      </div>

      <PrimaryButton type="submit">Sign in</PrimaryButton>
    </form>
  </div>
</template>

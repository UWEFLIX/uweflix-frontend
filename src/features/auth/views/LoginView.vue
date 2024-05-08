<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import TextInput from '@/components/TextInput.vue'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth_store'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

async function submit() {
  isLoading.value = true
  try {
    await authStore.login(form.value.email, form.value.password)
    await router.push({ name: 'home.index' })
  } catch (e) {
    toast.error(e)
  }
  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100 items-center justify-center">
    <form
      @submit.prevent="submit"
      class="bg-white w-full max-w-lg space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
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

      <PrimaryButton type="submit" :disabled="isLoading">Sign in</PrimaryButton>
    </form>
  </div>
</template>

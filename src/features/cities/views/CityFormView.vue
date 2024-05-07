<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import InputError from '@/components/InputError.vue'
import DangerButton from '@/components/DangerButton.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { type Ref, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useRouter } from 'vue-router'
import { useCityStore } from '@/features/cities/stores/city_store'
import type City from '@/features/cities/models/city'
import { useToast } from 'vue-toastification'

defineProps<{
  id: String | undefined
}>()

const router = useRouter()
const toast = useToast()
const cityStore = useCityStore()

const city: Ref<City | undefined> = ref(undefined)

const form: Ref<City> = ref({
  id: undefined,
  name: ''
})

async function submit() {
  try {
    if (city.value) {
      // await cityStore.updateCity(city.value.id, form.value)
    } else {
      await cityStore.createCity(form.value)
    }

    await router.push({ name: 'Cities' })
  } catch (error) {
    console.error(error)
    toast.error(error)
  }
}
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Cities" icon="bi-building" :to="{ name: 'Cities' }" />
      <Breadcrumb v-if="city" :title="`Edit #${city.id}`" icon="bi-chevron-right" />
      <Breadcrumb v-else title="New" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div
              class="font-semibold text-lg sm:text-xl text-gray-900"
            >
              Cities
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <form @submit.prevent="submit">
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

              <SecondaryButton @click="router.push({ name: 'Cities' })">
                Cancel
              </SecondaryButton>

              <PrimaryButton>
                {{ city ? 'Update' : 'Add' }}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
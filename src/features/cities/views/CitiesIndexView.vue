<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { onMounted, type Ref, ref } from 'vue'
import { useCityStore } from '@/features/cities/stores/city_store'
import PrimaryButton from '@/components/PrimaryButton.vue'
import CityForm from '@/features/cities/views/components/CityForm.vue'

const isLoading = ref(false)
const cities: Ref<Array<any>> = ref([])
const cityStore = useCityStore()
const selectedCity: Ref<any> = ref()
const openingCityForm = ref(false)

onMounted(async () => {
  cities.value = await cityStore.getCities()
  console.log(cities.value)
})
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Cities" icon="bi-building" />
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

            <div class="flex items-center gap-4">
              <PrimaryButton
                @click="openingCityForm = true"
              >
                New City
              </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table
              class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
            >
              <thead class="text-left uppercase">
              <tr>
                <th
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-500"
                >
                  ID
                </th>
                <th
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-500"
                >
                  Name
                </th>
                <th
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-500"
                >
                  Actions
                </th>
              </tr>
              </thead>

              <tbody
                v-if="cities.length === 0"
                class="divide-y divide-gray-200"
              >
              <tr>
                <td
                  colspan="5"
                  class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                >
                  <!-- Loading indicator -->
                  <div v-if="isLoading" class="p-2">
                    <div class="dot-pulse"></div>
                  </div>

                  <div v-else>
                    Please search for an item.
                  </div>
                </td>
              </tr>
              </tbody>

              <tbody
                v-else
                class="divide-y divide-gray-200"
              >
              <tr
                v-for="city in cities"
                :key="city.id"
                class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
              >
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {{ city.id }}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-gray-700"
                >
                  {{ city.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <SecondaryButton
                  >
                    Edit
                  </SecondaryButton>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <CityForm :city="selectedCity" :open="openingCityForm" @close="openingCityForm = false" />
  </DashboardLayout>
</template>
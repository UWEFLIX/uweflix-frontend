<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref } from 'vue';
import { useCityStore } from '@/features/cities/stores/city_store';
import PrimaryButton from '@/components/PrimaryButton.vue';
import type City from '@/features/cities/models/city';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CityFormModal from '@/features/cities/views/components/CityFormModal.vue';

const cityStore = useCityStore();

const isLoading = ref(false);
const isOpeningForm = ref(false);
const cities: Ref<City[]> = ref([]);
const selectedCity: Ref<City | undefined> = ref(undefined);

async function listChanged() {
  isOpeningForm.value = false;
  cities.value = []

  isLoading.value = true;
  cities.value = await cityStore.getCities();
  isLoading.value = false;
}

onMounted(async () => {
  isLoading.value = true;
  cities.value = await cityStore.getCities();
  isLoading.value = false;
});
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
              <PrimaryButton @click="selectedCity = undefined; isOpeningForm = true">
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
                    <LoadingIndicator />
                  </div>

                  <div v-else>
                    No cities found
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
                    @click="selectedCity = city; isOpeningForm = true"
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

    <CityFormModal :city="selectedCity" :open="isOpeningForm" @close="isOpeningForm = false" @list-changed="listChanged" />
  </DashboardLayout>
</template>
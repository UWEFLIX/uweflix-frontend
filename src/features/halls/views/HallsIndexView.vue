<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useRouter } from 'vue-router';
import { useHallStore } from '../stores/city_store';
import type Hall from '../models/hall';

const router = useRouter();
const hallStore = useHallStore();

const isLoading = ref(false);
const halls: Ref<Hall[]> = ref([]);

onMounted(async () => {
  isLoading.value = true;
  halls.value = await hallStore.getHalls();
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Users" icon="bi-person" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">Halls</div>

            <div class="flex items-center gap-4">
              <PrimaryButton @click="router.push({ name: 'halls.new' })"> New Hall </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left uppercase">
                <tr>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">ID</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Name</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Seats/Row</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">No. Rows</th>
                </tr>
              </thead>

              <tbody v-if="halls.length === 0" class="divide-y divide-gray-200">
                <tr>
                  <td
                    colspan="5"
                    class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                  >
                    <!-- Loading indicator -->
                    <div v-if="isLoading" class="p-2">
                      <LoadingIndicator />
                    </div>

                    <div v-else>No halls found</div>
                  </td>
                </tr>
              </tbody>

              <tbody v-else class="divide-y divide-gray-200">
                <tr
                  v-for="hall in halls"
                  :key="hall.id"
                  class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {{ hall.id }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ hall.hall_name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ hall.seats_per_row }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ hall.no_of_rows }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <SecondaryButton
                      @click="
                        router.push({
                          name: 'halls.edit',
                          params: { id: hall.id }
                        })
                      "
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
  </DashboardLayout>
</template>

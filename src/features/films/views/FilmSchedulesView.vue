<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useRouter } from 'vue-router';
import { useScheduleStore } from '../stores/schedule_store';
import { useFilmStore } from '../stores/film_store';
import type Film from '../models/film';
import type Schedule from '../models/schedule';
import dayjs from 'dayjs';

const router = useRouter();
const filmStore = useFilmStore();
const scheduleStore = useScheduleStore();

const isLoading = ref(false);
const film: Ref<Film | undefined> = ref(undefined);
const schedules: Ref<Schedule[]> = ref([]);

onMounted(async () => {
  isLoading.value = true;
  const filmId = router.currentRoute.value.params.id as string;

  if (filmId) {
    const existingFilm = await filmStore.getFilm(filmId);
    film.value = existingFilm;
    schedules.value = await scheduleStore.getSchedules(existingFilm.id);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" :to="{ name: 'films.index' }" />
      <Breadcrumb :title="film ? film.title : 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb title="Schedules" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{ film ? `${film.title}'s Schedules` : 'Undefined' }}
            </div>

            <div class="flex items-center gap-4">
              <PrimaryButton
                v-if="film"
                @click="router.push({ name: 'schedules.new', params: { filmId: film.id } })"
              >
                New Schedule
              </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left uppercase">
                <tr>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">ID</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Show Time</th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    Ticket Price
                  </th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    On Schedule?
                  </th>
                  <th class="whitespace-nowrap px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>

              <tbody v-if="schedules.length === 0" class="divide-y divide-gray-200">
                <tr>
                  <td
                    colspan="5"
                    class="text-left px-6 py-4 text-base text-gray-700 transition-all"
                  >
                    <!-- Loading indicator -->
                    <div v-if="isLoading" class="p-2">
                      <LoadingIndicator />
                    </div>

                    <div v-else>No schedules found</div>
                  </td>
                </tr>
              </tbody>

              <tbody v-else class="divide-y divide-gray-200">
                <tr
                  v-for="schedule in schedules"
                  :key="schedule.id"
                  class="hover:bg-primary-50 hover:shadow active:bg-primary-100 transition"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {{ schedule.id }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ dayjs(schedule.show_time).format('DD/MM/YYYY HH:mm:ss') }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ schedule.ticket_price.toFixed(2) }} GBP
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                    {{ schedule.on_schedule }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <SecondaryButton
                      @click="
                        router.push({
                          name: 'schedule.edit',
                          params: {
                            id: schedule.id
                          }
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

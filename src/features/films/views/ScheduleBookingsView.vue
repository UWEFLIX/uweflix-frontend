<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { onBeforeMount, type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFilmStore } from '@/features/films/stores/film_store';
import { useScheduleStore } from '@/features/films/stores/schedule_store';
import type Film from '@/features/films/models/film';
import type Schedule from '@/features/films/models/schedule';
import dayjs from 'dayjs';

const router = useRouter();
const filmStore = useFilmStore();
const scheduleStore = useScheduleStore();

const isLoading = ref(false);
const film: Ref<Film | undefined> = ref(undefined);
const schedule: Ref<Schedule | undefined> = ref(undefined);

onBeforeMount(async () => {
  isLoading.value = true;
  const filmId = router.currentRoute.value.params.filmId as string;
  const scheduleId = router.currentRoute.value.params.scheduleId as string;

  if (filmId) {
    film.value = await filmStore.getFilm(filmId);
    schedule.value = await scheduleStore.getSchedule(scheduleId);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" :to="{ name: 'films.index' }" />
      <Breadcrumb :title="film ? film.title : 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb title="Schedules" icon="bi-chevron-right" :to="{ name: 'films.schedules', params: {id: film?.id} }" />
      <Breadcrumb :title="schedule ? `${schedule?.hall.hall_name} ${dayjs(schedule?.show_time).format('DD/MM/YYYY')}` : 'Undefined'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{`Bookings - ${schedule?.hall.hall_name} ${dayjs(schedule?.show_time).format('DD/MM/YYYY')}`}}
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

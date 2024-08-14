<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { onBeforeMount, type Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFilmStore } from '@/features/films/stores/film_store';
import { useScheduleStore } from '@/features/films/stores/schedule_store';
import type Film from '@/features/films/models/film';
import type Schedule from '@/features/films/models/schedule';
import dayjs from 'dayjs';
import type Hall from '@/features/halls/models/hall';
import { useBookingStore } from '@/features/films/stores/booking_store';
import SeatCell from '@/features/films/views/components/SeatCell.vue';
import type Seat from '@/features/films/models/seat';

const router = useRouter();
const filmStore = useFilmStore();
const scheduleStore = useScheduleStore();
const bookingStore = useBookingStore();

const isLoading = ref(false);
const film: Ref<Film | undefined> = ref(undefined);
const schedule: Ref<Schedule | undefined> = ref(undefined);
const hall: Ref<Hall | undefined> = ref(undefined);
const bookedSeats: Ref<String[]> = ref([]);
const selectedSeats: Ref<Seat[]> = ref([]);

watch(() => selectedSeats.value, (newValue) => {
  console.log(newValue);
});

onBeforeMount(async () => {
  isLoading.value = true;
  const filmId = router.currentRoute.value.params.filmId as string;
  const scheduleId = router.currentRoute.value.params.scheduleId as string;

  if (filmId) {
    film.value = await filmStore.getFilm(filmId);
    schedule.value = await scheduleStore.getSchedule(scheduleId);
    hall.value = schedule.value.hall;
    bookedSeats.value = await bookingStore.getBookedSeats(schedule.value.id);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" :to="{ name: 'films.index' }" />
      <Breadcrumb :title="film ? film.title : 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb v-if="film" title="Schedules" icon="bi-chevron-right" :to="{ name: 'films.schedules', params: {id: film?.id} }" />
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

          <div class="flex flex-col items-center py-6 overflow-auto">
            <!-- Halls -->
            <div v-for="row in hall?.no_of_rows" :key="row" class="flex flex-row">
              <div v-for="col in hall?.seats_per_row" :key="col">
                <SeatCell :col="col" :row="row" :booked-seats="bookedSeats" v-model:selected-seats="selectedSeats" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

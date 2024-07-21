<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { onMounted, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useRouter } from 'vue-router';
import { useFilmStore } from '../stores/film_store';
import type Film from '../models/film';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const router = useRouter();
const filmStore = useFilmStore();

const isLoading = ref(false);
const films: Ref<Film[]> = ref([]);

function convertSecondsToHours(seconds: number): string {
  const duration = dayjs.duration(seconds, 'seconds');
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.minutes());
  const secondsRemaining = Math.floor(duration.seconds());

  return `${hours}h ${minutes}m ${secondsRemaining}s`;
}

onMounted(async () => {
  isLoading.value = true;
  films.value = await filmStore.getFilms();
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">Films</div>

            <div class="flex items-center gap-4">
              <PrimaryButton @click="router.push({ name: 'films.new' })"> New Film </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <div v-if="films.length === 0" class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900">No films to show!</div>
          </div>

          <article v-else class="flex flex-col divide-y">
            <button
              @click="router.push({ name: 'films.new' })"
              v-for="film in films"
              :key="film.id"
              class="flex flex-col items-start bg-white hover:bg-red-50 transition-all cursor-pointer p-4"
            >
              <div class="flex flex-row items-center justify-start gap-2 mb-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6JrXEk7rAFUCN-4JkWBaqscN7NMelDtAUw&s"
                  alt="Film Poster"
                  class="w-18 h-24 object-cover rounded-lg"
                />

                <div class="flex flex-col items-start">
                  <div class="font-semibold text-gray-900 mb-1">
                    {{ film.id }}. {{ film.title }}
                  </div>
                  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-1">
                    <span>{{ convertSecondsToHours(film.duration_sec) }}</span>
                    <span>{{ film.age_rating }}</span>
                    <span
                      class="py-1 px-2 rounded-full text-xs"
                      :class="[
                        film.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      ]"
                      >{{ film.is_active ? 'Active' : 'Inactive' }}</span
                    >
                  </div>
                  <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>From: {{ dayjs(film.on_air_from).format('DD/MM/YYYY') }}</span>
                    <span>To: {{ dayjs(film.on_air_to).format('DD/MM/YYYY') }}</span>
                  </div>
                </div>
              </div>

              <p class="text-sm">{{ film.trailer_desc }}</p>
            </button>
          </article>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

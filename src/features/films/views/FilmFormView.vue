<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onBeforeMount, type Ref, ref } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import DangerButton from '@/components/DangerButton.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import type Film from '../models/film';
import { useFilmStore } from '../stores/film_store';
import NumberInput from '@/components/NumberInput.vue';
import VueMultiselect from 'vue-multiselect';

const router = useRouter();
const toast = useToast();
const filmStore = useFilmStore();

const isLoading = ref(false);
const film: Ref<Film | undefined> = ref(undefined);
const action = ref('post');
const fileUrl: Ref<string | null> = ref(null);
const fromDate = ref();
const toDate = ref();

const form: Ref<any> = ref({
  id: 0,
  title: '',
  age_rating: undefined,
  duration_sec: 0,
  trailer_desc: '',
  on_air_from: '',
  on_air_to: '',
  is_active: true,
  images: null,
  schedules: null,
  class_name: 'FILM'
});

const posterImage = ref(undefined);

async function submit() {
  form.value.on_air_from = fromDate.value;
  form.value.on_air_to = toDate.value;

  try {
    let newFilm: Film;
    switch (action.value) {
      case 'post':
        newFilm = await filmStore.createFilm(form.value);
        await filmStore.updateFilmPoster(newFilm.id, posterImage.value);
        break;
      case 'patch':
        await filmStore.updateFilm(form.value);
        break;
      case 'delete':
        // await userStore.deleteUser(form.value);
        break;
    }

    await router.push({ name: 'films.index' });
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
}

function handleFileInput(event: any) {
  const file = event.target.files[0];
  posterImage.value = file;
  fileUrl.value = URL.createObjectURL(file);
}

onBeforeMount(async () => {
  isLoading.value = true;
  const filmId = router.currentRoute.value.params.id as string;

  if (filmId) {
    const existingFilm = await filmStore.getFilm(filmId);
    film.value = existingFilm;
    form.value = { ...existingFilm };
    toDate.value = new Date(existingFilm.on_air_to);
    fromDate.value = new Date(existingFilm.on_air_from);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" :to="{ name: 'films.index' }" />
      <Breadcrumb :title="film ? `Edit #${film.id}` : 'New'" icon="bi-chevron-right" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{ film ? 'Edit Film' : 'New Film' }}
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <!-- Form -->
          <form @submit.prevent="submit">
            <div class="p-6">
              <div class="mb-4 sm:mb-6">
                <div class="flex flex-row items-center justify-start">
                  <div class="w-fit">
                    <label
                      for="files"
                      class="block mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                      Poster Image
                    </label>
                  </div>

                  <img
                    v-if="fileUrl !== null"
                    :src="fileUrl"
                    alt=""
                    class="h-24 object-cover rounded-lg ml-6"
                  />
                </div>

                <input id="files" class="hidden" type="file" @input="handleFileInput" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div class="flex-1">
                  <InputLabel for="title" value="Title" class="mb-1" />
                  <TextInput v-model="form.title" id="title" class="w-full" required />
                  <InputError class="mt-2" message="" />
                </div>

                <div class="flex-1">
                  <InputLabel for="age-rating" value="Age Rating" class="mb-1" />
                  <VueMultiselect v-model="form.age_rating" :options="['CHILD', 'ADULT']" />
                  <InputError class="mt-2" message="" />
                </div>

                <div class="flex-1">
                  <InputLabel for="duration" value="Duration" class="mb-1" />
                  <NumberInput v-model="form.duration_sec" id="duration" class="w-full" required />
                  <InputError class="mt-2" message="" />
                </div>
              </div>

              <div class="flex-1 mb-4 sm:mb-6">
                <InputLabel for="description" value="Description" class="mb-1" />
                <textarea
                  class="w-full p-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  v-model="form.trailer_desc"
                  id="description"
                  rows="4"
                ></textarea>
                <InputError class="mt-2" message="" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div class="flex-1">
                  <InputLabel for="on-air-from" value="From" class="mb-1" />
                  <vue-date-picker v-model="fromDate"></vue-date-picker>
                  <InputError class="mt-2" message="" />
                </div>

                <div class="flex-1">
                  <InputLabel for="on-air-to" value="To" class="mb-1" />
                  <vue-date-picker v-model="toDate"></vue-date-picker>
                  <InputError class="mt-2" message="" />
                </div>

                <div class="flex-1">
                  <InputLabel for="status" value="Status" class="mb-1" />
                  <select
                    class="w-full p-2 border bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    v-model="form.is_active"
                    id="is-active"
                  >
                    <option :value="true">Active</option>
                    <option :value="false">Inactive</option>
                  </select>
                  <InputError class="mt-2" message="" />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end p-6 gap-4 border-t">
              <DangerButton v-if="film" @click="action = 'delete'"> Delete </DangerButton>

              <SecondaryButton @click="$emit('close')"> Cancel </SecondaryButton>

              <PrimaryButton @click="action = film ? 'patch' : 'post'">
                {{ film ? 'Update' : 'Add' }}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; /* Add the standard property 'appearance' */
  background: transparent
    url("data:image/svg+xml;utf8,<svg fill='grey' height='28' viewBox='0 0 24 24' width='28' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;
  background-position-x: 99%;
  background-position-y: 40%;
}
</style>

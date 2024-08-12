<script setup lang="ts">
import FileInput from '@/components/FileInput.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { ref, type Ref } from 'vue';
import type Film from '../../models/film';
import { useToast } from 'vue-toastification';
import { useFilmStore } from '../../stores/film_store';

const props = defineProps<{
  film: Film;
}>();

const filmStore = useFilmStore();
const toast = useToast();
const imageList: Ref<FileList | null> = ref([]);

function uploadImages() {
  try {
    filmStore.uploadFilmImages(props.film.id, imageList.value);
    toast.success('Images uploaded successfully');
  } catch (error) {
    toast.error('Failed to upload images');
  }
}
</script>

<template>
  <div class="bg-white shadow-sm sm:rounded-lg">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2 sm:p-6 border-b"
    >
      <h2 class="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">Film Images</h2>
    </div>

    <form @submit.prevent="">
      <div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <FileInput
              id="item-images"
              :existing-files="film.images"
              accept="image/png, image/jpeg"
              :max-file-limit="5"
              @pass-data="imageList = $event"
            />
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-6 border-t flex justify-end">
        <PrimaryButton @click="uploadImages" class="ms-3"> Upload </PrimaryButton>
      </div>
    </form>
  </div>
</template>

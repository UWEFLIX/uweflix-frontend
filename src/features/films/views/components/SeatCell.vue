<script setup lang="ts">
import { computed } from 'vue';
import { numberToTitle } from '@/features/utils/seat_utils';

const props = defineProps<{
  row: number;
  col: number;
  bookedSeats: String[];
}>()

const seatName = computed(() => {
  return numberToTitle(props.row) + props.col;
})

const isBooked = computed(() => {
  return props.bookedSeats.includes(seatName.value);
})
</script>

<template>
  <button class="inline-flex w-8 h-8 items-center justify-center border rounded-md mx-1 my-1 transition-all"
    :class="{
      'bg-gray-200 border-gray-300 text-gray-500 hover:bg-gray-300': !isBooked,
      'bg-red-500 border-red-600 text-white': isBooked,
    }">
      <div class="text-xs text-center">{{ seatName }}</div>
  </button>
</template>
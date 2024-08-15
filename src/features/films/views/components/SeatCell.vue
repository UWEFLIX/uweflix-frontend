<script setup lang="ts">
import { computed } from 'vue';
import { numberToTitle } from '@/features/utils/seat_utils';
import type Seat from '@/features/films/models/seat';
import { SeatStatus } from '@/constants/seat_status_enum';

const emit = defineEmits(['update:selectedSeats']);
const props = defineProps<{
  row: number;
  col: number;
  bookedSeats: String[];
  selectedSeats: Seat[];
}>()

const seatNo = computed(() => {
  return numberToTitle(props.row) + props.col;
})

const isBooked = computed(() => {
  return props.bookedSeats.includes(seatNo.value);
})

const isSelected = computed(() => {
  return props.selectedSeats.some(seat => seat.seat_no === seatNo.value);
})

const computedStatus = computed(() => {
  if (isBooked.value) return SeatStatus.Booked;
  if (isSelected.value) return SeatStatus.Selected;
  return SeatStatus.Available;
})

const cellClasses = computed(() => {
  return {
    'Available': 'bg-gray-200 border-gray-300 text-gray-500 hover:bg-gray-300',
    'Booked': 'bg-red-500 border-red-600 text-white',
    'Selected': 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600',
  }[computedStatus.value]
})

const proxySelectedSeats = computed({
  get: () => props.selectedSeats,
  set: (value) => {
    emit('update:selectedSeats', value);
  }
})

function toggleSeat() {
  if (isBooked.value) return;
  if (isSelected.value) {
    proxySelectedSeats.value = proxySelectedSeats.value.filter((seat) => seat.seat_no !== seatNo.value);
  } else {
    proxySelectedSeats.value = [...proxySelectedSeats.value, {
      seat_no: seatNo.value,
      person_type_id: 1,
      user_id: 0
    }];
  }
}
</script>

<template>
  <button @click="toggleSeat" class="inline-flex w-10 h-8 items-center justify-center border rounded-md mx-1 my-1 transition-all"
    :class="cellClasses"
    :disabled="isBooked">
      <div class="text-xs text-center">{{ seatNo }}</div>
  </button>
</template>
<script setup lang="ts">
import SecondaryButton from '@/components/SecondaryButton.vue';
import Modal from '@/components/Modal.vue';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import type Seat from '@/features/films/models/seat';
import InputLabel from '@/components/InputLabel.vue';
import InputError from '@/components/InputError.vue';
import type User from '@/features/users/models/user';
import type Account from '@/features/clubs/models/account';
import { useBookingStore } from '@/features/films/stores/booking_store';
import PrimaryButton from '@/components/PrimaryButton.vue';

const emit = defineEmits(['update:bookedSeats']);
const props = defineProps<{
  scheduleId: number,
  selectedSeats: Seat[],
  selectedCustomer: {
    customer: User
    account: Account
  } | undefined,
  bookedSeats: String[]
}>();

const toast = useToast();
const bookingStore = useBookingStore();

const isShowing = ref(false);
const isCash = ref(0);

const proxyBookedSeats = computed({
  get: () => props.bookedSeats,
  set: (newValue: String[]) => {
    emit('update:bookedSeats', newValue)
  }
})

function bookSeats() {
  try {
    bookingStore.bookSeats({
      bookings: props.selectedSeats,
      club_id: 0,
      schedule_id: props.scheduleId,
      account_id: props.selectedCustomer?.account.id,
      cash: isCash.value,
      class_name: "MULTIPLE_BOOKINGS"
    })

    const newSeats = props.selectedSeats.map(seat => seat.seat_no)
    proxyBookedSeats.value = [...proxyBookedSeats, ...newSeats]
  } catch (e: any) {
    toast.error(e.message)
  }
}
</script>

<template>
  <button @click="isShowing = true"
          class="inline-flex items-center px-4 py-3 bg-gray-800 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150 disabled:opacity-50"
          :disabled="selectedSeats.length < 1 || !selectedCustomer">
    <span class="w-full text-center">Confirm Sale</span>
  </button>

  <Modal :show="isShowing" @close="isShowing = false">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div class="flex items-center justify-between p-6 border-b">
        <h1 class="font-bold text-lg sm:text-xl text-gray-900">Complete Sale</h1>
      </div>

      <form @submit.prevent="">
        <div class="p-6">
          <div class="mb-4">
            <InputLabel for="payment-method" value="Payment Method" class="mb-1" />
            <select
              class="w-full p-2 border bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              v-model="isCash"
              id="payment-method"
            >
              <option :value="0">Account</option>
              <option :value="1">Cash</option>
            </select>
            <InputError class="mt-2" message="" />
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <SecondaryButton @click="isShowing = false">
            Close
          </SecondaryButton>

          <PrimaryButton @click="bookSeats">
            Confirm Sale
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
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
<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { computed, onBeforeMount, type Ref, ref, watch } from 'vue';
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
import PrimaryButton from '@/components/PrimaryButton.vue';
import SelectCustomerModal from '@/features/films/views/components/SelectCustomerModal.vue';
import ConfirmSaleModal from '@/features/films/views/components/ConfirmSaleModal.vue';
import type User from '@/features/users/models/user';
import type Account from '@/features/clubs/models/account';
import type PersonType from '../models/person_type';
import type Batch from '../models/batch';
import Ticket from './components/Ticket.vue';
import BatchAccordion from './components/BatchAccordion.vue';

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
const showSale = ref(false);
const selectedCustomer: Ref<
  | {
      customer: User;
      account: Account;
    }
  | undefined
> = ref(undefined);
const batchBookings: Ref<Batch[]> = ref([]);

const personTypes: PersonType[] = [
  {
    id: 1,
    person_type: 'Adult',
    discount_amount: 0,
    class_name: 'PERSON_TYPE'
  },
  {
    id: 2,
    person_type: 'Child',
    discount_amount: 20,
    class_name: 'PERSON_TYPE'
  },
  {
    id: 3,
    person_type: 'Student',
    discount_amount: 10,
    class_name: 'PERSON_TYPE'
  }
];

function getPersonType(id: number) {
  return personTypes.find((type) => type.id === id);
}

function applyDiscount(price: number, discount: number) {
  return price - (price * discount) / 100;
}

const subtotal = computed(() => {
  return selectedSeats.value.reduce((acc, seat) => {
    const personType = getPersonType(seat.person_type_id);
    const personDiscount = personType?.discount_amount ?? 0;
    return acc + applyDiscount(schedule.value?.ticket_price!, personDiscount);
  }, 0);
});

const total = computed(() => {
  return (
    subtotal.value - (subtotal.value * (selectedCustomer.value?.account.discount_rate! ?? 0)) / 100
  );
});

watch(
  () => selectedCustomer.value,
  (newValue) => {
    console.log(newValue);
    for (const seat of selectedSeats.value) {
      seat.user_id = newValue?.customer.id!;
    }
  }
);

onBeforeMount(async () => {
  isLoading.value = true;
  const filmId = router.currentRoute.value.params.filmId as string;
  const scheduleId = router.currentRoute.value.params.scheduleId as string;

  if (filmId) {
    film.value = await filmStore.getFilm(filmId);
    schedule.value = await scheduleStore.getSchedule(scheduleId);
    hall.value = schedule.value.hall;
    bookedSeats.value = await bookingStore.getBookedSeats(schedule.value.id);
    batchBookings.value = await scheduleStore.getBatchBookings(schedule.value.id);
  }
  isLoading.value = false;
});
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Films" icon="bi-film" :to="{ name: 'films.index' }" />
      <Breadcrumb :title="film ? film.title : 'Undefined'" icon="bi-chevron-right" />
      <Breadcrumb
        v-if="film"
        title="Schedules"
        icon="bi-chevron-right"
        :to="{ name: 'films.schedules', params: { id: film?.id } }"
      />
      <Breadcrumb
        :title="
          schedule
            ? `${schedule?.hall.hall_name} ${dayjs(schedule?.show_time).format('DD/MM/YYYY')}`
            : 'Undefined'
        "
        icon="bi-chevron-right"
      />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm sm:rounded-lg mb-6">
          <!-- Header -->
          <div class="flex items-center justify-between p-6">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">
              {{
                `Bookings - ${schedule?.hall.hall_name} ${dayjs(schedule?.show_time).format('DD/MM/YYYY')}`
              }}
            </div>

            <div class="flex items-center space-x-4">
              <PrimaryButton @click="showSale = true">
                <i class="bi bi-arrow-left me-2"></i>
                <span>Sale</span>
              </PrimaryButton>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0" />

          <div class="flex flex-col overflow-x-auto py-6 items-center">
            <div class="mx-6">
              <div class="w-full bg-gray-50 p-2 border border-gray-300 text-center rounded-lg mb-3">
                Screen
              </div>

              <!-- Halls -->
              <div v-for="row in hall?.no_of_rows" :key="row" class="flex flex-row">
                <div v-for="col in hall?.seats_per_row" :key="col">
                  <SeatCell
                    :col="col"
                    :row="row"
                    :booked-seats="bookedSeats"
                    v-model:selected-seats="selectedSeats"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-sm sm:rounded-lg">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <div class="font-semibold text-lg sm:text-xl text-gray-900">Tickets</div>
          </div>

          <BatchAccordion v-for="batch in batchBookings" :key="batch.batch_ref" :batch="batch">
            <template #content>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="booking in batch.bookings" :key="booking.id">
                  <Ticket />
                </div>
              </div>
            </template>
          </BatchAccordion>
        </div>
      </div>
    </div>

    <div
      class="fixed overflow-auto flex flex-col shrink-0 top-0 right-0 z-40 h-full w-screen sm:w-[24rem] transition-transform border bg-white"
      :class="{ 'translate-x-full': !showSale }"
    >
      <div class="flex flex-row items-center justify-between px-2 pt-3 mb-3">
        <!-- Close button -->
        <button
          @click="showSale = false"
          type="button"
          class="inline-flex items-center justify-center w-7 h-7 bg-transparent text-sm hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-lg"
        >
          <i class="bi bi-x text-xl"></i>
        </button>
      </div>

      <div class="h-full flex flex-col overflow-y-auto pb-6">
        <div v-if="selectedSeats.length < 1" class="text-sm text-gray-500 px-4">
          Select seats to proceed with the sale
        </div>

        <!-- Displayed when seats are selected -->
        <div v-else class="flex flex-col">
          <div class="flex flex-col px-4 mb-2">
            <h3 class="font-medium text-sm uppercase text-gray-600 mb-2">Customer</h3>

            <SelectCustomerModal
              v-if="!selectedCustomer"
              v-model:selected-customer="selectedCustomer"
            />

            <div v-else class="relative border rounded-lg p-3 text-sm transition-all group">
              <!-- Close button -->
              <button
                @click="selectedCustomer = undefined"
                type="button"
                class="absolute top-0 right-0 inline-flex items-center justify-center w-7 h-7 bg-transparent text-sm hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-lg mt-1.5 me-1.5"
              >
                <i class="bi bi-x text-xl"></i>
              </button>

              <div class="flex flex-row border-dashed border-b pb-1 mb-1">
                {{ selectedCustomer?.customer.name }}
              </div>

              <div class="flex flex-row mb-1">
                <div class="w-1/4 font-semibold text-gray-700 mr-2">Email</div>
                <div class="flex-grow text-gray-700 mr-2">
                  {{ selectedCustomer?.customer.email ?? '-' }}
                </div>
              </div>

              <div class="flex flex-row mb-1">
                <div class="w-1/4 font-semibold text-gray-700 mr-2">Discount Rate</div>
                <div class="flex-grow text-gray-700 mr-2">
                  {{ selectedCustomer?.account.discount_rate ?? '-' }}%
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col border-b border-gray-300 text-sm text-gray-600 px-4 mb-6">
            <div class="flex flex-row py-2.5 items-center justify-between border-b border-gray-300">
              <div>Qty</div>
              <div>{{ selectedSeats.length }}</div>
            </div>

            <div class="flex flex-row py-2.5 items-center justify-between border-b border-gray-300">
              <div>Subtotal</div>
              <div>£{{ subtotal.toFixed(2) }}</div>
            </div>

            <div class="flex flex-row py-2.5 items-center justify-between border-b border-gray-300">
              <div>Discount %</div>
              <div>{{ selectedCustomer?.account.discount_rate ?? 0 }}%</div>
            </div>

            <div
              class="flex flex-row py-2.5 items-center justify-between font-semibold text-lg text-gray-700"
            >
              <div class="uppercase">Total</div>
              <div>£{{ total.toFixed(2) }}</div>
            </div>
          </div>

          <div class="flex flex-col px-4">
            <h3 class="font-medium text-sm uppercase text-gray-600 mb-2">Selected Seats</h3>

            <div class="flex flex-col gap-3">
              <!-- Selected tickets -->
              <div
                v-for="seat in selectedSeats"
                :key="seat.seat_no"
                class="bg-blue-50 p-2.5 border border-blue-200 rounded-lg shadow-sm"
              >
                <div class="text-sm text-gray-600 mb-2">Seat #{{ seat.seat_no }}</div>

                <select
                  id="person-type"
                  class="w-full p-1.5 border bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mb-2"
                  v-model="seat.person_type_id"
                  required
                >
                  <option v-for="type in personTypes" :key="type.id" :value="type.id">
                    {{ type.person_type }}
                  </option>
                </select>

                <div class="flex flex-row items-center justify-between text-sm text-gray-600 mb-2">
                  <div>Price £{{ schedule?.ticket_price }}</div>

                  <div v-if="seat.person_type_id !== 0">
                    <span class="me-1">dis.</span>
                    <span> {{ getPersonType(seat.person_type_id)?.discount_amount }}% </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmSaleModal
        :selected-seats="selectedSeats"
        :selected-customer="selectedCustomer"
        :schedule-id="schedule?.id!"
        v-model:booked-seats="bookedSeats"
      />
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

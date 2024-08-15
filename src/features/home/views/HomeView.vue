<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { useBookingStore } from '@/features/films/stores/booking_store';
import { onBeforeMount, ref } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const bookingStore = useBookingStore();
const moviesByBookingCountLabels = ref([]);
const moviesByBookingCountData = ref([]);

const chartData = ref({
  labels: moviesByBookingCountLabels.value,
  datasets: [
    {
      data: moviesByBookingCountData.value,
      backgroundColor: [
        '#EF4444',
        '#EF4444',
        '#EF4444',
        '#EF4444',
        '#EF4444'
      ]
    }
  ]
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: false
    }
  }
};

onBeforeMount(async () => {
  const moviesByBookingCount: any = await bookingStore.getMoviesByBookingCount();
  moviesByBookingCountLabels.value = moviesByBookingCount.map((movie: any) => movie.film_title)
  moviesByBookingCountData.value = moviesByBookingCount.map((movie: any) => movie.bookings)

  chartData.value = {
    labels: moviesByBookingCountLabels.value,
    datasets: [
      {
        data: moviesByBookingCountData.value,
        backgroundColor: [
          '#EF4444',
          '#EF4444',
          '#EF4444',
          '#EF4444',
          '#EF4444'
        ]
      }
    ]
  }
})
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Home" icon="bi-house" />
    </template>

    <div class="py-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-4 sm:gap-6 mx-auto sm:px-6 lg:px-8"
      >
        <div class="bg-white shadow-sm sm:rounded-lg p-4 sm:p-6">
          <h1 class="font-bold text-gray-900">Most Booked</h1>
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

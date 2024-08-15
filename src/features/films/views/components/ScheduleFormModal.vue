<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import InputLabel from '@/components/InputLabel.vue';
import InputError from '@/components/InputError.vue';
import DangerButton from '@/components/DangerButton.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, type Ref, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useScheduleStore } from '@/features/films/stores/schedule_store';
import type Film from '@/features/films/models/film';
import type Hall from '@/features/halls/models/hall';
import { useHallStore } from '@/features/halls/stores/hall_store';
import type Schedule from '@/features/films/models/schedule';
import NumberInput from '@/components/NumberInput.vue';

const emit = defineEmits(['close', 'list-changed']);
const props = defineProps<{
  open: boolean,
  film: Film,
  schedule: Schedule | undefined
}>();

const toast = useToast();
const scheduleStore = useScheduleStore();
const hallStore = useHallStore();
const action = ref('post');
const halls: Ref<Hall[]> = ref([]);
const showTime: Ref<Date | undefined> = ref(undefined);

const form: Ref<any> = ref({
  id: 0,
  hall_id: undefined,
  film_id: props.film?.id,
  show_time: '',
  on_schedule: true,
  ticket_price: 0,
  class_name: 'SCHEDULE'
});

watch(
  () => props.open,
  () => {
    if (props.open) {
      form.value = props.schedule ? { ...props.schedule } : {
        id: 0,
        hall_id: undefined,
        film_id: props.film?.id,
        show_time: '',
        on_schedule: true,
        ticket_price: 0,
        class_name: 'SCHEDULE'
      };
      showTime.value = props.schedule ? new Date(props.schedule.show_time) : undefined;
    }
  },
  { immediate: true }
);

async function submit() {
  try {
    form.value.show_time = showTime.value;

    switch (action.value) {
      case 'post':
        await scheduleStore.createSchedule(form.value);
        break;
      case 'patch':
        await scheduleStore.updateSchedule(form.value);
        break;
      case 'delete':
        // await scheduleStore.deleteSchedule(form.value);
        break;
    }

    emit('list-changed');
  } catch (error: any) {
    console.error(error.response.data.detail);
    toast.error(error.response.data.detail);
  }
}

onMounted(async () => {
  halls.value = await hallStore.getHalls();
})
</script>

<template>
  <Modal :show="open" max-width="3xl" @close="$emit('close')">
    <div class="bg-white shadow-sm sm:rounded-lg">
      <div class="flex items-center justify-between p-6 border-b">
        <h1 class="font-bold text-lg sm:text-xl text-gray-900">{{ schedule ? 'Edit Schedule' : 'New Schedule' }}</h1>
      </div>

      <form @submit.prevent="submit">
        <div class="p-6">

          <div class="mb-4">
            <div class="flex-1">
              <InputLabel for="hall" value="Hall" class="mb-1" />
              <select
                class="w-full p-2 border bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                v-model="form.hall_id"
                id="hall_id"
              >
                <option v-for="hall in halls" :key="hall.id" :value="hall.id">{{ hall.hall_name }}</option>
              </select>
              <InputError class="mt-2" message="" />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex-1">
              <InputLabel for="hall" value="Show Time" class="mb-1" />
              <vue-date-picker v-model="showTime"></vue-date-picker>
              <InputError class="mt-2" message="" />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex-1">
              <InputLabel for="hall" value="Show Time" class="mb-1" />
              <NumberInput class="w-full" v-model="form.ticket_price" step="0.01" />
              <InputError class="mt-2" message="" />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex-1">
              <InputLabel for="on_schedule" value="On Schedule?" class="mb-1" />
              <select
                class="w-full p-2 border bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                v-model="form.on_schedule"
                id="on-schedule"
              >
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
              <InputError class="mt-2" message="" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end p-6 gap-4 border-t">
          <DangerButton v-if="schedule" @click="action = 'delete'">
            Delete
          </DangerButton>

          <SecondaryButton @click="$emit('close')">
            Cancel
          </SecondaryButton>

          <PrimaryButton @click="action = schedule ? 'patch' : 'post'">
            {{ schedule ? 'Update' : 'Add' }}
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
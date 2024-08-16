<script lang="ts" setup>
import { ref } from 'vue';
import { Collapse } from 'vue-collapsed';
import type Batch from '../../models/batch';
import dayjs from 'dayjs';

const props = defineProps<{
  isOpen?: boolean;
  batch: Batch;
}>();

const isOpen = ref(props.isOpen);
</script>

<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center justify-between w-full pl-6 pr-4 py-4 rounded border-b transition-all"
      :class="isOpen ? 'bg-primary-50 text-primary-900' : 'hover:bg-gray-50 text-gray-900'"
    >
      <span class="font-medium text-left text-gray-700">#{{ batch.batch_ref }}</span>

      <div class="flex flex-row">
        <span class="text-xs text-gray-600 me-20">{{ batch.bookings[0].account.name }}</span>

        <span class="text-sm text-gray-600 me-6">{{
          dayjs(batch.bookings[0].created).format('DD/MM/YYYY')
        }}</span>

        <span class="transform duration-200" :class="{ 'rotate-180': isOpen }">
          <i class="bi bi-chevron-down"></i>
        </span>
      </div>
    </button>

    <Collapse class="m-6" :when="isOpen">
      <slot name="content" />
    </Collapse>
  </div>
</template>

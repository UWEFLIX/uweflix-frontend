<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  }
})

const model = defineModel({
  type: Number,
  required: true
})

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <input
    type="number"
    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    v-model="model"
    ref="input"
    :min="min"
    :max="max"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const model = defineModel({
  type: String,
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
    class="p-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    v-model="model"
    ref="input"
  />
</template>

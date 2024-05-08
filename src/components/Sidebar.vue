<script setup lang="ts">
defineEmits(['close-sidebar'])
defineProps<{
  show: boolean
}>()
</script>

<template>
  <!-- Sidebar Overlay -->
  <div
    v-if="show"
    @click="$emit('close-sidebar')"
    class="fixed inset-0 bg-black opacity-50 transition-opacity z-30"
  ></div>

  <aside class="fixed top-0 left-0 z-40 w-64 h-screen bg-white transition-transform duration-300 shadow-md"
         :class="show ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
         aria-label="Sidebar">
    <div class="px-4 py-6">
      <slot></slot>
    </div>
  </aside>
</template>

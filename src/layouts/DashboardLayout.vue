<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 h-full overflow-y-auto">
      <Header />
      <main class="p-4">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

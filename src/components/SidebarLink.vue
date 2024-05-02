<script setup lang="ts">
defineProps<{
  to: Object
  name: string
}>()
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      {{ name }}
    </RouterLink>
  </li>
</template>

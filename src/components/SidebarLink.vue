<script setup lang="ts">
defineProps<{
  to: Object,
  active: boolean,
}>()
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="flex items-center px-3 py-1.5 text-gray-900 rounded-md hover:bg-gray-100 transition"
      :class="{
        'text-white bg-primary-500 hover:bg-primary-500': active
      }"
    >
      <slot />
    </RouterLink>
  </li>
</template>

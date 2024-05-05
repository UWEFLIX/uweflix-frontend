<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  to: Object
}>()

const router = useRouter()

const isCurrentRoute = computed(() => {
  return router.currentRoute.value.name === props.to.name
})
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="flex items-center px-3 py-1.5 text-gray-900 rounded-md hover:bg-gray-100 transition"
      :class="{
        'text-white bg-primary-500 hover:bg-primary-500': isCurrentRoute
      }"
    >
      <slot />
    </RouterLink>
  </li>
</template>

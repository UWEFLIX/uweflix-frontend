<script setup lang="ts">
defineProps<{
  title: string,
  icon: string,
  to?: string | undefined
}>();
</script>

<template>
    <li class="inline-flex items-center">
        <RouterLink
            :to="to ?? '#'"
            class="inline-flex items-center text-sm text-gray-500"
            :class="to ? 'hover:text-primary-600' : 'cursor-auto'"
            :disabled="to"
        >
            <i class="text-base me-2.5" :class="icon"></i>
            <span class="line-clamp-1">{{ title }}</span>
        </RouterLink>
    </li>
</template>

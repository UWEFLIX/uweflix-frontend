<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { Collapse } from 'vue-collapsed';
import { useRouter } from 'vue-router';

const props = defineProps<{
  routeGroup: String[];
}>();

const router = useRouter();

const showingDropdown: Ref<boolean> = ref(
  props.routeGroup.some((route) => router.currentRoute.value.name === route)
);
</script>

<template>
  <li>
    <button
      @click="showingDropdown = !showingDropdown"
      class="flex w-full items-center justify-between px-3 py-1.5 text-gray-900 rounded-md hover:bg-gray-100 transition-all"
      :class="[showingDropdown ? 'bg-gray-100' : '']"
    >
      <span>
        <slot name="button-content" />
      </span>

      <span class="transform duration-200" :class="{ 'rotate-90': showingDropdown }">
        <i class="bi bi-chevron-right text-sm"></i>
      </span>
    </button>

    <Collapse
      :when="showingDropdown"
      class="flex flex-col border-l-2 border-gray-300 gap-2 mt-2 ml-3"
      style="padding-left: 0.75rem"
    >
      <slot name="dropdown-content" />
    </Collapse>
  </li>
</template>

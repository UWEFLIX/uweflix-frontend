<script setup lang="ts">
import { ref } from 'vue';
import { Collapse } from 'vue-collapsed';

const props = defineProps<{
  active: boolean;
}>();

const showingDropdown = ref(props.active);
</script>

<template>
    <li>
        <button
            @click="showingDropdown = !showingDropdown"
            class="flex w-full items-center justify-between px-3 py-1.5 text-gray-900 rounded-md hover:bg-gray-100 transition"
        >
            <span>
                <slot name="button-content" />
            </span>

            <span
                class="transform duration-200"
                :class="{ 'rotate-90': showingDropdown }"
            >
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

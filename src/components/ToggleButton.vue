<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  buttonType: {
    type: String,
    default: 'solid'
  },
  inactiveIcon: {
    type: String
  },
  activeIcon: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  radius: {
    type: String,
    default: 'md'
  },
  iconPlacement: {
    type: String,
    default: 'right'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const buttonTypeClasses = computed(() => {
  if (props.buttonType === 'solid') {
    return 'text-white bg-primary-600 border-primary-600';
  } else if (props.buttonType === 'outline') {
    return 'text-primary-600 border-primary-600 hover:bg-primary-50';
  }

  return ''
});

const radiusClass = computed(() => {
  return {
    md: 'rounded-md',
    full: 'rounded-full'
  }[props.radius.toString()];
});

defineEmits(['toggleAction']);
</script>

<template>
  <button
    @click="$emit('toggleAction')"
    type="button"
    class="border border-gray-300 font-medium text-sm p-2 text-center inline-flex items-center transition"
    :class="[
            isActive
                ? buttonTypeClasses
                : 'text-gray-700 hover:bg-gray-100 disabled:hover:bg-white disabled:text-gray-300',
            radiusClass
        ]"
    :disabled="disabled"
  >
    <i
      v-if="iconPlacement === 'left'"
      class="bi w-5 h-5"
      :class="isActive && activeIcon ? activeIcon : inactiveIcon"
    ></i>
    <slot />
    <i
      v-if="iconPlacement === 'right'"
      class="bi w-5 h-5"
      :class="isActive && activeIcon ? activeIcon : inactiveIcon"
    ></i>
  </button>
</template>

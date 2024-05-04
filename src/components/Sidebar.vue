<script setup lang="ts">
import SidebarLink from '@/components/SidebarLink.vue'
import SidebarDropdown from '@/components/SidebarDropdown.vue'
</script>

<template>
  <div class="flex w-64 h-screen flex-col justify-between border-e bg-white">
    <div class="px-4 py-6">
      <div class="w-10">
        <img src="/logo.jpg" class="object-cover rounded-lg" alt="Logo" />
      </div>

      <ul class="mt-6 space-y-2">
        <SidebarLink :to="{ name: 'Home' }" :active="true">Home</SidebarLink>

        <SidebarDropdown :active="false">
          <template #button-content>
            Test dropdown
          </template>
          <template #dropdown-content>
            <SidebarLink :to="{ name: 'Home' }" :active="false">Test 1</SidebarLink>
            <SidebarLink :to="{ name: 'Home' }" :active="false">Test 2</SidebarLink>
          </template>
        </SidebarDropdown>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt="Profile image"
          src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Peanut"
          class="size-10 rounded-full object-cover"
        />

        <div>
          <p class="text-xs">
            <strong class="block font-medium">Eric Frusciante</strong>

            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

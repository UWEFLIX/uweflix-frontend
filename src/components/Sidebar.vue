<script setup lang="ts">
import SidebarLink from '@/components/SidebarLink.vue'
import router from '@/router'
</script>

<template>
  <div class="flex w-64 h-screen flex-col justify-between border-e bg-white">
    <div class="px-4 py-6">
      <div class="w-10">
        <img src="/logo.jpg" class="object-cover rounded-lg" alt="Logo" />
      </div>

      <ul class="mt-6 space-y-1">
        <SidebarLink :to="{ name: 'Home' }" name="Home" />

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Teams </span>

              <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Banned Users
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Calendar
                </a>
              </li>
            </ul>
          </details>
        </li>
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

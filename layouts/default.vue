<!-- layouts/default.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('color-mode')
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    isDark.value = true
  } else {
    document.documentElement.classList.remove('dark')
    isDark.value = false
  }
})

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('color-mode', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('color-mode', 'light')
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
    <header class="bg-gray-100 dark:bg-gray-800 shadow transition-colors duration-500">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl">UFC Insights</NuxtLink>
        <button
          @click="isDark = !isDark"
          class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m8.66-11h-1M4.34 11h-1m15.07 6.07l-.7-.7M6.34 7.34l-.7-.7m12.02 12.02l-.7-.7M6.34 16.66l-.7-.7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 118.646 3.646a9 9 0 0011.708 11.708z" />
          </svg>
        </button>
      </nav>
    </header>
    <main class="flex-1 transition-colors duration-500">
      <NuxtPage />
    </main>
    <footer class="bg-gray-200 dark:bg-gray-800 text-center py-4 transition-colors duration-500">
      <p class="text-sm">© 2025 UFC Blog</p>
    </footer>
  </div>
</template>

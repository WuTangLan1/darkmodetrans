<!-- layouts/default.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('color-mode')
  if (
    stored === 'dark' ||
    (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
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
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500"
  >
    <header class="bg-gray-100 dark:bg-gray-800 shadow transition-colors duration-500">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl">UFC Insights</NuxtLink>
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

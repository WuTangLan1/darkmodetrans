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
    class="min-h-screen flex flex-col"
  >
    <main class="flex-1">
      <NuxtPage />
    </main>
    <footer class="bg-gray-200 dark:bg-gray-800 text-center py-4">
      <p class="text-sm">© 2025 Tailwindcss Theme Transitions Blog</p>
    </footer>
  </div>
</template>

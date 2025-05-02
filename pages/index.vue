<!-- pages/index.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { posts as all } from '@/composables/usePosts'
import { isDark, toggleThemeWithOverlay, initColorMode } from '@/composables/useThemeToggle'
onMounted(initColorMode)
</script>

<template>
  <section class="pt-20 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Ultimate Fighting Championship Insights</h1>
      <p class="text-xl mb-12 text-gray-700 dark:text-gray-300">Dive into the latest news, history, and analysis from the world of UFC.</p>
      <button @click="toggleThemeWithOverlay($event)" class="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm0 13.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm8-4a.75.75 0 01.75.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75.75.75 0 01.75-.75zm-13.5 0a.75.75 0 01.75.75H5.75a.75.75 0 010 1.5H4.25a.75.75 0 01-.75-.75.75.75 0 01.75-.75zM15.53 4.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L15.53 5.53a.75.75 0 010-1.06zm-11.06 11.06a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.47 16.59a.75.75 0 010-1.06zm11.06 1.06a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM6.59 4.47a.75.75 0 010 1.06L5.53 6.59a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM10 6a4 4 0 100 8 4 4 0 000-8z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293a8 8 0 11-10.586-10.586 7 7 0 0010.586 10.586z"/></svg>
        <span class="ml-2">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
      </button>
    </div>

    <div v-if="posts.length" class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Latest Posts</h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="group relative flex flex-col h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 shimmer-card"
        >
          <div class="h-48 overflow-hidden">
            <img src="/media/blog-header/lighttheme.webp" class="w-full h-full object-cover block dark:hidden" alt="" />
            <img src="/media/blog-header/darktheme.webp"  class="w-full h-full object-cover hidden dark:block" alt="" />
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ post.title }}</h3>
            <p class="text-gray-700 dark:text-gray-300 flex-1">{{ post.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No posts found — check back soon!</p>
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.4) 50%,
    rgba(255,255,255,0) 100%
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.shimmer-card:hover::before {
  opacity: 1;
  animation: shimmer 1.2s infinite;
}
</style>

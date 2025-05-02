<script setup lang="ts">
definePageMeta({})
import { onMounted } from 'vue'
import { posts as all } from '@/composables/usePosts'
import { isDark, toggleThemeWithOverlay, initColorMode } from '@/composables/useThemeToggle'

onMounted(initColorMode)
</script>

<template>
  <header class="sticky top-0 z-50 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)] text-[var(--btn-text)]">
    <div class="container mx-auto px-4 py-4">
      <h1 class="text-center text-2xl font-bold">TailwindCSS Theme Transitions</h1>
    </div>
  </header>
  <section class="pt-20 min-h-screen">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-extrabold mb-4">The Ultimate Guide for Theme Transitions with TailwindCSS</h1>
      <p class="text-xl mb-12">This website provides substantial value for different theme transitions to enhance the UX</p>
      <button @click="toggleThemeWithOverlay($event)" class="btn-theme-toggle">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
        </svg>
      </button>
    </div>

    <div v-if="posts.length" class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="post in posts" :key="post.slug" class="group relative flex flex-col rounded-xl overflow-hidden card shimmer-card">
          <div class="h-48 overflow-hidden">
            <img src="/media/blog-header/lighttheme.webp" class="w-full h-full object-cover block dark:hidden"/>
            <img src="/media/blog-header/darktheme.webp" class="w-full h-full object-cover hidden dark:block"/>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-2xl font-semibold mb-2">{{ post.title }}</h3>
            <p class="flex-1">{{ post.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No posts found — check back soon!</p>
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0%   { background-position: -200% 0 }
  100% { background-position: 200% 0 }
}
.shimmer-card::before {
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 50%,transparent 100%);
  background-size:200% 100%;
  opacity:0;
  transition:opacity .3s ease-in-out
}
.shimmer-card:hover::before{
  opacity:1;animation:shimmer 1.2s infinite
}
</style>

<!-- pages/index.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { posts as all } from '@/composables/usePosts'
import {
  isDark,
  initColorMode,
  toggleThemeWithCircle,
  toggleThemeWithDiamond,
  toggleThemeWithRipple
} from '@/composables/useThemeToggle'
const posts = all
onMounted(initColorMode)
</script>

<template>
  <header class="sticky top-0 z-50 bg-gradient-to-tr from-[var(--bg-header-start)] to-[var(--bg-header-end)] text-[var(--fg)]">
    <div class="container mx-auto px-4 py-4">
      <h1 class="text-center text-3xl font-bold">TailwindCSS Theme Transitions</h1>
    </div>
  </header>

  <section class="min-h-screen">
    <div class="container mx-auto px-4 py-16 text-center">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

          <!-- Circular Theme Transition -->
          <div class="flex flex-col items-center space-y-4">
            <span class="font-medium">Circular Theme Transition</span>
            <button
              @click="toggleThemeWithCircle($event)"
              class="btn-theme-toggle bg-gradient-to-tr from-blue-500 to-green-500 ring-4 ring-white dark:ring-black"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
              </svg>
            </button>
          </div>

          <!-- Expanding Diamond (Rotated Square) Reveal -->
          <div class="flex flex-col items-center space-y-4">
            <span class="font-medium">Expanding Diamond (Rotated Square) Reveal</span>
            <button
              @click="toggleThemeWithDiamond($event)"
              class="btn-theme-toggle rounded-none origin-center transform rotate-45 bg-gradient-to-tr from-purple-500 to-pink-500"
            >
              <div class="transform -rotate-45">
                <svg
                  v-if="isDark"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
              </div>
            </button>
          </div>

          <!-- Multi-Ring “Ripple” Expansion -->
          <div class="flex flex-col items-center space-y-4">
            <span class="font-medium">Multi-Ring “Ripple” Expansion</span>
            <div class="relative">
              <span class="absolute inset-0 rounded-full bg-yellow-300 opacity-20 animate-ping"></span>
              <button
                @click="toggleThemeWithRipple($event)"
                class="btn-theme-toggle bg-gradient-to-tr from-yellow-400 to-red-400 relative z-10"
              >
                <svg
                  v-if="isDark"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3M19.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M19.778 18.364l-1.414-1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      <h1 class="text-5xl font-extrabold my-4">The Ultimate Guide for Theme Transitions with TailwindCSS</h1>
      <p class="text-l mb-6">This website provides substantial value for different theme transitions to enhance the UX. The three buttons above offer realistic and actionable transitions users can incorporate to enhance the UX for their website. Please read the docs for each specific transition's explanation and code, or visit the project on github</p>
      <div class="mt-8">
        <a
          href="https://github.com/WuTangLan1/darkmodetrans"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary bg-gradient-to-tr from-[var(--bg-header-start)] to-[var(--bg-header-end)] text-[var(--fg)] inline-block"
        >
          View on GitHub
        </a>
      </div>
    </div>

    <div v-if="posts.length" class="container mx-auto px-4 pb-20">
      <h1
          class="flex flex-col sm:flex-row items-center justify-center gap-2 
                 text-5xl font-extrabold my-4 mb-8 tracking-wide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 flex-shrink-0"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="headingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%"   stop-color="#a78bfa"/>
                <stop offset="50%"  stop-color="#ec4899"/>
                <stop offset="100%" stop-color="#f43f5e"/>
              </linearGradient>
            </defs>
            <path
              fill="url(#headingGrad)"
              d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V6l-4-4H8zm1 2h4v3h3v9H9V4zm1 5h3v1H10V9zm0 2h3v1H10v-1z"
            />
          </svg>
          <span>Here are the docs..</span>
      </h1>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="group relative flex flex-col rounded-xl overflow-hidden card shimmer-card"
        >
        <div class="relative h-48 overflow-hidden">
          <img src="/media/blog-header/lighttheme.png"
              class="w-full h-full object-cover
                      opacity-100 dark:opacity-0" />
          <img src="/media/blog-header/darktheme.png"
              class="absolute inset-0 w-full h-full object-cover
                      opacity-0   dark:opacity-100" />
        </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-2xl font-semibold mb-2">{{ post.title }}</h3>
            <p class="flex-1">{{ post.excerpt }}</p>
            <div class="mt-4">
              <NuxtLink
                :to="`/docs/${post.slug}`"
                class="text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-4"
              >
                Read more →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No posts found — check back soon!</p>
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0% { background-position: -200% 0 }
  100% { background-position: 200% 0 }
}
.shimmer-card {
  position: relative; 
  z-index: 0;
}
.shimmer-card::before {
  content: '';
  position: absolute;
  pointer-events: none;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.shimmer-card:hover::before {
  opacity: 1;
  animation: shimmer 1.2s linear;
}
</style>

<!-- pages/index.vue -->
<script setup lang="ts">
import { posts as all } from '@/composables/usePosts'
import { ref, onMounted, watch } from 'vue'

const posts = all.slice(0, 3)
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
  <section
    class="bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-500"
  >
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
        Ultimate Fighting Championship Insights
      </h1>
      <p class="text-xl mb-12 text-gray-700 dark:text-gray-300">
        Dive into the latest news, history, and analysis from the world of UFC.
      </p>
      <button
        @click="isDark = !isDark"
        class="inline-flex items-center p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-900 dark:text-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 118.646 3.646a9 9 0 0011.708 11.708z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-900 dark:text-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.66-11h-1M4.34 11h-1m15.07 6.07l-.7-.7M6.34 7.34l-.7-.7m12.02 12.02l-.7-.7M6.34 16.66l-.7-.7"
          />
        </svg>
      </button>
    </div>

    <div v-if="posts.length" class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Latest Posts
      </h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800"
        >
          <div class="h-48 overflow-hidden">
            <img
              :src="'https://source.unsplash.com/collection/888146/400x300?sig=' + post.slug"
              alt=""
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div class="p-6 flex flex-col">
            <h3
              class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              {{ post.title }}
            </h3>
            <span class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {{ new Date(post.publishedAt).toLocaleDateString() }}
            </span>
            <p class="text-gray-700 dark:text-gray-300 flex-1">
              {{ post.excerpt }}
            </p>
            <div
              class="mt-4 text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:translate-x-1 transition-transform duration-300"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <p class="text-center py-12 text-gray-500 dark:text-gray-400">
      No posts found — check back soon!
    </p>
  </section>
</template>

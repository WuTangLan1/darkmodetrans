<!-- pages/blog/index.vue -->
<script setup lang="ts">
import { posts } from '@/composables/usePosts'
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">UFC Blog</h1>
    <div v-if="posts.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group flex flex-col h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800"
      >
        <div class="h-48 overflow-hidden">
          <img
            :src="'https://source.unsplash.com/random/400x300?' + post.slug"
            alt="Blog image"
            class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <h2 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ post.title }}</h2>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10m-10 4h10m2 4H6a2 2 0 01-2-2V7a2 2 0 012-2h1v2a1 1 0 001 1h10a1 1 0 001-1V5h1a2 2 0 012 2v12a2 2 0 01-2 2z"/>
            </svg>
            <span>{{ new Date(post.publishedAt).toLocaleDateString() }}</span>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-6">{{ post.excerpt }}</p>
          <div class="mt-auto flex items-center text-blue-600 dark:text-blue-400 font-semibold">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No blog posts yet.</p>
  </section>
</template>

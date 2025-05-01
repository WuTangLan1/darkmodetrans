<!-- pages/index.vue -->

<script setup lang="ts">
import { useAsyncData } from '#app'

const { data: posts } = await useAsyncData('latest-posts', () =>
  queryContent('blog')          
    .sort({ publishedAt: -1 })
    .limit(3)
    .find()
)
</script>

<template>
    <section class="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Ultimate Fighting Championship Insights</h1>
        <p class="text-xl text-gray-700 dark:text-gray-300 mb-12">Dive into the latest news, history, and analysis from the world of UFC.</p>
        <nuxt-link href="/blog" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">Visit Blog</nuxt-link>
      </div>
      <div class="container mx-auto px-4 py-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Latest Posts</h2>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <nuxt-link
            v-for="post in posts"
            :key="post._path"
            :to="post._path"
            class="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div class="p-6">
              <h3 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ post.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
              <p class="text-gray-700 dark:text-gray-300">{{ post.excerpt }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>
</template>
  
  
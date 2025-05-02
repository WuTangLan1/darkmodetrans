<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { posts } from '@/composables/usePosts'
const route = useRoute()
const post = posts.find(p => p.slug === route.params.slug) ?? { title: '', body: '' }
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <article class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-500">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ post.title }}</h1>
      <div v-html="post.body" class="prose dark:prose-invert"></div>
    </article>
  </section>
</template>

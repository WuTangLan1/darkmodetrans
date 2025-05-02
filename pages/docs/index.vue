<!-- pages/docs/index.vue -->
<script setup lang="ts">
import { posts } from '@/composables/usePosts'
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Documentation Index</h1>
    <ul class="space-y-6">
      <li
        v-for="p in posts"
        :key="p.slug"
        class="border-b pb-4 last:border-0 last:pb-0"
      >
        <NuxtLink
          :to="`/docs/${p.slug}`"
          class="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {{ p.title }}
        </NuxtLink>
        <p class="mt-2 text-gray-700 dark:text-gray-300">{{ p.excerpt }}</p>
      </li>
    </ul>
  </section>
</template>

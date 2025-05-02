<script setup lang="ts">
import { posts } from '@/composables/usePosts'
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-16 text-center">
    <h1 class="text-5xl font-extrabold mb-12 tracking-tight">
      Documentation Index
    </h1>
    <ul class="space-y-8">
      <li v-for="p in posts" :key="p.slug">
        <NuxtLink
          :to="`/docs/${p.slug}`"
          class="block card p-8 hover:shadow-2xl transition"
        >
          <h2 class="text-2xl font-extrabold mb-2">
            {{ p.title }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            {{ p.excerpt }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<!-- pages/docs/index.vue -->
<script setup lang="ts">
import { posts } from '@/composables/usePosts'
</script>


<template>
  <section class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-extrabold mb-4">{{ post.title }}</h1>
    <div v-html="post.body" class="prose dark:prose-invert"></div>
  </section>
</template>

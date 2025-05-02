<!-- pages/docs/[slug].vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'          // Nuxt-preferred helper
import { onBeforeMount, ref } from 'vue'
import { posts } from '@/composables/usePosts'

const post = ref()                         // reactive for template
const route = useRoute()

onBeforeMount(() => {
  const slug = route.params.slug as string
  post.value  = posts.find(p => p.slug === slug)

  if (!post.value) {
    navigateTo('/404')                     // no “return” inside <script setup>
  }
})
</script>

<template>
  <section v-if="post" class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-extrabold mb-4">{{ post.title }}</h1>
    <div v-html="post.body" class="prose dark:prose-invert"></div>
  </section>
</template>

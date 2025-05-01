<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'

const route = useRoute()
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('blog', route.params.slug as string).findOne()
)
</script>

<template>
    <section class="container mx-auto px-4 py-8">
      <article class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        <ContentRenderer :value="post" />
      </article>
    </section>
</template>

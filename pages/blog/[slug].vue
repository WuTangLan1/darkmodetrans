<!-- pages/blog/[slug].vue -->
<template>
  <section class="container mx-auto px-4 py-8">
    <article class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {{ new Date(page.publishedAt).toLocaleDateString() }}
      </p>
      <ContentRenderer :value="page" />
    </article>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryContent('blog', route.params.slug as string).findOne()
)
</script>

<!-- pages\docs\[slug].vue -->

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'
import { onBeforeMount, onMounted, ref, nextTick } from 'vue'
import { posts } from '@/composables/usePosts'
import gsap from 'gsap'

const post = ref()
const route = useRoute()
const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

onBeforeMount(() => {
  const slug = route.params.slug as string
  post.value = posts.find(p => p.slug === slug)
  if (!post.value) navigateTo('/404')
})

onMounted(async () => {
  await nextTick()
  const lines: HTMLElement[] = []
  if (titleRef.value) lines.push(titleRef.value)
  if (bodyRef.value) {
    bodyRef.value.querySelectorAll('p, h2, h3, li').forEach(el => {
      lines.push(el as HTMLElement)
    })
  }
  gsap.set(lines, { opacity: 0, y: 24 })
  gsap.to(lines, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.12
  })
})
</script>

<template>
  <section v-if="post" class="container mx-auto px-4 py-12">
    <NuxtLink
      to="/"
      class="btn-primary inline-flex items-center mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back to Home</span>
    </NuxtLink>

    <h1 ref="titleRef" class="text-4xl font-extrabold mb-4">
      {{ post.title }}
    </h1>
    <div
      ref="bodyRef"
      v-html="post.body"
      class="prose dark:prose-invert"
    ></div>
  </section>
</template>

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
    bodyRef.value
      .querySelectorAll('p, h2, h3, h4, btn, li, img, pre, blockquote, table, code')
      .forEach(el => lines.push(el as HTMLElement))
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  gsap.set(lines, { opacity: 0, y: 40, rotationX: -8 })
  tl.to(lines, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.9,
    stagger: { each: 0.08, from: 'start' }
  })
})
</script>

<template>
  <section v-if="post" class="container mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-6">
      <h1 ref="titleRef" class="text-4xl font-extrabold">
        {{ post.title }}
      </h1>
      <NuxtLink
        to="/"
        class="btn-primary inline-flex items-center space-x-2 px-5 py-2 hover:-translate-y-0.5 transition transform"
      >
        <span>Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </NuxtLink>
    </div>
    <div
      ref="bodyRef"
      v-html="post.body"
      class="prose dark:prose-invert"
    ></div>
  </section>
</template>

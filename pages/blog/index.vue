<!-- pages/blog/index.vue -->
<template>
  <section class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">UFC Blog</h1>

    <ContentList
      path="blog"
      sort="publishedAt:desc"
      v-slot="{ list }"
    >
      <div
        v-if="list.length"
        class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="item in list"
          :key="item._path"
          :to="item._path"
          class="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="p-6">
            <h2 class="text-2xl font-semibold mb-2">{{ item.title }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {{ new Date(item.publishedAt).toLocaleDateString() }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">{{ item.excerpt }}</p>
          </div>
        </NuxtLink>
      </div>

      <p
        v-else
        class="text-center py-12 text-gray-500 dark:text-gray-400"
      >
        No blog posts yet.
      </p>
    </ContentList>
  </section>
</template>

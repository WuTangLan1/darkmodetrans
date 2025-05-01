<!-- pages/index.vue -->
<template>
  <section class="bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
        Ultimate Fighting Championship Insights
      </h1>
      <p class="text-xl text-gray-700 dark:text-gray-300 mb-12">
        Dive into the latest news, history, and analysis from the world of UFC.
      </p>
      <NuxtLink
        to="/blog"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
      >
        Visit Blog
      </NuxtLink>
    </div>

    <ContentList
      path="blog"
      :limit="3"
      sortKey="publishedAt"
      sortOrder="desc"
      class="container mx-auto px-4 py-12"
    >
      <template #default="{ item }">
        <NuxtLink
          :to="item._path"
          class="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {{ new Date(item.publishedAt).toLocaleDateString() }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              {{ item.excerpt }}
            </p>
          </div>
        </NuxtLink>
      </template>
      <template #empty>
        <p class="text-center py-12 text-gray-500 dark:text-gray-400">
          No posts found — check back soon!
        </p>
      </template>
    </ContentList>
  </section>
</template>

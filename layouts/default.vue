<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen flex flex-col">
      <header class="bg-white dark:bg-gray-800 shadow">
        <nav class="container mx-auto px-4 py-4">
          <NuxtLink to="/" class="font-bold text-xl text-gray-900 dark:text-gray-100">UFC Insights</NuxtLink>
        </nav>
      </header>
  
      <main class="flex-1">
        <NuxtPage />
      </main>
  
      <footer class="bg-gray-200 dark:bg-gray-900 text-center py-4">
        <p class="text-sm text-gray-700 dark:text-gray-400">© 2025 UFC Blog</p>
      </footer>
    </div>
  </template>
  
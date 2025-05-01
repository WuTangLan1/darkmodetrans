 <!-- pages/index.vue -->
 <script setup lang="ts">
 import { posts as all } from '@/composables/usePosts'
 const posts = all.slice(0, 3)
 </script>

 <template>
   <section class="bg-gray-100 dark:bg-gray-900 min-h-screen">
     <div class="container mx-auto px-4 py-16 text-center">
       <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Ultimate Fighting Championship Insights</h1>
       <p class="text-xl text-gray-700 dark:text-gray-300 mb-12">Dive into the latest news, history, and analysis from the world of UFC.</p>
       <NuxtLink to="/blog" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">Visit Blog</NuxtLink>
     </div>

     <div v-if="posts.length" class="container mx-auto px-4 py-12">
       <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Latest Posts</h2>
       <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         <NuxtLink v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
           <div class="p-6">
             <h3 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ post.title }}</h3>
             <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
             <p class="text-gray-700 dark:text-gray-300">{{ post.excerpt }}</p>
           </div>
         </NuxtLink>
       </div>
     </div>

     <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No posts found — check back soon!</p>
   </section>
 </template>

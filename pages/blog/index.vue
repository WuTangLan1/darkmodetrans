 <!-- pages/blog/index.vue -->
 <script setup lang="ts">
 import { posts } from '@/composables/usePosts'
 </script>

 <template>
   <section class="container mx-auto px-4 py-8">
     <h1 class="text-4xl font-bold mb-8">UFC Blog</h1>

     <div v-if="posts.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
       <NuxtLink v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
         <div class="p-6">
           <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
           <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
           <p class="text-gray-700 dark:text-gray-300">{{ post.excerpt }}</p>
         </div>
       </NuxtLink>
     </div>

     <p v-else class="text-center py-12 text-gray-500 dark:text-gray-400">No blog posts yet.</p>
   </section>
 </template>

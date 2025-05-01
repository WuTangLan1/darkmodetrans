// nuxt.config.ts

import { fileURLToPath, URL } from 'node:url';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  css: [
    '~/assets/css/tailwind.css'
  ],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath: '~/assets/css/tailwind.css',
    viewer: false
  },
  vite: {
    resolve: {
      alias: {
        '#content': fileURLToPath(new URL('./.nuxt/content', import.meta.url))
      }
    }
  }
})

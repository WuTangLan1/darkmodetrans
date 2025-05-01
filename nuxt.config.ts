// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {},

  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath: '~/assets/css/tailwind.css',
    viewer: false
  }
})

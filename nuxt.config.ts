// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',       
  ],
  css: [
    '~/assets/css/tailwind.css' 
  ],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath:    '~/assets/css/tailwind.css',
    viewer:     false          
  }
})

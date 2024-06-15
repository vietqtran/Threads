export default defineNuxtConfig({
   devtools: { enabled: true },
   css: ['~/assets/css/main.css'],
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
   modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      'nuxt-svgo',
      'nuxt-swiper',
      'nuxt-tiptap-editor',
   ],
   svgo: {
      autoImportPath: '~~/assets/icons/',
   },
   tiptap: {
      prefix: 'Tiptap',
   },
})

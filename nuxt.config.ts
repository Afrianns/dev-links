// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      storageImagesUrl: "",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/",
      callback: "",
      include: ["/links", "/links/*"],
      exclude: [],
      cookieRedirect: false,
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    config: {},
    viewer: true,
    exposeConfig: false,
  },
});

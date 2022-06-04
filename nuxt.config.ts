import type { NuxtConfig } from "@nuxt/types";

const isDev = process.env.NODE_ENV !== "production";

const config: NuxtConfig = {
  rootDir: "client/",
  buildDir: "../dist/client/",
  modulesDir: ["../node_modules"],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "M.E.V",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon-32x32.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "access_token",
          // global: true,
          // required: true,
          // type: "Bearer",
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/auth/token", method: "post" },
          user: false,
        },
      },
    },

    redirect: {
      login: "/signin",
      logout: "/",
      callback: "/signin",
      home: "/",
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  telemetry: false,
};

export default Object.assign(config, {
  axios: {
    baseURL: isDev ? "http://localhost:4000/api" : "http://localhost:3000/api",
  },
});
